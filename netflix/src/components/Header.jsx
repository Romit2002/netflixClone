import React from 'react'
import logo from '../assets/logo.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();
  return (
    <StyledHeader className='flex a-center j-between'>
        <div className="logo" onClick={()=>navigate('/login')}>
            <img src={logo} alt='logo' />


        </div>
        <button onClick={()=>navigate(props.login?"/login":"/signup")}>
            {props.login?"Log In":"Sign Up"}
        </button>
    </StyledHeader>    
  )
}

export default Header

const StyledHeader = styled.div`
    padding: 0 4rem;
    .logo{
        img{
            height: 5rem;
            cursor: pointer;
        }
    }
    button{
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border:none;
        cursor:pointer;
        border-radius:0.2rem;
        font-weight:bold;
        color:white;
        font-size: 1.05rem;

    }

`;
