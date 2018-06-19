import { expect } from 'chai';
import request = require('supertest');

const port: string = '3000';
const peticion = request.agent('http://localhost:' + port);
var usernameTest = '';

var token = '';
var bookTest = null;
var id = '';

describe('Testing Auth Controller Get Token', function () {

    var user = {
        username: 'diego',
        password: 'diego',
    };

    it('POST /auth', function (done) {
        peticion.post('/auth')
            .send(user)
            .end((err, res) => {
                expect(201).to.equal(res.status);
                token = res.body.token;
                done();
            });

    });

});

describe('Testing Book Controller GET /books/id method', () => {

    it('GET /books/id', (done) => {
        peticion.get('/books/5afb933efc14c31c4071fb71')
            .end((err, res) => {
                expect(200).to.equal(res.status);
                expect('5afb933efc14c31c4071fb71').to.equal(res.body._id);
                bookTest = res.body;
                done();
            });
    });
});

describe('Testing Review Controller POST /reviews method', function () {

    it('POST /reviews with token', function (done) {
        var review = {
            book: bookTest,
            text: 'testing review',
        }

        peticion.post('/reviews')
        .set('Authorization', token )
        .send(review)
        .end((err, res) => {
            expect(201).to.equal(res.status);
            expect('diego').to.equal(res.body.user.username);
            id = res.body._id;
            done();
        });

    });

});

describe('Testing Review Controller DELETE /reviews method', function () {

    it('DELETE /reviews with token', function (done) {

        peticion.delete('/reviews/' + id)
        .set('Authorization', token )
        .end((err, res) => {
            expect(200).to.equal(res.status);
            done();
        });

    });

});



