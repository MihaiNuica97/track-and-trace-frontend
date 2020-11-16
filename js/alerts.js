$(document).ready(() => {
	getAlerts();
	$("#alerts-search-box").on("input", function () {
		filterAlerts();
	});
});

function getAlerts() {
	$.ajax({
		type: "POST",
		url: "https://mcn1g15-cw1.azurewebsites.net/api/getAlertsByUser",
		data: JSON.stringify({
			userName: localStorage.getItem("username"),
		}),
		success: (r) => {
			response = JSON.parse(r);
			console.log(response);
			populateAlertsTable(response);
		},
	});
}

function populateAlertsTable(alerts) {
	// generates a HTML row in the table for each entry in the Venues table
	let tableBody = $("#alertsTableBody");
	tableBody.empty();
	alerts.forEach((alert) => {
		let dateOB = new Date(alert.Date);
		let dateString =
			dateOB.getDate() +
			"." +
			(dateOB.getMonth() + 1) +
			"." +
			dateOB.getFullYear();

		// dinamically generate table entry
		let template = $(
			"<tr class='alert-entry' >" +
				"<td>" +
				alert.Venue +
				"</td>" +
				"<td>" +
				dateString +
				"</td>" +
				"</tr>"
		);
		template.appendTo(tableBody);
	});
	filterAlerts();
}

function filterAlerts() {
	// filters the table according to the search box at the top
	let filter = $("#alerts-search-box").val().trim().toLowerCase();
	let alerts = $("#alertsTableBody").find(".alert-entry");
	alerts.each(function () {
		let alert = $(this);
		let name = alert.first().text();
		if (name.toLowerCase().indexOf(filter) == -1) {
			alert.hide();
		} else {
			alert.show();
		}
	});
}
