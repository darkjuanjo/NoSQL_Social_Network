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
                    {$addToSet: {thoughts: thought._id}}
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
        Thought.findOneAndUpdate({_id: params.id}, {thoughtText:body.thoughtText}, {new: true, runValidators: true})
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
        let flag = 0;
        //get all users
        User.find({})
        .then(userData => {
            //find the user with the thought id
            for(let i = 0; i < userData.length; i++) {
                for(let ii = 0; ii < userData[i].thoughts.length; ii++)
                {
                    if(JSON.stringify(userData[i].thoughts[ii]).split('"')[1] === params.id)
                    {
                        //remove thoughtid from thought array
                       User.findOneAndUpdate(
                           {_id: userData[i]._id},
                           {$pull :{ thoughts: params.id }},
                           {new: true})
                           .then(userData => {
                               if(!userData) {
                                   res.status(404).json({message:'No user with that thought exits!'});
                                   return
                               }
                               //delete thought from collection
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
                    if(i === userData.length-1 && flag === 0)
                    res.status(404).json({message: 'No thought with that Id found!'});
                }
            }            
        })
    },
    createReaction({params, body}, res ){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$addToSet: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(reactionData => {
            if(!reactionData)
            {
                res.status(404).json({message: "No thought with this Id found!"})
                return
            }
            res.json(reactionData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteReaction({params}, res) {
        Thought.find()
        .then(thoughtsData => {
            if(!thoughtsData)
            {
                res.json("No reaction to delete was found");
                return
            }
            console.log(thoughtsData);
            for(let i = 0; i < thoughtsData.length; i++){
                for(let ii = 0; ii < thoughtsData[i].reactions.length; ii++) {
                    if(JSON.stringify(thoughtsData[i].reactions[ii].reactionId).split('"')[1] === params.thoughtId)
                    {
                        console.log('found!!');
                        Thought.findOneAndUpdate(
                            {_id: thoughtsData[i]._id},
                            {$pull: {reactions: {reactionId: params.thoughtId}}},
                            {new: true}
                        )
                        .then(thoughtData => {
                            if(!thoughtData)
                            {
                                return res.status(404).json({message: 'No reaction found with this Id!'})
                            }
                            res.json({Message:'reaction deleted!',data: thoughtData});
                        })
                        .catch(err => res.json(err));
                    }
                }
            }

        })
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;