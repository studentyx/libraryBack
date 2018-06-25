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

var review = {
    text: 'This is a test review',
}

describe('Testing Review API\n', function () {

    describe('Get token authorization: visitor', function () {

        it('POST /auth', async function () {
            const authRes = await auth.authResponse(user);
            expect(201).to.equal(authRes.status);
            token = authRes.body.token;
        });
    });

    describe('Testing Review API', function () {

        it('POST /reviews', function (done) {
            peticion.post('/reviews')
                .set('Authorization', token)
                .send(review)
                .end((err, res) => {
                    expect(201).to.equal(res.status);
                    expect('fernando').to.equal(res.body.user.username);
                    id = res.body._id;
                    done();
                });
        });

        it('GET /reviews', function (done) {
            peticion.get('/reviews')
                .end((err, res) => {
                    expect(200).to.equal(res.status);
                    done();
                });
        });

        review = {
            text: 'This is a test review (Modified)',
        }

        it('PATCH /reviews/id Expected 200', function (done) {
            peticion.put('/reviews/' + id)
            .set('Authorization', token)
            .send(review)
            .end((err, res) => {
                expect(200).to.equal(res.status);
                expect('This is a test review (Modified)').to.equal(res.body.text);
                done();
            });
        });

        it('PATCH /reviews/id Forbidden Resource', function (done) {
            peticion.put('/reviews/' + id)
            .send(review)
            .end((err, res) => {
                expect(403).to.equal(res.status);
                done();
            });
        });

        it('DELETE /reviews/id. Expected 200', function (done) {
            peticion.delete('/reviews/' + id)
                .set('Authorization', token)
                .end((err, res) => {
                    expect(200).to.equal(res.status);
                    expect('This is a test review (Modified)').to.equal(res.body.text);
                    done();
                });
        });

        it('PATCH /reviews/id Not found', function (done) {
            peticion.put('/reviews/' + id)
            .set('Authorization', token)
            .send(review)
            .end((err, res) => {
                expect(404).to.equal(res.status);
                done();
            });
        });

    });

});





