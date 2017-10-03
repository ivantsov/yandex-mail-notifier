export const folders = [{
  id: '0123',
  symbol: 'spam',
}, {
  id: '0234',
  symbol: 'inbox',
}, {
  id: '0345',
  symbol: 'draft',
}];

export const messages = [{
  id: '123',
  subject: '',
  from: {
    name: '',
    email: 'sender@test.com 123',
  },
  firstline: 'test message 123',
  date: new Date(),
  fid: folders[0].id,
}, {
  id: '234',
  subject: 'No subject',
  from: {
    name: 'Sender 345',
    email: '',
  },
  firstline: 'test message 234',
  date: new Date(),
  fid: folders[1].id,
}, {
  id: '345',
  subject: 'test subject 345',
  from: {
    name: 'Sender 345',
    email: 'sender@test.com 345',
  },
  firstline: 'test message 345',
  date: new Date(),
  fid: folders[2].id,
}];
