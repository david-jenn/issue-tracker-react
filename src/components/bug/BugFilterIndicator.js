import { useState, useEffect } from 'react';
import _ from 'lodash';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { FaDoorOpen, FaDoorClosed, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';
import { AiFillWarning } from 'react-icons/ai';
import { HiDuplicate } from 'react-icons/hi';
import { GrStatusUnknown } from 'react-icons/gr';

import './BugFilterIndicator.css';

function BugFilterIndicator({ bugs }) {
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

  const openIcon = (
    <div className="">
      <FaDoorOpen className="" />
    </div>
  );
  const closedIcon = (
    <div className="">
      <FaDoorClosed className="" />
    </div>
  );
  const approvedIcon = (
    <div className="">
      <FaCheckCircle className="" />
    </div>
  );
  const unApprovedIcon = (
    <div className="">
      <AiFillWarning className="" />
    </div>
  );
  const unclassifiedIcon = (
    <div className="">
      <FaQuestionCircle className="" />
    </div>
  );
  const duplicateIcon = (
    <div className="">
      <HiDuplicate className="" />
    </div>
  );

  useEffect(() => {
    calcStats(bugs);
    console.log('reload')
  },);

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
      setUnclassifiedPercent(((unclassifiedCount / totalBugs) * 100).toFixed(1));

      setDuplicateCount(duplicateArray.length);
      setDuplicatePercent(((duplicateCount / totalBugs) * 100).toFixed(1));

      setOpenCount(openArray.length);
      setOpenPercent(((openCount / totalBugs) * 100).toFixed(1));

      setClosedCount(closedArray.length);
      setClosedPercent(((closedCount / totalBugs) * 100).toFixed(1));
    } else {
      setApprovedCount(0);
      setApprovedPercent(0);
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
    <div className="mb-1">
      <div className="mb-1">
        {/* <div>Classification Meter</div> */}
        <ProgressBar>
          <ProgressBar variant="success" now={approvedPercent} label={approvedIcon} key={1} />
          <ProgressBar variant="danger" now={duplicatePercent} label={duplicateIcon} key={2} />
          <ProgressBar variant="warning" now={unclassifiedPercent} label={unclassifiedIcon} key={3} />
          <ProgressBar variant="danger" now={unapprovedPercent} label={unApprovedIcon} key={4} />
        </ProgressBar>
      </div>
      {/* <div>
        <div>Status Meter</div>
        <ProgressBar>
          <ProgressBar variant="success" now={openPercent} label={openIcon} key={1} />
          <ProgressBar variant="danger" now={closedPercent} label={closedIcon} key={2} />
        </ProgressBar>
      </div> */}
    </div>
  );
}

export default BugFilterIndicator;
