import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

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

    // console.log("interview--->", interview);
    // console.log('state --->', state)
    // console.log('appointments---->', appointments)
    // console.log("appointment--->", appointment);

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
  // const setDays = days => setState(prev => ({ ...prev, days }));

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
    // console.log('inside map state.days -->', state.days)

    return state.days.map((day, index) => {
      console.log("index", index);
      // console.log('day', day)

      //set counter to zero
      let countNulls = 0;

      console.log("state.days[index]", state.days[index]);

      console.log("before", state.days[index].appointments);

      //Loop over the state.days[at the index being processed].appointments array
      // Monday = 0, Tuesday = 1 etc.
      //every day has 5 appointments. For each element in that day
      // check if appointments.interview = null
      state.days[index].appointments.forEach((element) => {
        console.log("after", appointments[element]);
        console.log("interview", appointments[element].interview);

        if (appointments[element].interview === null) {
          countNulls++;
        }
      });

      const newSpots = {
        ...day,
        spots: countNulls,
      };
      // console.log(newSpots)
      return newSpots;
    });
  };

  return { state, deleteInterview, bookInterview, setDay };
}
