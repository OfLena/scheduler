import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const { selected, setInterviewer, avatar, name } = props;
  const interviewersClass = classNames(" interviewers__item", {
    " interviewers__item--selected": selected,
  });

  return (
    <li className={interviewersClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {props.selected && props.name}
    </li>
  );
}
