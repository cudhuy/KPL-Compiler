$( "#snowEffect" ).click(function() {
  if ($('#snowEffectDiv').css('display') == 'none') {
    $("#snowEffectDiv").css("display", "block");
  } else {
    $("#snowEffectDiv").css("display", "none");
  }
});

var wakeuptime = 7;
var noon = 12;
var lunchtime = 12;
var naptime = lunchtime + 6;
var partytime;
var evening = 18;


var showWeather = function() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=e97106cc1c4239e1cc725f162b0dfc80')
  .then(response => response.json())
  .then(data => {
    var nameCity = data['name'];
    var tempValue = data['main']['temp'] - 272.15;
    var tempMax = data['main']['temp_max'] - 272.15;
    var tempMin = data['main']['temp_min'] - 272.15;
    var tempFeel = data['main']['feels_like'] - 272.15;
    let description = data.weather[0].description;
    let iconUrl = 'http://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png';
    document.getElementById('description_weather').innerHTML = description;
    document.getElementById('temp_weather').innerHTML = tempValue;
    document.getElementById('temp_feel').innerHTML ='Cảm giác như '+ tempFeel.toFixed(2) + '&#8304C';
    document.getElementById('temp_max').innerHTML = tempMax + '&#8304C';
    document.getElementById('temp_min').innerHTML = tempMin + '&#8304C';
    document.getElementById('icon_weather').src = iconUrl;
  })
}

var changeBackground = function() {
  var time = new Date().getHours();
  if (time >= evening || time <= 5) {
    document.body.style.background = "#000000 url('https://i.pinimg.com/originals/ea/e0/8d/eae08de416f98887fbf085b23668024f.jpg') no-repeat center fixed";
  } else {
    document.body.style.background = "#ffffff url('https://cdn.hipwallpaper.com/i/61/49/UGF3l9.jpg') no-repeat center fixed";
  }
 
}
// Getting it to show the current time on the page
var showCurrentTime = function()
{
    // display the string on the webpage
    var clock = document.getElementById('clock');
 
    var currentTime = new Date();
 
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var meridian = "AM";
 
    // Set hours
	  if (hours >= noon)
	  {
		  meridian = "PM";
	  }

	  if (hours > noon)
	  {
		  hours = hours - 12;
	  }
 
    // Set Minutes
    if (minutes < 10)
    {
        minutes = "0" + minutes;
    }
 
    // Set Seconds
    if (seconds < 10)
    {
        seconds = "0" + seconds;
    }
 
    // put together the string that displays the time
    var clockTime = hours + ':' + minutes + ':' + seconds + " " + meridian + "!";
 
    clock.innerText = clockTime;
};

// Getting the clock to increment on its own and change out messages and pictures
var updateClock = function() 
{
  var time = new Date().getHours();
  var messageText;
  var image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/normalTime.jpg";

  var timeEventJS = document.getElementById("timeEvent");
  var lolcatImageJS = document.getElementById('lolcatImage');
  
  if (time == partytime)
  {
    image = "https://wallpaperaccess.com/full/127027.jpg";
    messageText = "Let's party!";
  }
  else if (time == wakeuptime)
  {
    image = "https://toppng.com/uploads/preview/wake-up-11549821955qhw72xeywo.png";
    messageText = "Wake up!";
  }
  else if (time == lunchtime)
  {
    image = "https://wallpaperaccess.com/full/1843936.jpg";
    messageText = "Let's have some lunch!";
  }
  else if (time == naptime)
  {
    image = "https://wallpaperaccess.com/full/138469.jpg";
    messageText = "Let's have some dinner!";
  }
  else if (time < noon)
  {
    image = "https://m.media-amazon.com/images/I/91czMsIDWzL._AC_SL1500_.jpg";
    messageText = "Good morning!";
  }
  else if (time >= evening)
  {
    image = "https://images.guucdn.net/full/2016/07/01/8dda5e8ed9e35d0d18e5e05d31172310d9d488d7.jpg";
    messageText = "Good evening!";
  }
  else
  {
    image = "https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-ch%E1%BB%A5p-ho%C3%A0ng-h%C3%B4n-%C4%91%E1%BA%B9p.jpg";
    messageText = "Good afternoon!";
  }

  console.log(messageText); 
  timeEventJS.innerText = messageText;
  lolcatImage.src = image;
  
  showCurrentTime();
  changeBackground();
  showWeather();
};
updateClock();

// Getting the clock to increment once a second
var oneSecond = 1000;
setInterval( updateClock, oneSecond);


// Getting the Party Time Button To Work
var partyButton = document.getElementById("partyTimeButton");
var snowButton = document.getElementById("snowEffect");
var divSnow = document.getElementById('snowEffectDiv');
// var changeEffect = function()
// {

//   if (!(window.getComputedStyle(divSnow).display === "none")) {
//     document.getElementById('snowEffectDiv').style.visibility = 'hidden'; 
//   } else {
//     document.getElementById('snowEffectDiv').style.visibility = 'visible'; 
//     console.log('day');
//   }
  
// };
// snowButton.addEventListener("click", changeEffect);


