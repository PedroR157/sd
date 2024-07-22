module.exports = {
    db: {
        client: 'pg',
        connection: {
            host: 'auth-db',
            port: '5432',
            user: 'sd',
            password: 'sd',
            database: 'sd'
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        }
    }
};