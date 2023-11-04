import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserLikedMovies } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Card from '../components/Card';

const UserLiked = () => {
    const [isScrolled, setIsScrolled] =useState(false);
    const navigate = useNavigate();
    
    const moviesLiked = useSelector((state)=>state.netflix.movies);
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState(undefined);


    useEffect(()=>{
        if(email){
            dispatch(getUserLikedMovies(email));
        }
    },[email]);

    // console.log(movies);

    

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0? false: true);
        return () => (window.onscroll = null)
    };

    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser){
            setEmail(currentUser.email);
        }
        else{
            navigate('/login');
        }
    });
  return (
    <Container>
        <Navbar isScrolled={isScrolled}/>
        <div className="content flex column">
            <h1>My List</h1>
            <div className="grid flex">
                {moviesLiked?.map((movie,idx)=>{
                    return <Card movieData={movie} index={idx} key={movie.id} isLiked={true} />
                })}
            </div>
        </div>
    </Container>
  )
}

export default UserLiked

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;