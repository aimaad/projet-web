const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, isAdmin } = require('../middlewares/auth.js'); // Ajout de la fonction isAdmin pour vérifier l'autorisation
const prisma = new PrismaClient();

// Récupérer toutes les catégories avec pagination
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { take, skip } = req.query;
    const categories = await prisma.categorie.findMany({
      take: parseInt(take),
      skip: parseInt(skip),
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Récupérer une catégorie par son ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const categorie = await prisma.categorie.findUnique({
      where: { id: parseInt(id) },
    });
    if (categorie) {
      res.json(categorie);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ajouter une nouvelle catégorie
router.post('/', authenticateToken, isAdmin, async (req, res) => { // Ajout de la vérification de l'autorisation isAdmin
  try {
    const { nom } = req.body;
    const categorie = await prisma.categorie.create({
      data: {
        nom,
      },
    });
    res.json(categorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mettre à jour une catégorie par son ID
router.patch('/', authenticateToken, isAdmin, async (req, res) => { // Ajout de la vérification de l'autorisation isAdmin
  try {
    
    const { id,nom } = req.body;
    const updatedCategorie = await prisma.categorie.update({
      where: { id: parseInt(id) },
      data: {
        id,
        nom,
      },
    });
    res.json(updatedCategorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Supprimer une catégorie par son ID
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => { // Ajout de la vérification de l'autorisation isAdmin
  try {
    const { id } = req.params;
    await prisma.categorie.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
