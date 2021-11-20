const express = require("express");
const { createSingleEmailFromTemplate, send } = require("../helpers/email.helper");
const sendResponse = require("../helpers/sendResponse");
const router = express.Router();


router.post("/send-email", async (req, res, next) => {
    try {
        let { name, code, toEmail } = req.body;
        if (!name || !code || !toEmail) throw new Error("Missing details");
        const template_key = "verify_email";
        const variablesObject = {
            name,
            code,
        };
        const data = await createSingleEmailFromTemplate(template_key, variablesObject, toEmail)
        send(data);
    } catch (error) {
        return next(error);
    }
    return sendResponse(res, 200, true, null, false, "Success sent email")
});

module.exports = router;