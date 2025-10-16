import React from "react";
import HooksDefLayout from "./HooksDefLayout";

const hooksDatas = [
  {
    name: "useState",
    definition:
      "The useState hook is a built-in React hook that allows functional components to manage state.",
    characteristics: [
      "Local component state: State is isolated to the component instance",
      "Asynchronous updates: State changes don't take effect immediately",
      "Functional updates: Supports both direct values and updater functions",
      "Lazy initialization: Can initialize state with a function for expensive computations",
    ],
    basicExampleCode: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    advancedExampleCode: `import { useState } from 'react';

interface User {
  name: string;
  age: number;
}

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = () => {
    setLoading(true);
    setTimeout(() => {
      setUser({ name: 'John Doe', age: 30 });
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{user?.name}</h2>
          <p>Age: {user?.age}</p>
        </div>
      )}
      <button onClick={fetchUser}>Load User</button>
    </div>
  );
}`,
    commonInterviewPoints: [
      "State immutability: Always use the setter function, don't modify state directly",
      "Functional updates: Important when new state depends on previous state (setCount(c => c + 1))",
      "Batching: Multiple state updates may be batched together in event handlers",
      "Initialization: The argument to useState is only used on the initial render",
    ],
  },
  {
    name: "useEffect",
    definition:
      "useEffect lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API.",
    characteristics: [
      "Runs after every render by default (both mount and update)",
      "Can control execution with a dependency array",
      "Can return a cleanup function for teardown logic",
      "Handles asynchronous operations elegantly",
      "Runs after the browser has painted (non-blocking)",
    ],
    basicExampleCode: `import { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  // Basic effect
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}`,
    advancedExampleCode: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Advanced effect with cleanup
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          \`https://api.example.com/users/\${userId}\`,
          { signal: controller.signal }
        );
        const data = await response.json();
        if (isMounted) setUser(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
      controller.abort(); // Cancel pending request
    };
  }, [userId]); // Only re-run if userId changes

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}`,
    commonInterviewPoints: [
      "What's the difference between useEffect and useLayoutEffect?",
      "How do you prevent useEffect from running on every render?",
      "When would you use an empty dependency array []?",
      "How do you handle async operations in useEffect?",
      "Why is the cleanup function important and when is it called?",
      "What are common mistakes with useEffect dependency arrays?",
      "How does useEffect differ from lifecycle methods in class components?",
    ],
  },
  {
    name: "useRef",
    definition:
      "useRef returns a mutable ref object whose .current property is initialized to the passed argument. The ref object persists for the full lifetime of the component and can be used to access DOM elements or store any mutable value without triggering re-renders.",
    characteristics: [
      "Creates a persistent value that survives re-renders",
      "Changing .current property doesn't trigger re-renders",
      "Can hold references to DOM elements",
      "Useful for storing previous values or mutable variables",
      "Similar to instance fields in class components",
    ],
    basicExampleCode: `import { useRef } from 'react';
  
  function TextInputWithFocus() {
    const inputEl = useRef(null);
  
    const focusInput = () => {
      // Access DOM element directly
      inputEl.current.focus();
    };
  
    return (
      <div>
        <input ref={inputEl} type="text" />
        <button onClick={focusInput}>
          Focus the input
        </button>
      </div>
    );
  }`,
    advancedExampleCode: `import { useState, useEffect, useRef } from 'react';
  
  function TimerComponent() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef();
    const intervalRef = useRef();
  
    // Store previous value
    useEffect(() => {
      prevCountRef.current = count;
    }, [count]);
  
    // Manage interval
    useEffect(() => {
      intervalRef.current = setInterval(() => {
        setCount(c => c + 1);
      }, 1000);
      
      return () => clearInterval(intervalRef.current);
    }, []);
  
    const stopTimer = () => {
      clearInterval(intervalRef.current);
    };
  
    return (
      <div>
        <p>Current: {count}</p>
        <p>Previous: {prevCountRef.current}</p>
        <button onClick={stopTimer}>Stop timer</button>
      </div>
    );
  }`,
    commonInterviewPoints: [
      "How does useRef differ from useState?",
      "When would you use useRef instead of useState?",
      "Can useRef cause re-renders? Why or why not?",
      "How would you access a child component's DOM node?",
      "What are common use cases for useRef?",
      "How does useRef help with event listeners?",
      "What's the difference between ref and state?",
      "How would you implement a previous value tracker?",
    ],
  },
  {
    name: "useLayoutEffect",
    definition: `
      useLayoutEffect runs synchronously after DOM mutations but before the browser paints
      Useful when you need to measure DOM elements or perform mutations that must be visible immediately
      Similar to useEffect but with different timing
    `,
    characteristics: [
      "🔄 Synchronous Execution - Runs after DOM updates but before browser paint",
      "📏 DOM Measurements - Perfect for reading layout properties (like scroll position or element sizes)",
      "⚠️ Performance Impact - Blocks browser painting until it completes (use carefully)",
      "🧹 Same Cleanup API - Returns a cleanup function like useEffect",
      "⚡ Visual Consistency - Prevents flickering by making changes before paint",
    ],
    basicExampleCode: `import { useLayoutEffect, useRef, useState } from 'react';
  
  function MeasureExample() {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);
  
    // This runs AFTER DOM update but BEFORE paint
    useLayoutEffect(() => {
      console.log('Measuring element...');
      
      // Get current width of the DOM element
      const measuredWidth = ref.current?.offsetWidth || 0;
      
      // Update state synchronously before paint
      setWidth(measuredWidth);
      
      // Cleanup example (runs before next execution)
      return () => console.log('Cleanup measurement');
    }, []); // Empty array = runs only once after mount
  
    return (
      <div ref={ref} style={{ border: '2px solid blue' }}>
        {/* Width will be set before first paint */}
        My width is: {width}px
      </div>
    );
  }`,
    advancedExampleCode: `import { useLayoutEffect, useState } from 'react';
  
  function ScrollPositionTracker() {
    const [scrollY, setScrollY] = useState(0);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const prevScrollRef = useRef(0);
  
    // Track scroll direction with no visible flicker
    useLayoutEffect(() => {
      const handleScroll = () => {
        const currentScroll = window.scrollY;
        
        // Update scroll direction before paint
        setIsScrollingDown(currentScroll > prevScrollRef.current);
        
        // Store current scroll for next comparison
        prevScrollRef.current = currentScroll;
        
        // Update scroll position
        setScrollY(currentScroll);
      };
  
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <div style={{ position: 'fixed', top: 0, right: 0 }}>
        Scroll Y: {scrollY}px | 
        Direction: {isScrollingDown ? 'Down ↓' : 'Up ↑'}
      </div>
    );
  }`,
    commonInterviewPoints: [
      "Timing: When exactly does useLayoutEffect fire compared to useEffect?",
      "Use Case: Why would you need to measure an element before paint?",
      "Performance: How can misuse lead to janky UI?",
      "SSR: Why does React warn about useLayoutEffect in server rendering?",
      "Alternatives: When should you prefer useEffect instead?",
      "Cleanup: How does cleanup timing differ from useEffect?",
      "Practical: Show an example where it fixes visual flickering",
    ],
  },
  {
    name: "React Lazy Loading",
    definition: `
      Lazy loading is a technique to load components only when they're needed
      Improves initial load performance by code-splitting your application
      Uses React.lazy() with dynamic imports and Suspense for fallback UI
    `,
    characteristics: [
      "⚡ Performance Boost - Reduces initial bundle size",
      "🧩 On-Demand Loading - Components load when rendered",
      "🔄 Supports SSR - Through loadable-components or similar",
      "⏳ Fallback UI - Show loading states with Suspense",
      "🚀 Built-in API - React.lazy() + dynamic imports",
    ],
    basicExampleCode: `import React, { Suspense, lazy } from 'react';
  
  // Regular import (eager loading)
  // import HeavyComponent from './HeavyComponent';
  
  // Lazy load the component
  const HeavyComponent = lazy(() => import('./HeavyComponent'));
  
  function App() {
    return (
      <div>
        <h1>My App</h1>
        <Suspense 
          fallback={
            // Show while component loads
            <div className="loader">Loading...</div>
          }
        >
          {/* This won't load until rendered */}
          <HeavyComponent />
        </Suspense>
      </div>
    );
  }`,
    advancedExampleCode: `import React, { Suspense, lazy, useState } from 'react';
  
  // Preload pattern for better UX
  const preloadComponent = () => {
    // Start loading before needed
    const HeavyComponent = lazy(() => import('./HeavyComponent'));
    return HeavyComponent;
  };
  
  function Dashboard() {
    const [showChart, setShowChart] = useState(false);
    const [ChartComponent, setChartComponent] = useState(null);
  
    // Preload on hover or other user interaction
    const handleMouseEnter = () => {
      const Component = lazy(() => import('./ComplexChart'));
      setChartComponent(<Component />);
    };
  
    return (
      <div>
        <button 
          onClick={() => setShowChart(true)}
          onMouseEnter={handleMouseEnter}
        >
          Show Analytics
        </button>
  
        <Suspense fallback={<div>Loading dashboard...</div>}>
          {showChart && (
            ChartComponent || 
            lazy(() => import('./ComplexChart'))()
          )}
        </Suspense>
      </div>
    );
  }`,
    commonInterviewPoints: [
      " Bundling: How does lazy loading affect webpack chunks?",
      " SSR: Why can't React.lazy be used directly with server rendering?",
      " Error Handling: How to catch loading errors? (Error Boundaries)",
      " Optimization: When should you preload lazy components?",
      " Tradeoffs: Lazy loading vs. hydration performance in SSR",
      " Implementation: How to test lazy-loaded components?",
      " Patterns: Best practices for route-based code splitting",
    ],
    bestPractices: `
       🏆 Best Practices:
       1. Route-level splitting - Most effective for pages
       2. Prefetch on hover - For better UX
       3. Named chunks - For better caching
       4. Error boundaries - Catch loading failures
       5. Avoid over-splitting - Network requests have overhead
  
       Webpack Magic Comments:
      const Component = lazy(() => import(
        /* webpackChunkName: "chart-component" */
        /* webpackPrefetch: true */
        './ComplexChart'
      ));
    `,
  },
  {
    name: "useTranslation",
    definition:
      "The useTranslation hook is part of react-i18next that provides internationalization (i18n) functionality, allowing components to access translation functions and i18n instances.",
    characteristics: [
      "Translation function: Provides t() function to translate keys into localized strings",
      "Namespace support: Allows loading and using multiple translation namespaces",
      "Language switching: Enables dynamic language changes with automatic re-renders",
      "Interpolation and formatting: Supports variable interpolation, pluralization, and date/number formatting",
    ],
    basicExampleCode: `import { useTranslation } from 'react-i18next';

function WelcomeComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.message')}</p>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('es')}>Español</button>
    </div>
  );
}`,
    advancedExampleCode: `import { useTranslation } from 'react-i18next';

interface User {
  name: string;
  notificationCount: number;
}

function UserDashboard() {
  const { t, i18n } = useTranslation(['dashboard', 'common']);
  const [user, setUser] = useState<User>({ name: 'John', notificationCount: 5 });

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <header>
        <h1>{t('dashboard:title')}</h1>
        <select 
          value={i18n.language} 
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </header>
      
      <main>
        <p>{t('dashboard:welcomeMessage', { name: user.name })}</p>
        <p>{t('dashboard:notificationCount', { count: user.notificationCount })}</p>
        <p>{t('common:lastLogin', { date: new Date() })}</p>
      </main>
    </div>
  );
}`,
    commonInterviewPoints: [
      "Namespace usage: Can specify which translation namespace to use useTranslation('ns') or multiple useTranslation(['ns1', 'ns2'])",
      "Language detection: Automatically detects browser language but can be overridden",
      "Re-rendering: Component re-renders automatically when language changes",
      "Key fallback: Falls back to default language or key itself if translation is missing",
      "Performance: Efficiently loads only needed translation files with lazy loading support",
    ],
  },
  {
    name: "useFormContext",
    definition:
      "The useFormContext hook is part of React Hook Form that allows components to access form context and methods without needing to pass props through every level of the component tree.",
    characteristics: [
      "Context consumption: Accesses the form context provided by FormProvider",
      "Prop drilling elimination: Eliminates the need to pass form methods through multiple component layers",
      "Performance optimized: Only re-renders when specific form state changes occur",
      "TypeScript support: Fully typed with proper TypeScript definitions for form context",
    ],
    basicExampleCode: `import { useForm, FormProvider, useFormContext } from 'react-hook-form';

function FormWrapper() {
  const methods = useForm();
  
  return (
    <FormProvider {...methods}>
      <FormComponent />
    </FormProvider>
  );
}

function FormComponent() {
  const { register, handleSubmit } = useFormContext();
  
  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('name')} placeholder="Name" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
    advancedExampleCode: `import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <FormHeader />
      <FormFields />
      <FormActions />
    </FormProvider>
  );
}

