import React from "react";
import "./App.css";
import Head from "./components/Head";
import Body from "./components/Body";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import { Provider } from "react-redux";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import FixedSidebar from "./components/FixedSidebar";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
    ],
  },
  {
    path: "watch",
    element: <WatchPage />,
  },
]);
function App() {
  return (
    <Provider store={store}>
      <div>
        <Head />
        {/* <Sidebar /> */}
        {/* <FixedSidebar /> */}
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
