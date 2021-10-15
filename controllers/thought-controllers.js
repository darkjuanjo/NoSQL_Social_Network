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
    },
    EditThought ({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, {thoughtText:body.thoughtText}, {new: true})
        .then(thoughtData => {
            if(!thoughtData)
            {
                res.status(404).json({message: "No thought with this Id found!"})
                return
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    DeleteThought ({params}, res) {
        User.find({})
        .then(userData => {
            for(let i = 0; i < userData.length; i++) {
                for(let ii = 0; ii < userData[i].thoughts.length; ii++)
                {
                    if(JSON.stringify(userData[i].thoughts[ii]).split('"')[1] === params.id)
                    {
                       User.findOneAndUpdate(
                           {_id: userData[i]._id},
                           {$pull :{ thoughts: params.id }},
                           {new: true})
                           .then(userData => {
                               if(!userData) {
                                   res.status(404).json({message:'No user with that thought exits!'});
                                   return
                               }
                               Thought.findOneAndDelete({_id: params.id})
                               .then(deleted => {
                                   if(!deleted)
                                   {
                                       res.status(404).json({message: 'No thought with that id found!'});
                                       return
                                   }
                                   res.json(deleted);
                               })
                           })
                           .catch(err => {
                            console.log(err);
                            res.status(400).json(err);
                        });          
                    }
                }
            }            
        })
    }
}

module.exports = thoughtController;