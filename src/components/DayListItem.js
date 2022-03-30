import React from "react";

import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { selected, spots, setDay, name } = props;
  const formatSpots = (spots) => {
    if (spots === 2) {
      return "2 spots remaining";
    }
    if (spots === 1) {
      return "1 spot remaining";
    }
    if (spots === 0) {
      return "no spots remaining";
    }
    return `${spots} spots remaining`;
  };

  const dayClass = classNames(" day-list__item", {
    " day-list__item--selected": selected === true,
    " day-list__item--full": spots === 0,
  });

  return (
    <li className={dayClass} onClick={setDay} data-testid="day">
      <h2>{name}</h2>
      <h3>{formatSpots(spots)}</h3>
    </li>
  );
}
