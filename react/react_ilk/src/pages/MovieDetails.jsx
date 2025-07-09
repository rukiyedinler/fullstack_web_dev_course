import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SimilarMovies from "./SimilarMovies";
import Actors from "../components/Actors";
import { UserContext } from "../contexts/UserContext";
import WatchList from "../components/WatchList";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = "25b1756e34bea5c95db769d36af06a8a";
const language = "en-US";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { adddToWatchList, watchlist, removeForWatchList } =
    useContext(UserContext);
  const isAdded = watchlist?.find((i) => i.id == movie?.id);

  useEffect(() => {
    async function getMovie() {
      try {
        const response = await fetch(
          `${apiUrl}/movie/${id}?api_key=${api_key}&language=${language}&append_to_response=credits`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setMovie(data);

        setError("");
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
      window.scrollTo(0, 0);
    }

    getMovie();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <div
        className="text-white position-relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div className="img-overlay">
          <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="row">
              <div className="col-md-3 d-none d-lg-block">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid rounded shadow img-thumbnail"
                />
              </div>
              <div className="col-md-9">
                <h1 className="display-4">{movie.title}</h1>
                <p>
                  {movie.release_date}
                  <i className="bi bi-dot text-white"></i>
                  <span className="text-white">
                    {movie.genres.map((genre) => genre.name).join(", ")}
                  </span>
                  <i className="bi bi-dot text-white"></i>
                  {movie.runtime} dk
                </p>

                <p>
                  <span className="badge bg-warning fs-6">
                    {Math.round(movie.vote_average * 10) / 10}
                  </span>
                  <span className="badge bg-danger fs-6 ms-2 pointer">
                    {isAdded ? (
                      <i
                        className="bi bi-heart-fill"
                        onClick={() => removeForWatchList(movie)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-heart"
                        onClick={() => adddToWatchList(movie)}
                      ></i>
                    )}
                  </span>
                </p>

                {movie.overview && (
                  <p className="lead">
                    <strong>Özet:</strong> {movie.overview}
                  </p>
                )}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
                  <p className="d-flex flex-column text-center">
                    <span>Yapımcı</span>
                    {movie.production_companies[0].name}
                    <span></span>
                  </p>
                  <p className="d-flex flex-column text-center">
                    <span>Yönetmen</span>
                    {movie.credits.crew[0]?.name}
                    <span></span>
                  </p>
                  <p className="d-flex flex-column text-center">
                    <span>Senarist</span>
                    Senarist {movie.credits.crew[1]?.name}
                    <span></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Actors actors={movie.credits.cast} />
      <SimilarMovies movieId={id} />
    </>
  );
};

export default MovieDetails;
