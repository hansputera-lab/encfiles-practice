import { EventEmitter } from 'node:events';
import { createReadStream, createWriteStream } from 'node:fs';
import { basename, resolve } from 'node:path';
import { constants as zlibConst, createInflateRaw } from 'node:zlib';
import { restoreKey } from './flow.js';
import { createDecipher } from './syme.js';

export const channel = new EventEmitter();

channel.on(
	'file',
	/**
	 * @param {{key: string, iv: string, filePath: string}} param0 File args.
	 */
	async ({ key, iv, filePath }) => {
		// we need to restore the key.
		key = await restoreKey(Buffer.from(key, 'hex'));

		const decipher = createDecipher(Buffer.from(iv, 'hex'), key);

		// step 4: decrypt file.
		const readFileStream = createReadStream(filePath, {
			'autoClose': true,
		});
		const piped = createWriteStream(
			resolve(filePath, '..', basename(filePath).concat('.dec')),
		);

		const decompressor = createInflateRaw({
			level: zlibConst.Z_BEST_SPEED,
			flush: zlibConst.Z_SYNC_FLUSH,
		});

		readFileStream.pipe(decipher).pipe(decompressor).pipe(piped);
	},
);
