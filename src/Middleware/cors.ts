// allow cross origins
// app.use((req, resp, next) => {
//     console.log(req.get('host'));
//     resp.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
//     resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     resp.header('Access-Control-Allow-Credentials', 'true');
//     resp.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH');
//     next();
//   });