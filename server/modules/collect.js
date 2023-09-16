import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export function initCollector() {
  const collectedDataPath = resolve('collected');
  if (!existsSync(collectedDataPath)) {
    mkdirSync(collectedDataPath, { recursive: true });
    console.log('All systems inited');
    console.log('Server will collect data');
  }
}
