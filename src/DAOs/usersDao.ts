import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlUser } from '../util/users.converter';
import Users from '../Models/users';


export async function findByUsernameAndPassword(username: string, password: string) {

    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
            SELECT * FROM users
            WHERE username = $1 AND password = $2
        `;
        const result = await client.query(queryString, [username, password]);
        const sqlUser = result.rows[0]; // there should really only be 1 row at best
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}


/*
find all users
/user
*/
export async function findAll() {
    console.log('finding all users');
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const result = await client.query('SELECT * FROM users');
        // convert result from sql object to js object
        console.log(result.rows);
        return result.rows.map(convertSqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}
/*
find user by id
/user/:id
*/

export async function findById(id: number) {
    console.log('finding user by id: ' + id);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        console.log('Here');
        const result = await client.query('SELECT * FROM users WHERE userid = $1', [id]);
        const sqlUser = result.rows[0];
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}



export async function save(user: Users) {
    let client: PoolClient;
    console.log('Here')
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            INSERT INTO users (username, password, firstname, lastname, email, roleid)
            VALUES 	($1, $2, $3, $4, $5, $6)
            RETURNING userid
        `;
        const params = [user.username, user.password, user.firstname, user.lastname, user.email, user.roleid];
        const result = await client.query(queryString, params);
        return result.rows[0].userid;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found it');
    return undefined;
}




/*
/Update  user fields
*/
export async function update(user: Users) {
    console.log(user);
    const oldUser = await findById(user.userid);
    if (!oldUser) {
        return undefined;
    }
    user = {
        ...oldUser,
        ...user
    };
    console.log(user);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
        UPDATE users SET username = $1, password = $2, firstname = $3, 
                            lastname = $4, email = $5, roleid = $6
        WHERE userid = $7
        RETURNING *
            `;
        const params = [user.username, user.password, user.firstname, user.lastname, user.email, user.roleid, user.userid];
        const result = await client.query(queryString, params);
        const sqlUser = result.rows[0];
        return convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}