function FormHeader() {
  const { formState: { errors } } = useFormContext<FormData>();
  
  return (
    <div>
      <h1>Login</h1>
      {errors.root && <p className="error">{errors.root.message}</p>}
    </div>
  );
}

function FormFields() {
  const { register, formState: { errors } } = useFormContext<FormData>();
  
  return (
    <div>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}
    </div>
  );
}

function FormActions() {
  const { handleSubmit, formState: { isSubmitting } } = useFormContext<FormData>();
  
  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  return (
    <button 
      onClick={handleSubmit(onSubmit)} 
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Logging in...' : 'Login'}
    </button>
  );
}`,
    commonInterviewPoints: [
      "Provider requirement: Must be used within a FormProvider component, otherwise it will throw an error",
      "Performance benefits: More efficient than prop drilling in complex form hierarchies",
      "Type safety: Proper TypeScript generics ensure type safety across form components",
      "Use case scenarios: Ideal for large forms split across multiple components or reusable form components",
    ],
  },
  {
    name: "useMemo",
    definition:
      "Think of useMemo like a smart calculator that remembers its answers. Just like how you'd write down the result of a difficult math problem so you don't have to solve it again every time, useMemo stores the result of complex calculations and only recalculates when the inputs change.",
    characteristics: [
      "Performance optimization: Memoizes expensive calculations to avoid redundant computations",
      "Dependency-driven: Recalculates only when specified dependencies change",
      "Referential equality: Returns the same cached value unless dependencies update",
      "Computational cost: Ideal for costly operations like complex calculations or large data transformations",
    ],
    basicExampleCode: `import { useMemo, useState } from 'react';

