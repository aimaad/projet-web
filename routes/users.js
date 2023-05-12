const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Récupérer tous les utilisateurs avec pagination
router.get('/', async (req, res) => {
  try {
    const { take, skip } = req.query;
    const users = await prisma.user.findMany({
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
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
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
router.post('/', async (req, res) => {
  try {
    const { nom, email, password, role } = req.body;
    const user = await prisma.user.create({
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
router.patch('/', async (req, res) => {
  try {
    const { id, nom, email, password, role } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
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
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
