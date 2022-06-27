import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { secretKey } from './env.js';

const keyPair = crypto.generateKeyPairSync('rsa', {
	modulusLength: 2048,
	publicKeyEncoding: {
		type: 'pkcs1',
		format: 'pem',
	},
	privateKeyEncoding: {
		type: 'pkcs1',
		format: 'pem',
		cipher: 'aes-256-cbc',
		passphrase: secretKey,
	},
});

if (!fs.existsSync(resolve(cwd(), 'keys')))
	fs.mkdirSync(resolve(cwd(), 'keys'));

fs.writeFileSync(resolve(cwd(), 'keys', 'private.pem'), keyPair.privateKey);

fs.writeFileSync(resolve(cwd(), 'keys', 'public.pem'), keyPair.publicKey);
