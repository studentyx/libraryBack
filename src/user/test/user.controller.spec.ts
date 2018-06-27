
import { expect } from 'chai';
import request = require('supertest');

const port: string = '3000';
const peticion = request.agent('http://localhost:' + port);

var auth = require('../../auth/test/auth.controller.spec.ts');
var token = '';
var id = '';

var user = {
    username: 'diego',
    password: 'diego',
};

describe('Testing User API', function () {

    describe('Get token authorization', function () {

        it('POST /auth', async function () {
            const authRes = await auth.authResponse(user);
            expect(201).to.equal(authRes.status);
            token = authRes.body.token;
        });
    });

    describe('User API Methods', function () {

        it('GET /users/id', function (done) {
            peticion.get('/users/' + user.username)
                .end((err, res) => {
                    expect(200).to.equal(res.status);
                    expect('diego@library.es').to.equal(res.body.email);
                    done();
                });
        });

        it('PATCH /users', function (done) {

            let update = {
                email: 'diego@test.es',
            }

            peticion.patch('/users/' + user.username)
                .set('Authorization', token)
                .send(update)
                .end((err, res) => {
                    expect(200).to.equal(res.status);
                    expect('diego@test.es').to.equal(res.body.email);
                    done();
                });
        });

    });

});


