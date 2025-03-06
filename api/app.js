import express from 'express';
import config from './config/env.js';
import { routerApi } from './routes/router.js';

const app = express();
app.use(express.json());

routerApi(app);

app.get('/', (req, res) => {
  res.send(`<pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

app.listen(config.PORT, () => {
  console.log(`Server is listening on port:  ${config.PORT}`);
});
