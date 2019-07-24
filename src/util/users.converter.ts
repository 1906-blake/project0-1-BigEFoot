import Users from '../Models/users';
//import Roles from '../Models/roles';

export function convertSqlUser(row: any) {
    return new Users(row.userid, row.username, '', 
    row.firstname, row.lastname, row.email, row.roleid);
    
}