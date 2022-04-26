import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ApiMethod } from "../../servises/api";
import Cities from "../../servises/temp.json";
import City from "../../servises/city.json";
import { useDispatch, useSelector } from "react-redux";

function Header(props) {
  const [selectCitiesArr, setSelectCitiesArr] = useState([]);
  const [chosenCity, setChosenCity] = useState({});
  const [chosenCityForecast, setChosenCityForecast] = useState({});
  let dispatch = useDispatch();
  useEffect(() => {}, []);

  const getQuery = async (serchparams) => {
    // let resp = await fetch(
    //   `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=G5wXXxbjLQoneG40NjCqQba9Iy6EoTl9&q=${serchparams}`
    // );
    // let citiesData = await resp.json();
    // setSelectCitiesArr(citiesData);
    setSelectCitiesArr(Cities);
  };

  const getForecast = async (selectedCity) => {
    // let resp = await fetch(
    //   `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${selectedCity.value}?apikey=G5wXXxbjLQoneG40NjCqQba9Iy6EoTl9&metric=true`
    // );
    // let citiForcast = await resp.json();
    console.log(selectedCity);
    dispatch({ type: "UPDATE_WEATHER", chosenCity: selectedCity });
    // setChosenCity(citiForcast);
  };

  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      backgroundColor: "inherit",
    }),
  };
  return (
    <div>
      <div className="">
        <div className="my-5 col-6 mx-auto">
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
              //   styles={customStyles}
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
                // setChosenCity((prevState) => {
                //   return {
                //     ...prevState,
                //     e,
                //   };
                // });
                getForecast(e);
              }}
            />
          )}

          {/* <input
            type="text"
            className="form-control border-top-0 border-start-0 border-end-0 rounded-0"
            name="search"
            id="search`"
            aria-describedby="helpId"
            placeholder="Find city..."
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
