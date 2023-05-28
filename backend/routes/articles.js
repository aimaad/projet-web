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
      where : {
        published : true,
      }
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

// Search a word 
router.post("/search", async (req, res) => {
  try {

    const {search:searchQuery} = req.body; // Récupère le texte de recherche depuis la barre de recherche
    console.log(searchQuery)
    console.log("hello")
    const articles = await prisma.article.findMany({
      take: 5,
      where: {
        
        OR: [
          {
            titre: {
              contains: searchQuery // Recherche le texte dans le titre de l'article
            }
          },
          {
            contenu: {
              contains: searchQuery // Recherche le texte dans le contenu de l'article
            }
          }
        ]
      },
    });
  
    res.json({ articles });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Erreur non gérée" });
  }
})

// Ajouter un nouvel article
router.post('/', authenticateToken,async (req, res) => {
  try {
    const { titre, contenu, image, categoryId, published } = req.body;
    const userId = req.user.id; // Supposons que l'ID de l'utilisateur soit accessible via req.user.id
   
    const article = await prisma.Article.create({
      data: {
        titre,
        contenu,
        image,
        createdAt: new Date(),
        updatedAt: new Date(),
        published,
        auteur: { connect: { id: parseInt(userId) } } ,// Spécifie l'ID de l'utilisateur pour l'auteur de l'article
        categories: { connect: { id: parseInt(categoryId) } } 
      },
    });
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mettre à jour un article par son ID
router.patch('/',async (req, res) => {
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
    const { id : userId } = req.user; // Obtenez l'ID de l'utilisateur connecté depuis le token

    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      select: { auteurId: true },
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (article.auteurId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

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
