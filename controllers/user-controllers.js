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
    }
}

module.exports = userControllers;
