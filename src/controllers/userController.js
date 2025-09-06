const User = require('../models/UserModel');

exports.getAllUsers = async (req, res) => {
  try {
    const { search, country } = req.query;
    const users = await User.getAllUsers(search, country);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'Admin' && req.user.id != id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
};
