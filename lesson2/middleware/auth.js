function authMiddleware(req, res, next) {
  const authKey = req.headers['auth-key'];

  if (authKey !== '123') {
    return res.status(401).json({ message: 'Unauthorized: missing or invalid auth-key header' });
  }

  next();
}

module.exports = authMiddleware;
