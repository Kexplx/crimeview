const SET = 'abcdefghijklmnopqrstuvwxyz';
const LENGTH = 10;

export function shortid(): string {
  return [...Array(LENGTH)].map(() => SET[Math.floor(Math.random() * SET.length)]).join('');
}
