import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route index element={<Home />} />
                    
                    <Route path="*" element={<Home />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
