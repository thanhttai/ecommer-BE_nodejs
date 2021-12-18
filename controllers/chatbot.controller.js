const sendResponse = require("../helpers/sendResponse");
'use strict';
const dialogflow = require('dialogflow');
const structjson = require('../helpers/structjson.js');
const mongoose = require('mongoose');
const credentials = {
    client_email: process.env.googleClientEmail,
    private_key:process.env.googlePrivateKey,
};
    

const projectId = process.env.googleProjectID
const sessionId = process.env.dialogFlowSessionID;
const languageCode = process.env.dialogFlowSessionLanguageCode;

const sessionClient = new dialogflow.SessionsClient({projectId, credentials});
const chatbotController = {};

chatbotController.handleAction = async (responses) => {
    let self = module.exports;
    let queryResult = responses[0].queryResult;

    switch (queryResult.action) {
        case 'recommendcourses-yes':
            if (queryResult.allRequiredParamsPresent) {
                // self.saveRegistration(queryResult.parameters.fields);
            }
            break;
    }

    return responses;
}



chatbotController.textQuery = async (text, userID, parameters = {}) => {
  try {
    console.log(text, 'text')
    let self = module.exports;
    const sessionPath = sessionClient.sessionPath(projectId, sessionId + userID );
    console.log(sessionPath, 'sessionPath')
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: text,
                languageCode: languageCode,
            },
        },
        queryParams: {
            payload: {
                data: parameters
            }
        }
    };

    let responses = await sessionClient.detectIntent(request);
    console.log(responses,'response')
    responses = await self.handleAction(responses);
    return responses;
  } catch (error) {
      console.log(error)
  }


};

chatbotController.eventQuery = async (event,userID, parameters = {}) => {
    try {
        let self = module.exports;
    let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);

    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                name: event,
                parameters: structjson.jsonToStructProto(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
                languageCode: languageCode,
            },
        }
    };

    let responses = await sessionClient.detectIntent(request);
    responses = self.handleAction(responses);
    return responses;
    } catch (error) {
        console.log(error)
    }

}

  

  module.exports = chatbotController;
