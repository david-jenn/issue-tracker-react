import { useState, useEffect } from 'react';
import _ from 'lodash';
import ProgressBar from 'react-bootstrap/ProgressBar';

function BugStatistics({ bugs }) {
  const [unclassifiedCount, setUnclassifiedCount] = useState(null);
  const [unclassifiedPercent, setUnclassifiedPercent] = useState(null);

  const [unapprovedCount, setUnapprovedCount] = useState(null);
  const [unapprovedPercent, setUnapprovedPercent] = useState(null);

  const [approvedCount, setApprovedCount] = useState(null);
  const [approvedPercent, setApprovedPercent] = useState(null);
  const [duplicateCount, setDuplicateCount] = useState(null);
  const [duplicatePercent, setDuplicatePercent] = useState(null);

  const [openCount, setOpenCount] = useState(null);
  const [openPercent, setOpenPercent] = useState(null);

  const [closedCount, setClosedCount] = useState(null);
  const [closedPercent, setClosedPercent] = useState(null);

  useEffect(() => {
    calcStats(bugs);
  });

  function calcStats(bugs) {
   
    if (bugs.length > 0) {
      const totalBugs = bugs.length;
      const approvedArray = _.filter(bugs, (x) => x.classification === 'approved');
      const unapprovedArray = _.filter(bugs, (x) => x.classification === 'unapproved');
      const unclassifiedArray = _.filter(bugs, (x) => x.classification === 'unclassified');
      const duplicateArray = _.filter(bugs, (x) => x.classification === 'duplicate');
      const openArray = _.filter(bugs, (x) => x.closed === false);
      const closedArray = _.filter(bugs, (x) => x.closed === true);

    

      setApprovedCount(approvedArray.length);
      setApprovedPercent(((approvedCount / totalBugs) * 100).toFixed(2));

      setUnapprovedCount(unapprovedArray.length);
      setUnapprovedPercent(((unapprovedCount / totalBugs) * 100).toFixed(2));

      setUnclassifiedCount(unclassifiedArray.length);
      setUnclassifiedPercent(((unclassifiedCount / totalBugs) * 100).toFixed(2));

      setDuplicateCount(duplicateArray.length);
      setDuplicatePercent(((duplicateCount / totalBugs) * 100).toFixed(2));

      setOpenCount(openArray.length);
      setOpenPercent(((openCount / totalBugs) * 100).toFixed(2));

      setClosedCount(closedArray.length);
      setClosedPercent(((closedCount / totalBugs) * 100).toFixed(2));
    } else {
      setApprovedPercent(0);
      setApprovedCount(0)
      setUnclassifiedCount(0);
      setUnclassifiedPercent(0);
      setDuplicateCount(0);
      setDuplicatePercent(0);
      setUnapprovedCount(0);
      setUnapprovedPercent(0);
      setOpenCount(0);
      setOpenPercent(0);
      setClosedCount(0);
      setClosedPercent(0);
    }
  }

  return (
    <div className="p-2">
      <div className="border-bottom border-light mb-3 fs-5">{bugs.length} bugs found</div>
      <div className="classificationStats">
        <div className="mb-1">
          <div className="mb-1">{approvedCount} approved</div>
          <ProgressBar variant="success" now={approvedPercent} />
          <div className="fst-italic text-center">{`${approvedPercent}%`}</div>
        </div>
        <div className="ps-2 pe-2">
          <div className="border-bottom border-light mb-3"></div>
        </div>
        <div className="mb-1">
          <div className="mb-1">{unapprovedCount} unapproved</div>
          <ProgressBar variant="danger" now={unapprovedPercent} />
          <div className="fst-italic text-center">{`${unapprovedPercent}%`}</div>
        </div>
        <div className="ps-2 pe-2">
          <div className="border-bottom border-light mb-3"></div>
        </div>

        <div className="mb-1">
          <div className="mb-1">{unclassifiedCount} unclassified</div>
          <ProgressBar variant="warning" now={unclassifiedPercent} />
          <div className="fst-italic text-center">{`${unclassifiedPercent}%`}</div>
        </div>
        <div className="ps-2 pe-2">
          <div className="border-bottom border-light mb-3"></div>
        </div>
        <div className="mb-1">
          <div className="mb-1">{duplicateCount} duplicate</div>

          <ProgressBar variant="danger" now={duplicatePercent} />
          <div className="fst-italic text-center">{`${duplicatePercent}%`}</div>
        </div>
        <div className="ps-2 pe-2">
          <div className="border-bottom border-light mb-3"></div>
        </div>
      </div>
      <div className="statusStats">
      <div className="mb-1">
          <div className="mb-1">{openCount} open</div>
          <ProgressBar variant="success" now={openPercent} />
          <div className="fst-italic text-center">{`${openPercent}%`}</div>
        </div>
        <div className="ps-2 pe-2">
          <div className="border-bottom border-light mb-3"></div>
        </div>
        <div className="mb-1">
          <div className="mb-1">{closedCount} closed</div>
          <ProgressBar variant="danger" now={closedPercent} />
          <div className="fst-italic text-center">{`${closedPercent}%`}</div>
        </div>
        <div className="ps-2 pe-2">
          <div className="border-bottom border-light mb-3"></div>
        </div>
      </div>
    </div>
  );
}

export default BugStatistics;
