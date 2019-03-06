const _ = require('lodash');
const path = require('path');
const UserBiz = require('./user.js').UserBiz;
module.exports = {
  bind: (fpm) => {
    // WHEN TO INSTALL THE SQL Scripts??    
    const bizModule = UserBiz(fpm);
    fpm.registerAction('BEFORE_SERVER_START', () => {
      fpm.extendModule('user', bizModule);
      // Run the sql file
      if(fpm.M){
        fpm.M.install(path.join(__dirname, '../meta'))
        .catch(e => {
          fpm.logger.error(e);
          throw new Error('Install Plugin fpm-plugin-user-server Error! Cant run the meta/*.sql files successlly!')
        })
      }
    })
    return bizModule;
  }
}
