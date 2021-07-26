const FolderSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    
  
});

module.exports = mongoose.model('Folder', FolderSchema);