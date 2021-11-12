function BugEditor({ bug }) {
  return (
    <div>
      <div>Bug Editor</div>
      <div>{bug.title}</div>
      <div>{bug.author}</div>
      <div>{bug.status}</div>
      <div>{bug.dateCreated}</div>
    </div>
  );
}

export default BugEditor;
