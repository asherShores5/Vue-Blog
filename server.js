// ~/server.js

require('dotenv').config(); // Load environment variables from .env file

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();


// Set default middlewares (logger, static, cors)
server.use(middlewares);

// Use JSON body-parser
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  next();
});



const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

// User signup endpoint
server.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const user = db.get('users').find({ email }).value();

  if (user) {
    return res.status(409).json({ error: 'Email is already taken' });
  }

  const newUser = { id: Date.now(), name, email, password };
  db.get('users').push(newUser).write();

});

// Logout route
server.post('/logout', (req, res) => {
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
