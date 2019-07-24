import Reimbursements from "../Models/reimbursements";
import { PoolClient } from "pg";
import { connectionPool } from "../util/connection.util";
import { convertSqlReimbursements } from "../util/reimbursements.converter";

/*
find reimbursement by reimbursement statusid
/reimbursement/status/:statusid
/not done
*/
export async function findByStatusId(id: number) {
    console.log('finding reimbursement by status ID: ' + id);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        console.log('Here');
        const result = await client.query('SELECT * FROM reimbursements WHERE statusid = $1', [id]);
        const sqlReimbursements = result.rows[0];
        
        return sqlReimbursements && convertSqlReimbursements(sqlReimbursements);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

/*
find reimbursement by owner of reimbursement
/reimbursement/author/userId:userId
/not done
*/
export async function findByAuthorId(id: number) {
    console.log('finding reimbursement by author: ' + id);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        console.log('Here');
        const result = await client.query('SELECT * FROM reimbursements WHERE authorid = $1', [id]);
        const sqlReimbursements = result.rows[0];
        
        return sqlReimbursements && convertSqlReimbursements(sqlReimbursements);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function save(reimbursement: Reimbursements) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            INSERT INTO reimbursements (amount, datesubmitted, 
                description, authorid, resolverid, statusid, typeid)
            VALUES 	($1, $2, $3, $4, $5, $6, $7)
            RETURNING reimbursementid
        `;
        const params = [reimbursement.amount, reimbursement.datesubmitted, reimbursement.description, 
            reimbursement.authorid, reimbursement.resolverid, reimbursement.statusid, reimbursement.typeid];
        const result = await client.query(queryString, params);
        return result.rows[0].reimbursementid;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function findByReimbursmentId(id: number) {
    console.log('finding Reimbursement by id: ' + id);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        console.log('Here');
        const result = await client.query('SELECT * FROM reimbursements WHERE reimbursementid = $1', [id]);
        const sqlReimbursements = result.rows[0];
        return sqlReimbursements && convertSqlReimbursements(sqlReimbursements);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}


/*
/Update  reimbursement fields
*/
export async function update(reimbursement: Reimbursements) {
    console.log('updating: ' + reimbursement);
    const oldReimbursement = await findByReimbursmentId(reimbursement.reimbursementid);
     if (!oldReimbursement) {
         return undefined;
     }
     reimbursement = {
         ...oldReimbursement,
         ...reimbursement
     };
     console.log(reimbursement);
     let client: PoolClient;
     try {
         client = await connectionPool.connect(); // basically .then is everything after this
         const queryString = `
         UPDATE reimbursements SET amount = $1, datesubmitted = $2, dateresolved = $3, 
         description = $4, authorid = $5, resolverid = $6, statusid = $7, typeid = $8
         WHERE reimbursementid = $9
         RETURNING *
             `;
             const params = [reimbursement.amount, reimbursement.datesubmitted, reimbursement.dateresolved, reimbursement.description, 
                reimbursement.authorid, reimbursement.resolverid, reimbursement.statusid, reimbursement.typeid, reimbursement.reimbursementid];
                console.log(params + '\n');
         const result = await client.query(queryString, params);
         const sqlReimbursement = result.rows[0];
         return convertSqlReimbursements(sqlReimbursement);
     } catch (err) {
         console.log(err);
     } finally {
         client && client.release();
     }
     console.log('found all');
     return undefined;
 }