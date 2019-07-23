import ReimbursementType from './reimbursementsType';
import ReimbursementStatus from './reimbursementsStatus';
import User from './users';

export default class Reimbursements {
    constructor(
        reimbursementId: number, // primary key
        amount: number,  // not null
        dateSubmitted: number, // not null
        dateResolved: number,
        description: string, // not null
        author: User,  // foreign key -> User, not null
        resolver: User, // foreign key -> User
        status: ReimbursementStatus, // foreign ey -> ReimbursementStatus, not null
        type: ReimbursementType // foreign key -> ReimbursementType
    ) { }

}