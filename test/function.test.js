const { init, Func } = require("fpmc-jssdk");
const assert = require('assert');
init({ appkey:'123123', masterKey:'123123', endpoint: 'http://localhost:9999/api' });

describe('Function', function(){
  beforeEach(done => {
    done()
  })


  afterEach(done => {
    done()
  })

  it('login ok', function(done){
    var func = new Func('user.login');
    func.invoke({account: 'admin', password: '123123123'})
      .then(function(data){
        console.log(JSON.stringify(data, null, 2))
        done();
      }).catch(function(err){
        done(err);
      })
  })

  it('admin login ok', function(done){
    var func = new Func('user.adminLogin');
    func.invoke({account: 'admin', password: '123123123'})
      .then(function(data){
        console.log(JSON.stringify(data, null, 2))
        done();
      }).catch(function(err){
        done(err);
      })
  })
})
