import React, { useState, useEffect } from 'react';
import axios from '../axios-instance';
import Header from '../header.jsx';
import Background from './background';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateArticle() {
  const { articleId } = useParams(); // Obtient l'ID de l'article depuis l'URL de la page
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [image, setImage] = useState('');
  const [published, setPublished] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getArticleDetails();
    axios.get('/categories')
      .then(res => {
        setCategories([...res.data.categories]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const getArticleDetails = async () => {
    try {
      const response = await axios.get(`/articles/${articleId}`);
      const article = response.data.article;
      setTitre(article.titre);
      setContenu(article.contenu);
      setImage(article.image);
      setPublished(article.published);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedArticle = {
      id: articleId,
      titre,
      contenu,
      image,
      published,
      categoryId: categories.find(category => category.nom === categoryName)?.id,
    };

    try {
      const response = await axios.patch(`/articles/${articleId}`, updatedArticle);
      console.log(response.data);
      // Rediriger vers la page d'affichage de l'article mis à jour
      // history.push(`/articles/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  return (
    <div>
      <Header />
      <Background>
        <div className="w-[350px] h-[500px] bg-white border rounded-md shadow px-4 flex flex-col justify-between">
          <div className="w-full centered-layout p-4"></div>

          <div className="w-full space-y-6">
            {/* Error */}
            {error && (
              <div className="w-full bg-red-100 text-red-500 p-2 rounded">{error}</div>
            )}

            <h1 className="text-gray-800 text-lg text-center">Update Article</h1>

            <div className="w-full space-y-[15px]">
              {/* Titre */}
              <div className="w-full border border-gray-300 rounded flex items-center space-x-2 group p-1.5 hover:border-gray-400">
                <input
                  type="text"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  className="w-full border-0 focus:outline-none text-gray-700"
                  placeholder="Title"
                />
              </div>

              {/* Contenu */}
              <div className="w-full border border-gray-300 rounded flex items-center space-x-2 group p-1.5 hover:border-gray-400">
                <textarea
                  value={contenu}
                  onChange={(e) => setContenu(e.target.value)}
                  className="w-full border-0 focus:outline-none text-gray-700"
                  placeholder="Content"
                />
              </div>

              {/* Image */}
              <div className="w-full border border-gray-300 rounded flex items-center space-x-2 group p-1.5 hover:border-gray-400">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full border-0 focus:outline-none text-gray-700"
                  placeholder="Image URL"
                />
              </div>

              {/* Published */}
              <label className="form-label">
                Published:
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="form-checkbox"
                />
              </label>

              {/* Category */}
              <div className="w-full border border-gray-300 rounded flex items-center space-x-2 group p-1.5 hover:border-gray-400">
                <select
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                  className="w-full border-0 focus:outline-none text-gray-700"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category.nom}>
                      {category.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              onClick={handleUpdate}
              className="shadow w-full py-1.5 rounded primary-btn"
            >
              Update Article
            </button>
            <div>
              <p style={{ marginBottom: '10px' }}></p>
            </div>
          </div>
        </div>
      </Background>
    </div>
  );
}

export default UpdateArticle;
