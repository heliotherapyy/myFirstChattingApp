# chatterbox

This assignment constitutes the beginning of a multi-sprint journey exploring client-server architecture. Today, you'll build a chat client that allows you to communicate with your fellow students.

## High Level Goals of this Sprint

* Increase your vocabulary and understanding around Hypertext Transfer Protocol
* Successfully implement a chat application using JavaScript
* Gain experience interacting with an API (in this case the Firebase Web API)
* Gain exposure to common Browser Security themes

## Key HTTP Vocabulary

The following reading will expose you to a lot of vocabulary having to do with HTTP. You don't need to memorize these terms yet, but be prepared to revisit them and commit them to memory when you begin your job hunt as you can expect to be asked about them during phone screens.
* [Request-Response Communication](https://en.wikipedia.org/wiki/Request%E2%80%93response)
* The [HTP Session](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#HTTP_session) section of Wikipedia's [Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) page
* The [Request Methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) section of Wikipedia's [Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) page
* [List of HTTP Status Codes.](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) Don't read this entirely, but at least look into what each of the NXX (e.g. 1XX, 2XX) sections mean.

### Browser Security

* Read all about [Cross-site scripting (XSS)](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)) You may find this  [interactive Tutorial on Cross-site scripting (XSS)](https://xss-game.appspot.com/) or this one on  [Escaping html](http://escape.alf.nu/) helpful. Note that these tutorials are pretty hard, you don't have to complete them if you don't find them useful.

## Tools You'll Use

### ES6

The *ECMA* Script specification is a scripting language specification upon which JavaScript implementations (such as those found in web browsers like Chrome) are based. In June 2015, the 6th edition of the ECMAScript standard was finalized, and is commonly referred to as ES6.

ES6 introduces a wealth of new features to JavaScript while being entirely reverse-compatible with older JavaScript. Even the most popular of web browsers like Chrome have a ton of work to do before all ES6 features are available, however, a lot of developers are using ES6 features and you should look forward to seeing more and more of ES6 in the next several years.

We encourage you to try experimenting with some new features. In this sprint, you can play around with ES6 in Chrome by enabling "experimental JavaScript Features". To do this:

* Visit `chrome://flags/#enable-javascript-harmony` in Chrome and 'Enable Experimental JavaScript'. After restarting the browser, Chrome will now accept and run many new ES6 features.

The [ES6 compatability table](http://kangax.github.io/compat-table/es6/) will show you what features you've unlocked. Here are some suggested ones for this sprint:

* arrow functions
* spread (...) operator
* rest parameters
* object literal extensions
* for...of loops (a new for loop, what!!)
* template strings

[This article](https://ponyfoo.com/articles/es6) is a great entry point to learning ES6. It provides a high level overview of all the new features and links to more in-depth articles.

### Package Management

A [Package manager](https://en.wikipedia.org/wiki/Package_manager) is a tool for automating the process of installing, upgrading, configuring and managing dependencies ([underscore](http://underscorejs.org/), [jquery](http://jquery.com/), etc) for projects. Most package managers run through a command-line interface.

You've used at least one package manager already ([homebrew](http://brew.sh/)). Today, you'll use a popular package manager called **bower** to install and keep track of the tools your client-side code requires.

### Bower

Instead of manually downloading all your dependencies to a 'lib' folder that you track with git, You'll use bower to install and manage everything.

[Bower](http://bower.io/) is a generic, unopinionated solution to the problem of front-end (client-side) package management.

* There are no system wide dependencies (everything is installed locally within your projects' `bower_components` directory)
* Dependencies aren't shared between different apps (if two separate projects require underscore.js, both get their own copy of underscore.js)
* The dependency tree is flat (no packages depend on other packages).

There are two files in this repo that control/affect the behavior of bower:

* `/bower.json` - Project manifest where we define our project dependencies
* `/.bowerrc` - Bower configuration file where we define where the dependencies need to be installed

### Firebase API

We've set up a remote server using the [Firebase](https://firebase.com/) platform. Later (as part of a different sprint) you'll build your own (local) server and replace the (remote) one you're using today.

Since you'll eventually reuse parts of your solution to this sprint, try to make your code readable/maintainable so that future-you doesn't get angry at present-you for making things messy.

Firebase has documented their API [here](https://www.firebase.com/docs/). Please note that you will only need to use a small part of it. In the  [Web Platform](https://www.firebase.com/docs/web/) section, there's a heading named "Guide" that you'll need to refer to.(Saving Data, Retrieving Data)

During this sprint, we'll be using it as a shared message storage server that everyone in the class can read and write from (via Firebase Web API).

The message objects you send to the Firebase server should be in the following format:

```javascript 
var message = {
  username: 'ingikim',
  text: 'hello',
};
```

To get you started, https://chat-codestates.firebaseio.com/ is an url you should use to communicate with Firebase API server. Note that any messages you send to the server are viewable by everyone, so be nice.

  
## Bare minimum requirements

### Bower

* Take a look at `bower.json` and note the library listed under 'dependencies'. When `bower install` is run from the command line, the packages listed here will be automatically installed to `client/bower_components`.
* Bower depends on Node and npm (we'll cover those in an upcoming sprint).
  * Assuming you have those installed already, install Bower globally using npm, `npm install -g bower`
* Use bower to install the client-side dependencies listed in `bower.json` for this repo:
  * Run the following command from the root directory of the repo `bower install`.
* Continue to use bower to install (and keep track of) any additional libraries you add as you work through this sprint.

### Messages

Open up client/scripts/app.js and start coding.

**Note:** The url you should be using is `https://chat-codestates.firebaseio.com/`

* Display messages retrieved from the Firebase server.

  * Use proper escaping on any user input. Since you're displaying input that other users have typed, your app is vulnerable XSS attacks. See the section about escaping below.

    **Note:** If you issue an XSS attack, you must make it innocuous enough to be educational, rather than disruptive. 

* Allow users to send messages with username and text input. {username: 'ingikim', text: 'hello'}

#### A Note About Escaping

Escaping is the way we ensure that when users input things to our sites, we don't allow them to write our site's code for us. For example, what if someone's user name was `;document.createElement('div').text('you got pwned');` ? If we didn't escape, that 'user name' would get executed just like any other code, and all the sudden you'll have a new div on your site that says 'you got pwned', anytime that person's user name is displayed.

Now that might seem trivial, but understand that attacks like this can affect (or transmit) your users data too. That's not cool.

You'll need to figure out a way to effectively protect your app against cross-site scripting (XSS) attacks issued by your class-mates during this sprint. Part of the fun of this sprint is figuring out how to do so.

As always, google is your friend :). If you're curious, you can read about some of the nuances associated with escaping html [here](http://wonko.com/post/html-escaping).

## Advanced Content

Our advanced content is intended to throw you in over your head, requiring you to solve problems with very little support or oversight, much like you would as a mid or senior level engineer. The following problem is no exception, and you may have to do a fair amount of work to get enough context to get started on the problem itself.

### Rooms

* Allow users to create rooms and enter existing rooms - Rooms are defined by the `.roomname` property of messages, so you'll need to filter them somehow.

### Socializing

* Allow users to 'befriend' other users by clicking on their user name
* Display all messages sent by friends in bold

## Nightmare Mode

If you've made it this far you're in for some real fun, it's time to convert your Chatterbox application into a Twitter clone. If you don't have a Twitter account we recommend you create one so that you can direct your remaining efforts towards mimicking the functionality and styling of a real Twitter feed.

Recognizing that there are constraints in place given that your classmates are not using the same code base as you (of course you could organize!), feel free to conduct this refactor as you see fit. If you wish you may use the following as recommendations for the features you should implement to complete the refactor successfully:

* A settings pane where a user can change their personal info and upload a photo
* The ability to follow other users, only displaying the messages of those you are following
* The ability to 'heart' other users' messages
* The ability to generate and display summary metrics on the activity of yourself and other users
* Styling that looks as close as possible to an actual Twitter feed. You might consider the wildly popular CSS framework Bootstrap to help you out, especially since it was built at Twitter