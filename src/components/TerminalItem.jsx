function TerminalItem({ terminal, index, onUpdate, onRemove }) {
  const handleCwdChange = (e) => {
    onUpdate(index, { ...terminal, cwd: e.target.value });
  };

  const handleCommandChange = (e) => {
    onUpdate(index, { ...terminal, command: e.target.value });
  };

  return (
    <div className="terminal-input-item">
      <span className="item-number">{index + 1}</span>
      <div className="input-group">
        <label>工作目录</label>
        <input
          type="text"
          value={terminal.cwd || ''}
          onChange={handleCwdChange}
          placeholder="输入工作目录"
        />
      </div>
      <div className="input-group">
        <label>启动命令</label>
        <input
          type="text"
          value={terminal.command || ''}
          onChange={handleCommandChange}
          placeholder="输入启动命令（可选）"
        />
      </div>
      <button className="btn btn-sm btn-danger" onClick={() => onRemove(index)}>
        删除
      </button>
    </div>
  );
}

export default TerminalItem;
