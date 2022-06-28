import { createReadStream, createWriteStream } from 'node:fs';
import { randomKey, encryptTheKey } from './flow.js';
import { createCipher } from './syme.js';
import { getFiles, initFilesOut } from './util.js';
import zlib from 'node:zlib';
import { channel } from './receiver.js';

// step 1: prepare variables, and files.
initFilesOut(); // initialize 'files.out' directory.
const key = randomKey();

// step 2: encrypt the key.
const keyEnc = await encryptTheKey(key);

// step 2.5: read files.
const files = await getFiles();

// step 3: encrypt.
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
	const compressor = zlib.createDeflateRaw({
		level: zlib.constants.Z_BEST_SPEED,
		flush: zlib.constants.Z_SYNC_FLUSH,
	});

	stream.pipe(compressor).pipe(c.cipher).pipe(writeFileStream);

	stream.on('close', () => {
		console.log(file, 'encrypted and compressed');
		writeFileStream.close();

		// send to client/receiver to decrypt it.
		channel.emit('file', {
			'key': keyEnc.toString('hex'),
			'iv': c.iv.toString('hex'),
			'filePath': file.replace('files', 'files.out'),
		});
	});
}
