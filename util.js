import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

export async function getFiles() {
	const files = await readdir(resolve(cwd(), 'files'));
	return files.filter((file) => file.endsWith('.file'));
}
