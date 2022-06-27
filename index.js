import { createReadStream } from 'node:fs';
import { randomKey, encryptTheKey } from './flow.js';
import { getFiles } from './util.js';

const key = randomKey();

// step 1: encrypt the key.
const keyEnc = encryptTheKey(key);

const files = await getFiles();