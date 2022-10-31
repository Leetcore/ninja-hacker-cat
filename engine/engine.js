import { detection } from "./detection.js"
import { request } from "./helper.js"

// this engine will make requests based on the current url
export async function engine(rules, detectedTags, url) {
	let parsed_url = new URL(url)
	let rootUrl = parsed_url.protocol + "//" + parsed_url.hostname
	if (url.includes(":")) {
		rootUrl = parsed_url.protocol + "//" + parsed_url.hostname + ":" + parsed_url.port
	}

	for (let rule of rules) {
		// filter checks with tags
		// check if rule has a the same tag as in detectedTags
		if (!checkIfRuleTagMatches(rule.tags, detectedTags)) {
			continue
		}

		// only execute rule if tags match
		if (rule.paths) {
			// filter rules by detect tags
			for (let path of rule.paths) {
				// filter url and remove last "/"
				if (url[url.length - 1] == "/") {
					url = url.substring(0, url.length - 1)
				}

				let request_url = url + path

				if (window.nhc_alreadyVisited(request_url)) {
					continue
				}

				// run request
				let result = await request(
					request_url,
					null,
					rule.method,
					rule.postBody,
					rule.postJSON
				)

				// detection based on server answer
				detection(request_url, rule, result.response, result.body, path)
			}
		} else if (rule.rootPaths) {
			for (let rootPath of rule.rootPaths) {
				let request_url = rootUrl + rootPath

				if (window.nhc_alreadyVisited(request_url)) {
					continue
				}

				// run request
				let result = await request(
					request_url,
					rule.headers,
					rule.method,
					rule.postBody,
					rule.postJSON
				)

				// detection based on server answer
				detection(request_url, rule, result.response, result.body, rootPath)
			}
		} else if (rule.params) {
			let split_url = url.split("?")
			if (split_url.length == 0) {
				console.warn("Url has no ? sign.")
				continue
			}

			for (let rule_param of rule.params) {
				let urlParams = new URLSearchParams(split_url[1])
				let paramCount = Array.from(urlParams).length

				// iterate the params and change the param at the index
				for (let index = 0; index < paramCount; index++) {
					let key = Array.from(urlParams)[index][0]
					urlParams = new URLSearchParams(split_url[1])

					if (rule.replaceParamValue) {
						urlParams.set(key, rule_param)
					} else {
						let current_param = urlParams.get(key)
						urlParams.set(key, current_param + rule_param)
					}

					let request_url = split_url[0] + "?" + urlParams.toString()
					if (window.nhc_alreadyVisited(request_url)) {
						continue
					}

					// run request
					let result = await request(
						request_url,
						rule.headers,
						rule.method,
						rule.postBody,
						rule.postJSON
					)

					detection(request_url, rule, result.response, result.body, rule_param)
				}
			}
		} else if (rule.ports) {
			let url_parsed = new URL(url)
			for (let port of rule.ports) {
				let protocol = "https://"
				if (port.includes("80")) {
					protocol = "http://"
				}
				try {
					let request_url = protocol + url_parsed.hostname + ":" + port
					if (window.nhc_alreadyVisited(request_url)) {
						continue
					}

					// run request
					let result = await request(
						request_url,
						null,
						"HEAD",
						null,
						null
					)

					detection(request_url, rule, result.response, "", port)
				} catch (e) {
					console.warn(e)
				}
			}
		} else {
			// rules based on tags
			let request_url = url

			// run request
			let result = await request(
				request_url,
				rule.headers,
				rule.method,
				rule.postBody,
				rule.postJSON
			)

			detection(request_url, rule, result.response, result.body, rule.detectedBy)
		}
	}
}

function checkIfRuleTagMatches(tags, detectedTags) {
	return tags.find(tag => {
		for (let detectedTag of detectedTags) {
			if (tag == detectedTag) {
				return true;
			}
		}
		// rule with all tag
		if (tag == "all") {
			return true;
		}
		return false;
	});
}