var partyEvent = function()
{
    if (partytime < 0) 
    {
        partytime = new Date().getHours();
        partyTimeButton.innerText = "Party Over!";
        partyTimeButton.style.backgroundColor = "#0A8DAB";
    }
    else
    {
        partytime = -1;
        partyTimeButton.innerText = "Party Time!";
        partyTimeButton.style.backgroundColor = "#222";
    }
};

partyButton.addEventListener("click", partyEvent);
partyEvent(); 


// Activates Wake-Up selector
var wakeUpTimeSelector =  document.getElementById("wakeUpTimeSelector");

var wakeUpEvent = function()
{
    wakeuptime = wakeUpTimeSelector.value;
};

wakeUpTimeSelector.addEventListener("change", wakeUpEvent);


// Activates Lunch selector
var lunchTimeSelector =  document.getElementById("lunchTimeSelector");

var lunchEvent = function()
{
    lunchtime = lunchTimeSelector.value;
};

lunchTimeSelector.addEventListener("change", lunchEvent);


// Activates Nap-Time selector
var napTimeSelector =  document.getElementById("napTimeSelector");

var napEvent = function()
{
    naptime = napTimeSelector.value;
};

napTimeSelector.addEventListener("change", napEvent);

!function() {

  var today = moment();

  function Calendar(selector, events) {
    this.el = document.querySelector(selector);
    this.events = events;
    this.current = moment().date(1);
    this.draw();
    var current = document.querySelector('.today');
    if(current) {
      var self = this;
    }
  }

  Calendar.prototype.draw = function() {
    //Create Header
    this.drawHeader();

    //Draw Month
    this.drawMonth();

  }

  Calendar.prototype.drawHeader = function() {
    var self = this;
    if(!this.header) {
      //Create the header elements
      this.header = createElement('div', 'header');
      this.header.className = 'header';

      this.title = createElement('h1');

      var right = createElement('div', 'right');
      right.addEventListener('click', function() { self.nextMonth(); });

      var left = createElement('div', 'left');
      left.addEventListener('click', function() { self.prevMonth(); });

      //Append the Elements
      this.header.appendChild(this.title); 
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    }

    this.title.innerHTML = this.current.format('MMMM YYYY');
  }

  Calendar.prototype.drawMonth = function() {
    var self = this;
    
    this.events.forEach(function(ev) {
     ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
    });
    
    
    if(this.month) {
      this.oldMonth = this.month;
      this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
      this.oldMonth.addEventListener('webkitAnimationEnd', function() {
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        self.month = createElement('div', 'month');
        self.backFill();
        self.currentMonth();
        self.fowardFill();
        self.el.appendChild(self.month);
        window.setTimeout(function() {
          self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
        }, 16);
      });
    } else {
        this.month = createElement('div', 'month');
        this.el.appendChild(this.month);
        this.backFill();
        this.currentMonth();
        this.fowardFill();
        this.month.className = 'month new';
    }
  }

  Calendar.prototype.backFill = function() {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if(!dayOfWeek) { return; }

    clone.subtract('days', dayOfWeek+1);

    for(var i = dayOfWeek; i > 0 ; i--) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.fowardFill = function() {
    var clone = this.current.clone().add('months', 1).subtract('days', 1);
    var dayOfWeek = clone.day();

    if(dayOfWeek === 6) { return; }

    for(var i = dayOfWeek; i < 6 ; i++) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.currentMonth = function() {
    var clone = this.current.clone();

    while(clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add('days', 1);
    }
  }

  Calendar.prototype.getWeek = function(day) {
    if(!this.week || day.day() === 0) {
      this.week = createElement('div', 'week');
      this.month.appendChild(this.week);
    }
  }

  Calendar.prototype.drawDay = function(day) {
    var self = this;
    this.getWeek(day);

    //Outer Day
    var outer = createElement('div', this.getDayClass(day));

    //Day Name
    var name = createElement('div', 'day-name', day.format('ddd'));

    //Day Number
    var number = createElement('div', 'day-number', day.format('DD'));


    //Events
    var events = createElement('div', 'day-events');
    this.drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(number);
    outer.appendChild(events);
    this.week.appendChild(outer);
  }

  Calendar.prototype.drawEvents = function(day, element) {
    if(day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function(memo, ev) {
        if(ev.date.isSame(day, 'day')) {
          memo.push(ev);
        }
        return memo;
      }, []);

      todaysEvents.forEach(function(ev) {
        var evSpan = createElement('span', ev.color);
        element.appendChild(evSpan);
      });
    }
  }

  Calendar.prototype.getDayClass = function(day) {
    classes = ['day'];
    if(day.month() !== this.current.month()) {
      classes.push('other');
    } else if (today.isSame(day, 'day')) {
      classes.push('today');
    }
    return classes.join(' ');
  }



  Calendar.prototype.nextMonth = function() {
    this.current.add('months', 1);
    this.next = true;
    this.draw();
  }

  Calendar.prototype.prevMonth = function() {
    this.current.subtract('months', 1);
    this.next = false;
    this.draw();
  }

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if(className) {
      ele.className = className;
    }
    if(innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
}();

!function() {
  var data = [
  
  ];

  

  function addDate(ev) {
    
  }

  var calendar = new Calendar('#calendar', data);

}();
