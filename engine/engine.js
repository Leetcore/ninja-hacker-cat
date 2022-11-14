import { detection } from "./detection.js"
import { request } from "./helper.js"

// this engine will make requests based on the current url
export async function engine(rules, detectedTags, url) {
	let parsedUrl = new URL(url)
	let rootUrl = parsedUrl.protocol + "//" + parsedUrl.hostname
	if (parsedUrl.port.length > 0) {
		rootUrl = parsedUrl.protocol + "//" + parsedUrl.hostname + ":" + parsedUrl.port
	}

	for (let rule of rules) {
		// filter checks with tags
		// check if rule has a the same tag as in detectedTags
		if (!checkIfRuleTagMatches(rule.tags, detectedTags)) {
			continue
		}

		// only execute rule if tags match
		if (rule.paths) {
			console.log("Start detection based on GET paths")
			// filter rules by detect tags
			for (let path of rule.paths) {
				// filter url and remove last "/"
				if (url[url.length - 1] == "/") {
					url = url.substring(0, url.length - 1)
				}

				let requestUrl = url + path

				if (window.nhc_alreadyVisited(requestUrl)) {
					console.log("Skip request: ", requestUrl)
					continue
				}

				// run request
				let result = await request(
					requestUrl,
					null,
					rule.method,
					rule.postBody,
					rule.postJSON
				)

				// detection based on server answer
				detection(requestUrl, rule, result.response, result.body, path)
			}
		} else if (rule.rootPaths) {
			console.log("Start detection based on root url")
			for (let rootPath of rule.rootPaths) {
				let requestUrl = rootUrl + rootPath
				console.log(requestUrl)

				if (window.nhc_alreadyVisited(requestUrl)) {
					console.log("Skip request: ", requestUrl)
					continue
				}

				// run request
				let result = await request(
					requestUrl,
					rule.headers,
					rule.method,
					rule.postBody,
					rule.postJSON
				)

				// detection based on server answer
				detection(requestUrl, rule, result.response, result.body, rootPath)
			}
		} else if (rule.params) {
			console.log("Start detection of GET parameters")
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

					let requestUrl = split_url[0] + "?" + urlParams.toString()
					if (window.nhc_alreadyVisited(requestUrl)) {
						console.log("Skip request: ", requestUrl)
						continue
					}

					// run request
					let result = await request(
						requestUrl,
						rule.headers,
						rule.method,
						rule.postBody,
						rule.postJSON
					)

					detection(requestUrl, rule, result.response, result.body, rule_param)
				}
			}
		} else if (rule.ports) {
			console.log("Start detection of ports")
			let url_parsed = new URL(url)
			for (let port of rule.ports) {
				let protocol = "https://"
				if (port.includes("80")) {
					protocol = "http://"
				}
				try {
					let requestUrl = protocol + url_parsed.hostname + ":" + port
					if (window.nhc_alreadyVisited(requestUrl)) {
						console.log("Skip request: ", requestUrl)
						continue
					}

					// run request
					let result = await request(
						requestUrl,
						null,
						"HEAD",
						null,
						null,
						["nowait"]
					)

					detection(requestUrl, rule, result.response, "", port)
				} catch (e) {
					console.warn(e)
				}
			}
		} else if (rule.subdomains) {
			console.log("Start detection of subdomains")
			let url_parsed = new URL(url)
			for (let subdomain of rule.subdomains) {
				try {
					let requestUrl = "http:" + "//" + subdomain + "." + url_parsed.hostname
					if (window.nhc_alreadyVisited(requestUrl)) {
						console.log("Skip request: ", requestUrl)
						continue
					}

					// run request
					let result = await request(
						requestUrl,
						null,
						"HEAD",
						null,
						null,
						["nowait"]
					)

					detection(requestUrl, rule, result.response, "", subdomain)
				} catch (e) {
					console.warn(e)
				}
			}
		} else {
			// rules based on tags
			let requestUrl = url
			if (window.nhc_alreadyVisited(requestUrl)) {
				console.log("Skip request: ", requestUrl)
				continue
			}

			// run request
			let result = await request(
				requestUrl,
				rule.headers,
				rule.method,
				rule.postBody,
				rule.postJSON
			)

			detection(requestUrl, rule, result.response, result.body, rule.detectedBy)
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