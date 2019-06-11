# Period-2 Node.js, Express + JavaScript Backend Testing, NoSQL, MongoDB and Mongoose

## JavaScript Backend

### Why would you consider a Scripting Language as JavaScript as your Backend Platform?

Scripting languages like PHP, JavaScript, Python or Ruby often allow for faster development. These languages are often more expressive and therefore allow for more features and functionality using fewer lines of code. 

One of the reasons scripting languages allow for faster development is a faster build process, since many of these languages are interpreted rather than compiled. This means that the process of building and deploying to a development environment often takes mere seconds, this can be extremely important, since web-development often rely on a code-feedback loop. Especially when using server-side rendring.

Scripting languages often also have a wast amount of libraries used for web-development.

JavaScript is additionally suited for backend development, since it means both the frontend and backend of a project, is developed using the same language.

### Explain the pros and cons in using Node.js + Express to implement your Backend compared to a strategy using, for example, Java/JAX-RS/Tomcat.

Node.js have the advantages of scripting languages already mentioned. 

Using express with node allows for extremely fast development, especially when using the npm package `nodemon`. `nodemon` allows for restarting the development server when a developer edits project code.

> Express.js framework allows you to use the same language which is JavaScript both on the back-end and front-end. It gives JavaScript developers the opportunity to become full-stack. As a result, the development process is much faster and easier as one person can manage both presentation and data access layer.

> Express.js is a minimalist framework, so Express development team has created middleware packages for solving different development problems. They include URL parameters, sessions, POST data, security headers, libraries etc.
>
>Express.js is unopinionated framework, which means that there is no strict and determined rules on how to deal with particular tasks or what components to choose. You can use any middleware in the order that is convenient for you. Also, you can decide how to structure your app, as there is no one right way to do it.

> Ecosystem. Because it is a newer platform, most of the community-driven libraries are also newer. It's really easy to fall into the trap of using a library in Rails that is no longer actively maintained. However, Node's ecosystem is also mature enough that I've never not been able to find a library to do something I wanted.

It is extremely easy to delveop a backend using express and Node.js. A simple web-server can be created in few lines, and can be extended when required, using express middleware.

### Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server.

