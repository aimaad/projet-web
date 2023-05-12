const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Récupérer tous les articles avec pagination
router.get('/', async (req, res) => {
  try {
    const { take, skip } = req.query;
    const articles = await prisma.article.findMany({
      take: parseInt(take),
      skip: parseInt(skip),
    });
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Récupérer un article par son ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ajouter un nouvel article
router.post('/', async (req, res) => {
  try {
    const { titre, contenu, image, createdAt, updatedAt, published } = req.body;
    const article = await prisma.article.create({
      data: {
        titre,
        contenu,
        image,
        createdAt,
        updatedAt,
        published,
      },
    });
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mettre à jour un article par son ID
router.patch('/', async (req, res) => {
  try {
    const { id, titre, contenu, image, createdAt, updatedAt, published } = req.body;
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        titre,
        contenu,
        image,
        createdAt,
        updatedAt,
        published,
      },
    });
    res.json(updatedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Supprimer un article par son ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.article.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
