const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;

// Get all users
exports.get = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};

// Get user by ID
exports.getById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: `User with id=${id} not found.` });
      }
      res.send(data);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};

// Create a new user
exports.post = async (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Username, email and password are required!" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a User object
    const user = {
      username: req.body.username,
      email: req.body.email,
      password_hash: hashedPassword,
      role: req.body.role || "user"
    };

    // Save User in the database
    const data = await User.create(user);
    res.send(data);

  } catch (err) {
    res.status(500).send({ message: err.message || "Error creating user." });
  }
};

// Update user
exports.put = async (req, res) => {
  const id = req.params.id;

  if (!req.body.username && !req.body.email && !req.body.role && !req.body.password) {
    return res.status(400).send({ message: "Request body is empty or invalid!" });
  }

  try {
    const updateData = { ...req.body };

    // Hash password if provided
    if (req.body.password) {
      updateData.password_hash = await bcrypt.hash(req.body.password, 10);
      delete updateData.password;
    }

    const num = await User.update(updateData, { where: { id } });

    if (num[0] === 1) {
      res.send({ message: "User was updated successfully." });
    } else {
      res.send({ message: `Cannot update user with id=${id}. User not found or no changes provided.` });
    }
  } catch (err) {
    res.status(500).send({ message: `Error updating user with id=${id}: ${err.message}` });
  }
};

// Delete user
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id } })
    .then(num => {
      if (num === 1) {
        res.send({ message: "User was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete user with id=${id}. User not found.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: `Could not delete user with id=${id}: ${err.message}` });
    });
};
