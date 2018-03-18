import sessionId from '../session-generator';

const chars = '[0-9A-F]';

describe('utils/session-generator', () => {
  it('output format is valid', () => {
    const regexp = new RegExp(`^${chars}{8}-${chars}{4}-${chars}{4}-${chars}{4}-${chars}{12}$`);
    expect(sessionId).toEqual(expect.stringMatching(regexp));
  });
});
