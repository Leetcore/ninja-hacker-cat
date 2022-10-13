import { detection } from "./detection.js"
import { countRequests } from "./helper.js"

// this fuzzing engine is based on captured webrequests
export async function fuzzing_engine(rules, requestDetails) {
	for (let rule of rules) {
		// filter post params
		if (rule.filterPostParams) {
			let filterThisParam = true
			for (let filterPostParam of (rule.filterPostParams || [])) {
				console.log(filterPostParam)
				if (requestDetails?.requestBody?.formData[filterPostParam]) {
					filterThisParam = false
					break
				}
			}
			if (filterThisParam) {
				continue
			}
		}

		for (let param of rule.postParams) {
			let data = new URLSearchParams()
			for (let key in (requestDetails?.requestBody?.formData || [])) {
				if (rule.replaceParamValue) {
					data.append(key, param)
				} else {
					data.append(key, requestDetails.requestBody.formData[key] + param)
				}

				// run request
				if (window.nhc_alreadyVisited(data.toString())) {
					continue
				}

				// TODO: use request instead
				let response = await fetch(requestDetails.url, {
					method: 'POST',
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						"X-Requested-With": "Ninja Hacker Cat"
					},
					body: data
				})
				let body = await response.text()
				countRequests()

				detection(requestDetails.url, rule, response, body, data.toString())
			}
		}
	}

	for (let key in (requestDetails.requestBodyJSON || [])) {
		for (let rule of rules) {
			for (let param of rule.postParams) {
				if (rule.replaceParamValue) {
					requestDetails.requestBodyJSON[key] = requestDetails.requestBodyJSON[key]
				} else {
					requestDetails.requestBodyJSON[key] = requestDetails.requestBodyJSON[key] + param
				}

				// run request
				if (window.nhc_alreadyVisited(param)) {
					continue
				}

				// TODO: use request instead
				let response = await fetch(requestDetails.url, {
					method: 'POST',
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						"X-Requested-With": "Ninja Hacker Cat"
					},
					body: JSON.stringify(requestDetails.requestBodyJSON)
				})
				let body = await response.text()

				detection(requestDetails.url, rule, response, body, requestDetails.requestBodyJSON[key] + param)
			}

		}
	}
}