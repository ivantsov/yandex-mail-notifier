const mask = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
const availableChars = '0123456789ABCDEF';

function generateSessionId() {
  return mask
    .split('')
    .map(char => {
      if (char === 'x') {
        return availableChars[Math.floor(16 * Math.random())];
      }

      return char;
    })
    .join('');
}

export default generateSessionId();
