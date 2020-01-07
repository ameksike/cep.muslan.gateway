/*
 * @author		Antonio Membrides Espinosa
 * @email    	tonykssa@gmail.com
 * @date		06/01/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */

process.env.NODE_ENV = 'test';
const { app }  = require( __dirname + '/../../src/app/index.js');
const request = require('supertest').agent(app.listen());
