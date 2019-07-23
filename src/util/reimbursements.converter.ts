import Reimbursements from "../Models/reimbursements";


export function convertSqlReimbursements(row: any) {
    return new Reimbursements(row.reimbursementid, row.amount, row.datesubmitted, 
        row.dateresolved, row.description, row.authorid, row.resolverid, row.statusid, row.typeid);
}