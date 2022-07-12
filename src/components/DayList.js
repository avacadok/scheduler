import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days, day, setDay} = props;

  const dayItems = days.map((eachDay) => {
    return(
      <DayListItem 
      key={eachDay.id}
      name={eachDay.name}
      spots={eachDay.spots}
      setDay={setDay}
      selected={eachDay.name === day}/>
    );
  });

  return (

  <ul>
    {dayItems}
     {/* <DayListItem 
     key={days[0].id}
     name={days[0].name}
     spots={days[0].spots}
     setDay={setDay}
     selected={days[0].name === day}
     />
     <DayListItem
     key={days[1].id}
     name={days[1].name}
     spots={days[1].spots}
     setDay={setDay}
     selected={days[1].name === day}
     />
     <DayListItem
     key={days[2].id}
     name={days[2].name}
     spots={days[2].spots}
     setDay={setDay}
     selected={days[2].name === day}
     /> */}
  </ul>
  
  
  );
}