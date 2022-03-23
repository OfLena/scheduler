import React from "react";

import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const formatSpots = (spots) => {
    if (spots === 2) {
      return "2 spots remaining"
    };
    if (spots === 1) {
      return "1 spot remaining"
    };
    if (spots === 0) {
      return "no spots remaining"
    };
    return `${spots} spots remaining`
  };

  const dayClass = classNames(" day-list__item", {
    " day-list__item--selected": props.selected === true,
    " day-list__item--full": props.spots === 0,
  });

  return (
  <li className={dayClass} onClick={() => props.setDay(props.name)}>
    <h2 >{props.name}</h2>
    <h3>{formatSpots(props.spots)}</h3>
  </li>
  );
}

