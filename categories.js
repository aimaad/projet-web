const express = require('express');
const router = express.Router();

// GET /categories
router.get('/', (req, res) => {
  // Logique pour récupérer toutes les catégories
  // Implémentez la logique de récupération en fonction de vos besoins
  res.send('Récupérer toutes les catégories');
});

// GET /categories/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // Logique pour récupérer une catégorie avec l'id donné
  // Implémentez la logique de récupération en fonction de vos besoins
  res.send(`Récupérer la catégorie avec l'id ${id}`);
});

// POST /categories
router.post('/', (req, res) => {
  // Logique pour ajouter une nouvelle catégorie envoyée au format JSON
  // Implémentez la logique d'ajout en fonction de vos besoins
  res.send('Ajouter une nouvelle catégorie');
});

// PATCH /categories
router.patch('/', (req, res) => {
  // Logique pour mettre à jour la catégorie envoyée dans le corps de la requête
  // Implémentez la logique de mise à jour en fonction de vos besoins
  res.send('Mettre à jour la catégorie');
});

// DELETE /categories/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // Logique pour supprimer la catégorie avec l'id donné
  // Implémentez la logique de suppression en fonction de vos besoins
  res.send(`Supprimer la catégorie avec l'id ${id}`);
});

module.exports = router;
