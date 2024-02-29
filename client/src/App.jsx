import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import List from "./pages/List";
import CreateTicket from "./pages/CreateTicket";
import UpdateTicket from "./pages/UpdateTicket";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list" element={<List />} />
        <Route path="/create" element={<CreateTicket />} />
        <Route path="/update/:id" element={<UpdateTicket />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
