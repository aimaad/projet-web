import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ViewArticle from "./components/view-article"
import LoginRequired from "./components/auth/login-required"
import Home from './components/home'
import Login from './components/auth/login'
import Signup from './components/auth/signup'

import About from "./components/about"

function App() {
  return (
    <div className="background w-screen h-screen">
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/view/:articleId" element={<LoginRequired><ViewArticle /></LoginRequired>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
