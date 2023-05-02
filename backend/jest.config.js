/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	globalSetup: '<rootDir>/tests/setup.ts',
	globalTeardown: '<rootDir>/tests/teardown.ts',
	setupFilesAfterEnv: ['<rootDir>/tests/runAfterEnv.ts'],
}
