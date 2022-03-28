import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = (props) => {
    reset();
    props.onCancel();
  };
  // console.log("student-name", props.student);
  // console.log("props;--->interview", props.interviewer);

  const save = (props) => {
    if (student && interviewer) {
      props.onSave(student, interviewer)
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            placeholder="Enter Student Name"
            onSubmit={(event) => event.preventDefault()}
          />
        </form>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel(props)}>
            Cancel
          </Button>
          <Button confirm onClick={() => save(props)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
