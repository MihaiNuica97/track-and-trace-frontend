$(document).ready(() => {
	let usernameHTML = $("#username");
	let username = localStorage.getItem("username");
	usernameHTML.text(username);
	getVenues();
	$("#search-box").on("input", function () {
		filterVenues();
	});
});

function filterVenues() {
	// let searchBox =
	let filter = $("#search-box").val().trim().toLowerCase();
	let venues = $("#venuesTableBody").find(".venue-entry");
	// console.log(venues);
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

function getVenues() {
	$.ajax({
		type: "GET",
		url: "https://mcn1g15-cw1.azurewebsites.net/api/getVenues",
		success: (response) => {
			populateVenuesTable(JSON.parse(response));
		},
	});
}

function populateVenuesTable(venues) {
	console.log(venues);
	let tableBody = $("#venuesTableBody");
	tableBody.empty();
	venues.forEach((venue) => {
		console.log(venue.Name);
		let template = $(
			"<tr class='venue-entry' >" + "<td>" + venue.Name + "</td>" + "</tr>"
		);
		template.data("name", venue.Name);
		template.appendTo(tableBody);
	});
}

function addVenue() {
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
