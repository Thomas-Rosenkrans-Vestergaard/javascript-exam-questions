const createApplication = require('../src/app')
const JsonFileDatabase = require('../src/JsonFileDatabase')

const fs = require('fs')
const chai = require('chai');
const expect = chai.expect;
const testPeople = require('./testPeople')
const [personA] = testPeople

describe('JsonFileDatabase', function () {

    beforeEach(function (done) {
        fs.writeFile('temp.json', JSON.stringify(testPeople), function () {
            this.database = new JsonFileDatabase('temp.json')
            done()
        }.bind(this));
    })

    describe('all', function () {
        it('should return a complete list of people', async function () {
            const results = await this.database.all()
            expect(results).to.have.lengthOf(3)
        })
    })

    describe('get', function () {
        it('should return the person with the provided id', async function () {
            const result = await this.database.get('a_id')
            expect(result).to.eql(personA)
        })
        it('should return null when the provided id matches no person', async function () {
            const result = await this.database.get('unknown')
            expect(result).to.eql(undefined);
        })
    })

    describe('add', function () {
        it('should add a new person to the database', async function () {
            const toInsert = {
                "name": "d_name",
                "email": "d_email",
                "phone": "d_phone",
                "address": "d_address"
            }
            const result = await this.database.add(toInsert)
            expect(result).to.have.property("id")
            Object.keys(toInsert).forEach(k => {
                expect(result[k]).to.eql(result[k])
            })
        })
    })


    describe('put', function () {
        it('should update the person with the provided id', async function () {
            const toUpdate = { name: 'new_a_name' }
            const updated = await this.database.put('a_id', toUpdate)
            expect(updated.name).to.eql('new_a_name')
            const retrieve = await this.database.get('a_id')
            expect(retrieve.name).to.eql('new_a_name')
        })
        it('should return undefined when the provided id matches no people', async function () {
            const result = await this.database.put('unknown', {})
            expect(result).to.eql(null)
        })
    })


    describe('delete', function () {
        it('should delete the person with the provided id', async function () {
            const deleted = await this.database.delete('a_id')
            expect(deleted).to.eql(personA)
            expect(await this.database.get('a_id')).to.eql(undefined)
        })
        it('should return undefined when no person with the provided id exists', async function () {
            expect(await this.database.get('unknown')).to.eql(undefined)
        })
    })

    afterEach(function (done) {
        fs.writeFile('temp.json', JSON.stringify(testPeople), function () {
            done()
        })
    });

    after(function (done) {
        fs.unlink('temp.json', function () {
            done()
        })
    })
});