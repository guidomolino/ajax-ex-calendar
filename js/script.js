
// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.



// CREAZIONE CALENDARIO
function createCalendar() {
  var monthsList = moment.months();
  console.log(months);
  for (var i = 0; i < monthsList.length; i++) {
    monthsList[i]
  }
}


// ASSEGNAZIONE EVENTI
function getMonth() {

  var eventsList = [];

  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays?month=0&year=2018",
    method: "GET",
    success: function(data, state){
      var success = data["success"];
      var events = data["response"];
      console.log("ajax");

      if (success) {

        eventList=events;

        console.log(eventList);

        for (var i = 0; i < eventList.length; i++) {
          var date = moment(eventList[i].date, "YYYY-MM-DD");
          var eventDay = date.format('D');
          var eventName = eventList[i].name;

          console.log(eventName);
          console.log(eventDay);

        }

      }







    },
    error: function(request, state, error) {
      console.log(state);
      console.log(request);
      console.log(error);
    }
  })
}




function init() {
  createCalendar();
  getMonth();
}

$(document).ready(init);
