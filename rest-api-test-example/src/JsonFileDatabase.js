const fs = require('fs')

class JsonFileDatabase {

    constructor(file) {
        this.file = file;
        this.entities = {};
        JSON.parse(fs.readFileSync(file, 'utf-8')).forEach(entity => {
            if (entity)
                this.entities[entity.id] = entity
        })
    }

    async all() {
        return Object.values(this.entities)
    }

    async clear() {
        this.entities = {}
        await this.__save()
    }

    async get(id) {
        return this.entities[id]
    }

    async add(entity) {
        entity.id = this.__randomId()
        this.entities[entity.id] = entity
        this.__save()
        return entity
    }

    async put(id, entity) {
        const found = await this.entities[id]
        if (!found)
            return null

        Object.keys(found).forEach(key => {
            if (entity[key] != undefined) {
                found[key] = entity[key]
            }
        })
        this.__save()
        return found
    }

    async delete(idToDelete) {
        return new Promise((resolve, error) => {
            for (let [id, entity] of Object.entries(this.entities)) {
                if (entity && entity.id == idToDelete) {
                    delete this.entities[id]
                    this.__save()
                    resolve(entity)
                    return;
                }
            }

            resolve(null)
        })
    }

    async __save() {
        fs.writeFileSync(this.file, JSON.stringify(this.entities), 'utf-8')
    }

    __randomId() {
        var text = "";
        var possible = "abcdef0123456789";
        for (var i = 0; i < 24; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}

module.exports = JsonFileDatabase