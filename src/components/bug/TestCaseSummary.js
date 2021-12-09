import { useState } from "react";

function TestCaseSummary ({testCase}) {

  return (
    <div className="card border-light mb-2">
      <div className="card-body">
        
        <div>{testCase.text}</div>
        <div>{testCase.dateTested}</div>
        <div>{testCase.passed.toString()}</div>
      </div>
    </div>
  )
}

export default TestCaseSummary;