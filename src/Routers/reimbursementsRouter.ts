import express = require('express');
//import { authMiddleware } from '../Middleware/auth.Middleware';
import * as reimbursementsDao from '../DAOs/reimbursementsDao'

// the reimbursement router represents a subset of the application
// for all enpoints starting with /reimbursements
export const reimbursementsRouter = express.Router();


/**
 * /reimbursements/status/:statusId
 * find reimbursement by the status id
 */
reimbursementsRouter.get('/status/:statusid', async (req, res) => {
    const reimbursement = await reimbursementsDao.findByStatusId(+req.params.statusid);
    console.log(reimbursement);
    res.json(reimbursement);
});


/**
 * /reimbursements/author/:authorid
 * find reimbursement by the author's id
 */
reimbursementsRouter.get('/author/:authorid', async (req, res) => {
    const reimbursement = await reimbursementsDao.findByAuthorId(+req.params.authorid);
    res.json(reimbursement);
});

reimbursementsRouter.get('/reimbursementid/:reimbursementid', async (req, res) => {
    const reimbursement = await reimbursementsDao.findByReimbursmentId(+req.params.reimbursementid);
    res.json(reimbursement);
});


/**
 * /reimbursements
 * create new reimbursements
 */
reimbursementsRouter.post('', async (req, res) => {
    const reimbursement = req.body;
    if (!reimbursement) {
        res.sendStatus(400);
    } else {
        const id = await reimbursementsDao.save(reimbursement);
        if (!id) {
            res.sendStatus(400);
        } else {
            reimbursement.id = id;
            res.status(201); // created status code
            res.json(reimbursement);
        }
    }
});


/**
 * /reimbursements
 * partially update reimbursements resource
 */
reimbursementsRouter.patch('', async (req, res) => {
    // const userId = req.body.id;
    // const currentLoggedInUser = req.session.user;
    // if (currentLoggedInUser && currentLoggedInUser.id === userId) {
        const updatedReimbursement = await reimbursementsDao.update(req.body);
        res.json(updatedReimbursement);
    // } else {
    //     res.sendStatus(403);
    // }
});