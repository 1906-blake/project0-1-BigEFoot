
export default class ReimbursementType {
    constructor(
    public typeId = 0, // primary key
    public type = '', // not null, unique
    ) { }

}