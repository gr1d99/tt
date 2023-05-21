import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    verbose: true,
    silent: true,
    testTimeout: 5000,
    detectOpenHandles: true,
    openHandlesTimeout: 3000,
    testEnvironment: 'node',
    preset: 'ts-jest',
  };
};