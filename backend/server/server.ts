import app from './index';
import 'colors';

const PORT = process.env.PORT || '3333';

app.listen(PORT, () =>
  console.log(`Server is up and running on ${PORT}`.green)
);
