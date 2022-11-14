export const web = [{
    title: "XSS: Cross Site Scripting",
    params: [
        "\"'><img src='1337core' onError='alert(1)'/>"
    ],
    detectResponses: [
        "\"'><img src='1337core' onError='alert(1)'/>"
    ],
    tags: ["get-param"],
    cat: "cat-love",
    critLevel: 2
},
{
    title: "SQLI: SQL Injection Error Page",
    params: [
        "'",
        "\"'"
    ],
    detectResponses: [
        "syntax error",
        "order by"
    ],
    tags: ["get-param"],
    cat: "cat-love",
    critLevel: 2
}]

