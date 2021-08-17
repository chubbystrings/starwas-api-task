/* eslint-disable no-console */
import app from './app';

const port = parseInt(process.env.PORT, 10) || 4500;
app.listen(port, () => console.log(`star-waz server ready at ${port}`));
