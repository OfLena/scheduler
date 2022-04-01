import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVING = "ERROR_SAVING";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    //Book an Interview see useApplicationData
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVING, true));
  }

  //Delete an Interview see useApplicationData
  function deleteApp() {
    transition(DELETING, true);
    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }
  //Transitions from Show to "Are you sure?" on Delete
  function cancelConfirm() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Fragment>
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message={"Saving..."} />}
        {mode === DELETING && <Status message={"Deleting..."} />}
        {mode === CREATE && (
          <Form
            onCancel={() => back()}
            onSave={save}
            interviewers={props.interviewers}
          />
        )}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={cancelConfirm}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            message={"Are you sure?"}
            onConfirm={deleteApp}
            onCancel={back}
          />
        )}
        {mode === EDIT && (
          <Form
            onCancel={() => back()}
            onSave={save}
            interviewers={props.interviewers}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
          />
        )}
        {mode === ERROR_DELETE && <Error onClose={() => back()} />}
        {mode === ERROR_SAVING && <Error onClose={() => back()} />}
      </Fragment>
    </article>
  );
}
