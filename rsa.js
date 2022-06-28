import * as crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { secretKey } from './env.js';

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

/**
 * Convert key contents to crypto.KeyObject
 * @param {string} type Key type.
 * @param {string} keyStr Key contents.
 * @return {crypto.KeyObject | undefined}
 */
export const toKeyObject = (type, keyStr) => {
	if (type === 'private')
		return crypto.createPrivateKey({
			'key': keyStr,
			'passphrase': secretKey,
		});
	else if (type === 'public') return crypto.createPublicKey(keyStr);
	else return undefined;
};
