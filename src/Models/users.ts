import Roles from './roles';


export default class Users {
    constructor(
    public userid = 0, // primary key
    public username = '', // not null, unique
    public password = '', // not null
    public firstname = '', // not null
    public lastname = '',// not null
    public email = '', // not null
    public roleid = new Roles()
    ) { }
}