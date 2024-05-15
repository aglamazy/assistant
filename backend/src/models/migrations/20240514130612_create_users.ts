import type { Knex } from "knex";
import {TableNames} from "../consts";
import {UserStatus} from "../userModel";


export async function up(knex: Knex): Promise<void> {
    const statusValues = Object.values(UserStatus);
    const statusEnum = `'${statusValues.join("', '")}'`; // Turns array into 'pending', 'active'
    console.log(statusEnum);

    await knex.schema.raw(`CREATE TYPE user_status AS ENUM (${statusEnum})`);

    return knex.schema.createTable(TableNames.Users, function(table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('email', 255).unique().notNullable();
        table.string('hash', 255).notNullable();
        table.enu('status', null, { useNative: true, existingType: true, enumName: 'user_status' });

        // table.enu('status', null, {useNative: true, enumName: 'user_status'}).defaultTo(UserStatus.Pending);
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TableNames.Users);
    return knex.schema.raw('DROP TYPE user_status');
}

