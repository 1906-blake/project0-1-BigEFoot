import Reimbursements from "../Models/reimbursements";
import { PoolClient } from "pg";
import { connectionPool } from "../util/connection.util";
import { convertSqlReimbursements } from "../util/reimbursements.converter";
import { convertStatus } from "../util/status.converter";

// /reimbursements
export async function findAll() {
    console.log('finding all reimbursements');
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const result = await client.query(`
        SELECT reim.*, author.userid, author.username, author.password, author.firstname, author.lastname, author.email, author.roleid,
	    resolv.userid as resid, resolv.username as resusername, authrole.role,
	    resolv.password as respassword, resolv.firstname as resfirstname, 
	    resolv.lastname as reslastname, resolv.email as resemail, resolv.roleid as resroleid,
	    reimstat.status as statusname, reimtype.type as typename, resolvrole.role as resrole 
        FROM reimbursements AS reim
        LEFT JOIN users AS author
	        ON (author.userid = reim.authorid)
        LEFT JOIN users AS resolv
	        ON (reim.resolverid = resolv.userid)
        LEFT JOIN roles AS authrole
	        ON (authrole.roleid = author.roleid)
        LEFT JOIN roles AS resolvrole
	        ON (resolvrole.roleid = resolv.roleid)
        LEFT JOIN reimbursementstatus AS reimstat
	        USING (statusid)
        LEFT JOIN reimbursementtype AS reimtype
	        USING (typeid)
	    ORDER BY datesubmitted
        `);
        // convert result from sql object to js object
        return result.rows.map(convertSqlReimbursements);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

// /reimbursements
export async function findStatus() {
    console.log('finding all Status');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`
        SELECT * FROM reimbursementstatus;
        `);
        return result.rows.map(convertStatus);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

/*
find reimbursement by reimbursement statusid
/reimbursement/status/:statusid
/not done
*/
export async function findTypes() {
    console.log('finding types: ');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT * FROM reimbursementtype;`;
        const result = await client.query(queryString);
        return result.rows;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

/*
find reimbursement by reimbursement statusid
/reimbursement/status/:statusid
/not done
*/
export async function findByTypeId(id: number) {
    console.log('finding reimbursement by type ID: ' + id);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT reim.*, author.userid, author.username, author.password, author.firstname, author.lastname, author.email, author.roleid,
	    resolv.userid as resid, resolv.username as resusername, authrole.role,
	    resolv.password as respassword, resolv.firstname as resfirstname, 
	    resolv.lastname as reslastname, resolv.email as resemail, resolv.roleid as resroleid,
	    reimstat.status as statusname, reimtype.type as typename, resolvrole.role as resrole 
        FROM reimbursements AS reim
        LEFT JOIN users AS author
	        ON (author.userid = reim.authorid)
        LEFT JOIN users AS resolv
	        ON (reim.resolverid = resolv.userid)
        LEFT JOIN roles AS authrole
	        ON (authrole.roleid = author.roleid)
        LEFT JOIN roles AS resolvrole
	        ON (resolvrole.roleid = resolv.roleid)
        LEFT JOIN reimbursementstatus AS reimstat
	        USING (statusid)
        LEFT JOIN reimbursementtype AS reimtype
            USING (typeid)
        WHERE typeid = $1
	    ORDER BY datesubmitted;`;
        const result = await client.query(queryString, [id]);
        return result.rows;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}


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
        const queryString = `
        SELECT reim.*, author.userid, author.username, author.password, author.firstname, author.lastname, author.email, author.roleid,
	    resolv.userid as resid, resolv.username as resusername, authrole.role,
	    resolv.password as respassword, resolv.firstname as resfirstname, 
	    resolv.lastname as reslastname, resolv.email as resemail, resolv.roleid as resroleid,
	    reimstat.status as statusname, reimtype.type as typename, resolvrole.role as resrole 
        FROM reimbursements AS reim
        LEFT JOIN users AS author
	        ON (author.userid = reim.authorid)
        LEFT JOIN users AS resolv
	        ON (reim.resolverid = resolv.userid)
        LEFT JOIN roles AS authrole
	        ON (authrole.roleid = author.roleid)
        LEFT JOIN roles AS resolvrole
	        ON (resolvrole.roleid = resolv.roleid)
        LEFT JOIN reimbursementstatus AS reimstat
	        USING (statusid)
        LEFT JOIN reimbursementtype AS reimtype
	        USING (typeid)
        WHERE statusid = $1
	    ORDER BY datesubmitted;`;
        const result = await client.query(queryString, [id]);
        return result.rows.map(convertSqlReimbursements);
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
        const queryString = `
        SELECT reim.*, author.userid, author.username, author.password, author.firstname, author.lastname, author.email, author.roleid,
	    resolv.userid as resid, resolv.username as resusername, authrole.role,
	    resolv.password as respassword, resolv.firstname as resfirstname, 
	    resolv.lastname as reslastname, resolv.email as resemail, resolv.roleid as resroleid,
	    reimstat.status as statusname, reimtype.type as typename, resolvrole.role as resrole 
        FROM reimbursements AS reim
        LEFT JOIN users AS author
	        ON (author.userid = reim.authorid)
        LEFT JOIN users AS resolv
	        ON (reim.resolverid = resolv.userid)
        LEFT JOIN roles AS authrole
	        ON (authrole.roleid = author.roleid)
        LEFT JOIN roles AS resolvrole
	        ON (resolvrole.roleid = resolv.roleid)
        LEFT JOIN reimbursementstatus AS reimstat
	        USING (statusid)
        LEFT JOIN reimbursementtype AS reimtype
	        USING (typeid)
        WHERE authorid = $1
	    ORDER BY datesubmitted;`
        const result = await client.query(queryString, [id]);
        return result.rows.map(convertSqlReimbursements);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function save(reimbursement: Reimbursements) {
    console.log(reimbursement);
    let client: PoolClient;
    const d = new Date().toLocaleDateString();
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            INSERT INTO reimbursements (amount, datesubmitted, 
                description, authorid, statusid, typeid)
            VALUES 	($1, $2, $3, $4, $5, $6)
            RETURNING reimbursementid
        `;
        console.log('author is' + reimbursement);
        const params = [reimbursement.amount, d, reimbursement.description,
        reimbursement.author, 1, reimbursement.type];
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
        const result = await client.query(`
        SELECT reim.*, author.userid, author.firstname, author.lastname, author.roleid,
	    resolv.userid as resid, resolv.username as resusername, 
	    resolv.password as respassword, resolv.firstname as resfirstname, 
	    resolv.lastname as reslastname, resolv.email as resemail, resolv.roleid as resroleid,
	    reimstat.status as statusname, reimtype.type as typename
        FROM reimbursements AS reim
        LEFT JOIN users AS author
	        ON (author.userid = reim.authorid)
        LEFT JOIN users AS resolv
	        ON (reim.resolverid = resolv.userid)
        LEFT JOIN roles AS authrole
	        ON (authrole.roleid = author.roleid)
        LEFT JOIN roles AS resolvrole
	        ON (resolvrole.roleid = resolv.roleid)
        LEFT JOIN reimbursementstatus AS reimstat
	        USING (statusid)
        LEFT JOIN reimbursementtype AS reimtype
	        USING (typeid) WHERE reimbursementid = $1`, [id]);
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
        reimbursement.author, reimbursement.resolver, reimbursement.status, reimbursement.type, reimbursement.reimbursementid];
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