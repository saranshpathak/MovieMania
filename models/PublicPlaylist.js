const {model, Schema} = require("mongoose");

const publicListSchema = new Schema({
    publicList: [
        {
            listName: String,
            movies: [
            ]
        },
    ]
}, {timestamps: true});

module.exports = model("publicPlaylist", publicListSchema);