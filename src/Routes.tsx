// Routes.tsx
import { RouteObject } from "react-router-dom";
import ProfileCard from "./components/ProfileCard";
import TestimonialCard from "./components/TestimonialCard";
import BlogCard from "./components/BlogCard";
import Counter from "./components/Counter";

// import NotFound from './pages/NotFound';

export const AppRoutes: RouteObject[] = [
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/blogcard",
    element: <BlogCard />,
  },

  {
    path: "/profile",
    element: <ProfileCard />,
  },
  {
    path: "/testimonial",
    element: <TestimonialCard />,
  },
];
