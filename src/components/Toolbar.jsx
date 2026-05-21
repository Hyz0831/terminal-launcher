function Toolbar({ onAdd }) {
  return (
    <div className="toolbar">
      <h1>Terminal Launcher</h1>
      <button className="btn btn-primary" onClick={onAdd}>
        + 添加终端组
      </button>
    </div>
  );
}

export default Toolbar;
