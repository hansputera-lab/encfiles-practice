/**
 * Flow data.
 */

import * as crypto from 'node:crypto';
import { getKey, toKeyObject } from './rsa.js';

/**
 * Random key (UUID)
 * @return {string}
 */
export const randomKey = () => crypto.randomUUID();

// Asymetric..
/**
 * Encrypt the key using public key.
 * @param {string} key The key want to encrypt.
 * @return {Buffer}
 */
export const encryptTheKey = (key) => {
	const publicKey = toKeyObject(getKey('public'));

	return crypto.publicEncrypt(publicKey, key);
};

/**
 * Restore the encrypted key.
 * @param {string} encrypted Encrypted key by hex.
 * @return {Buffer}
 */
export const restoreKey = (encrypted) => {
	encrypted = Buffer.from(encrypted, 'hex');
	const privateKey = toKeyObject(getKey('private'));
	return crypto.privateDecrypt(privateKey, encrypted);
};
