import { useState } from "react";

function TestCaseSummary ({testCase}) {

  return (
    <div className="card">
      <div className="card-body">
        <span>{testCase.text}</span>
        <span>{testCase.dateTested}</span>
        <span>{testCase.passed}</span>
      </div>
    </div>
  )
}

export default TestCaseSummary;