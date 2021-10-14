const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema ({
    username:{
        type: String,
        unique: true,
        required: "Please enter a username!",
        trim: true
    },
    email: {
        type: String,
        required: "Please enter an email!",
        unique: true,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please provide a valid email address!']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
            }
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: "User"
        }
    ]
}, 
{
    toJSON: {
        virtuals: true
    }
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);
module.exports = User;