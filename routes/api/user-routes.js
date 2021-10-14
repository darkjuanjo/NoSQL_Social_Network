const router = require('express').Router();
const {
    getAllUsers,
    getUserbyId,
    NewUser,
    EditUser,
    DeleteUser
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

module.exports = router;