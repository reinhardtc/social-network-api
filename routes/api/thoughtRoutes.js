const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// setup GET and POST at api/thoughts
router.route('/').get(getAllThoughts).post(createThought).delete(deleteThought);

// setup GET one, PUT, and DELETE by id

router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// add and remove a reaction to a thought by thought id

router.route('/:id/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;
