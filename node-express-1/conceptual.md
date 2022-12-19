### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
-- There are three ways to manage asynchronous javascript, callback functions, promises and using the async and await keywords. 

- What is a Promise?
-- A promise is an object that represents an action yet to be completed. Javascript will return this object once said action has been executed/completed/rejected/etc.

- What are the differences between an async function and a regular function?
-- An async function is a function that will not continue to be executexd until a request is finished. For example, a function requesting data from an api to do something with said data will not proceed to make such changes until the data has fetched from the api first. This can be done using the await keyword.

- What is the difference between Node.js and Express.js?
--Node.js is a server runtime for executing javascript  outside of a browser while Express.js is a framework built based on node.js. These two technologies compliment eachother because although node.js is a very fast runtime it doesn't quite know how to handle https requests. Express.js was basically built on top of node.js web server fnuctionality in order to make it's API's simpler and organized via middle ware and routing.

- What is the error-first callback pattern?
--Node.js has this as a default and how it works is that node will first check for/return an error if a given callback function encounters one, otherwise, it will return any successful operation the function establishes. Error is the first argument passed into an error first callback function in this scenario and other functionality follows.

- What is middleware?
-- Middleware is code that is meant to run between requests and responses. These middle ware functions have access to both the request body,  response data, and the next operation/function. Middleware functions are used to do things such as logging information, executing code, make changes to request or response in question, facilitaing communications with other involved technologies. It also can also indicate whether the next middleware function should be executed.

- What does the `next` function do?
--the next function "green lights"the application to proceed or grant control to the next middleware function in succession if the current middleware doesn't stop the  request-response cycle.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
  - The function should make just one call to the api for all users instead of fetching them all one by one. The current method will slow down the runtime for this function due to the redundancy at hand.
  - If the above mentioned is the intention the function should be call getAllUsers() for better clarity on what the intention of the function truly is.
  - If the desired result is to be able to simply list the name of the users the function should be retrieving that from the json response data returned to the await variable (response.data[name]). Otherwise this function will return the full list of all users objects which most likely are made up of further nested objects and arrays. For ease of use it's best clean up the extracted data and store in an array if desired.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
