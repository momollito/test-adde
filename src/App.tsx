import { useEffect, useState } from "react";
import Movie from "./Movie";
import addelogo from "./assets/adde.png";
import "./App.css";

function App() {
  // Define a type for the movie data
  type MovieType = {
    title: string;
    poster_path: string;
  };

  // State for movie list and user's answer
  const [movieList, setMovieList] = useState<MovieType[]>([]);
  const [answer, setAnswer] = useState<string>("");

  // Fetch movies from the API when the component mounts
  useEffect(() => {
    async function fetchMovies() {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWYyOGQ3NGM2NWUxOTVhYTNlOWM2MWZiNjYxNzFlMSIsInN1YiI6IjY1MzAyMDJjYWQ1OWI1MDBhZDJkYzU1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JnF8jMXSA35pndJ-l7Mj02L6U4GJ_E62YUKTbmHuC3M",
          },
        };

        const rawRes = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          options
        );

        if (rawRes.ok) {
          const jsonRes = await rawRes.json();
          setMovieList(jsonRes.results);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  // Generate movie components with optional blur based on the answer
  const movies: JSX.Element[] = (movieList || []).map((data, i) => {
    const blurNumber =
      data.title.toLowerCase() === answer.toLowerCase() ? 0 : 7;

    return (
      <Movie
        key={i}
        title={data.title}
        poster={data.poster_path}
        blur={blurNumber}
      />
    );
  });

  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={addelogo} className="logo" alt="Adde logo" />
        </div>
      </div>
      <div className="content">
        <input
          type="text"
          id="answer"
          placeholder="Devinez les films à l'affiche !"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
        />

        <div className="card">{movies}</div>
      </div>
    </>
  );
}

export default App;
