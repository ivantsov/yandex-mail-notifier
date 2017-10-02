function addNil(value) {
  return value < 10 ? `0${value}` : value;
}

function text(key, ...args) {
  return chrome.i18n.getMessage(key.replace(/\./g, '_'), args);
}

function parseDate(value) {
  const localDate = new Date(value);
  const timezone = localDate.getTimezoneOffset() * 60 * 1000; // in milliseconds

  return new Date(localDate.valueOf() + timezone);
}

function date(value) {
  const date = parseDate(value); // eslint-disable-line no-shadow
  const currentDate = new Date();
  let yearPostfix = '';

  if (currentDate.toDateString() === date.toDateString()) {
    const hour = addNil(date.getHours());
    const min = addNil(date.getMinutes());

    return `${hour}:${min}`;
  } else if (currentDate.getYear() !== date.getYear()) {
    yearPostfix = ` ${date.getFullYear()}`;
  }

  const month = text(`popup.months.${date.getMonth()}`);

  return `${date.getDate()} ${month}${yearPostfix}`;
}

export default {
  text,
  date,
};
