module.exports = {
    db: {
        client: 'pg',
        connection: {
            host: 'localhost', //localhost , auth-db
            port: '15432',
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