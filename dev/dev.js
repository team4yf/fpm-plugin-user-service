'use strict';
const { Fpm } = require('yf-fpm-server');
const path = require('path');
const plugin = require('../src');
let app = new Fpm()
const ref = plugin.bind(app)
console.info('the plugin ref:', ref)
let biz = app.createBiz('0.0.1');

biz.addSubModules('test',{
	foo: args => {
		return Promise.reject({errno: -3001, message: 'not allow to access'})
	}
})
app.addBizModules(biz);

// this plugin should run when INIT , but we cant run it in Dev Mode, so We should Run It Manually
app.runAction('INIT', app)
app.subscribe('#someevent', (topic, data)=>{
	console.log(topic, data)
});
app.run()
	.then(() => {
		ref.mock()
			.then(console.log)
			.catch(console.error)
	})
