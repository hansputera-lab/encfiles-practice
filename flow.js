/**
 * Flow data.
 */

/** @typedef {import('node:fs').ReadStream} ReadStream */

import * as crypto from 'node:crypto';
import { getKey, toKeyObject } from './rsa.js';
import { createCipher, createDecipher } from './syme.js';

/**
 * Random key (UUID)
 * @return {string}
 */
export const randomKey = () => crypto.randomUUID();

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
 * @param {string} encrypted Encrypted key by hex.
 * @return {Promise<Buffer>}
 */
export const restoreKey = async (encrypted) => {
	encrypted = Buffer.from(encrypted, 'hex');
	const privateKey = toKeyObject('private', await getKey('private'));
	return crypto.privateDecrypt(privateKey, encrypted);
};
