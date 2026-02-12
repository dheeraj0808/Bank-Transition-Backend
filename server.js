const app = require('./src/app');
const db = require('./src/config/db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Test database connection
db.getConnection()
    .then(conn => {
        console.log('✓ Database connected successfully!');
        conn.release();
    })
    .catch(err => {
        console.error('✗ Database connection failed:', err.message);
    });

app.listen(PORT, () => {
    console.log(`✓ Server is running on http://localhost:${PORT}`);
});