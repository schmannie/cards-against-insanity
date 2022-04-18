import Path from 'path'
import lodash from 'lodash';
import {
  Low,
  Memory,
  JSONFile,
} from 'lowdb'

class LowDash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data');
}

const __dirname = process.cwd();
const dbDir = Path.join(__dirname, 'db');

async function initializeDB() {

  // const playersFile = Path.join(dbDir, 'players.json');
  // const playersAdapter = new JSONFile<Players>(playersFile);
  // const playersDB = new LowDash(playersAdapter);

  // await playersDB.read();
  // playersDB.data ||= {};

  return {};
}

export const {} = await initializeDB();
