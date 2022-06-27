import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

export async function getFiles() {
	const files = await readdir(resolve(cwd(), 'files'));
	return files
		.filter((file) => file.endsWith('.file'))
		.map((fl) => resolve(cwd(), 'files', fl));
}

/**
 * Init 'files.out' directory.
 * @return {boolean}
 */
export const initFilesOut = () => {
	if (!existsSync(resolve(cwd(), 'files.out'))) {
		mkdirSync(resolve(cwd(), 'files.out'));
		return true;
	} else return false;
};
