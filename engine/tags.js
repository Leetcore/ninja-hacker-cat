export async function tags(requestUrl) {
	if (window.nhc_alreadyVisited(requestUrl)) {
		return [];
	}
	let parsedUrl = new URL(requestUrl)
	let rootUrl = parsedUrl.protocol + "//" + parsedUrl.hostname
	if (parsedUrl.port.length > 0) {
		rootUrl = parsedUrl.protocol + "//" + parsedUrl.hostname + ":" + parsedUrl.port
	}

	let allDetectedTags = []
	let response = await fetch(requestUrl)
	let body = await response.text()
	body = body.toLocaleLowerCase()

	// detect wordpress
	if (body.includes("/wp-content/")) {
		allDetectedTags.push("wordpress")
	}

	// detect exchange owa page
	if (requestUrl.includes("/owa/")) {
		allDetectedTags.push("exchange")
	}

	// detect GET param in URL
	if (requestUrl.includes("?")) {
		allDetectedTags.push("get-param")
	}

	// detect POST param in url
	if (body.includes("<form")
		|| body.includes("<input")) {
		allDetectedTags.push("post-param")
	}

	// root path with no get params
	if (!requestUrl.includes("?")
		&& requestUrl.replace(rootUrl, "").length <= 4) {
		allDetectedTags.push("root")
	}

	// detect confluence by base-url
	if (body.includes("confluence-base-url")) {
		allDetectedTags.push("confluence")
	}

	// detect bitbucket by string
	if (body.includes("bitbucket")) {
		allDetectedTags.push("bitbucket")
	}

	// detect apache webserver by server-header
	if (response.headers.get("Server")
		&& response.headers.get("Server").includes("Apache/")) {
		allDetectedTags.push("apache")
	}

	// detect nginx by server header
	if (response.headers.get("Server")
		&& response.headers.get("Server").includes("nginx")) {
		allDetectedTags.push("nginx")
	}

	// detect weblogic application
	if (response.url.indexOf("/console/login/") >= 0
		&& body.includes("weblogic")) {
		allDetectedTags.push("weblogic")
	}

	// detect roundcube by title tag
	if (body.includes("<title>Roundcube Webmail".toLowerCase())) {
		allDetectedTags.push("roundcube")
	}

	// detect joomla by meta generator info
	if (body.includes('<meta name="generator" content="Joomla'.toLowerCase())) {
		allDetectedTags.push("joomla")
	}

	// detect drupal by meta generator info
	if (body.includes('<meta name="generator" content="Drupal"'.toLowerCase())) {
		allDetectedTags.push("drupal")
	}

	console.log("detected tags: " + allDetectedTags)
	return allDetectedTags;
}