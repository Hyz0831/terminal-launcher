import { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import TerminalGroup from './components/TerminalGroup';
import AddGroupDialog from './components/AddGroupDialog';
import { getGroups, saveGroups } from './utils/storage';
import './styles/app.css';

function App() {
  const [groups, setGroups] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setGroups(getGroups());
  }, []);

  const handleAddGroup = (group) => {
    const newGroups = [...groups, group];
    setGroups(newGroups);
    saveGroups(newGroups);
  };

  const handleDeleteGroup = (index) => {
    const newGroups = groups.filter((_, i) => i !== index);
    setGroups(newGroups);
    saveGroups(newGroups);
  };

  const handleStartGroup = (terminals) => {
    window.electronAPI.openTerminals(terminals);
  };

  return (
    <div className="app">
      <Toolbar onAdd={() => setIsDialogOpen(true)} />
      
      <div className="main-content">
        {groups.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📱</div>
            <p>暂无终端组</p>
            <button className="btn btn-primary" onClick={() => setIsDialogOpen(true)}>
              创建第一个终端组
            </button>
          </div>
        ) : (
          <div className="groups-grid">
            {groups.map((group, index) => (
              <TerminalGroup
                key={index}
                group={group}
                index={index}
                onDelete={handleDeleteGroup}
                onStart={handleStartGroup}
              />
            ))}
          </div>
        )}
      </div>

      <AddGroupDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleAddGroup}
      />
    </div>
  );
}

export default App;
