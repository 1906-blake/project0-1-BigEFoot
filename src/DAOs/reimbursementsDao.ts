import Reimbursements from "../Models/reimbursements";
import { PoolClient } from "pg";
import { connectionPool } from "../util/connection.util";
import { convertSqlReimbursements } from "../util/reimbursements.converter";

// import { connectionPool } from '../util/connection.util';
// import { PoolClient } from 'pg';
// import { convertSqlReimbursements } from '../util/reimbursements.converter';
//import Users from '../Models/users';

/*
find reimbursement by reimbursement statusid
/reimbursement/status/:statusid
/not done
*/
export async function findByStatusId(id: number) {
    console.log('finding reimbursement by status ID: ' + id);
    // let client: PoolClient;
    // try {
    //     client = await connectionPool.connect();
    //     console.log('Here');
    //     const result = await client.query('SELECT * FROM reimbursements WHERE reimbursementid = $1', [id]);
    //     const sqlReimbursement = result.rows;
    //     return sqlReimbursement && convertSqlReimbursements(sqlReimbursement);
    // } catch (err) {
    //     console.log(err);
    // } finally {
    //     client && client.release();
    // }
    // return undefined;
}

/*
find reimbursement by owner of reimbursement
/reimbursement/author/userId:userId
/not done
*/
 export async function findByOwnerId(id: number) {
     console.log('finding reimbursement by owner: ' + id);
//     let client: PoolClient;
//     try {
//         client = await connectionPool.connect(); // basically .then is everything after this
//         console.log('Here');
//         const result = await client.query('SELECT * FROM users WHERE userid = $1', [id]);
//         const sqlUser = result.rows[0];
//         return sqlUser && convertSqlUser(sqlUser);
//     } catch (err) {
//         console.log(err);
//     } finally {
//         client && client.release();
//     }
//     return undefined;
}

/*
/Update  user fields
*/
// export async function update(newReimbursements: Reimbursements) {
//     console.log('updating: ' + newReimbursements);
//     const oldUser = await findByOwnerId(newUser.userId);
//      if (!oldUser) {
//          return undefined;
//      }
//      newUser = {
//          ...oldUser,
//          ...newUser
//      };
//      console.log(newUser);
//      let client: PoolClient;
//      try {
//          client = await connectionPool.connect(); // basically .then is everything after this
//          const queryString = `
//          UPDATE app_user SET username = $1, password = $2, firstname = $3, lastname = $4, email = $6, role = $7
//          WHERE user_Id = $8
//          RETURNING *
//              `;
//          const params = [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.role];
//          const result = await client.query(queryString, params);
//          const sqlUser = result.rows[0];
//          return convertSqlReimbursements(sqlUser);
//      } catch (err) {
//          console.log(err);
//      } finally {
//          client && client.release();
//      }
//      console.log('found all');
//      return undefined;
//  }