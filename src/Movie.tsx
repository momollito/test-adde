import "./Movie.css";

type MovieProps = {
  title: string;
  poster: string;
  blur: number;
};

function Movie(props: MovieProps) {
  return (
    <div className="moviecard" style={{ filter: `blur(${props.blur}px)` }}>
      <img
        className="image"
        src={`https://image.tmdb.org/t/p/w500${props.poster}`}
        alt={props.title}
      />
      <div>
        <span className="name">{props.title}</span>
      </div>
    </div>
  );
}

export default Movie;
