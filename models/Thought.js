const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: "Please type in a body!",
        maxlength: 280
    },
    username: {
        type: String,
        required: 'Please enter a username!'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (createdDate) => dateFormat(createdDate)
    }
});

const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
        // validate: [({ length }) => length >= 6, 'Password should be longer.']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (createdDate) => dateFormat(createdDate)
    },
    username: {
        type: String,
        required: true
    },
    reactions: []
},
{
    toJSON: {
        getters: true
    }
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
  });

  const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;