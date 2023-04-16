// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.



$(function () {
  var saveBtnEl = document.querySelectorAll('button')
  var textContainer = document.querySelectorAll('textarea')
  var currentDayEl = document.getElementById('currentDay')

//displays the current date
  function displayTime() {
    var rightNow = dayjs().format('dddd, MMMM D');
    currentDayEl.textContent = rightNow;
  }

  // saves user input along with which hour
  function savingPlan(event) {
    // create an empty array to hold all hour plans
    var hourPlans = [];

    // loop through every text area
    for (var i = 0; i < textContainer.length; i++) {
      // user input for each container
      var userInput = textContainer[i].value.trim();
      // the time of day when the userInput was saved
      var timeOfDay = textContainer[i].parentNode.getAttribute('id');
      // combined timeOfDay and userInput into one object 
      var hourPlan = {
        time: timeOfDay,
        text: userInput
      };
      // add the hour plan to the array of all hour plans
      hourPlans.push(hourPlan);
    }

    // save all hour plans to local storage
    saveToLocal(hourPlans);
    // print all hour plans to the page
    printHourPlans();
  }


  // saves to local storage
  function saveToLocal(hourPlan) {
    window.localStorage.setItem('hourPlan', JSON.stringify(hourPlan));
  }

  function getFromLocal() {
    var hourPlans = window.localStorage.getItem('hourPlan');
    if (hourPlans){
      hourPlans = JSON.parse(hourPlans);
    } else {
      hourPlans = [];
    }
    return hourPlans;
  }


  function printHourPlans () {
    var hourPlan = getFromLocal();
    for (var i = 0; i < hourPlan.length; i+=1) {
      var timeOfDay = hourPlan[i].time;
      var userInput = hourPlan[i].text;
      
      // find the textarea with the corresponding timeOfDay
      var textareaEl = document.getElementById(timeOfDay).querySelector('textarea');

      
      // set the value of the textarea to the saved user input
      if (textareaEl) {
        textareaEl.value = userInput;
      }
    }
  }

  function updateTimeBlocks() {
    // get the current hour
    var currentHour = dayjs().hour();

    // loop through each time block
    for (var i = 9; i <= 17; i++) {
      // get the time block element based on the ID
      var timeBlockEl = document.getElementById("hour-" + i);
      // update the class of the time block based on the current time
      if (i < currentHour) {
        timeBlockEl.classList.remove('future');
        timeBlockEl.classList.remove('present');
        timeBlockEl.classList.add('past');
      } else if (i === currentHour) {
        timeBlockEl.classList.remove('past');
        timeBlockEl.classList.remove('future');
        timeBlockEl.classList.add('present');
      } else {
        timeBlockEl.classList.remove('past');
        timeBlockEl.classList.remove('present');
        timeBlockEl.classList.add('future');
      }
    }
  }
  updateTimeBlocks()



  displayTime();
  // used a for loop to target all of the buttons
  for (var i = 0; i < saveBtnEl.length; i++) {
    // added an eventListener to all the buttons with a function
    saveBtnEl[i].addEventListener('click', savingPlan);
  }
  // print all hour plans to the page
  printHourPlans();
});






