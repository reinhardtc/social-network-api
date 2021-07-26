const { User } = require('../models');

const userController = {
  // get all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteAllUsers(req, res) {
    User.deleteMany({})
      .then(deletedUsers => {
        res.json(deletedUsers);
      })
      .catch(err => res.status(400).json(err));
  },

  // get a single user by id. Including all users and friends
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'Try Again! Nobody with that id!' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // post a new user
  createUser(req, res) {
    User.create(req.body)
      .then(dbData => res.json(dbData))
      .catch(err => res.status(400).json(err));
  },

  //update user by id
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'Nope! No user with that id!' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.status(400).json(err));
  },

  //  add new friend to friend list
  addFriendToUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { friends: { _id: req.params.friendId } } },
      { new: true, runValidators: true }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: "Aw jeez man, there's like, no user with that Id" });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then(deletedUser => {
        if (!deletedUser) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete to remove a friend from a user's friend list
  removeFriendFromUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(dbData => res.json(dbData))
      .catch(err => res.json(err));
  },
};

module.exports = userController;
