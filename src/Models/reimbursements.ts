import ReimbursementType from './reimbursementsType';
import ReimbursementStatus from './reimbursementsStatus';
import User from './users';

export default class Reimbursements {
    constructor(
        public reimbursementid: number, // primary key
        public amount: number,  // not null
        public datesubmitted: Date, // not null
        public dateresolved: Date,
        public description: string, // not null
        public authorid: User,  // foreign key -> User, not null
        public resolverid: User, // foreign key -> User
        public statusid: ReimbursementStatus, // foreign Key -> ReimbursementStatus, not null
        public typeid: ReimbursementType // foreign key -> ReimbursementType
    ) { }

}