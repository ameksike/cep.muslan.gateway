/*
 * @author		Antonio Membrides Espinosa
 * @email    	tonykssa@gmail.com
 * @date		06/01/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
process.env.NODE_ENV = 'test';
const tool   = require( __dirname + '/../app/tool.js');
const { app }  = require( __dirname + '/../../src/app/index.js');
const request = require('supertest').agent(app.listen());

beforeAll(() => {
    tool.fill();
});

afterAll(() => {
    tool.clean();
});

describe('SELECT PERIPHERAL ALL => GET /gateway/98A/peripheral/', () => {
    test('It should response the GET method', (done) => {
        request.get('/gateway/98A/peripheral/').then((response) => {
            expect(response.body.status).toBe(true);
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('SELECT PERIPHERAL by UID => GET /gateway/98A/peripheral/59', () => {

    test('It should response the GET method', (done) => {
        request.get('/gateway/98A/peripheral/59').then((response) => {
            expect(response.body.status).toBe(true);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({"status":true,"message":"Success","data":{"_id":"5e11507f093d7615c015f505","uid":59,"vendor":"Device 1","status":true,"created":"2020-01-05T07:31:05.417Z"}});
            done();
        });
    });
});
