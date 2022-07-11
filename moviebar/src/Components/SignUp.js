import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import axios from 'axios'
import './style.css';
import {Link, useNavigate} from 'react-router-dom'

import { postRegister } from "../store/asyncMethods/AuthMethods";

const SignUp = () => {

  let navigate = useNavigate();

  const {loading, registerErrors, user} = useSelector((state)=>state.AuthReducer);
  const dispatch = useDispatch();

  const [state, setState]=useState({
    name:"",
    email:"",
    password:"",
  });

  const handleInputs = (event)=>{
    const {name, value} = event.target;
    setState((preVal)=>{
      return{
        ...preVal,
        [name]:value,
      }
    })
  }

  const handleSubmit = async(event)=>{
    event.preventDefault();
    dispatch(postRegister(state));
  }

  useEffect(()=>{
    if(user){
      navigate("/");
    }
  },[user])

  return (

    <Container>
        <div className="heading">Login to MovieMania</div>
        <SearchInput name="name" type="text" placeholder="your name" onChange={handleInputs}/>
        <SearchInput name="email" type="email" placeholder="your email" onChange={handleInputs}/>
        <SearchInput name="password" type="password" placeholder="type your password" onChange={handleInputs}/>
        <AlreadyAccount><Link exact to="/login">Already have an account</Link></AlreadyAccount>

        
        <LoginButton type="submit" onClick={handleSubmit}>Sign in</LoginButton>


        


    </Container>
    
  )
}

const AlreadyAccount=styled.a`

text-decoration:underline;
cursor:pointer;

`;

const LoginButton=styled.button`
height:35px;
width:70px;
padding:5px;
margin-top:20px;
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
margin-bottom:20px;
width:50%;
padding:5px;
`;

const Heading=styled.h4`
margin-bottom:30px;

color:black;
padding:10px;
border:1px solid black;
`;

const Container=styled.div`
display:flex;
flex-direction:column;
padding:10px;
width:25%;
height:400px;
align-items:center;
border-top:1px solid black;
border-left:1px solid black;

background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(234,249,249,0.67) 0.1%, rgba(239,249,251,0.63) 90.1% );

-webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
-moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
margin:auto;
margin-top:70px;

`;

export default SignUp;