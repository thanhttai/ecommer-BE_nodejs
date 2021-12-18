const express = require("express");
const {
textQuery,
eventQuery
} = require("../controllers/chatbot.controller");

const authenticationMiddleware = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const router = express.Router();


router.get('/',(req, res) => {
    res.send({'hello': 'ngu 2'})
})

router.post("/df_text_query",async(req, res) => {
    
    try {
       
        console.log('hâha')
        let responses = await textQuery(req.body.text, req.body.parameters);
        console.log(responses, 'huhuh')
        res.header("Access-Control-Allow-Origin", "*")
        res.send(responses[0].queryResult)
    } catch (error) {
        console.log(error)
    }
} );
router.post('/api/df_event_query',async(req, res) => {
    let responses = await eventQuery(req.body.event, req.body.parameters);
    res.header("Access-Control-Allow-Origin", "*")
    res.send(responses[0].queryResult)
})





module.exports = router;
