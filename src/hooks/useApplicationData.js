import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Booking an Interview see Appointment component
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({ ...state, appointments });

    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })

      .then((res) => {
        setState({
          ...state,
          days: updateSpots(state, appointments),
          appointments,
        });
      });
  };

  //Deleting an Interview see Appointment component
  const deleteInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then((res) => {
      setState({
        ...state,
        days: updateSpots(state, appointments),
        appointments,
      });
    });
  };

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const updateSpots = (state, appointments) => {
    return state.days.map((day, index) => {
      let countNulls = 0;
      //Loop over the state.days[at the index being processed].appointments array
      // Monday = 0, Tuesday = 1 etc.
      // check if appointments.interview = null
      state.days[index].appointments.forEach((element) => {
        if (appointments[element].interview === null) {
          countNulls++;
        }
      });
      const newSpots = {
        ...day,
        spots: countNulls,
      };
      return newSpots;
    });
  };

  return { state, deleteInterview, bookInterview, setDay };
}
