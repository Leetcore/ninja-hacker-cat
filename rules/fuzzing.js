export const fuzzing = [
    // This rules are running in fuzzing-engine and will be executed against
    // the current captured webrequest!
    {
        title: "Bypass: SQL Injection",
        postParams: [
            "'-- ",
            "' or 'a'='a'-- "
        ],
        isRedirected: true,
        detectStatusCodes: ["200"],
        tags: ["all"],
        cat: "cat-angry",
        critLevel: 3
    },
    {
        title: "Default Keywords",
        postParams: [
            "admin",
            "test",
            "dev",
            "testing",
            "guest"
        ],
        isRedirected: true,
        replaceParamValue: true,
        detectStatusCodes: ["200"],
        tags: ["get-param"],
        cat: "cat-laugh",
        critLevel: 1
    }
]

