const fs = require('fs')

class Book {

    constructor(file) {
        this.file = file;
        this.books = JSON.parse(fs.readFileSync(file, 'utf-8'));
    }

    async all() {
        return this.books
    }

    async clear() {
        this.books = []
        await this.save()
    }

    async get(id) {
        return new Promise((resolve, error) => {
            for (let book of this.books.values()) {
                if (book.id == id) {
                    resolve(book)
                    return;
                }
            }

            resolve(null)
        })
    }

    async add(book) {
        book.id = this.randomId()
        this.books.push(book)
        this.save()
        return book
    }

    async put(id, book) {
        const found = await this.get(id)
        if (!found)
            return null

        Object.keys(found).forEach(key => {
            if (book[key] != undefined) {
                found[key] = book[key]
            }
        })
        this.save()
        return found
    }

    async delete(idToDelete) {
        return new Promise((resolve, error) => {
            for (let [id, book] of this.books.entries()) {
                if (book && book.id == idToDelete) {
                    delete this.books[id]
                    this.save()
                    resolve(book)
                    return;
                }
            }

            resolve(null)
        })
    }

    async save() {
        fs.writeFileSync(this.file, JSON.stringify(this.books), 'utf-8')
    }

    randomId() {
        var text = "";
        var possible = "abcdef0123456789";
        for (var i = 0; i < 24; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}

module.exports = Book