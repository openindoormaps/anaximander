// Project: Open Indoor Maps
// File: src/index.ts


import app from './app';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});