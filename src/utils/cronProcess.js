const Lawyer = require('../models/Lawyer');
const Process = require('../models/Process');
const Event = require('../models/Event');

const axios = require('axios');

const { sendEmail, daysNotification } = require('./sendEmail');

const requestCaso = async () => {
  const processDataData = await Process.find({});
  const processData = processDataData.slice(0, 480);
  // const processData = processDataData.slice(0, 2);

  for (let i = 0; i < processData.length; i++) {
    if (processData.length - 1 <= i) {
      console.log('---------ULTIMO PROCESO---------');
    }

    const { filingNumber, lastUpdateDate, lawyer, _id, notificationDays } =
      processData[i];
    try {
      const requestProceso = await axios.get(
        `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=${filingNumber}&SoloActivos=false&pagina=1`
      );

      const length =
        requestProceso.data.procesos[0].fechaUltimaActuacion === null ? 1 : 0;

      const fechaDataUpdate =
        requestProceso.data.procesos[length].fechaUltimaActuacion;

      // console.log(
      //   new Date(fechaDataUpdate.toString().split('T')[0]).getTime() ===
      //     new Date(lastUpdateDate.toISOString().slice(0, 10)).getTime(),
      //   '@DATE ',
      //   new Date(fechaDataUpdate.toString().split('T')[0]),
      //   new Date(lastUpdateDate.toISOString().slice(0, 10)),
      //   filingNumber
      // );

      const whithoutAction =
        (Date.now() - lastUpdateDate) / (1000 * 60 * 60 * 24);

      if (
        whithoutAction > 182 &&
        whithoutAction < 365 &&
        notificationDays !== true
      ) {
        const doc = await Process.findById(_id);
        doc.notificationDays = true;
        doc.notificationDaysWeb = true;
        await doc.save();

        console.log('6 meses');
      }

      if (whithoutAction > 365 && notificationDays !== true) {
        const lawyerQuery = await Lawyer.findById(lawyer);

        daysNotification(
          lawyerQuery.email,
          processData[i],
          whithoutAction
        ).then(async (result) => {
          const doc = await Process.findById(_id);
          doc.notificationDays = true;
          doc.notificationDaysWeb = true;
          await doc.save();
        });
      }

      console.log(i, lastUpdateDate, filingNumber, fechaDataUpdate);

      if (lastUpdateDate == null) {
        const idProceso = requestProceso.data.procesos[length].idProceso;

        const requestAccion = await axios.get(
          `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${idProceso}?pagina=1`
        );

        const anotacion = requestAccion.data.actuaciones[0].anotacion;
        const actuacion = requestAccion.data.actuaciones[0].actuacion;
        const audiencia = 'audiencia';

        if (
          actuacion
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(audiencia.toLowerCase().replace(/\s+/g, '')) ||
          anotacion
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(audiencia.toLowerCase().replace(/\s+/g, ''))
        ) {
          const audiencia = (actuacion + '.', anotacion);
          const doc = await Process.findById(_id);

          let params = {
            start: new Date(),
            end: new Date(),
            title: audiencia,
            lawyer: doc.lawyer,
            notification: false,
            process: filingNumber
          };
          Event.create(params)
            .then((event) => {
              console.log('Evento Creado');
            })
            .catch((error) => {
              console.log(error);
            });
        }

        const lawyerQuery = await Lawyer.findById(lawyer);

        sendEmail(
          lawyerQuery.email,
          requestAccion.data.actuaciones[0],
          requestProceso.data.procesos[length]
        ).then(async (result) => {
          const doc = await Process.findById(_id);
          doc.lastUpdateDatePrevious = doc.lastUpdateDate;
          doc.lastUpdateDate = new Date(
            fechaDataUpdate.toString().split('T')[0]
          );
          doc.notificationWeb = true;
          doc.notificationHome = true;
          await doc.save();
        });
      } else if (
        new Date(fechaDataUpdate.toString().split('T')[0]).getTime() >
        new Date(lastUpdateDate.toISOString().slice(0, 10)).getTime()
      ) {
        const idProceso = requestProceso.data.procesos[length].idProceso;

        console.log(idProceso);
        const requestAccion = await axios.get(
          `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${idProceso}?pagina=1`
        );

        const anotacion = requestAccion.data.actuaciones[0].anotacion;
        const actuacion = requestAccion.data.actuaciones[0].actuacion;
        const audiencia = 'audiencia';

        if (
          actuacion
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(audiencia.toLowerCase().replace(/\s+/g, '')) ||
          anotacion
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(audiencia.toLowerCase().replace(/\s+/g, ''))
        ) {
          const audiencia = (actuacion + '.', anotacion);
          const doc = await Process.findById(_id);

          let params = {
            start: new Date(),
            end: new Date(),
            title: audiencia,
            lawyer: doc.lawyer,
            notification: false,
            process: filingNumber
          };
          Event.create(params)
            .then((event) => {
              console.log('Evento Creado');
            })
            .catch((error) => {
              console.log(error);
            });
        }

        const lawyerQuery = await Lawyer.findById(lawyer);

        sendEmail(
          lawyerQuery.email,
          requestAccion.data.actuaciones[0],
          requestProceso.data.procesos[length]
        ).then(async (result) => {
          const doc = await Process.findById(_id);
          doc.lastUpdateDatePrevious = doc.lastUpdateDate;
          doc.lastUpdateDate = new Date(
            fechaDataUpdate.toString().split('T')[0]
          );
          doc.notificationWeb = true;
          doc.notificationHome = true;
          await doc.save();
        });
      }
    } catch (error) {
      console.log('@ERROR ', filingNumber, error);
    }
  }
};

module.exports = {
  requestCaso
};
