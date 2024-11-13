import { fileURLToPath } from 'url';
import path from 'path';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = path.dirname(__filename);