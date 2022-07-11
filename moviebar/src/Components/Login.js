import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postLogin} from "../store/asyncMethods/AuthMethods";

const Login = () => {
  let navigate = useNavigate();
  const dispatch=useDispatch();
  const {loginErrors, user, loading} = useSelector((state)=> state.AuthReducer);

  const [state, setState]=useState({
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

  useEffect(()=>{
    if(user){
      navigate("/");
    }
  },[user])

  const handleSubmit = async (event)=>{
    event.preventDefault();
    dispatch(postLogin(state));
  }

  return (


    
    <Container>
        <div className="heading">Register To Movie-Mania</div>
        
        <SearchInput type="email" name="email" placeholder="  Email" value={state.email} onChange={handleInputs} />
        <SearchInput type="password" name="password" placeholder="Password" value={state.password} onChange={handleInputs}/>
        
        <AlreadyAccount><Link exact to="/signup">If you don't have account</Link></AlreadyAccount>
        <LoginButton type="submit" onClick={handleSubmit} >Log in</LoginButton>
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
margin-top:35px;
background-color:transparent;
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
margin-bottom:30px;
width:50%;
padding:5px;
outline:none;
border:none;
border-bottom:1px solid black;
background-color:transparent;
`;

const Heading=styled.h4`






margin-top :50px;
margin-bottom:30px;

color:black;
border:2px solid black;
padding:8px;
`;

const Container=styled.div`


${'' /* background-color: #FFDEE9;
background-image: linear-gradient(0deg, #A1FFCE 0,#FAFFD1 100%); */}

background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(234,249,249,0.67) 0.1%, rgba(239,249,251,0.63) 90.1% );










display:flex;
flex-direction:column;
padding:10px;
width:25%;
height:400px;
align-items:center;
border-top:1px solid black;
border-left:1px solid black;

-webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
-moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
margin:auto;
margin-top:70px;

`;

export default Login