import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();

const {POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD,POSTGRES_DB_TEST,NODE_ENV}=process.env;

export let client:Pool;


if (NODE_ENV == 'dev'){
 client = new Pool({
    host:POSTGRES_HOST,
    database:POSTGRES_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD
})}
 else {
    client = new Pool({
        host:POSTGRES_HOST,
        database:POSTGRES_DB_TEST,
        user:POSTGRES_USER,
        password:POSTGRES_PASSWORD
})}

// if (NODE_ENV == 'test'){
//     console.log(typeof NODE_ENV);
//     client = new Pool({
//         host:POSTGRES_HOST,
//         database:POSTGRES_DB_TEST,
//         user:POSTGRES_USER,
//         password:POSTGRES_PASSWORD
// })}

