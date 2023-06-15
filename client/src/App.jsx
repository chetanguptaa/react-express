import Login from './components/Login';
import MePage from './components/Me';
import Signin from './components/Signin';
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
       <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/" element={<Login />} />
                <Route path="/me" element={<MePage />} />
            </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
