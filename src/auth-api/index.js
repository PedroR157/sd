const express = require("express");
const cors = require("cors");
const knexConfig = require("./knexfile").db;
const knex = require("knex")(knexConfig);
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const cookieParser = require("cookie-parser");
const app = express();
const SECRET_KEY = "sd";

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Auth API is kinda working");
});

// Função para gerar salt
const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Função para gerar hash com salt
const hashPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
};

// Middleware para autenticação
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware para autorização (exemplo: somente admin)
const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.permission !== role) {
      return res.sendStatus(403);
    }
    next();
  };
};

// Rota de login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Buscar o usuário na base de dados
    const user = await knex("users").where({ username }).first();

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verificar a senha
    const hashedPassword = hashPassword(password, user.salt);

    if (user.password !== hashedPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Criar o token JWT
    const token = jwt.sign({ permission: user.permission }, SECRET_KEY, { expiresIn: "1h", subject: user.id.toString() });

    // Enviar o token e dados do usuário como cookies
    res.cookie('token', token, { httpOnly: true });
    res.cookie('userlogin', user.id, { httpOnly: true });
    res.cookie('username', user.username, { httpOnly: true });

    // Responder com sucesso
    res.json({ message: "Login successfully", userId: user.id, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});


app.get("/teachers", authenticateToken, async (req, res) => {
  try {
    const teachers = await knex.select("*").from("teachers");
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data");
  }
});

app.get("/users",authenticateToken, authorize("admin"), async (req, res) => {
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
      return res.status(400).json({ message: "Username, password and permission are required" });
    }

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    await knex('users').insert({
      username,
      password: hashedPassword,
      salt,
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

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    await knex('users')
      .where({ id })
      .update({
        username,
        password: hashedPassword,
        salt,
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
