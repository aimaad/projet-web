const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middlewares/auth.js');
const prisma = new PrismaClient();

// Récupérer tous les commentaires avec pagination
router.get('/',authenticateToken, async (req, res) => {
  try {
    const { take, skip } = req.query;
    const commentaires = await prisma.commentaire.findMany({
      take: parseInt(take),
      skip: parseInt(skip),
    });
    res.json(commentaires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get articles commentaires
router.get('/article/:articleId',authenticateToken, async (req, res) => {
  try {
    const { articleId } = req.params;
    // const { take, skip } = req.query;
    const commentaires = await prisma.commentaire.findMany({
      where : {
        articleId : parseInt(articleId)
      }
    });
    res.json({commentaires});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Récupérer un commentaire par son ID
router.get('/:id', authenticateToken,async (req, res) => {
  try {
    const { id } = req.params;
    const commentaire = await prisma.commentaire.findUnique({
      where: { id: parseInt(id) },
    });
    if (commentaire) {
      res.json(commentaire);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ajouter un nouveau commentaire
router.post('/add/:articleId',authenticateToken, async (req, res) => {
  try {
    if(!req.user) {
        res.status(401).json({message : "You do not have the permission to perform this action"})
    }

    const {articleId} = req.params

    const { contenu } = req.body;
    const commentaire = await prisma.commentaire.create({
      data: {
        contenu,
        email : req.user.email,
        article : {
          connect: { id: parseInt(articleId) }
        }
      },
    });
    res.json(commentaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mettre à jour un commentaire par son ID
router.patch('/',authenticateToken, async (req, res) => {
  try {
    
    const { id,email, contenu } = req.body;
    const updatedCommentaire = await prisma.commentaire.update({
      where: { id: parseInt(id) },
      data: {
        id,
        email,
        contenu,
      },
    });
    res.json(updatedCommentaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Supprimer un commentaire par son ID
router.delete('/:id',authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.commentaire.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
