import ReimbursementType from './reimbursementsType';
import ReimbursementStatus from './reimbursementsStatus';
import User from './users';

export default class Reimbursements {
    constructor(
        public reimbursementId: number, // primary key
        public amount: number,  // not null
        public dateSubmitted: number, // not null
        public dateResolved: number,
        public description: string, // not null
        public author: User,  // foreign key -> User, not null
        public resolver: User, // foreign key -> User
        public status: ReimbursementStatus, // foreign ey -> ReimbursementStatus, not null
        public type: ReimbursementType // foreign key -> ReimbursementType
    ) { }

}