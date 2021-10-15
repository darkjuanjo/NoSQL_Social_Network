const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtbyId,
    createThought
} = require('../../controllers/thought-controllers');

router
    .route('/')
    .get(getAllThoughts)

router
    .route('/:id')
    .get(getThoughtbyId)
    .post(createThought)

module.exports = router;