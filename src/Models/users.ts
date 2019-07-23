import Roles from './roles';


export default class Users {
    userId: number;
    username: any;
    password: any;
    firstName: any;
    lastName: any;
    email: any;
    roleid: any;
    
    constructor(
    userId = 0, // primary key
    username = '', // not null, unique
    password = '', // not null
    firstName = '', // not null
    lastName = '',// not null
    email = '', // not null
    roleid = new Roles()
    ) { }
}