const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
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

  // get a single thought by id

  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'Oh snap! No thought with that id bro!' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create new thought and push new thought's _id to users thoughts array

  createThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        ).then(dbData => {
          if (!dbData) {
            res.status(404).json({ message: 'Oh snap! No user with that id bro!' });
            return;
          }
          res.json(dbData);
        });
      })
      .catch(err => res.json(err));
  },

  // update thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'Oh snap! No user with that id bro!' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.status(400).json(err));
  },

  // remove thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'Oh snap! No user with that id bro!' });
        }
        return User.findOneAndUpdate(
          { username: params.username },
          { $pull: { thoughts: req.params.id } },
          { new: true }
        ).then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'Oh snap! No user with that id bro!' });
            return;
          }
          res.json(dbUserData);
        });
      })
      .catch(err => res.status(400).json(err));
  },

  // add new reaction to thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then(dbData => {
        console.log('dbData -> ', dbData);
        if (!dbData) {
          res.status(404).json({
            message: "Don't even trip dawg. But there's like, no thought with that id bro",
          });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
  },

  // remove reaction from thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true }
    )
      .then(dbData => res.json(dbData))
      .catch(err => res.json(err));
  },
};

module.exports = thoughtController;
