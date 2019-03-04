const _ = require('lodash');
const assert = require('assert');
const {
  encodePassword,
  comparePassword,
  getIp,
  compareMd5,
  randomStr,
} = require('./kit');

const UserBiz = (fpm) => {
  assert.strictEqual(fpm.M === undefined, false, 'FPM-PLUGIN-MYSQL required!' )
  return {
    // for admin login
    adminLogin: async (args, ctx) => {
      try {
        const loginInfo = await fpm.M.firstAsync({
          table: 'sys_admininfo',
          condition: {
            loginName: args.account
          }
        })
        if (_.isEmpty(loginInfo)) {
          return Promise.reject({
            errno: -5001,
            message: '用户不存在'
          })
        }
        const now = _.now()
        
        const { encodeType = 'md5', loginPass } = loginInfo;
        let isPassed = false;
        switch( encodeType){
          case 'md5':
            isPassed = compareMd5(args.password, loginPass);
            break;
          case 'aes':
            isPassed = comparePassword(args.password, loginPass);
            break;
        }
        if (!isPassed) {
          // if times > 5, Lock The User
          if (loginInfo.tryLoginTimes > 5) {
            return Promise.reject({
              errno: -5004,
              message: '尝试登录失败次数超过5次,已被禁用,请联系管理员'
            })
          }
          // increace The login try times 
          await fpm.M.updateAsync({
            table: 'sys_admininfo',
            condition: {
              id: loginInfo.id
            },
            row: {
              tryLoginTimes: loginInfo.tryLoginTimes + 1,
              updateAt: now
            }
          })
          return Promise.reject({
            errno: -5002,
            message: '密码错误'
          })
        }
        delete loginInfo.loginPass

        const lastLoginIp = getIp(ctx.ip)
        const lastLoginAt = now
        //update loginip, loginat
        await fpm.M.updateAsync({
          table: 'sys_admininfo',
          condition: {
            id: loginInfo.id
          },
          row: {
            lastLoginIp,
            lastLoginAt,
            tryLoginTimes: 0,
          }
        })
        //create a login log
        await fpm.M.createAsync({
          table: 'usr_action_log',
          row: {
            ip: lastLoginIp,
            uid: loginInfo.id,
            action: 'ADMIN_LOGIN',
            createAt: lastLoginAt,
            updateAt: lastLoginAt
          }
        })
        return Object.assign(loginInfo, { isAdmin: true, obs: {
          name: '超级管理员'
        }, rbac: [], role: {}, profile: {}, desktop: { entry_url: '/' }, widgets: [] });
      } catch (e) {
        fpm.logger.error(e)
        return Promise.reject({
          errno: -9002,
          message: '系统错误',
          error: e
        })
      }
    },
    login: async (args, ctx) => {
      
      try {
        const loginInfo = await fpm.M.firstAsync({
          table: 'usr_userinfo',
          condition: {
            username: args.account
          }
        })
        if (_.isEmpty(loginInfo)) {
          return Promise.reject({
            errno: -5001,
            message: '用户不存在'
          })
        }
        if (loginInfo.enable == 0) {
          return Promise.reject({
            errno: -5001,
            message: '该用户已被禁用,无法登陆'
          })
        }
        const now = _.now()
        if (!comparePassword(args.password, loginInfo.password)) {
          // if times > 5, Lock The User
          if (loginInfo.try_fail > 5) {
            await fpm.M.updateAsync({
              table: 'usr_userinfo',
              condition: {
                id: loginInfo.id
              },
              row: {
                enable: 0,
                updateAt: now
              }
            })
            return Promise.reject({
              errno: -5004,
              message: '尝试登录失败次数超过5次,已被禁用,请联系管理员'
            })
          }
          // increace The login try times 
          await fpm.M.updateAsync({
            table: 'usr_userinfo',
            condition: {
              id: loginInfo.id
            },
            row: {
              try_fail: loginInfo.try_fail + 1,
              updateAt: now
            }
          })
          return Promise.reject({
            errno: -5002,
            message: '密码错误'
          })
        }
        delete loginInfo.password

        const lastLoginIp = getIp(ctx.ip)
        const lastLoginAt = now

        //update loginip, loginat
        await fpm.M.updateAsync({
          table: 'usr_userinfo',
          condition: {
            id: loginInfo.id
          },
          row: {
            lastLoginIp,
            lastLoginAt
          }
        })
        //create a login log
        await fpm.M.createAsync({
          table: 'usr_action_log',
          row: {
            ip: lastLoginIp,
            uid: loginInfo.id,
            action: 'LOGIN',
            createAt: lastLoginAt,
            updateAt: lastLoginAt
          }
        })

        const obsInfo = await fpm.M.getAsync({
          table: 'usr_obs',
          id: loginInfo.dept
        })
        loginInfo.obs = obsInfo
        if(fpm.rbacFactory){
          const rbac = await fpm.rbacFactory.getRbac(obsInfo.role_id)
          loginInfo.rbac = rbac.getAcl()
          loginInfo.role = rbac.getRole()
        }


        loginInfo.profile = await fpm.M.getAsync({
          table: 'usr_profile',
          id: loginInfo.profile_id
        })
        loginInfo.desktop = await fpm.M.getAsync({
          table: 'usr_desktop',
          id: loginInfo.desktop_id
        })
        loginInfo.widgets = await fpm.M.findAsync({
          table: 'usr_widget',
          condition: {
            desktop_id: loginInfo.desktop_id
          }
        })

        return Promise.resolve(loginInfo)

      } catch (e) {
        fpm.logger.error(e)
        return Promise.reject({
          errno: -9002,
          message: '系统错误',
          error: e
        })
      }
    },
    resetPassword: async args => {
      try {
        const loginInfo = await fpm.M.getAsync({
          table: 'usr_userinfo',
          id: args.id
        })
        if (_.isEmpty(loginInfo)) {
          return Promise.reject({
            errno: -5001,
            message: '用户不存在'
          })
        }
        //reset the new password
        const newPassword = randomStr()
        await fpm.M.updateAsync({
          table: 'usr_userinfo',
          condition: {
            id: args.id
          },
          row: {
            password: encodePassword(newPassword),
            updateAt: _.now()
          }
        })
        return newPassword
      } catch (error) {
        fpm.logger.error(e)
        return Promise.reject({
          errno: -9003,
          message: '系统错误',
          error: e
        })
      }
    },
    changePassword: async args => {
      try {
        //check old password
        const loginInfo = await fpm.M.getAsync({
          table: 'usr_userinfo',
          id: args.id
        })
        if (_.isEmpty(loginInfo)) {
          return Promise.reject({
            errno: -5001,
            message: '用户不存在'
          })
        }
        if (!comparePassword(args.oldPassword, loginInfo.password)) {
          return Promise.reject({
            errno: -5002,
            message: '原始密码错误'
          })
        }
        //set the new password
        const result = await fpm.M.updateAsync({
          table: 'usr_userinfo',
          condition: {
            id: args.id
          },
          row: {
            password: encodePassword(args.newPassword),
            updateAt: _.now()
          }
        })
        return 1
      } catch (e) {
        fpm.logger.error(e)
        return Promise.reject({
          errno: -9003,
          message: '系统错误',
          error: e
        })
      }
    },
    list: async args => {
      try {
        let params = {
          fields: 'u.*, (select name from usr_obs o where o.id = u.dept) as department',
          table: 'usr_userinfo u',
          condition: ` u.username <> 'admin' `,
          skip: (parseInt(args.page || 1) - 1) * 10,
        }
        const {
          searchKey, obsCode,
        } = args
        if (!_.isEmpty(searchKey)) {
          params.condition += ` and (u.username like '%${ searchKey }%' or u.email like '%${ searchKey }%' or u.nickname like '%${ searchKey }%' or u.mobile like '%${ searchKey }%') `
        }
        if(!_.isEmpty(obsCode)){
          params.condition += ` and u.dept in ( select id from usr_obs o where o.code = '${ obsCode }') `
        }
        const result = await fpm.M.findAndCountAsync(params)
        return result
      } catch (e) {
        fpm.logger.error(e)
        return Promise.reject({
          errno: -9003,
          message: '系统错误',
          error: e
        })
      }
    },
    checkExists: async args => {
      try {
        const count = await fpm.M.countAsync({
          table: 'usr_userinfo',
          condition: `${ args.field } = '${ args.value} '`
        })
        return count < 1 ? 1 : Promise.reject(0)
      } catch (e) {
        fpm.logger.error(e)
        return Promise.reject({
          errno: -9003,
          message: '系统错误',
          error: e
        })
      }
    },
    create: async args => {
      const NOW = _.now()
      try {
        // encode the password
        if (_.has(args, 'password')) {
          args.password = encodePassword(args.password)
        }
        if (!_.has(args, 'email')){
          args.email = args.mobile + '@139.com'
        }
        const result = await fpm.M.createAsync({
          table: 'usr_userinfo',
          row: _.assign(args, {
            createAt: NOW,
            updateAt: NOW
          })
        })
        return result
      } catch (e) {
        fpm.logger.error(e)
        return Promise.reject({
          errno: -9003,
          message: '系统错误',
          error: e
        })
      }
    },
    toggleEnable: async args => {
      const NOW = _.now()
      let row = {
        updateAt: NOW,
        enable: 0
      }
      if (args.enable === 1) {
        row.try_fail = 0
        row.enable = 1
      }
      try {
        const result = await fpm.M.updateAsync({
          table: 'usr_userinfo',
          row: row,
          condition: `id = ${args.id}`,
        })
        return result
      } catch (e) {
        fpm.logger.error(e)
        return Promise.reject({
          errno: -9003,
          message: '系统错误',
          error: e
        })
      }
    }
  }
}
exports.UserBiz = UserBiz