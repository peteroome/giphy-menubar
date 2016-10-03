import { argv } from 'yargs';

export function getEnvName() {
  return argv.env || 'development';
}

export function beepSound() {
  process.stdout.write('\u0007');
}
