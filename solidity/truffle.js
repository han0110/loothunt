module.exports = {
    contracts_build_directory: './tests/generated-artifacts',
    compilers: {
        solc: {
            version: '0.4.25',
            docker: true,
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
            },
        },
    },
}
