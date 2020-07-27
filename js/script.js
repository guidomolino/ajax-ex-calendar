
// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.

// VARIABILI GLOBALI
var currentMonth = 1;
var currentYear = 2018;

// CREAZIONE CALENDARIO
function createCalendar(currentMonth, currentYear) {
  // dati correnti
  var date = currentYear + "-" + currentMonth;
  console.log("mese selezionato:", date);
  var numDays = moment(date, "YYYY-M").daysInMonth();
  console.log("numero giorni", numDays);
  // stampa giorni
  for (var i = 0; i < numDays; i++) {
    var dayNum = i+1;

    $("#day-template").attr("data-info", dayNum);
    $("#day-num").text(dayNum);

    var template = $("#template").html();
    var target = $(".day-list");
    target.css("display","flex").append(template);

  }

  getMonthEvent(currentMonth,currentYear);

}


// ASSEGNAZIONE EVENTI
function getMonthEvent(currentMonth,currentYear) {

  var month = currentMonth - 1;
  var year = currentYear;
  var eventsList = [];

  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays?month="+month+"&year="+year,
    method: "GET",
    success: function(data, state){
      var success = data["success"];
      var events = data["response"];
      console.log("ajax");

      if (success) {

        eventList=events;

        console.log(eventList);

        for (var i = 0; i < eventList.length; i++) {
          var eventDate = moment(eventList[i].date, "YYYY-MM-DD");
          var eventDay = eventDate.format('D');
          var eventName = eventList[i].name;

          $("[data-info="+ eventDay +"]").children("p").text(eventName);

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

function rightClickListener(currentMonth) {
  var next = $("#next");
  next.click(function () {
    if (currentMonth!=12) {
      currentMonth++
    }else {
      currentMonth=1;
    }
    console.log(currentMonth);
    $(".day-list").empty();
    createCalendar(currentMonth,currentYear);
  });
}

function leftClickListener(currentMonth) {
  var prev = $("#prev");
  prev.click(function () {
    if (currentMonth!=1) {
      currentMonth--
    }else{
      currentMonth=12;
    }
    console.log(currentMonth);
    

    $(".day-list").empty();
    createCalendar(currentMonth,currentYear);
  });
}


function init() {
  createCalendar(currentMonth, currentYear);
  rightClickListener(currentMonth);
  leftClickListener(currentMonth);
}

$(document).ready(init);
