const nodemailer = require('nodemailer');
const { template } = require('../html/template');
const { templatePassword } = require('../html/password/template');
const { templateEvents } = require('../html/eventNotifcation/template');
const { templateDays } = require('../html/daysNotification/template');

const sendEmail = async (emailTo, requestAccion, requestProceso) => {
  const { llaveProceso, fechaProceso } = requestProceso;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'solutioprocess',
      pass: 'gmepudoqeqhqcawl'
    },
    tls: { rejectUnauthorized: false }
  });

  const mailOptions = {
    from: 'lawservices001@gmail.com',
    to: emailTo,
    subject: `Informe Procesos Solutio ${llaveProceso}  ${fechaProceso}`,
    html: template(requestProceso, requestAccion)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const forgotPasswordEmail = async (emailTo, lawyer) => {
  const { name } = lawyer;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'solutioprocess',
      pass: 'gmepudoqeqhqcawl'
    },
    tls: { rejectUnauthorized: false }
  });

  const mailOptions = {
    from: 'solutioprocess@gmail.com',
    to: emailTo,
    subject: `Reestablecimiento de contraseña: ${name}`,
    html: templatePassword(lawyer)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const eventNotification = async (lawyer, doc) => {
  const { email } = lawyer;
  const { title } = doc;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'solutioprocess',
      pass: 'gmepudoqeqhqcawl'
    },
    tls: { rejectUnauthorized: false }
  });

  const mailOptions = {
    from: 'solutioprocess@gmail.com',
    to: email,
    subject: `Notificación de evento: ${title}`,
    html: templateEvents(doc)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const daysNotification = async (lawyer, processData, whithoutAction) => {
  const { filingNumber } = processData;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'solutioprocess',
      pass: 'gmepudoqeqhqcawl'
    },
    tls: { rejectUnauthorized: false }
  });

  const mailOptions = {
    from: 'solutioprocess@gmail.com',
    to: lawyer,
    subject: `Advertencia De Inactividad En Proceso: ${filingNumber}`,
    html: templateDays(processData, whithoutAction)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = {
  sendEmail,
  forgotPasswordEmail,
  eventNotification,
  daysNotification
};
