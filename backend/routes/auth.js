const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Get token from request header
        const token = req.headers.authorization?.split(' ')[1];

        // If no token found
        if (!token) {
            return res.status(401).json({ message: 'No token, access denied' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user info to request
        req.user = decoded;

        // Move to the next step
        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;