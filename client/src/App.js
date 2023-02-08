import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Admin from "./admin/Admin";
import AdminBlogs from "./admin/AdminBlogs";
import Users from "./admin/Users";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";

function App() {
    const user = useSelector((state) => state.user);

    return (
        <BrowserRouter>
            {user && !user.isAdmin && (
                <>
                    <Header />
                </>
            )}
            {user && user.isAdmin && (
                <>
                    <AdminHeader />
                </>
            )}
            <Routes>
                {user && !user.isAdmin && (
                    <>
                        <Route index element={<Home />} />
                    </>
                )}
                <Route path="/Admin" element={<Admin />} />
                <Route path="/AdminBlogs" element={<AdminBlogs />} />
                <Route path="/AdminUsers" element={<Users />} />
                <Route path="/blogs/:slug" element={<Blog />} />
                {!user && (
                    <>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                    </>
                )}
                <Route path="*" element={<Home />} />
            </Routes>
            {user && (
                <>
                    <Footer />
                </>
            )}
        </BrowserRouter>
    );
}

export default App;
