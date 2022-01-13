import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const CampgroundSchema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reviews'
        }
    ],
}, {
    timestamps: true
});

const Campground= mongoose.model('Campground', CampgroundSchema);

export default Campground