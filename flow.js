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
 * @return {Buffer}
 */
export const encryptTheKey = (key) => {
	const publicKey = toKeyObject('public', getKey('public'));

	return crypto.publicEncrypt(publicKey, key);
};

/**
 * Restore the encrypted key.
 * @param {string} encrypted Encrypted key by hex.
 * @return {Buffer}
 */
export const restoreKey = (encrypted) => {
	encrypted = Buffer.from(encrypted, 'hex');
	const privateKey = toKeyObject('private', getKey('private'));
	return crypto.privateDecrypt(privateKey, encrypted);
};

// Symetric encryption..
/**
 *
 * @param {ReadStream} stream File stream.
 * @param {string} sharedKey Shared secret key.
 * @return {{ stream: ReadStream, c: ReturnType<typeof createCipher> }} input file stream.
 */
export const encryptStream = (stream, sharedKey) => {
	const c = createCipher(sharedKey);
	stream.pipe(c.cipher);

	return {
		stream,
		c,
	};
};
