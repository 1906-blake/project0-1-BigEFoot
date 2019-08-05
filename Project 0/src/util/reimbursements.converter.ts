import Reimbursements from "../Models/reimbursements";
import Users from "../Models/users";
import Roles from "../Models/roles";
import ReimbursementStatus from "../Models/reimbursementsStatus";
import ReimbursementType from "../Models/reimbursementsType";


export function convertSqlReimbursements(row: any) {
    return new Reimbursements(row.reimbursementid, row.amount, row.datesubmitted, row.dateresolved, row.description, 
        new Users(row.userid , row.username, row.password, row.firstname, row.lastname, row.email, 
        new Roles(row.roleid, row.role)), 
        new Users(row.resuserid, row.resusername, row.respassword, row.resfirstname, row.reslastname, row.resemail, 
        new Roles(row.resroleid, row.resrole)), 
        new ReimbursementStatus(row.statusid, row.status), 
        new ReimbursementType(row.typeid, row.type));
}