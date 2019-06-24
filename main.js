const time = document.querySelector('#time');
const name = document.querySelector('#name');
const greeting = document.querySelector('#greeting');
const reminder = document.querySelector('#reminder');
const hourFormat = document.querySelector('.hour-format');
const amPmFormat = document.querySelector('.am-pm');
let amPm = '';

// Toggle Options 
let format12 = JSON.parse(localStorage.getItem('format12'));
let amPmActive = JSON.parse(localStorage.getItem('amPmActive'));

if (format12 === null) {
	format12 = true;
}

if (amPmActive === null) {
	amPmActive = true;
}

// Functions

function showTime() {
	let today = new Date(),
		hour = today.getHours(),
		minutes = today.getMinutes(),
		seconds = today.getSeconds();

	// Convert to 12hr Format 
	if (format12) {
		hour = hour % 12 || 12;
	}
	if (amPmActive) {
		amPm = hour >= 12 ? 'PM' : 'AM';
	} else {
		amPm = "";
	};

	// Time Output 
	time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)} ${amPm}`;

	setTimeout(showTime, 500);
}

// Add a zero when there is only one
function addZero(number) {
	return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

// Set the background

function setBackground() {
	let today = new Date(),
		hour = today.getHours();

	if (hour < 6) {
		document.body.style.backgroundImage = 'url(images/jason-leung-757213-unsplash.jpg)';
		greeting.textContent = 'Morning.';
	} else if (hour < 12) {
		document.body.style.backgroundImage = 'url(images/jake-givens-576-unsplash.jpg)';
		greeting.textContent = 'Morning!';
	} else if (hour < 18) {
		document.body.style.backgroundImage = 'url(images/neil-thomas-39959-unsplash.jpg)';
		greeting.textContent = 'Good Afternoon';
		document.body.style.color = '#eee';
	} else {
		document.body.style.backgroundImage = 'url(images/zac-ong-394558-unsplash.jpg';
		document.body.style.color = '#eee';
		greeting.textContent = 'Good night.';
	}
}

// Get and Set Name
function getName() {
	if(localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
		name.textContent = '[Enter Name]';
	} else {
		name.textContent = localStorage.getItem('name')
	}
}

function setName(e) {
	if(e.type === 'keypress') {
		if (e.keyCode == 13) {
			localStorage.setItem('name', e.target.innerText);
			name.blur();
		}
	} else {
		localStorage.setItem('name', e.target.innerText);
	}
}

// Get and Set Reminder
let reminderDate = (localStorage.getItem('reminderDate'));
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
reminder.addEventListener('keypress', setReminder);
reminder.addEventListener('blur', setReminder);
checkReminder();


function getReminder() {
	if(localStorage.getItem('reminder') === null || localStorage.getItem('reminder') === '') {
		reminder.textContent = '[Enter Today\'s Goal]';
	} else {
		reminder.textContent = localStorage.getItem('reminder')
	}
}

function setReminder(e) {
	if(e.type === 'keypress') {
		if (e.keyCode == 13) {
			localStorage.setItem('reminder', e.target.innerText);
			reminder.blur();
			checkReminder();
		}
	} else {
		localStorage.setItem('reminder', e.target.innerText);
		checkReminder();
	}
	reminderDate = new Date();
	localStorage.setItem('reminderDate', reminderDate.getTime());
}

// Show reminder warning when next day

function checkReminder() {
	let today = new Date();
	today = today.getTime();
	if (today - reminderDate > 172800) {
		document.querySelector('#reminderTitle').innerHTML = 'Complete that goal!';
		document.querySelector('#reminder').style.fontSize = '2.5rem';
	} else if (today - reminderDate > 86400) {
		document.querySelector('#reminderTitle').innerHTML = 'Yesterday\'s Goal';
		document.querySelector('#reminder').style.fontSize = '2rem';
	} else {
		document.querySelector('#reminderTitle').innerHTML = 'Today\'s Goal';
		document.querySelector('#reminder').style.fontSize = '1.5rem';
	};
};

// Random Fact
function randomFact() {
	const xhttp = new XMLHttpRequest();
	const url = "https://geek-jokes.sameerkumar.website/api";
	xhttp.open("GET", url);
	xhttp.send(); 

	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	response = this.response;
	    	setFact(response);
	    }
	};

	setTimeout(randomFact, 15000);

}

function setFact(xml) {
	document.querySelector(".fact").innerHTML = xml;
}

// Toggles

function setToggleValues() {
	setHourFormat(format12);
	setAmPmFormat(amPmActive);
}

hourFormat.addEventListener('click', () => {
	format12 = !format12;
	setHourFormat(format12);
})

function setHourFormat(format12) {
	if (format12) {
		amPmFormat.classList.remove('deactivate');
		hourFormat.classList.add('active');
	} else {
		hourFormat.classList.remove('active');
		amPmFormat.classList.remove('active');
		amPmFormat.classList.add('deactivate');
		amPmActive = false;
	};
	localStorage.setItem('format12', format12);
	localStorage.setItem('amPmActive', amPmActive);
}

amPmFormat.addEventListener('click', () => {
	amPmActive = !amPmActive;
	setAmPmFormat(amPmActive);
})

function setAmPmFormat(amPmActive) {
	if (amPmActive) {
		amPmFormat.classList.add('active');	
	} else {
		amPmFormat.classList.remove('active')
	};
	localStorage.setItem('amPmActive', amPmActive);
}


// Run
checkReminder();
setToggleValues();
setBackground();
getName();
getReminder();
randomFact();
showTime();