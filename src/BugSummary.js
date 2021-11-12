function BugSummary({ bug, onNavigate, getBug }) {
  
   function showEditPage(evt, bug) {
     getBug(evt, bug);
     onNavigate(evt, `/bug/edit/${bug._id}`);
   }

  return (
    <div
      id={`bug-${bug._id}`}
      className=" d-flex mb-1 flex-grow-1 flex-shrink-1 flex-column flex-sm-row border border-dark p-1 bg-light text-dark"
      onClick={(evt) => showEditPage(evt, bug)} 
    >
      <div className="me-3 flex-grow-1 flex-shrink-1">{bug.title}</div>
      <div className="me-3 flex-shrink-0">{bug.author}</div>
      <div className="me-3 flex-shrink-1">{bug.dateFormatted}</div>
      <div className="me-3 flex-shrink-1">{bug.status}</div>
    </div>
  );
}

export default BugSummary;
