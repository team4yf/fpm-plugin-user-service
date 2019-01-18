const _ = require('lodash');
const UserBiz = require('./user.js').UserBiz;
module.exports = {
  bind: (fpm) => {    
    const bizModule = UserBiz(fpm);
    fpm.registerAction('BEFORE_SERVER_START', () => {
      fpm.extendModule('user', bizModule) ;
    })
    return bizModule;
  }
}
