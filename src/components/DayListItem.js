import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {
  const {setDay, name, spots, selected} = props
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": spots === 0
  })
  return (
    <li onClick={() => setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light" >
        {spots === 0 && "no spots remaing"}
        {spots === 1 && "1 spot remaing"}
        {spots > 1 && `${spots} spots remaing`}
      </h3>
    </li>
  );
}