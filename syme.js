/**
 * Symetric encryption.
 */

import * as crypto from 'node:crypto';

/**
 * Create cipher data.
 * @param {string} key secret key.
 * @return {{ cipher: crypto.Cipher, iv: Buffer, key: Buffer }}
 */
export const createCipher = (key) => {
	const iv = crypto.randomBytes(16);

	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

	return {
		cipher,
		iv,
		key,
	};
};

/**
 * Create decipher.
 * @param {Buffer} iv IV Cipher.
 * @param {Buffer} key Cipher key.
 * @return {crypto.Decipher}
 */
export const createDecipher = (iv, key) => {
	return crypto.createDecipheriv('aes-256-cbc', key, iv);
};
