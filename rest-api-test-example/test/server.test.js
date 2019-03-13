const createApplication = require('../src/app')
const app = createApplication('books.test.json')
const chai = require('chai');
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('app', function () {

    before(function () {
        this.server = app.listen(3004);
    });

    it('Should return a list of books', function (done) {
        chai.request(app)
            .get('/books')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql()
            })
    })

    after(function () {
        this.server.close()
    });
});