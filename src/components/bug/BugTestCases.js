import { useState, useEffect } from "react";
import _ from 'lodash'

import TestCaseSummary from "./TestCaseSummary";


function BugTestCases ({bug, auth}) {
  
  const [testCases, setTestCases] = useState(null);


  useEffect(() => {
    setTestCases(bug?.test_cases)
  })

  return (
    <div>
      <h3 className="mb-3">Test Cases</h3>
      {!testCases && <div className="fst-italic mb-3">No Test Cases Reported</div>}
      <div className="">
            {_.map(testCases, (testCase) => (
              <TestCaseSummary key={testCase._id} testCase={testCase} />
            ))}
          </div>
          <div className="mb-3">
            <button className="btn btn-primary me-3">Log Test Case</button>
           {testCases && <button className="btn btn-info">Edit Test Case</button> }
          </div>
    </div>
  )
}

export default BugTestCases;