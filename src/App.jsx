import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Auth/PrivateRoute";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            {/* public route */}
            <Route index element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />

            {/* private route */}
            <Route element={<PrivateRoute />}>
              <Route path="/gallery" element={<Gallery />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
