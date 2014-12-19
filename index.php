<?php
    $GLOBALS['env'] = 'live';
    if($_SERVER['SERVER_NAME'] == 'dev.achievethecore.org'){
        $GLOBALS['env'] = 'devatc';
    }else if($_SERVER['SERVER_NAME'] == 'localhost'){
        $GLOBALS['env'] = "lcl";
    }

    if($GLOBALS['env'] != 'lcl'){
        session_start();
        include_once '../admin/db.php';
        require_once '../util.php';
        require '../Slim/Slim.php';
        \Slim\Slim::registerAutoloader();
        $app = new \Slim\Slim();
        $app->config('debug', true);

        $user = null;
        if(isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
        }
    }else{
        require_once '../util.php';
    }
?><!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Achievethecore.org :: Instructional Practice Guide: Coaching</title>
    <meta name="description" content="This is a tool for teachers, and those who support teachers, to build understanding and experience with CCSS aligned instruction.">
    <meta property="og:description" content="This is a tool for teachers, and those who support teachers, to build understanding and experience with CCSS aligned instruction.">
    <meta property="og:url" content="http://achievethecore.org/coaching-tool/">
    <meta property="og:site_name" content="Achievethecore.org">
    <meta property="og:type" content="website">
    <meta property="og:image" content="http://achievethecore.org/img/fbshare.jpg">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="mobile-web-app-status-bar-style" content="black" />
	<link rel="apple-touch-icon" href="img/coaching/webapp.png" sizes="152x152">
	<link rel="shortcut icon" sizes="196x196" href="img/coaching/webapp.png">

    <meta name="viewport" content="width=1088, initial-scale=0.70, maximum-scale=0.70">

    <!--<link rel="stylesheet" href="css/bootstrap.min.css">-->
    <link href='http://fonts.googleapis.com/css?family=Just+Me+Again+Down+Here' rel='stylesheet' type='text/css'>
    <link href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="/mi/b=<?=basename(realpath('.'))?>/css&f=bootstrap.min.css,main.css,select2.css,coaching.css&<?= filemtime('css/coaching.css') ?>">

    <script src="../js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    <script src="http://tinymce.cachefly.net/4/tinymce.min.js"></script>
    <script type="text/javascript">var loggedin = <?php echo (isset($user['name'])) ? 'true' : 'false'; ?>;</script>
</head>
<body class="<?php echo (isset($user['name'])) ? 'loggedin' : ''; ?>" spellcheck="true">
<!--[if lt IE 7]>
<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
<![endif]-->

    <div class="landing">
        <div class="atf">
            <div class="header">
                <div class="atc"><a href="." class="logo-atc"></a><img src="img/coaching/ATC_coachingtool_logo_grey.svg" class="logo-grey"><img src="img/coaching/ATC_coachingtool_logo_white.svg" class="logo-white"></div>
                <div class="lr">
                    <a href="#loginModal" class="btn-login">LOGIN -</a> 
                    <a data-toggle="modal" href="#registerModal" class="btn-register registerbtn-landing">REGISTER</a>
                    <a data-toggle="modal" href="#savedModal" class="btn-saved">SAVED</a>
                    <a data-toggle="modal" href="#loginModal" class="loginbtn" style="display: none;">SAVED</a>
                </div>
            </div>
            <div class="middle">
                <div class="landing-main">
                    <h1>Coaching<span>Observe the Common Core in action</span></h1>
                    <a href="#" class="landing-btn btn-new"><span></span>START A NEW PRACTICE GUIDE</a>
                    <a href="#" class="landing-btn btn-continue"><span></span>CONTINUE A PRACTICE GUIDE</a>
                </div>
                <div class="landing-info">
                    <h1>Begin by filling these out.</h1>
                    <div class="dropdown landing-dropdown" id="dropdown-subject">
                        <a href="#" data-toggle="dropdown" class="toggle">SELECT SUBJECT<span>&#8217;</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#1">English Language Arts / Literacy</a></li>
                            <li><a href="#2">Mathematics</a></li>
                            <li><a href="#3">Social Studies / History</a></li>
                            <li><a href="#4">Science / Technical Studies</a></li>
                        </ul>
                    </div>
                    <div class="dropdown landing-dropdown" id="dropdown-grade">
                        <a href="#" data-toggle="dropdown" class="toggle">SELECT A GRADE BAND<span>&#8217;</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#1">K-2</a></li>
                            <li><a href="#2">3-5</a></li>
                            <li><a href="#3">6-12</a></li>
                        </ul>
                    </div>
                </div>
                <div class="landing-login">
                    <h1>Log In</h1>
                    <form id="landing-login-form">
                    <div class="em">
                        <input type="email" value="" placeholder="Email" name="email" id="email">
                    </div>
                    <div class="pw">
                        <input type="password" name="password" id="password" placeholder="Password">
                        <a href="#" class="btn-forgot">?</a>
                    </div>
                    </form>
                    <a href="#" class="btn-submit">SUBMIT</a>
                    <span>Not a member? <a href="#">Register Here</a></span>
                </div>
            </div>
            <div class="bottom">
                Scroll to learn more
                <div>&#8217;</div>
            </div>
        </div>
        <div class="btf">

        </div>
    </div>
<header>
    <nav id="topnav" class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                    <a href="#" class="btn btn-go-inverse">MENU <i class="icon-chevron-down"></i></a>
                </button>
                <h1><a class="navbar-brand" href="#">Achieve the Core</a></h1>
            </div>
            <div class="collapse navbar-collapse">
                <div class="navbar-text navbar-right dropdown" id="nav-profilename">
                    <a href="#" data-target="#" data-hover="dropdown" id="profilenamelink"><?= (isset($_SESSION['user'])) ? ht($user['name']) : "" ?></a>
                  <ul class="dropdown-menu" aria-labelledby="profilenamelink" id="profilemenu">
                    <li><a href="#" id="savedSearchesBtn">Saved Observations</a></li>
                    <li><a href="#" class="myaccountBtn">My Account</a></li>
                    <li><a href="#" class="logoutBtn">Log Out</a></li>
                  </ul>

                    <a data-toggle="modal" href="#loginModal" class="loginbtn">LOGIN -</a> <a data-toggle="modal" href="#registerModal" class="registerbtn">REGISTER</a>
                </div>

                <ul class="nav navbar-nav navbar-right">
                	<li ><a href="#" class="newobsBtn">START A NEW PRACTICE GUIDE</a></li>
                    <li ><a data-toggle="modal" href="#aboutModal" class="aboutBtn">ABOUT</a></li>
                </ul>
            </div>
        </div>
        <div id="topright"></div>
    </nav>
</header>

