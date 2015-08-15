var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ImageSchema = new Schema({
    data: Buffer,
    contentType: String,
    _article : { type: Schema.Types.ObjectId, ref: 'Article' },

});
mongoose.model('Image', ImageSchema);