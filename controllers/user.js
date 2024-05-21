
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
exports.getUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
  };

exports.updateUsername = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
  
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.username = username || user.username;
      await user.save();
  
      res.json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the user' });
    }
  };
  
  exports.changePassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
  
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const hashedNewPassword = await bcrypt.hash(password, 10);
      user.password = hashedNewPassword;
      await user.save();
  
      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while changing the password' });
    }
  };
  
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }};