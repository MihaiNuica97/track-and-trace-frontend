var venue;
$(document).ready(() => {
	// initial page setup. Grabs data from localstorage and binds event listeners
	let venueNameHTML = $("#venuename");
	venue = JSON.parse(localStorage.getItem("venueToCheckIn"));
	venueNameHTML.text(venue.Name);
	console.log(venue);
	let today = new Date();
	let dateString =
		today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	$("#checkindate").val(dateString);
});

function checkIn() {
	// grab date
	let checkinDate = $("#checkindate").val().trim();
	let dateOb = new Date(checkinDate);

	// grab usernames
	let username = localStorage.getItem("username");
	let additionalUsers = $(".addusername");
	console.log(dateOb.toISOString());
	let usernames = [];
	usernames.push(username);
	additionalUsers.each(function () {
		let newUser = $(this);
		usernames.push(newUser.val());
	});
	usernames = $.uniqueSort(usernames);
	// send the sanitized usernames to the api
	validateUsersBeforeCheckin(usernames, dateOb);
}
function addUser() {
	let container = $("#addusercon");
	let template = $(
		'<div class="container">' +
			'<input type="text" class="form-control mb-3 w-25 addusername" placeholder="Name...">' +
			"</div>"
	);
	template.appendTo(container);
}

function validateUsersBeforeCheckin(usernames, dateOb) {
	// check to see which users actually exist
	$.ajax({
		type: "POST",
		url: "https://mcn1g15-cw1.azurewebsites.net/api/validateUsers",
		data: JSON.stringify({
			users: usernames,
		}),
		success: (r) => {
			let response = JSON.parse(r);
			console.log(response);
			// then make a checkin for each of them at the specified venue
			$.ajax({
				type: "POST",
				url: "https://mcn1g15-cw1.azurewebsites.net/api/checkIn",
				data: JSON.stringify({
					venueName: venue.Name,
					users: response.validUsers,
					date: dateOb.toISOString(),
				}),
				success: (r2) => {
					let response2 = JSON.parse(r2);
					console.log(response2);
					let success = $("#successcon");
					let checkin = $("#checkincon");
					checkin.hide();
					success.show();
				},
			});
		},
	});
}
