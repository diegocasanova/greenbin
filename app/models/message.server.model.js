var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var MessageSchema = new Schema({
    content: String,
    _article : { type: Schema.Types.ObjectId, ref: 'Article' },
    _from : { type: Schema.Types.ObjectId, ref: 'User' },
    _to : { type: Schema.Types.ObjectId, ref: 'User' },
    checked : {
    	type: Boolean,
    	default: false
    },
    created: {
        type: Date,
        default: Date.now
    }

});
mongoose.model('Message', MessageSchema);