import { createConnection } from 'typeorm';

createConnection()
  .then(response => {
    console.log('Database up'.green);
  })
  .catch(err => {
    console.error(`Database error ${err}`.red);
  });
