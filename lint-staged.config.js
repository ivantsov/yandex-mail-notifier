module.exports = {
  '*.{js,json,less}': ['prettier --write', 'npm run lint', 'git add'],
};
