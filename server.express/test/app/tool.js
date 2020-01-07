var path = __dirname  + "/../../";
var config = require( path + 'cfg/config.json');
var data = require( path + 'data/fill.json');
var GatewayDAO = require( path + 'src/gateway/model/GatewayDAO.js');

var gatewayDAO = new GatewayDAO(config.env.test.app.db);

var Tool = {
    fill: function(callback){
        gatewayDAO.fill(callback, data);
    },
    clean: function(callback){
        gatewayDAO.clean(callback)
    }
};

global.log = function(data){
        console.log(data);
}

module.exports = Tool;