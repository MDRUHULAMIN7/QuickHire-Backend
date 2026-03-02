import type { Server } from 'http';
import app from './app.js';
import config from './app/config/index.js';
import mongoose from 'mongoose';
import seedAdmin from './app/DB/index.js';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    await seedAdmin();
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
  }
}
main();
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection is detected, shutting down ...', reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('uncaughtException is detected, shutting down ...', error);
  process.exit(1);
});
