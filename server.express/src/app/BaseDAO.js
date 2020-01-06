/*
 * @author		Antonio Membrides Espinosa
 * @email    	tonykssa@gmail.com
 * @date		05/01/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
class BaseDAO{

    constructor(opt){
        this.driver = require('mongoose');
        this.models = require( __dirname + '/BaseDTO.js');
        this.option = opt || {
            "name": "default",
            "host": "localhost",
            "port": "27017",
            "driver": "mongodb"
        };
        this.config = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 
        };
    }

    connect(callback=undefined){
        this.driver.connect(this.getUri(), this.config).catch((error)=>{
            if(callback instanceof Function){
                var message = error.message ? error.message : error;
                callback({ 'message': 'Error: ' + message });
            }
        });

        this.driver.connection.on('error', error => {
            this.onError(error);
        });

        this.driver.connection.on('connected', error => {
            this.onConnect();
        });
    }

    getUri(){
        var uri = this.option.driver+'://'+this.option.host+':'+this.option.port+'/'+this.option.name;
        console.log(uri);
        return uri;
    }

    getModel(objDTO, collection='default', name=false){
        name = name || collection;
        if(!this.models[name]){
            objDTO = objDTO instanceof Function ? new objDTO() : objDTO; 
            var schema = new this.driver.Schema(objDTO, {
                'collection': collection
                //_id: false
            });
            this.models[name] = this.driver.model(name, schema);
        }
        return this.models[name];
    }

    onError(error){
        var message = error.message ? error.message : error;
        console.log('<------------> DAO ERROR: data base connect error : ' + message);
    }

    onConnect(){
        console.log('<------------> DAO data base connect success');
    }
}
module.exports = BaseDAO;
