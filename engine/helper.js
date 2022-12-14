function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function countRequests() {
    window.nhc_requestCounter += 1
    document.querySelector("#stats").textContent = window.nhc_requestCounter + " Requests"
}

export async function request(request_url, headers = null, method = "GET", data = null, json = null, requestOptions = []) {
    let options = {}
    options.method = method

    // add headers if needed
    options.headers = {}
    if (headers) {
        options.headers = headers
    }

    // mark all automatic requests with "ninja hacker cat"
    options.headers["X-Requested-With"] = "Ninja Hacker Cat"
    options.headers["Cache"] = "no-cache"

    // send body data
    if (data) {
        options.data = data
    }
    if (json) {
        options.headers["Content-Type"] = "application/json"
        options.data = JSON.stringify(json)
    }

    // dont request the same res twice
    let id = request_url + JSON.stringify(options)
    if (window.nhc_requestedUrls.includes(id)) {
        return false;
    } else {
        window.nhc_requestedUrls.push(id)
    }

    // run request
    if (!requestOptions.includes("nowait")) {
        // this sets a global timegap for parallel requests
        window.nhc_requestGapTimer += 400
        await delay(window.nhc_requestGapTimer)
        window.nhc_requestGapTimer -= 400
    }
    


    let response = await fetch(request_url, options)
    let body = await response.text()
    countRequests()

    return {
        response: response,
        body: body
    }
}

