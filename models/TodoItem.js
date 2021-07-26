const mongoose = require ('mongoose');

const TodoItemSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    done:{
        type: Boolean,
        required: true,
        trim: true
    },
    folder:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Folder'
    }
  
});

module.exports = mongoose.model('TodoItem', TodoItemSchema);