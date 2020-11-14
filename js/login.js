$(document).keypress(function (e) {
	var keycode = e.keyCode ? e.keyCode : e.which;
	if (keycode == 13) {
		login();
	}
});

function login() {
	let username = $("#username").val().trim();
	// we send an API request with our username to see if we are registered
	let loginerror = $("#loginerror");
	let registererror = $("#registererror");
	let emptyUserError = $("#emptyusererror");

	loginerror.hide();
	registererror.hide();
	emptyUserError.hide();

	if (username != "") {
		$.ajax({
			type: "POST",
			url: "https://mcn1g15-cw1.azurewebsites.net/api/login",
			data: JSON.stringify({
				username: username,
			}),
			success: (response) => {
				if (response == "True") {
					// if we are, store the username in local storage and go to homepage
					localStorage.setItem("username", username);
					window.location.href = "./index.html";
				} else {
					loginerror.show();
				}
			},
		});
	} else {
		emptyUserError.show();
	}
}

function registerUser() {
	let username = $("#username").val().trim();
	// we send an API request with our username to see if we are registered
	let loginerror = $("#loginerror");
	let registererror = $("#registererror");
	let emptyUserError = $("#emptyusererror");

	loginerror.hide();
	registererror.hide();
	emptyUserError.hide();
	if (username != "") {
		$.ajax({
			type: "POST",
			url: "https://mcn1g15-cw1.azurewebsites.net/api/registerUser",
			data: JSON.stringify({
				username: username,
			}),
			success: (response) => {
				console.log(response);
				if (response == "True") {
					// if we are, store the username in local storage and go to homepage
					localStorage.setItem("username", username);
					window.location.href = "./index.html";
				} else {
					registererror.show();
				}
			},
		});
	} else {
		emptyUserError.show();
	}
}
