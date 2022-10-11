const express = require('express');
const router = express.Router();
const axios = require('axios');
const { WebhookClient } = require('dialogflow-fulfillment');

router.post('/webhook', express.json(), function (req, res, next) {
  const agent = new WebhookClient({ request: req, response: res });
  console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(req.body));

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  async function lastProcess(agent) {
    console.log('@entro');
    const decoded = 'juandirios2011@gmail.com';

    let response;
    try {
      response = await axios.get(
        `http://paymenth-method.herokuapp.com/process/all/bylawyer/home/${decoded}`
      );
      console.log('@response', response);
    } catch (error) {
      console.log('@error', error);
    }

    const formatDate = (data) => {
      return data.split('T')[0];
    };

    const sslm = `<speak><p><s>El caso mas reciente tiene fecha del <say-as interpret-as="date" format="yyyymmdd" detail="1">
    ${formatDate(response?.data?.lastUpdateDate)}
  </say-as> </s>
    <s>En el despacho de  ${formatDate(response?.data?.despacho)}</s>
    <s>En el departamento de  ${formatDate(response?.data?.departamento)}</s>
    <s>Estos son los involucrados <s>  ${formatDate(
      response?.data?.sujetosProcesales
    )}</s></s>
    </p></speak>`;

    const conv = agent.conv();
    conv.ask(sslm);
    agent.add(conv);
    agent.add(formatDate(response?.data?.despacho));
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('last_process', lastProcess);

  agent.handleRequest(intentMap);
});

module.exports = router;
