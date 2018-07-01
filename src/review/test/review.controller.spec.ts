import { expect } from 'chai';
import request = require('supertest');

const port: string = '3000';
const peticion = request.agent('http://localhost:' + port);

var auth = require('../../auth/test/auth.controller.spec.ts');
var token = '';
var id = '';
var idBook = '';

var user = {
    username: 'diego',
    password: 'diego',
};



describe('Testing Review API', function () {

    describe('Get token authorization: visitor', function () {

        it('POST /auth', async function () {
            const authRes = await auth.authResponse(user);
            expect(201).to.equal(authRes.status);
            token = authRes.body.token;
        });
    });

    describe('Testing Review API', function () {

        var book = {
            title: 'Harry Potter and the Chamber of Secrets',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51Gxl4YBTSL._SX315_BO1,204,203,200_.jpg',
            description: "Harry Potter's summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors - and then the attacks start. Students are found as though turned to stone . Dobby's sinister predictions seem to be coming true.",
            genre: [],
            tags: [],
            author: ['J.K. Rowling'],
        };

        it('POST /books', function (done) {

            peticion.post('/books')
                .set('Authorization', token)
                .send(book)
                .end((err, res) => {
                    expect(201).to.equal(res.status);
                    expect('Harry Potter and the Chamber of Secrets').to.equal(res.body.title);
                    idBook = res.body._id;
                    var review =
                        done();
                });
        });

        it('POST /reviews', function (done) {
            peticion.post('/reviews')
                .set('Authorization', token)
                .send({
                    book: { _id: idBook },
                    text: 'This is a test review',
                })
                .end((err, res) => {
                    expect(201).to.equal(res.status);
                    expect('diego').to.equal(res.body.user.username);
                    expect('This is a test review').to.equal(res.body.text);
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



        it('PATCH /reviews/id Expected 200', function (done) {
            let reviewPatch = {
                text: 'This is a test review (Modified)',
            }
            peticion.patch('/reviews/' + id)
                .set('Authorization', token)
                .send(reviewPatch)
                .end((err, res) => {
                    expect(200).to.equal(res.status);
                    expect('This is a test review (Modified)').to.equal(res.body.text);
                    done();
                });
        });

        it('PATCH /reviews/id Forbidden Resource', function (done) {
            peticion.patch('/reviews/' + id)
                .send({
                    book: { _id: idBook },
                    text: 'This is a test review',
                })
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
            peticion.patch('/reviews/' + id)
                .set('Authorization', token)
                .send({
                    book: { _id: idBook },
                    text: 'This is a test review',
                })
                .end((err, res) => {
                    expect(404).to.equal(res.status);
                    done();
                });
        });

        it('Review DELETE /books', function (done) {
            peticion.delete('/books/' + idBook)
                .set('Authorization', token)
                .end((err, res) => {
                    expect(200).to.equal(res.status);
                    done();
                });

        });

    });

});





