var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ImageSchema = new Schema({
    data: Buffer,
    contentType: String,
    _article : { type: Schema.Types.ObjectId, ref: 'Article' },
    created: {
        type: Date,
        default: Date.now
    }

});
mongoose.model('Image', ImageSchema);