import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import AdminPage from "./pages/AdminPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";
import EditBlog from "./pages/EditBlog.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <UserHomePage/>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/admin",
      element: <AdminPage/>,
    },
    {
      path: "/admin/create",
      element: <CreateBlog/>,
    },
    {
      path: "/blog/edit/:id",
      element: <EditBlog/>,
    },
    {
      path: "/blog/:id",
      element: <BlogDetail/>,
    }
  ]);
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