function ExpensiveCalculationComponent() {
  const [number, setNumber] = useState(0);
  const [otherValue, setOtherValue] = useState(0);

  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return number * 1000; // Simulating expensive calculation
  }, [number]);

  return (
    <div>
      <p>Number: {number}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <p>Other Value: {otherValue}</p>
      <button onClick={() => setNumber(n => n + 1)}>
        Increment Number
      </button>
      <button onClick={() => setOtherValue(v => v + 1)}>
        Increment Other Value
      </button>
    </div>
  );
}`,
    advancedExampleCode: `import { useMemo, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  age: number;
  department: string;
}

function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'age'>('name');

  // Expensive filtering and sorting operation
  const filteredAndSortedUsers = useMemo(() => {
    console.log('Filtering and sorting users...');
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.department.toLowerCase().includes(filter.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.age - b.age;
    });
  }, [users, filter, sortBy]);

  // Memoized statistics
  const userStats = useMemo(() => {
    return {
      total: filteredAndSortedUsers.length,
      averageAge: filteredAndSortedUsers.reduce((sum, user) => sum + user.age, 0) / filteredAndSortedUsers.length || 0,
      departments: [...new Set(filteredAndSortedUsers.map(user => user.department))],
    };
  }, [filteredAndSortedUsers]);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter users..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'name' | 'age')}>
        <option value="name">Sort by Name</option>
        <option value="age">Sort by Age</option>
      </select>
      
      <div>
        <h3>Statistics</h3>
        <p>Total Users: {userStats.total}</p>
        <p>Average Age: {userStats.averageAge.toFixed(1)}</p>
      </div>
      
      <div>
        {filteredAndSortedUsers.map(user => (
          <div key={user.id}>
            {user.name} - {user.age} - {user.department}
          </div>
        ))}
      </div>
    </div>
  );
}`,
    commonInterviewPoints: [
      "Dependency array: Empty array means calculation runs once, no dependencies means it runs on every render",
      "When to use: Only for expensive computations, not for trivial calculations",
      "Referential equality: Useful for maintaining stable object references in dependency arrays",
      "Performance trade-off: The memoization itself has cost, so only use when benefits outweigh overhead",
      "Not a guarantee: React may still choose to recalculate for memory management reasons",
    ],
  },
  {
    name: "useCallback",
    definition:
      "Imagine useCallback as giving someone your phone number. Instead of writing it on a new piece of paper every time they need it, you give them a business card that stays the same. Similarly, useCallback gives components the same function reference unless the dependencies change, preventing unnecessary work.",
    characteristics: [
      "Function memoization: Returns a memoized version of the callback function",
      "Dependency-driven: Creates new function only when dependencies change",
      "Referential stability: Maintains same function reference across renders unless dependencies update",
      "Performance optimization: Prevents unnecessary re-renders of child components that depend on function props",
    ],
    basicExampleCode: `import { useCallback, useState } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');

  // This function is re-created on every render without useCallback
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []); // No dependencies, so function reference stays the same

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onIncrement={handleIncrement} />
      <InputComponent value={value} onChange={handleChange} />
    </div>
  );
}

