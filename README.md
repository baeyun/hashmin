<p align="center">
<img height="300px" src="https://github.com/bukharim96/hashmin/blob/master/assets/hashmin-logo.svg" />
</p>

<h1 align="center">Hashmin</h1>

<p align="center">
A tiny library for client-side routing with URL hashes
</p>

<blockquote>
 Note: This project is still under development. Most features mentioned in this article are not yet implemented. Please send a pull request if you or your company wishes to contribute. Thank you.
</blockquote>

### Why URL hashes?

Okay, now I know what you're thinking: **"Just why hashes?"**. But before we dig into that, let's look at the objective of **Hashmin**. It's not such a great idea to implement hash routing into a web application mainly because hashes just represent the app state and not the absolute URL path, it's difficult debugging app URLs and route paramters with all the clumsy and unnecessary hash changes and also because of SEO optimization reasons, which is eventually an anti-pattern...

### Errr.. Okay...

So what if we could just use it for what it's meant for: *Single Page Routing/Redirections*

Check this out... When large Web App pages (and by large I mean look at [GMail](gmail.com) or [Twitter](twitter.com)) load and absolute URL routing is observed (that means without the hashes), changing the whole browser page state just because a user navigated to his/her `follower-count` page or revealed an empty UI modal is totally redundant and worth a whole lot of time.

### Examples

Let's take a closer look at hashmin definition in a sample document
```javascript
// Get a local instance
let appRouter = new Hashmin()

// Force set hash path
appRouter.bind(`profiles/bukharim96`)

// Alternatively, you could attach an event handler to an element
const listenRouteEvent = (routeValue) => appRouter.bind(`profiles/${routeValue}`)

document.querySelectorAll('#myElementOrLink')
  .forEach((route) => route.onclick = (e) => listenRouteEvent(this.attributes['route-value'].value))

// Query decisions with precise route parameter configurations
appRouter.when('devs/profiles/:user', function(params) {
  templateEngine.render(`<h1>Hello, ${params.user}</h1>`)
})
```

### Under the Hood

**Hashmin** stores app states from the URL hash in the memory and is not reliant on any persistance databases or storage interfaces like `IndexedDB` or `localStorage` respectively. Hash URLs could tend to get messy and/or obtrusive sometimes because our needs exceed our expectations. For that reason, it retrieves data asynchronously using the modern Promise API. Moreover, links could load other hashes which is why the Proxy API was used to create an *observer layer* for monitoring hash changes using a bi-directional channel (the *proxyHandler* which is attached to the *onHashChange* event).

<p align="center">
<img src="https://github.com/bukharim96/hashmin/blob/master/assets/hashmin-layer-def.svg" />
</p>

### Features
1. Client-side (single page oriented) routing
2. Asynchronous callbacks with core `when(route [, observedCallback])` handler
3. Hash change observed with a proxified layer - `hashminProxyLayer`

Hashmin uses strategies and was written with the ECMAscript-2015 spec of the JavaScript language. For that reason, browser compatibility might be an issue. While our team are working on it, you could use a compiler such as Babel or Browserify

### What about Single Page Apps

Also known as SPAs, **Hashmin** works perfectly with Vue & Angular's routing mechanism. In fact, templating whole/parts of pages and monitoring data changes becomes much more easier with **Hashmin's** `when(route [, observedCallback])` method. As for React Router, we are still working towarrds a better solution.

### Enough is enough!

#### Installation

Having Node installed, simply use

    $~ npm install hashmin -g --save

### Documentation

For documentations, check the `docs` folder in the `master` branch.

### Licence

**Hashmin** is licensed under the **MIT licence**

### Contributions

Please make sure to fork the project and continue sending us some pull requests. A lot of features still need implementation so lets do this!

Enjoy ;-)
