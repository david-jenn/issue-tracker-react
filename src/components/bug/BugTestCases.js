import { useState, useEffect } from "react";
import _ from 'lodash'

import TestCaseSummary from "./TestCaseSummary";


function BugTestCases ({bug, auth}) {
  
  const [testCases, setTestCases] = useState([]);


  useEffect(() => {
    setTestCases(bug?.test_cases)
  })

  return (
    <div>
      <div>
            {_.map(testCases, (testCase) => (
              <TestCaseSummary key={testCase._id} testCase={testCase} />
            ))}
          </div>
    </div>
  )
}

export default BugTestCases;