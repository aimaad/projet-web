const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, isAdmin } = require('../middlewares/auth.js');
const prisma = new PrismaClient();

// Récupérer tous les utilisateurs avec pagination
router.get('/',authenticateToken,isAdmin ,async (req, res) => {
  try {
    const { take, skip } = req.query;
    const users = await prisma.utilisateur.findMany({
      take: parseInt(take),
      skip: parseInt(skip),
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Récupérer un utilisateur par son ID
router.get('/:id',authenticateToken,isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.utilisateur.findUnique({
      where: { id: parseInt(id) },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ajouter un nouvel utilisateur
router.post('/',authenticateToken,isAdmin, async (req, res) => {
  try {
    const { nom, email, password, role } = req.body;
    const user = await prisma.utilisateur.create({
      data: {
        nom,
        email,
        password,
        role,
      },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mettre à jour un utilisateur par son ID
router.patch('/',authenticateToken, isAdmin,async (req, res) => {
  try {
    const { id, nom, email, password, role } = req.body;
    const updatedUser = await prisma.utilisateur.update({
      where: { id: parseInt(id) },
      data: {
        id,
        nom,
        email,
        password,
        role,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Supprimer un utilisateur par son ID
router.delete('/:id',isAdmin, authenticateToken,async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.utilisateur.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
