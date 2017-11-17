/**
 * @author A.Sivatharan
 * created on 20.10.2017
 */
const db_config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'test'
}

const pool  = mysql.createPool(db_config);

module.exports = pool;