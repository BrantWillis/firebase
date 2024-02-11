import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { Auth } from "./components/auth.jsx";
import { db, auth, storage } from './config/firebase.jsx';
import {ref, uploadBytes} from "firebase/storage";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, } from 'firebase/firestore';

function App() {
  //const [count, setCount] = useState(0)

  const [movieList, setMovielist] = useState([]);

  const moviesCollectionRef = collection(db, "movies");

  //new movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //update title tstae
  const [updatedTitle, setUpdatedTitle] = useState();

  //filed upload states
  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setMovielist(filteredData);
    } catch (err) {
      console.error(err);
    }
  }

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch(err) {
      console.error(err);
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {title: updatedTitle});
      getMovieList();
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title:newMovieTitle,
        releaseDate:newReleaseDate,
        receivedAnOscar:isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch(err) {
      console.error(err);
    }
  }

  const uploadFile = async () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);

    try{
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <Auth />

    <div>
      <input 
        placeholder="Movie title..."
        onChange={(e) => setNewMovieTitle(e.target.value)}
      />
      <input 
        placeholder="release date..." 
        onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        type="number"
      />
      <input
        type="checkbox"
        checked={isNewMovieOscar}
        onChange={(e) => setIsNewMovieOscar(e.target.checked)}
      />
      <label>Received an oscar</label>
      <button onClick={onSubmitMovie}>Submit Movie</button>
    </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{color: movie.receivedAnOscar ? "green" : "red"}}>
              {movie.title}
              </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>delete movie</button>

            <input
              placeholder="new title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>update title</button>
          </div>
        ))}
      </div>

      <div>
        <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  );
}

export default App
