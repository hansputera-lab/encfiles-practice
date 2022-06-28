import { EventEmitter } from 'node:events';
import { createReadStream } from 'node:fs';
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

		let buffs = Buffer.alloc(0);
		const decipher = createDecipher(Buffer.from(iv, 'hex'), key);

		// step 4: decrypt file.
		const readFileStream = createReadStream(filePath, {
			'autoClose': true,
		});

        const decompressor = createInflateRaw({
            level: zlibConst.Z_BEST_SPEED,
        });

		readFileStream.pipe(decipher).pipe(decompressor);
	},
);
