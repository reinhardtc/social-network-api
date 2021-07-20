const router = require('express').Router();

const {
  getAllThought,
  deleteAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReactionToThought,
  deleteReactionFromThought,
} = require('../../controllers/thought-controller');

// setup GET and POST at api/thoughts
// api/thoughts
router.route('/').get(getAllThought).post(createThought).delete(deleteAllThoughts);

// setup GET one, PUT, and DELETE
// api/thoughts/:id

router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// add and remove a reaction to a thought
// api/thoughts/:id/reactions
router.route('/:id/reactions').post(addReactionToThought).delete(deleteReactionFromThought);

module.exports = router;
