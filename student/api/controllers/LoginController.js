/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// api/controllers/LoginController.js

const bcrypt = require('bcrypt');

module.exports = {
  signup: async function (req, res) {
    const { email, password } = req.body;

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const login = await Login.create({ email, password: hashedPassword });
      res.json({ message: 'Signup successful', login });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Error during signup' });
    }
  },

  login: async function (req, res) {
    const { email, password } = req.body;

    try {
      const login = await Login.findOne({ email });

      if (login) {
        const isPasswordMatched = await bcrypt.compare(password, login.password);

        if (isPasswordMatched) {
          res.json('Success');
        } else {
          res.json('Password incorrect');
        }
      } else {
        res.json('Email is not registered');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  adminLogin: async function (req, res) {
    const { email, password } = req.body;

    try {
      const admin = await Login.findOne({ email });

      if (admin) {
        const isPasswordMatched = await bcrypt.compare(password, admin.password);

        if (isPasswordMatched && admin.isAdmin) {
          res.json("Success");
        } else {
          res.json("Password incorrect or not an admin");
        }
      } else {
        res.json("Email is not registered");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};


