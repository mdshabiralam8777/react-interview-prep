// Routes.tsx
import { RouteObject } from "react-router-dom";
import ProfileCard from "./components/ProfileCard";
import TestimonialCard from "./components/TestimonialCard";
import BlogCard from "./components/BlogCard";
import Counter from "./components/Counter";
import Autocomplete from "./components/Autocomplete";
import DebounceExample from "./components/DebounceExample";
import Pagination from "./components/Pagination";
import InfiniteScroll from "./components/InfiniteScroll";
import Skeleton from "./components/Skeleton";
import Todo from "./components/Todo";
import { HooksData } from "./ReactHooks/HooksData";
import Accordion from "./components/Accordion";
import ProgressBar from "./components/ProgressBar";
import TrafficLight from "./components/TrafficLight";
import SlideShow from "./components/SlideShow";

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
  {
    path: "/hooks",
    element: <HooksData />,
  },
  {
    path: "/autocomplete",
    element: <Autocomplete />,
  },
  {
    path: "/debounce-example",
    element: <DebounceExample />,
  },
  {
    path: "/pagination",
    element: <Pagination />,
  },
  {
    path: "/infinite-scroll",
    element: <InfiniteScroll />,
  },
  {
    path: "/skeleton",
    element: <Skeleton width={"40%"} height={"30%"} />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
  {
    path: "/accordion",
    element: <Accordion />,
  },
  {
    path: "/progress-bar",
    element: <ProgressBar />,
  },
  {
    path: "/traffic-light",
    element: <TrafficLight />,
  },
  {
    path: "/slide-show",
    element: <SlideShow />,
  },
];
