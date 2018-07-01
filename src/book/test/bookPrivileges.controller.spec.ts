import { expect } from 'chai';
import request = require('supertest');

const port: string = '3000';
const peticion = request.agent('http://localhost:' + port);

var auth = require('../../auth/test/auth.controller.spec.ts');
var token = '';
var id = '';

var user = {
    username: 'fernando',
    password: 'fernando',
};

describe('Testing Book API', function () {

    describe('Get token authorization: visitor', function () {

        it('POST /auth', async function () {
            const authRes = await auth.authResponse(user);
            expect(201).to.equal(authRes.status);
            token = authRes.body.token;
        });
    });

    describe('Testing Get methods without special privileges', () => {

        it('GET /books', function (done) {
            peticion.get('/books')
                .end((err, res) => {
                    expect(200).to.equal(res.status);
                    id = res.body[0]._id;
                    done();
                });
        });

        it('GET /books/id', function (done) {
            peticion.get('/books/' + id)
                .end((err, res) => {
                    expect(200).to.equal(res.status);
                    done();
                });
        });

        it('GET /books/id incorrect id', function (done) {
            peticion.get('/books/incorrect' )
                .end((err, res) => {
                    expect(400).to.equal(res.status);
                    done();
                });
        });
        
    });

    describe('Testing managing books without special privileges', function () {

        it('POST /books. Expected 403', function (done) {
            peticion.post('/books')
                .set('Authorization', token)
                .send({
                    title: 'Harry Potter and the Chamber of Secrets',
                })
                .end((err, res) => {
                    expect(403).to.equal(res.status);
                    done();
                });
        });

        it('DELETE /books. Expected 403', function (done) {
            peticion.delete('/books/' + id)
                .set('Authorization', token)
                .end((err, res) => {
                    expect(403).to.equal(res.status);
                    done();
                });
        });

    });

});