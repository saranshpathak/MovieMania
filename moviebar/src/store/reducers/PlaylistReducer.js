const {SET_PLAYLIST, SET_PUBLIC_PLAYLIST, CLEAR_PLAYLIST} = require('../types/PlaylistTypes');

const initState = {
    playlist: [],
    publicList:[]
}

const PlaylistReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PLAYLIST:
            return{ ...state, playlist: action.payload }
        case SET_PUBLIC_PLAYLIST:
            return{ ...state, publicList: action.payload }
        case CLEAR_PLAYLIST:
            return {...state, playlist:[]};
        default:
            return state;
    }
}

export default PlaylistReducer;