import React from "react";
import classNames from "classnames";

export default function Empty(props) {
  const { onAdd } = props;

  const emptyClass = classNames("appointment__add");

  return (
    <main className={emptyClass}>
      <img
        className="appointment__add-button"
        onClick={onAdd}
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
}
