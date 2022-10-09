export async function tags(request_url) {
	if (window.nhc_alreadyVisited(request_url)) {
		return [];
	}
	let allDetectedTags = []
	let response = await fetch(request_url)
	let body = await response.text()

	// detect wordpress
	if (body.toLowerCase().includes("/wp-content/")) {
		allDetectedTags.push("wordpress")
	}

	// detect exchange owa page
	if (request_url.includes("/owa/")) {
		allDetectedTags.push("exchange")
	}

	// detect GET param in URL
	if (request_url.includes("?")) {
		allDetectedTags.push("get-param")
	}

	// root path with no get params
	if (!request_url.includes("?") && !request_url.includes(".")) {
		allDetectedTags.push("root")
	}

	// detect confluence
	if (body.toLowerCase().includes("confluence-base-url")) {
		allDetectedTags.push("confluence")
	}

	// detect bitbucket
	if (body.toLowerCase().includes("bitbucket")) {
		allDetectedTags.push("bitbucket")
	}

	// detect apache webserver by server-header
	if (response.headers.get("Server")
		&& response.headers.get("Server").includes("Apache/")) {
		allDetectedTags.push("apache")
	}

	// weblogic
	if (response.url.indexOf("/console/login/") >= 0
		&& body.toLowerCase().includes("weblogic")) {
		allDetectedTags.push("weblogic")
	}

	return allDetectedTags;
}