# Memories - Client

The frontend client for the Memories application, built with React and Redux. This application provides an intuitive interface for users to create, share, and manage their memories with features like authentication, search, pagination, and real-time comments.

## Tech Stack

- **React** 18.3.1 - UI library
- **Redux** with Redux Thunk - State management
- **Material-UI (MUI)** 5.16.1 - Component library
- **React Router** 6.24.1 - Client-side routing
- **Axios** - HTTP client for API requests
- **Google OAuth** - Authentication via `@react-oauth/google`
- **Moment.js** - Date formatting
- **JWT Decode** - Token decoding

## Features

- 🔐 **User Authentication** - Sign in/sign up with Google OAuth or email/password
- 📝 **Create & Edit Posts** - Share memories with title, message, tags, and images
- 🔍 **Search & Filter** - Search by title or filter by tags
- 📄 **Pagination** - Browse through memories efficiently
- ❤️ **Like Posts** - Express appreciation for memories
- 💬 **Comments** - Engage with posts through comments
- 🎨 **Responsive Design** - Works seamlessly across devices
- 🖼️ **Image Upload** - Add images to your memories (base64 encoding)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or bun package manager
- Backend server running (see [server README](../server/README.md))

### Installation

1. **Navigate to the client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   REACT_APP_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   REACT_APP_API_URL=http://localhost:5000
   ```
   
   > **Note**: Get your Google Client ID from [Google Cloud Console](https://console.cloud.google.com/apis/credentials/)

4. **Start the development server**
   ```bash
   npm start
   # or
   bun run start
   ```

The application will open at [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_CLIENT_ID` | Google OAuth Client ID for authentication | `520746839658-xxx.apps.googleusercontent.com` |
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:5000` |

## Project Structure

```
src/
├── actions/          # Redux action creators
│   ├── auth.jsx      # Authentication actions
│   └── posts.jsx     # Post-related actions
├── api/              # API integration
│   └── index.jsx     # Axios instance and API endpoints
├── components/       # React components
│   ├── Auth/         # Authentication forms
│   ├── Form/         # Post creation/edit form
│   ├── Home/         # Home page container
│   ├── Navbar/       # Navigation bar
│   ├── Pagination/   # Pagination component
│   ├── PostDetails/  # Single post view with comments
│   └── Posts/        # Posts list and individual post cards
├── constants/        # Action type constants
├── reducers/         # Redux reducers
│   ├── auth.jsx      # Authentication state
│   ├── posts.jsx     # Posts state
│   └── index.jsx     # Root reducer
├── App.jsx           # Main app component with routing
└── index.js          # App entry point with Redux store
```

## Architecture

### Redux State Management

The application uses Redux for centralized state management with the following flow:

```
┌─────────────────┐
│  React          │
│  Components     │──── Dispatch Actions ────▶
└─────────────────┘
                                              ┌─────────────────┐
                                              │  Action         │
                                              │  Creators       │
                                              └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │  Redux Thunk    │
                                              │  (Async Logic)  │
                                              └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │  API Calls      │
                                              │  (Axios)        │
                                              └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │  Reducers       │
                                              │  (Update State) │
                                              └────────┬────────┘
                                                       │
                                                       ▼
┌─────────────────┐                          ┌─────────────────┐
│  React          │◀──── Subscribe ──────────│  Redux Store    │
│  Components     │                          └─────────────────┘
└─────────────────┘
```

**Key Concepts:**
- **Actions**: Plain objects describing what happened (e.g., `FETCH_POSTS`, `CREATE_POST`)
- **Action Creators**: Functions that create and return action objects
- **Redux Thunk**: Middleware for handling async operations (API calls)
- **Reducers**: Pure functions that update state based on actions
- **Store**: Central state container that holds the application state

## API Integration

The client communicates with the Flask backend through Axios. All API calls are centralized in `src/api/index.jsx`:

### Authentication
- `POST /user/signin` - User sign in
- `POST /user/signup` - User registration

### Posts
- `GET /posts?page={page}` - Fetch paginated posts
- `GET /posts/{id}` - Fetch single post
- `GET /posts/search?searchQuery={query}&tags={tags}` - Search posts
- `POST /posts` - Create new post
- `PATCH /posts/{id}` - Update post
- `DELETE /posts/{id}` - Delete post
- `PATCH /posts/{id}/likePost` - Like/unlike post
- `POST /posts/{id}/commentPost` - Add comment to post

### Request Interceptor

All authenticated requests automatically include the JWT token:

```javascript
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    const { token } = JSON.parse(localStorage.getItem('profile'));
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode at [http://localhost:3000](http://localhost:3000) |
| `npm test` | Launches the test runner in interactive watch mode |
| `npm run build` | Builds the app for production to the `build` folder |
| `npm run eject` | **One-way operation** - Ejects from Create React App |

## Troubleshooting

### Babel Dependency Warning

If you see a warning about `@babel/plugin-proposal-private-property-in-object`:

```bash
npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

This is a known issue with `create-react-app` which is no longer maintained.

### CORS Errors

Ensure the backend server is running and configured to allow requests from `http://localhost:3000`. The `proxy` field in `package.json` is set to `http://localhost:5000`.

### API Connection Failed

1. Verify the backend server is running on port 5000
2. Check `REACT_APP_API_URL` in your `.env` file
3. Ensure MongoDB is connected (check server logs)

### Google OAuth Not Working

1. Verify `REACT_APP_CLIENT_ID` is correctly set in `.env`
2. Ensure the Google Client ID is configured for `http://localhost:3000` in Google Cloud Console
3. Check that the OAuth consent screen is properly configured

## Learn More

- [React Documentation](https://react.dev/)
- [Redux Documentation](https://redux.js.org/)
- [Material-UI Documentation](https://mui.com/)
- [React Router Documentation](https://reactrouter.com/)
