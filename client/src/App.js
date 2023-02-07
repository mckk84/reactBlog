import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

function App() {
    const user = useSelector((state) => state.user);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<Home />} />
                {!user && (
                    <>
                        <Route path="/login" element={<Login />} />
                    </>
                )}
                <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
