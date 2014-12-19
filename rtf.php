<?

	

	//$conv = iconv("UTF-8", "ISO-8859-1//TRANSLIT", $_REQUEST['tpldata']);
	
	$tpldata = json_decode($_REQUEST['tpldata'], true);
	
	array_walk_recursive($tpldata, function(&$value, $key){
		$value = iconv('UTF-8','ISO-8859-1//TRANSLIT', $value);
	});
	
	extract($tpldata, EXTR_SKIP);
  
  $filename = "Observation_" . date("Y-m-d") . "_" . preg_replace('/[^a-zA-Z]+/','_', $details_teacher);
	header("Content-type: application/rtf");
	header('Content-Disposition: attachment; filename="'.$filename.'.rtf"');
  
	/*


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
	*/
	
  
function html2rtf($html) {
  $html = str_replace('<p>', '', $html);
  $html = str_replace('</p>', '\line ', $html); // newline necessary? 
  $html = str_replace('<strong>', '\b ', $html);
  $html = str_replace('</strong>', '\b0 ', $html);
  $html = str_replace('<b>', '\b ', $html);
  $html = str_replace('</b>', '\b0 ', $html);
  $html = str_replace('<em>', '\i ', $html);
  $html = str_replace('</em>', '\i0 ', $html);
  $html = str_replace('<i>', '\i ', $html);
  $html = str_replace('</i>', '\i0 ', $html);
  $html = str_replace('<span style="text-decoration: underline;">', '\ul ', $html);
  $html = str_replace('</span>', '\ul0 ', $html);
  $html = str_replace('<u>', '\ul ', $html);
  $html = str_replace('</u>', '\ul0 ', $html);
  $html = str_replace('<ul>', '', $html);
  $html = str_replace('</ul>', '\line ', $html);
  $html = str_replace('</li>', '\line ', $html);
  $html = str_replace('<li>', '\bullet ', $html);
  $html = str_replace('&nbsp;', ' ', $html);
  $html = str_replace('<br />', '\line ', $html);
  return $html;
}
	
	

?>{\rtf1\ansi\deff0 {\fonttbl {\f0 \fswiss Arial;}}
<? /* All colors referenced go here - start with black, white, then green etc. */ ?>
{\colortbl;\red0\green0\blue0;\red255\green255\blue255;\red40\green105\blue73;}

<? /* Single cell table for the green background. */ ?>
\trowd
<? /* 3 is the background color, 2 is the foreground color */ ?>
\clshdng10000\clcbpat3\clcfpat3\cf2
<? /* 8640 is the width of cell 1. the units are 1440 twips = 1 inch. we want 6 inches for the full page */ ?>
\cellx8640

<? /* fs50 = font size (50 * 0.5) = 25px */ ?>
\intbl \fs50 \line CCSS Instructional Practice Guide \line \cell

<? /* \row \pard ends the table */ ?>
\row
\pard

<? /* Three cell table - repeat as needed! */ ?>
\trowd
\cf1
\cellx2880
\cellx5760
\cellx8640

\intbl \fs30 <?= $subject ?> \line \fs24 Grade <?= $grades ?> | Daily Lesson \cell
\intbl \cell
\intbl 
<?= $details_class ? ('Grade/Course: ' . $details_class) : ''  ?>\line
<?= $details_period ?>\line
<?= $details_teacher ?>\line
<?= $details_observer ? ('Observer: ' . $details_observer) : '' ?>\line
<?= $details_unit  ? ('Lesson: ' . $details_unit) : '' ?>\line
<?= $details_standards ? ('Standards Addressed: ' . $details_standards) : ''  ?>\line
<?= $details_text ? ('Text Addressed: ' . $details_text) : ''  ?>\line
<?= /* $rigors ? ('Rigor: ' . $rigors) : */ ''  ?>\line
\cell
\row
\pard
<? /* onto the main body */ ?>
\line
\line
<? foreach($actions as $action): ?>
\fs30 Core Action <?= $action['num2'] ?> \line
<? if($action['sub']): ?>\fs26 for <?= $action['sub'] ?> \line<? endif; ?>
\fs24 <?= $action['text'] ?> \line
\line
<? foreach($action['indicators'] as $indicator): ?>
\b Indicator <?= $indicator['alpha'] ?> \b0 \line
<?= $indicator['text'] ?>\line
\line
<? if($indicator['rigor1']): ?>
\b Observations \b0 \line
<? foreach($indicator['notes'] as $line): ?>
\fs20 <? echo html2rtf($line['line']) /*. '\line'*/ . "\n"; ?>
\fs24 \line
<? endforeach; ?>

<? if($indicator['rigor1']): ?>
\b Aspects of rigor targeted in the standard(s) addressed in this lesson: \b0 \line
<? foreach($indicator['rigor1'] as $r): ?>
- <?= $r ?> \line
<? endforeach; ?>
<? endif; ?>
<? if($indicator['rigor2']): ?>
\b Aspects of rigor targeted in this lesson: \b0 \line
<? foreach($indicator['rigor2'] as $r): ?>
- <?= $r ?> \line
<? endforeach; ?>
<? endif; ?>

<? /* here's my fake HR - empty single cell table at font size 1 pixel */ ?>
\trowd
\fs2
\cellx8640
\intbl \cell\row
\pard
\fs24


<? else: ?>
\b Observations \b0 \line
\fs20 <? foreach($indicator['notes'] as $line) { echo html2rtf($line['line']) /*. '\line'*/ . "\n"; } ?>
\fs24 \line
<? endif; ?>

<? if(isset($_REQUEST['omit']) && $_REQUEST['omit']==1): ?>
<? else: ?>
\b Rating: \b0\line
\fs26 \cf3 <?= $indicator['obs'] ?> 
\fs24 \cf1 <?= $indicator['obsdesc'] ?> \line
<? endif; ?>
\line

<? /* here's my fake HR - empty single cell table at font size 1 pixel */ ?>
\trowd
\fs2
\cellx8640
\intbl \cell\row
\pard
\fs24

<? endforeach; ?>
<? endforeach; ?>

<? if(isset($_REQUEST['omitnotes']) && $_REQUEST['omitnotes']==1): ?>
<? else: ?>
<? if($actions[0]['notes'][0]): ?>
\fs30 Your Notes \line
\fs20  \line
<? foreach($actions[0]['notes'] as $line): ?>
<?= html2rtf($line['line']) ?> \line 
<? endforeach; ?>
<? endif; ?>
<? endif; ?>


<? if(count($suggested_data)): ?>
\fs30 Suggested Resources \line
\fs24 The following resources have been recommended to you by the person who conducted this observation. Visit achievethecore.org for these and other Common Core-aligned materials. \line
\line
<? foreach($suggested_data as $sug): ?>
\b <?= $sug['link'] ?> \b0\line 
<?= $sug['desc'] ?>\line \line 
<? endforeach; ?>
<? endif; ?>

}