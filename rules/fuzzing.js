export const fuzzing = [
    // This rules are running in fuzzing-engine and will be executed against
    // the current captured webrequest!
    {
        title: "Bypass: SQL Injection",
        postParams: [
            "'-- ",
            "' or 'a'='a'-- "
        ],
        filterPostParams: [
            "username",
            "user",
            "login",
            "password",
            "pass"
        ],
        isRedirected: true,
        detectStatusCodes: ["200"],
        tags: ["post-param"],
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
        filterPostParams: [
            "username",
            "user",
            "login",
            "password",
            "pass"
        ],
        isRedirected: true,
        replaceParamValue: true,
        detectStatusCodes: ["200"],
        tags: ["post-param"],
        cat: "cat-laugh",
        critLevel: 1
    }
]

