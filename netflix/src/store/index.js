import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { TMDB_BASE_URL } from '../utils/constants';
import { API_KEY } from '../utils/constants';
import axios from 'axios'; 

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async()=> {
    const {data : {genres}} = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    // console.log(data);
    return genres

})

const createArrayFromRawData = (array,moviesArray,genres) => {
    // console.log(moviesArray);
    array.forEach((movie) => {
        const moviesGenres = [];
        movie.genre_ids.forEach((genre)=>{
            const name = genres.find(({id})=>id===genre);
            if(name) moviesGenres.push(name.name);
        })    
        if(movie.backdrop_path){
            moviesArray.push({
                id:movie.id,
                name:movie?.original_name?movie.original_name:movie.original_title,
                image: movie.backdrop_path,
                genres: moviesGenres.slice(0,3),
            })
        }
    });
}

const getRawData = async (api, genres, paging=false) => {
    const moviesArray = [];
    for(let i=1;moviesArray.length<60 && i<10;i++){
        const { data:{results} } = await axios.get(`${api}${paging?'&page=${i}':""}`
        );
        await createArrayFromRawData(results,moviesArray,genres)
    }
    return moviesArray;
}
export const fetchMovies = createAsyncThunk("netflix/trending", async({type}, thunkAPi)=> {
    const {netflix: {genres}} = thunkAPi.getState();
    return getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, false);
    // console.log(data);
})
export const fetchDataByGenre = createAsyncThunk("netflix/moviesByGenres", async({genre, type}, thunkAPi)=> {
    const {netflix: {genres}} = thunkAPi.getState();
    return getRawData(`https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`, genres, false);
    // console.log(data);
})
export const getUserLikedMovies = createAsyncThunk("netflix/getLiked", async(email)=> {
    const { data : {movies}} = await axios.get(`http://localhost:5000/api/user/liked/${email}`)
    // console.log(movies);
    return movies;
})

export const removeMovieFromLiked = createAsyncThunk(
    "netflix/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:5000/api/user/delete", {
        email,
        movieId,
      });
      return movies;
    }
  );


// return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${}`)

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getGenres.fulfilled, (state, action)=>{
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
})