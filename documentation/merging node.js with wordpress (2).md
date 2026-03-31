# Node.js and WordPress: Building Dynamic APIs for Custom Applications

Author[Jeremy Holcombe](https://kinsta.com/blog/author/jeremyholcombe/ "Posts by Jeremy Holcombe")

UpdatedMarch 12, 2026

![](https://kinsta.com/wp-content/uploads/2023/12/how-to-use-nodejs-with-wordpress-1024x512.jpg)

As a web developer, you’re likely familiar with Node.js and WordPress. Node.js is a powerful runtime environment that runs JavaScript outside the browser, and WordPress is the leading [content management system (CMS)](https://kinsta.com/blog/content-management-system/).

These platforms might seem worlds apart — [Node.js](https://kinsta.com/topic/node-js/), with its JavaScript backbone, and WordPress, a [PHP](https://kinsta.com/topic/php-updates/)-powered CMS. However, they can work in tandem, thanks to [WordPress REST API](https://kinsta.com/blog/wordpress-rest-api/). This API enables Node.js applications to interact with WordPress through [HTTP requests](https://kinsta.com/blog/what-is-an-http-request/). It provides access to various data, including users, comments, pages, posts, and other site elements.

But what’s the benefit of combining Node.js and WordPress?

Imagine you have a WordPress site and want to build a custom dashboard. This dashboard could display real-time data from your site, like recent posts, comment counts, and user activity.

Here’s where Node.js plays a pivotal role. This guide walks you through setting up Node.js endpoints. These endpoints leverage the WordPress REST API for various tasks: updating posts, moderating comments, site customization, and tailored WordPress site administration.

## Prerequisites

To follow along with this guide, we assume you have:

- Basic knowledge of Node.js.
- [Node.js and npm](https://kinsta.com/blog/how-to-install-node-js/) installed on your computer.
- WordPress and the [Thunder Client VS Code extension](https://www.thunderclient.com/) installed.

## Manage WordPress Posts With Node.js

In WordPress, the foundational tasks include creating, updating, and deleting posts. This section explains how to create specific endpoints for these actions, along with how to make requests to the `/posts` endpoint for each operation.

### Creating a New Post in WordPress

To create a new post in WordPress with the REST API, make a POST request to the `/posts` endpoint. In the body of the request, you need to provide the content of your WordPress post in JSON format.

First, open your [Node.js server](https://kinsta.com/blog/create-express-app/) file, usually named **App.js**. Make sure that [Express](https://kinsta.com/blog/what-is-express-js/) is correctly set up in your server file. This is typically done with the line `const app = express()`, which initializes Express.

Next, implement a route in your server file to add a new post. The code for this route looks like this:

```js
app.post("/add-post", async (req, res) => {
   try {
    const postID = req.body.id
    const resp = await axios.post(`https://yourdomain.com/wp-json/wp/v2/posts/${postID}`, req.body)

    if(resp.status !== 200) throw "Something went wrong"

  } catch (err) {
    console.log(err)
  }
})
```

This code creates an endpoint `/add-post` in your application. When a request is sent to this endpoint, it extracts the post ID from the request body and sends a POST request to your WordPress site. Remember to replace `https://yourdomain.com` with your WordPress domain.

You can test this using tools like Thunder Client in Visual Studio Code. Make sure the JSON body of your request is valid to avoid errors.

![JSON body of a POST request to /add-post endpoint](https://kinsta.com/wp-content/uploads/2023/12/add-post.png)JSON body of a POST request to /add-post endpoint.

This approach allows for efficient and automated posting to your WordPress site from your application.

### Updating an Existing Post in WordPress

To update a post with the WordPress API, make a PUT request to the `/posts` endpoint in your WordPress API. You also need to provide the updated content of your WordPress post in JSON format.

The route for updating an existing post in WordPress is as follows:

```js
app.put("/update-post", async (req, res) => {
  try {
    const postID = req.body.id

    const resp = await axios.put(`https://yourdomain.com/wp-json/wp/v2/posts/${postID}`, req.body)

    if(resp.status !== 200) throw "Something went wrong"

  } catch (err) {
    console.log(err)
  }
})
```

For example, you can update a post with an ID of `3` ;in WordPress with the following request in Thunder Client:

![JSON body of a PUT request to /update-post endpoint](https://kinsta.com/wp-content/uploads/2023/12/update-post.png)JSON body of a PUT request to /update-post endpoint.

### Deleting a Post in WordPress

To delete a post in WordPress, make a DELETE request to the `/posts` endpoint using the unique ID of the post you want to delete.

```js
app.delete("/delete-post", async (req, res) => {
  try {
    const postID = req.body.id

    const resp = await axios.delete(`https://yourdomain.com/wp-json/wp/v2/posts/${postID}`)

    if(resp.status !== 200) throw "Something went wrong"

  } catch (err) {
    console.log(err)
    }
})
```

<p>The result should look like this:

![JSON body of a DELETE request to /delete-post endpoint](https://kinsta.com/wp-content/uploads/2023/12/delete-post.png)JSON body of a DELETE request to /delete-post endpoint.

## Moderating WordPress Comments With Node.js

The [Comments API](https://developer.wordpress.org/rest-api/reference/comments/) allows you to access and manipulate comments on your WordPress site from an application. Within that API is an endpoint for creating, listing, reading, updating, and deleting comments on a WordPress site.

Let’s assume you don’t want your WordPress site to publish comments with the phrase “Follow me.” In this example, you can use a `regex` expression to check each comment for that phrase before posting it.

To do this, use the following code:

```js
app.post("/add-comment", async (req, res) => {
  try {
    let regex = /follow me/i;
    let comment = req.body.comment

    if(regex.test(comment)) throw "Oops! Contains the forbidden word"

    const resp = await axios.post(`https://yourdomain/wp-json/wp/v2/comments`, req.body)

  if(resp.status !== 200) throw "Something went wrong"

  } catch (err) {

  console.log(err)

    }
})
```

With this route, only comments that don’t include the phrase “Follow me” get published on the website, while comments like the one below do not get posted:

![JSON body of a POST request to /add-comment endpoint](https://kinsta.com/wp-content/uploads/2023/12/add-comment.png)JSON body of a POST request to /add-comment endpoint excluding comments with “Follow me”.

## Customizing Sites for Users

By storing user preferences and determining their country, you can customize your WordPress pages for each user.

In Node.js, you can store user data in cookies from the login or signup route of your backend application and place the cookie in their web browser, like so:

```js
app.post("/sign-up", async (req, res) => {
  // Sign up user
    res.cookie("cookie_id", 123456)
    res.cookie("lang", req.body.language)

    res.status(200).json("Logged in.")
})
```

Upon signing up, you get the user’s preferred language and send it to the browser as cookies along with the `cookie_id`.

Now, with the language stored in the browser, you can use it to fetch WordPress posts in the user’s language. This requires you to translate your posts in WordPress first. An easy way to do this is by [integrating WPML and Yoast SEO](https://wpml.org/documentation/related-projects/using-wordpress-seo-with-wpml/) into your WordPress site.

Once integrated, different subfolders is created for other languages:

- **mydomain.com/en/**
- **mydomain.com/es/**
- **mydomain.com/fr**/

When fetching WordPress posts, you can get the list of posts in the user’s preferred language as it is stored in the cookies.

```js
app.get("/get-posts", async (req, res) => {
  try {
    const lang = req.cookies.lang

    const resp = await axios.get(`https://mydomain.com/${lang}/wp-json/wp/v1/posts`)

  if(resp.status !== 200) throw "Something went wrong"

  } catch (err) {
    console.log(err)
    }
})
```

By doing this, you get the list of posts based on the language the user specified during sign-up.

## Using Custom Administration

By extending the user’s endpoint, you can build a custom administration panel to control WordPress users, roles, and permissions. The [Users API](https://developer.wordpress.org/rest-api/reference/users/) allows you to access and manipulate user information on your WordPress site from an application that functions like the Comment API.</p>

For example, if you want to update the role of a user to “Administrator,” here’s the route you can use:

```js
app.put("/update-user", async (req, res) => {
  try {
    const userID = req.body.id

    const resp = await axios.put(`https://yourdomain/wp-json/wp/v2/users/${userID}`, req.body)

    if(resp.status !== 200) throw "Something went wrong"

  } catch (err) {
    console.log(err)
   }
})e>
```

In the request, pass an object containing the ID of the user whose record you want to update, as well as the new details.

![JSON body of a PUT request to /update-user endpoint](https://kinsta.com/wp-content/uploads/2023/12/update-user.png)JSON body of a PUT request to /update-user endpoint.

When you are done developing your Node.js server. You can always host it with ease on [Kinsta’s Application Hosting](https://sevalla.com/application-hosting/).

## Summary

Integrating Node.js with your WordPress site opens up the potential for greater functionality. You can update posts, moderate comments, set user roles, and add customization based on your user’s country.

Apart from the features we have already covered, you can add advanced searching, theme manipulation, and post revisions. Don’t hesitate to check out the REST API [Handbook](https://developer.wordpress.org/rest-api/reference/) and start exploring.

