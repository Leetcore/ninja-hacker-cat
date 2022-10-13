export async function tags(request_url) {
	if (window.nhc_alreadyVisited(request_url)) {
		return [];
	}
	let allDetectedTags = []
	let response = await fetch(request_url)
	let body = await response.text()
	body = body.toLocaleLowerCase()

	// detect wordpress
	if (body.includes("/wp-content/")) {
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

	// detect POST param in url
	if (body.includes("<form")
		|| body.includes("<input")) {
		allDetectedTags.push("post-param")
	}

	// root path with no get params
	if (!request_url.includes("?") && !request_url.includes(".")) {
		allDetectedTags.push("root")
	}

	// detect confluence
	if (body.includes("confluence-base-url")) {
		allDetectedTags.push("confluence")
	}

	// detect bitbucket
	if (body.includes("bitbucket")) {
		allDetectedTags.push("bitbucket")
	}

	// detect apache webserver by server-header
	if (response.headers.get("Server")
		&& response.headers.get("Server").includes("Apache/")) {
		allDetectedTags.push("apache")
	}

	// weblogic
	if (response.url.indexOf("/console/login/") >= 0
		&& body.includes("weblogic")) {
		allDetectedTags.push("weblogic")
	}

	return allDetectedTags;
}