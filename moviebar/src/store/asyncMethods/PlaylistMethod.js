import axios from "axios";
import { SET_PLAYLIST, SET_PUBLIC_PLAYLIST } from "../types/PlaylistTypes";

export const createPlaylist = (state) => {

    return async (dispatch)=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const {data} = await axios.post("http://127.0.0.1:5000/create", state, config);
        } catch (error) {
            console.log(error.response.data.errors);
        }           
    };
}

export const userPlaylist = (email) => {
    return async (dispatch)=>{
        try{
            const {data:{favouriteMovies}}= await axios.get(`http://127.0.0.1:5000/userlist/${email}`)
            dispatch({type: SET_PLAYLIST, payload: favouriteMovies});
        }catch(error){
            console.log(error.response.data.errors);
        }
    };
}

export const createPublicPlaylist = (state) => {
    console.log("step1")
    return async (dispatch)=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const {data} = await axios.post("http://127.0.0.1:5000/createpubliclist", state, config);
        } catch (error) {
            console.log(error.response.data.errors);
        }           
    };
}

export const publicPlaylist = () => {
    return async (dispatch)=>{
        try{
            const {data:{publicList}}= await axios.get(`http://127.0.0.1:5000/publiclist`)
            dispatch({type: SET_PUBLIC_PLAYLIST, payload: publicList});
        }catch(error){
            console.log(error.response.data.errors);
        }
    };
}