const STORAGE_KEY = 'terminal-launcher-groups';

function getGroups() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveGroups(groups) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
    return true;
  } catch {
    return false;
  }
}

function addGroup(group) {
  const groups = getGroups();
  groups.push(group);
  return saveGroups(groups);
}

function updateGroup(index, group) {
  const groups = getGroups();
  if (index >= 0 && index < groups.length) {
    groups[index] = group;
    return saveGroups(groups);
  }
  return false;
}

function deleteGroup(index) {
  const groups = getGroups();
  if (index >= 0 && index < groups.length) {
    groups.splice(index, 1);
    return saveGroups(groups);
  }
  return false;
}

module.exports = {
  getGroups,
  saveGroups,
  addGroup,
  updateGroup,
  deleteGroup
};
