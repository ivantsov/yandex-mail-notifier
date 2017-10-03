import resolveUrl from '../url-resolver';
import store from '../../redux/store';

jest.mock('../../redux/store', () => ({
  getState: jest.fn(() => ({
    settings: {
      preferredDomain: 'testdomain',
    },
  })),
}));

describe('utils/url-resolve', () => {
  it('doesnt change string without pattern', () => {
    const input = 'https://link-without-pattern.com';

    expect(resolveUrl(input)).toBe(input);
  });

  it('change string with pattern', () => {
    const input = 'https://link-without-pattern.{domain}';
    const domain = store.getState().settings.preferredDomain;

    expect(resolveUrl(input)).toBe('https://link-without-pattern.{domain}'.replace('{domain}', domain));
  });
});
