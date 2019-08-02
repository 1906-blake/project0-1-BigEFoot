export default class Roles {
    constructor(
        public roleId = 0, // primary key
        public role = '' // not null, unique
    ) { }
}