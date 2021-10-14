const { User } = require('../models');

const userControllers = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts'
        })
        .then(usersData => res.json(usersData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getUserbyId({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts'
        })
        .then(userData => {
            if(!userData)
            {
                res.status(404).json({message: "No user with this Id found!"});
                return
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    NewUser({body}, res) {
        User.create(body)
        .then(newUserData => res.json(newUserData))
        .catch(err => res.status(400).json(err));
    },
    EditUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(userData => {
            if(!userData)
            {
                res.status(404).json({message: "No user with this Id found!"})
                return
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    DeleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(userData => {
            if(!userData)
            {
                res.status(404).json({message: "No user with this Id found!"})
                return
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$push: {friends: params.friendId}},
            {new: true}
            )
        .then(userData => {
            if(!userData)
            {
                res.status(404).json({message: "No user with this Id found!"});
                return
            }
            res.json({message:"Friend Added!"})
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$pull: { friends: params.friendId }},
            {new: true}
        )
        .then(userData => {
            if(!userData)
            {
                res.status(404).json({message: "No user with this Id found!"});
                return
            }
            res.json({message:"Friend Removed!"})
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}

module.exports = userControllers;
