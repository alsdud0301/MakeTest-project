import {Pool} from 'pg';
const pool = new Pool({
    user:'alsdud',
    host:'localhost',
    database:"CreateTest",
    password: 'kim931017',
    port:5432,
}); 

export default pool