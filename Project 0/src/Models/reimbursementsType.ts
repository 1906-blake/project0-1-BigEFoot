
export default class ReimbursementType {
    constructor(
    public typeid = 0, // primary key
    public type = '', // not null, unique
    ) { }

}