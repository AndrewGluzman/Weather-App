export const changeFavorites = async (city, state) => {
  let favorites = !localStorage["favorites"]
    ? []
    : JSON.parse(localStorage.getItem("favorites"));
  if (state) {
    favorites = [...favorites, city];
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } else {
    favorites = favorites.filter((item) => item.label !== city.label);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};
