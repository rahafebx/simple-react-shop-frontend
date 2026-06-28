# Libraries


## React Hook Form Library
A library for managing forms in React. It provides a simple and efficient way to handle form state, validation, and submission. It is designed to work seamlessly with React's functional components and hooks.

To install React Hook Form, run the following command in your project directory:

```bash
npm install react-hook-form
```
### Usage
To use React Hook Form in your React component, you can import the `useForm` hook from the library and use it to manage your form state. Here's an example of how to use React Hook Form in a simple form component:

```jsx
import React from 'react';
import { useForm } from 'react-hook-form';
```

Example of a simple form component using React Hook Form:

```jsx
function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName', { required: "First name is required", minLength: { value: 2, message: "First name must be at least 2 characters" }, regex: /^[a-zA-Z]+$/ })} placeholder="First Name" />
        {errors.firstName && <span>{errors.firstName.message}</span>}
    
        <input {...register('lastName', { required: "Last name is required" })} placeholder="Last Name" />
        {errors.lastName && <span>{errors.lastName.message}</span>}

        <input {...register('email', { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Email is not valid" } })} placeholder="Email" />
        {errors.email && <span>{errors.email.message}</span>}

        <input {...register('password', { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} placeholder="Password" />
        {errors.password && <span>{errors.password.message}</span>}

        <input {...register('passwordConfirm', { required: "Password confirmation is required", minLength: { value: 6, message: "Password confirmation must be at least 6 characters" }, match: { value: 'password', message: 'Passwords do not match' } })} placeholder="Confirm Password" />
        {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}

        <button type="submit">Submit</button>
        </form>
    );

}
```

## React Router Library
A library for handling routing in React applications. It provides a simple and declarative way to define routes and navigate between different pages in your application. It is designed to work seamlessly with React's functional components and hooks.

To install React Router, run the following command in your project directory:

```bash
npm install react-router-dom
```

### Usage
To use React Router in your React application, you can import the `BrowserRouter`, `Routes`, and `Route` components from the library and use them to define your routes. Here's an example of how to use React Router in a simple application:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
```

**Example of a simple application using React Router:**

1. main.jsx file:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

2. App.jsx file:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  return (
    <>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
    </>
  );
}
```

3. A simple Home component:

```jsx
function Home() {
  return (
    <div>
        <h1>Home Page</h1>
        <p>Welcome to the home page!</p>
    </div>
    );
}
```

4. A simple About component:

```jsx
function About() {
  return (
    <div>
        <h1>About Page</h1>
        <p>This is the about page.</p>
    </div>
    );
}
```

## Data Fetching Libraries

When it comes to fetching data in React applications, there are several libraries available that can help simplify the process. Two popular options are TanStack Query and SWR. Both libraries provide a set of hooks that allow you to easily manage server state, handle loading and error states, and perform background updates.

### TanStack Query Library
TanStack Query is a powerful data-fetching library for React that simplifies the process of fetching, caching, and synchronizing server state in your application. It provides a set of hooks that allow you to easily manage server state, handle loading and error states, and perform background updates. TanStack Query is designed to work seamlessly with React's functional components and hooks, making it a great choice for building modern React applications.

#### Installation
To install TanStack Query, run the following command in your project directory:
```bash
npm install @tanstack/react-query
```

#### Usage
To use TanStack Query in your React application, you can import the `useQuery` hook from the library and use it to fetch data from an API. Here's an example of how to use TanStack Query in a simple application:

1. Wrap your application with the `QueryClientProvider` in `main.jsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

2. Use the `useQuery` hook in a component (e.g., `App.jsx`):

```jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';

function App() {
  const { data, error, isLoading } = useQuery(['post', 1], async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

Example of a functional component using TanStack Query for fetching data from the [jsonplaceholder API](https://jsonplaceholder.typicode.com/) with caching and background updates:

```jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';

function DataFetcher() {
  const { data, error, isLoading } = useQuery(['post', 1], async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }, {
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Data is cached for 10 minutes
    refetchOnWindowFocus: true, // Refetch data when the window is focused
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

### SWR library
SWR (stale-while-revalidate) is a React Hooks library for data fetching that provides a simple and efficient way to fetch, cache, and revalidate data in your React applications.

#### Installation
To install SWR, run the following command in your project directory:
```bash
npm install swr
```

#### Usage
To use SWR in your React application, you can import the `useSWR` hook from the library and use it to fetch data from an API. Here's an example of how to use SWR in a simple application:

1. Use the `useSWR` hook in a component (e.g., `App.jsx`):

```jsx
import React from 'react';
import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function App() {
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/posts/1', fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

2. Example of a functional component using SWR for fetching data from the [jsonplaceholder API](https://jsonplaceholder.typicode.com/) with caching and revalidation:

```jsx
import React from 'react';
import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function DataFetcher() {
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/posts/1', fetcher, {
    revalidateOnFocus: true, // Revalidate data when the window is focused
    dedupingInterval: 1000 * 60 * 5, // Deduplicate requests for 5 minutes
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

### Fetching data libraries usage recommendation
When it comes to fetching data in React applications, both TanStack Query and SWR are excellent choices. However, the choice between the two depends on your specific use case and requirements.

- **TanStack Query** is a more feature-rich library that provides advanced features such as caching, background updates, and query invalidation. It is a great choice for applications that require complex data fetching and state management.
- **SWR** is a lightweight library that focuses on simplicity and ease of use. It is a good choice for applications that need basic data fetching and caching functionality.

