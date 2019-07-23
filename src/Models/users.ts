import Roles from './roles';


export default class Users {
    constructor(
    public userId = 0, // primary key
    public username = '', // not null, unique
    public password = '', // not null
    public firstName = '', // not null
    public lastName = '',// not null
    public email = '', // not null
    public roleid = new Roles()
    ) { }
}