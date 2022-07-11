const User = require("../models/User");
const PublicPlaylist = require("../models/PublicPlaylist");

module.exports.createPlaylist = async (req, res)=>{
    const {email, playlistName, movies} = req.body;

    try {
        
        let {favouriteMovies} = await User.findOne({email})

        // favouriteMovies.push({playlistName, movies});
        const obj = new Object();
        obj.listName = playlistName;
        obj.movies = movies;
        favouriteMovies = [...favouriteMovies, obj];

        await User.findOneAndUpdate({email}, {favouriteMovies});

        return res.status(200).json({msg: "Playlist created successfully"});
        

    } catch (error) {
        
        return res.status(500).json({errors: error});

    }

}

module.exports.userPlaylist = async (req, res)=>{
    const email = req.params.email;

    try {
        let {favouriteMovies} = await User.findOne({email})
        return res.status(200).json({favouriteMovies});
    } catch (error) {
        return res.status(500).json({errors: error});
    }

}

module.exports.createPublicPlaylist = async (req, res)=>{
   
    try {

        const {playlistName, movies} = req.body;
        try {
            
            let {_id, publicList} = await PublicPlaylist.findOne()
    
            // favouriteMovies.push({playlistName, movies});
            const obj = new Object();
            obj.listName = playlistName;
            obj.movies = movies;
            publicList = [...publicList, obj];
    
            await PublicPlaylist.findOneAndUpdate({_id}, {publicList});
    
            return res.status(200).json({msg: "Playlist created successfully"});
            
    
        } catch (error) {
            
            return res.status(500).json({errors: error});
    
        }

    } catch (error) {
        return res.status(500).json({errors: error});
    }

}

module.exports.publicPlaylist = async (req, res)=>{
    try {
        let {publicList} = await PublicPlaylist.findOne()
        return res.status(200).json({publicList});
    } catch (error) {
        return res.status(500).json({errors: error});
    }

}