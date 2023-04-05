import "./App.css";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowAll from "./components/ShowAll";
function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <div className="container">

        <Routes>
          <Route exact path="/" element={<AddUser />} />
          <Route exact path="/update/:id" element={<EditUser />} />
          <Route exact path="/show" element={<ShowAll />} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
