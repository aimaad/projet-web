// Fonction pour récupérer tous les articles avec pagination
function getArticles(take , skip ) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/pagination?page=10&limit=2`,
        method: 'GET',
        success: function (data) {
          resolve(data);
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  }
  
  
  // Fonction pour récupérer un article par son ID
  function getArticleById(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/articles/${id}`,
        method: 'GET',
        success: function (data) {
          resolve(data);
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  }
  
  // Fonction pour ajouter un nouvel article
  function addArticle(article) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/articles',
        method: 'POST',
        data: JSON.stringify(article),
        contentType: 'application/json',
        success: function (data) {
          resolve(data);
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  }
  
  // Fonction pour mettre à jour un article par son ID
  function updateArticle(article) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/articles',
        method: 'PATCH',
        data: JSON.stringify(article),
        contentType: 'application/json',
        success: function (data) {
          resolve(data);
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  }
  
  // Fonction pour supprimer un article par son ID
  function deleteArticle(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/deletearticle/${id}`,
        method: 'DELETE',
        success: function () {
          resolve();
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  }
  
  function login(email, password) {
    return new Promise((resolve, reject) => {
      const requestBody = {
        email: email,
        password: password
      };
  
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => response.json())
        .then(data => {
          if (data.token) {
            resolve(data.token);
          } else {
            reject(new Error('Invalid credentials'));
          }
        })
        .catch(error => reject(error));
    });
  }
  