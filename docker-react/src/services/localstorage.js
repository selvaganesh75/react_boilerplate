export const _storage = {
  getItem: item => JSON.parse(localStorage.getItem(item) || '{}'),
  setItem: (key, item) => localStorage.setItem(key, JSON.stringify(item)),
};
