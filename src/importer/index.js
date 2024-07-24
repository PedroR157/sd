const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const dbConfig = {
    host: 'bl-db',
    port: 5432,
    user: 'sd',
    database: 'sd',
    password: 'sd',
};

// HelloWorld module
const HelloWorld = {
    say: function () {
        console.log("Hello, World!!");
    }
};

// JSONObserver module
const JSONObserver = {
    list: function () {
        console.log("Listing all available JSON files!");
        try {
            const dataPath = path.join(__dirname, 'data');
            console.log(`Checking files in: ${dataPath}`);
            const files = fs.readdirSync(dataPath);
            files.filter(file => file.endsWith(".json")).forEach(this.processFile);
        } catch (error) {
            console.log(`Error accessing /data: ${error}`);
        }
    },

    processFile: function (fileName) {
        console.log(`Processing file: ${fileName}`);
        const filePath = path.join(__dirname, 'data', fileName);
        const content = fs.readFileSync(filePath, 'utf8');
        JSONObserver.parse(content);
    },

    parse: function (content) {
        console.log(`JSON Content of the file: \n${content}`);
        try {
            const data = JSON.parse(content);

            const movesTable = data.moves.map(move => ({
                move_name: move.move.name,
                move_url: move.move.url
            }));

            const moveLearnMethodsTable = Array.from(new Set(
                data.moves.flatMap(move => move.version_group_details.map(detail => detail.move_learn_method))
            )).map(method => ({
                method_name: method.name,
                method_url: method.url
            }));

            const versionGroupsTable = Array.from(new Set(
                data.moves.flatMap(move => move.version_group_details.map(detail => detail.version_group))
            )).map(group => ({
                group_name: group.name,
                group_url: group.url
            }));

            const versionGroupDetailsTable = data.moves.flatMap(move => 
                move.version_group_details.map(detail => ({
                    move_name: move.move.name,
                    method_name: detail.move_learn_method.name,
                    group_name: detail.version_group.name,
                    level_learned_at: detail.level_learned_at
                }))
            );

            console.log('Moves Table:', movesTable);
            console.log('Move Learn Methods Table:', moveLearnMethodsTable);
            console.log('Version Groups Table:', versionGroupsTable);
            console.log('Version Group Details Table:', versionGroupDetailsTable);

            this.insertToDatabase(movesTable, moveLearnMethodsTable, versionGroupsTable, versionGroupDetailsTable);

        } catch (err) {
            console.error(`Error parsing JSON: ${err}`);
            return;
        }
    },

    insertToDatabase: async function (moves, moveLearnMethods, versionGroups, versionGroupDetails) {
        const client = new Client(dbConfig);

        try {
            await client.connect();
            console.log('Connected to the database.');

            // Deletar todos os dados das tabelas
            const deleteQuery = `
                DELETE FROM "Move";
                DELETE FROM "MoveLearnMethod";
                DELETE FROM "VersionGroup";
                DELETE FROM "VersionGroupDetail";
            `;

            try {
                await client.query(deleteQuery);
                console.log('Deleted all data from "Move", "MoveLearnMethod", "VersionGroup", and "VersionGroupDetail" tables.');
            } catch (err) {
                console.error(`Error deleting data: ${err}`);
            }

            // Inserir dados na tabela Moves
            for (const move of moves) {
                const query = `
                    INSERT INTO "Move" (move_name, move_url) 
                    VALUES ($1, $2)
                `;
                const values = [move.move_name, move.move_url];

                try {
                    await client.query(query, values);
                    console.log(`Inserted into "Moves": ${JSON.stringify(move)}`);
                } catch (err) {
                    console.error(`Error inserting into "Moves": ${err}`);
                }
            }

            // Inserir dados na tabela MoveLearnMethods
            for (const method of moveLearnMethods) {
                const query = `
                    INSERT INTO "MoveLearnMethod" (method_name, method_url) 
                    VALUES ($1, $2)
                `;
                const values = [method.method_name, method.method_url];

                try {
                    await client.query(query, values);
                    console.log(`Inserted into "MoveLearnMethods": ${JSON.stringify(method)}`);
                } catch (err) {
                    console.error(`Error inserting into "MoveLearnMethod": ${err}`);
                }
            }

            // Inserir dados na tabela VersionGroups
            for (const group of versionGroups) {
                const query = `
                    INSERT INTO "VersionGroup" (group_name, group_url) 
                    VALUES ($1, $2)
                `;
                const values = [group.group_name, group.group_url];

                try {
                    await client.query(query, values);
                    console.log(`Inserted into "VersionGroups": ${JSON.stringify(group)}`);
                } catch (err) {
                    console.error(`Error inserting into "VersionGroup": ${err}`);
                }
            }

            // Inserir dados na tabela VersionGroupDetails
            for (const detail of versionGroupDetails) {
                const query = `
                    INSERT INTO "VersionGroupDetail" 
                    (move_name, method_name, group_name, level_learned_at) 
                    VALUES ($1, $2, $3, $4)
                `;
                const values = [
                    detail.move_name, detail.method_name, detail.group_name, detail.level_learned_at
                ];

                try {
                    await client.query(query, values);
                    console.log(`Inserted into "VersionGroupDetails": ${JSON.stringify(detail)}`);
                } catch (err) {
                    console.error(`Error inserting into "VersionGroupDetail": ${err}`);
                }
            }

        } catch (err) {
            console.error(`Database connection error: ${err}`);
        } finally {
            await client.end();
            console.log('Disconnected from the database.');
        }
    }
};

// Application Module
const ImporterApplication = {
    start: function () {
        HelloWorld.say();
        JSONObserver.list();

        console.log("Application started");
    }
};

// Start the application
ImporterApplication.start();
