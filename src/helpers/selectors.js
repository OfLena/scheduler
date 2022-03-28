// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

export function getAppointmentsForDay(state, day) {
  const findAppointments = state.days.find((days) => days.name === day);
  if (state.days.length === 0 || findAppointments === undefined) {
    return [];
  }
  if (findAppointments.name === day) {
    return findAppointments.appointments.map((id) => state.appointments[id]);
  };
};

export function getInterview(state, interview) {
  if (interview) {

    const { student, interviewer: id} = interview

    return {
      interviewer: state.interviewers[id],
      student,
    };
  };

  return null;
};

export function getInterviewersForDay (state, day) {
  const findInterviews = state.days.find((days) => days.name === day);
  if (state.days.length === 0 || findInterviews === undefined) {
    return [];
  }
  
  if (findInterviews.name === day) {
    return findInterviews.interviewers.map((id) => state.interviewers[id])

  };
};
