import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../header.jsx";
import Background from "./background";



function AddCategoryForm() {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/categories', {
        nom: categoryName
      });
      console.log(response.data); // Afficher la réponse du backend
      // Réinitialiser le champ du formulaire
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
        {/*<img className="w-32" src={logo} />*/}
      </div>
  
      <div className="w-full space-y-6">
        {/* Error  */}
        {error && (
          <div className="w-full bg-red-100 text-red-500 p-2 rounded">{error}</div>
        )}
  
        <h1 className="text-gray-800 text-lg text-center">Ajouter une catégorie</h1>
  
        <div className="w-full space-y-[15px]">
          {/* Nom de la catégorie */}
          <div className="w-full border border-gray-300 rounded flex items-center space-x-2 group p-1.5 hover:border-gray-400">
          <svg
  className="w-6 h-6 text-gray-500 group-hover:text-gray-600"
  fill="none"
  stroke="currentColor"
  viewBox="10 0 14 14"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M16 4v9m-4-4h8"
  />
</svg>
            <input
              type="text"
              value={categoryName}
              onChange={handleInputChange}
              className="w-full border-0 focus:outline-none text-gray-700"
              placeholder="Nom de la catégorie"
            />
          </div>
        </div>
  
        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="shadow w-full py-1.5 rounded primary-btn"
        >
          Ajouter
        </button>
      </div>
  
      <div className="w-full flex items-center justify-center mb-6">
        <p className="text-gray-500">
         vous êtes un administrateur 
        </p>
      </div>
    </div>
    
  </Background>
  </div>
  );
}

export default AddCategoryForm;
