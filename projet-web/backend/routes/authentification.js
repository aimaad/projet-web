const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express.Router();

app.post('/login', async (req, res) => {
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

    const expirationDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    res.cookie('token', token, {
        expires: expirationDate,
        httpOnly: true, // Cookie accessible only through HTTP(S)
        secure : true,
        sameSite : "None"
    });

    res.json({message : "User has logged in successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

app.get('/get-logged-user', async (req, res) => {
  try {
    if(req.user) {
      res.json({user : {
        isAuthenticated : true,
        nom : req.user.nom,
        email : req.user.email,
        role : req.user.role
      }})
    }
    else {
      res.json({user : {
        isAuthenticated : false
      }})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

app.post('/logout', async (req, res) => {
  try {
    res.clearCookie('token');
    res.json({message : "Logout successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = app;
