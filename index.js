const express = require('express');
const mongoose=require('mongoose');
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //for API json response

// Connect to MongoDB Atlas
const mongoURI = 'mongodb+srv://sharmilau25:q3LkvIVvAPrea59e@cluster0.tiy2g.mongodb.net/users';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define Schema & Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model('User', UserSchema);

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

// Handle form submission w/o db
// app.post('/submit', (req, res) => {
//     const { name, email } = req.body;
//     res.send(`Received: Name - ${name}, Email - ${email}`);
// });


//Handle submission with db
app.post('/submit', async (req, res) => {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    
    try {
        await newUser.save();
        res.send(`Saved to database: Name - ${name}, Email - ${email}`);
    } catch (err) {
        res.status(500).send('Error saving to database');
    }
});
// API Route to Get All Users
app.get('/prasad_test', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// API Route to Update User (PUT Request)
app.put('/prasad_test/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    
    try {
        await User.findByIdAndUpdate(id, { name, email });
        res.json({ message: 'User updated' });
    } catch (err) {
        res.status(500).send('Error updating user');
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
