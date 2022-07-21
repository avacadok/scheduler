import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days, value, onChange} = props;

  const dayItems = days.map((eachDay) => {
    return(
      <DayListItem 
      key={eachDay.id}
      name={eachDay.name}
      spots={eachDay.spots}
      setDay={onChange}
      selected={eachDay.name === value}/>
    );
  });

  return (

  <ul>
    {dayItems}
  </ul>
  
  
  );
}