// React.memo prevents re-renders if props haven't changed
const ChildComponent = React.memo(({ onIncrement }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onIncrement}>Increment</button>;
});

const InputComponent = React.memo(({ value, onChange }) => {
  console.log('InputComponent rendered');
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type something..."
    />
  );
});`,
    advancedExampleCode: `import { useCallback, useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Memoized todo actions
  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos(prev => [...prev, newTodo]);
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  // Filtered todos calculation
  const filteredTodos = useCallback(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div>
      <TodoHeader onAddTodo={addTodo} />
      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={filteredTodos()}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
      <TodoFooter
        todoCount={todos.length}
        completedCount={todos.filter(t => t.completed).length}
        onClearCompleted={clearCompleted}
      />
    </div>
  );
}

// Memoized child components
const TodoHeader = React.memo(({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
});

const TodoList = React.memo(({ todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </ul>
  );
});

const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});`,
    commonInterviewPoints: [
      "Dependency requirements: Include all values from component scope that are used in the callback",
      "When to use: Primarily when passing callbacks to optimized child components that rely on reference equality",
      "Performance impact: Overusing useCallback can be worse than not using it due to function creation overhead",
      "useCallback vs useMemo: useCallback memoizes functions, useMemo memoizes values",
      "Common use cases: Event handlers, prop functions for memoized components, dependencies for other hooks",
    ],
  },
  {
    name: "useNavigate",
    definition:
      "Think of useNavigate as a remote control for your app's navigation. Just like you'd use a TV remote to change channels without touching the TV, useNavigate lets you move users between pages programmatically without them clicking on links.",
    characteristics: [
      "Programmatic navigation: Enables navigation through function calls rather than Link components",
      "Relative navigation: Supports relative and absolute path navigation",
      "Navigation options: Allows passing state, replace behavior, and delta steps for go-back functionality",
      "Route management: Integrates with React Router's routing system and history stack",
    ],
    basicExampleCode: `import { useNavigate } from 'react-router-dom';

