import { expect } from 'chai';
import request = require('supertest');


var chai = require('chai');

const port: string = '3000';
const peticion = request.agent('http://localhost:' + port);
var id = '';

describe('Testing Book Controller GET /books method', () => {

    it('GET /books', (done) => {
        peticion.get('/books')
        .end((err, res) => {
            expect(200).to.equal(res.status);
            expect('5afb933efc14c31c4071fb71').to.equal(res.body[0]._id);
            done();
        });
    });
});

describe( 'Testing Book Controller POST /books method', function()  {
   
    var book = {
        title:  'The Lion, the Witch and the Wardrobe (The Chronicles of Narnia)',
        image: 'https://imagessl1.casadellibro.com/a/l/t0/31/9788408057031.jpg',
        description: 'Four adventurous siblings—Peter, Susan, Edmund, and Lucy Pevensie—step through a wardrobe door and into the land of Narnia, a land frozen in eternal winter and enslaved by the power of the White Witch. But when almost all hope is lost, the return of the Great Lion, Aslan, signals a great change . . . and a great sacrifice.',
        genre: [],
        tags: [],
        author: 'C. S. Lewis',
        rating: '0'
    };

    it( 'POST /books', function( done ){
        peticion.post('/books')
        .send(book)
        .end((err, res) => {
            expect(201).to.equal( res.status );
            expect('The Lion, the Witch and the Wardrobe (The Chronicles of Narnia)').to.equal(res.body.title);
            id = res.body._id;
            done();
        });

    });
});

describe( 'Testing Book Controller DELETE /books method', function()  {
    
    it( 'DELETE /books Succesful Deleting', function( done ){
        peticion.delete('/books/' + id )
        .end((err, res) => {
            expect(200).to.equal( res.status );
            done();
        });

    });

    it( 'DELETE /books Not Found', function( done ){
        peticion.delete('/books/' + 'sfsdfsd' )
        .end((err, res) => {
            expect(500).to.equal( res.status );
            done();
        });

    });
});








