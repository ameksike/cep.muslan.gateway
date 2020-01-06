/*
 * @author		Antonio Membrides Espinosa
 * @email    	tonykssa@gmail.com
 * @date		05/01/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
var BaseModule = require( __dirname + '/../app/BaseModule.js');
class GatewayModule extends BaseModule{

    initRoutes(){
        console.log(this.prefix + "/too/fill");
        this.app.get(this.prefix + "/fill", (req, res, next) => {
            console.log("<------------> Module: "+this.opt.name+", Controller: Default, Acctio: fill");
            this.controller.fill(req, res, next);
        });
        super.initRoutes();
    }
}
module.exports = GatewayModule;
