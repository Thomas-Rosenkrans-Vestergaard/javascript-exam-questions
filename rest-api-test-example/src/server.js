const createApplication = require('./app')
const port = 3003

const JsonFileDatabase = require('./JsonFileDatabase')
const people = new JsonFileDatabase('people.json')
const app = createApplication(people)
app.listen(port, (err) => {
    if(err)
        console.error(err)
    else
        console.log(`Server started on port ${port}`)
})