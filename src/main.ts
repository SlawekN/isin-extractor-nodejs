import { greeter } from './greeter';

async function main() {
  const message = await greeter();
  console.log(message);
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
