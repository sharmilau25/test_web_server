const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve a simple HTML form
app.get('/', (req, res) => {
    res.send(`
        <form action="/submit" method="post">
            <label>Name:</label>
            <input type="text" name="name" required />
            <label>Email:</label>
            <input type="email" name="email" required />
            <button type="submit">Submit</button>
        </form>
    `);
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    res.send(`Received: Name - ${name}, Email - ${email}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
