import { useState } from "react";
import moment from 'moment';

function TestCaseSummary ({testCase}) {

  return (
    <div className="card border-light bg-black mb-2">
      <div className="card-body">
        
        <div>{testCase?.text}</div>
        
        <div>{testCase?.passed ? 'Passed' : "Failed"}</div>
      </div>
      <div className="card-footer bg-secondary">{moment(testCase.dateTested).fromNow()}</div>
    </div>
  )
}

export default TestCaseSummary;