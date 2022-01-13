import { greeter } from './Greeter';

describe('greeter function', () => {
  it('when called with argument John, then returns `Hello, John message`', async () => {
    const name = 'John';

    const response = await greeter(name);

    expect(response).toBe(`Hello, ${name}`);
  });

  it('when called without argument, then returns `Hello, John Done message`', async () => {
    const response = await greeter();

    expect(response).toBe(`Hello, John Doe`);
  });
});
