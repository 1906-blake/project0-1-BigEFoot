import Reimbursements from "../Models/reimbursements";
import Users from "../Models/users";
import Roles from "../Models/roles";
import ReimbursementStatus from "../Models/reimbursementsStatus";
import ReimbursementType from "../Models/reimbursementsType";


export function convertSqlReimbursements(row: any) {
    return new Reimbursements(row.reimbursementid, row.amount, row.datesubmitted, row.dateresolved, row.description, 
        new Users(row.auserid, row.ausername, '', row.afirstname, row.alastname, row.aemail, new Roles(row.roleid, row.role)), 
        new Users(row.ruserid, row.rusername, '', row.rfirstname, row.rlastname, row.remail, new Roles(row.roleid, row.role)), 
        new ReimbursementStatus(row.statusid, row.status), 
        new ReimbursementType(row.typeid, row.type));
}