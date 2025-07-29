// UseStateExample.tsx
import React from "react";
import HooksDefLayout from "./HooksDefLayout";

const UseStateExample: React.FC = () => {
  const definition = "The useState hook is a built-in React hook that allows functional components to manage state.";
  
  const characteristics = [
    "Local component state: State is isolated to the component instance",
    "Asynchronous updates: State changes don't take effect immediately",
    "Functional updates: Supports both direct values and updater functions",
    "Lazy initialization: Can initialize state with a function for expensive computations"
  ];

  const basicExampleCode = `import { useState } from 'react';

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
}`;

  const advancedExampleCode = `import { useState } from 'react';

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
}`;

  const commonInterviewPoints = [
    "State immutability: Always use the setter function, don't modify state directly",
    "Functional updates: Important when new state depends on previous state (setCount(c => c + 1))",
    "Batching: Multiple state updates may be batched together in event handlers",
    "Initialization: The argument to useState is only used on the initial render"
  ];

  return (
    <HooksDefLayout
      definition={definition}
      characteristics={characteristics}
      basicExampleCode={basicExampleCode}
      advancedExampleCode={advancedExampleCode}
      commonInterviewPoints={commonInterviewPoints}
    />
  );
};

export default UseStateExample;