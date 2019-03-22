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

The `debug` package exposes a function that can be used to print debugging messages.

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

An example can be found in the [debugging-example](./debugging-example) project. Note the below `scripts` commands found in the `package.json` file. 

```json
"scripts": {
    "debug": "cross-env DEBUG=\"*\" npm run start",
    "debug-http": "cross-env DEBUG=\"http:*\" npm run start",
    "debug-calculator": "cross-env DEBUG=\"calculator\" npm run start"
}
```

Here the [cross-env](https://www.npmjs.com/package/cross-env) package is used so the environment variables can be set regardless of the operating system used.

### Explain, using relevant examples, concepts related to testing a REST-API using Node/JavaScript + relevant packages.

Testing a REST API is much easlier in JavaScript than in many other languages like Java. When using languages like Java, web services often need to be deployed to a dedicated server. Using JavaScript we can programmatically start our express server using the `listen` method. We can then use the `node-fetch` to make requests to the REST API.

### Explain, using relevant examples, the Express concept; middleware.

- https://expressjs.com/en/resources/middleware.html
- https://expressjs.com/en/guide/using-middleware.html

> Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

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

function auth(req, res, next) {
    if (!req.session.userName){ // when not logged in
        res.redirect('auth') // redirect to the login page
        return next()
    }
}

app.use('/admin', auth) // only use the authentication middleware on the administration page.
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

### Compare the express strategy toward (server side) templating with the one you used with Java during the second semester.

Templating is used to compose/render dynamic HTML pages. Templates provide a better syntax for rendering, than most programming languages have natively. Most templating languages provide support for function calls, interation and printing (output). There are templating libraries available for most, if not all, programming languages. Some templating libraries, like [mustache](https://mustache.github.io/) are available for multiple languages.

During the second semester we used JSP to render webpages. There are some differences between our usage of `JSP`, and template rendering using express.

* `JSP` is the default template renderer for Tomcat. Tomcat could automatically locate and render `JSP` files when accessed using `Tomcat`. Express has no default template engine, and the template is therefor rendered explicitly. Using middleware we could similarly automatically locate and render a template based on the url path.

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



### Explain, preferably using an example, how you have deployed your node/Express applications, and which of the Express Production best practices you have followed.

## NoSQL, MongoDB and Mongoose

### Explain, generally, what is meant by a NoSQL database.

### Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.

### Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB

### Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.

### Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere

### Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB

### Explain the “6 Rules of Thumb: Your Guide Through the Rainbow” as to how and when you would use normalization vs. denormalization.

### Demonstrate, using your own code-samples, decisions you have made regarding → normalization vs denormalization 

### Explain, using a relevant example, a full JavaScript backend including relevant test cases to test the REST-API.