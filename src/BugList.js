import { useEffect, useState } from 'react';
import _ from 'lodash';
import BugListItem from './BugListItem';
import axios from 'axios';


import SelectField from './SelectField';

import BugStatistics from './components/bug/BugStatistics';
import BugFilterIndicator from './components/bug/BugFilterIndicator';
import './BugList.css';

function BugList({ auth, showError }) {
  
  const [pending, setPending] = useState(false);
  const [bugs, setBugs] = useState(null);
  const [error, setError] = useState('');
  const [classification, setClassification] = useState('');

  const [displayFilter, setDisplayFilter] = useState(false);
  const [displayStats, setDisplayStats] = useState(true);

  const [keywords, setKeywords] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [open, setOpen] = useState('true');
  const [closed, setClosed] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [rerenderCount, setRerenderCount] = useState(0);
  

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    setTimeout(() => setRerenderCount(rerenderCount + 1), 500);
  }

  function onStatusChange(evt) {
    console.log(evt.currentTarget.value);
    if (evt.currentTarget.value === 'open') {
      setClosed(false);
      setOpen(true);
    } else if (evt.currentTarget.value === 'closed') {
      setClosed(true);
      setOpen(false);
    } else {
      setClosed(true);
      setOpen(true);
    }

    setTimeout(() => {
      setRerenderCount(rerenderCount + 1);
    }, 500);
  }

  function toggleDisplay(evt, value, setValue) {
    evt.preventDefault();
    if (value) {
      setValue(false);
    } else {
      setValue(true);
    }
  }

  function fetchSearchResults() {
    console.log('fetch');
    setPending(true);
    setError('');

    if (!auth) {
      return;
    }
    axios(`${process.env.REACT_APP_API_URL}/api/bug/list`, {
      method: 'get',
      params: { pageSize: 1000, classification, minAge, maxAge, closed, open, sortBy, keywords },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPending(false);
        if (_.isArray(res.data)) {
          setBugs(res.data);
        } else {
          setError('Expected an array');
        }
      })
      .catch((err) => {
        setPending(false);
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x, index) => <div key={index}>{x.message}</div>));
            showError(_.map(resError.details, (x) => x.message));
            for (const detail of resError.details) {
              showError(detail.message);
            }
          } else {
            setError(JSON.stringify(resError));
            showError(JSON.stringify(resError));
          }
        } else {
          setError(err.message);
          showError(err.message);
        }
      });
  }

  function onSubmit(evt) {
    evt.preventDefault();
    fetchSearchResults();
  }

  useEffect(() => {
    fetchSearchResults();
  }, [auth, rerenderCount]);

  return (
    <div className="">
      <h1 className="mb-3">Bug List</h1>
      <form className="mb-3">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="Keywords"
            name="keywords"
            value={keywords}
            onChange={(evt) => onInputChange(evt, setKeywords)}
          />
          <button className="btn btn-primary" type="submit" id="button-addon2" onClick={(evt) => onSubmit(evt)}>
            Search
          </button>
        </div>
        <div className="loadingRow d-flex align-content-center">
          <a
            href="/"
            className="text-info fst-italic"
            onClick={(evt) => toggleDisplay(evt, displayFilter, setDisplayFilter)}
          >
            show/hide filters
          </a>
          {pending && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </form>

      <div className="filterListContainer d-flex row">
        <div className={displayFilter ? 'filterContainer mb-3 d-md-flex' : 'd-none'}>
          <SelectField
            label="Classification"
            id="classificationFilter"
            error=""
            className="me-2"
            onChange={(evt) => onInputChange(evt, setClassification)}
            children={[
              <option key="all" value="">
                All
              </option>,
              <option key="unclassified" value="unclassified">
                Unclassified
              </option>,
              <option key="approved" value="approved">
                Approved
              </option>,
              <option key="unapproved" value="unapproved">
                Unapproved
              </option>,
              <option key="duplicate" value="duplicate">
                Duplicate
              </option>,
            ]}
          />

          <SelectField
            label="Min Age"
            id="minAgeFilter"
            error=""
            onChange={(evt) => onInputChange(evt, setMinAge)}
            children={[
              <option key="all" value="">
                All
              </option>,
              <option key="1" value="1">
                1-day
              </option>,
              <option key="7" value="7">
                7-days
              </option>,
              <option key="30" value="30">
                30-days
              </option>,
              <option key="60" value="60">
                60-days
              </option>,
              <option key="90" value="90">
                90-days
              </option>,
            ]}
          />

          <SelectField
            label="Max Age"
            id="maxAgeFilter"
            error=""
            onChange={(evt) => onInputChange(evt, setMaxAge)}
            children={[
              <option key="all" value="">
                All
              </option>,
              <option key="1" value="1">
                1-day
              </option>,
              <option key="7" value="7">
                7-days
              </option>,
              <option key="30" value="30">
                30-days
              </option>,
              <option key="60" value="60">
                60-days
              </option>,
              <option key="90" value="90">
                90-days
              </option>,
            ]}
          />

          <SelectField
            label="Status"
            id="statusFilter"
            error=""
            onChange={(evt) => onStatusChange(evt)}
            children={[
              <option key="open" value="open">
                Open
              </option>,
              <option key="closed" value="closed">
                Closed
              </option>,
              <option key="all" value="all">
                All
              </option>,
            ]}
          />

          <SelectField
            label="Sort By"
            id="sortBy"
            error=""
            onChange={(evt) => onInputChange(evt, setSortBy)}
            children={[
              <option key="newest" value="newest">
                Newest
              </option>,
              <option key="oldest" value="oldest">
                Oldest
              </option>,
              <option key="title" value="title">
                Title
              </option>,
              <option key="classification" value="classification">
                Classification
              </option>,
              <option key="assignedTo" value="assignedTo">
                User Assigned
              </option>,
              <option key="createdBy" value="createdBy">
                Author
              </option>,
            ]}
          />
        </div>
        {bugs && <BugFilterIndicator bugs={bugs} />}

        <div className={displayStats ? 'bugSummariesSection col-md-9' : 'bugSummariesSection'}>
          {error && <div className="fs-3 text-danger">{error}</div>}
          {displayStats && <div className="spacer"></div> }
          {!displayStats && <div className="spacer text-right">
            <div className="d-none d-md-flex justify-content-end">
          <a
              href="/"
              className="text-info fst-italic mb-1"
              onClick={(evt) => toggleDisplay(evt, displayStats, setDisplayStats)}
            >
              show/hide stats
            </a>
            </div>
          </div> }
         { bugs && bugs.length > 0 && <div>
            {_.map(bugs, (bug) => (
              <BugListItem key={bug._id} bug={bug} />
            ))}
          </div> }
          {bugs && bugs.length === 0 && <div className="border-bottom border-light fst-italic">No Bugs Found</div>}
        </div>
        <div className={displayStats ? "col-md-3" : ""}>
          <div className="d-flex justify-content-end">
            <a
              href="/"
              className="text-info fst-italic mb-1"
              onClick={(evt) => toggleDisplay(evt, displayStats, setDisplayStats)}
            >
              show/hide stats
            </a>
          </div>
          {bugs && <BugStatistics bugs={bugs} />}
        </div>
      </div>
    </div>
  );
}

export default BugList;
