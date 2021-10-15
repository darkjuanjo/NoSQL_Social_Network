const { User, Thought } = require('../models');


const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select :'-__v'
        })
        .select('-__v')
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getThoughtbyId({params},res) {
        Thought.findOne({_id:params.id})
        .populate({
            path: 'reactions',
            select :'-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            if(!thoughtData)
            {
                res.status(404).json({message:"No thought found with this Id!"});
                return
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createThought({params, body}, res) {
        User.findOne({_id: params.id})
        .then(userData => {
            if(!userData)
            {
                res.status(404).json({message: "No user found with this Id!"});
                return
            }
            Thought.create({
               username: userData.username,
               thoughtText: body.thoughtText 
            })
            .then(thought => {
                User.findOneAndUpdate(
                    {_id: params.id},
                    {$push: {thoughts: thought._id}}
            )
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
            res.json(thought);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
    // createThought({params,body}, res) {
    //     Thought.create(body)
    //     .then(newThought => {
    //         User.findOneAndUpdate(
    //             {_id: params.id},
    //             {$push: {thoughts: newThought._id}}
    //             )
    //             .then(userData => {
    //                 if(!userData)
    //                 {
    //                     res.status(404).json({message: "No user found with this Id!"});
    //                     Thought.findOneAndDelete({_id: newThought._id})
    //                     .then(invalidThought => res.json({message: "Thought Deleted!"}));
    //                 }
    //                 res.json(userData);
    //             })
    //             .catch(err => res.status(400).json(err));
    //     })
    //     .catch(err => res.status(400).json(err));
    // }
}

module.exports = thoughtController;