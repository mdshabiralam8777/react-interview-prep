import React from "react";
import { useAppDispatch, useAppSelector } from "../state-management/hooks";
import { decrement, increment, reset } from "../state-management/actions";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px;
  justify-content: center;
  align-items: center;
  width: 100px;
  background-color: lightcyan;
  border-radius: 20px;
  cursor: pointer;
  margin: 10px;
  font-size: larger;
`;
const Box = styled.div`
  padding: 20px;
  font-size: 4rem;
`;

const Counter: React.FC = () => {
  const count = useAppSelector((state) => state.count);
  const dispatch = useAppDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Box>{count}</Box>
      <Button onClick={() => dispatch(increment())}> + </Button>
      <Button
        onClick={() => dispatch(decrement())}
        style={{ marginLeft: "1rem" }}
      >
        {" "}
        -{" "}
      </Button>
      <div>
        <Button onClick={() => dispatch(reset())}> Reset </Button>
      </div>
    </div>
  );
};

export default Counter;
