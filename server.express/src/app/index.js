/*
 * @author		Antonio Membrides Espinosa
 * @email    	tonykssa@gmail.com
 * @date		05/01/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
var config = require('../../cfg/config.json');
var express = require("express");
var app = express();
var mod = [];

//... Set response config
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//... Allow all origin request, CORS on ExpressJS
var cors = require('cors');
app.use(cors());

//... Load modules 
config.srv.module.path = __dirname + '/../';
config.srv.module.load.forEach(name => {
    var Module = require(config.srv.module.path + name);
    if(Module instanceof Function){
        var obj = new Module(app, {
            'cfg': config.app,
            'mod': config.srv.module.path + name + "/",
            'app': config.srv.module.path + "app/",
            'name': name
        });
        mod.push(obj);
    }
});

//... Init server
app.listen(config.srv.port, () => {
	console.log("<------------> Server listen on http://"+config.srv.host+":"+config.srv.port);
});