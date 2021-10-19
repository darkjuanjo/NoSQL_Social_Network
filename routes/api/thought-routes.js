const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtbyId,
    createThought,
    EditThought,
    DeleteThought,
    createReaction,
    deleteReaction
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

router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction)


module.exports = router;