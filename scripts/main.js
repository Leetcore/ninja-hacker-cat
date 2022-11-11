import { leakUrls } from "../rules/leak-urls.js";
import { poc } from "../rules/poc.js";
import { web } from "../rules/web.js";
import { tags } from "../engine/tags.js"
import { fuzzing } from "../rules/fuzzing.js"
import { versions } from "../rules/versions.js"

import { engine } from "../engine/engine.js"
import { fuzzing_engine } from "../engine/fuzzing.js"

let myWindowId;
const check_automatically = document.querySelector("#autoRequest")

// toggle toolbar icons
document.querySelector("#autoRequest")
	.addEventListener("click", () => {
		console.log(check_automatically)
		if (check_automatically.checked) {
			browser.browserAction.setIcon({
				path: {
					16: "/images/cat-default.png",
					32: "/images/cat-default.png"
				}
			})
		} else {
			browser.browserAction.setIcon({
				path: {
					16: "/images/cat-default-grey.png",
					32: "/images/cat-default-grey.png"
				}
			})
		}
	})

// global stuff
window.nhc_requestCounter = 0
window.nhc_requestGapTimer = 3 * 1000
window.nhc_currentCritLevel = 0
window.nhc_visitedURLs = []
window.nhc_alreadyVisited = function (url) {
	if (window.nhc_visitedURLs.indexOf(url) === -1) {
		window.nhc_visitedURLs.push(url)
		return false;
	} else {
		return true;
	}
}

function main(requestDetails) {
	// start checks or skip checks
	if (!check_automatically.checked) {
		return;
	}

	browser.tabs.query({ windowId: myWindowId, active: true })
		.then(async tabs => {
			// check if at least 1 tab is active
			if (tabs?.length == 0 || !tabs[0].url) {
				return;
			}

			let active_tab_url = tabs[0].url
			let active_domain = new URL(tabs[0].url).hostname

			let current_request_url = requestDetails.url
			let current_domain = new URL(requestDetails.url).hostname

			// only check request from current active tab
			if (active_domain == current_domain) {
				// skip internal about pages
				if (active_tab_url.indexOf('about:') !== 0) {
					// detect software, version
					let detectedTags = await tags(current_request_url)

					// run simple checks based on url
					engine(web, detectedTags, current_request_url)
					engine(poc, detectedTags, current_request_url)
					engine(versions, detectedTags, current_request_url)

					// run fuzzing based on current captured request
					fuzzing_engine(fuzzing, requestDetails)

					// run simple checks based on url
					engine(leakUrls, detectedTags, current_request_url)
				}
			}
		})
}

// webrequest interception and global buildup to get a full request
const globalRequests = []

browser.webRequest.onBeforeRequest.addListener(
	request => {
		globalRequests[request.requestId] = request
		// save body of response
		if (request?.requestBody?.raw) {
			globalRequests[request.requestId].requestBodyString = decodeURIComponent(
				String.fromCharCode.apply(null,
					new Uint8Array(request.requestBody.raw[0].bytes))
			)
		}
		if (globalRequests[request.requestId].requestBodyString) {
			try {
				globalRequests[request.requestId].requestBodyJSON = JSON.parse(
					globalRequests[request.requestId].requestBodyString
				)
			} catch {
				console.warn("JSON parser failed: ", request.url)
			}
		}
		console.log(globalRequests[request.requestId])
	},
	{ urls: ["<all_urls>"] },
	["requestBody"]
)

browser.webRequest.onBeforeSendHeaders.addListener(
	request => {
		globalRequests[request.requestId].requestHeaders = request.requestHeaders
	},
	{ urls: ["<all_urls>"], types: ["main_frame", "xmlhttprequest"] },
	["requestHeaders"]
)

browser.webRequest.onHeadersReceived.addListener(
	request => {
		globalRequests[request.requestId].responseHeaders = request.responseHeaders
	},
	{ urls: ["<all_urls>"], types: ["main_frame", "xmlhttprequest"] },
	["responseHeaders"]
)

browser.webRequest.onCompleted.addListener(
	request => {
		let currentRequest = globalRequests[request.requestId]
		// filter my own requests based on header
		let cat_header = currentRequest.requestHeaders
			.find(header => header.name === "X-Requested-With"
				&& header.value === "Ninja Hacker Cat")
		delete globalRequests[request.requestId];
		if (!cat_header) {
			main(currentRequest)
		}
	},
	{ urls: ["<all_urls>"], types: ["main_frame", "xmlhttprequest"] }
)

// window stuff to query tabs
browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
	myWindowId = windowInfo.id
})

// show default cat
document.querySelector('#cat-default').style.display = 'block';

// reset click event
document.querySelector('#reset').addEventListener('click', () => {
	document.querySelectorAll('.avatar').forEach(avatar => {
		avatar.style.display = 'none'
	})
	document.querySelector('#cat-default').style.display = 'block'
	window.nhc_currentCritLevel = 0
	window.nhc_visitedURLs = []
	document.querySelector('#messageBox').innerHTML = ''
	document.querySelector('#reset').classList.add('hidden')
})