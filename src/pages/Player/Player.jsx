import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const API_KEY = "AIzaSyA-gz2TGSAz_8I-qx44gK5_etEmW2uOfkI"; // Teri API key

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [youtubeId, setYoutubeId] = useState(null);

  // Step 1: OMDB se movie data fetch
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=ac31ccd3&i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);

        // Step 2: Movie title ke saath YouTube pe search
        if (data?.Title) {
          fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
              data.Title + " official trailer"
            )}&key=${API_KEY}`
          )
            .then((res) => res.json())
            .then((ytData) => {
              if (ytData.items && ytData.items.length > 0) {
                setYoutubeId(ytData.items[0].id.videoId);
              }
            })
            .catch((err) => console.error("YouTube fetch error:", err));
        }
      })
      .catch((err) => console.error("OMDB fetch error:", err));
  }, [id]);

  if (!movie) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
  }

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        className="back-btn"
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer" }}
      />

      {youtubeId ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={`${movie.Title} Trailer`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p style={{ color: "white" }}>Trailer not found</p>
      )}

      <div className="player-info">
        <p><strong>Released:</strong> {movie.Released}</p>
        <p><strong>Title:</strong> {movie.Title}</p>
        <p><strong>Type:</strong> {movie.Type}</p>
      </div>
    </div>
  );
};

export default Player;
