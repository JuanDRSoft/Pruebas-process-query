const { getDate, getMonth, getYear } = require('date-fns');
const Event = require('../models/Event');

const requestEvents = async () => {
  const eventsData = await Event.find({});

  for (let i = 0; i < eventsData.length; i++) {
    const { title, end, _id } = eventsData[i];

    console.log(i, title, end);

    const resta = end - Date.now();
    const doc = await Event.findById(_id);

    console.log(getDate(resta));
    if (getDate(resta) === 1 || getDate(resta) === 2) {
      try {
        doc.notification = true;
        await doc.save();

        console.log(i, 'Notificacion Actualizada');
      } catch (error) {
        console.log(error);
      }
    } else if (end < Date.now()) {
      try {
        doc.notification = false;
        await doc.save();

        console.log(i, 'Notificacion Desactivada');
      } catch (error) {
        console.log(error);
      }
    }
  }
};

module.exports = { requestEvents };
