import React from 'react';
import { useAppDispatch, useAppSelector } from '../state-management/hooks';
import { decrement, increment } from '../state-management/actions';

const Counter: React.FC = () => {
  const count = useAppSelector((state) => state.count);
  const dispatch = useAppDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())} style={{ marginLeft: '1rem' }}>
        -
      </button>
    </div>
  );
};

export default Counter;
