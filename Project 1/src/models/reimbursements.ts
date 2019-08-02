import ReimbursementType from './reimbursementsType';
import ReimbursementStatus from './reimbursementsStatus';
import User from './users';

export default class Reimbursement {
    constructor(
        public reimbursementid = 0, // primary key
        public amount = 0,  // not null
        public datesubmitted: Date, // not null
        public dateresolved: Date,
        public description = '', // not null
        public authorid: User,  // foreign key -> User, not null
        public resolverid: User, // foreign key -> User
        public statusid: ReimbursementStatus, // foreign Key -> ReimbursementStatus, not null
        public typeid: ReimbursementType // foreign key -> ReimbursementType
    ) { }

}