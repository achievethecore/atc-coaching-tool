<?php

require_once('tcpdf/config/lang/eng.php');
require_once('tcpdf/tcpdf.php');

require 'Mustache/Autoloader.php';
Mustache_Autoloader::register();


$tpldata = json_decode($_REQUEST['tpldata'], true);

$m = new Mustache_Engine;
$html = $m->render($tplSearches, $tpldata);

	// the dynamic content - maybe set these in another file and then include rtf.php 
	$subject = 'English Language Arts';
	$grades = 'Grades 3-5';
	
	$details = 'Daily Lesson';
	
	$actions = array(
		array(
		'text' => 'Focus each lesson on...',
		'indicators' => array(
			'A majority of read aloud time is spent...',
			'The text(s) are at or above the complexity level expected for the grade and time in the school year.',
			'A majority of read aloud time is spent...',
		)
		),
		array(
		'text' => 'Employ questions and tasks that',
		'indicators' => array(
			'A majority of read aloud time is spent...',
			'The text(s) are at or above the complexity level expected for the grade and time in the school year.',
			'A majority of read aloud time is spent...',
		)
		),
	);

// Extend the TCPDF class to create custom Header and Footer
class MYPDF extends TCPDF {

	public $cover;
	
	public $m;
	public $tpldata;
	
	public $headertitle = '';
	public $firstpage = 1;

	//Page header
	public function Header() {
		/*
		$pageno = 'Page '.$this->getAliasNumPage().' of '.$this->getAliasNbPages();
		
		$html = <<<EOD

	
EOD;
		
		//$pdf->SetFillColor(255,255,255);
		//$pdf->Rect(26,60, 160,40, 'B');
		

		$html = $this->m->render($html, $this->tpldata);

		
		$this->writeHTMLCell($w=0, $h=0, $x=16, $y='', $css . $html, $border=0, $ln=1, $fill=0, $reseth=true, $align='', $autopadding=true);
		
		$this->Ln($h=410);
		$this->Ln($h=10);
		$this->Ln($h=10);
		
	
	
		//$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().' of '.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
		*/
	}


	// Page footer
	public function Footer() {
		/*if($this->getPage() == 1) return;
		if($this->cover) return;
		// Position at 15 mm from bottom
		$this->SetY(-15);
		// Set font
		$this->SetFont('helvetica', '', 8);
		
		$this->firstpage = 0; // just always print it...
		if($this->firstpage) {
			$this->firstpage--;
		}
		elseif($this->headertitle) {
			//$this->Ln(2);
			$this->Cell(0, 10, $this->headertitle, 0, false, 'C', 0, '', 0, false, 'T', 'M');
		}
		
		// Page number
		$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
		*/
	}
}

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'LETTER', true, 'UTF-8', false);

$pdf->m = new Mustache_Engine;

// set document information
$pdf->SetCreator(PDF_CREATOR);

// set default header data
$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, 12 /*PDF_MARGIN_TOP*/, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(0/*PDF_MARGIN_HEADER*/);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

//set image scale factor 72dpi -> 2.83 pixels per millimeter
$pdf->setImageScale(1.0/2.83);

//set some language-dependent strings
$pdf->setLanguageArray($l);


$pdf->tpldata = $tpldata; 

// ---------------------------------------------------------

$css = <<<EOHTML
<style>
.articletitle {
	font-size: 25px;

	font-weight: bold;
	line-height: 1.2;
}
.articlesubhead {
	font-size: 14px;
	width: 500px;
	line-height: 1.1;
}