Usually Node.js applications only run on a single core. We can take advantage of more cores by using the [cluster](https://nodejs.org/api/cluster.html) application programming interface. The cluster API is imported using `import 'cluster'` or `require('cluster')`.

* https://rowanmanning.com/posts/node-cluster-and-express/

> Node.js runs in a single thread. While it’s still very fast in most cases, this really doesn’t take advantage of multiple processors if they’re available. The Cluster module allows you to create a small network of separate processes which can share server ports; this gives your Node.js app access to the full power of your server.

The cluster API works by creating new processes using the `cluster.fork` function. These new processes then _compete_ for incomming requests.

The example can be found in the [cluster-express-example](./cluster-express-example/server.js) folder.

The cluster API can additionally be used to deal with exceptions that would normally cause the application the crash. One of the problems with Node.js is that one exception can crash the whole application. When using cluster, only the worker process will die on an exception. If a worker dies we can use the `exit` event to simply start up a new worker.

```js
cluster.on('exit', function (worker) {
    console.log(`Worker ${worker.id} died`);
    cluster.fork(); // Lets create a new one
});
```

### Explain briefly how to deploy a Node/Express application including how to solve the following deployment problems.

* __Ensure that you Node-process restarts after a (potential) exception that closed the application.__

    Above i have presented one way of handling exceptions that threaten to crash the application. This solution only works when using the cluster API. This model is more comparable to server architectures that natively opens a new process per request, ei. Tomcat or Apache.

    Another strategy is to use a process manager. When using a process manager, the process manager manages the starting of the application. You no longer start the application yourself, but instead instruct a process manager to do it for you. These process managers can be configured to automatically restart the application on crashes.

    [Express states](https://expressjs.com/en/advanced/pm.html) that process managers are useful for:
    * Restart the app automatically if it crashes.
    * Gain insights into runtime performance and resource consumption.
    * Modify settings dynamically to improve performance.
    * Control clustering.

    Some popular process managers are:
    * [forever](https://github.com/foreverjs/forever)
    * [pm2](http://pm2.keymetrics.io/)
    * [StrongLoop Process Manager](http://strong-pm.io/)
    * SystemD

* __Ensure that your Node-process restarts after a server (Ubuntu) restart.__

    Process managers are useful when restarting a node application when an exception occurs within the application itself. They do not alone help when the entire server restarts. Instead the developer must instruct the server to restart the application.

    You can create a cronjob that is executed on restart by using the `@reboot` directive. Creating a new cronjob can be accomplished by running the `crontab -e` command and inserting a new directive.

    `@reboot /path/to/node /path/to/server.js`

    You can also add the command to the `/etc/rc.local` file.

    When using a process manager it is of course inportant that the process manager is the one to start the application. Assuming that `pm2` is installed globally using `npm`: 

    `@reboot pm2 start /path/to/server.js`

* __Ensure that you can take advantage of a multi-core system.__

    I feel this question has been answered above.

* __Ensure that you can run “many” node-applications on a single droplet on the same port.__

    When deploying web-applications, we almost always want our applications to be accessable from the default port for http traffic (80).

    My preferred way of running multiple _accessable_ node application is to use a reverse proxy like nginx. Using nginx we can forward incoming requests to different node applications, based on the path of the incoming requests.

    Assume we have the following node applications.
    
    * application `a` running on port `3333`
    * application `b` running on port `4444`

    We can configure nginx to forward requests to these application based on the incoming urls.

    ```nginx
    location /a/ {
        proxy_pass https://127.0.0.1:3333/;
    }
    location /b/ {
        proxy_pass https://127.0.0.1:4444/;
    }
    ```

    I prefer this method, since the routes defined in the express applications do not have to change. If the application `a` has a route `/home`, the application can still easily be deployed in the root of a website.


### Explain the difference between “Debug outputs” and application logging. What’s wrong with console.log(..) statements in our backend-code.

The problem with using `console.log` is that the output cannot easily be disabled when deployed to a production environment. Since `console.log` is a blocking call, the impact on the performance of the application will suffer. 

The `debug` package exports a function that can be used create a function, that in turn can print debugging messages.

```js
const a = require('debug')('a') // Creates a debug function with the name a
const b = require('debug')('b') // Creates a debug function with the name b
const c = require('debug')('c') // Creates a debug function with the name c

a('Printed by a')
b('Printed by b')
c('Printed by c')
```

These messages can easily be enabled or disabled based on the `DEBUG` environment variable.

* when `DEBUG=*`, all debug statements are printed.
* when `DEBUG=a`, only the `a` debug statements are printed.
* when `DEBUG=*,-a`, all debug statements except `a` are printed.
* when `DEBUG=a,b`, only `a` and `b` debug statements are printed.

Names can also be enabled based on a regex like syntax.

```js
const a = require('debug')('name:a')
const b = require('debug')('name:b')
```

* when `DEBUG=name:a`, `a` debug statements are printed.
* when `DEBUG=name:*`, all debug statements starting with `name` are printed.

### Demonstrate a system using application logging and “coloured” debug statements.

An example can be found in the [debugging-example](./debugging-example) project. Note the `scripts` commands found in the `package.json` file. 

```json
{
    ...
    "scripts": {
        "start": "node server.js",
        "debug-all": "cross-env DEBUG=\"*\" npm run start",
        "debug-app": "cross-env DEBUG=\"app:*\" npm run start",
        "debug-app-http": "cross-env DEBUG=\"app:http:*\" npm run start",
        "debug-app-calculator": "cross-env DEBUG=\"app:calculator\" npm run start"
    }
}
```

Here the [cross-env](https://www.npmjs.com/package/cross-env) package is used so the environment variables can be set regardless of the operating system used.

### Explain, using relevant examples, concepts related to testing a REST-API using Node/JavaScript + relevant packages.

Testing a REST API is much easlier using `express` than in many other languages like Java. When using languages like Java, web services often need to be deployed to a dedicated server. Using express we can programmatically start our express server using the `listen` method. We can then use the `node-fetch` package to make requests to the REST API.

[rest-api-test-example](./rest-api-test-example)

#### Configuration issues

The application must be designed correctly, in order to be tested. You should not perfom tests in the production environment. The application must be able to switch configuration options, based on the requried environment: testing or non-testing.

In the above example i use a factory `createApplication` to create my express app, using different data storage solutions.

- [non-testing](https://github.com/Thomas-Rosenkrans-Vestergaard/javascript-exam-questions/blob/master/rest-api-test-example/src/server.js#L6)
- [testing](https://github.com/Thomas-Rosenkrans-Vestergaard/javascript-exam-questions/blob/master/rest-api-test-example/test/server.test.js#L27)

Another solution would be to switch the configuration options based on an environment variable.

### Explain, using relevant examples, the Express concept; middleware.

- https://expressjs.com/en/resources/middleware.html
- https://expressjs.com/en/guide/using-middleware.html

> Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
>
> Middleware functions can perform the following tasks:
> * Execute any code.
> * Make changes to the request and the response objects.
> * End the request-response cycle.
> * Call the next middleware function in the stack.

In express, middleware is a simply a function that is called before the incoming request is dispatched to a route. The middleware can be specific to a HTTP method or an application path. Note that multiple middleware functions can be provided at the same time.

```js

const express = require('express')

const a = require('middleware-a')
const b = require('middleware-b')
const c = require('middleware-c')

app.use(a)
app.use('/api', b, c)
app.get('/path', c)
```

Middleware help to achieve code-reuse, since one middleware function can be used on many routes. Some middleware is applied to all routes, ie. when using the [`cors`](https://expressjs.com/en/resources/middleware/cors.html) middleware to create a REST API.

```js
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

Authentication can also be implemented using middleware. The middleware can then be applied only to the routes that need authentication.

[express-middleware-example](./express-middleware-example)

```js
const express = require('express')
const app = express()

function authMiddleware(req, res, next) {
    if (!req.session.userName){ // when not logged in
        res.redirect('auth') // redirect to the login page
        return // dont call next
    }

    next() // move on to the next middleware or route
}

// only use the authentication middleware on the administration pages.
app.use('/admin', authMiddleware)
app.use('/admin', authRouter)
```

### Explain, using relevant examples, how to implement sessions and the legal implications of doing this.

Sessions can easily be implemented using the [express-session](https://github.com/expressjs/session) middleware. This middleware adds a cookie to the response. This cookie contains the session-id of the user. A `session` property is then added to the `request` object provided to the express middleware and routes.

The session middleware has many configuration options. But can easily be set up using the default options.

```js
const express = require('express')
const session = require('express-session')
const app = express()

app.use(session({secret: '|^3x"<EP65z+(lK`Q\ECuGre'})) // apply the session middleware to the entire apps

app.get('/', function(req, res) {
    if(!req.session.visits)
        req.session.visits = 1
    else
        req.session.visits++;

    res.send(`Numbers of visits: ${req.session.visits}`);
})
```

The session middleware has multiple strategies for session storage. The default strategy is `MemoryStorage`, however the developers state that:
> __Warning__ The default server-side session storage, `MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.

Other stragegies include storing the information in a `MongoDB` database: [connect-mongodb-session](https://www.npmjs.com/package/connect-mongodb-session).

The legal considerations from implementing sessions mostly come from the recent EU GDPR regulations. 

https://webmasters.stackexchange.com/a/115036
http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm

The eu further state:

>EUROPA websites must follow the Commission's guidelines on privacy and data protection and inform users that cookies are not being used to gather information unnecessarily.

>The ePrivacy directive – more specifically Article 5(3) – requires prior informed consent for storage or for access to information stored on a user's terminal equipment. In other words, you must ask users if they agree to most cookies and similar technologies (e.g. web beacons, Flash cookies, etc.) before the site starts to use them.

>For consent to be valid, it must be informed, specific, freely given and must constitute a real indication of the individual's wishes.

>However, some cookies are exempt from this requirement. Consent is not required if the cookie is:

>* used for the sole purpose of carrying out the transmission of a communication, and
strictly necessary in order for the provider of an information society service explicitly required by the user to provide that service.
>* Cookies clearly exempt from consent according to the EU advisory body on data protection- WP29pdf include:

>* user‑input cookies (session-id) such as first‑party cookies to keep track of the user's input when filling online forms, shopping carts, etc., for the duration of a session or persistent cookies limited to a few hours in some cases
authentication cookies, to identify the user once he has logged in, for the duration of a session
>* user‑centric security cookies, used to detect authentication abuses, for a limited persistent duration
multimedia content player cookies, used to store technical data to play back video or audio content, for the duration of a session
load‑balancing cookies, for the duration of session
user‑interface customisation cookies such as language or font preferences, for the duration of a session (or slightly longer)
third‑party social plug‑in content‑sharing cookies, for logged‑in members of a social network.

### Compare the express strategy toward (server side) templating with the one you used with Java during the second semester.

Templating is used to compose/render dynamic HTML pages. Templates provide a better syntax for rendering, than most programming languages have natively. Most templating languages provide support for function calls, iteration and printing (output). There are templating libraries available for most, if not all, programming languages. Some templating libraries, like [mustache](https://mustache.github.io/) are available for multiple languages.

During the second semester we used JSP to render webpages. There are some differences between our usage of `JSP`, and template rendering using express.

* `JSP` is the default template renderer for Tomcat. Tomcat could automatically locate and render `JSP` files when accessed using `Tomcat`. Express has no default template engine, and the template is therefor rendered explicitly by registering a template engine. Using middleware we could similarly automatically locate and render a template based on the url path.

Outher than the above difference, they share many similarities:
* compilation to native code
* support for function calls, iteration and printing

### Demonstrate a simple Server Side Rendering example using a technology of your own choice (pug, EJS, ..)

The demonstration can be found at [server-side-rendering-example](./server-side-rendering-example). The example uses the [handlebars](./https://handlebarsjs.com/) templating library.

### Explain, using relevant examples, your strategy for implementing a REST-API with Node/Express and show how you can "test" all the four CRUD operations programmatically using, for example, the Request package.

The project can be found at [rest-api-test-example](rest-api-test-example). The assertions are made using the `chai` testing framework. The requests to the server are made using the `chai-http` library. The tests are run using the `mocha` library, using the `npm test` script.

- https://medium.com/@asciidev/testing-a-node-express-application-with-mocha-chai-9592d41c0083
- https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
- https://blog.khophi.co/mocha-chai-chai-http-test-express-api-auth-endpoints/

### Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.

Testing code is always important when developing software. But one could argue that testing JavaScript is even more useful than testing statically types languages like Java or C#. There is a whole new class of errors to be found. In statically types languges many errors are caught at compile-time. Since JavaScript is dynamically types, these errors must be caught by running the program first.

Furtermore, I would argue that JavaScript has many quirks that make it more error-prone than other languages. Some examples can be found [here](http://2ality.com/2013/04/12quirks.html) and [here](https://www.telerik.com/blogs/seven-javascript-quirks-i-wish-id-known-about). - These include `undefined` vs `null`, `==` vs `===`, and the behaviour of the `this` keyword. These quirks increase the likelyhood that your program has bugs, since the program becomes harder to reason about. [This page](https://charlieharvey.org.uk/page/javascript_the_weird_parts) contains other counterintuitive JavaScript behavoirs.


- https://blog.logrocket.com/a-quick-and-complete-guide-to-mocha-testing-d0e0ea09f09d
- https://javascript.info/testing-mocha
- https://www.codecademy.com/articles/bapi-testing-intro

I currently use the `mocha` testing library. Testing frameworks contain the code needed to execute the defined tests. They also provide a console-based interface that displays the tests and their result. Unlike `Junit` from the Java environment, `mocha` does not contain any assertion helpers such as `assertEquals` or `assertTrue`. This functionality is included with a seperate assertion library. In the above example i use `chai` as the assertion library. Most assertion libraries are interoperable with all other testing frameworks.

In addition i also use the `chai-http` extension to `chai`. This adds the `request` method to the `chai` object.

```js
chai.request(server) // The server is an instance of HttpServer
    .get('/url') // There are functions for the other HTTP methods (.post, .delete, .put)
    .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        // err when something went wrong
        // res is the response to the request
    })
```

The `chai-http` extension also adds some assertions that can be used to run assertions on the returned response object.

```js
interface Assertion {
            redirectTo(location: string): Assertion;
            param(key: string, value?: string): Assertion;
            cookie(key: string, value?: string): Assertion;
            status(code: number): Assertion; // Checks the HTTP code on the response
            statusCode(code: number): Assertion;
            header(key: string, value?: string | RegExp): Assertion; // Checks if a response header exists on the response.
            headers: Assertion;
            json: Assertion; // Checks that the response Content-Type is application/json
            text: Assertion;
            html: Assertion;
            redirect: Assertion; // Checks whether or not the returned request has a HTTP redirect code.
        }
```

Since JavaScript focuses heavily on asynchronous code, the testing frameworks must also be designed to handle that type of code. The standard way to test asynchronous code in Mocha, is to invoke the callback provided to the `before`, `after`, `it` and other blocks. This function is by convention called `done`. This function should be invoked to let Mocha know, that your tests have finished. When an error occurs, that error should be passed to the callback, to let Mocha know that the test failed.

```js
describe('fetch', function () {

    before(function (done) {
        
    });

    beforeEach(function (done) {
    
    })

    it('should respond with 200', function (done) {
        fetch('https://google.com')
            .then(response => {
                expect(response.status).to.be.eql(200)
                done() // The test has finished
            });
    })

    afterEach(function(done) {

    })

    after(function(done) {

    })
})
```

Mocha also has support for `Promise` based APIs. When returning a `Promise` from any of the blocks, Mocha will wait for the `Promise` to resolve or reject. This can save a few lines of code, and make the code easier to read.

### Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.

- https://stackoverflow.com/questions/2665812/what-is-mocking

> Mocking is primarily used in unit testing. An object under test may have dependencies on other (complex) objects. To isolate the behavior of the object you want to replace the other objects by mocks that simulate the behavior of the real objects. This is useful if the real objects are impractical to incorporate into the unit test.
>
>In short, mocking is creating objects that simulate the behavior of real objects.
>
>A mock is like a stub but the test will also verify that the object under test calls the mock as expected. Part of the test is verifying that the mock was used correctly.
>
>To give an example: You can stub a database by implementing a simple in-memory structure for storing records. The object under test can then read and write records to the database stub to allow it to execute the test. This could test some behavior of the object not related to the database and the database stub would be included just to let the test run.
>
>If you instead want to verify that the object under test writes some specific data to the database you will have to mock the database. Your test would then incorporate assertions about what was written to the database mock.

Note that mocking is not retricted to objects. Functions can also easily be mocked. An example could be testing webscraping component.

```js
// WebScaper.js
class WebScraper {
    
    constructor(fetcher) {
        this.fetcher = fetcher
    }

    async scrape(url) {
        const response = this.fetcher(url)
        return response.text.substring(5)
    }
}

const instance = new WebScraper(fetch) // fetch from node-fetch
```

In the above example our `WebScracper` class depends on another unit `fetcher`. The `fetcher` is responsible for making a HTTP request to the provided url. We want to ensure the `WebScraper` component works, that is returns the first 5 characters (a real webscraper would have much more functionality). We could acchieve this by making a _real_ HTTP request, but there are some brawbacks to this:

- We need to be able to rely on the returned value. This rules out urls that are not controlled by us. These might change content, and our test would break.
- The target webpage may temporarily be down. This would break our test.
- Making HTTP requests are generally slow.
- We could start up our own webserver, and make the HTTP request to this server. Starting a server is also generally slow.

Instead we could _mock_ the dependant units (`fetcher`), so that we can ensure predictable behaviour. 

```js
// WebScaper.test.js

// Create our mock
function createMockFetch(text) {
    return () => text
}

const testInstance = new WebScraper(createMockFetch('Hello World')) // provide our mock, instead of the real fetch function
const result = testInstance.scrape()
expect(result).to.be.eql('Hello')
```

When mocking, it is important that the mock object or function, behaves just like the target object or function. In the above example i have only mocked the needed functionality.

The same concept applies to the mocking a database connection. An example of this can be found [here](rest-api-test-example/test/MemoryBook.js), where `MemoryBook` is a mock of [`JsonBook`](rest-api-test-example/src/JsonBook.js). The `JsonBook` class uses a file instead of a normal, database connection, but we still achieve some of the same advantages. 

### Explain, preferably using an example, how you have deployed your node/Express applications, and which of the Express Production best practices you have followed.

- https://expressjs.com/en/advanced/best-practice-performance.html
- https://expressjs.com/en/advanced/best-practice-security.html
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
- https://medium.freecodecamp.org/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c
- https://www.codementor.io/mattgoldspink/nodejs-best-practices-du1086jja

#### Performance

Performance might not matter that much during development of the server, since only the deveopers are using the product. When the product is deployed the number of users will increase.

- Use compression to send content to clients.
- Don’t use synchronous functions
- Run the application on multiple cores.
- Cache database callback, and condigure HTTP caching.
- Use a load balancer to balance out traffic to many instances of the application.
- Set the `NODE_ENV` environment variable to `production`. This may [improve performance significantly](https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/).

#### Security

>The term “production” refers to the stage in the software lifecycle when an application or API is generally available to its end-users or consumers. In contrast, in the “development” stage, you’re still actively writing and testing code, and the application is not open to external access. The corresponding system environments are known as production and development environments, respectively.
>
>Development and production environments are usually set up differently and have vastly different requirements. What’s fine in development may not be acceptable in production. For example, in a development environment you may want verbose logging of errors for debugging, while the same behavior can become a security concern in a production environment. And in development, you don’t need to worry about scalability, reliability, and performance, while those concerns become critical in production.

- Use up-to-date packages.
- Configure the server to accept SSL connections.
- Use [`helmet`](https://helmetjs.github.io/) to guard against various HTTP attacks.
- Use best practices when handling user data and account security.

#### Deployment and Maintenance

Many actions can be taken during development, to ease the deployment of the application and ease into the maintenance phase.

- Use environment variables and configuration files for connections to databases and other services.
- Log important information about the usage of the application. This could be stuff like the frequency of the endpoints of the application.
- Use a process manager to automatically restart the application in the event of a crash.

#### Example

I have deployed a simple application to my Digital Ocean droplet.

https://tvestergaard.com/express-deployment-example/

* I installed `npm`, `node` and `pm2` on my droplet.
* I `get clone`d the project.
* I started the application using `pm2 start server.js`.
* I forwarded the url `/express-deployment-example/` to the express application running on port `3009`.


```nginx
server {
        server_name tvestergaard.com www.tvestergaard.com;

        location /express-deployment-example/ {
                proxy_pass http://127.0.0.1:3009/;
        }

        location / {
                include proxy_params;
                proxy_pass http://tomcat/;
        }
}
```

## NoSQL, MongoDB and Mongoose

### Explain, generally, what is meant by a NoSQL database.

- https://en.wikipedia.org/wiki/NoSQL
- https://www.mongodb.com/nosql-inline

> A NoSQL (originally referring to "non SQL" or "non relational")database provides a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases.

The term NoSQL encompasses a large number of different database approaches. The one common component, is that they all differ from [relational databases](https://en.wikipedia.org/wiki/Relational_database).

> [Relational databases] organizes data into one or more tables (or "relations") of columns and rows, with a unique key identifying each row. Rows are also called records or tuples. Columns are also called attributes. Generally, each table/relation represents one "entity type" (such as customer or product). The rows represent instances of that type of entity (such as "Lee" or "chair") and the columns representing values attributed to that instance (such as address or price).

### Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.

- https://medium.com/@jon.perera/sql-vs-nosql-a-beginners-guide-f80991f76a4b
- https://www.mongodb.com/scale/nosql-databases-pros-and-cons
- https://www.quora.com/What-are-the-pros-and-cons-of-NoSQL-databases

#### Pros

- **Flexible Data Model.** Unlike relational databases, NoSQL databases easily store and combine any type of data, both structured and unstructured. You can also dynamically update the schema to evolve with changing requirements and without any interruption or downtime to your application.
- **Elastic Scalability.** NoSQL databases scale out on low cost, commodity hardware, allowing for almost unlimited growth.
- **Simplicity.** NoSQL databases may be more simple to get up and running.

#### Cons

- With a NoSQL datastore, you have to code the integrity mechanisms into your application. As a rule, they’re simple `key=value` stores; nothing in the way the data is structured or stored imposes any logical consistency (across tables).

### Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB

Even though a schema-less database could have some advantages, most projects benifit from the data validation and integrity that comes with having a schema. As a developer, you still retain the benifits of a schema-less database, since mongoose schema valition can be applied to a subset of all your Models.

Mongoose provides all the simple datatypes defined in ECMAScript, along with validation of sub-documents. Mongoose also provides static methods for querying the models.

```js
Model.deleteMany()
Model.deleteOne()
Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndRemove()
Model.findOneAndUpdate()
Model.replaceOne()
Model.updateMany()
Model.updateOne()
// https://mongoosejs.com/docs/queries.html
```

Additionally Mongoose provides custom validation of documents. This works by defining `middleware` that can be applied when an action if perform on the specified type of document.

### Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.

- https://docs.mongodb.com/manual/indexes/
- https://www.tutorialspoint.com/mongodb/mongodb_indexing.htm

Indexes can improve the efficiency of read operations.

> Indexes support the efficient execution of queries in MongoDB. Without indexes, MongoDB must perform a collection scan, i.e. scan every document in a collection, to select those documents that match the query statement. If an appropriate index exists for a query, MongoDB can use the index to limit the number of documents it must inspect.

> Fundamentally, indexes in MongoDB are similar to indexes in other database systems. MongoDB defines indexes at the collection level and supports indexes on any field or sub-field of the documents in a MongoDB collection.

The first index that most developers use, is the default indexes placed on the implicit `_id` property on documents.

> MongoDB creates a unique index on the _id field during the creation of a collection. The _id index prevents clients from inserting two documents with the same value for the _id field. You cannot drop this index on the _id field.

There are various types of indexes that can be applied:
- **Single Field** indexes are applied to a single field on some document.
- **Compound** indexes are applied to multiple fields at the same time. An example of usage could be uniqueness accross multiple fields.
- **Multikey** indexes are applies to array values in documents. Applying an index to `Person.address` of type `[String]` would mean that an index is created for all the addresses.

### Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere

#### [TTL](https://docs.mongodb.com/manual/core/index-ttl/)

> TTL indexes are special single-field indexes that MongoDB can use to automatically remove documents from a collection after a certain amount of time or at a specific clock time. Data expiration is useful for certain types of information like machine generated event data, logs, and session information that only need to persist in a database for a finite amount of time.
>
>* TTL indexes expire documents after the specified number of seconds has passed since the indexed field value; i.e. the expiration threshold is the indexed field value plus the specified number of seconds.
>
>* If the field is an array, and there are multiple date values in the index, MongoDB uses lowest (i.e. earliest) date value in the array to calculate the expiration threshold.
>
>* If the indexed field in a document is not a date or an array that holds a date value(s), the document will not expire.
>
>* If a document does not contain the indexed field, the document will not expire.

I have used the TTL index to ensure that user-positions are up to date. By deleting user-positions older than one minute.

https://github.com/Thomas-Rosenkrans-Vestergaard/js-mini/blob/master/src/data/UserPosition.ts#L10

```js

const SECONDS = 1;
const EXPIRES = 60 * SECONDS;

export const UserPositionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    created: {type: Date, expires: EXPIRES, default: Date.now},
    position: ...
});
```

Using mongoose, i defined a Schema to represent the position of a user. I added the `expires` property to the `created` field of the Schema. The value of the `expires` property is the number of seconds the document lives for (60).

The equivalent index could be added using plain Mongo like so:

```js
db.userPositions.createIndex( 
    { "created": 1 }, 
    { expireAfterSeconds: EXPIRES })
```

#### [2dshere](https://docs.mongodb.com/manual/core/2dsphere/)

> A 2dsphere index supports queries that calculate geometries on an earth-like sphere. 2dsphere index supports all MongoDB geospatial queries: queries for inclusion, intersection and proximity. For more information on geospatial queries, see Geospatial Queries.

The data stored within the index is a GeoJson Point object. The index also supports other GeoJson types:

> Version 2 and later 2dsphere indexes includes support for additional GeoJSON object: MultiPoint, MultiLineString, MultiPolygon, and GeometryCollection. For details on all supported GeoJSON objects, see GeoJSON Objects.

```js
export const UserPositionSchema = new Schema({
    ...
    position: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Schema.Types.Number]
        }
    }
});


UserPositionSchema.index({ position: "2dsphere" });
```

Above i used the mongoose schema definition strategy to add the `2dshere` to the `position` field. The type of the `position` field matches syntax of the GeoJson Point data type.

### Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB.

[mongo-rest-example](./mongo-rest-example)

### Explain the “6 Rules of Thumb: Your Guide Through the Rainbow” as to how and when you would use normalization vs. denormalization.

- https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1
- https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-2
- https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-3
- https://en.wikipedia.org/wiki/Database_normalization
- https://keon.io/mongodb-schema-design/

> * Favor embedding unless there is a compelling reason not to
> * Needing to access an object on its own is a compelling reason not to embed it
> * Arrays should not grow without bound. If there are more than a couple of hundred documents on the “many” side, don’t embed them; if there are more than a few thousand documents on the “many” side, don’t use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed.
> * Don’t be afraid of application-level joins: if you index correctly and use the projection specifier then application-level joins are barely more expensive than server-side joins in a relational database.
> * Consider the write/read ratio when denormalizing. A field that will mostly be read and only seldom updated is a good candidate for denormalization: if you denormalize a field that is updated frequently then the extra work of finding and updating all the instances is likely to overwhelm the savings that you get from denormalizing.
> * As always with MongoDB, how you model your data depends – entirely – on your particular application’s data access patterns. You want to structure your data to match the ways that your application queries and updates it.
```

> Database normalization is the process of structuring a relational database in accordance with a series of so-called normal forms in order to reduce data redundancy and improve data integrity.

> Normalization entails organizing the columns (attributes) and tables (relations) of a database to ensure that their dependencies are properly enforced by database integrity constraints. It is accomplished by applying some formal rules either by a process of synthesis (creating a new database design) or decomposition (improving an existing database design).

> Normalization is a database design technique, which is used to design a relational database table up to higher normal form. The process is progressive, and a higher level of database normalization cannot be achieved unless the previous levels have been satisfied.
>
> That means that, having data in unnormalized form (the least normalized) and aiming to achieve the highest level of normalization, the first step would be to ensure compliance to first normal form, the second step would be to ensure second normal form is satisfied, and so forth in order mentioned above, until the data conform to sixth normal form.

- https://dzone.com/articles/pros-and-cons-of-database-normalization

The reasons for using normalization when using relational databases, are:
- Removes data repetition.
- Ensures data consistency and integrity.
- Updates run quickly due to no data being duplicated in multiple locations.
- Inserts run quickly since there is only a single insertion point for a piece of data and no duplication is required.
- Tables are typically smaller than the tables found in non-normalized databases. This usually allows the tables to fit into the buffer, thus offering faster performance.
- Use can always select enties from any single table.

There are also some drawbacks to normalization.
- Since data is not duplicated, table joins are required when retrieving data. This makes queries more complicated, and thus read times are slower.
- Since joins are required, indexing does not work as efficiently. Again, this makes read times slower because the joins don't typically work well with indexing.

Generally, you want to use normalization and a relational database when you require data integrity, or when creating a write-intensive application. When creating a read-intensive application, a NoSQL solution weithout normalization may be better, since many `JOIN`s can be eliminated. Alternatively you can use both a relational and non-relational database, to implement specific features within your application. 

The rules of thumb described in the articles are about when to embed entity relationships into subdocuments, versus seperating the entities into seperate collections. When applying normalization, the latter option is used.

### Demonstrate, using your own code-samples, decisions you have made regarding → normalization vs denormalization 

Consider the following model:

```
Book
    title
    released

Author
    name
    aliases

where there is a many to many relationship between Book and Author.

When using normalization, we have to perform a `JOIN` to retrieve the relationship between `Book` and `Author`. This incurs a performance penalty. We could of course embed one entity into the other, but this would also come with some serious drawbacks. We can no longer effeciently perform search on the embedded document `Author`, since we would first need to iterate through all the parent documents (`Book`).

We would also have lots of duplicate data. If we embedded the `Author` entity inside the `Book` entity, we many have multiple `Author` records representing the same author. If we wanted to update that author, we would need to update the information in multiple `Book` documents.

A real example can be found [here](https://github.com/Thomas-Rosenkrans-Vestergaard/js-mini/tree/master/src/data), where the position of a `Post` is denormalized and the position of a `User` is normalized, and the positional data has been extracted out into the `UserPosition` collection.

### Explain, using a relevant example, a full JavaScript backend including relevant test cases to test the REST-API.

[rest-api-test-example](./rest-api-test-example)