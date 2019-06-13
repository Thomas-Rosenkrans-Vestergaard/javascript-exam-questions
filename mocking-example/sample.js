const sinon = require('sinon')
const fetch = require('node-fetch')

// stub functions

function FunctionToStub() {
    return "a"
}

const stub = sinon.stub();
stub.returns("b")
stub.onSecondCall().returns("c")
console.log(FunctionToStub())
console.log(stub())
console.log(stub())
sinon.assert.calledTwice(stub)

// stub objects

const fetcher = {
    async fetch(url) {
        const response = await fetch(url)
        return await response.text()
    }
}

// object to test
async function scraper(url, fetcher){
    const body = await fetcher.fetch(url)
    return body.charAt(0) + body.charAt(0)
}

const fetcherStub = {
    fetch: sinon.stub().returns(Promise.resolve("bbbbb"))
}

async function testScraper(){
    const result = await scraper("http://google.com", fetcherStub)
    console.log(`scraper result is ${result}`)
    assert(result == "bb", "Scraper does not work")
}

testScraper()


function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}