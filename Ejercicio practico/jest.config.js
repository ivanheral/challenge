const {
    compilerOptions
} = require('./tsconfig');
const {
    pathsToModuleNameMapper
} = require('ts-jest');

module.exports = {
    preset: 'jest-preset-angular',
    roots: ['<rootDir>/src/'],
    testMatch: ['**/(*.)+(spec).+(ts)'],
    setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: '<rootDir>/'
    }),
    maxWorkers: 1
};