export const leakUrls = [
	{
		title: "Git Config", // the title of the alert message
		paths: [ // this stuff will be after the  current url
			"/.git/",
			"/.git/config"
		],
		detectResponses: ["git"], // check this response in body
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
		critLevel: 1
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
		detectResponses: ["db"],
		filterStatusCodes: ["200"],
		tags: ["wordpress", "wp"],
		cat: "cat-laugh",
		critLevel: 3
	},
	{
		title: "Dev Port",
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