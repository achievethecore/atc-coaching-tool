Achieve The Core Coaching Tool Source Code
=============
The person who associated a work with this deed has dedicated the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighboring rights, to the extent allowed by law.  You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.  [Click here for more information](http://creativecommons.org/publicdomain/zero/1.0/).  

This is the source code of the Achieve the Core Coaching Tool, accessible at http://achievethecore.org/coaching-tool/

External Dependencies
-----
The tool depends on the following external API endpoints for user authentication and saving. Refer to the source code for the parameters and return values these endpoints should provide.

	POST /login *
	POST /register
	POST /edit-profile
	POST /coaching-mail
	POST /coaching-new-data *
	POST /coaching-save-data
	POST /forgotpass
	GET /coaching-saved-data
	
*Required to access the main functionality of the tool.
