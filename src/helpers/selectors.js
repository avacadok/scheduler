import React from "react";

export const getAppointmentsForDay = (state, day)=> {
  if (state.days.length === 0){
    return []
  }
  const filteredDay = state.days.find(selectedDay => selectedDay.name === day);
  if(!filteredDay){
    return []
  }
  return filteredDay.appointments.map((appointmentId) => state.appointments[appointmentId]);
}

export const getInterview = (state, interview) => {
  if(!interview){
    return null;
  }
  return{
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}