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
		title: "Nginx - Git Configuration Exposure",
		rootPaths: [
			'/static../.git/config',
			'/js../.git/config',
			'/images../.git/config',
			'/img../.git/config',
			'/css../.git/config',
			'/assets../.git/config',
			'/content../.git/config',
			'/events../.git/config',
			'/media../.git/config',
			'/lib../.git/config'
		],
		detectResponses: ["[core]"],
		filterStatusCodes: ["200"],
		tags: ["nginx"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "Git Credentials Disclosure",
		rootPaths: [
			'/.git-credentials'
		],
		detectResponses: ["[credential"],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "WP-Config Backup",
		rootPaths: [
			"/wp-config.php~",
			"/wp-config.php.bak",
			"/wp-config.php.backup",
			"/wp-config.bak",
			"/wp-config.php.bkp",
			"/wp-config.php.copy",
			"/wp-config.php.old",
			"/wp-config.php.orig",
			"/wp-config.php.save",
			"/wp-config.php.swp",
			"/wp-config.php.temp",
			"/wp-config.php.tmp"
		],
		detectResponses: ["DB_PASSWORD"],
		filterStatusCodes: ["200"],
		tags: ["wordpress", "wp"],
		cat: "cat-panic",
		critLevel: 3
	},
	{
		title: "WP-Content File Listing",
		rootPaths: [
			"/wp-content/"
		],
		detectResponses: [
			"Index of"
		],
		filterStatusCodes: ["200"],
		tags: ["wordpress", "wp"],
		cat: "cat-default",
		critLevel: 2
	},
	{
		title: "SQL Backup",
		rootPaths: [
			"/mysql.initial.sql",
			"/db.sql",
			"/dump.sql",
			"/backup.zip",
			"/backup.sql",
			"/backup.old",
			"/data.sql",
			"/data.old",
			"/temp.sql",
			"/users.sql"
		],
		detectResponses: [
			"INSERT INTO",
			"Roundcube Webmail initial database structure"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-panic",
		critLevel: 2
	},
	{
		title: "Webserver Backupfiles",
		paths: [
			"/main.php.bak",
			"/config.php.bak",
			"/db.php.bak",
			"/database.php.bak",
		],
		detectResponses: [
			"<?php"
		],
		filterStatusCodes: ["200"],
		tags: ["apache"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "Ruby-on-Rails Database Configuration Exposure",
		rootPaths: [
			"/config/database.yml"
		],
		detectResponses: [
			"database:"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-laugh",
		critLevel: 1
	},
	{
		title: "Webserver Access Logs",
		rootPaths: [
			"/access.log",
			"/log/access.log",
			"/logs/access.log",
			"/application/logs/access.log"
		],
		detectResponses: [
			"GET /"
		],
		filterStatusCodes: ["200"],
		tags: ["root"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "Zend Configuration File",
		rootPaths: [
			"/application/configs/application.ini",
			"/admin/configs/application.ini",
			"/application.ini",
			"/aplicacao/application/configs/application.ini",
			"/cloudexp/application/configs/application.ini",
			"/cms/application/configs/application.ini",
			"/moto/application/configs/application.ini",
			"/Partners/application/configs/application.ini",
			"/radio/application/configs/application.ini",
			"/seminovos/application/configs/application.ini",
			"/shop/application/configs/application.ini",
			"/site_cg/application/configs/application.ini",
			"/slr/application/configs/application.ini"
		],
		detectResponses: [
			"resources.db.params.password"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-panic",
		critLevel: 3
	},
	{
		title: "Web Config file",
		rootPaths: [
			"/web.config",
			"/../../web.config"
		],
		detectResponses: [
			"<configuration>"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-laugh",
		critLevel: 1
	},
	{
		title: "Clockwork PHP page exposure",
		rootPaths: [
			"/__clockwork/app"
		],
		detectResponses: [
			"<title>Clockwork</title>"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-default",
		critLevel: 2
	},
	{
		title: "Rails Debug Mode",
		rootPaths: [
			"/jkfnjdknfkdnfgkdsng"
		],
		detectResponses: [
			"Action Controller: Exception caught"
		],
		filterStatusCodes: ["200"],
		tags: ["root"],
		cat: "cat-default",
		critLevel: 1
	},
	{
		title: "Roundcube Logs",
		rootPaths: [
			"/roundcube/logs/sendmail",
			"/roundcube/logs/errors.log"
		],
		detectResponses: [
			"IMAP Error:"
		],
		filterStatusCodes: ["200"],
		tags: ["roundcube"],
		cat: "cat-laugh",
		critLevel: 1
	},
	{
		title: "BitBucket Pipelines Configuration",
		rootPaths: [
			"/bitbucket-pipelines.yml"
		],
		detectResponses: [
			"pipelines:"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "Composer-auth JSON File Disclosure",
		rootPaths: [
			"/.composer-auth.json",
			"/vendor/webmozart/assert/.composer-auth.json"
		],
		detectResponses: [
			"github-oauth"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-default",
		critLevel: 2
	},
	{
		title: "Drupal Install",
		rootPaths: [
			"/install.php?profile=default"
		],
		detectResponses: [
			"<title>Choose language | Drupal</title>"
		],
		filterStatusCodes: ["200"],
		tags: ["drupal"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "Drupal User Listing",
		rootPaths: [
			"/jsonapi/user/user"
		],
		detectResponses: [
			"display_name"
		],
		filterStatusCodes: ["200"],
		tags: ["drupal"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "Public Swagger API",
		rootPaths: [
			"/swagger-ui/swagger-ui.js",
			"/swagger/swagger-ui.js",
			"/swagger-ui.js",
			"/swagger/ui/swagger-ui.js",
			"/swagger/ui/index",
			"/swagger/index.html",
			"/swagger-ui.html",
			"/swagger/swagger-ui.html",
			"/api/swagger-ui.html",
			"/api-docs/swagger.json",
			"/api-docs/swagger.yaml",
			"/api_docs",
			"/swagger.json",
			"/swagger.yaml",
			"/swagger/v1/swagger.json",
			"/swagger/v1/swagger.yaml",
			"/api/index.html",
			"/api/docs/",
			"/api/swagger.json",
			"/api/swagger.yaml",
			"/api/swagger.yml",
			"/api/swagger/index.html",
			"/api/swagger/swagger-ui.html",
			"/api/api-docs/swagger.json",
			"/api/api-docs/swagger.yaml",
			"/api/swagger-ui/swagger.json",
			"/api/swagger-ui/swagger.yaml",
			"/api/apidocs/swagger.json",
			"/api/apidocs/swagger.yaml",
			"/api/swagger-ui/api-docs",
			"/api/api-docs",
			"/api/apidocs",
			"/api/swagger",
			"/api/swagger/static/index.html",
			"/api/swagger-resources",
			"/api/swagger-resources/restservices/v2/api-docs",
			"/api/__swagger__/",
			"/api/_swagger_/",
			"/api/spec/swagger.json",
			"/api/spec/swagger.yaml",
			"/api/swagger/ui/index",
			"/__swagger__/",
			"/_swagger_/",
			"/api/v1/swagger-ui/swagger.json",
			"/api/v1/swagger-ui/swagger.yaml",
			"/swagger-resources/restservices/v2/api-docs",
			"/api/swagger_doc.json"
		],
		detectResponses: [
			"swagger:",
			"Swagger UI"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-laugh",
		critLevel: 1
	},
	{
		title: "Filezilla Config",
		rootPaths: [
			"/filezilla.xml",
			"/sitemanager.xml",
			"/FileZilla.xml"
		],
		detectResponses: [
			"<FileZilla"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-default",
		critLevel: 1
	},
	{
		title: "Filezilla Config",
		rootPaths: [
			"/filezilla.xml",
			"/sitemanager.xml",
			"/FileZilla.xml"
		],
		detectResponses: [
			"<FileZilla"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-default",
		critLevel: 1
	},
	{
		title: "Gemfile Leak",
		rootPaths: [
			"/Gemfile",
			"/Gemfile.lock"
		],
		detectResponses: [
			"https://rubygems.org"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-default",
		critLevel: 1
	},
	{
		title: "Joomla Database Listing",
		rootPaths: [
			"/libraries/joomla/database/"
		],
		detectResponses: [
			"Index of /libraries/joomla/database"
		],
		filterStatusCodes: ["200"],
		tags: ["joomla"],
		cat: "cat-default",
		critLevel: 1
	},
	{
		title: "Oauth Credentials JSON",
		rootPaths: [
			"/oauth-credentials.json"
		],
		detectResponses: [
			"client_secret"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "Redmine Configuration",
		rootPaths: [
			"/configuration.yml",
			"/config/configuration.yml",
			"/redmine/config/configuration.yml"
		],
		detectResponses: [
			"password"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-panic",
		critLevel: 3
	},
	{
		title: "Secret Token Ruby",
		rootPaths: [
			"/secret_token.rb",
			"/config/initializers/secret_token.rb",
			"/redmine/config/initializers/secret_token.rb"
		],
		detectResponses: [
			"::Application.config.secret"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "Secret Token Ruby",
		rootPaths: [
			"/secret_token.rb",
			"/config/initializers/secret_token.rb",
			"/redmine/config/initializers/secret_token.rb"
		],
		detectResponses: [
			"::Application.config.secret"
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "Detect .dockercfg",
		rootPaths: [
			"/.dockercfg",
			"/.docker/config.json"
		],
		detectResponses: [
			'"auth":'
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-panic",
		critLevel: 3
	},
	{
		title: "Coremail - Config Discovery",
		rootPaths: [
			"/mailsms/s?func=ADMIN:appState&dumpConfig=/"
		],
		detectResponses: [
			'<string name="User">coremail</string>'
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-panic",
		critLevel: 3
	},
	{
		title: "Dockerfile Hidden Disclosure",
		rootPaths: [
			"/.dockerfile",
			"/.Dockerfile"
		],
		detectResponses: [
			'FROM'
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "docker-compose.yml exposure",
		rootPaths: [
			"/docker-compose.yml",
			"/docker-compose.prod.yml",
			"/docker-compose.production.yml",
			"/docker-compose.staging.yml",
			"/docker-compose.dev.yml",
			"/docker-compose-dev.yml",
			"/docker-compose.override.yml"
		],
		detectResponses: [
			'services:'
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "FTP credentials exposure",
		rootPaths: [
			"/ftpsync.settings"
		],
		detectResponses: [
			'overwrite_newer_prevention'
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-laugh",
		critLevel: 2
	},
	{
		title: "FTP credentials exposure",
		rootPaths: [
			"/ftpsync.settings"
		],
		detectResponses: [
			'overwrite_newer_prevention'
		],
		filterStatusCodes: ["200"],
		tags: ["all"],
		cat: "cat-laugh",
		critLevel: 2
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