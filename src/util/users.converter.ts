import Users from '../Models/users';

export function convertSqlUser(row: any) {
    return new Users(row.userid, row.username, '', 
    row.firstname, row.lastname, row.email, row.roleid);
}