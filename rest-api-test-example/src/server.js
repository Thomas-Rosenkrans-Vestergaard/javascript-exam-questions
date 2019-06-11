const createApplication = require('./app')
const port = 3003


const JsonFileDatabase = require('./JsonFileDatabase')
const people = new JsonFileDatabase('people.json')
app = createApplication(people)
app.listen(port)
console.log("Server started on port " + port)