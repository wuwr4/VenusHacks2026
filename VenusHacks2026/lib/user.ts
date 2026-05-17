let storedName = '';

export function setUserName(name: string) {
  storedName = name.trim();
}

export function getUserName() {
  return storedName || 'Mom';
}
