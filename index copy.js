const express = require("express");
const router = express.Router();
const app = express();

router.get(‘/handle’,(request,response) => {
//code to perform particular action.
//To access GET variable use req.query() and req.params() methods.
});

// add router in the Express app.
app.use("/", router);