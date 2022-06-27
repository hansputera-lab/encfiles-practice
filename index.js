import { createReadStream } from 'node:fs';
import { randomKey, encryptTheKey } from './flow.js';
import { getFiles, initFilesOut } from './util.js';

// step 1: prepare variables, and files.
initFilesOut(); // initialize 'files.out' directory.
const key = randomKey();

// step 2: encrypt the key.
const keyEnc = encryptTheKey(key);

// step 2.5: read files.
const files = await getFiles();

for (const file of files) {
	const readStreamFile = createReadStream(file);
}
