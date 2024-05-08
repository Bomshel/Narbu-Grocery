const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    }
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'narbugrocery' 
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename:  (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname) );
  }
});

const upload = multer({
   storage: storage });

// Retrieve all products
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching products' });
      return;
    }
    res.status(200).json(result);
  });
});



// Route to fetch products based on category
app.get('/category', (req, res) => {
  const category = req.query.category;
  let query = 'SELECT * FROM products';
  const queryParams = [];
  
  if (category) {
    query += ' WHERE category = ?';
    queryParams.push(category);
  }
  
  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// POST route for user registration
app.post('/users', (req, res) => {
  const { full_name, email, password, role } = req.body;

  // If role is not provided, set it to "User"
  const userRole = role || 'User';

  const sql = 'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [full_name, email, password, userRole], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error registering user' });
      return;
    }
    res.status(200).json({ message: 'User registered successfully', data: result });
  });
});


// POST route for user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error('Error logging in:', err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length > 0) {
        req.session.full_name = result[0].full_name; 
        req.session.email = result[0].email; // Set the email in the session
        
        const user = result[0];
        // Include user's role in the response
        res.status(200).json({ message: "Success", role: user.Role });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get cookie
app.get('/session', (req, res) =>{
    if(req.session.full_name){
      return res.json({valid: true, full_name: req.session.full_name})
    }
    else{
      return res.json({valid: false})
    }
});

// Retrieve user profile data
app.get('/profile', (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.full_name) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Retrieve user data including full name, email, and role from the database
    const email = req.session.email;
    const sql = 'SELECT full_name, email, role FROM users WHERE email = ?';
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error('Error fetching user profile:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      const { full_name, email, role } = result[0];
      // Send user profile data as JSON response
      res.status(200).json({ full_name, email, role });
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Retrieve all users
app.get('/users', (req, res) => {
  const sql = 'SELECT id, full_name, email, role FROM users';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching users' });
      return;
    }
    res.status(200).json(result);
  });
});

// Upload product data
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ Status: "Error", message: "No file uploaded" });
    }
    
    const { product_id, product_name, category, description, price } = req.body;
    const image = req.file.filename;

    const sql ='INSERT INTO products (product_id, product_name, category, description, price, image) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [product_id, product_name, category, description, price, image], (err, result) => {
      if(err) {
        console.error('Error uploading product data:', err);
        return res.status(500).json({ Status: "Error", message: "Failed to upload product data" });
      }
      console.log('Product data uploaded successfully');
      return res.status(200).json({ Status: "Success", message: "Product data uploaded successfully" });
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return res.status(500).json({ Status: "Error", message: "Internal Server Error" });
  }
});

// post query
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const sql = 'INSERT INTO query (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error' });
      return;
    }
    res.status(200).json({ message: 'Succesfull', data: result });
  });
});

//get query 
app.get('/messages', (req, res) => {
  const sql = 'SELECT * FROM query';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching query' });
      return;
    }
    res.status(200).json(result);
  });
});


// POST route for changing password
app.post('/password', (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.email) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { oldPassword, newPassword } = req.body;
    const email = req.session.email;

    // Fetch user from the database based on email
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, oldPassword], (err, results) => {
      if (err) {
        console.error('Error fetching user from database:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Check if user exists and old password matches
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid old password' });
      }

      // Update user's password
      const updateSql = 'UPDATE users SET password = ? WHERE email = ?';
      db.query(updateSql, [newPassword, email], (updateErr) => {
        if (updateErr) {
          console.error('Error updating password:', updateErr);
          return res.status(500).json({ message: 'Failed to update password' });
        }
        res.status(200).json({ message: 'Password updated successfully' });
      });
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Handle logout requests
app.get('/logout', (req, res) => {
  req.session.destroy(); // Destroy the session
  res.status(200).json({ message: 'Logout successful' });
});


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
