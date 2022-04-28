import React from "react";

function WeekDayCard(props) {
  let day = props.day;
  let dayOfWeek = new Date(props.day.Date);
  return (
    <div className="col-4 col-md-2  mx-3 ">
      <div className="text-center">
        <h4>
          {dayOfWeek.toLocaleDateString("en-US", {
            weekday: "long",
          })}
        </h4>
      </div>
      <div className=" p-1 ">
      <img
          className="m-0 w-100
          "
          src={`/images/${
            day.Day.Icon < 12 ? day.Day.IconPhrase : "Partly sunny"
          }.gif`}
          alt="weather"
        />
      </div>
      <div className="d-flex justify-content-between">
        <p className="text-center">
          min. {day.Temperature.Minimum?.Value}C<span>&#176;</span>
        </p>
        <p className="text-center">
          max. {day.Temperature.Maximum?.Value}C<span>&#176;</span>
        </p>
      </div>
    </div>
  );
}

export default WeekDayCard;
