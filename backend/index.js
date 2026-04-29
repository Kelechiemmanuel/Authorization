const express = require('express');
const cors = require('cors');
const Pool = require('pg-pool');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json({
            error: "No token provided"
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("TOKEN ERROR", error.message);
        res.status(400).json({
            error: "Invalid token"
        });
    }

};

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});

app.get('/', (req, res) => {
    res.send("Hello from backend!");
});

app.get('/messages', authToken, async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT * FROM messages");
        res.json(result.rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "error fetching messages"
        });

    } finally {
        client.release();
    };
});

app.post('/messages', authToken, async (req, res) => {
    const { sender_name, content, email } = req.body;
    try {
        console.log(req.body);

        const result = await pool.query("INSERT INTO messages (sender_name, content, email) VALUES ($1, $2, $3) RETURNING *", [sender_name, content, email]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Fail to send message"
        });
    };
    
});

app.post('/register', async (req, res) => {
    const { sender_name, email, password } = req.body;
    if (!sender_name || !email || !password) {
        return res.status(400).json({
            error: "Name, email and password are required"
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query("INSERT INTO users (sender_name, email, password) VALUES ($1, $2, $3) RETURNING *", [sender_name, email, hashedPassword]);
        res.status(200).json({
            message: "user created successfully",
        })
    } catch (error) {
        console.error("REGISTER ERROR", error.message);
        res.status(400).json({
            error: "User already exists"
        });
    };
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users  WHERE email = $1", [email]);
        const user = result.rows[0];
        if (!user) return res.status(400).json({
            error: "user not found"
        });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({
            error: "Invalid credentials"
        });

        const token = jwt.sign(
            {
                id: user.id,
                sender_name: user.sender_name,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        res.json({ token });
    } catch (error) {
        console.error("LOGIN ERROR", error.message);
        res.status(500).json({
            error: "Server error"
        });
    };
});

const PORT = process.env.PORT || 3999;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});