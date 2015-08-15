var mongoose = require('mongoose'),
    validators = require('mongoose-validators'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;


var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    condition: {
        type: String,
        default: '',
        trim: true,
        required: 'Condition cannot be blank'
    },
    description: {
        type: String,
        default: '',
        trim: true,
        required: 'Description cannot be blank'
    },
    location: {
        type: String,
        default: '',
        trim: true,
        required: 'Location cannot be blank'
    },
    pickupDate: {
        type: Date,
        required: 'Pickup Date cannot be blank'
    },
    pickupTimeFrom: {
        type: String,
        default: '',
        trim: true,
    },
    pickupTimeTo: {
        type: String,
        default: '',
        trim: true,
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    email: {
        type:String,
        validate: validators.isEmail({message: 'Please fill a valid email.'})
    },
    contactNumber: {
        type: String,
        validate: validators.isNumeric({message: 'Please fill a valid contact number.'})
    },
    tags: [],
    images : [{ type: Schema.Types.ObjectId, ref: 'Image' }]
});
ArticleSchema.plugin(mongoosePaginate);
ArticleSchema.index({ title: 'text', description: 'text', tags: 'text'});
mongoose.model('Article', ArticleSchema);
