async function login() {
	var username = document.querySelector("#username").value;
	var password = document.querySelector("#password").value;

	var params = {
		username: username,
		password: password
	};

	var result = await fetch("/login", {method: "POST", body: JSON.stringify(params)});
	if (result && result.success) {
		document.querySelector('#status').innerText = "Successfully logged in.";
	} else {
		document.querySelector('#status').innerText = "Error logging in.";
	}
}

async function logout() {
	var result = await fetch("/logout", {method: "POST"});
	if (result && result.success) {
		document.querySelector('#status').innerText = "Successfully logged out.";
	} else {
		document.querySelector('#status').innerText = "Error logging out.";
	}
}

async function getServerTime() {
	try {
		var result = await fetch("/getServerTime");
		if (result && result.success) {
			document.querySelector('#status').innerText = "Server time: " + result.time;
		} else {
			document.querySelector('#status').innerText = "Got a result back, but it wasn't a success. Your reponse should have had a 401 status code.";
		}
	}
	catch {
		document.querySelector('#status').innerText = "Could not get server time.";
	}
}