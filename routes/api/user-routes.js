const router = require('express').Router();
const {
    getAllUsers,
    getUserbyId,
    NewUser
} = require('../../controllers/user-controllers');

router
    .route('/')
    .get(getAllUsers)
    .post(NewUser);

router
    .route('/:id')
    .get(getUserbyId)

module.exports = router;