export const versions = [
    {
        title: "Info: Security Text",
        rootPaths: [
            "/.well-known/security.txt"
        ],
        detectStatusCodes: ["200"],
        tags: ["all"],
        cat: "cat-default",
        critLevel: 0
    }, {
        title: "RCE: Bitbucket Server (CVE-2022-36804)",
        minVersion: "7.0.0",
        maxVersion: "8.3.0",
        regexVersion: "v\\s*([\\d\\.]+)\\s*<\\/span>",
        tags: ["bitbucket"],
        detectedBy: "regex version",
        cat: "cat-panic",
        critLevel: 3
    }, {
        title: "RCE: Apache (CVE-2021-41773)",
        minVersion: "2.4.49",
        maxVersion: "2.4.50",
        regexVersion: "Apache\\/([\\d\\.]+)",
        matchRegexHeaderName: "Server",
        tags: ["apache"],
        detectedBy: "header",
        cat: "cat-panic",
        critLevel: 3
    }, {
        title: "RCE: Apache (CVE-2021-40438)",
        minVersion: "2.4.17",
        maxVersion: "2.4.48",
        regexVersion: "Apache\\/([\\d\\.]+)",
        matchRegexHeaderName: "Server",
        tags: ["apache"],
        detectedBy: "header",
        cat: "cat-panic",
        critLevel: 3
    }, {
        title: "RCE (authenticated): Exchange 2019 (CVE-2022-41040 and CVE-2022-41082)",
        minVersion: "15.2.1118",
        maxVersion: "15.2.1118",
        regexVersion: "auth\\/([\\d\\.]+)\/themes",
        tags: ["exchange", "owa"],
        detectedBy: "css-font-path",
        cat: "cat-panic",
        critLevel: 2
    }, {
        title: "RCE (authenticated): Exchange 2016 (CVE-2022-41040 and CVE-2022-41082)",
        minVersion: "15.1.2507",
        maxVersion: "15.1.2507",
        regexVersion: "auth\\/([\\d\\.]+)\/themes",
        tags: ["exchange", "owa"],
        detectedBy: "css-font-path",
        cat: "cat-panic",
        critLevel: 2
    }, {
        title: "RCE (authenticated): Exchange 2013 (CVE-2022-41040 and CVE-2022-41082)",
        minVersion: "15.0.1497",
        maxVersion: "15.0.1497",
        regexVersion: "auth\\/([\\d\\.]+)\/themes",
        tags: ["exchange", "owa"],
        detectedBy: "css-font-path",
        cat: "cat-panic",
        critLevel: 2
    }, {
        title: "Exchange 2010 (oudated)",
        minVersion: "14.3.513",
        maxVersion: "14.3.513",
        regexVersion: "auth\\/([\\d\\.]+)\/themes",
        tags: ["exchange", "owa"],
        detectedBy: "css-font-path",
        cat: "cat-panic",
        critLevel: 2
    }, {
        title: "RCE: Exchange 2019 Proxyshell (CVE-2021-34473)",
        minVersion: "15.2.221",
        maxVersion: "15.2.858",
        regexVersion: "auth\\/([\\d\\.]+)\/themes",
        tags: ["exchange", "owa"],
        detectedBy: "css-font-path",
        cat: "cat-panic",
        critLevel: 3
    }, {
        title: "RCE: Exchange 2016 Proxyshell (CVE-2021-34473)",
        minVersion: "15.2.221",
        maxVersion: "15.1.2308",
        regexVersion: "auth\\/([\\d\\.]+)\/themes",
        tags: ["exchange", "owa"],
        detectedBy: "css-font-path",
        cat: "cat-panic",
        critLevel: 3
    }, {
        title: "RCE: Exchange 2016 Proxyshell (CVE-2021-34473)",
        minVersion: "15.2.221",
        maxVersion: "15.0.1497",
        regexVersion: "auth\\/([\\d\\.]+)\/themes",
        tags: ["exchange", "owa"],
        detectedBy: "css-font-path",
        cat: "cat-panic",
        critLevel: 3
    }]