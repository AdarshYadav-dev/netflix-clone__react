import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
// import second from 'first'
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/Play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TittleCard from "../../components/TittleCards/TittleCard";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order ,a young man living
            in modern intanbul embarks on a quest to save the city from an
            immortal enemy
          </p>
          <div className="hero-btn">
            <button className="btn">
              <img src={play_icon} alt="" />
              Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
          <TittleCard />
        </div>
      </div>

      <div className="more-cards">
        <TittleCard title="Popular on Netflix" category="popular" />
        <TittleCard title="Blockbuster Movies" category="blockbuster" />
        <TittleCard title="Only on Netflix" category="netflix" />
        <TittleCard title="Upcoming" category="upcoming" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
