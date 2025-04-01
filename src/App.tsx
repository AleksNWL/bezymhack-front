import "./app.css";
import Login from "./pages/login";
import Registation from "./pages/registation";
import Main from './pages/Main/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hello from "./pages/Hello/hello";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registation />} />
      </Routes>
    </Router>
  )
}

export default App;