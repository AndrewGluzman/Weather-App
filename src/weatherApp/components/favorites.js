import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteItem from "./favoriteitem";

function Favorites(props) {
  let [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);
  const navigate = useNavigate();
  const loadFavorites = () => {
    let favoritesArr = JSON.parse(localStorage.getItem("favorites"));
    setFavorites(favoritesArr);
  };

  return (
    <>
      <div className="justify-content-center col col-sm-12 container">
        <h3 className="display-1 text-center my-5">Favorite cities</h3>
        {favorites && (
          <div className=" d-flex justify-content-center mx-auto">
            <div>
              {favorites.map((item) => {
                return <FavoriteItem key={item.value} data={item} />;
              })}
            </div>
          </div>
        )}
        <p
          className="text-center my-5"
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </p>
      </div>
    </>
  );
}

export default Favorites;
