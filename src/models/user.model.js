const db = require('../config/db');
const bcrypt = require('bcryptjs');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userModel = {
    // Find user by email
    findOne: async (query) => {
        const { email } = query;
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    // Create new user with password hashing
    create: async (userData) => {
        const { name, email, password, role = 'user' } = userData;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into database
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email.toLowerCase().trim(), hashedPassword, role]
        );

        return {
            _id: result.insertId,
            id: result.insertId,
            name,
            email: email.toLowerCase().trim(),
            role,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    },

    // Compare password for login
    comparePassword: async (plainPassword, hashedPassword) => {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
};

module.exports = userModel;