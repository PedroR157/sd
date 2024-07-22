const express = require('express');
const config = require('./knexfile');
const knex = require('knex');
const db = knex(config.development);
module.exports = db;

const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const app = express();

// middleware autenticação
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


//verifica o nivel de permissão
const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.permission !== role) {
      return res.sendStatus(403);
    }
    next();
  };
};

// =============================================================================================================


// async function main() {
//   // Inserir um novo usuário
//   const newUser = await db('users').insert({ name: 'Alice', email: 'alice@example.com' }).returning('*');
//   console.log('Created new user:', newUser);

//   // Obter todos os usuários
//   const users = await db('users').select('*');
//   console.log('All users:', users);
// }

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await knex("users").where({ username }).first();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ permission: user.permission }, SECRET_KEY, { expiresIn: "1d", subject: user.id.toString() });
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: "Login successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

app.get("/users", authenticateToken, authorize("admin"), async (req, res) => {
  try {
    const users = await knex.select("*").from("users");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data");
  }
});

app.post('/adduser', async (req, res) => {
  try {
    const { username, password, permission = "view" } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const hash = crypto.createHash('sha256');
    hash.update(password);
    const resultadoHash = hash.digest('hex');
    await knex('users').insert({
      username,
      password: resultadoHash,
      permission
    });


    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting data: ' + JSON.stringify(error));
  }
});

app.put('/users/:id', authenticateToken, authorize("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, permission } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const hash = crypto.createHash('sha256');
    hash.update(password);
    const resultadoHash = hash.digest('hex');

    await knex('users')
      .where({ id })
      .update({
        username,
        password: resultadoHash,
        permission
      });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data: ' + JSON.stringify(error));
  }
});

app.delete('/users/:id', authenticateToken, authorize("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    await knex('users')
      .where({ id })
      .del();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting data: ' + JSON.stringify(error));
  }
});

const PORT = process.env.PORT || 18080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 