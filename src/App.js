import React from "react";
import "./App.css";
import Head from "./components/Head";
import Body from "./components/Body";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import { Provider } from "react-redux";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SearchResults from "./components/SearchResults";

const appRouter = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: (
      <div>
        <Head />
        <Body />
      </div>
    ),
    children: [
      {
        path: "/",
        exact: true,
        element: <MainContainer />,
      },
    ],
  },
  {
    path: "/results",
    exact: true,
    element: (
      <div>
        <Head />
        <SearchResults />
      </div>
    ),
  },
  {
    path: "watch",
    exact: true,
    element: (
      <div>
        <Head />
        <WatchPage />
      </div>
    ),
  },
]);
function App() {
  return (
    <Provider store={store}>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
