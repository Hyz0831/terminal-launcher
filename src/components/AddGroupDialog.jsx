import { useState } from 'react';
import TerminalItem from './TerminalItem';

function AddGroupDialog({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [terminals, setTerminals] = useState([{ cwd: '', command: '' }]);

  if (!isOpen) return null;

  const handleAddTerminal = () => {
    setTerminals([...terminals, { cwd: '', command: '' }]);
  };

  const handleUpdateTerminal = (index, updatedTerminal) => {
    const newTerminals = [...terminals];
    newTerminals[index] = updatedTerminal;
    setTerminals(newTerminals);
  };

  const handleRemoveTerminal = (index) => {
    if (terminals.length > 1) {
      const newTerminals = terminals.filter((_, i) => i !== index);
      setTerminals(newTerminals);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('请输入终端组名称');
      return;
    }

    const validTerminals = terminals.map(t => ({
      cwd: t.cwd.trim() || undefined,
      command: t.command.trim() || undefined
    }));

    onSave({
      name: name.trim(),
      description: description.trim() || undefined,
      terminals: validTerminals
    });

    setName('');
    setDescription('');
    setTerminals([{ cwd: '', command: '' }]);
    onClose();
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setTerminals([{ cwd: '', command: '' }]);
    onClose();
  };

  return (
    <div className="dialog-overlay" onClick={handleClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>添加终端组</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <div className="dialog-body">
          <div className="input-group">
            <label>名称 *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入终端组名称"
            />
          </div>

          <div className="input-group">
            <label>描述</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="输入描述（可选）"
            />
          </div>

          <div className="terminals-section">
            <h3>终端配置</h3>
            {terminals.map((terminal, index) => (
              <TerminalItem
                key={index}
                terminal={terminal}
                index={index}
                onUpdate={handleUpdateTerminal}
                onRemove={handleRemoveTerminal}
              />
            ))}
            <button className="btn btn-secondary btn-sm" onClick={handleAddTerminal}>
              + 添加终端
            </button>
          </div>
        </div>

        <div className="dialog-footer">
          <button className="btn btn-secondary" onClick={handleClose}>
            取消
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddGroupDialog;
