import express = require('express');
//import { authMiddleware } from '../Middleware/auth.Middleware';
import * as usersDao from '../DAOs/usersDao'

// the user router represents a subset of the application
// for all enpoints starting with /users
export const usersRouter = express.Router();

/**
 * /users
 * find all users
 */
usersRouter.get('',
    //authMiddleware('admin', 'manager'),
    async (req, res) => {
        const users = await usersDao.findAll();
        res.json(users);
    })


/**
 * /users/:id
 * find user by some id
 */
usersRouter.get('/:id', async (req, res) => {
    const user = await usersDao.findById(+req.params.id);
    res.json(user);
});

/**
 * /users/firstName/:firstName
 */
// usersRouter.get('/firstName/:firstName', async (req, res) => {
//     const firstName = req.params.firstName;
//     const users = await usersDao.findByFirstName(firstName);
//     res.json(users);
// });


/**
 * /users
 * create new user resource
 */
usersRouter.post('', async (req, res) => {
    const user = req.body;
    if (!user) {
        res.sendStatus(400);
    } else {
        const id = await usersDao.save(user);
        if (!id) {
            res.sendStatus(400);
        } else {
            user.id = id;
            res.status(201); // created status code
            res.json(user);
        }
    }
});

/**
 * /users
 * partially update user resource
 */
usersRouter.patch('', async (req, res) => {
    //const userId = req.body.id;
    // const currentLoggedInUser = req.session.user;
    // if (currentLoggedInUser && currentLoggedInUser.id === userId) {
        const updatedUser = await usersDao.update(req.body);
        res.json(updatedUser);
    // } else {
    //     res.sendStatus(403);
    // }
});

/**
 * /users
 * delete user by id
 */
usersRouter.delete('/:id', (req, res) => {
    // userDao.deleteUser(+req.params.id);
    res.end();
});