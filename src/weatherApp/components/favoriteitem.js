import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "../reducer/counterSlice";

function FavoriteItem(props) {
  const fav = props.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="col-12  d-flex justify-content-between align-items-center border border-1 p-3 my-4 "
      onClick={() => {
        dispatch(update({ value: fav.value, label: fav.label }));
        navigate("/");
      }}
    >
      <p className="display-5 m-0">{fav.label}</p>
      <i className=" bi bi-heart-fill fs-5 ms-5"></i>
    </div>
  );
}

export default FavoriteItem;
