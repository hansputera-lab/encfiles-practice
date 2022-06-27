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
/**
 * Encrypt the key using public key.
 * @param {string} key The key want to encrypt.
 * @return {Buffer}
 */
export const encryptTheKey = (key) => {
    const publicKey = toKeyObject(getKey('public'));
};