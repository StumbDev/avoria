import express from 'express';
import path from 'path';
import chalk from 'chalk';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (_req: any, res: { sendFile: (arg0: string) => void; }) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(chalk.magentaBright(`🚀 Avoria Started!`))
  console.log(`Avoria is on port ${port}`);
});