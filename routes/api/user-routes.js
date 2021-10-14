const router = require('express').Router();
const {
    getAllUsers,
    getUserbyId,
    NewUser,
    EditUser,
    DeleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controllers');

router
    .route('/')
    .get(getAllUsers)
    .post(NewUser);

router
    .route('/:id')
    .get(getUserbyId)
    .put(EditUser)
    .delete(DeleteUser)

router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;