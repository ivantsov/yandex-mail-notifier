import store from '../redux/store';

export default function (url) {
  const currentDomain = store.getState().settings.preferredDomain;

  return url.replace('{domain}', currentDomain);
}
