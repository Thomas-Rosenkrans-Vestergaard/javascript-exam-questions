class Jokes {
    constructor() {
        this._jokes = [
            "A day without sunshine is like, night.",
            "At what age is it appropriate to tell my dog that he's adopted?",
            "I intend to live forever, or die trying"
        ];
    }

    getRandomJoke() {
        const index = Math.floor(Math.random() * this._jokes.length)
        return this._jokes[index]
    }

    getAllJokes() {
        return [... this._jokes]
    }

    addJoke(joke) {
        this._jokes.push(joke)
    }
}

module.exports = Jokes