const _ = require('lodash');
const path = require('path');
const assert = require('assert');
const debug = require('debug')('fpm-plugin-user-service');

const UserBiz = require('./user.js').UserBiz;
module.exports = {
  bind: (fpm) => {
    // WHEN TO INSTALL THE SQL Scripts??    
    const bizModule = UserBiz(fpm);
    assert(!!fpm.M, 'FPM-PLUGIN-MYSQL required!' )
    fpm.registerAction('BEFORE_SERVER_START', async () => {
      fpm.extendModule('user', bizModule);
      // Run the sql file
      if(fpm.M){
        try {
          await fpm.M.install(path.join(__dirname, '../meta'))
        } catch (error) {
          fpm.logger.error(error);
          debug('Install Error %O', error);
        }
      }
    }, 100)
    return bizModule;
  }
}
