import { Routes, Route } from "react-router";
import Chat from "./pages/Home/Chat";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Login />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
