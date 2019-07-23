import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlUser } from '../util/users.converter';
import Users from '../Models/users';

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
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            INSERT INTO users (username, password, firstName, lastName, email, roleid)
            VALUES 	($1, $2, $3, $4, $5, $6)
            RETURNING userid
        `;
        const params = [user.username, user.password, user.firstName, user.lastName, user.email, user.roleid];
        const result = await client.query(queryString, params);
        return result.rows[0].user_id;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}




/*
/Update  user fields
*/
export async function update(newUser: Users) {
   const oldUser = await findById(newUser.userId);
    if (!oldUser) {
        return undefined;
    }
    newUser = {
        ...oldUser,
        ...newUser
    };
    console.log(newUser);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
        UPDATE users SET username = $1, password = $2, firstname = $3, 
                            lastname = $4, email = $5, roleid = $6
        WHERE userId = $7
        RETURNING *
            `;
        const params = [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.roleid, newUser.userId];
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