const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middlewares/auth.js');
const prisma = new PrismaClient();

// Récupérer tous les articles avec pagination
router.get('/',  async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const articles = await prisma.article.findMany({
      take: parseInt(limit),
      skip: skip,
    });
    res.json({articles});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Récupérer tous les articles avec pagination
router.get('/category/:categoryId', async (req, res) => {
  try {
    const {categoryId} = req.params
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const articles = await prisma.article.findMany({
      where: {
        categories: {
          some: {
            id: parseInt(categoryId),
          },
        },
      },
      include: {
        categories: true,
      },
    });

    res.json({articles});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Récupérer un article par son ID
router.get('/:id',authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include : {
        auteur : true
      }
    });
    if (article) {
      res.json({article});
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ajouter un nouvel article
router.post('/', authenticateToken,async (req, res) => {
  try {
    const { titre, contenu, image, createdAt, updatedAt, published } = req.body;
    const userId = req.user.id; // Supposons que l'ID de l'utilisateur soit accessible via req.user.id
    const article = await prisma.Article.create({
      data: {
        titre,
        contenu,
        image,
        createdAt,
        updatedAt,
        published,
        auteur: { connect: { id: userId } } // Spécifie l'ID de l'utilisateur pour l'auteur de l'article

      },
    });
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mettre à jour un article par son ID
router.patch('/', authenticateToken,async (req, res) => {
  try {
    const { id, titre, contenu, image, createdAt, updatedAt, published } = req.body;
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        id,
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
router.delete('/:id',authenticateToken, async (req, res) => {
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
