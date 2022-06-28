import { EventEmitter } from 'node:events';

export const channel = new EventEmitter();

channel.on(
	'file',
	/**
	 * @param {{key: string, iv: string, filePath: string}} param0 File args.
	 */
	({ key, iv, filePath }) => {},
);
