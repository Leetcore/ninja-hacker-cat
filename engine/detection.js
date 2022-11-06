class Message {
	constructor(url, title, detectedBy, size, avatar, critLevel) {
		this.url = url
		this.title = title
		this.detectedBy = detectedBy
		this.size = size
		this.avatar = avatar
		this.critLevel = critLevel || 0
		this.render()
	}

	render() {
		const messageBox = document.querySelector("#messageBox");
		// higher critlevel should be on top
		let position = "beforeend"
		if (this.critLevel > 1) {
			position = "afterbegin"
		}
		messageBox.insertAdjacentHTML(position, `
		<div class="message">
			<span class="title" id="this_title"></span><br/>
			<a id="this_url"></a>
			<span class="size">Size: <span id="this_size"></span></span><br/>
			<span class="detect">
				Detected by: <span class="method" id="this_detectedBy"></span>
			</span>
		</div>`)
		document.querySelector('#this_title').textContent = this.title
		document.querySelector('#this_title').removeAttribute('id')
		document.querySelector('#this_url').textContent = this.url
		document.querySelector('#this_url').href = this.url
		document.querySelector('#this_url').removeAttribute('id')
		document.querySelector('#this_size').textContent = this.size
		document.querySelector('#this_size').removeAttribute('id')
		document.querySelector('#this_detectedBy').textContent = this.detectedBy
		document.querySelector('#this_detectedBy').removeAttribute('id')

		if (this.critLevel > 0) {
			document.querySelector('#sound').src = "sounds/miau1.mp3"
			document.querySelector('#sound').play()
		}


		// change the cat -> only show the highest critLevel
		if (this.avatar && this.critLevel >= window.nhc_currentCritLevel) {
			window.nhc_currentCritLevel = this.critLevel
			document.querySelectorAll('.avatar').forEach(avatar => {
				avatar.style.display = 'none';
			})
			if (document.querySelector(`#${this.avatar}`)) {
				document.querySelector(`#${this.avatar}`).style.display = 'block'
			}
		}

		if (this.critLevel > 0) {
			browser.notifications.create(
				{
					type: 'basic',
					title: 'Miau!',
					message: `${this.title} (${this.detectedBy})`,
				}
			)
		}

		document.querySelector('#reset').classList.remove('hidden')
	}
}

export function detection(request_url, rule, response, body = "", detectedBy = "") {
	let status_code = response.status
	let status_filtered = (rule.filterStatusCodes || [])
		.find(statusCode => statusCode === status_code.toString())
	let status_matched = (rule.detectStatusCodes || [])
		.find(statusCode => statusCode === status_code.toString())

	// detection: match status code or skip if no one is set
	if (status_filtered || !rule.filterStatusCodes) {
		// detect substring in response body
		for (let detect of (rule.detectResponses || [])) {
			// simple response detection with strings
			if (body.toLowerCase().indexOf(detect.toLowerCase()) >= 0) {
				new Message(
					request_url,
					rule.title,
					detectedBy,
					body.length,
					rule.cat,
					rule.critLevel
				)
				break
			}
		}

		// detect version with regex
		if (rule.regexVersion) {
			let regex = new RegExp(rule.regexVersion)
			let detectMatch = null
			if (rule.matchRegexHeaderName) {
				let header = response.headers.get(rule.matchRegexHeaderName)
				detectMatch = header.match(regex)
			} else {
				detectMatch = body.match(regex)
			}

			if (detectMatch && detectMatch.length > 0) {
				let version = detectMatch[1]
				if (checkIfVersionNumbersMatches(version, rule.minVersion, rule.maxVersion)) {
					new Message(
						request_url,
						rule.title,
						detectedBy,
						body.length,
						rule.cat,
						rule.critLevel
					)
				}
			}
		}

		// detect if a specific response header is there
		for (let detect of (rule.detectHeaders || [])) {
			if (response.headers.get(detect)) {
				new Message(
					request_url,
					rule.title,
					detectedBy,
					body.length,
					rule.cat,
					rule.critLevel
				)
				break
			}
		}
	}

	if (status_matched && !status_filtered) {
		// check if redirect is a must have
		if (rule.isRedirected && !response.redirected) {
			return;
		}

		if (rule.skipRedirected && response.redirected) {
			return;
		}

		// detection based only on response status code
		for (let status of rule.detectStatusCodes) {
			if (status_matched == status) {
				new Message(
					request_url,
					rule.title,
					detectedBy,
					body.length,
					rule.cat,
					rule.critLevel
				)
				break
			}
		}
	}
}

function checkIfVersionNumbersMatches(version, minVersion, maxVersion) {
	let normalizedVersionString = version.split(".")
		.map(num => num.padStart(8, "0"))
		.join(".")
	let normalizedMinVersionString = minVersion.split(".")
		.map(num => num.padStart(8, "0"))
		.join(".")
	let normalizedMaxVersionString = maxVersion.split(".")
		.map(num => num.padStart(8, "0"))
		.join(".")

	return normalizedMinVersionString <= normalizedVersionString
		&& normalizedMaxVersionString >= normalizedVersionString;
}