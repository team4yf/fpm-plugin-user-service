const _ = require('lodash');
const path = require('path');
const UserBiz = require('./user.js').UserBiz;
module.exports = {
  bind: (fpm) => {
    // WHEN TO INSTALL THE SQL Scripts??    
    const bizModule = UserBiz(fpm);
    console.log(bizModule)
    fpm.registerAction('BEFORE_SERVER_START', () => {
      fpm.extendModule('user', bizModule) ;
      // Run the sql file
      if(fpm.M){
        fpm.M.install(path.join(__dirname, '../sql'))
        .then(() => {
          // startup();
        })
        .catch(e => {
          fpm.logger.error(e);
        })
      }
    })
    return bizModule;
  }
}
