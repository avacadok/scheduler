import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true)

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => {
      console.log("inside catch", error)
      transition(ERROR_SAVE, true)
    } );
  };

  function deleteInterview() {
    transition(DELETE, true);

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {/* props.interview && */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers}
      onCancel={back}
      onSave={save}
      />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETE && <Status message="Deleting"/>}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete this appointment?"
      onCancel={back}
      onConfirm={deleteInterview} />}
      {mode === EDIT && 
      <Form 
        //can use the react dev tool to look into the info that we want
        student={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onSave={save}
        onCancel={back}
      />}
      {mode === ERROR_SAVE && <Error onClose={back} message="Sorry, we have error saving"/>}
      {mode === ERROR_DELETE && <Error onClose={back} message="Sorry, we have error deleting"/>}
    </article>
  );
}