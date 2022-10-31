import { detection } from "./detection.js"
import { countRequests } from "./helper.js"

// this fuzzing engine is based on captured webrequests
export async function fuzzing_engine(rules, requestDetails) {
	for (let rule of rules) {
		// filter post params
		if (rule.filterPostParams) {
			let filterThisParam = true
			for (let filterPostParam of (rule.filterPostParams || [])) {
				if (requestDetails.requestBody
					&& requestDetails.requestBody.formData
					&& requestDetails.requestBody.formData[filterPostParam]) {
					filterThisParam = false
					break
				}
			}
			if (filterThisParam) {
				continue
			}
		}

		for (let param of rule.postParams) {
			let formData = requestDetails?.requestBody?.formData
			let paramCount = Object.keys(formData).length

			// there is no form data to change
			if (!paramCount) {
				continue
			}

			for (let index = 0; index < paramCount; index++) {
				let usedParam = ""
				let copyFormData = {}
				Object.assign(copyFormData, formData)

				// count parameter we captured in the request
				if (rule.replaceParamValue) {
					copyFormData[Object.keys(formData)[index]] = param
					usedParam = Object.keys(formData)[index] + "=" + param
				} else {
					copyFormData[Object.keys(formData)[index]] = Object.values(copyFormData)[index] + param
					usedParam = Object.keys(formData)[index] + "=" + Object.values(copyFormData)[index]
				}

				// run request
				if (window.nhc_alreadyVisited(requestDetails.url + usedParam)) {
					continue
				}

				let sendData = new URLSearchParams()
				for (let key in copyFormData) {
					sendData.append(key, copyFormData[key])
				}
				
				// TODO: use request instead
				let response = await fetch(requestDetails.url, {
					method: 'POST',
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						"X-Requested-With": "Ninja Hacker Cat"
					},
					body: sendData.toString()
				})
				let body = await response.text()
				countRequests()

				detection(
					requestDetails.url,
					rule,
					response,
					body,
					usedParam
				)
			}
		}
	}

	for (let rule of rules) {
		for (let param of rule.postParams) {
			let postJSON = requestDetails.requestBodyJSON
			if (!postJSON) {
				continue;
			}
			let paramCount = Object.keys(postJSON).length

			// count parameter we captured in the request
			for (let index = 0; index < paramCount; index++) {
				let usedParam = ""
				let copyJSON = {}
				Object.assign(copyJSON, postJSON)

				// replace / add our rule to the property at a given index
				if (rule.replaceParamValue) {
					copyJSON[Object.keys(copyJSON)[index]] = param
					usedParam = Object.keys(copyJSON)[index] + "=" + param
				} else {
					copyJSON[Object.keys(copyJSON)[index]] = Object.values(copyJSON)[index] + param
					usedParam = Object.keys(copyJSON)[index] + "=" + Object.values(copyJSON)[index]
				}

				if (window.nhc_alreadyVisited(requestDetails.url + JSON.stringify(copyJSON))) {
					continue
				}

				// TODO: use request instead
				let response = await fetch(requestDetails.url, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						"X-Requested-With": "Ninja Hacker Cat"
					},
					body: JSON.stringify(copyJSON)
				})
				let body = await response.text()

				detection(
					requestDetails.url,
					rule,
					response,
					body,
					usedParam
				)
			}
		}
	}
}