import { createReadStream, createWriteStream } from 'node:fs';
import { randomKey, encryptTheKey, encryptStream } from './flow.js';
import { getFiles, initFilesOut } from './util.js';

// step 1: prepare variables, and files.
initFilesOut(); // initialize 'files.out' directory.
const key = randomKey();

// step 2: encrypt the key.
const keyEnc = encryptTheKey(key);

// step 2.5: read files.
const files = await getFiles();

for (const file of files) {
    const { stream } = encryptStream(createReadStream(file, {
        'autoClose': true,
    }), key);

    const writeFileStream = createWriteStream(file.replace('files', 'files.out'), {
        'autoClose': true,
    });

    stream.pipe(writeFileStream);
    stream.on('close', () => {
        writeFileStream.close((err) => {
            console.log(err);
        });
    });
}
