# Ninja-Hacker-Cat Sidebar für Firefox
This firefox extension can check your website for the most basic 
security issues and data leaks. It's an easy way to test the basic security of 
your websites!

## Installation
Install the extension in firefox:
<a href="https://addons.mozilla.org/de/firefox/addon/ninja-hacker-cat/">
    Firefox Add-Ons
</a>

Temporary installation:
* Settings
* Debug extension
* New extension -> Open `manifest.json`

## How to test these features
You can test some features against wackopicko, juice shop.
CVEs can be tested against vulhub e.g. <a href="https://github.com/vulhub/vulhub/tree/master/confluence/CVE-2022-26134">confluence</a>.

``` bash
docker run --rm -p 8080:3000 bkimminich/juice-shop
docker run --rm -p 8080:80 adamdoupe/wackopicko
```

Try: http://localhost:8080/ afterwards.

# Rules
`engine/detection.js`: Try to understand the current web service and trigger 
the rules that match these application "tags".

`rules/leak-urls.js`: Contains filenames that maybe interessting -> WP-Backups, 
GIT-Leaks.

`rules/poc.js`: Contains proof of concepts for critical security issues -> 
Confluence RCE.

`rules/versions.js`: Contains rules for version grabbing and detecting 
vulnerable versions -> Exchange RCE.

`rules/web.js`: Contains rules for web vulnerabilities based on URL. -> SQLi,
Keywords.

`rules/fuzzing.js`: Contains rules for fuzzing GET and POST params based on 
current WebRequest. -> XSS, SQLi.

## TODO
* [ ] Add headers and postJSON for poc.js
* [ ] Add response size check to rules
* [ ] Change exchange proxyshell detection to passive mode
* [ ] Add website detection for big-ip, citrix, cisco, pulse
* [ ] Add fuzzing param filter
* [X] Add request limit (timer)
* [X] Add fuzzing for get params
* [X] Refactoring fuzzing (only change one param per request)!
* [X] Wrapper for fetch requests to count
* [X] Test fuzzing form data
* [X] Add securityinfo.txt
* [X] Version detection
* [X] Check for leaky urls in current tab

## Detections
* [ ] Wordpress Version
* [ ] PHP Version
* [ ] SQL Injection based on Header/Cookies
* [ ] IDOR based on GET-Param
* [ ] Path traversal
* [ ] OS Command Injection (https://portswigger.net/support/using-burp-to-test-for-os-command-injection-vulnerabilities)
* [ ] Big-IP RCE (https://github.com/horizon3ai/CVE-2022-1388/blob/main/CVE-2022-1388.py)
* [ ] ManageEngine ADSelfService (https://www.synacktiv.com/publications/how-to-exploit-cve-2021-40539-on-manageengine-adselfservice-plus.html)
* [X] XSS Tests in GET-Param (tested)
* [X] SQL Injection based on GET-Param (tested)
* [X] SQL Injection Login bypass (JSON, tested)
* [X] Bitbucket RCE (version only, tested)
* [X] Confluence RCE (PoC, tested)
* [X] Exchange Proxyshell (PoC, untested)
* [X] Apache (version only, untested)
* [X] Weblogic Console (PoC, tested)

# CVEs
The CVEs this browser extension can detect:
Confluence Server (CVE-2022-26134), Bitbucket Server (CVE-2022-36804), 
Exchange Server Proxyshell (CVE-2021-34473), Apache (CVE-2021-41773),
Weblogic Console (CVE-2020-14882).

# Deployment
``` bash
zip -r Ninja-Hacker-Cat.zip . -x ".*" -x "images/.*"
```

# Release notes
Version: 1.4
* Improve visuals of script kitty activity
* Leaks added: SQL backup, git credentials, backup files, etc

Version: 1.3
* Subdomain detection added
* Browser notification added
* Fixed fuzzing engine for post params
* Cat images changed to a lovely kitty
* Untested PoCs added 

Version: 1.2
* License changed to Mozilla Public License 2.0 because its not allowed to use logo / visuals
* Fixing the root urls if a port is specified -> Tested RCE: Weblogic Console (CVE-2020-14882)
* Changing the interface from panel in background to icon and full background page

# Copyright
Source Code is under Mozilla Public License 2.0

All rights reserved for the plugin name, artworks, logo and images
(all cat images)!

Copyright 1337core, 2022

https://www.1337core.de