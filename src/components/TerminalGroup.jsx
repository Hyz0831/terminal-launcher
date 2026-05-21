function TerminalGroup({ group, onDelete, onStart, index }) {
  const handleStart = () => {
    window.electronAPI.openTerminals(group.terminals);
  };

  const handleDelete = () => {
    if (confirm(`确定删除 "${group.name}"?`)) {
      onDelete(index);
    }
  };

  return (
    <div className="terminal-group">
      <div className="group-header">
        <h3>{group.name}</h3>
        <div className="group-actions">
          <button className="btn btn-primary" onClick={handleStart}>
            启动
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            删除
          </button>
        </div>
      </div>

      {group.description && (
        <p className="group-description">{group.description}</p>
      )}

      <div className="terminal-list">
        {group.terminals.map((terminal, idx) => (
          <div key={idx} className="terminal-item">
            <span className="terminal-icon">📦</span>
            <div className="terminal-info">
              <div className="terminal-cwd">{terminal.cwd || '当前目录'}</div>
              {terminal.command && (
                <div className="terminal-command">{terminal.command}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TerminalGroup;
