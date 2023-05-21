const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/', async (req, res) => {
  const { nom, email, password, role } = req.body;

  try {
    const existingUser = await prisma.utilisateur.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.utilisateur.create({
      data: {
        nom,
        email,
        password: hashedPassword,
        role,
      },
    });

    const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET, { expiresIn: '356h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
