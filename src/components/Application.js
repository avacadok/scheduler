import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  //dailyAppointments will log an empty [] at first then return info on the second log when the state gets update
  console.log(dailyAppointments)
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`)
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
    } )
  }, [])

  const appointmentElement = dailyAppointments.map((appointment) => {
    return(
      <Appointment
      key={appointment.id} 
      // {...appointment} is same thing as below by writing
      // key={appointment.id} 
      // id={appointment.id}
      // time={appointment.time}
      // interview={appointment.interview}
      {...appointment} />
    )
  }); 

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentElement}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
