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
];

export const HooksData: React.FC = () => {
  return <HooksDefLayout hooks={hooksDatas} />;
};