function NavigationComponent() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/about')}>About</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}`,
    advancedExampleCode: `import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login success
    navigate('/dashboard', { 
      state: { user: 'John Doe' },
      replace: true 
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoBack}>Back</button>
    </div>
  );
}`,
    commonInterviewPoints: [
      "Replace vs push: Use { replace: true } to replace current entry in history stack instead of adding new one",
      "Relative paths: Navigate relative to current route using relative paths like '../parent' or './child'",
      "State management: Can pass state object that's accessible via useLocation in the target component",
      "Number navigation: Positive numbers go forward, negative numbers go back in history stack",
      "v5 vs v6: Replaces useHistory().push() and useHistory().replace() from React Router v5",
    ],
  },
  {
    name: "useForm",
    definition:
      "Think of useForm as a smart assistant that helps you manage forms effortlessly. Just like how a personal assistant would handle all your paperwork, tracking every field, validating information, and organizing everything neatly, useForm takes care of all form state, validation, and submission logic for you.",
    characteristics: [
      "Form state management: Automatically manages form values, errors, and submission state",
      "Built-in validation: Provides easy validation with support for custom validation rules",
      "Performance optimized: Minimizes re-renders by tracking only necessary form state",
      "Developer experience: Reduces boilerplate code and simplifies form handling logic",
    ],
    basicExampleCode: `import { useForm } from 'react-hook-form';

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('name', { required: 'Name is required' })} 
        placeholder="Name" 
      />
      {errors.name && <p>{errors.name.message}</p>}
      
      <input 
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /^\\S+@\\S+$/i,
            message: 'Invalid email address'
          }
        })} 
        placeholder="Email" 
      />
      {errors.email && <p>{errors.email.message}</p>}
      
      <button type="submit">Submit</button>
    </form>
  );
}`,
    advancedExampleCode: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  preferences: z.object({
    newsletter: z.boolean(),
    notifications: z.boolean(),
  }),
});

