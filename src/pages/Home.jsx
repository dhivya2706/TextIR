import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>🚀 Welcome to AI Image Enhancement Studio</h1>
        <p>
          Enhance your images using cutting-edge AI techniques.
          Choose a feature below to begin your transformation journey.
        </p>
      </section>

      <section className="feature-buttons">
        <Link to="/super-resolution" className="feature-btn">
          Super Resolution
        </Link>
        <Link to="/colourization" className="feature-btn">
          Colourization
        </Link>
        <Link to="/degrading" className="feature-btn">
          Degrading Image
        </Link>
      </section>
    </div>
  );
};

export default Home;