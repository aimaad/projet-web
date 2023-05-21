const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// isAdmin fonction 

const isAdmin = (req, res, next) => {
  const user = req.user; // Supposons que les informations de l'utilisateur sont stockées dans req.user après l'authentification

  if (user.role === 'ADMIN') {
    next(); // L'utilisateur est administrateur, continuez vers la prochaine fonction middleware
  } else {
    res.status(403).json({ error: 'you\'re not an administrator' }); // L'utilisateur n'est pas administrateur, envoie une réponse avec un statut 403 (Forbidden)
  }
};



module.exports = { authenticateToken,isAdmin  };
