const createApplication = require('./app')
const port = 3003

app = createApplication('books.json')
app.listen(port)
console.log("Server started on port " + port)