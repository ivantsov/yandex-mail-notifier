module.exports = {
    rules: {
        'no-console': 'off',
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: false
        }]
    }
};
