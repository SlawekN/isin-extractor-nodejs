import { greeter } from '../src/main';

describe('main function', () => {

  it('greets a user with `Hello, {name}` message', () => {
    const name = "John";

    const response = greeter(name);

    expect(response).toBe(`Hello, ${name}`);
  });
});
