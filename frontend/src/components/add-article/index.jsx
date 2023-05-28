import React, { useState, useEffect } from 'react';
import axios from '../axios-instance';
import './AddArticleForm.css';
import Header from "../header.jsx";
import Background from "./background";
import { useNavigate } from 'react-router-dom';

function AddArticleForm() {
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [image, setImage] = useState('');
  const [published, setPublished] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/categories")
    .then(res => {
      setCategories([...res.data.categories]);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const articleData = {
      titre,
      contenu,
      image,
      published,
      categoryId: categories.find(category => category.nom === categoryName)?.id,
    };

    axios
      .post('/articles', articleData)
      .then((response) => {
        console.log(response.data);
        // Handle success, such as showing a success message or redirecting
      })
      .catch((error) => {
        console.error(error);
        // Handle error, such as showing an error message
      });
  };

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/categories', {
        nom: categoryName
      });
      console.log(response.data);
      setCategoryName('');
      setError('');
      navigate('/');
       
    } catch (error) {
      console.error(error);
      setError('Failed to add category');
    }
  };

  return (
    <div>
      <Header />
    <Background>
      <div className="w-[350px] h-[500px] bg-white border rounded-md shadow px-4 flex flex-col justify-between">
      

        <div className="w-full centered-layout p-4">
         
        </div>
        
        <div className="w-full space-y-6">
          {/* Error */}
          {error && (
            <div className="w-full bg-red-100 text-red-500 p-2 rounded">{error}</div>
          )}

          <h1 className="text-gray-800 text-lg text-center">Ajouter un article</h1>

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
            onClick={handleFormSubmit}
            className="shadow w-full py-1.5 rounded primary-btn"
          >
            Ajouter un article
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

export default AddArticleForm;
