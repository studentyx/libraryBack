import { expect } from 'chai';
import request = require('supertest');
const port: string = '3000';
const peticion = request.agent('http://localhost:' + port);

var auth = require('../../auth/test/auth.controller.spec.ts');

exports.authResponse = async function (user) {
    
        return new Promise<any>((resolve, reject) => {
            peticion
                .post('/auth')
                .send(user)
                .end((err, res) => {
                    resolve(res);
                });
        });
    };

describe('Testing Auth Controller Get Token', function () {

    var user = {
        username: 'diego',
        password: 'diego',
    };

    it('POST /auth', async function () {
        const res = await auth.authResponse( user );
        expect(201).to.equal(res.status);
    });
});
