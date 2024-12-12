const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: 'gpa_calc'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
});

// Add course
app.post('/courses', (req, res) => {
    const { courseName, creditHours, grade } = req.body;
    const query = 'INSERT INTO courses (course_name, credit_hours, grade) VALUES (?, ?, ?)';
    db.query(query, [courseName, creditHours, grade], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: result.insertId });
    });
});

// Get all courses
app.get('/courses', (req, res) => {
    const query = 'SELECT * FROM courses';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

// Delete course
app.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM courses WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Course deleted successfully' });
    });
});

// Start db server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