type FormData = z.infer<typeof schema>;

function UserRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      preferences: {
        newsletter: true,
        notifications: false,
      },
    },
    mode: 'onChange',
  });

  // Watch specific field
  const newsletterEnabled = watch('preferences.newsletter');

  const onSubmit = async (data: FormData) => {
    try {
      await submitUserData(data);
      reset();
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  const handleAgeIncrement = () => {
    const currentAge = parseInt(watch('age') || '0');
    setValue('age', currentAge + 1, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('username')} placeholder="Username" />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <input {...register('email')} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input 
          type="number" 
          {...register('age', { valueAsNumber: true })} 
          placeholder="Age" 
        />
        <button type="button" onClick={handleAgeIncrement}>+</button>
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register('preferences.newsletter')} />
          Subscribe to newsletter
        </label>
        
        {newsletterEnabled && (
          <label>
            <input type="checkbox" {...register('preferences.notifications')} />
            Enable notifications
          </label>
        )}
      </div>

      <button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Submitting...' : 'Register'}
      </button>
    </form>
  );
}`,
    commonInterviewPoints: [
      "Performance benefits: Reduces re-renders compared to controlled components with useState",
      "Validation strategies: Supports onChange, onBlur, onSubmit, and all validation modes",
      "Uncontrolled vs controlled: Primarily uses uncontrolled components with refs for better performance",
      "Integration: Works well with validation libraries like Yup, Zod, and Joi",
      "File handling: Supports file inputs and complex form structures with nested objects",
    ],
  },
  {
    name: "FormProvider",
    definition:
      "Think of FormProvider as a message board that lets all components in a form share information without passing notes. Just like how a family uses a central bulletin board to leave messages for each other, FormProvider allows form components to access form state and methods without manually passing props through every level.",
    characteristics: [
      "Context provider: Provides form context to all child components",
      "Prop drilling elimination: Removes the need to pass form methods through multiple components",
      "Component composition: Enables building complex forms from smaller, reusable components",
      "Performance optimized: Works efficiently with React's context system",
    ],
    basicExampleCode: `import { useForm, FormProvider } from 'react-hook-form';

function App() {
  const methods = useForm();
  
  return (
    <FormProvider {...methods}>
      <UserForm />
    </FormProvider>
  );
}

