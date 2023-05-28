import React, { useState } from 'react';
import axios from '../axios-instance';
import {useParams} from "react-router-dom"

function ArticleDeleteButton( ) {
  const {articleId} = useParams();
  const handleDelete = () => {
    
    // Appeler l'API pour supprimer l'article
    axios
      .delete(`/articles/${articleId}`)
      .then((response) => {
        console.log(response.data);
        // Gérer la suppression réussie, par exemple, afficher un message ou actualiser la liste des articles
      })
      .catch((error) => {
        console.error(error);
        // Gérer l'erreur, par exemple, afficher un message d'erreur
      });
  };

  return (
    <button onClick={handleDelete}>Supprimer</button>
  );
}

export default ArticleDeleteButton;