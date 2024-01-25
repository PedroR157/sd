module.exports = {
    db: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'sd',
            password: 'sd',
            database: 'sd'
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        },
        seeds: {
            directory: './seeds',
        },
    },
};