function UserForm() {
  const { register, handleSubmit } = useFormContext();
  
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
    advancedExampleCode: `import { useForm, FormProvider, useFormContext } from 'react-hook-form';

function MultiStepForm() {
  const methods = useForm({
    defaultValues: {
      personal: { name: '', email: '' },
      address: { street: '', city: '' }
    }
  });

  return (
    <FormProvider {...methods}>
      <div>
        <PersonalInfoStep />
        <AddressStep />
        <FormActions />
      </div>
    </FormProvider>
  );
}

function PersonalInfoStep() {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <div>
      <h3>Personal Information</h3>
      <input 
        {...register('personal.name', { required: 'Name is required' })} 
        placeholder="Name" 
      />
      {errors.personal?.name && <span>{errors.personal.name.message}</span>}
      
      <input 
        {...register('personal.email', { required: 'Email is required' })} 
        placeholder="Email" 
      />
      {errors.personal?.email && <span>{errors.personal.email.message}</span>}
    </div>
  );
}

function AddressStep() {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <div>
      <h3>Address Information</h3>
      <input 
        {...register('address.street', { required: 'Street is required' })} 
        placeholder="Street" 
      />
      {errors.address?.street && <span>{errors.address.street.message}</span>}
      
      <input 
        {...register('address.city', { required: 'City is required' })} 
        placeholder="City" 
      />
      {errors.address?.city && <span>{errors.address.city.message}</span>}
    </div>
  );
}

function FormActions() {
  const { handleSubmit, formState: { isSubmitting } } = useFormContext();
  
  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  );
}`,
    commonInterviewPoints: [
      "useFormContext requirement: FormProvider must be used with useFormContext in child components",
      "Performance: More efficient than prop drilling in deep component trees",
      "Type safety: Works well with TypeScript for type-safe form context",
      "Use cases: Ideal for multi-step forms, reusable form components, and complex form layouts",
      "Error handling: Provides access to form errors and validation state across components",
    ],
  },
  {
    name: "useContext",
    definition:
      "Think of useContext as a family telephone that lets everyone hear the same message without repeating it. Just like how one announcement on a home intercom reaches every room, useContext allows components to access shared data without passing props through every level.",
    characteristics: [
      "Context consumption: Accesses values from the nearest Context Provider",
      "Prop drilling solution: Eliminates the need to pass props through intermediate components",
      "Re-render trigger: Component re-renders when the context value changes",
      "Performance consideration: Optimize with memoization to prevent unnecessary re-renders",
    ],
    basicExampleCode: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <MainContent />
    </ThemeContext.Provider>
  );
}

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <header style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </header>
  );
}

function MainContent() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <main style={{ 
      background: theme === 'light' ? '#f5f5f5' : '#222',
      color: theme === 'light' ? '#000' : '#fff'
    }}>
      <h1>Welcome to our app!</h1>
    </main>
  );
}`,
    advancedExampleCode: `import { createContext, useContext, useReducer, useMemo } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  const actions = useMemo(() => ({
    login: (userData) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: userData });
        dispatch({ type: 'SET_LOADING', payload: false });
      }, 1000);
    },
    logout: () => dispatch({ type: 'LOGOUT' }),
  }), []);

  const value = useMemo(() => ({
    ...state,
    ...actions
  }), [state, actions]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function LoginButton() {
  const { login, loading } = useContext(AuthContext);
  
  const handleLogin = () => {
    login({ id: 1, name: 'John Doe', email: 'john@example.com' });
  };

  return (
    <button onClick={handleLogin} disabled={loading}>
      {loading ? 'Logging in...' : 'Login'}
    </button>
  );
}

function UserProfile() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <div>
        <LoginButton />
        <UserProfile />
      </div>
    </AuthProvider>
  );
}`,
    commonInterviewPoints: [
      "Provider requirement: Must be used within a matching Context Provider, otherwise uses default value",
      "Performance impact: Can cause unnecessary re-renders if context value changes frequently",
      "Optimization strategies: Use memoization, splitting contexts, or useMemo to prevent re-renders",
      "Multiple contexts: A component can use multiple useContext hooks for different contexts",
      "Default value: The value passed to createContext is used when no Provider is found in the tree",
    ],
  },
];

export const HooksData: React.FC = () => {
  return <HooksDefLayout hooks={hooksDatas} />;
};
