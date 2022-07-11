
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./MovieComponent";
import MovieInfoComponent from "./MovieInfoComponent";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../store/types/UserTypes";
import { useDispatch } from "react-redux";
import { createPlaylist, userPlaylist, publicPlaylist, createPublicPlaylist } from "../store/asyncMethods/PlaylistMethod";
import { CLEAR_PLAYLIST } from "../store/types/PlaylistTypes";
export const API_KEY = "2f88e19f";
function Home() {

  const {user} = useSelector((state)=> state.AuthReducer);

  const {publicList, playlist} = useSelector((state)=> state.PlaylistReducer);

  const dispatch = useDispatch();

  const [searchQuery,updateSearchQuuery]=useState("");
  const [timeoutId,updateTimeoutId] = useState();
  const [movieList,updateMovieList] = useState([]);
  const [selectedMovie,onMovieSelect] = useState();
  const [favouriteMovieList,updateFavouriteMovieList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const addMoviesToFavouriteList = (movie) => {

    let temp =[]

    if(favouriteMovieList.length !== 0){
      for(let i=0;i<favouriteMovieList.length;i++){
        if(favouriteMovieList[i].Title!==movie.Title){
          temp.push(favouriteMovieList[i]);
        }
      }
    }
    temp.push(movie);
    updateFavouriteMovieList(temp);
  }
  
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${"2f88e19f"}`,
    );

    updateMovieList(response.data.Search);
    
  };

  const onTextChange=(event)=>{
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuuery(event.target.value);
    const timeout=setTimeout(()=>fetchData(event.target.value),100);
    updateTimeoutId(timeout);
  }

  const logout = () => {
    localStorage.removeItem("myToken");
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PLAYLIST });
  }

  const privateListHandler = (e) => {
    e.preventDefault();

    if(!user)return;

    if(playlistName.length===0){
      return window.alert("Enter playlist name");
    }
    dispatch(createPlaylist({email:user.email, playlistName, movies: favouriteMovieList}));
    updateFavouriteMovieList([]);
    setPlaylistName("");
    updateSearchQuuery("");
    onMovieSelect()
    updateMovieList([]);
    dispatch(userPlaylist(user.email))
  }

  const publicListHandler = (e) => {
    e.preventDefault();

    if(!user)return;

    if(playlistName.length===0){
      return window.alert("Enter playlist name");
    }
    dispatch(createPublicPlaylist({playlistName, movies: favouriteMovieList}));
    updateFavouriteMovieList([]);
    setPlaylistName("");
    updateSearchQuuery("");
    onMovieSelect()
    updateMovieList([]);
    dispatch(publicPlaylist());
  }

  useEffect(()=>{
    if(user.email){
      dispatch(userPlaylist(user.email))
    }
    dispatch(publicPlaylist());
  },[]);


  return (
    <Container>
      <Header>
      
      <AppName>
      🎥 MOVIE BAR
      </AppName>
      <SearchBox>
      <SearchIcon src="search-512.webp" />
      <SearchInput placeholder="Search movie" value={searchQuery} onChange={onTextChange}></SearchInput>

      </SearchBox>
      {
        user?<><LogOutButton onClick={logout} >Log Out</LogOutButton></>:<><Link exact to="/login"><LoginButton>Login</LoginButton></Link>
        <Link exact to="/signup"><SigninButton>Sign in</SigninButton></Link></>
      }
      
      </Header>

      {
        favouriteMovieList.length>0 && user?<Div><Span>Selected Movies {favouriteMovieList.length}</Span><ListName placeholder="Favourite list name" value={playlistName} onChange={(e)=>setPlaylistName(e.target.value)}></ListName><CreatePlaylist onClick={privateListHandler}>Create Private Playlist</CreatePlaylist><CreatePlaylist onClick={publicListHandler}>Create Public Playlist</CreatePlaylist></Div>
        :
        ""
      }
      {
        playlist.length>0 && searchQuery.length===0 ?<>
        <Span>Your Playlist</Span>
        {
          
          playlist.map((playlist,index)=>{
            return <>
            <Span>{playlist.listName}</Span>
            <FavouriteListContainer key={index}>
              {
                playlist.movies.map((movie,index)=>{
                  return <>
                          <MovieContainer key={index}>
                            <CoverImage src={movie.CoverImage} alt={movie.Title} />
                            <MovieName>{movie.Title}</MovieName>
                            <InfoColumn>
                              <MovieInfo>Year : {movie.Year}</MovieInfo>
                            </InfoColumn>
                          </MovieContainer>
                  </>
                })
              }
            </FavouriteListContainer>
            </>
          })
        }
        </>:""
      }
      {
        publicList.length>0 && searchQuery.length===0 ?<>
        <Span>Public Playlist Section</Span>
        {
          
          publicList.map((playlist,index)=>{
            return <>
            <Span>{playlist.listName}</Span>
            <FavouriteListContainer key={index}>
              {
                playlist.movies.map((movie,index)=>{
                  return <>
                          <MovieContainer key={index}>
                            <CoverImage src={movie.CoverImage} alt={movie.Title} />
                            <MovieName>{movie.Title}</MovieName>
                            <InfoColumn>
                              <MovieInfo>Year : {movie.Year}</MovieInfo>
                            </InfoColumn>
                          </MovieContainer>
                  </>
                })
              }
            </FavouriteListContainer>
            </>
          })
        }
        </>:""
      }

      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
              addFunction={addMoviesToFavouriteList}
            />
          ))
        ) : (
          ""
        )}
      </MovieListContainer>
    </Container>
  );
}


const MovieContainer =styled.div`
display:flex;
flex-direction:column;
padding:10px;
width:280px;
box-shadow:0 3px 10px 0 #aaa;
cursor:pointer;
margin:10px;
`;

const CoverImage=styled.img`
height:362px;
object-fit: cover;
`;

const InfoColumn=styled.div`
display:flex;
flex-direction: row;
justify-content:space-between;
`;

const MovieName=styled.span`
font-size:18px;
font-weight:600;
color:black;
margin:15px 0;
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
`;

const MovieInfo=styled.span`
font-size:18px;
font-weight:600;
color:black;
margin:15px 0;

`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const FavouriteListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: scroll;
  margin-top: 15px;
`;


const MovieListContainer = styled.div`
display:flex;
flex-direction:row;
justify-content:space-evenly;
flex-wrap:wrap;
padding:30px;
`;

const Div = styled.div`
display:flex;
align-items:center;
justify-content:center;
padding:30px;
`;

const Span=styled.span`
font-weight:bold;
font-family: source-code-pro, Menlo, Monaco, Consolas;
font-size:20px;
margin-top:10px;
`;

const SigninButton=styled.button`
height:35px;
width:70px;
padding:5px;
margin-right:60px;
font-family: source-code-pro, Menlo, Monaco, Consolas;
font-weight:bold;
border:none;
:hover {
  background-color: black;
		color: white;
		cursor: pointer;
	}
`;

const LoginButton=styled.button`
height:35px;
width:70px;
padding:5px;
margin-left:180px;
border:none;
font-weight:bold;
font-family: source-code-pro, Menlo, Monaco, Consolas;
:hover {
  background-color: black;
		color: white;
		cursor: pointer;
	}
`;

const LogOutButton=styled.button`
height:35px;
width:70px;
padding:5px;
margin-left:180px;
border:none;
font-weight:bold;
font-family: source-code-pro, Menlo, Monaco, Consolas;
:hover {
  background-color: black;
		color: white;
		cursor: pointer;
	}
`;

const CreatePlaylist=styled.button`
font-size:25px;
margin-left:10px;
border:none;
padding:10px;
font-weight:bold;
font-family: source-code-pro, Menlo, Monaco, Consolas;
:hover {
  background-color: black;
		color: white;
		cursor: pointer;
	}
`;

const SearchInput=styled.input`
color: black;
font-size:16px;
font-weight:bold;

padding:10px;
margin-left: 15px;
width:100%;
`;

const ListName=styled.input`
color: black;
font-size:16px;
font-weight:bold;
margin-left: 15px;
padding:10px;
width:50%;
`;

const SearchIcon=styled.img`
width:32px;
height:32px;
`;

const SearchBox=styled.div`
display:flex;
flex-direction:row;
padding:10px 10px;
background-color:white;
border-radius:6px;
margin-left:20px;
width:50%;
background-color:white;
align-items:center;
`;

const Container=styled.div`
display:flex;
flex-direction:column;
`;

const Header=styled.div`
display:flex;
flex-direction:row;
background-color:white;
color:black;
padding:10px;
font-size:25px;
font-weight:bold;
-webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
-moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
justify-content:space-between;
align-items:center;
`;

const AppName=styled.div`
display:flex;
flex-direction:row;
align-items:center;
`;


export default Home;