<div id="main" class="container coaching-landing">
    <div class="hpimage"></div>
    
    <!--<h1>CCSS Instructional Practice Guide</h1>-->

    <!--landing page-->
    <div class="row questions" style="display:none">
        <div class="col-md-7 mainbox ">
            <div class="mainbox"><h2>Begin by selecting:</h2></div>
            <div class="question rolemenus">
            <div id="modes"><a class="mode-notes">Take Notes<small>Observation Mode</small></a><a class="mode-guide">Start a Practice Guide<small>Post Observation Mode</small></a></div>
                <form id="searchform" class="hidden" onsubmit="return false;">
                
					<div class="btn-group"><button type="button" id="subject-select" class="btn btn-go btn-lg dropdown-toggle" data-toggle="dropdown">Select a subject <span class="caret"></span></button>
						<ul class="dropdown-menu subjectsdropdown">
							<li><a href="#" data-name="subjects" data-value="1">ELA / Literacy</a></li>
							<li><a href="#" data-name="subjects" data-value="2">Mathematics</a></li>
							<li><a href="#" data-name="subjects" data-value="3">Social Studies / History</a></li>
							<li><a href="#" data-name="subjects" data-value="4">Science / Technical Subjects</a></li>
						</ul>
					</div>


                    <div class="btn-group">
                        <button type="button" id="grade-select" class="btn btn-go btn-lg dropdown-toggle btn-wide" data-toggle="dropdown">Select a grade band <span class="caret"></span></button>
							<ul class="dropdown-menu gradesdropdown">
								<li><a href="#" data-name="grades" data-value="1">K-2</a></li>
								<li><a href="#" data-name="grades" data-value="2">3-5</a></li>
								<li><a href="#" data-name="grades" data-value="3">6-12</a></li>
							</ul>
                    </div>
                    <a id="search-submit" class="btn btn-go btn-goforward btn-wide" href="#">Submit</a>
                </form>
            </div>
        </div>
    </div>

    <!--search results-->
    <div class="row assheader">
        <div class="col-md-8">
			<h1>Header</h1>
			<h2>Sub</h2>
			<!--<div class="backupnote">This guide can be used for ELA/Literacy or text-based Social Studies or Science lessons.</div>-->
		</div>
		<div class="col-md-4">
			<a class="act-print"  data-toggle="modal" href="#printModal">Print</a>
			<a class="act-email"  data-toggle="modal" href="#emailModal">Email</a>
		    <a class="act-export"  data-toggle="modal" href="#exportModal">Export</a>
            
            
		</div>
        <!--<div class="col-md-4">
            <h2>Grades 3-5</h2>
            <h2>Daily Lesson</h2>
        </div>
        <div class="col-md-12 statusnav">
			<div class="active navstep">1. Take Notes</div>
			<div class=" navstep">2. Assign Indicators</div>
			<div class=" navstep">3. Apply Scale</div>
			<div class=" navstep">4. Review</div>
			<div class="navmore dropdown"><a data-target="#" data-hover="dropdown" data-toggle="dropdown" class="btn btn-go">More <span class="caret"></span></a>
                    
                  <ul class="dropdown-menu" id="moremenu">
                    <li><a data-toggle="modal" href="#detailsModal">Details</a></li>
                    <li><a data-toggle="modal" href="#saveModal">Sync Lesson</a></li>
                    <li><a href="#" class="dailyPrint">Daily Print Version</a></li>
                    <li><a href="#" class="yearlyPrint">Yearly Print Version</a></li>
                  </ul>
			</div>
		</div>-->
    </div>
    
	<div class="row warning">Indicators for Core Action 1 should be observable in any lesson. You have not yet selected a rating for one or more indicators in Core Action 1.<br>If no selection is made, “no” will appear as the default rating.<a class="close">X</a></div>

    <div class="steps">
        <div class="row step step-1">
            <script id="notes-template" type="text/html">
{{#actions}}
	            <hr>
	            <div class="notesleft">
	            <h3><a href="#" data-action="{{num}}">Core Action {{num2}}</a></h3>
	            <p>{{text}}
	            <ul>
	            {{#indicators}}
					<li><a href="#" data-action="{{num}}" data-indicator="{{inum}}">{{alpha}}</a>. {{text}}</li>
				{{/indicators}}
	            </ul>
	            </div>
{{/actions}}
            </script>
            <div class="form"></div>
            <hr>
            <a href="#" class="btn btn-go btn-goforward btn-wide btn-lg">Go To Core Action 1</a>
        </div>
        
        <div class="row step step-2">
            <h2>Assign Indicators</h2>
            <p>Select the indicators that most closely align to the evidence you observed. First, choose the evidence from your notes that you would like to associate with a particular indicator. When you highlight a word, phrase, or section of your notes, the letters for the indicators for that action will appear. Select the relevant indicator. Repeat this for all of the evidence you have collected. You will be able to return to and edit the information in this section at any time.</p>
            <script id="indicator-template" type="text/html">
{{#actions}}
	            <hr>
	            <div class="notesleft">
	            <h3>Core Action {{num}}</h3>
	            <p>{{text}}
	            <h4>Indicators</h4>
	            <ul>
	            {{#indicators}}
					<li><span class="encircled">{{alpha}}</span> {{text}}</li>
				{{/indicators}}
	            </ul>
	            </div>
	            <div class="notesright">
	            <h4>Your Notes | <a href="#" class="editnotes">Edit Notes</a></h4>
	            <div class="notes highlightable">{{#notes}}{{line}}<br>{{/notes}}</div>
	            </div>
{{/actions}}
            </script>
            <div class="form"></div>
            <hr>
            <a href="#" class="btn btn-go btn-goforward btn-wide btn-lg">Apply Observations</a>
        </div>
        
        	<div id="tabs">
        		<a>1</a>
        	</div>
            <div id="tools">
            	<div class="panel">
            		<a data-toggle="collapse" data-parent="#tools" href="#tools-res">Suggest Resources</a>
            	<div id="tools-res" class="panel-collapse collapse in firsttime">
            		<div class="added-container clearfix"></div>
					<p>Visit <a href="/" target="_blank">AchieveTheCore.org</a> to find helpful resources to add to your observation. Paste the URL of the resource you would like to share into the text box below and then click the plus sign to add it.</p>
					<div class="form-group"><input type="text" class="form-control" placeholder="Paste URL Here" id="addurl"><button class="btn btn-go" id="addbtn">+</button></div>
            	</div>
            	
            	
            		<a data-toggle="collapse" data-parent="#tools" href="#tools-notes">Notes</a>
            	<div id="tools-notes" class="panel-collapse collapse in">
            		<textarea class="form-control tip"></textarea>
            	</div>
            	
            		<!--<a data-toggle="collapse" data-parent="#tools" href="#tools-progress">Progress</a>
            	<div id="tools-progress" class="panel-collapse collapse">
            		<div class=""></div>
            	</div>-->
            	
            		<a data-toggle="collapse" data-parent="#tools" href="#tools-details">Lesson Details</a>
				<div id="tools-details" class="panel-collapse collapse">
				
				

                <p>Fill in the information below about this observation.  You can return to and edit the information in this section at any time.</p>

	            
               <input id="details_teacher" class="form-control" type="text" placeholder="Teacher / Instructor">
                <input id="details_text" class="form-control" type="text" placeholder="Text Addressed in this lesson">
                <input id="details_standards" class="form-control" type="hidden" placeholder="Standards addressed in this lesson">
	            <!--<textarea id="details_standards" class="form-control" type="text" placeholder="Standards Addressed in this lesson"></textarea>-->
      
      
      <div class="form-group elak2"><select id="ca1sub" class="form-control"><option value="">Select Lesson type</option><option value="reading">Reading/Listening Comprehension</option><option value="foundation">Foundational Skills</option></select></div>
      <hr>

              <div class=rigorq>Aspect(s) of rigor targeted in the standard(s) addressed in this lesson:</div>
              <div class="rigorslide">
                          	<a class=rigora data-toggle=button>Conceptual understanding</a>
            	<a class=rigora data-toggle=button>Procedural skill and fluency</a>
            	<a class=rigora data-toggle=button>Application</a>
              </div>
              <hr>
	            <div class="notesright">
	            <input id="details_school" class="form-control" type="text" placeholder="School">
	            	            <!--<input id="details_observer" class="form-control" type="text" placeholder="Observer Name">-->
				<input id="details_class" class="form-control" type="text" placeholder="Grade / Class Period / Section">
				<input id="details_unit" class="form-control" type="text" placeholder="Topic / Lesson / Unit">
	            <div class="form-group dategroup"><select id="details_mm" class="form-control"></select><select id="details_dd" class="form-control"></select><select id="details_yy" class="form-control"></select></div>
	            </div>

        
            	</div>
            	
            		<a data-toggle="collapse" data-parent="#tools" href="#tools-printable">Printable Guides</a>
            	<div id="tools-printable" class="panel-collapse collapse">
            		    <a href="#" class="dailyPrint">Lesson Guide</a>
                   <a href="#" class="yearlyPrint">Yearly Guide</a>
            	</div>
            	</div>
            </div>
            
        <div class="row step step-3">
            <script id="observation-template" type="text/html">
            <h2></h2>
            <h3>Indicators</h3>
            {{#actions}}
            <div class="ca">
	            {{#indicators}}
	            <div class="notesleft">
	            <h4>{{alpha}}. </h4>
	            <p>{{text}}
	            <p><a href="#" class="addobs">Add an Observation</a></p>
	            <div class="obsnotes">
              {{#obsnotes}}
              <div class="obs">{{#.}}{{{line}}}{{/.}}</div>
              <div class="obstools" data-action="{{num}}" data-indicator="{{inum}}"><a href="#" class="obsedit">Edit</a> <a href="#" class="obsdel">Delete</a></div>
              {{/obsnotes}}
              </div>
	            <h4>SELECT A RATING <!--<a data-toggle="modal" href="#scaleModal" class="ratingstip" data-action="{{num}}" data-indicator="{{inum}}"><!--<i class="icon-question-sign"></i><sup>Scale</sup></a>--></h4>
	            <ul class="observed" data-action="{{num}}" data-indicator="{{inum}}">
	            	<li><span class="encircled">1</span> <span class="desc"></span></li>
					<li><span class="encircled">2</span> <span class="desc"></span></li>
					<li><span class="encircled">3</span> <span class="desc"></span></li>
					<li><span class="encircled">4</span> <span class="desc"></span></li>
					<li><span class="encircled">NA</span> <span class="desc"></span></li>
	            </ul>
	            </div>
	            <hr>
	            {{/indicators}}
	        </div>
	    	{{/actions}}



            </script>
            <!--
				<h3>Suggest Resources</h3>
				<p>Visit <a href="/" target="_blank">AchieveTheCore.org</a> to find helpful resources to add to your observation. Paste the URL of the resource you would like to share into the text box below and then click the plus sign to add it.</p>
				<div class="form-group"><input type="text" class="form-control" placeholder="Paste URL Here" id="addurl"><button class="btn btn-go" id="addbtn">+</button></div>
				<div class="added-container clearfix"></div>
            -->
            <div class="form"></div>
 			<a href="#" class="btn btn-go btn-goforward btn-wide btn-lg">Go To Core Action 1</a>
        </div>
        
        <div class="row step step-4">
            <h2>Review</h2>
            <p>Please take a moment to review your observations and feedback on this page. You may return to edit any content, if necessary, by accessing the Core Actions on the left.</p>
            <hr>
            <div class="reviewactions">
            <a class="act-sync" data-toggle="modal" href="#saveModal">Sync</a>
            <a class="act-export"  data-toggle="modal" href="#exportModal">Export</a>
            <a class="act-email"  data-toggle="modal" href="#emailModal">Email</a>
            <a class="act-print"  data-toggle="modal" href="#printModal">Print</a>
            <p>Save these observations to your account.</p>
            <p>Export these observations to your computer in PDF or RTF format.</p>
            <p>Email these observations to yourself or the instructor.</p>
            <p>Print these observations for your records.</p>

            </div>
            <hr>
            <script id="complete-template" type="text/html">
	            <div class="complete-header"><h1>CCSS Instructional Practice Guide</h1></div>
	            <div class="header-left">
	            	<div class="date">{{date}}</div>
	            	<h3>{{subject}}</h3>
	            	<h4>Grades {{grades}} | Lesson</h4>
	            </div>
	            <div class="header-right">
	            	<div class="header-pageno"></div>
	            	<div class="header-details">
						{{#details_class}}Grade/Course: {{details_class}}<br>{{/details_class}}
						{{details_period}}<br>
						{{details_teacher}}<br>
						{{#details_observerDISABLED}}Observer: {{details_observer}}<br>{{/details_observerDISABLED}}
						{{#details_unit}}Lesson: {{details_unit}}<br>{{/details_unit}}
						{{#details_standards}}Standards Addressed: {{details_standards}}<br>{{/details_standards}}
						{{#details_text}}Text Addressed: {{details_text}}<br>{{/details_text}}
						{{#rigorsDISABLED}}Rigor Targeted: {{rigors}}<br>{{/rigorsDISABLED}}
					</div>
	            </div><hr>
{{#actions}}
<section class="ca-{{num}}">
				<h2>Core Action {{num2}}</h2>
	            <p>{{text}}
	            {{#indicators}}
	            <div class="obs-{{obs}}">
	            <h4>{{alpha}}. </h4>
	            <p>{{text}}
	            <h4>Observations</h4>
	            <div class="notes">{{#notes}}{{{line}}}{{/notes}}
	            {{#rigor1.length}}
	            <h4>Aspects of rigor targeted in the standard(s) addressed in this lesson:</h4>
              {{/rigor1.length}}
	            	<ul class=rigor>{{#rigor1}}<li>{{.}}</li>{{/rigor1}}</ul>
	            
	            {{#rigor2.length}}
	            <h4>Aspects of rigor targeted in this lesson:</h4>
              {{/rigor2.length}}
	            	<ul class=rigor>{{#rigor2}}<li>{{.}}</li>{{/rigor2}}</ul>
	            
				      </div>

	            <h4 class="obsomit">Rating:</h4>
	            <ul class="observed obsomit">
	            	<li data-action="{{num}}" data-indicator="{{inum}}"><span class="encircled active obs-{{obs}}">{{obs}}</span> <span class="desc">{{obsdesc}}</span></li>
	            </ul>
	            </div>

	            <hr>
	            {{/indicators}}
</section>
{{/actions}}
{{#actions.0.notes.0}}
<h3 class="obsomitnotes">Your Notes</h3>
<!--<p style="display:none"></p>-->
<div class="obsomitnotes">{{#actions.0.notes}}{{{line}}}{{/actions.0.notes}}</div>
{{/actions.0.notes.0}}
{{#suggested.length}}
				<h3>Suggested Resources</h3>
				<p>The following resources have been recommended to you by the person who conducted this observation. Visit <a href="/" target="_blank">achievethecore.org</a> for these and other Common Core-aligned materials.</p>
				<div class="added-container clearfix"></div>
{{/suggested.length}}
            </script>
            <script id="print-template" type="text/html">
             <div class="ipg-cover">
	            <div class="header-left">
                <h1>Instructional Practice Guide: Coaching</h1>
                <div class="ipg-guidetype">
                  <div class="guidetype-row">
                      <h3>{{subject}}</h3>
                      <h3>{{grades}}</h3>
                      <h3>Lesson</h3>
                  </div>
                  <div class="guidetype-row guidetype-labels">
                    <h4>Subject</h4>
                    <h4>Grades</h4>
                    <h4>Guide Type</h4>
                  </div>
                </div>
                
<div class="intro-copy subj1 grade1">
<p>The coaching tool is for teachers, and those who support teachers, to build understanding and experience with Common Core State Standards (CCSS) aligned instruction. Designed as a developmental tool, it can be used for planning, reflection, collaboration, and coaching. The three Shifts in instruction for ELA / Literacy provide the framing for this tool.</p>

<ol><li>Regular practice with complex text and its academic language.
</li><li>Reading, writing, and speaking grounded in evidence from text, both literary and informational.
  </li><li>Building knowledge through content-rich nonfiction.</li></ol>
  
 <p>The guide provides examples of what implementing the CCSS for English Language Arts and Literacy in grades K—2 look like in daily planning and practice.  It is organized around three Core Actions which encompass the Shifts and instructional practice.  Each Core Action consists of individual indicators which describe teacher and student behaviors that exemplify Common Core aligned instruction. 

<p>The Core Actions and indicators should be evident in planning and observable in instruction. For each lesson evidence might include a lesson plan, exercises, tasks and assessments, teacher instruction, student discussion and behavior, and student work. Although many indicators will be observable during the course of a lesson, there may be times when a lesson is appropriately focused on a smaller set of objectives or only a portion of a lesson is observed, leaving some indicators blank. In K–2, for example, the lesson might focus only on foundational reading or reading comprehension or writing. Any particular focus should be communicated between teacher and observer before using the tool. Refer to the CCSS Standards for English Language Arts and Literacy (corestandards.org/ELA-Literacy) as necessary.</p>

<p>Companion tools for Instructional Practice include:</p>
<ul><li>Instructional Practice Guide: Coaching (Digital)- a digital version of this print tool, view at  achievethecore.org/coaching-tool
</li><li>Instructional Practice Guide: Lesson Planning- designed for teachers to support them in creating lessons aligned to the CCSS, view at achievethecore.org/lesson-planning-tool
  </li></ul></div>
  
<div class="intro-copy subj1 grade2">
<p>The coaching tool is for teachers, and those who support teachers, to build understanding and experience with Common Core State Standards (CCSS) aligned instruction. Designed as a developmental tool, it can be used for planning, reflection, collaboration, and coaching. The three Shifts in instruction for ELA / Literacy provide the framing for this tool.

<ol><li>Regular practice with complex text and its academic language.
</li><li>Reading, writing, and speaking grounded in evidence from text, both literary and informational.
  </li><li>Building knowledge through content-rich nonfiction.</li></ol>
  
 <p>The guide provides examples of what implementing the CCSS for English Language Arts and Literacy in grades 3-12 look like in daily planning and practice.  It is organized around three Core Actions which encompass the Shifts and instructional practice.  Each Core Action consists of individual indicators which describe teacher and student behaviors that exemplify Common Core aligned instruction. 

<p>The Core Actions and indicators should be evident in planning and observable in instruction. For each lesson evidence might include a lesson plan, exercises, tasks and assessments, teacher instruction, student discussion and behavior, and student work.  Although many indicators will be observable during the course of a lesson, there may be times when a lesson is appropriately focused on a smaller set of objectives or only a portion of a lesson is observed, leaving some indicators blank. Any particular focus should be communicated between teacher and observer before using the tool.  Refer to the CCSS Standards for English Language Arts and Literacy (corestandards.org/ELA-Literacy) as necessary.

<p>Companion tools for Instructional Practice include:</p>
<ul><li>Instructional Practice Guide: Coaching (Digital)- a digital version of this print tool, view at  achievethecore.org/coaching-tool
</li><li>Instructional Practice Guide: Lesson Planning- designed for teachers to support them in creating lessons aligned to the CCSS, view at achievethecore.org/lesson-planning-tool
  </li></ul></div>

<div class="intro-copy subj2">
<p>The coaching tool is for teachers, and those who support teachers, to build understanding and experience with Common Core State Standards (CCSS) aligned instruction. Designed as a developmental tool, it can be used for planning, reflection, collaboration, and coaching. The three Shifts in instruction for Mathematics provide the framing for this tool.

<p>The Shifts required by the Common Core State Standards for Mathematics are:

<ul><li>Focus: Focus strongly where the Standards focus.
<li>Coherence: Think across grades, and link to major topics within grades.
<li>Rigor: In major topics pursue conceptual understanding, procedural skill and fluency, and application with equal intensity.
</ul>

<p>The guide provides examples of what implementing CCSS for Mathematics look like in daily planning and practice. It is organized around three Core Actions which encompass the Shifts, instructional practice, and the mathematical practices. Each Core Action consists of individual indicators which describe teacher and student behaviors that exemplify Common Core aligned instruction. 

<p>The Core Actions and indicators should be evident in planning and observable in instruction.  For each lesson evidence might include a lesson plan, problems and exercises, tasks and assessments, teacher instruction, student discussion and behavior, and student work.  Although many indicators will be observable during the course of a lesson, there may be times when a lesson is appropriately focused on a smaller set of objectives or only a portion of a lesson is observed, leaving some indicators blank. Any particular focus should be communicated between teacher and observer before using the tool.   Refer to the CCSS for Mathematics (corestandards.org/math) as necessary.

<p>Companion tools for Instructional Practice include:</p>
<ul><li>Instructional Practice Guide: Coaching (Digital)- a digital version of this print tool, view at  achievethecore.org/coaching-tool
</li><li>Instructional Practice Guide: Lesson Planning- designed for teachers to support them in creating lessons aligned to the CCSS, view at achievethecore.org/lesson-planning-tool
  </li></ul></div>
  
	            </div>
	            <div class="header-right">
               
	            	<div class="header-details">
	            	<div class="detail-value">{{date}}</div>
                 <div class="detail-label">Date</div>
	            	<div class="detail-value">{{details_teacher}}</div>
                 <div class="detail-label"> Teacher Name</div>
                 
                 	            	<div class="detail-value">{{details_class}}</div>
                 <div class="detail-label">Grade / Class Period / Section</div>
                 	            	<div class="detail-value">{{details_unit}}</div>
                 <div class="detail-label">Topic / Lesson / Unit</div>
                            	<div class="detail-value">{{details_standards}}</div>
                 <div class="detail-label">Standard(s) Addressed in this Lesson</div>

						{{#details_text}}<div class="detail-value">{{details_text}}</div>
                 <div class="detail-label">Text(s) Addressed in this Lesson</div>{{/details_text}}
					</div>
	            </div>
              </div><!-- cover -->
              {{#actions.0.notes.0}}
<h3 class="obsomitnotes">Your Notes</h3>
<!--<p style="display:none"></p>-->
<div class="obsomitnotes">{{#actions.0.notes}}{{{line}}}{{/actions.0.notes}}</div>
{{/actions.0.notes.0}}
<hr>
{{#actions}}
<section class="ca-{{num}}">
				<h2>Core Action {{num2}}{{#sub}} for {{sub}}{{/sub}}</h2>
	            <p>{{text}}
              <h4>Indicators</h4>
	            {{#indicators}}
	            <div class="ipg-indicator">
	            <h4>{{alpha}}. </h4>
	            <p>{{text}}

              <div class="ratings">
	            <ul class="observed obsomit">
	            {{#allchoices}}
	            	<li data-action="{{num}}" data-indicator="{{inum}}"><span class="encircled {{active}} obs-{{value}}">{{value}}</span> <span class="desc">{{label}}</span></li>
	            {{/allchoices}}
	            </ul>
              </div>
	            </div>
	            <div class="notes">{{#notes}}{{{line}}}{{/notes}}
	            {{#rigor1.length}}
	            <h4>Aspects of rigor targeted in the standard(s) addressed in this lesson:</h4>
              {{/rigor1.length}}
	            	<ul class=rigor>{{#rigor1}}<li>{{.}}</li>{{/rigor1}}</ul>
	            
	            {{#rigor2.length}}
	            <h4>Aspects of rigor targeted in this lesson:</h4>
              {{/rigor2.length}}
	            	<ul class=rigor>{{#rigor2}}<li>{{.}}</li>{{/rigor2}}</ul>
	            
				      </div>

	            <hr>
	            {{/indicators}}
</section>
{{/actions}}

{{#suggested.length}}
				<h3>Suggested Resources</h3>
				<p>The following resources have been recommended to you by the person who conducted this observation. Visit <a href="/" target="_blank">achievethecore.org</a> for these and other Common Core-aligned materials.</p>
				<div class="added-container clearfix"></div>
{{/suggested.length}}

<div class="ipg-end">
<div class="subj2">
<p>This tool is for teachers, those providing support to teachers, and all educators working to implement the CCSS for Mathematics – it is not designed for use in
evaluation. The guide should be used in conjunction with the CCSS Instructional Practice Guide: Supplement for Reflection Over the Course of the Year. Both tools
are available at achievethecore.org/instructional-practice.
<p>For more information on teaching practices, see NCTM’s publication Principles to Actions: Ensuring Mathematical Success for All for eight Mathematics Teaching
Practices listed under the principle of Teaching and Learning. http://www.nctm.org/principlestoactions
<p>To the extent possible under law, we have waived all copyright and related or neighboring rights to this work. Any and all components may be customized to meet
the needs of any audience — they may be modified, reproduced, and disseminated without prior permission.

</div>
<div class="subj1">
<p>This tool is for teachers, those providing support to teachers, and all educators working to implement the CCSS for ELA/Literacy – it is not designed for use in
evaluation. The guide should be used in conjunction with the CCSS Instructional Practice Guide: Supplement for Reflection Over the Course of the Year. Both tools
are available at achievethecore.org/instructional-practice.
<p>To the extent possible under law, we have waived all copyright and related or neighboring rights to this work. Any and all components may be customized to meet
the needs of any audience — they may be modified, reproduced, and disseminated without prior permission.
</div>
</div>

            </script>
            <div class="form"></div>
            <div class="printonly"></div>
 			<a href="#" class="btn btn-go btn-wide btn-lg">Back to Top</a>
        </div>
        
        <div class="row step step-details">
            <h2>Add Details</h2>
            <p>Add the necessary information about the observation you are conducting. You can always edit these at a later time.</p>
            <hr>
            <div class="notesleft">
            <select  class="form-control"><option>ELA / Literacy</option></select>
            <select  class="form-control"><option>Daily Lesson</option></select>
            <div class="form-group dategroup"><select  class="form-control"><option>MM</option></select><select  class="form-control"><option>DD</option></select><select  class="form-control"><option>YYYY</option></select></div>
			<input  class="form-control" type="text" placeholder="Class">
            </div>
            <div class="notesright">
            <select  class="form-control"><option>Grades K-2</option><option>Grades 3-5</option><option>Grades 6-12</option></select>
            <input  class="form-control" type="text" placeholder="Teacher / Instructor">
            <input  class="form-control" type="text" placeholder="Unit or Lesson">
            <input  class="form-control" type="text" placeholder="Standards Addressed">
            </div>
            
            <hr>
        </div>

 
    </div>

    <!--saved searches-->
    <div class="row savedata">
        <div class="col-md-1"></div>
        <div class="col-md-10">
            <h3>Saved Observations</h3>

<script id="saved-template" type="text/html">
{{^saved}}
            <p>Nothing here yet!</p>
            <p>To start your collection, create a new observation. You can return to your collection here every time you log in.</p>

{{/saved}}
            <table class="table">
                <thead>
                <tr>
                    <th><span>Created</span></th>
                    <th><span>Adjusted</span></th>
                    <th><span>Teacher</span></th>
                    <th><span>Class</span></th>
                    <th><span>Subject</span></th>
                    <th>Shared</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
{{#saved}}
                <tr>
                    <td>{{date_added}}</td>
                    <td>{{date_updated}}</td>
                    <td>{{^title}}N/A{{/title}}{{title}}</td>
                    <td>{{^notes}}N/A{{/notes}}{{notes}}</td>
                    <td>{{^subject}}N/A{{/subject}}{{subject}}</td>
                    <td>{{#shared}}<i class="icon icon-sapicon-check"></i>{{/shared}}</td>
                    <td><a href="#{{id}}" class="btn-email"></a></td>
                    <td><a href="#{{id}}" class="btn-delete"></a></td>
                    <td><a href="#{{id}}" class="btn btn-go btn-viewdetail">OPEN</a></td>
                </tr>
{{/saved}}      
                </tbody>
            </table>
</script>
		<div class="form"></div>
        </div>
        <div class="col-md-1"></div>
    </div>

    <!--about page-->
    <div class="row about">
        <div class="col-md-1"></div>
        <div class="col-md-10">
            <h2>
                Welcome
            </h2>
            <p>

            </p>
            <p>This guide is a practical tool that teachers, and teacher-trainers, can use (and re-use!) in order to build fluency with the Common Core State Standards (CCSS).

			<p>The guide is designed to support the learning process for teachers, by providing concrete examples of what specific instructional behaviors (or “Core Actions”) look like when they are aligned to the Common Core. The guide accomplishes this by organizing classroom observations against specific CCSS    criteria and Core Actions. Additionally, a rating system aids in monitoring areas of strength and identifying opportunities for improvement. Finally, the guide makes the sharing of feedback quicker, easier and more efficient. 

			<h2>Getting Started</h2>
			
			<p>To get started, simply select the appropriate topic and grade band and the tool will launch. Then follow the steps below. You can save your work throughout, and you can skip or return to each step at any point. 

			 <ul>
			 			<li>Step 1: Take notes in the open text boxes provided. You can do this while observing or use this this space when transferring your notes from paper.
						
						<li>Step 2: Assign indicators to the evidence you gathered.
						
						<li>Step 3: Apply a scale to each of the indicators based on the evidence.
						
						<li>Step 4: Review, edit, save, and share the observation.
			</ul> 
			
			<h2>About this Tool</h2>
			
<p>achievethecore.org’s digital tools and resources for teachers have been made possible by contributions from teachers across the country as well as through generous support from the Leona M. and Harry B. Helmsley Charitable Trust and the GE Foundation.

 

<p>To learn more about Student Achievement Partners and for access to an array of free resources, please visit us at <a href="/" target="_blank">achievethecore.org</a>.



        </div>
        <div class="col-md-1"></div>
    </div>
    
</div>


<footer>
    <div class="container">
        <div class="row">
            <div class="col-xs-4"><div id="footerlogo">Student Achievement Partners</div></div>
            <div class="col-xs-8">
                <nav>
                    <a href="http://www.achievethecore.org/" target="_blank">Visit achievethecore.org</a>
                    <a href="mailto:info@studentsachieve.net?subject=[Coaching Tool] Feedback" class="feedback" style="

    margin-right: 30px;

"><i class="icon-comment-alt"></i> SEND US FEEDBACK</a>
                </nav>
            </div>
        </div>
    </div>
</footer>

<!-- Register Modal -->
<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content myacctArea"></div>

        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Register</h4>
                <h4 class="modal-title editmode">Profile Edit</h4>
            </div>
            <div class="modal-body">
                <form id="registerform" class="mainbox">
                    <div class="form-group">
                        <label for="firstname">First Name *</label>
                        <input type="text" value="" placeholder="First Name" name="firstname" id="firstname" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="lastname">Last Name *</label>
                        <input type="text" value="" placeholder="Last Name" name="lastname" id="lastname" class="form-control">
                    </div>
                    <br class="clearBoth" />

                    <div class="form-group grade-group">
                        <label for="grade">Grade(s) *</label>
                        <div id="grade" class="form-control">
                            <div class="container"><div class="row">
                                 <div class="col-md-6">
                                    <label style="display:block;"><input type="checkbox" value="0" name="grade[]"> Kindergarten</label>
                                    <label><input type="checkbox" value="1" name="grade[]"> 1st Grade</label>
                                    <label><input type="checkbox" value="2" name="grade[]"> 2nd Grade</label>
                                    <label><input type="checkbox" value="3" name="grade[]"> 3rd Grade</label>
                                    <label><input type="checkbox" value="4" name="grade[]"> 4th Grade</label>
                                    <label><input type="checkbox" value="5" name="grade[]"> 5th Grade</label>
                                    <label><input type="checkbox" value="6" name="grade[]"> 6th Grade</label>
                                    <label><input type="checkbox" value="7" name="grade[]"> 7th Grade</label>
                                    <label><input type="checkbox" value="8" name="grade[]"> 8th Grade</label>
                                    <label><input type="checkbox" value="9" name="grade[]"> 9th Grade</label>
                                    <label><input type="checkbox" value="10" name="grade[]"> 10th Grade</label>
                                    <label><input type="checkbox" value="11" name="grade[]"> 11th Grade</label>
                                    <label><input type="checkbox" value="12" name="grade[]"> 12th Grade</label>
                                </div>
                             <div class="col-md-6">
                                <label style="display:block;"><input type="checkbox" value="100"> Elementary School</label>
                                <label><input type="checkbox" value="101"> Middle School</label>
                                <label><input type="checkbox" value="102"> High School</label>
                                </div>
                             </div></div>
                        </div>
                    </div>
                    <br class="clearBoth" />

                    <div class="form-group">
                        <label for="subject">Subject of Interest *</label>
                        <select id="subject" name="subject" class="form-control">
                            <option>ELA / Literacy</option>
                            <option>Mathematics</option>
                            <option>ELA / Literacy and Mathematics</option>
                            <option>N/A</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="role">Role *</label>
                        <select id="role" name="role" class="form-control">
                            <option>Teacher/Coach</option>
                            <option>Schl/Dist Leader</option>
                        </select>
                    </div>
                    <br class="clearBoth" />

                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" value="" placeholder="Email" name="email" id="email" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="school">School</label>
                        <input type="text" value="" placeholder="School" name="school" id="school" class="form-control">
                    </div>
                    <br class="clearBoth" />

                    <div class="form-group">
                        <label for="city">City</label>
                        <input type="text" value="" placeholder="City" name="city" id="city" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="state">State</label>
                        <select name="state" id="state" class="form-control">
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>
                    <br class="clearBoth" />

                    <div class="form-group">
                        <label for="password">Password *</label>
                        <input type="password" value="" placeholder="Password" name="password" id="password" class="form-control" autocomplete=off>
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Confirm Password *</label>
                        <input type="password" value="" placeholder="Confirm Password" name="confirm-password" id="confirm-password" class="form-control" autocomplete=off>
                    </div>
                    <br class="clearBoth" />

                    <div class="form-group checkbox-group">
                        <div class="col-xs-1">
                            <input type="checkbox" id="newsletter" value="1" name="newsletter">
                        </div>
                        <div class="col-xs-11">
                            <div class="checkbox">
                                <label for="newsletter">
                                 Sign up to receive email updates from us.
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group checkbox-group registermode">
                        <div class="col-xs-1">
                            <input type="checkbox" id="terms_reg" value="1" name="terms_reg">
                        </div>
                        <div class="col-xs-11">
                            <div class="checkbox">
                                <label for="terms_reg">
                                 Agree to <a href="/privacy-policy-reg" target="_blank">Privacy Statement</a> &amp; <a href="/terms-of-use-reg" target="_blank">Terms of Use</a>.
                                </label>
                            </div>
                        </div>
                    </div>
                    <br class="clearBoth" />


                    <a class="btn btn-go btn-goforward registermode" id="register-submit" href="#">Register</a>
                    <p class="alreadyTxt registermode">
                        Already registered? <a href="#">Sign in here</a>
                     </p>

                     <a id="profile-submit" class="btn btn-go editmode" href="#">Save Changes</a>
                     <a class="btn btn-go-inverse editmode" href="#">Cancel Edit</a>
                </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Wall Modal -->
<div class="modal fade" id="wallModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <img src="img/coaching/logowhite.png">
            </div>
            <div class="modal-body mainbox">
                <form id="loginform">
                    <div class="form-group">
                        <input type="email" value="" placeholder="Username" name="username" id="wall_username" class="form-control">
                    </div>

                    <div class="form-group">
                        <input type="password" value="" placeholder="Password" name="wall_password" id="wall_password" class="form-control">
                    </div>
                    <a class="btn btn-go btn-goforward btn-wide" id="wall-submit" href="javascript:void(0)">Submit</a>
                </form>
            </div>
            <div class="modal-footer">
                Interested in trying this out? <a href="mailto:info@studentsachieve.net?subject=[Coaching Tool] Request Access" class="requestaccess">Request access.</a>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<!-- Login Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Log In</h4>
                <h4 class="modal-title forgotpass">Forgot Password</h4>
                <h4 class="modal-title forgotsent">We've sent you an email.</h4>
            </div>
            <div class="modal-body mainbox">
                <form id="loginform">
                    <p class="forgotpass">Enter your email and we'll send you a link to reset your password.</p>
                    <div class="form-group">
                        <label for="email" class="forgotpass">Email *</label>
                        <input type="email" value="" placeholder="Email" name="email" id="email" class="form-control">
                    </div>

                    <div class="form-group">
                        <input type="password" value="" placeholder="Password" name="password" id="password" class="form-control">
                        <a href="#" class="forgetpasswordBtn">Forgot Password?</a>
                    </div>
                    <a class="btn btn-go btn-goforward btn-wide" id="login-submit" href="javascript:void(0)">Submit</a>
                </form>
                <p class="forgotsent">You should receive instructions on how to reset your password in the email associated with your Achieve the Core account shortly.</p>
            </div>
            <div class="modal-footer">
                Not a member? <a href="#" class="registerhere">Register Here</a>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Save Modal -->
<div class="modal fade" id="saveModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Sync</h4>
                <p>Save this observation to your account.</p>
            </div>
            <div class="modal-body mainbox">
                <form id="saveform">
                    <div class="form-group">
                        <input type="text" value="" placeholder="Title" name="title" class="form-control" id="saveTitle">
                    </div>

                    <div class="form-group">
                        <textarea id="textarea-notes" class="form-control" placeholder="Description (Optional)"></textarea>
                    </div>
                    <a class="btn btn-go btn-goforward" id="save-submit" href="#">Submit</a>
                </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Export Modal -->
<div class="modal fade" id="exportModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Export</h4>
                <!--<p>Export this observation to your computer.</p>-->
            </div>
            <div class="modal-body mainbox">
                <form id="exportform">
                	<p>Choose the file type you’d like to download by selecting PDF or for an editable document select RTF.</p>
                    <div class="form-group">
                    	<input type="checkbox" value="1" name="omitnotes" id="omitnotes"> Omit Notes<br>
                        <input type="checkbox" value="1" name="omit" id="omit"> Omit Rating
                    </div>
                <div class="pdfBtn btn-go"><img src="img/coaching/icon_whitepdf.png" /></div>
                <div class="rtfBtn btn-go"><img src="img/coaching/icon_whitertf.png" /></div>
                



                    <a class="btn btn-go btn-goforward" data-dismiss="modal" id="export-submit" href="#">Start Download</a>
                </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Print Modal -->
<div class="modal fade" id="printModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Print</h4>
                <p>Print this observation.</p>
            </div>
            <div class="modal-body mainbox">
                <form id="printform">
                    <div class="form-group">
                    	<input type="checkbox" value="1" name="omitnotes" id="print_omitnotes"> Omit Notes<br>
                        <input type="checkbox" value="1" name="omit" id="print_omit"> Omit Rating
                    </div>

                    <a class="btn btn-go btn-goforward btn-wide" id="print-submit" href="#">Print</a>
                </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<!-- Email Modal -->
<div class="modal fade" id="emailModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Email</h4>
                <p>Email this observation.</p>
            </div>
            <div class="modal-body mainbox">
                <form id="emailform">
                    <div class="form-group">
                        <input type="text" value="" placeholder="Email Address" name="title" class="form-control" id="saveTitle">
                    </div>

                    <div class="form-group">
                        <textarea id="textarea-notes" class="form-control" placeholder="Comments"></textarea>
                    </div>
                    
                    <div class="form-group">
                    	<input type="checkbox" value="1" name="omitnotes" id="email_omitnotes"> Omit Notes<br>
                        <input type="checkbox" value="1" name="omit" id="email_omit"> Omit Rating
                    </div>
                    <? if(isset($_SESSION['user'])): ?>
                    <div class="form-group copyme">
                        <input type="checkbox" value="1" name="copyme" id="email_copyme"> Send copy to myself at <?= ht($user['email']) ?>
                    </div>
                    <? else: ?>
                    <div class="form-group copyme">
                        <input type="checkbox" value="1" name="copyme" id="email_copyme"> Send copy to myself
                    </div>
                    <? endif; ?>
                    <a class="btn btn-go btn-goforward" id="email-submit" href="#">Send</a>
                </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<!-- Scale Modal -->
<div class="modal fade" id="scaleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Evidence Observed Scale</h4>
            </div>
            <div class="modal-body mainbox step">
            	<p class="illustrative"></p>
				<ul class="observed">
	            	<li><span class="encircled">1</span> <span class="desc"></span></li>
					<li><span class="encircled">2</span> <span class="desc"></span></li>
					<li><span class="encircled">3</span> <span class="desc"></span></li>
					<li><span class="encircled">4</span> <span class="desc"></span></li>
					<li><span class="encircled">NA</span> <span class="desc">Not Applicable</span></li>
	            </ul>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<!-- Details Modal -->
<div class="modal fade" id="detailsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
                <h4 class="modal-title">Add Details</h4>
                <p>Fill in the information below about the observation you are conducting.  You will be able to return to and edit the information in this section at any time.</p>
            </div>
            <div class="modal-body mainbox clearfix">
	            <hr>
	            <div class="notesleft">
               <input id="details_teacher" class="form-control" type="text" placeholder="Teacher / Instructor">
                <input id="details_text" class="form-control" type="text" placeholder="Text Addressed in this lesson">
                <input id="details_standards" class="form-control" type="hidden" placeholder="Standards addressed in this lesson">
                <!--<textarea id="details_standards" class="form-control" type="text" placeholder="Standards Addressed in this lesson"></textarea>-->
	            <? include 'standards.html'; ?>
      
                <div class="form-group elak2"><select id="ca1sub" class="form-control"><option value="">Select Lesson type</option><option value="reading">Reading/Listening Comprehension</option><option value="foundation">Foundational Skills</option></select></div>
      <hr>
	             <input id="details_subject" class="form-control" type="hidden"  readonly value="ELA / Literacy">
	             <input id="details_daily"  class="form-control" type="hidden"  readonly value="Daily Lesson">
	            </div>
	            <div class="notesright">
	            <input id="details_school" class="form-control" type="text" placeholder="School">
	            	            <!--<input id="details_observer" class="form-control" type="text" placeholder="Observer Name">-->
				<input id="details_class" class="form-control" type="text" placeholder="Grade / Class Period / Section">
				<input id="details_unit" class="form-control" type="text" placeholder="Topic / Lesson / Unit">
	            <div class="form-group dategroup"><select id="details_mm" class="form-control"></select><select id="details_dd" class="form-control"></select><select id="details_yy" class="form-control"></select></div>
	            </div>
              <div class=rigorq>Select the aspect(s) of rigor targeted in the standard(s) addressed in this lesson:</div>
              <div class="rigorslide">
                          	<a class=rigora data-toggle=button>Conceptual understanding</a>
            	<a class=rigora data-toggle=button>Procedural skill and fluency</a>
            	<a class=rigora data-toggle=button>Application</a>
              </div>
              <hr>
                                                <div class="form-group">
                        <input type="checkbox" value="1" name="terms" id="terms"> Agree to <a href="/privacy-policy-reg" target="_blank">Privacy Statement</a> &amp; <a href="/terms-of-use-reg" target="_blank">Terms of Use</a>.
                    </div>
            	<a class="btn btn-go btn-goforward btn-wide disabled" id="details-submit" href="#">Submit</a>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<!-- About Modal -->
<div class="modal fade" id="aboutModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
 <div class="modal-dialog">
     <div class="modal-content">
         <div class="modal-header">
             <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

         </div>
         <div class="modal-body">
           <h2>
                Welcome
            </h2>
            <p>

            </p>
            <p>This guide is a practical tool that teachers, and teacher-trainers, can use (and re-use!) in order to build fluency with the Common Core State Standards (CCSS).

			<p>The guide is designed to support the learning process for teachers, by providing concrete examples of what specific instructional behaviors (or “Core Actions”) look like when they are aligned to the Common Core. The guide accomplishes this by organizing classroom observations against specific CCSS    criteria and Core Actions. Additionally, a rating system aids in monitoring areas of strength and identifying opportunities for improvement. Finally, the guide makes the sharing of feedback quicker, easier and more efficient. 

			<h2>Getting Started</h2>
			
			<p>To get started, simply select the appropriate topic and grade band and the tool will launch. Then follow the steps below. You can save your work throughout, and you can skip or return to each step at any point. 

			 <ul>
			 			<li>Step 1: Take notes in the open text boxes provided. You can do this while observing or use this this space when transferring your notes from paper.
						
						<li>Step 2: Assign indicators to the evidence you gathered.
						
						<li>Step 3: Apply a scale to each of the indicators based on the evidence.
						
						<li>Step 4: Review, edit, save, and share the observation.
			</ul> 
			
			<h2>About achievethecore</h2>
			
<p>achievethecore.org’s digital tools and resources for teachers have been made possible by contributions from teachers across the country as well as through generous support from the Leona M. and Harry B. Helmsley Charitable Trust and the GE Foundation.

 

<p>To learn more about Student Achievement Partners and for access to an array of free resources, please visit us at <a href="/" target="_blank">achievethecore.org</a>.


             <span class="hline"></span>
         </div>
         <div class="modal-footer"></div>
     </div><!-- /.modal-content -->
 </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!--My account page-->
<script id="tpl-myacct" type="text/html">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">{{name}}</h4>
        <h3>{{role}}</h3>
    </div>
    <div class="modal-body">
        <div class="row">
            <div class="col-md-6"><p><b>Subject(s) of interest</b>:<br> {{subject}}</p><p>{{school}}<br />{{#city}}{{city}}, {{state}}{{/city}}{{^city}}{{state}}{{/city}}</p></div>
            <div class="col-md-6">
                <p>{{email}}<br>Password: ******</p>
                <p>
                    {{#optin}}
                        Subscribed to the newsletter
                    {{/optin}}
                    {{^optin}}
                        Not subscribed to the newsletter
                    {{/optin}}
                </p>
            </div>
        </div>
        <div class="row">
            <a style="float:right" class="btn btn-go btn-edit-profile" href="#">Edit Account Details</a>
        </div>
    </div>
</script>

<script id="addres-template" type="text/html">
<div class="added-res" data-resid="{{id}}"><h3 class="doc-icon"><a href="{{link}}" target="_blank">{{title}}</a></h3><p>{{{desc}}}</p><a href="#" class="remove-res"><i class="icon-minus-sign"></i> Remove</a></div>
</script>


<script>
    site = {"root_uri":""};
</script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.1.min.js"><\/script>')</script>
<!--<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.js"></script>-->
<script src="/mi/f=js/bootstrap.min.js,js/main.js,<?=basename(realpath('.'))?>/js/mustache.js,<?=basename(realpath('.'))?>/js/select2.js,<?=basename(realpath('.'))?>/js/strings.js,<?=basename(realpath('.'))?>/js/CSSPlugin.js,<?=basename(realpath('.'))?>/js/EasePack.js,<?=basename(realpath('.'))?>/js/TweenLite.js,<?=basename(realpath('.'))?>/js/coaching.js&<?= filemtime('js/coaching.js') ?>"></script>
<!--<script src="../js/bootstrap.min.js"></script>
<script src="js/mustache.js"></script>
<script src="../js/main.js"></script>
<script src="js/coaching.js"></script>-->

<!--[if IE]>
<script src="js/placeholder.js"></script>
<![endif]-->

<script>
    var _gaq=[['_setAccount','UA-28269694-6']];
     if(window.trackprof) {
     var trnames = ['uid', 'role', 'subject', 'grades'];
     for(var i=1;i<=4;i++)
     _gaq.push(['_setCustomVar', i, trnames[i-1], trackprof[i-1], 2]);
     _gaq.push(['_trackEvent', 'Account', trackprof[4]]);
     }
     _gaq.push(['_trackPageview']);
     (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
     g.src='http://www.google-analytics.com/ga.js';
     s.parentNode.insertBefore(g,s)}(document,'script'));
</script>

<a class="btt btn btn-go" href="#"><i class="icon-chevron-up"></i></a>
<div class="fguide"><div class="close">Close </div><div class="tip-hed">Here's a quick functionality guide.</div><div class="tip-addobs">Click here to type or paste observations</div><div class="tip-notes">Paste, write or edit notes in here</div><div class="tip-addrating">Add a rating by clicking 1-4 or NA</div><div class="tip-tabs">Quickly navigate between Core Actions &amp; Review</div></div>

</body>
</html>