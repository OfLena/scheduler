import React, { Fragment } from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment (props) {

  

  return (
    <article className="appointment">
      <Fragment>
        {props.interview ?
          <>
            <Header
              time={props.time}
            />
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
            />
          </>
         :
          <>
            <Header
              time={props.time}
            />
            <Empty/>
          </>
        }
      </Fragment>
    </article>
  );
};

