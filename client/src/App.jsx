import Login from './components/Login';
import Signin from './components/Signin';
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
       <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/" element={<Login />} />
            </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
