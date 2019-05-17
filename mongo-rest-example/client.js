const filler = require('./books');
const fetch = require('node-fetch');
const REST_URL = "http://localhost:3006/books";

function fill(){
    filler.forEach(async book => {
        const created = await createBook(book.title, book.year, [{name: book.author}], book.language, book.pages);
        console.log(`inserted ${created.title} with id ${created._id}`);
    })
}

async function createBook(title, year, authors, language, pages){
    const response = await fetch(REST_URL, {
        method: 'POST',
        body: JSON.stringify({title, year, authors, language, pages}),
        headers : {
            'Content-Type': "application/json"
        }
    });

    if(response.status < 200 || response.status > 299)
        throw new Error(response.json().message);

    return response.json();
}

fill();