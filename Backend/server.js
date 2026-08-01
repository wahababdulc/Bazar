const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/freshmart', {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000
}).catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('ℹ️  Make sure MongoDB is running: mongod');
});

const Admin = mongoose.model('Admin', { email: String, password: String });

// Setup Demo Admin
async function setupDatabase() {
    const adminExists = await Admin.findOne({ email: 'admin2412@gmail.com' });
    if (!adminExists) {
        await Admin.create({ email: 'admin2412@gmail.com', password: 'alpha2412' });
    }
}
setupDatabase();

// Authentication API with JWT
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email, password });
    
    if (user) {
        const token = jwt.sign({ id: user._id, role: 'admin' }, 'my_secret_key', { expiresIn: '1h' });
        res.json({ success: true, token: token, message: "Login Successful!" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

app.listen(5000, () => console.log('DBMS Server running on port 5000'));