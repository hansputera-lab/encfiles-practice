import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

/**
 * Get private key contents.
 * @param {string} type Key type.
 * @return {Promise<string | undefined>}
 */
export const getKey = async (type) => {
	try {
		return await readFile(resolve(cwd(), 'keys', type.concat('.pem')), {
			'encoding': 'utf8',
		});
	} catch {
		return undefined;
	}
};
