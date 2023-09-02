## Create React App
```
npx create-rect-app <project_name>
cd <project_name>
npm start
```

## Solving problem of redux-thunk 
npm install --save redux-thunk

## React Redux
![Redux-Architecture](https://static.javatpoint.com/tutorial/reactjs/images/react-redux-architecture.png)

Redux is a predictable state container for JavaScript applications, commonly used with React. It follows a unidirectional data flow pattern and helps manage the application state in a centralized manner. The architecture diagram demonstrates the flow of data and actions within a Redux-powered React application.

Here are the key components and their interactions shown in the diagram:

React Components: These are the UI components of your application, responsible for rendering the views and handling user interactions.

Actions: Actions represent events or user interactions that trigger a change in the application state. They are plain JavaScript objects with a type property indicating the type of action and additional data as needed.

Action Creators: Action creators are functions that create and return action objects. They encapsulate the logic of creating actions with the required data.

Reducers: Reducers are pure functions responsible for handling the state changes based on the dispatched actions. They take the current state and an action as input and return a new state object. Reducers should not modify the existing state; instead, they create a new state object.

Store: The store is the central place that holds the application state. It is created using the createStore function provided by Redux. The store provides methods to dispatch actions, access the current state, and subscribe to state changes.

Middleware: Middleware sits between the dispatching of an action and the moment it reaches the reducer. It can intercept actions, modify them, or execute additional logic. Popular middleware examples include redux-thunk for handling asynchronous actions and redux-logger for logging actions and state changes.

Store Subscription: Components can subscribe to the store to receive updates whenever the state changes. This enables components to react to state changes and update their UI accordingly.

## Axios
Breakdown of code in api/index.jsx

1. `fetchPosts`: Sends a GET request to the specified `url` to fetch all posts.

```javascript
export const fetchPosts = () => axios.get(url);
```

2. `createPost`: Sends a POST request to the `url` with the `newPost` object as the request payload to create a new post.

```javascript
export const createPost = (newPost) => axios.post(url, newPost);
```

3. `likePost`: Sends a PATCH request to the `url` with the post `id` appended to `/likePost` to like a specific post.

```javascript
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
```

4. `updatePost`: Sends a PATCH request to the `url` with the post `id` appended to update a specific post with the `updatedPost` object as the request payload.

```javascript
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
```

5. `deletePost`: Sends a DELETE request to the `url` with the post `id` appended to delete a specific post.

```javascript
export const deletePost = (id) => axios.delete(`${url}/${id}`);
```

These functions make use of the Axios library to handle HTTP requests and interact with the server endpoints for fetching, creating, updating, and deleting posts.