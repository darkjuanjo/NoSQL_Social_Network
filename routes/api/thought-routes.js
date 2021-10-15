const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtbyId,
    createThought,
    EditThought,
    DeleteThought
} = require('../../controllers/thought-controllers');

router
    .route('/')
    .get(getAllThoughts)

router
    .route('/:id')
    .get(getThoughtbyId)
    .post(createThought)
    .put(EditThought)
    .delete(DeleteThought)

module.exports = router;