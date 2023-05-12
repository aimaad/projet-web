const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Récupérer tous les commentaires avec pagination
router.get('/', async (req, res) => {
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

// Récupérer un commentaire par son ID
router.get('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
  try {
    const { email, contenu } = req.body;
    const commentaire = await prisma.commentaire.create({
      data: {
        email,
        contenu,
      },
    });
    res.json(commentaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mettre à jour un commentaire par son ID
router.patch('/', async (req, res) => {
  try {
    const { id, email, contenu } = req.body;
    const updatedCommentaire = await prisma.commentaire.update({
      where: { id: parseInt(id) },
      data: {
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
router.delete('/:id', async (req, res) => {
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
