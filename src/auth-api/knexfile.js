module.exports = {
    db: {
        client: 'pg',
        connection: {
            host: 'auth-db', //localhost
            user: 'sd',
            password: 'sd',
            database: 'sd',
            port:'5432' //15432
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        }
    }
};