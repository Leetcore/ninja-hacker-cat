export function countRequests() {
    window.nhc_requestCounter += 1
    document.querySelector("#stats").textContent = window.nhc_requestCounter + " Requests"
}

export async function request(request_url, headers = {}, method = "GET", data = null, json = null) {
    let options = {}
    options.method = method
    options.headers = {}
    if (headers) {
        options.headers = headers
    }
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
    // run request
    let response = await fetch(request_url, options)
    let body = await response.text()
    countRequests()
    return {
        response: response,
        body: body
    }
}