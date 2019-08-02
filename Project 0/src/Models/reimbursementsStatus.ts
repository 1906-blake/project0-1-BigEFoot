export default class ReimbursementStatus {
    constructor(
        public statusid = 0, // primary key
        public status = '' // not null, unique
    ) { }
}