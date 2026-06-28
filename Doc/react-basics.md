# React Basics


## React Contexts
React Contexts provide a way to share values between components without having to explicitly pass props through every level of the component tree. This is useful for managing global state, themes, or any data that needs to be accessible by multiple components.

### React Contexts Usage
To use React Contexts, you can create a context using `React.createContext`, provide a value using a `Provider`, and consume the context in child components using the `useContext` hook. Here's an example of how to use React Contexts in a simple application:

1. Create a context file (e.g., `ThemeContext.js`):

```jsx
import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

2. Wrap your application with the `ThemeProvider` in `main.jsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from './ThemeContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

3. Consume the context in a component (e.g., `App.jsx`):

```jsx
import React from 'react';
import { useTheme } from './ThemeContext';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme}>
      <h1>Current Theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

Simple Authentication Example using React Contexts:

1. Create an authentication context file (e.g., `AuthContext.js`):

```jsx
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

2. Wrap your application with the `AuthProvider` in `main.jsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

3. Consume the authentication context in a component (e.g., `App.jsx`):

```jsx
import React from 'react';
import { useAuth } from './AuthContext';

function App() {
  const { user, login, logout } = useAuth();

  const handleLogin = () => {
    const userData = { name: 'John Doe', email: 'john.doe@example.com' };
    login(userData);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## Components Lifecycle (Mounting, Updating, Unmounting)
React components go through a lifecycle that consists of three main phases: Mounting, Updating, and Unmounting. Each phase has specific methods that can be used to perform actions at different points in the component's lifecycle.

### Mounting
The mounting phase occurs when a component is being created and inserted into the DOM. The following methods are called in order during this phase:
1. `constructor()`: Initializes the component's state and binds methods.
2. `static getDerivedStateFromProps()`: Updates the state based on props before rendering.
3. `render()`: Returns the JSX to be rendered to the DOM.
4. `componentDidMount()`: Invoked immediately after the component is mounted. This is a good place to perform side effects, such as fetching data or setting up subscriptions.

### Updating
The updating phase occurs when a component's state or props change. The following methods are called in order during this phase:
1. `static getDerivedStateFromProps()`: Updates the state based on props before rendering.
2. `shouldComponentUpdate()`: Determines whether the component should re-render based on changes in state or props.
3. `render()`: Returns the JSX to be rendered to the DOM.
4. `getSnapshotBeforeUpdate()`: Captures information from the DOM before it is updated. This method is rarely used but can be useful for certain scenarios.
5. `componentDidUpdate()`: Invoked immediately after the component is updated. This is a good place to perform side effects based on the previous state or props.

### Unmounting
The unmounting phase occurs when a component is being removed from the DOM. The following method is called during this phase:
1. `componentWillUnmount()`: Invoked immediately before the component is unmounted and destroyed. This is a good place to perform cleanup, such as cancelling network requests or removing event listeners.
2. `useEffect` cleanup function: In functional components, you can use the cleanup function returned by the `useEffect` hook to perform cleanup tasks when the component is unmounted.
3. `useLayoutEffect` cleanup function: Similar to `useEffect`, but it runs synchronously after all DOM mutations. It can be used for cleanup tasks that need to happen before the browser paints the screen.

Example of a functional component using `useEffect` for mounting, updating, and unmounting:
The example contains two components, one is a parent component and the other is a child component. The parent component has a button that toggles the visibility of the child component (the Counter Component). The child component (the counter component) uses the `useState` hook to manage its state and the `useEffect` hook to perform side effects during mounting, updating, and unmounting.

```jsx
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Mounting
  useEffect(() => {
    console.log('Counter component mounted');
    return () => {
      console.log('Counter component unmount');
    };
  });

  // Updating
  useEffect(() => {
    console.log('Counter component updated');
  }, [count]);


  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

```jsx
function App() {
  const [showCounter, setShowCounter] = useState(true);

  return (
    <div>
      <button onClick={() => setShowCounter(!showCounter)}>
        {showCounter ? 'Hide' : 'Show'} Counter
      </button>
      {showCounter && <Counter />}
    </div>
  );
}
```

## React UseEffect Hook
The `useEffect` hook is a built-in React hook that allows you to perform side effects in functional components. It is called after the component renders and can be used for tasks such as fetching data, subscribing to events, or manipulating the DOM. The `useEffect` hook takes two arguments: a callback function that contains the side effect logic, and an optional dependency array that specifies when the effect should be re-run. 

If the dependency array is empty, the effect will only run once after the initial render. If the dependency array contains variables, the effect will re-run whenever those variables change. 

The `useEffect` hook can also return a cleanup function that will be called when the component unmounts or before the effect is re-run. This is useful for cleaning up subscriptions, timers, or other resources that were created in the effect. 

The `useEffect` hook is a powerful tool for managing side effects in React functional components, and it is an essential part of building modern React applications. By using the `useEffect` hook, you can ensure that your components are efficient, responsive, and easy to maintain. It allows you to separate side effect logic from the component's rendering logic, making your code more modular and easier to understand. 

Overall, the `useEffect` hook is a fundamental part of React's functional component model, and it is an essential tool for building robust and scalable applications. By understanding how to use the `useEffect` hook effectively, you can create components that are both performant and easy to maintain, while also ensuring that your application behaves as expected in response to user interactions and changes in state or props.

Example of a functional component using `useEffect` for fetching data from the [jsonplaceholder API](https://jsonplaceholder.typicode.com/):

```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

Example of a functional component using `useEffect` for subscribing to an event:

```jsx
import React, { useState, useEffect } from 'react';

function WindowWidthTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1>Window Width: {width}px</h1>
    </div>
  );
}
```

Example of a functional component using `useEffect` for updating the document title:

```jsx
import React, { useState, useEffect } from 'react';

function DocumentTitleUpdater() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]); // Effect runs whenever 'count' changes

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Example of a functional component using `useEffect` for setting up a timer:

```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1>Timer: {seconds} seconds</h1>
    </div>
  );
}
```

Example of a functional component using `useEffect` for fetching data from the [jsonplaceholder API](https://jsonplaceholder.typicode.com/) with cleanup:

```jsx
import React, { useState, useEffect } from 'react';

function DataFetcherWithCleanup() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (isMounted) { // Only update state if the component is still mounted
          setData(result);
        }
      } catch (error) {
        if (isMounted) { // Only update state if the component is still mounted
          setError(error);
        }
      } finally {
        if (isMounted) { // Only update state if the component is still mounted
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to mark the component as unmounted
    };
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

It is not recommended to use `useEffect` for data fetching in production applications. Instead, consider using libraries like [React Query](https://react-query.tanstack.com/) or [SWR](https://swr.vercel.app/) that provide more robust solutions for data fetching, caching, and state management. These libraries handle many of the complexities associated with data fetching, such as caching, background updates, and error handling, making it easier to build scalable and maintainable applications.