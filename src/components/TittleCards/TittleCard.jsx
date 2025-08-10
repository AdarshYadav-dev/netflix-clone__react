import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TittleCard.css";

const TittleCard = ({ title, category }) => {
  const cardsRef = useRef();
  const [cardsData, setCardsData] = useState([]);
  const navigate = useNavigate();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    if (!cardsRef.current) return;
    cardsRef.current.addEventListener("wheel", handleWheel);

    fetch(
      `https://www.omdbapi.com/?apikey=ac31ccd3&s=${encodeURIComponent(
        category || "avengers"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setCardsData(data.Search);
        } else {
          setCardsData([]);
        }
      })
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {cardsData.length > 0 ? (
          cardsData.map((card) => (
            card.Poster !== "N/A" && ( // ❌ Hide movies without poster
              <div
                className="card"
                key={card.imdbID}
                onClick={() => navigate(`/player/${card.imdbID}`)} // ✅ Pass IMDb ID to Player
                style={{ cursor: "pointer" }}
              >
                <img src={card.Poster} alt={card.Title} />
                <p>{card.Title}</p>
              </div>
            )
          ))
        ) : (
          <p style={{ color: "#fff" }}>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default TittleCard;
