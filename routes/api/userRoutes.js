const router = require('express').Router();

const {
  getAllUser,
  deleteAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  removeFriendFromUser,
} = require('../../controllers/user-controller');

// setup GET and POST at api/users
// api/users

router.route('/').get(getAllUser).post(createUser).delete(deleteAllUsers);

// setup GET one, PUT, and DELETE
// api/users/:id

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// add and remove a friend
// api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId').put(addFriendToUser).delete(removeFriendFromUser);

module.exports = router;
