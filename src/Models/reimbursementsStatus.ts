export default class ReimbursementStatus {
    constructor(
        public estatusId: number, // primary key
        public status: string // not null, unique
    ) { }
}