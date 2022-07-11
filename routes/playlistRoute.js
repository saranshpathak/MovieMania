const app = require('express');
const router = app.Router();

const {createPlaylist, userPlaylist, publicPlaylist, createPublicPlaylist} = require("../controllers/playlistController");

router.post('/create', createPlaylist);
router.get('/userlist/:email', userPlaylist);
router.get('/publiclist', publicPlaylist);
router.post('/createpubliclist', createPublicPlaylist);
module.exports = router;