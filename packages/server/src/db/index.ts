import Path from 'path'
import lodash from 'lodash';
import {
  Low,
  JSONFile,
} from 'lowdb'

import {
  Players,
} from '../models.js';

class LowDash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data');
}

const __dirname = process.cwd();

async function initializeDB() {
  const dbDir = Path.join(__dirname, 'db');

  const playersFile = Path.join(dbDir, 'players.json');
  const playersAdapter = new JSONFile<Players>(playersFile);
  const playersDB = new LowDash(playersAdapter);

  await playersDB.read();
  playersDB.data ||= {};

  return {
    playersDB,
  };
}

export const { playersDB } = await initializeDB();
