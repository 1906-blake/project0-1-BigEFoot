import express from 'express';
import bodyParser from 'body-parser';
import { usersRouter } from './Routers/usersRouter';
import { reimbursementsRouter } from './Routers/reimbursementsRouter';

// specify the port will run on
const port = 8012;
const app = express();

/**
 * Loggin middleware
 * This callback will be invoked anytime a request is made 
 * regardless of url or http method
 *  */ 
app.use((req, res, next) => {
    console.log(`request made with url: ${req.url} and method ${req.method}`)
    next(); // pass request on to search for the next piece of middleware
});

// set up body parser to convert json body to object stored on req.body
app.use(bodyParser.json());

// Routers
app.use('/users', usersRouter);
app.use('/reimbursements', reimbursementsRouter);

// app.get('/test', (req, res) => {
//     res.send('this is a test endpoint');
// });

app.post('/login', (req, res) => {
    console.log('body = ', req.body); 
    res.json({
        username: 'edward',
        email: 'e@gmail.com',
        firstName: 'Edward',
        lastName: 'McIntire'
    })
});

app.delete('/logout', (req, res) => {``
    res.end();
});


app.listen(port, () => {
    console.log('app started on port: ' + port)
});