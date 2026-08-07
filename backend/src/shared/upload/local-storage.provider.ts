import type { IStorageProvider } from './storage.provider.interface.js';
import fs from 'fs';
import path from 'path';

export class LocalStorageProvider implements IStorageProvider {
  private baseDir = path.join(process.cwd(), 'public', 'uploads');

  constructor() {
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    folder = 'misc',
  ): Promise<string> {
    const targetDir = path.join(this.baseDir, folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Since multer usually saves to a temp location or buffers, we need to handle it.
    // Assuming multer is configured with MemoryStorage or DiskStorage.
    // If it's buffer (MemoryStorage), write it.
    const filename = `${Date.now()}-${file.originalname.replace(/\\s+/g, '-')}`;
    const destinationPath = path.join(targetDir, filename);

    if (file.buffer) {
      fs.writeFileSync(destinationPath, file.buffer);
    } else if (file.path) {
      fs.copyFileSync(file.path, destinationPath);
      fs.unlinkSync(file.path);
    }

    return `/uploads/${folder}/${filename}`;
  }

  async deleteFile(url: string): Promise<void> {
    const relativePath = url.replace(/^.uploads./, '');
    const absolutePath = path.join(this.baseDir, relativePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  }
}
