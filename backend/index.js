const express = require('express');
const cors = require('cors');
const Pool = require('pg-pool');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinaryLib = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const app = express();

app.use(cors());
app.use(express.json());

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
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
    };

};

cloudinaryLib.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinaryLib,
    params: {
        folder: "blog_images",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({ storage });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});

app.get('/', (req, res) => {
    res.send("Hello from backend!");
});


app.get('/post', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT posts.*, users.name AS name
             FROM posts
             JOIN users ON posts.author_id = users.id`
        );
        res.json(result.rows);
    } catch (error) {
        console.error("POST ERROR", error.message);
        res.status(500).json({
            error: "Failed to fetch posts"
        });
    }
});

app.get('/stats', async (req, res) => {
    try {
        const members = await pool.query("SELECT COUNT(*) FROM users");
        const posts = await pool.query("SELECT COUNT(*) FROM posts");
        const subscriptions = await pool.query("SELECT COUNT(*) FROM subscriptions");

        res.json({
            members: members.rows[0].count,
            posts: posts.rows[0].count,
            subscriptions: subscriptions.rows[0].count,
        });
    } catch (error) {
        console.error("STATS ERROR", error.message);
        res.status(500).json({
            error: "Failed to fetch stats"
        });
    };
});

app.get('/engagement', async (req, res) => {
    try {
        const result = await pool.query(`SELECT     DATE(created_at) as day,
        COUNT(*) as count
      FROM posts
      GROUP BY day
      ORDER BY day ASC`);
        res.json(result.rows);
    } catch (error) {
        console.error("ENGAGEMENT ERROR", error.message);
        res.status(500).json({
            error: "Failed to fetch engagement data"
        });
    }
})

app.post('/subscriptions', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "Email is required"
        });
    }

    try {
        const result = await pool.query(
            "INSERT INTO subscriptions (email) VALUES ($1) RETURNING *",
            [email]
        );

        res.json({
            message: "Subscribed successfully",
            subscriber: result.rows[0]
        });

    } catch (error) {
        console.error("SUBSCRIBE ERROR:", error.message);

        if (error.code === "23505") {
            return res.status(400).json({
                error: "Email already subscribed"
            });
        }

        res.status(500).json({
            error: "Subscription failed"
        });
    }
});


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Name, email and password are required"
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword]);
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
                name: user.name,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        res.json({ token, user });
        console.log("DB USER:", user);
        console.log("ROLE FROM DB:", user.role);
    } catch (error) {
        console.error("LOGIN ERROR", error.message);
        res.status(500).json({
            error: "Server error"
        });
    };
});


app.get('/profile', authToken, async (req, res) => {
    console.log("req.user:", req.user);
    try {
        const result = await pool.query("SELECT id, name, email, role FROM users WHERE id = $1", [req.user.id]);
        const user = result.rows[0];
        if (!user) return res.status(400).json({
            error: "user not found"
        });
        res.json(user);
    } catch (error) {
        console.error("PROFILE ERROR:", error.message);
        res.status(500).json({
            error: "failed to fetch profile"
        })
    }
})


app.put('/profile', authToken, async (req, res) => {
    const { name, email } = req.body;
    const imageUrl = req.file?.path;
    try {
        const result = await pool.query("UPDATE users SET name=$1, email=$2, image_url=$3 WHERE id=$4 RETURNING id, email, name, image_url", [name, email, imageUrl, req.user.id]);
        res.json({
            message: "Profile updated successfully",
            user: result.rows[0]
        })
    } catch (error) {
        console.error("PROFILE UPDATE ERROR:", error.message);
        res.status(500).json({
            error: "failed to update profile"
        });
    };
});


app.post('/admin', authToken, upload.single('image'), async (req, res) => {
    console.log("REQ USER FROM TOKEN:", req.user);
    console.log("FILE:", req.file);
    if (req.user.role !== 'admin') {
        console.log("Unauthorized access:", req.user);

        return res.status(403).json({
            error: "Access denied"
        });
    }

    const { title, content } = req.body;
     const imageUrl = req.file?.path || "";
    try {
        const result = await pool.query(
            "INSERT INTO posts (title, content, author_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, content, req.user.id, imageUrl]
        );

        res.status(200).json({
            message: "Post created successfully",
            admin: result.rows[0]
        });

    } catch (error) {
        console.error("ADMIN POST ERROR:", error.message);
        res.status(500).json({
            error: "Failed to create post"
        });
    };
});


app.delete('/admin/:id', authToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            error: "Access denied"
        });
    };
    try {
        await pool.query("DELETE FROM posts WHERE id = $1", [req.params.id]);
        res.json({
            message: "Post deleted successfully"
        })
    } catch (error) {
        console.error("ADMIN DELETE ERROR:", error.message);
        res.status(500).json({
            error: "Failed to delete post"
        });
    }
});

const PORT = process.env.PORT || 3999;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});