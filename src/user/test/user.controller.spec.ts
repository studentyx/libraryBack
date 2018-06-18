import { expect } from 'chai';
import request = require('supertest');

const port: string = '3000';
const peticion = request.agent('http://localhost:' + port);
var usernameTest = '';

describe('Testing User Controller POST /users method', function () {

    var user = {
        username: 'testUser',
        password: 'testUser',
        email: 'testUser@library.es',
        avatar: 'http://diasindia.com/wp-content/uploads/2016/11/admin.png',
        rol: 'visitor',
    };

    it('POST /users', function (done) {
        peticion.post('/users')
            .send(user)
            .end((err, res) => {
                console.log( res );
                expect(201).to.equal(res.status);
                expect('testUser@library.es').to.equal(res.body.email);
                usernameTest = res.body.username;
                done();
            });

    });
});

describe('Testing User Controller GET /users method', () => {

    it('GET /users', (done) => {
        peticion.get('/users')
            .end((err, res) => {
                expect(200).to.equal(res.status);
                expect('testUser').to.equal(res.body[res.body.length - 1].username);
                done();
            });
    });
});

