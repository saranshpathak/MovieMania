import e from 'cors';
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'


const MovieComponent = (props) => {
    const { Title, Year, imdbID, Type, Poster} = props.movie;

    const {user} = useSelector(state => state.AuthReducer);

    const addToFavourite = (e) => {
        e.preventDefault();
        props.addFunction({CoverImage: Poster, Title: Title, Year: Year});
    }
  
    return (
      <MovieContainer
        onClick={() => {
          props.onMovieSelect(imdbID);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <CoverImage src={Poster} alt={Title} />
        <MovieName>{Title}</MovieName>
        <InfoColumn>
          <MovieInfo>Year : {Year}</MovieInfo>
          <MovieInfo>Type : {Type}</MovieInfo>
        </InfoColumn>
        {user && <AddToFavorite onClick={addToFavourite}>Add to Favorite</AddToFavorite>}
      </MovieContainer>
    );
  };
  
const AddToFavorite=styled.span`

font-size:18px;
font-weight:600;
color:black;
padding:10px;
background-color:#DE970B;
display: inline-block;
width: 130px;
color:white;
:hover {
  background-color: white;
		color: black;
		cursor: pointer;
	}

`;


const MovieInfo=styled.span`
font-size:18px;
font-weight:600;
color:black;
margin:15px 0;

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

const CoverImage=styled.img`
height:362px;
object-fit: cover;
`;

const MovieContainer =styled.div`
display:flex;
flex-direction:column;
padding:10px;
width:280px;
box-shadow:0 3px 10px 0 #aaa;
cursor:pointer;
margin:10px;

`;

export default MovieComponent