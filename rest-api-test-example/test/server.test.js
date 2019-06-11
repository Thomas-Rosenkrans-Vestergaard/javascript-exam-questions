const createApplication = require('../src/app')
const MemoryDatabase = require('./MemoryDatabase')
const testPeople = require('./testPeople')
const [personA, _, personC] = testPeople

const people = new MemoryDatabase(testPeople)
const app = createApplication(people)
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('REST', function () {

    before(function (done) {
        this.server = app.listen(3004, function () {
            done()
        });
    });

    beforeEach(function (done) {
        people.reset()
        done()
    })

    it('GET /people should return a list of people', function (done) {
        chai.request(this.server)
            .get('/people')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200)
                expect(res).to.be.json;
                expect(res.body).to.have.length(3)
                expect(res.body[0]).to.be.eql(personA)
                expect(res.body[2]).to.be.eql(personC)
                done()
            })
    })

    it('GET /people/:id should return a single person from an id.', function (done) {
        chai.request(this.server)
            .get('/people/a_id')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200)
                expect(res).to.be.json;
                expect(res.body).to.be.eql(personA)
                done()
            })
    })

    it('GET /people/:id should return null when the provided id does not exist.', function (done) {
        chai.request(this.server)
            .get('/people/does_not_exist')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404)
                expect(res).to.be.json;
                expect(res.body).to.be.eql({
                    message: 'Could not find person'
                })
                done()
            })
    })

    it('POST /people should create a new person', function (done) {
        const toSubmit = {
            "name": "d_name",
            "email": "d_emai",
            "phone": "d_phone",
            "address": "d_address"
        }
        chai.request(this.server)
            .post('/people')
            .send(toSubmit)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201)
                expect(res).to.be.json;
                expect(res.body).to.have.property('id')
                Object.keys(toSubmit).forEach(k => {
                    expect(res.body).to.have.property(k, toSubmit[k])
                })
                done()
            })
    })

    it('PUT /people/:id should should behave on unknown person id', function (done) {
        chai.request(this.server)
            .put('/people/does_not_exist')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404)
                expect(res).to.be.json;
                expect(res.body).to.eql({
                    message: 'Could not find person'
                })
                done()
            })
    })

    it('PUT /people/:id should update an existing person', function (done) {

        const toUpdate = {
            name: 'new_a_name'
        }
        chai.request(this.server)
            .put('/people/a_id')
            .send(toUpdate)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200)
                expect(res).to.be.json;
                expect(res.body).to.have.property('name', 'new_a_name')
                done()
            })
    })

    it('DELETE /people/:id should behave on unknown person id.', function (done) {
        chai.request(this.server)
            .delete('/people/does_not_exist')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404)
                expect(res).to.be.json;
                expect(res.body).to.eql({
                    message: 'Could not find person'
                })
                done()
            })
    })

    it('DELETE /people/:id should delete the person with the provided id.', function (done) {

        expect(people.get('a_id')).not.to.be.null; // before

        chai.request(this.server)
            .delete('/people/a_id')
            .end(async (err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200)
                expect(res).to.be.json;
                expect(res.body).to.eql(personA)
                const found = await people.get('a_id')
                expect(found).to.be.null; // after
                done()
            })
    })

    after(function () {
        this.server.close()
    });
});