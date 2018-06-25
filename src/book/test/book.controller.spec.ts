import { expect } from 'chai';
import request = require('supertest');

const port: string = '3000';
const peticion = request.agent('http://localhost:' + port);
var id = '';

var auth = require('../../auth/test/auth.controller.spec.ts');
var token = '';
var id = '';

var user = {
    username: 'diego',
    password: 'diego',
};

describe('Testing Book API\n', function () {

    describe('Get token authorization: bookManager', function () {

        it('POST /auth', async function () {
            const authRes = await auth.authResponse(user);
            expect(201).to.equal(authRes.status);
            token = authRes.body.token;
        });
    });

    describe('Testing Book Controller POST /books method', function () {

        var book = {
            title: 'Harry Potter and the Chamber of Secrets',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51Gxl4YBTSL._SX315_BO1,204,203,200_.jpg',
            description: "Harry Potter's summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors - and then the attacks start. Students are found as though turned to stone . Dobby's sinister predictions seem to be coming true.",
            genre: [],
            tags: [],
            author: 'J.K. Rowling',
            rating: '0'
        };

        it('POST /books', function (done) {

            peticion.post('/books')
                .set('Authorization', token)
                .send(book)
                .end((err, res) => {
                    expect(201).to.equal(res.status);
                    expect('Harry Potter and the Chamber of Secrets').to.equal(res.body.title);
                    id = res.body._id;
                    done();
                });
        });
    });

    describe('Testing Book Controller GET /books method', () => {

        it('GET /books', function (done) {
            peticion.get('/books')
                .end((err, res) => {
                    expect(200).to.equal(res.status);
                    done();
                });
        });
    });

    describe('Testing Book Controller GET /books/id method', () => {

        it('GET /books', function (done) {
            peticion.get('/books/' + id)
                .end((err, res) => {
                    expect(200).to.equal(res.status);
                    expect('Harry Potter and the Chamber of Secrets').to.equal(res.body.title);
                    done();
                });
        });
    });

    describe('Testing Book Controller PATCH /books method', function () {

        var book = {
            title: '(Modified) Harry Potter and the Chamber of Secrets',
        };

        it('PATCH /books', function (done) {

            peticion.put('/books/' + id)
                .set('Authorization', token)
                .send(book)
                .end((err, res) => {
                    expect(200).to.equal(res.status);
                    expect('(Modified) Harry Potter and the Chamber of Secrets').to.equal(res.body.title);
                    done();
                });
        });
    });

    describe('Testing Book Controller DELETE /books method without token', function () {
        it('DELETE /books Must return response 403', function (done) {
            peticion.delete('/books/' + id)
                .end((err, res) => {
                    expect(403).to.equal(res.status);
                    done();
                });

        });
    });

    describe('Testing Book Controller DELETE /books method with token', function () {
        it('DELETE /books Succesful Deleting', function (done) {
            peticion.delete('/books/' + id)
                .set('Authorization', token)
                .end((err, res) => {
                    expect(200).to.equal(res.status);
                    done();
                });

        });
    });

    describe('Testing Book Controller DELETE /books method. Id not found', function () {
        it('DELETE /books Id not found. Response 404', function (done) {
            peticion.delete('/books/' + id)
                .set('Authorization', token)
                .end((err, res) => {
                    expect(404).to.equal(res.status);
                    done();
                });

        });
    });


    describe('Testing Book Controller GET /books/id method Not Found', () => {

        it('GET /books', function (done) {
            peticion.get('/books/' + id)
                .end((err, res) => {
                    expect(404).to.equal(res.status);
                    done();
                });
        });
    });

    describe('Testing Book Controller PATCH /books method Not Found', function () {

        var book = {
            title: '(Modified) Harry Potter and the Chamber of Secrets',
        };

        it('PATCH /books Id not found. Response 404', function (done) {

            peticion.put('/books/' + id)
                .set('Authorization', token)
                .send(book)
                .end((err, res) => {
                    expect(404).to.equal(res.status);
                    done();
                });
        });
    });

});






