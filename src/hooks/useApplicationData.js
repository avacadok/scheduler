import { useState, useEffect } from "react";
import axios from "axios";

export const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState(state => ({ ...state, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(state => ({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const days = updateSpots(state, appointments);
        setState(state => ({ ...state, days, appointments }));
      })
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = updateSpots(state, appointments);
        setState(state => ({ ...state, days, appointments }))
      })
  }

  function updateSpots(state, appointments) {

    const currentDay = state.days.find((day) => day.name === state.day);

    const appointmentIds = currentDay.appointments;

    const spots = appointmentIds.filter((id) => !appointments[id].interview).length;

    const currentDayIndex = state.days.findIndex((day) => day.name === state.day);

    const updateDayObj = { ...currentDay, spots };

    const updateDayArr = [...state.days];

    updateDayArr[currentDayIndex] = updateDayObj;

    return updateDayArr;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}