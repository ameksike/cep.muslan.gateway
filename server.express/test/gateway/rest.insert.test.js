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

describe('INSER gateway => POST /gateway', function() {
    it('responds with json', function(done) {
      request
        .post('/gateway')
        .send({
            "devices":[],
            "_id":"5e1122a6c3d5b526f45214a8",
            "sn":"99C",
            "name":"Gateway 3",
            "ipv4":"192.168.0.3"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });