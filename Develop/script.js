// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

var dailyTasksRecovered = JSON.parse(localStorage.getItem('dailyMessages'));
for (tasks in dailyTasksRecovered){
  var savedHour = dailyTasksRecovered[tasks].Hour;
  var savedTask = dailyTasksRecovered[tasks].Message;
   $('.container-fluid').find('#' + savedHour).children('textarea').append(savedTask);
}



var Now  = dayjs();
var suffix = ""
var currentHour = Now.format('HH');
var currentHourText  = ('hour-'+currentHour);
$('.container-fluid').find('div.time-block').removeClass('past present future');
// var timeBlock = $('.container-fluid').find('div.time-block');
$('.time-block').each(function(){
  
  // var hr = $(this).attr('id');
  // var hrNumber = hr.substr(5);
  var hrNumber = $(this).attr('id').substr(5);

  // currentHour = '15';
  console.log(hrNumber, currentHour);
  if (hrNumber===currentHour){
    $(this).addClass('present');
  }
  else if (hrNumber<currentHour){
    $(this).addClass('past');
  }
  else{
    $(this).addClass('future');
  }
})


if ((Now.format('D')==='22')||(Now.format('D')==='2')){
  suffix = "nd";
}
else if ((Now.format('D')==='21')||(Now.format('D')==='1')){
  suffix = "st";
}
else if ((Now.format('D')==='23')||(Now.format('D')==='3')){
  suffix = "rd";
}
else{
  suffix = "th";
}

$('#currentDay').append(Now.format('dddd, MMMM D')).append(suffix);










$('.saveBtn').on('click', function(){
  var hourSave = $(this).parent().get(0).id;
  var textSave = $(this).siblings('.description').get(0).value;
  var details = {
    'Hour' : hourSave,
    'Message' : textSave
  }
  var textArray;

  if (localStorage.getItem('dailyMessages')===null){
    textArray = [];
    textArray.push(details);
  }
  else {
    textArray = JSON.parse(localStorage.getItem('dailyMessages'));

    function findHour(reminders){
      return reminders.Hour === details.Hour; 
    }

    var positionOfHour = (textArray.findIndex(findHour)); 
    if(positionOfHour===-1){
      console.log(hourSave);
      console.log(textSave);
      textArray.push(details);
      console.log(textArray);
    }
    else {
      textArray.splice(positionOfHour, 1, details);

    }

  }
  console.log(textArray);
  localStorage.setItem('dailyMessages', JSON.stringify(textArray)); 
  $('#confirmation').show(500).delay(3000).hide(500);
})

$('#clrButton').on('click', function(){
var recoveredMEss = JSON.parse(localStorage.getItem('dailyMessages'));
recoveredMEss=[];
localStorage.setItem('dailyMessages', JSON.stringify(recoveredMEss));
location.reload();


});


$('#clrButton').hover(function(){
  $(this).css('background-color', 'red');
},
function(){
  $(this).css('background-color', '#ff6961');
});
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
