export function greeter(name: string) {
  return `Hello, ${name}`;
}

console.log(greeter('John Smith'));


async function AsyncHello() {
  return 'Hello';
}

async function main() {
  const temp = await AsyncHello();
  console.log(temp);
}

main()
  .then(() => {
    console.log('Application successfully terminated with exit code: 0');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });



