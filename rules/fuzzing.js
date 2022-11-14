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
            "id",
            "guid",
            "username",
            "user",
            "login",
            "password",
            "pass"
        ],
        filterStatusCodes: ["302", "200", "500"],
        detectResponses: ["auth", "logout", "syntax error"],
        cat: "cat-panic",
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
        cat: "cat-laugh",
        critLevel: 1
    }
]

