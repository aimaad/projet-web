const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express.Router();

app.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.utilisateur.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '356h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});
module.exports = app;