.encircled { font-size: 10px; color: #25a65a; }



</style>
EOHTML;

// add a page
$pdf->AddPage();

$pdf->SetFont('freesans', '', 30);

$html = <<<EOD

EOD;

//$pdf->SetFillColor(255,255,255);
//$pdf->Rect(26,60, 160,40, 'B');

//$pdf->writeHTMLCell($w=0, $h=0, $x=16, $y='', $css . $html, $border=0, $ln=1, $fill=0, $reseth=true, $align='', $autopadding=true);

// set font
$pdf->SetFont('freesans', '', 10);

///// ARTICLE LOOP
//foreach($actions as $action) {

$html = <<<EOD
		<style>
		.header { background-color: #256633; color: white; font-size: 30px; }
		.subject { font-size: 25px; }
		.subright p { text-align: right; }
		.remove-res { display: none; }
		</style>
		<div class="header"><br> CCSS Instructional Practice Guide<br> </div>
		<table><tr><td>
		<div class="date">{{date}}</div>
		<div class="subject">{{subject}}
		</div>
		<div class="grades">Grades {{grades}} | Daily Lesson</div>
		</td><td class="subright"><p>$pageno</p>
						{{details_class}}<br>
						{{#details_grade}}Grade/Course: {{details_grade}}<br>{{/details_grade}}
						{{details_period}}<br>
						{{details_teacher}}<br>
						{{#details_observer}}Observer: {{details_observer}}<br>{{/details_observer}}
						{{#details_unit}}Lesson: {{details_unit}}<br>{{/details_unit}}
						{{#details_standards}}Standards Addressed: {{details_standards}}<br>{{/details_standards}}
						{{#details_text}}Text Addressed: {{details_text}}<br>{{/details_text}}
						{{#rigors}}Rigor Targeted: {{rigors}}<br>{{/rigors}}
		</td></tr></table>
		
{{#actions}}
<div class="action">

			<div class="articletitle">Core Action {{num}}</span>
			<div class="articlesubhead">{{text}}</div>
			
	            {{#indicators}}
	            <div>
	            <h4>Indicator {{alpha}}</h4>
	            <p>{{text}}
	            <h4>Observations</h4>
	            <div class="notes">{{#notes}}{{line}}<br>{{/notes}}</div>
	            {{#rigor1.0}}
	            <h4>Aspects of rigor targeted in the standard(s) addressed in this lesson:</h4>
	            	<ul class=rigor>{{#rigor1}}<li>{{.}}</li>{{/rigor1}}</ul>
	            {{/rigor1.0}}
	            {{#rigor2.0}}
	            <h4>Aspects of rigor targeted in this lesson:</h4>
	            	<ul class=rigor>{{#rigor2}}<li>{{.}}</li>{{/rigor2}}</ul>
	            {{/rigor2.0}}
	            {{^omit}}
	            <h4>Rating:</h4>
	            <ul class="observed">
	            	<li><span class="encircled active">{{obs}}</span> &nbsp;&nbsp;<span class="desc">{{obsdesc}}</span></li>
	            </ul>
	            {{/omit}}
	            </div>

	            <hr>
	            <br>
	            {{/indicators}}
</div>
{{/actions}}
{{#actions.0.notes.0}}
<div class="action">
<div class="articletitle">Your Notes</span>
<p>{{#actions.0.notes}}{{{line}}}{{/actions.0.notes}}</p>
</div>
</div>
{{/actions.0.notes.0}}
{{#suggested}}
				<h3>Suggested Resources</h3>
				<p>The following resources have been recommended to you by the person who conducted this observation. Visit achievethecore.org for these and other Common Core-aligned materials.</p>
				<div class="added-container clearfix">{{{suggested}}}</div>
{{/suggested}}
EOD;

if(isset($_REQUEST['omit']) && $_REQUEST['omit']==1)
	$tpldata['omit'] = 1;


$tpldata['suggested'] = preg_replace('/<a.*?href="(http.*?)".*?' . '>(.*?)<.a>/', '$1', $tpldata['suggested']);

$html = $m->render($html, $tpldata);


$pdf->writeHTMLCell($w=0, $h=0, $x='', $y='', $css . $html, $border=0, $ln=1, $fill=0, $reseth=true, $align='', $autopadding=true);

//}

//Close and output PDF document
$filename = "Observation_" . date("Y-m-d") . "_" . preg_replace('/[^a-zA-Z]+/','_', $tpldata['details_teacher']);
$pdf->Output($filename . '.pdf', 'I');

//============================================================+
// END OF FILE                                                
//============================================================+
