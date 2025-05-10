// Routes.tsx
import { Routes, Route, RouteObject } from "react-router-dom";
import Counter from "./components/Counter";
import App from "./App";
// import NotFound from './pages/NotFound';

export const AppRoutes: RouteObject[] = [
  {
    path: "/counter",
    element: <Counter />,
  },
];
