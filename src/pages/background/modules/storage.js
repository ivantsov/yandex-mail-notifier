const chromeStore = chrome.storage.sync;

export default {
  getAll() {
    return new Promise(resolve => {
      chromeStore.get(null, data => {
        const parsedData = Object.keys(data).reduce((obj, key) => {
          try {
            // eslint-disable-next-line no-param-reassign
            obj[key] = JSON.parse(data[key]);
          } catch (err) {
            // swallow
          }

          return obj;
        }, {});

        resolve(parsedData);
      });
    });
  },
  set(name, value) {
    chromeStore.set({[name]: JSON.stringify(value)});
  },
  remove(name) {
    chromeStore.remove(name);
  },
  clear() {
    chromeStore.clear();
  },
};
