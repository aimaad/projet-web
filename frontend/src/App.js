import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ViewArticle from "./components/view-article"
import LoginRequired from "./components/auth/login-required"
import Home from './components/home'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import ArticleDeleteButton  from './components/delete-article'
import About from "./components/about"
import AddArticleForm from "./components/add-article"
import AddCategoryForm from "./components/add-categorie"
import  UpdateArticle from "./components/update-article"

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
          <Route path="/add-article" element={<LoginRequired><AddArticleForm /></LoginRequired>} />
          <Route path="/delete-article/:articleId" element={<LoginRequired><ArticleDeleteButton/></LoginRequired>} />
          <Route path="/add-categorie" element={<LoginRequired><AddCategoryForm /></LoginRequired>} />
          <Route path="/update-article/:articleId" element={<LoginRequired><UpdateArticle/></LoginRequired>} />

          
          
      </Routes>
      </Router>
    </div>
  );
}

export default App;
