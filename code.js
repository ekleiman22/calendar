

/*A Function that returns the index of the day
of the date- day/month/year
For e.g-

Index	 Day
0		 Sunday
1		 Monday
2		 Tuesday
3		 Wednesday
4		 Thursday
5		 Friday
6		 Saturday*/
const languages = ["Ru", "En"];
const rusMessages = ["Год не определен", "Задать год","Изменить год"];
const rusDayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",];
const rusMonths = [
	"Январь", "Февраль", "Март",
	"Апрель", "Май", "Июнь",
	"Июль", "Август", "Сентябрь",
	"Октябрь", "Ноябрь", "Декабрь"
];
const engMessages = ["Year is not defined", "Set year", "Change year"]
const engDayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa",];
const engMonths = ["January", "February", "March", "April", "May",
	"June", "July", "August", "September", "October", "November", "December"];

var defaultLangIndex = 0;
var currentLangIndex = 0;
var messages = [];
var dayNames = [];

function dayNumberWrong( day,  month,  year)
{
	var  t = [
		0, 3, 2, 5, 0, 3, 5, 1,
		4, 6, 2, 4 ];
	year -= month < 3;
	return Math.floor( (year + year / 4 - year / 100 +
		year / 400 + t[month - 1] + day) % 7);
}
function dayNumber(day, month, year) {
	let dayOfWeek = (year * 365 + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
		Math.floor((year - 1) / 400)) % 7;
	return dayOfWeek;
}

/*
A Function that returns the name of the month
with a given month number

Month Number	 Name
0			 January
1			 February
2			 March
3			 April
4			 May
5			 June
6			 July
7			 August
8			 September
9			 October
10			 November
11			 December */
function getMonthName( monthNumber)
{
	//var months = [
	//	"Январь", "Февраль", "Март",
	//	"Апрель", "Май", "Июнь",
	//	"Июль", "Август", "Сентябрь",
	//	"Октябрь", "Ноябрь", "Декабрь"
	//				];
	var months = [];
	switch (currentLangIndex) {
		case 0:
			months = rusMonths;
			break;
		case 1:
			months = engMonths;
			break;
    }
	return months[monthNumber];
}

/* A Function to return the number of days in
a month

Month Number	 Name	 Number of Days
0			 January	 31
1			 February 28 (non-leap) / 29 (leap)
2			 March	 31
3			 April	 30
4			 May		 31
5			 June	 30
6			 July	 31
7			 August	 31
8			 September 30
9			 October	 31
10			 November 30
11			 December 31

*/
function numberOfDays( monthNumber,  year)
{
	let monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	let result = monthLengths[monthNumber];
	

	// February
	if (monthNumber == 1) {
		// If the year is leap then February has
		// 29 days
		if (year % 400 == 0 ||
			(year % 4 == 0 && year % 100 != 0))
			result=29;	
	}
	return result;
}

function printCalendar(year) {
	var pYear = document.getElementById("pYear");
	pYear.innerHTML = year;
	//define index of the first day of the year in week
	// current is index of first day in current month
	var current= dayNumber(1, 1, year);
	var table = document.getElementById("tbl1");
	table.innerHTML = "";
	//prepare 3-d array of days: 
	var alldays = new Array(12); //months
	//each element of alldays corresponds to a month
	// This element alldays[i] is array of 6 elements where each element
	// is an array of 7 elements and corresponds
	// to complete of partial week
	let curDayIndex = 0;
	let daysCount = 0;
	for (var i = 0; i < 12; i++) {		
	    current = (current + daysCount) % 7;
		alldays[i] = new Array(6);
		//each alldays[i] is an array of 6 elements
		//fill month by weeks
		let month = alldays[i]; //should contain 6 elements -weeks
		daysCount = numberOfDays(i, year);
		curDayIndex = 0;
		let curDay = 1;
        for (var j = 0; j < 6; j++) {
			let week = new Array(7);
            for (var k = 0; k < 7; k++) {
				if (curDayIndex < current || curDay > daysCount)
					week[k] = 0;
				else {
					week[k] = curDay++;
				}
				curDayIndex++;
			}
			alldays[i][j] = week;
		}
		
		
    }
	for (var i = 0; i < 12; i++)
	{
		if (i % 6 == 0) {
			printMonthsHeader(i);
			//add 6 tables under headers
			var row1 = table.insertRow(table.rows.length); //add row for 6 months
			row1.id = "row" + i/6;
		}
		let cell = row1.insertCell(i%6);
			let tbl = document.createElement('table');
		tbl.id = 'table' + i;
		//tbl.border = 1;
			cell.appendChild(tbl);

		
	}
	//now print numbers in these tables
	var cells = [];
	for (var i = 0; i < 12; i++) {
		let month = alldays[i];
		
		let table1 = document.getElementById('table' + i);		
		//insert day names
		let rowDays = table1.insertRow(table1.rows.length);
		for (var k = 0; k < 7; k++) {
			cells[k] = rowDays.insertCell(k);
			cells[k].style.fontWeight="bold"
			cells[k].innerHTML = dayNames[k];
		}

		for (var j = 0; j < 6; j++) {
			let row = table1.insertRow(table1.rows.length);//
			let week = month[j];
			
			var cells = [];
			for (var k = 0; k < 7; k++)
			{
				cells[k] = row.insertCell(k);
				cells[k].innerHTML = week[k] == 0 ? "" : week[k];
			}
        }
    }
	
}

function printMonthsHeader(iCase)
{
	var table = document.getElementById("tbl1");
	var row = table.insertRow(table.rows.length);
	row.id = "monthHeader";
	var cells = [];
	for (var i = 0; i < 6; i++) {
		cells[i] = row.insertCell(i);
		cells[i].innerHTML = getMonthName(i + iCase);
		cells[i].className = "monthHeader";
    }
}

function changeYear() {
	let txtYear = document.getElementById("txtYear");
    try {
		let year = parseInt(txtYear.value);
		if (isNaN(year)) {
			alert(messages[0]);
			return;
		}
		else
			if (year < 0) {
				alert(messages[0]);
				return;
			}

		printCalendar(year);
	}
	catch (e)
	{
		
    }
	
}
function setTextByLang() {
	switch (currentLangIndex) {
		case 0:
			messages = rusMessages;
			dayNames = rusDayNames;
			break;
		case 1:
			messages = engMessages;
			dayNames = engDayNames;
			break;
	}
	let tdChangeYear = document.getElementById("tdChangeYear");
	tdChangeYear.innerHTML = messages[1];
	let btnChangeYear = document.getElementById("btnChangeYear");
	btnChangeYear.value = messages[2];

}

function changeLang() {
	let selLanguage = document.getElementById("selLanguage");
	currentLangIndex = parseInt(selLanguage.value);
	setTextByLang();
	let txtYear = document.getElementById("txtYear");
	let year = txtYear.value;
	printCalendar(year);
}

function main()
{
	setTextByLang();
	//var year = 2023;
	var year = new Date().getFullYear();
	let txtYear = document.getElementById("txtYear");
	txtYear.value = year;
	printCalendar(year);

}
