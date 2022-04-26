import React, { useEffect, useState } from "react";
import WeekDayCard from "./weekDayCard";
import Select from "react-select";
import { changeFavorites } from "../../servises/api";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../reducer/counterSlice";
import { useNavigate } from "react-router-dom";

function MainBody(props) {
  const [selectCitiesArr, setSelectCitiesArr] = useState([]);

  const [City, setChosenCityForecast] = useState(null);
  const [stateFavorites, setstateFavorites] = useState(false);
  const currentCity = useSelector((state) => state.weather);
  const navigate = useNavigate();

  useEffect(() => {
    checkCurentCityFavorites();
  }, [currentCity]);

  useEffect(() => {
    getForecast(currentCity);
  }, []);

  const dispatch = useDispatch();

  const getQuery = async (serchparams) => {
    let resp = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=G5wXXxbjLQoneG40NjCqQba9Iy6EoTl9&q=${serchparams}`
    );
    let citiesData = await resp.json();
    setSelectCitiesArr(citiesData);
  };

  const getForecast = async (selectedCity) => {
    const myPromise = new Promise((resolve, reject) => {
      resolve(
        fetch(
          `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${selectedCity.value}?apikey=G5wXXxbjLQoneG40NjCqQba9Iy6EoTl9&metric=true`
        )
      );
    });

    myPromise
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setChosenCityForecast(res);
      });

    dispatch(update(selectedCity));
  };

  const customStyles = {
    menuList: () => ({
      // none of react-select's styles are passed to <Control />
      backgroundColor: "rgba(42, 45, 56, 255)",
      color: "#747c8d",
    }),
    input: () => ({
      // none of react-select's styles are passed to <Control />
      backgroundColor: "rgba(42, 45, 56, 255)",
      color: "#747c8d",
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      backgroundColor: "rgba(42, 45, 56, 255)",
      color: "#747c8d",
    }),
    dropdownIndicator: () => ({
      // none of react-select's styles are passed to <Control />
      display: "none",
    }),
  };

  const checkCurentCityFavorites = () => {
    let favArr = JSON.parse(localStorage.getItem("favorites"));
    if (favArr) {
      if (favArr.includes(currentCity)) {
        setstateFavorites(false);
      } else {
        setstateFavorites(true);
      }
    }
  };
  return (
    <>
      {City && (
        <div className="container text-center">
          <div className="pe-4 d-flex align-items-center justify-content-center mx-auto col-sm-6">
            <div
              role={"button"}
              onClick={() => {
                navigate("/favorites");
              }}
            >
              <i className="bi bi-card-list fs-5 mx-4 "></i>
            </div>
            <div>
              <i
                role="button"
                className={`me-5 bi bi-heart-fill fs-5 ${
                  stateFavorites ? "bi-heart-fill" : "bi-heart"
                }`}
                onClick={() => {
                  if (stateFavorites) {
                    setstateFavorites(false);
                    changeFavorites(currentCity, false);

                    return;
                  }
                  if (!stateFavorites) {
                    setstateFavorites(true);
                    changeFavorites(currentCity, true);

                    return;
                  }
                }}
              ></i>
            </div>
            <div className="my-5 col-6 ms-5">
              {selectCitiesArr && (
                <Select
                  className="form-control border-top-0 border-start-0 border-end-0 rounded-0"
                  id="assignUser"
                  name="assignUser"
                  closeMenuOnSelect={true}
                  defaultValue={{
                    value: "",
                    label: "",
                  }}
                  styles={customStyles}
                  options={selectCitiesArr.map((item) => ({
                    label: item.LocalizedName,
                    value: item.Key,
                  }))}
                  onInputChange={(searchText) => {
                    if (searchText.length > 1) {
                      getQuery(searchText);
                    }
                  }}
                  onChange={(e) => {
                    getForecast(e);
                  }}
                />
              )}
            </div>
            <div>
              <i className="bi bi-search fs-5"></i>
            </div>
          </div>
          <div className="mx-auto d-sm-flex d-xs-block justify-content-center col-lg-12 row">
            <div className="  d-sm-flex justify-content-center  col-sm-6 col-md-5 mt-5 pt-5 row">
              <h1 className="display-1  mb-3 col-xs-12 col-sm-12 col-lg-7 w-auto">
                {currentCity.label}{" "}
              </h1>

              <p className="my-sm-5 my-3 col-xs-12 col-sm-12 col-lg-5">
                {new Date().getHours() < 18
                  ? City?.DailyForecasts[0]?.Day?.IconPhrase?.toUpperCase()
                  : City?.DailyForecasts[0]?.Night?.IconPhrase?.toUpperCase()}
              </p>
            </div>
            <div className="ms-lg-3 col-lg-3 col-sm-6">
              <img
                className="m-0"
                src={
                  new Date().getHours() < 18
                    ? `/images/${
                        City?.DailyForecasts[0]?.Day?.Icon < 12
                          ? City?.DailyForecasts[0]?.Day?.IconPhrase
                          : "Partly sunny"
                      }.gif`
                    : `/images/Mostly clear.gif`
                }
                alt="weather"
              />
            </div>
            <div className="text-center col-12 my-5">
              <p className="fs-4">
                {new Date().getHours() > 18 ? "Tonight" : "Today"}
              </p>
              <p className="fs-4">
                min.
                <span className="fw-bold">
                  {City.DailyForecasts[0].Temperature.Minimum?.Value}C
                  <span>&#176;</span> /{" "}
                </span>{" "}
                max.
                <span className="fw-bold">
                  {" "}
                  {City.DailyForecasts[0].Temperature.Maximum?.Value}C
                  <span>&#176;</span>
                </span>
              </p>
            </div>
          </div>
          <div className="col-lg-12 row mx-auto justify-content-center mt-lg-5">
            {City.DailyForecasts.slice(1).map((item) => {
              return <WeekDayCard key={item.EpochDate} day={item} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default MainBody;
