$(document).ready(() => {
	// initial page setup. Grabs data from localstorage and binds event listeners
	let usernameHTML = $("#username");
	let username = localStorage.getItem("username");
	usernameHTML.text(username);
	// populates venues table
	getVenues();
	// binds the event listener for the venue search box
	$("#search-box").on("input", function () {
		filterVenues();
	});
	// when the add venue input is selected, pressing the enter key automatically submits the request
	// just a quality of life thing
	$("#venuename").on("keypress", function (e) {
		var keycode = e.keyCode ? e.keyCode : e.which;
		if (keycode == 13) {
			addVenue();
		}
	});
});

var allVenues = [];
function filterVenues() {
	// filters the table according to the search box at the top
	let filter = $("#search-box").val().trim().toLowerCase();
	let venues = $("#venuesTableBody").find(".venue-entry");
	venues.each(function () {
		let venue = $(this);
		let name = venue.data("name");
		if (name.toLowerCase().indexOf(filter) == -1) {
			venue.hide();
		} else {
			venue.show();
		}
	});
}

function checkIn(venueID) {
	allVenues.forEach((venue) => {
		if (venue.RowKey == venueID) {
			localStorage.setItem("venueToCheckIn", JSON.stringify(venue));
			console.log(localStorage.getItem("venueToCheckIn"));
			window.location.href = "./checkIn.html";
		}
	});
}

function getVenues() {
	// grabs all entries from the Venues table
	$.ajax({
		type: "GET",
		url: "https://mcn1g15-cw1.azurewebsites.net/api/getVenues",
		success: (response) => {
			populateVenuesTable(JSON.parse(response));
			allVenues = JSON.parse(response);
		},
	});
}

function populateVenuesTable(venues) {
	// generates a HTML row in the table for each entry in the Venues table
	console.log(venues);
	let tableBody = $("#venuesTableBody");
	tableBody.empty();
	venues.forEach((venue) => {
		// dynamically bind check-in buttons to their respective event listener
		let checkInBtn =
			"<input onclick=checkIn('" +
			venue.RowKey +
			"') type='button' class='btn btn-primary ' value='Check In'>";
		// dinamically generate table entry
		let template = $(
			"<tr class='venue-entry' >" +
				"<td>" +
				venue.Name +
				"</td>" +
				"<td class='text-center'>" +
				checkInBtn +
				"</td>" +
				"</tr>"
		);
		template.data("name", venue.Name);
		template.appendTo(tableBody);
	});
	filterVenues();
}

function addVenue() {
	// adds a new venue.
	// displays an error if the venue already exists or if the input string is empty
	let venueName = $("#venuename").val().trim();

	if (venueName != "") {
		$.ajax({
			type: "POST",
			url: "https://mcn1g15-cw1.azurewebsites.net/api/addVenue",
			data: JSON.stringify({
				venueName: venueName,
			}),
			success: (response) => {
				console.log(response);
				getVenues();
			},
		});
	} else {
	}
}
