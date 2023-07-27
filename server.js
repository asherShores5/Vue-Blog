// ~/server.js

require('dotenv').config(); // Load environment variables from .env file

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const jwt = require('jsonwebtoken');

// Secret key used to sign the JWT token
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecretpassword';

// Set default middlewares (logger, static, cors)
server.use(middlewares);

// Use JSON body-parser
server.use(jsonServer.bodyParser);

// Helper function to generate JWT token
function generateToken(user) {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

// User login endpoint
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.get('users').find({ email, password }).value();

  if (user) {
    const token = generateToken(user);
    return res.json({ token });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});

// User signup endpoint
server.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const user = db.get('users').find({ email }).value();

  if (user) {
    return res.status(409).json({ error: 'Email is already taken' });
  }

  const newUser = { id: Date.now(), name, email, password };
  db.get('users').push(newUser).write();

  const token = generateToken(newUser);
  return res.json({ token });
});

// Protected route example - you should replace this with your actual protected routes
server.get('/protected', (req, res) => {
  // Get the token from the request header or query string
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = db.get('users').find({ id: payload.id }).value();

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Return the protected data
    return res.json({ message: 'Protected data', user });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// Logout route
server.post('/logout', (req, res) => {
  // In a real-world scenario, you might want to invalidate the token on the server-side
  // and perform any necessary cleanup or session management tasks.

  // For simplicity in this example, we will just return a success message without any other logic.
  return res.json({ message: 'Logout successful' });
});

// ... (other routes)

// Use the default router (including the route for posting to "posts")
server.use(router);

// Start the server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
