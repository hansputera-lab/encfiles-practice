/**
 * Flow data.
 */

/** @typedef {import('node:fs').ReadStream} ReadStream */

import * as crypto from 'node:crypto';
import { getKey, toKeyObject } from './rsa.js';

/**
 * Random key (UUID)
 * @return {Buffer}
 */
export const randomKey = () => crypto.scryptSync(
	crypto.randomUUID(), crypto.randomBytes(16), 32
);

// Asymetric..
/**
 * Encrypt the key using public key.
 * @param {string} key The key want to encrypt.
 * @return {Promise<Buffer>}
 */
export const encryptTheKey = async (key) => {
	const publicKey = toKeyObject('public', await getKey('public'));

	return crypto.publicEncrypt(publicKey, key);
};

/**
 * Restore the encrypted key.
 * @param {Buffer} encrypted Encrypted key by hex.
 * @return {Promise<Buffer>}
 */
export const restoreKey = async (encrypted) => {
	const privateKey = toKeyObject('private', await getKey('private'));
	return crypto.privateDecrypt(privateKey, encrypted);
};
