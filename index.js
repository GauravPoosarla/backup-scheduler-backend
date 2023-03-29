const express = require('express');
const backupRouter = require('./src/routes/backup');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', backupRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
