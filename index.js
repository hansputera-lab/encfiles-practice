import { createReadStream, createWriteStream } from 'node:fs';
import { randomKey, encryptTheKey } from './flow.js';
import { createCipher } from './syme.js';
import { getFiles, initFilesOut } from './util.js';

// step 1: prepare variables, and files.
initFilesOut(); // initialize 'files.out' directory.
const key = randomKey();

// step 2: encrypt the key.
const keyEnc = await encryptTheKey(key);

// step 2.5: read files.
const files = await getFiles();

for (const file of files) {
	// symetric encryption..
    const stream = createReadStream(file, {
		'autoClose': true,
	});
	const writeFileStream = createWriteStream(
		file.replace('files', 'files.out'),
		{
			'autoClose': true,
		},
	);
	const c = createCipher(key);

	stream.pipe(c.cipher).pipe(writeFileStream);

	stream.on('finish', () => {
		writeFileStream.close((err) => {
			console.log(err);
		});
	});
}
