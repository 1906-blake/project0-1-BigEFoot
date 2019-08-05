export default class Roles {
    constructor(
        public roleid = 0, // primary key
        public role = '' // not null, unique
    ) { }
}