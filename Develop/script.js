//(document).ready ensures the document is rendered on the DOM before the following function is executed. 
$(document).ready(function () {

//Recovers samed tasks from local Storage, then appends them to the approrpiate time slot.
var dailyTasksRecovered = JSON.parse(localStorage.getItem('dailyMessages'));
for (tasks in dailyTasksRecovered){
  var savedHour = dailyTasksRecovered[tasks].Hour;
  var savedTask = dailyTasksRecovered[tasks].Message;
   $('.container-fluid').find('#' + savedHour).children('textarea').append(savedTask);
}

//Defines the current date using dayjs as well as current hour
var Now  = dayjs();
var suffix = ""
var currentHour = Now.format('HH');

//Displays current date followed by relevant suffix
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

//Replaces existing classes on time blocks with classes appropriate for the current time
$('.container-fluid').find('div.time-block').removeClass('past present future');
$('.time-block').each(function(){
  
  var hrNumber = $(this).attr('id').substr(5);

  if (hrNumber===currentHour){
    $(this).addClass('present');
  }
  else if (hrNumber<currentHour){
    $(this).addClass('past');
  }
  else{
    $(this).addClass('future');
  };
});

//Event listener that saves the user-entered data to local storage under the appropriate timeslot when that timeslot's save button is clicked.
$('.saveBtn').on('click', function(){
  var hourSave = $(this).parent().get(0).id;
  var textSave = $(this).siblings('.description').get(0).value;
  var details = {
    'Hour' : hourSave,
    'Message' : textSave
  };
  var textArray;

  if (localStorage.getItem('dailyMessages')===null){
    textArray = [];
    textArray.push(details);
  }
  else {
    textArray = JSON.parse(localStorage.getItem('dailyMessages'));

    function findHour(reminders){
      return reminders.Hour === details.Hour; 
    };

    var positionOfHour = (textArray.findIndex(findHour));
    if(positionOfHour===-1){
      textArray.push(details);
    }
    else {
      textArray.splice(positionOfHour, 1, details);

    };
  };

  localStorage.setItem('dailyMessages', JSON.stringify(textArray)); 
  $('#confirmation').show(500).delay(2500).hide(500);
});

//Event listener for extra button added to clear all the tasks from the local storage.
$('#clrButton').on('click', function(){
  var recoveredTasks = JSON.parse(localStorage.getItem('dailyMessages'));
  recoveredTasks=[];
  localStorage.setItem('dailyMessages', JSON.stringify(recoveredTasks));
  location.reload();
});

//Formatting of button when hovered over.
$('#clrButton').hover(function(){
  $(this).css('background-color', 'red');
},
function(){
  $(this).css('background-color', '#ff6961');
});
});
