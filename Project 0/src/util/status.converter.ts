import ReimbursementStatus from "../Models/reimbursementsStatus";


export function convertStatus(row: any) {
    return new ReimbursementStatus(row.statusid, row.status)
}