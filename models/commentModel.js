import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    text: {type: String, required: true},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, {
    timestamps: true
});

const Comment= mongoose.model('Comment', commentSchema);

export default Comment