export const leakUrls = [
	{
		title: "Git Config", // the title of the alert message
		paths: [ // this stuff will be after the  current url
			"/.git/",
			"/.git/config"
		],
		detectResponses: ["remote"], // check this response in body
		filterStatusCodes: ["200"], // only check other detect values if response code matches
		detectStatusCodes: ["200"], // alert is based on response code
		tags: ["root"], // only run this rule if these tags where detected on the website
		cat: "cat-laugh", // change the avatar to this image
		critLevel: 1 // 1,2,3 critlevel is for showing the most critical kitten
	},
	{
		title: "Helm Config",
		rootPaths: [
			"/.helm/values.yaml"
		],
		detectResponses: ["password"],
		filterStatusCodes: ["200"],
		tags: ["root"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "Nginx Config",
		rootPaths: [
			"/nginx/nginx.conf",
			"/nginx.conf"
		],
		detectResponses: ["server"],
		filterStatusCodes: ["200"],
		tags: ["nginx"],
		cat: "cat-laugh",
		critLevel: 1
	},
	{
		title: "WP-Config Backup",
		rootPaths: [
			"/wp-config.php.bak",
			"/wp-config.php.backup",
			"/wp-config.bak"
		],
		detectResponses: ["DB_PASSWORD"],
		filterStatusCodes: ["200"],
		tags: ["wordpress", "wp"],
		cat: "cat-laugh",
		critLevel: 3
	},
	{
		title: "Info: Subdomain",
		subdomains: [
			"mail",
			"imap",
			"smtp",
			"weblogic",
			"api",
			"exchange",
			"owa",
			"backend",
			"backup",
			"build",
			"bitbucket",
			"citrix",
			"chat",
			"talk",
			"community",
			"console",
			"terminal",
			"confluence",
			"conf",
			"data",
			"database",
			"sql",
			"mysql",
			"demo",
			"dev",
			"development",
			"downloads",
			"download",
			"drupal",
			"files",
			"file",
			"firewall",
			"ftp",
			"home",
			"jobs",
			"mobile",
			"auth",
			"wordpress",
			"blog",
			"weblog",
			"webmail",
			"server",
			"admin",
			"git",
			"login",
			"logs",
			"registry",
			"internal",
			"intern",
			"config",
			"vpn",
			"vnc",
			"scanme"
		],
		skipRedirected: true,
		detectStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-default",
		critLevel: 0
	},
	{
		title: "Info: Dev Port",
		ports: [
			"8080",
			"8081",
			"4434",
			"5000",
			"3000",
			"3001",
			"4000",
			"4443",
			"5000",
			"5001",
			"8443"
		],
		detectStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-default",
		critLevel: 0
	}
]