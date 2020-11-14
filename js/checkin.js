var venue;
$(document).ready(() => {
	// initial page setup. Grabs data from localstorage and binds event listeners
	let venueNameHTML = $("#venuename");
	venue = JSON.parse(localStorage.getItem("venueToCheckIn"));
	venueNameHTML.text(venue.Name);
	console.log(venue);
});

function checkIn() {
	// let venueName = $("#venuename").val().trim();

	// if (venueName != "") {
	$.ajax({
		type: "POST",
		url: "https://mcn1g15-cw1.azurewebsites.net/api/checkIn",
		data: JSON.stringify({
			venueName: venue.Name,
			username: localStorage.getItem("username"),
		}),
		success: (response) => {
			console.log(response);
			// getVenues();
		},
	});
}
//  else {
// }
