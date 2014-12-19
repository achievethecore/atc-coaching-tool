/* https://github.com/christianbach/tablesorter */
(function($){$.extend({tablesorter:new
function(){var parsers=[],widgets=[];this.defaults={cssHeader:"header",cssAsc:"headerSortUp",cssDesc:"headerSortDown",cssChildRow:"expand-child",sortInitialOrder:"asc",sortMultiSortKey:"shiftKey",sortForce:null,sortAppend:null,sortLocaleCompare:true,textExtraction:"simple",parsers:{},widgets:[],widgetZebra:{css:["even","odd"]},headers:{},widthFixed:false,cancelSelection:true,sortList:[],headerList:[],dateFormat:"us",decimal:'/\.|\,/g',onRenderHeader:null,selectorHeaders:'thead th',debug:false};function benchmark(s,d){log(s+","+(new Date().getTime()-d.getTime())+"ms");}this.benchmark=benchmark;function log(s){if(typeof console!="undefined"&&typeof console.debug!="undefined"){console.log(s);}else{alert(s);}}function buildParserCache(table,$headers){if(table.config.debug){var parsersDebug="";}if(table.tBodies.length==0)return;var rows=table.tBodies[0].rows;if(rows[0]){var list=[],cells=rows[0].cells,l=cells.length;for(var i=0;i<l;i++){var p=false;if($.metadata&&($($headers[i]).metadata()&&$($headers[i]).metadata().sorter)){p=getParserById($($headers[i]).metadata().sorter);}else if((table.config.headers[i]&&table.config.headers[i].sorter)){p=getParserById(table.config.headers[i].sorter);}if(!p){p=detectParserForColumn(table,rows,-1,i);}if(table.config.debug){parsersDebug+="column:"+i+" parser:"+p.id+"\n";}list.push(p);}}if(table.config.debug){log(parsersDebug);}return list;};function detectParserForColumn(table,rows,rowIndex,cellIndex){var l=parsers.length,node=false,nodeValue=false,keepLooking=true;while(nodeValue==''&&keepLooking){rowIndex++;if(rows[rowIndex]){node=getNodeFromRowAndCellIndex(rows,rowIndex,cellIndex);nodeValue=trimAndGetNodeText(table.config,node);if(table.config.debug){log('Checking if value was empty on row:'+rowIndex);}}else{keepLooking=false;}}for(var i=1;i<l;i++){if(parsers[i].is(nodeValue,table,node)){return parsers[i];}}return parsers[0];}function getNodeFromRowAndCellIndex(rows,rowIndex,cellIndex){return rows[rowIndex].cells[cellIndex];}function trimAndGetNodeText(config,node){return $.trim(getElementText(config,node));}function getParserById(name){var l=parsers.length;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==name.toLowerCase()){return parsers[i];}}return false;}function buildCache(table){if(table.config.debug){var cacheTime=new Date();}var totalRows=(table.tBodies[0]&&table.tBodies[0].rows.length)||0,totalCells=(table.tBodies[0].rows[0]&&table.tBodies[0].rows[0].cells.length)||0,parsers=table.config.parsers,cache={row:[],normalized:[]};for(var i=0;i<totalRows;++i){var c=$(table.tBodies[0].rows[i]),cols=[];if(c.hasClass(table.config.cssChildRow)){cache.row[cache.row.length-1]=cache.row[cache.row.length-1].add(c);continue;}cache.row.push(c);for(var j=0;j<totalCells;++j){cols.push(parsers[j].format(getElementText(table.config,c[0].cells[j]),table,c[0].cells[j]));}cols.push(cache.normalized.length);cache.normalized.push(cols);cols=null;};if(table.config.debug){benchmark("Building cache for "+totalRows+" rows:",cacheTime);}return cache;};function getElementText(config,node){var text="";if(!node)return"";if(!config.supportsTextContent)config.supportsTextContent=node.textContent||false;if(config.textExtraction=="simple"){if(config.supportsTextContent){text=node.textContent;}else{if(node.childNodes[0]&&node.childNodes[0].hasChildNodes()){text=node.childNodes[0].innerHTML;}else{text=node.innerHTML;}}}else{if(typeof(config.textExtraction)=="function"){text=config.textExtraction(node);}else{text=$(node).text();}}return text;}function appendToTable(table,cache){if(table.config.debug){var appendTime=new Date()}var c=cache,r=c.row,n=c.normalized,totalRows=n.length,checkCell=(n[0].length-1),tableBody=$(table.tBodies[0]),rows=[];for(var i=0;i<totalRows;i++){var pos=n[i][checkCell];rows.push(r[pos]);if(!table.config.appender){var l=r[pos].length;for(var j=0;j<l;j++){tableBody[0].appendChild(r[pos][j]);}}}if(table.config.appender){table.config.appender(table,rows);}rows=null;if(table.config.debug){benchmark("Rebuilt table:",appendTime);}applyWidget(table);setTimeout(function(){$(table).trigger("sortEnd");},0);};function buildHeaders(table){if(table.config.debug){var time=new Date();}var meta=($.metadata)?true:false;var header_index=computeTableHeaderCellIndexes(table);$tableHeaders=$(table.config.selectorHeaders,table).each(function(index){this.column=header_index[this.parentNode.rowIndex+"-"+this.cellIndex];this.order=formatSortingOrder(table.config.sortInitialOrder);this.count=this.order;if(checkHeaderMetadata(this)||checkHeaderOptions(table,index))this.sortDisabled=true;if(checkHeaderOptionsSortingLocked(table,index))this.order=this.lockedOrder=checkHeaderOptionsSortingLocked(table,index);if(!this.sortDisabled){var $th=$(this).addClass(table.config.cssHeader);if(table.config.onRenderHeader)table.config.onRenderHeader.apply($th);}table.config.headerList[index]=this;});if(table.config.debug){benchmark("Built headers:",time);log($tableHeaders);}return $tableHeaders;};function computeTableHeaderCellIndexes(t){var matrix=[];var lookup={};var thead=t.getElementsByTagName('THEAD')[0];var trs=thead.getElementsByTagName('TR');for(var i=0;i<trs.length;i++){var cells=trs[i].cells;for(var j=0;j<cells.length;j++){var c=cells[j];var rowIndex=c.parentNode.rowIndex;var cellId=rowIndex+"-"+c.cellIndex;var rowSpan=c.rowSpan||1;var colSpan=c.colSpan||1
var firstAvailCol;if(typeof(matrix[rowIndex])=="undefined"){matrix[rowIndex]=[];}for(var k=0;k<matrix[rowIndex].length+1;k++){if(typeof(matrix[rowIndex][k])=="undefined"){firstAvailCol=k;break;}}lookup[cellId]=firstAvailCol;for(var k=rowIndex;k<rowIndex+rowSpan;k++){if(typeof(matrix[k])=="undefined"){matrix[k]=[];}var matrixrow=matrix[k];for(var l=firstAvailCol;l<firstAvailCol+colSpan;l++){matrixrow[l]="x";}}}}return lookup;}function checkCellColSpan(table,rows,row){var arr=[],r=table.tHead.rows,c=r[row].cells;for(var i=0;i<c.length;i++){var cell=c[i];if(cell.colSpan>1){arr=arr.concat(checkCellColSpan(table,headerArr,row++));}else{if(table.tHead.length==1||(cell.rowSpan>1||!r[row+1])){arr.push(cell);}}}return arr;};function checkHeaderMetadata(cell){if(($.metadata)&&($(cell).metadata().sorter===false)){return true;};return false;}function checkHeaderOptions(table,i){if((table.config.headers[i])&&(table.config.headers[i].sorter===false)){return true;};return false;}function checkHeaderOptionsSortingLocked(table,i){if((table.config.headers[i])&&(table.config.headers[i].lockedOrder))return table.config.headers[i].lockedOrder;return false;}function applyWidget(table){var c=table.config.widgets;var l=c.length;for(var i=0;i<l;i++){getWidgetById(c[i]).format(table);}}function getWidgetById(name){var l=widgets.length;for(var i=0;i<l;i++){if(widgets[i].id.toLowerCase()==name.toLowerCase()){return widgets[i];}}};function formatSortingOrder(v){if(typeof(v)!="Number"){return(v.toLowerCase()=="desc")?1:0;}else{return(v==1)?1:0;}}function isValueInArray(v,a){var l=a.length;for(var i=0;i<l;i++){if(a[i][0]==v){return true;}}return false;}function setHeadersCss(table,$headers,list,css){$headers.removeClass(css[0]).removeClass(css[1]);var h=[];$headers.each(function(offset){if(!this.sortDisabled){h[this.column]=$(this);}});var l=list.length;for(var i=0;i<l;i++){h[list[i][0]].addClass(css[list[i][1]]);}}function fixColumnWidth(table,$headers){var c=table.config;if(c.widthFixed){var colgroup=$('<colgroup>');$("tr:first td",table.tBodies[0]).each(function(){colgroup.append($('<col>').css('width',$(this).width()));});$(table).prepend(colgroup);};}function updateHeaderSortCount(table,sortList){var c=table.config,l=sortList.length;for(var i=0;i<l;i++){var s=sortList[i],o=c.headerList[s[0]];o.count=s[1];o.count++;}}function multisort(table,sortList,cache){if(table.config.debug){var sortTime=new Date();}var dynamicExp="var sortWrapper = function(a,b) {",l=sortList.length;for(var i=0;i<l;i++){var c=sortList[i][0];var order=sortList[i][1];var s=(table.config.parsers[c].type=="text")?((order==0)?makeSortFunction("text","asc",c):makeSortFunction("text","desc",c)):((order==0)?makeSortFunction("numeric","asc",c):makeSortFunction("numeric","desc",c));var e="e"+i;dynamicExp+="var "+e+" = "+s;dynamicExp+="if("+e+") { return "+e+"; } ";dynamicExp+="else { ";}var orgOrderCol=cache.normalized[0].length-1;dynamicExp+="return a["+orgOrderCol+"]-b["+orgOrderCol+"];";for(var i=0;i<l;i++){dynamicExp+="}; ";}dynamicExp+="return 0; ";dynamicExp+="}; ";if(table.config.debug){benchmark("Evaling expression:"+dynamicExp,new Date());}eval(dynamicExp);cache.normalized.sort(sortWrapper);if(table.config.debug){benchmark("Sorting on "+sortList.toString()+" and dir "+order+" time:",sortTime);}return cache;};function makeSortFunction(type,direction,index){var a="a["+index+"]",b="b["+index+"]";if(type=='text'&&direction=='asc'){return"("+a+" == "+b+" ? 0 : ("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : ("+a+" < "+b+") ? -1 : 1 )));";}else if(type=='text'&&direction=='desc'){return"("+a+" == "+b+" ? 0 : ("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : ("+b+" < "+a+") ? -1 : 1 )));";}else if(type=='numeric'&&direction=='asc'){return"("+a+" === null && "+b+" === null) ? 0 :("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : "+a+" - "+b+"));";}else if(type=='numeric'&&direction=='desc'){return"("+a+" === null && "+b+" === null) ? 0 :("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : "+b+" - "+a+"));";}};function makeSortText(i){return"((a["+i+"] < b["+i+"]) ? -1 : ((a["+i+"] > b["+i+"]) ? 1 : 0));";};function makeSortTextDesc(i){return"((b["+i+"] < a["+i+"]) ? -1 : ((b["+i+"] > a["+i+"]) ? 1 : 0));";};function makeSortNumeric(i){return"a["+i+"]-b["+i+"];";};function makeSortNumericDesc(i){return"b["+i+"]-a["+i+"];";};function sortText(a,b){if(table.config.sortLocaleCompare)return a.localeCompare(b);return((a<b)?-1:((a>b)?1:0));};function sortTextDesc(a,b){if(table.config.sortLocaleCompare)return b.localeCompare(a);return((b<a)?-1:((b>a)?1:0));};function sortNumeric(a,b){return a-b;};function sortNumericDesc(a,b){return b-a;};function getCachedSortType(parsers,i){return parsers[i].type;};this.construct=function(settings){return this.each(function(){if(!this.tHead||!this.tBodies)return;var $this,$document,$headers,cache,config,shiftDown=0,sortOrder;this.config={};config=$.extend(this.config,$.tablesorter.defaults,settings);$this=$(this);$.data(this,"tablesorter",config);$headers=buildHeaders(this);this.config.parsers=buildParserCache(this,$headers);cache=buildCache(this);var sortCSS=[config.cssDesc,config.cssAsc];fixColumnWidth(this);$headers.click(function(e){var totalRows=($this[0].tBodies[0]&&$this[0].tBodies[0].rows.length)||0;if(!this.sortDisabled&&totalRows>0){$this.trigger("sortStart");var $cell=$(this);var i=this.column;this.order=this.count++%2;if(this.lockedOrder)this.order=this.lockedOrder;if(!e[config.sortMultiSortKey]){config.sortList=[];if(config.sortForce!=null){var a=config.sortForce;for(var j=0;j<a.length;j++){if(a[j][0]!=i){config.sortList.push(a[j]);}}}config.sortList.push([i,this.order]);}else{if(isValueInArray(i,config.sortList)){for(var j=0;j<config.sortList.length;j++){var s=config.sortList[j],o=config.headerList[s[0]];if(s[0]==i){o.count=s[1];o.count++;s[1]=o.count%2;}}}else{config.sortList.push([i,this.order]);}};setTimeout(function(){setHeadersCss($this[0],$headers,config.sortList,sortCSS);appendToTable($this[0],multisort($this[0],config.sortList,cache));},1);return false;}}).mousedown(function(){if(config.cancelSelection){this.onselectstart=function(){return false};return false;}});$this.bind("update",function(){var me=this;setTimeout(function(){me.config.parsers=buildParserCache(me,$headers);cache=buildCache(me);},1);}).bind("updateCell",function(e,cell){var config=this.config;var pos=[(cell.parentNode.rowIndex-1),cell.cellIndex];cache.normalized[pos[0]][pos[1]]=config.parsers[pos[1]].format(getElementText(config,cell),cell);}).bind("sorton",function(e,list){$(this).trigger("sortStart");config.sortList=list;var sortList=config.sortList;updateHeaderSortCount(this,sortList);setHeadersCss(this,$headers,sortList,sortCSS);appendToTable(this,multisort(this,sortList,cache));}).bind("appendCache",function(){appendToTable(this,cache);}).bind("applyWidgetId",function(e,id){getWidgetById(id).format(this);}).bind("applyWidgets",function(){applyWidget(this);});if($.metadata&&($(this).metadata()&&$(this).metadata().sortlist)){config.sortList=$(this).metadata().sortlist;}if(config.sortList.length>0){$this.trigger("sorton",[config.sortList]);}applyWidget(this);});};this.addParser=function(parser){var l=parsers.length,a=true;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==parser.id.toLowerCase()){a=false;}}if(a){parsers.push(parser);};};this.addWidget=function(widget){widgets.push(widget);};this.formatFloat=function(s){var i=parseFloat(s);return(isNaN(i))?0:i;};this.formatInt=function(s){var i=parseInt(s);return(isNaN(i))?0:i;};this.isDigit=function(s,config){return/^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g,'')));};this.clearTableBody=function(table){if($.browser.msie){function empty(){while(this.firstChild)this.removeChild(this.firstChild);}empty.apply(table.tBodies[0]);}else{table.tBodies[0].innerHTML="";}};}});$.fn.extend({tablesorter:$.tablesorter.construct});var ts=$.tablesorter;ts.addParser({id:"text",is:function(s){return true;},format:function(s){return $.trim(s.toLocaleLowerCase());},type:"text"});ts.addParser({id:"digit",is:function(s,table){var c=table.config;return $.tablesorter.isDigit(s,c);},format:function(s){return $.tablesorter.formatFloat(s);},type:"numeric"});ts.addParser({id:"currency",is:function(s){return/^[£$€?.]/.test(s);},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/[£$€]/g),""));},type:"numeric"});ts.addParser({id:"ipAddress",is:function(s){return/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);},format:function(s){var a=s.split("."),r="",l=a.length;for(var i=0;i<l;i++){var item=a[i];if(item.length==2){r+="0"+item;}else{r+=item;}}return $.tablesorter.formatFloat(r);},type:"numeric"});ts.addParser({id:"url",is:function(s){return/^(https?|ftp|file):\/\/$/.test(s);},format:function(s){return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//),''));},type:"text"});ts.addParser({id:"isoDate",is:function(s){return/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);},format:function(s){return $.tablesorter.formatFloat((s!="")?new Date(s.replace(new RegExp(/-/g),"/")).getTime():"0");},type:"numeric"});ts.addParser({id:"percent",is:function(s){return/\%$/.test($.trim(s));},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g),""));},type:"numeric"});ts.addParser({id:"usLongDate",is:function(s){return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));},format:function(s){return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"shortDate",is:function(s){return/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);},format:function(s,table){var c=table.config;s=s.replace(/\-/g,"/");if(c.dateFormat=="us"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$1/$2");}else if (c.dateFormat == "pt") {s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");} else if(c.dateFormat=="uk"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$2/$1");}else if(c.dateFormat=="dd/mm/yy"||c.dateFormat=="dd-mm-yy"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/,"$1/$2/$3");}return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"time",is:function(s){return/^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);},format:function(s){return $.tablesorter.formatFloat(new Date("2000/01/01 "+s).getTime());},type:"numeric"});ts.addParser({id:"metadata",is:function(s){return false;},format:function(s,table,cell){var c=table.config,p=(!c.parserMetadataName)?'sortValue':c.parserMetadataName;return $(cell).metadata()[p];},type:"numeric"});ts.addWidget({id:"zebra",format:function(table){if(table.config.debug){var time=new Date();}var $tr,row=-1,odd;$("tr:visible",table.tBodies[0]).each(function(i){$tr=$(this);if(!$tr.hasClass(table.config.cssChildRow))row++;odd=(row%2==0);$tr.removeClass(table.config.widgetZebra.css[odd?0:1]).addClass(table.config.widgetZebra.css[odd?1:0])});if(table.config.debug){$.tablesorter.benchmark("Applying Zebra widget",time);}}});})(jQuery);


/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function($) {
    
    $.belowthefold = function(element, settings) {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var top = $(window).scrollTop();
        return top >= $(element).offset().top + $(element).height() - settings.threshold;
    };
    
    $.rightofscreen = function(element, settings) {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= $(element).offset().left - settings.threshold;
    };
    
    $.leftofscreen = function(element, settings) {
        var left = $(window).scrollLeft();
        return left >= $(element).offset().left + $(element).width() - settings.threshold;
    };
    
    $.inviewport = function(element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };
    
    $.extend($.expr[':'], {
        "below-the-fold": function(a, i, m) {
            return $.belowthefold(a, {threshold : 0});
        },
        "above-the-top": function(a, i, m) {
            return $.abovethetop(a, {threshold : 0});
        },
        "left-of-screen": function(a, i, m) {
            return $.leftofscreen(a, {threshold : 0});
        },
        "right-of-screen": function(a, i, m) {
            return $.rightofscreen(a, {threshold : 0});
        },
        "in-viewport": function(a, i, m) {
            return $.inviewport(a, {threshold : 0});
        }
    });

    
})(jQuery);


if (!Array.prototype.map)
{
  Array.prototype.map = function(fun /*, thisArg */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = new Array(len);
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      // NOTE: Absolute correctness would demand Object.defineProperty
      //       be used.  But this method is fairly new, and failure is
      //       possible only if Object.prototype or Array.prototype
      //       has a property |i| (very unlikely), so use a less-correct
      //       but more portable alternative.
      if (i in t)
        res[i] = fun.call(thisArg, t[i], i, t);
    }

    return res;
  };
}


if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

var settings = {
    defaultTextareaTxt:"Insert text",
    activeClass:"active"
};


var loggingIn = false;

var subject_name = [
	'',
	'ELA / Literacy',
	'Mathematics',
	'Social Studies / History',
	'Science / Technical Studies'
];

var gradeband_name = [
[],
[	'',
	'K-2',
	'3-12',
	''
],
[	'',
	'K-8',
	'HS'
],
[	'',
	'',
	'',
	'6-12'
],
[	'',
	'',
	'',
	'6-12'
]
];


var coreActions_ELA = [
	'Focus each lesson on a high quality text (or multiple texts).',	
	'Employ questions and tasks that are text dependent and text specific.',
	'Provide all students with opportunities to engage in the work of the lesson.',
	'Ensure that instruction and materials explicitly and systematically provide all students with the opportunity to master foundational skills.',
	'Provide all students with opportunities to engage in the work of the lesson.'
];

var coreActions_M = [
	'Ensure the work of the lesson reflects the shifts required by the CCSS for Mathematics.',
	'Employ instructional practices that allow all students to master the content of the lesson.',
	'Provide all students with opportunities to exhibit mathematical practices in connection with the content of the lesson.'
];

var corestructure = [
	// ELA / Literacy
	[

		// K - 2
		[ // CA1
			[
			'A majority of read aloud time is spent reading, listening to, speaking, or writing about text(s).',
			'The text(s) are at or above the complexity level expected for the grade and time in the school year.',
			'The text(s) exhibit exceptional craft and thought and/or provide useful information; where appropriate, the texts are richly illustrated.'
			],
		  // CA2
			[
			'Questions and tasks address the text by attending to its particular structure, concepts, ideas, events and details.',
			'Questions and tasks require students to use details from text to demonstrate understanding and to support their ideas about the text. These ideas are expressed through both written and spoken responses.',
			'Questions and tasks attend to the academic language (i.e., vocabulary and syntax) in the text.',
			'Questions are sequenced to guide students in delving deeper into text and graphics. These inferences should relate to key ideas of the text.'
			],
		 // CA3
			[
			'The teacher uses strategies to keep all students persevering with challenging tasks.',
			'The teacher creates the conditions for student conversations and plans tasks where students are encouraged to talk about each other’s thinking.',
			'The teacher acts on knowledge of individual students to promote progress toward independence in grade-level literacy tasks.'
			],
		 // CA4
			[
			'The foundational skills being taught are aligned to the standards for this grade.',
			'Instruction and materials address foundational skills by attending to phonological awareness, concepts of print, letter recognition, phonetic patterns and word structure. (Note: not all elements will be addressed in each lesson.)',
			'The teacher focuses the majority of student reading time on reading, listening to, speaking or writing about text.',
			'Instruction and materials provide ample opportunity for students of all abilities to practice newly acquired foundational skills.',
			'Whenever possible, instruction and materials connect acquisition of foundation skills to making meaning from reading.',
			'Instruction and materials are responsive to students’ understanding of the skills being taught through careful monitoring of student progress.'
			],
		 // CA5
			[
			'The teacher uses strategies to keep all students persevering with challenging tasks.',
			'The teacher orchestrates conversations and plans tasks in which students talk about each other’s thinking.'
			]
		],
		
		// 3 - 5
		[ // CA1
			[
			'A majority of read aloud time is spent reading, listening to, speaking, or writing about text(s).',
			'The text(s) are at or above the complexity level expected for the grade and time in the school year.',
			'The text(s) exhibit exceptional craft and thought and/or provide useful information.'
			],
		  // CA2
			[
			'Questions and tasks address the text by attending to its particular structure, concepts, ideas, events and details.',
			'Questions and tasks require students to use details from text to demonstrate understanding and to support their ideas about the text. These ideas are expressed through both written and spoken responses.',
			'Questions and tasks attend to the academic language (i.e., vocabulary and syntax) in the text.',
			'Questions are sequenced to guide students in delving deeper into text and graphics. These inferences should relate to key ideas of the text.'
			],
		 // CA3
			[
			'The teacher provides the conditions for all students to focus on text.',
			'The teacher expects evidence and precision from students and probes students’ answers accordingly.',
			'The teacher creates the conditions for student conversations and plans tasks where students are encouraged to talk about each other’s thinking.',
			'The teacher acts on knowledge of individual students to promote progress toward independence in grade-level literacy tasks.',
			'When appropriate, the teacher explicitly and systematically attends to strengthening students’ reading foundation skills.'
			]
		],
		
		// 6 - 12
		[ // CA1
			[
			'A majority of the lesson is spent reading, speaking, or writing about text(s).',
			'The text(s) are at or above the complexity level expected for the grade and time in the school year.',
			'The text(s) exhibit exceptional craft and thought and/or provide useful information.'
			],
		  // CA2
			[
			'Questions and tasks address the text by attending to its particular structure(s), concepts, ideas, and details.',
			'Questions and tasks require students to cite evidence from the texts to support analysis, inferences, and claims.',
			'Questions and tasks attend to the academic language (i.e., vocabulary and syntax) in the text.',
			'Questions are sequenced to guide students in delving deeper into text and graphics. These inferences should relate to key ideas of the text.'
			],
		 // CA3
			[
			'The teacher provides the conditions for all students to focus on text.',
			'The teacher expects evidence and precision from students and probes students’ answers accordingly.',
			'The teacher creates the conditions for student conversations and plans tasks where students are encouraged to talk about each other’s thinking.',
			'The teacher acts on knowledge of individual students to promote progress toward independence in grade-level literacy tasks.'
			]
		]
	
	],
	
	// Math
	[	
		// K-8
		[ // CA1
			[
			'The lesson focuses on the depth of a grade-level cluster(s), grade-level content standard(s) or part(s) thereof.',
			'The lesson intentionally relates new concepts to students’ prior skills and knowledge.',
			'The lesson intentionally targets the aspect(s) of rigor (conceptual understanding, procedural skill and fluency, application) called for by the standard(s) being addressed.'
			],
		  // CA2
			[
			"The teacher makes the mathematics of the lesson explicit by using explanations, representations, and/or examples.",
			"The teacher provides opportunities for students to work with and practice grade-level problems and exercises.",
			"The teacher uses variation in students’ solution methods to strengthen all students’ understanding of the content.",
			"The teacher checks for understanding throughout the lesson, using informal, but deliberate methods (such as questioning or assigning short problems).",
			"The teacher summarizes the mathematics with references to student work and discussion in order to reinforce the focus of the lesson."
			],
		 // CA3
			[
			'The teacher poses high quality questions and problems that prompt students to share their developing thinking about the content of the lesson.',
			'The teacher uses strategies to keep all students persevering with challenging problems.',
			'The teacher establishes a classroom culture in which students explain their thinking.',
			'The teacher creates the conditions for student conversations where students are encouraged to talk about each other’s thinking.',
			'The teacher connects students’ informal language to precise mathematical language appropriate to their grade.',
			'The teacher has established a classroom culture in which students choose and use appropriate tools when solving a problem.',
			'The teacher asks students to explain and justify work and provides feedback that helps students revise initial work.'
			]
		],
		// HS
		[ // CA1
			[
			'The lesson focuses on the depth of a course-level cluster(s), course-level content standard(s) or part(s) thereof.',
			'The lesson intentionally relates new concepts to students’ prior skills and knowledge.',
			'The lesson intentionally targets the aspect(s) of rigor (conceptual understanding, procedural skill and fluency, application) called for by the standard(s) being addressed.'
			],
		  // CA2
			[
			"The teacher makes the mathematics of the lesson explicit by using explanations, representations, and/or examples.",
			"The teacher provides opportunities for students to work with and practice course-level problems and exercises.",
			"The teacher uses variation in students’ solution methods to strengthen all students’ understanding of the content.",
			"The teacher checks for understanding throughout the lesson, using informal, but deliberate methods (such as questioning or assigning short problems).",
			"The teacher summarizes the mathematics with references to student work and discussion in order to reinforce the focus of the lesson."
			],
		 // CA3
			[
			'The teacher poses high quality questions and problems that prompt students to share their developing thinking about the content of the lesson.',
			'The teacher uses strategies to keep all students persevering with challenging problems.',
			'The teacher establishes a classroom culture in which students explain their thinking.',
			'The teacher creates the conditions for student conversations where students are encouraged to talk about each other’s thinking.',
			'The teacher connects students’ informal language to precise mathematical language appropriate to their course.',
			'The teacher has established a classroom culture in which students choose and use appropriate tools when solving a problem.',
			'The teacher asks students to explain and justify work and provides feedback that helps students revise initial work.'
			]
		]
	
	],
	
	// H/SS
	[
		[],[], // K-2, 3-5
		// 6-12
		[ // CA1
			[
			'Text-based instruction engages students in reading, speaking, or writing about text(s).',
			'The text(s) are at or above the complexity level expected for the grade and time in the school year.',
			'The text(s) are clear and build knowledge relevant to the content being studied.'
			],
		  // CA2
			[
			'Questions and tasks address the text by attending to its particular structure, concepts, ideas, events and details.',
			'Questions and tasks require students to cite evidence from the text to support analysis, inference, and claims.',
			'Questions and tasks require students to appropriately use academic language (i.e., vocabulary and syntax) from the text in their responses or claims.',
			'Sequences of questions support students in delving deeper into text, data, or graphics to support inquiry and analysis.'
			],
		 // CA3
			[
			'The teacher provides the conditions for all students to focus on text.',
			'The teacher expects evidence and precision from students and probes students’ answers accordingly.',
			'The teacher creates the conditions for student conversations and plans tasks where students are encouraged to talk about each other’s thinking.',
			'The teacher acts on knowledge of individual students to promote progress toward independence in grade-level literacy tasks.'
			]
		]
	
	],
	
	// SC/T
	[
		[],[], // K-2, 3-5
		// 6-12
		[ // CA1
			[
			'Text-based instruction engages students in reading, speaking, or writing about text(s).',
			'The text(s) are at or above the complexity level expected for the grade and time in the school year.',
			'The text(s) are clear and build knowledge relevant to the content being studied.'
			],
		  // CA2
			[
			'Questions and tasks address the text by attending to its particular structure, concepts, ideas, events and details.',
			'Questions and tasks require students to cite evidence from the text to support analysis, inference, and claims.',
			'Questions and tasks require students to appropriately use academic language (i.e., vocabulary and syntax) from the text in their responses or claims.',
			'Sequences of questions support students in delving deeper into text, data, or graphics to support inquiry analysis, and appropriate procedures.' /* ! */
			],
		 // CA3
			[
			'The teacher provides the conditions for all students to focus on text.',
			'The teacher expects evidence and precision from students and probes students’ answers accordingly.',
			'The teacher creates the conditions for student conversations and plans tasks where students are encouraged to talk about each other’s thinking.',
			'The teacher acts on knowledge of individual students to promote progress toward independence in grade-level literacy tasks.'
			]
		]
	
	],



];


var scalelabels = [
	// ELA K2
    [
        [
            ["There is no text under consideration in this lesson.", "The lesson is focused on a text or multiple texts."],
            ["The text(s) are below both the quantitative and qualitative complexity expected for the grade and time in the school year.", "The text(s) are at or above both the qualitative and quantitative complexity expected for the grade and time in the school year."],
            ["The quality of the text(s) is low – they are poorly written and do not provide useful information.", "The quality of the text(s) is high – they are well written and/ or provide useful information."]
        ],
        [
            ["Questions and tasks do not refer directly to the text and instead elicit opinion answers.", "Questions and tasks repeatedly return students to the text to build understanding."],
            ["Questions and tasks can be answered without reference to evidence from the text.", "Questions and tasks require students to cite evidence from the text."],
            ["Questions and tasks do not explicitly attend to academic language or focus exclusively on domain-specific vocabulary.", "Questions and tasks intentionally support students in developing facility with academic language."],
            ["Questions do not follow a clear sequence or are all at the same level of depth.", "Questions are sequenced to support and challenge students in deep examination of the text."]
        ],
        [
            ["Students persist in efforts to seek evidence for their responses by returning to the text or recalling portions of the text read aloud."],
            ["Students build on each other’s observations or insights about the text when discussing or collaborating."],
            ["When possible, students demonstrate independence in completing literacy tasks."]
        ],
        [
            ["Foundational skills are unconnected to the standards for the grade.", "Foundational skills addressed fully align with the standards for the grade."],
            ["Instruction and materials are disjointed and fail to comprehensively address the foundational skills.", "Instruction and materials coherently address the foundational skills."],
            ["There is no text under consideration in this lesson.", "The lesson is focused on a text."],
            ["Instruction and materials fail to provide sufficient opportunity for students of all abilities to", "practice newly acquired foundational skills.", "Instruction and materials provide ample opportunity to practice newly acquired foundational skills for the range of students in the classroom."],
            ["Instruction and materials do not connect foundational skills to making meaning from reading.", "Instruction and materials connect foundational skills to making meaning from reading."],
            ["Instruction and materials do not monitor or adapt to student progress.", "Instruction and materials monitor and respond flexibly to student progress."]
        ],
        [
            ["Even after reaching a point of frustration, students persist in efforts to achieve foundational reading skills."],
            ["When discussing and practicing foundational skills, students actively respond to teacher prompts and build on each other’s contributions."]
        ]
    ],
    // ELA 35
    [
        [
            ["There is no text under consideration in this lesson. ", "The lesson is focused on a text or multiple texts. "],
            ["The text(s) are below both the quantitative and qualitative complexity expected for the grade and time in the school year. ", "The text(s) are at or above both the qualitative and quantitative complexity expected for the grade and time in the school year. "],
            ["The quality of the text(s) is low – they are poorly written and do not provide useful information. ", "The quality of the text(s) is high – they are well written and/ or provide useful information. "]
        ],
        [
            ["Questions and tasks do not refer directly to the text and instead elicit opinion answers.", "Questions and tasks repeatedly return students to the text to build understanding. "],
            ["Questions and tasks can be answered without reference to evidence from the text.", "Questions and tasks require students to cite evidence from the text. "],
            ["Questions and tasks do not explicitly attend to academic language or focus exclusively on domain-specific vocabulary.", "Questions and tasks intentionally support students in developing facility with academic language. "],
            ["Questions do not follow a clear sequence or are all at the same level of depth.", "Questions are sequenced to support and challenge students in deep examination of the text."]
        ],
        [
            ["Students persist in efforts to read, speak and/ or write about demanding grade-level text(s)."],
            ["Students habitually provide textual evidence to support answers and responses."],
            ["Students use evidence to build on each other’s observations or insights during discussion or collaboration."],
            ["When possible, students demonstrate independence in completing literacy tasks."],
            ["Students demonstrate use of word level diagnostic skills, activating such strategies as needed to read with grade-level fluency and comprehension."]
        ]
    ],
    // ELA 612
    [
        [
            ["There is no text under consideration in this lesson.", "The lesson is focused on a text or multiple texts."],
            ["The text(s) are below both the quantitative and qualitative complexity expected for the grade and time in the school year.", "The text(s) are at or above both the qualitative and quantitative complexity expected for the grade and time in the school year."],
            ["The quality of the text(s) is low – they are poorly written and do not provide useful information.", "The quality of the text(s) is high – they are well written and/ or provide useful information."]
        ],
        [
            ["Questions and tasks do not refer directly to the text and instead elicit opinion answers.", "Questions and tasks repeatedly return students to the text to build understanding."],
            ["Questions and tasks can be answered without reference to evidence from the text.", "Questions and tasks require students to cite evidence from the text."],
            ["Questions and tasks do not explicitly attend to academic language or focus exclusively on domain-specific vocabulary.", "Questions and tasks intentionally support students in developing facility with academic language."],
            ["Questions do not follow a clear sequence or are all at the same level of depth.", "Questions are sequenced to support and challenge students in deep examination of the text."]
        ],
        [
            ["Students persist in efforts to read, speak and/ or write about demanding grade-level text(s)."],
            ["Students habitually provide textual evidence to support answers and responses."],
            ["Students use evidence to build on each other’s observations or insights during discussion or collaboration."],
            ["When possible, students demonstrate independence in completing literacy tasks."]
        ]
    ],
    // HSS
    [
        [
            ["There is no text under consideration in this lesson.", "A text (or multiple texts) is directly addressed in this lesson."],
            ["The text(s) are below both the quantitative and qualitative complexity expected for the grade and time in the school year.", "The text(s) are at or above both the qualitative and quantitative complexity expected for the grade and time in the school year."],
            ["The quality of the text(s) is low – they are unclear and are not relevant to the content being studied.", "The quality of the text(s) is high – they are clear and build knowledge relevant to the content being studied."]
        ],
        [
            ["Questions and tasks do not refer directly to the text and instead elicit opinion answers.", "Questions and tasks repeatedly return students to the text to build understanding."],
            ["Questions and tasks can be answered without reference to evidence from the text or data.", "Questions and tasks require students to cite evidence from the text or data."],
            ["Questions and tasks do not explicitly require use of academic or domain- specific language.", "Questions and tasks intentionally support students in developing facility with academic and domain-specific language."],
            ["Questions do not follow a clear sequence or are all at the same level of depth.", "Questions are sequenced to support and challenge students in deep examination of the text."]
        ],
        [
            ["Students persist in efforts to read, speak and/ or write about demanding grade-level text(s)."],
            ["Students habitually provide textual evidence to support answers and responses."],
            ["Students use evidence to build on each other’s observations or insights during discussion or collaboration."],
            ["When possible, students demonstrate independence in completing literacy tasks."]
        ]
    ],
    // SCI
    [
        [
            ["There is no text under consideration in this lesson.", "A text (or multiple texts) is directly addressed in this lesson. "],
            ["The text(s) are below both the quantitative and qualitative complexity expected for the grade and time in the school year.", "The text(s) are at or above both the qualitative and quantitative complexity expected for the grade and time in the school year."],
            ["The quality of the text(s) is low – they are unclear and are not relevant to the content being studied.", "The quality of the text(s) is high – they are clear and build knowledge relevant to the content being studied."]
        ],
        [
            ["Questions and tasks do not refer directly to the text and instead elicit opinion answers.", "Questions and tasks repeatedly return students to the text to build understanding."],
            ["Questions and tasks can be answered without reference to evidence from the text or data.", "Questions and tasks require students to cite evidence from the text or data."],
            ["Questions and tasks do not explicitly require use of academic or domain- specific language.", "Questions and tasks intentionally support students in developing facility with academic and domain- specific language."],
            ["Questions do not follow a clear sequence or are all at the same level of depth.", "Questions are sequenced to support and challenge students in deep examination of the text."]
        ],
        [
            ["Students persist in efforts to read, speak and/ or write about demanding grade-level text(s)."],
            ["Students habitually provide textual evidence to support answers and responses."],
            ["Students use evidence to build on each other’s observations or insights during discussion or collaboration."],
            ["When possible, students demonstrate independence in completing literacy tasks."]
        ]
    ],
    // MATH K8
    [
        [
            ["The lesson focuses only on mathematics outside the grade-level standards or superficially reflects the grade-level cluster(s), grade-level content standard(s) or part(s) thereof.", "The lesson focuses only on mathematics within the grade-level standards and fully reflects the depth of the grade-level cluster(s), grade-level content standard(s) or part(s) thereof."],
            ["The lesson contains no meaningful connections to students’ prior skills and knowledge.", "The lesson explicitly builds on students’ prior skills and knowledge and students articulate these connections."],
            ["The lesson targets aspect(s) of rigor that are not appropriate for the standard(s) being addressed.", "The lesson explicitly targets aspect(s) of rigor called for by the standard(s) being addressed."],
            ["The lesson superficially or only partially reflects the standard(s) being addressed.", "The lesson fully reflects all aspects of the standard(s) being addressed."]
        ],
        [
            ["A variety of instructional techniques and examples are used to make the mathematics of the lesson clear.", "Examples are used to make the mathematics of the lesson clear.","Instruction is limited to showing students how to get the answer","Instruction is not focused on the mathematics of the lesson."],
            ["Students are given extensive opportunities to work with grade-level problems and exercises.", "Students are given opportunities to work with grade-level problems and exercises.","Students are given limited opportunities to work with grade-level problems and exercises.","Students are not given opportunities to work with grade-level problems and exercises."],
            ["A variety of student solution methods are shared and examined together to support mathematical understanding for all students.", "Student solution methods are shared to support mathematical understanding for some students.","Student solution methods are shared.","Student solution methods are not shared."],
            ["There are checks for understanding used throughout the lesson to assess progress of all students.", "There are checks for understanding used throughout the lesson to assess progress of some students.", "There are few checks for understanding, or the progress of only a few students is assessed.", "There are no checks for understanding."],
            ["The lesson includes a summary with references to student work and discussion that reinforces the mathematics.", "The lesson includes a summary with a focus on the mathematics.", "The lesson includes a summary with limited focus on the mathematics.", "The lesson includes no summary of the mathematics."]
        ],
        [
        	["Students share their developing thinking about the content of the lesson."],
            ["Even after reaching a point of frustration, students persist in efforts to solve challenging problems."],
            ["Students elaborate with a second sentence (spontaneously or prompted by the teacher or another student) to explain their thinking and connect it to their first sentence."],
            ["Students talk about and ask questions about each other’s thinking, in order to clarify or improve their own mathematical understanding."],
            ["Students use precise mathematical language in their explanations and discussions."],
            ["Students use appropriate tools strategically when solving a problem."],
            ["Student work includes revisions, especially revised explanations and justifications."]
        ]
    ],
    // MATH HS
    [
        [
            ["The lesson focuses only on mathematics outside the course- level standards or superficially reflects the course-level cluster(s), course-level content standard(s) or part(s) thereof.", "The lesson focuses only on mathematics within the course- level standards and fully reflects the depth of the course-level cluster(s), course-level content standard(s) or part(s) thereof."],
            ["The lesson contains no meaningful connections to students’ prior skills and knowledge.", "The lesson explicitly builds on students’ prior skills and knowledge and students articulate these connections."],
            ["The lesson targets aspect(s) of rigor that are not appropriate for the standard(s) being addressed.", "The lesson explicitly targets aspect(s) of rigor called for by the standard(s) being addressed."],
            ["The lesson superficially or only partially reflects the standard(s) being addressed.", "The lesson fully reflects all aspects of the standard(s) being addressed."]
        ],
        [
            ["A variety of instructional techniques and examples are used to make the mathematics of the lesson clear.", "Examples are used to make the mathematics of the lesson clear.","Instruction is limited to showing students how to get the answer","Instruction is not focused on the mathematics of the lesson."],
            ["Students are given extensive opportunities to work with grade-level problems and exercises.", "Students are given opportunities to work with grade-level problems and exercises.","Students are given limited opportunities to work with grade-level problems and exercises.","Students are not given opportunities to work with grade-level problems and exercises."],
            ["A variety of student solution methods are shared and examined together to support mathematical understanding for all students.", "Student solution methods are shared to support mathematical understanding for some students.","Student solution methods are shared.","Student solution methods are not shared."],
            ["There are checks for understanding used throughout the lesson to assess progress of all students.", "There are checks for understanding used throughout the lesson to assess progress of some students.", "There are few checks for understanding, or the progress of only a few students is assessed.", "There are no checks for understanding."],
            ["The lesson includes a summary with references to student work and discussion that reinforces the mathematics.", "The lesson includes a summary with a focus on the mathematics.", "The lesson includes a summary with limited focus on the mathematics.", "The lesson includes no summary of the mathematics."]
        ],
        [
        	["Students share their developing thinking about the content of the lesson."],
            ["Even after reaching a point of frustration, students persist in efforts to solve challenging problems."],
            ["Students elaborate with a second sentence (spontaneously or prompted by the teacher or another student) to explain their thinking and connect it to their first sentence."],
            ["Students talk about and ask questions about each other’s thinking, in order to clarify or improve their own mathematical understanding."],
            ["Students use precise mathematical language in their explanations and discussions."],
            ["Students use appropriate tools strategically when solving a problem."],
            ["Student work includes revisions, especially revised explanations and justifications."]
        ]
    ]
];

// map subject and grade to scale label top-level index
var scaleIndexes = [ 
	[0,1,2],[5,6],[-1,-1,3],[-1,-1,4]
 ];
 
 
 // replace some of that with newer copy!
var replacements = [{ subj: 0, data: strings_ela_k2, grade: 0 },
					{ subj: 0, data: strings_ela_312, grade: 1 },
					{ subj: 1, data: strings_math_k8, grade: 0 },
					{ subj: 1, data: strings_math_hs, grade: 1 }
				];
for(var r in replacements) {
	var actions = replacements[r].data.actions;
	var subj = replacements[r].subj;
	var grade = replacements[r].grade;
	[coreActions_ELA, coreActions_M][subj].splice(0,5);
	corestructure[subj][grade].splice(0,100);
	for(var a in actions) {
		if(subj == 1) {
			if(!coreActions_M[a])
				coreActions_M[a] = [];
			coreActions_M[a].push(actions[a].desc);
		}
		[coreActions_ELA, coreActions_M][subj][a] = actions[a].desc;
		corestructure[subj][grade][a] = [];
		for(var i in actions[a].indicators) {
			var indicator = actions[a].indicators[i];
			corestructure[subj][grade][a][i] = indicator.desc;
			scalelabels[scaleIndexes[subj][grade]][a][i] = $.map(indicator.ratings, function(e,i) { return e.label }).slice().reverse();
		}
	}
}


var globals = {
    searchText: "",
    searchGrade: "",
    searchResponse: "",
    search_selectedGrade:{
        gradeNum:"",
        gradePrefix:"For",
        gradeClass:"selectedgrade",
        words:[]
    },
    search_belowGrade:{
        gradeNum:"",
        gradePrefix:"Below",
        gradeClass:"belowgrade",
        words:[]
    },
    search_aboveGrade:{
        gradeNum:"",
        gradePrefix:"Above",
        gradeClass:"abovegrade",
        words:[]
    }
};


var viewstate = {
	'mainclass': 'landing',
};


var templateHolder = {
    TEMPLATES : {}
};

function loadSavedData(data) {
	if(!data.success) return;
	
	_gaq.push(['_trackEvent', 'Data', 'Load Saved Data' ]);
	
	viewstate = JSON.parse(data.data);
	if(!viewstate.ca) viewstate.ca = 1; // for old saves
	if(!viewstate.ca1sub && viewstate.subject == 1 && viewstate.grades == 1) { viewstate.ca1sub = 'reading'; }
	window.viewid = data.id;
	$('html,body').animate({scrollTop:0}, 500);
	updateView();
  
  $('#tools-notes textarea').val(viewstate.notes0);
  tinymce.get(0).load();
}


function applyFootnote(el,title) {
  title = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, '&quot;'); //fixsyntaxhighlight "//
  title = title.replace(/([^>])([\S]+.org[\S]*[\w/]?)([^<])/g, "$1<a href='//$2' target=_blank>$2</a>$3");
	el.each(function(i,e) { $(e).append("<sup><a title=\""+title+"\">"+ '<i class=icon-info-sign></i>' +"</a></sup>") });
	$('.assheader sup a').tooltip({container:'.assheader',html:true, delay:{ show: 100, hide: 1000 }});
	$('sup a').tooltip({container:'#main',html:true, delay:{ show: 100, hide: 1000 }});
}


function areyousure(closest, after, text_) {
	var text = text_ || 'Are you sure?';
	return function() {
    	$(this).closest(closest).append('<div class="indicatormenu areyousure">'+text+' <a href="#" class="btn btn-go btn-goforward">Yes</a></div>');
    	$(this).closest(closest).find('.indicatormenu').hide().fadeIn();
    	
    	$(this).closest(closest).find('.areyousure .btn-goforward').click(after);
        
        setTimeout(function() {
        $('html').one('click', function() {  $('.areyousure').remove(); });
        $('iframe').each(function(){ this.contentWindow.document.body.onclick = function() {  $('.areyousure').remove(); } });
        },10);
      
      
        return false;
      
  	}  
}

function setupLanding() {
	if(/static\/(\d+)\/(\d+)/.test(location.hash)) { $('body').addClass('loaded'); return; }
	$('body').addClass('loaded landing-open');
	var account = {
		loadSavedLessons: function() {
			$('#savedSearchesBtn').trigger('click');
		},
		newLesson: function() {
                viewstate.subject = roledata.subjects;
                viewstate.grades = roledata.grades;
                viewstate.mode = 'notes';
				_gaq.push(['_trackEvent', 'Data', 'Starting New Guide', subject_name[viewstate.subject] + ' - ' + gradeband_name[viewstate.subject][viewstate.grades]  ]);
                $.post( '/coaching-new-data', coachingsearch_response, "json" );
		}
	}

// landing.js from mike
	var landing = 
	{
		ddSubject: false, 
		ddGrade: false,
		priorToLogin: 'landing-main',
		onComplete: null,

		init: function()
		{
			landing.sizeATF();
			$(window).resize(landing.sizeATF);
			$('.landing').css('display', 'block');
			$(window).scrollTop(0);
			//$('body').css('background-color', '#fff');
			landing.addListeners();
			if(location.search=="?new")$('.landing .btn-new').trigger('click');
		},

		sizeATF: function()
		{
			var wH = $(window).height();
			$('.landing .atf').height(wH);
			$('.landing .btf').height(wH);
			
		},

		addListeners: function()
		{
			// -- Top Right Login
			$('.btn-login').click(function(event)
			{
				_gaq.push(['_trackEvent', 'UI', 'Show Login Form', 'Top Right']);
				landing.getLoginScreen();
				return false;
			});


			// -- Main
			$('.btn-new').click(function(event) 
			{
				_gaq.push(['_trackEvent', 'Landing', 'Start New']);
				$('.landing').addClass('deep');
				$('.landing-info').css('display', 'block');
				TweenLite.to($('.landing-main'), 0.25, {autoAlpha:0, onComplete:function(){ $('.landing-main').css('display', 'none'); }});
				TweenLite.to($('.landing-info'), 0.25, {autoAlpha:1});

				landing.priorToLogin = 'landing-info';

				return false;
			});

			$('.btn-continue').click(function(event) 
			{
				_gaq.push(['_trackEvent', 'Landing', 'Continue Saved']);
				if (!loggedin) 
				{
					_gaq.push(['_trackEvent', 'UI', 'Show Login Form', 'Continue Saved']);
					landing.onComplete = 'continue';
					landing.getLoginScreen();
				} else {
					$('#savedSearchesBtn').trigger('click');
				}

				return false;
			});


			// -- Dropdowns
			$('#dropdown-subject ul li a').click(function()
			{
				var data = $(this).attr('href');
				data = data.substr(1);
				roledata.subjects = parseInt(data);
				$('body').addClass('subject-'+data);

				$('#dropdown-subject .toggle').html( $(this).html() + '<span></span>');

				landing.ddSubject = true;
				landing.checkInfo();

				$('#dropdown-subject .toggle').dropdown('toggle');
				
				$('#dropdown-grade ul li a').hide().each(function(i,e) { if(!gradeband_name[roledata.subjects][i+1]) return; $(e).show().text(gradeband_name[roledata.subjects][i+1]); });
				if(roledata.grades)
					$('#dropdown-grade ul li a').eq(Math.min(roledata.grades-1, $('.gradesdropdown a:visible').size()) ).click();
				if(roledata.subjects >= 3)
					$('#dropdown-grade ul li a:eq(2)').click();
			
				return false;
			});

			$('#dropdown-grade ul li a').click(function()
			{
				var data = $(this).attr('href');
				data = data.substr(1);
				roledata.grades = parseInt(data);
				$('body').addClass('grades-'+data);

				$('#dropdown-grade .toggle').html( $(this).html() + '<span></span>');

				landing.ddGrade = true;
				landing.checkInfo();

				$('#dropdown-grade .toggle').dropdown('toggle');
				return false;
			});


			// -- Log In
			$('.landing-login span a').click(function(event) 
			{
				_gaq.push(['_trackEvent', 'UI', 'Show Register Form', 'Login Page']);
				$('.registerbtn').trigger('click');

				return false;
			});

			$('#loginModal .modal-content').addClass('forgotpass');
			$('.landing-login .pw .btn-forgot').click(function(event) 
			{
				$('.loginbtn').trigger('click');
				return false;
			});
			
			$('.btn-register').click(function(event) 
			{	
				_gaq.push(['_trackEvent', 'UI', 'Show Register Form', 'Top Right']);
			});

			$('.landing-login .btn-submit').click(function(event) 
			{	
				landing.login();

				return false;
			});
		},

		checkInfo: function()
		{
			if (landing.ddGrade && landing.ddSubject)
			{
				if (!loggedin) 
				{
					_gaq.push(['_trackEvent', 'UI', 'Show Login Form', 'Starting New']);
					$('.landing-login').css('display', 'block');
					TweenLite.to($('.landing-info'), 0.25, {autoAlpha:0, onComplete:function(){ $('.landing-info').css('display', 'none'); }});
					TweenLite.to($('.landing-login'), 0.25, {autoAlpha:1});

					landing.priorToLogin = 'landing-login';
				} else {
					account.newLesson('landing');
				}
			}
		},

		login: function()
		{
			landing.loggingIn = true;

			$.post(site.root_uri + '/login', $('#landing-login-form input').serialize(), function(data)
            {
                if(data.success)
                {
                    $('.landing-login .btn-submit').removeClass('disabled');
                    window.loggedin = true;

                    $.get("getprofile.php", {}, function(data)
                    {
                        globals.getprofile = data.user;
                        globals.username = data.user.name;
                        $('#namebtn').html('<span></span>'+globals.username.toUpperCase());
                        $('#profilenamelink').html('<span></span>'+globals.username);
                        
                        trackprof = [data.user.id, data.user.role, data.user.subject, data.user.grades, 'Login'];
					     var trnames = ['uid', 'role', 'subject', 'grades'];
					     for(var i=1;i<=4;i++)
					        _gaq.push(['_setCustomVar', i, trnames[i-1], trackprof[i-1], 2]);
                        _gaq.push(['_trackEvent', 'Account', trackprof[4]]);

                        $("body").addClass("loggedin");


                        if (landing.ddSubject && landing.ddGrade) {
                        	// Your logged in and the lesson basics are filled in
                        	// Move onto the actual lesson
                        	account.newLesson('landing');
                        } else {
                        	if (landing.onComplete == 'continue') 
                        	{
                        		// You clicked continue and were not logged in yet
                        		// Now you are so show continue modal
                        		// Also set it back to the main screen incase you choose nothing 

                        		landing.onComplete = null;
                        		account.loadSavedLessons();
                        		$('.btn-saved').trigger('click');
                        		landing.getPriorToLogin();
                        	} else {
                        		// You skipped ahead somewhere without choosing new/continue or not filling in info
                        		account.loadSavedLessons();
                        		landing.getPriorToLogin();
                        	}
                        }
                    });
                } else {
                    landing.errorHandling(data);
                }
            }, "json");
		},

		errorHandling: function(data)
		{
			data.formid = '#landing-login-form';
		    $('.landing-login .btn-submit').removeClass('disabled');
		    $(data.formid + ' .errors').remove();
		    $(data.formid + ' .has-error').removeClass('has-error');

		    for(var i in data.errors)
		    {
		        $(data.formid + ' #' + data.errors[i].id ).parent().prepend('<p class="errors">' + data.errors[i].message + '</p>');
		        $(data.formid + ' #' + data.errors[i].id ).parent().addClass('has-error');
		    }
		},

		getLoginScreen: function()
		{
			$('.landing').addClass('deep');
			$('.landing-login').css('display', 'block');
			TweenLite.to($('.' + landing.priorToLogin), 0.25, {autoAlpha:0, onComplete:function(){ $('.' + landing.priorToLogin).css('display', 'none'); }});
			TweenLite.to($('.landing-login'), 0.25, {autoAlpha:1});
		},

		getPriorToLogin: function()
		{
			if (landing.priorToLogin == 'landing-main') {
				$('.landing').removeClass('deep');
			} else {
				$('.landing').addClass('deep');
			}

			$('.' + landing.priorToLogin).css('display', 'block');
			TweenLite.to($('.landing-login'), 0.25, {autoAlpha:0, onComplete:function(){ $('.landing-login').css('display', 'none'); }});
			TweenLite.to($('.' + landing.priorToLogin), 0.25, {autoAlpha:1});
		},

		getSelectScreen:function() 
		{
			landing.ddSubject = false;
			landing.ddGrade = false;

			$('#dropdown-subject .toggle').html( 'SELECT SUBJECT' + '<span></span>');
			$('#dropdown-grade .toggle').html( 'SELECT A GRADE BAND' + '<span></span>');

			$('.landing').addClass('deep');

			$('.' + landing.priorToLogin).css('display', 'none');

			$('.landing-info').css('display', 'block');
			TweenLite.to($('.landing-info'), 0.1, {autoAlpha:1});
			landing.priorToLogin = 'landing-info';
		}
	};
	
	landing.init();


}


$(document).ready(function(){
	// trailing # on url causes some serious scrolling-on-focus bugs with tinymce
	if(/#$/.test(location.href)) {
		if (typeof window.history.replaceState == 'function') {
		  history.replaceState({}, '', window.location.href.slice(0, -1));
		}
		else {
			location.href = location.href.replace('#','');
		}
	}
    $(window).on('beforeunload', function(){
    	if($('html').hasClass('staticreview')) return;
    	if(window.viewstate && viewstate.dirty)
	  		return 'You still have unsaved work.';
	  	else
	  		return ;
	});
  
  if(navigator.userAgent.match(/Trident/)) {
    $('html').addClass('ie');
  }
  
  // position:fixed and on-screen keyboard: the worst
  if('ontouchstart' in window) {
	  $('#tools').on('focusin', 'input, textarea', function() {
	  	setTimeout(function() { if($(window).scrollTop() < 420) $(window).scrollTop( $(window).scrollTop() - 112);  }, 100);
	  });
  $('#tools').on('focusout', 'input, textarea', function() {
	  });
  }
  
  setupLanding();
		
	
	if(0 && !document.cookie.match(/coach_wall=pass/)) {
		$('#wallModal').modal(); 
		$('body').addClass('wall');
		$('#main').addClass('aboutPage').removeClass('coaching-landing');
		$('#wall-submit').click(function() {
			if($('#wall_username').val() == 'atccoach' && $('#wall_password').val() == 'sapcoachbeta') {
				document.cookie = 'coach_wall=pass';
				$('#wallModal').modal('hide');
				$('body').removeClass('wall');
				$('#main').removeClass('aboutPage').addClass('coaching-landing');	
			}
			return false;
		});
	}

	$('#detailsModal select').hide();
	
	applyFootnote($('#detailsModal .rigorq'), "One of the three instructional Shifts required by the Standards is rigor, which is defined as pursuing conceptual understanding, procedural skill and fluency, and application with equal intensity.  The Standards are written using language that informs the reader as to what aspect of rigor certain standards are addressing.  Some clusters or standards specifically require one aspect of rigor, some require multiple aspects.");
	
  var assignStandard = function(normal, id) {
    if(/(RST|WHST)\b/.test(id)) return 4;
    if(/\b(RH|WHST)\b/.test(id)) return 3;
    if(normal == "standards-ela") return 1;
    return 2;
  }
	var standards = $('#detailsModal select[multiple] option').map(function() { return { id:this.value, text:(this.innerText||this.textContent), subj:assignStandard(this.parentElement.className,this.value) } }).get();
	
	$('#detailsModal #details_standards, #tools-details #details_standards').select2({
		multiple: true,
		width: '100%',
		formatSelection:function(a){return a.id + '<span>' + a.text.replace(a.id+':', '') + '</span>';}, 
		minimumInputLength:1, 
		placeholder:"Standards addressed in this lesson",
		initSelection : function (element, callback) {
			var data = [];
			$(element.val().split(",")).each(function () {
				var id = this;
			    data.push({id: id, text: standards.filter(function(a){ return a.id==id })[0].text });
			});
			callback(data);
		},
		query:function(q){
			var s = q.term.toLowerCase();
			var grades = [ [null,'(K|[1-8])', '([A-JL-Z]|HS)' ] , [null, '(K|1|2)','(3|4|5|6|7|8|6-8|9|10|11|12|9-10|11-12)','(6|7|8|6-8|9|10|11|12|9-10|11-12)']][viewstate.subject=="2"?0:1][viewstate.grades];
			// LPT:
			// var grades = ['K','1',2','3','4','5','(6|6-8)','(7|6-8)','(8|6-8)','(9|9-10)','(10|9-10)','(11|11-12)','(12|11-12)'][viewstate.grade];
			// if(utils.lessonType == 'math' && utils.lessonGrade == "hs") grades = '([A-JL-Z])';
			
			var re = new RegExp('^' + grades + '[.-]');			
			
			
			q.callback({results:standards.filter(function(a) { return a.subj==(viewstate.subject) && a.text.toLowerCase().indexOf(s) > -1 && re.test(a.id) }).slice(0, 200) }) 
		} 
	}).on('change', function() { $('#tools-details .select2-search-field input').prop('placeholder', $('#tools-details .select2-search-choice').length ? "Type to add additional Standards" : ''); });

	//$('#detailsModal select').select2({formatSelection:function(a){return a.id;}})

    //nav btns
    $("#savedSearchesBtn, .btn-saved").click(function(){
    	if(viewstate.dirty) { doSync(); setTimeout(function(){ $("#savedSearchesBtn").click(); }, 100); return false; }
    	_gaq.push(['_trackEvent', 'UI', 'Saved Data Dialog' ]);
        $.get( site.root_uri + '/coaching-saved-data', {}, function(data){
            if(data.success){
				$('body').removeClass('landing-open');
				$('.landing').fadeOut();
                for(var d in data.saved) { 
					data.saved[d].shared = !!(1*data.saved[d].shared);
          var usdate = function(d) { var d = d.split('-'); return [d[1],d[2],d[0]].join('/') }
          data.saved[d].date_added = usdate(data.saved[d].date_added);
          data.saved[d].date_updated = usdate(data.saved[d].date_updated);
					//data.saved[d].date_added = (new Date(data.saved[d].date_added +'T07:00')).toLocaleDateString("en-US");
					//data.saved[d].date_updated = (new Date(data.saved[d].date_updated +'T07:00')).toLocaleDateString("en-US");
				}
            
                $(".savedata .form").html(Mustache.render($('#saved-template').html(), data));
                
                if($('.savedata .form tr').length > 1)
            	$('.form table').tablesorter({
					sortList:(window.sort||[[1,1]]), // default: second column, ascending
					headers:{
						2:{sorter:'natext'},3:{sorter:'natext'},4:{sorter:'natext'}, // columns w/N/A text (starting at 0)
						5:{sorter:false},6:{sorter:false},7:{sorter:false},8:{sorter:false} // not sortable
					} 
				}).bind('sortEnd', function(e) {
					window.sort = this.config.sortList; // saved sort setting for next table load
				});
                
                
                $("#main").removeClass("coaching-landing").removeClass("coaching-ass").addClass("coaching-savedsearches");
            }else{
                alert("error");
            }
        }, "json" );

        return false;
    });
    
    // treat "N/A" as blank
    $.tablesorter.addParser({ 
        id: 'natext', 
        is: function(s) { 
            return /N\/A/.test(s);
        }, 
        format: function(s) { 
            return $.trim(s.toLocaleLowerCase()).replace(/n\/a/g, '');
        }, 
        type: 'text' 
    });
    
    

    $(".logoutBtn").click(function(){
        $.get('logout.php',function(){
            //$("body").removeClass("loggedin");
            //$("#nav-profilename").removeClass("open");
            location.reload();
        });

        return false;
    });

    //my profile
    $(".myaccountBtn, #profilenamelink").click(function(){
    	_gaq.push(['_trackEvent', 'UI', 'View Account Details']);
        if(!globals.getprofile) {
            $.get( "getprofile.php", {}, function(data){
                globals.getprofile = data.user;
                globals.getprofile.optin = (globals.getprofile.optin == "1") ? true : false;

                $(".myacctArea").html(Mustache.render($('#tpl-myacct').html(), globals.getprofile));
                $("#registerModal").addClass("myacct");
                $(".registerbtn").trigger("click");
            });
        }else{
            globals.getprofile.optin = (globals.getprofile.optin == "1") ? true : false;
            $(".myacctArea").html(Mustache.render($('#tpl-myacct').html(), globals.getprofile));
            $("#registerModal").addClass("myacct");
            $(".registerbtn").trigger("click");
        }

        return false;
    });
    
    $('.step-3').on('click', '.rigora', function() {
      $('.step-3 .rigora:nth-child('+ ($(this).index()+1)  +')').toggleClass('active');
    
		 viewstate.CA1ICrigor0 = $('.step-3 .rigora:eq(0)').is('.active');
		 viewstate.CA1ICrigor1 = $('.step-3 .rigora:eq(1)').is('.active');
		 viewstate.CA1ICrigor2 = $('.step-3 .rigora:eq(2)').is('.active');
		 viewstate.dirty = true;
		 	updateView();
		//$(this).toggleClass('active');
	});
  
    $('#detailsModal, #tools-details').on('click', '.rigora', function() {
		  $('#detailsModal .rigora:nth-child('+ ($(this).index()+1)  +')').toggleClass('active');
      $('#tools-details .rigora:nth-child('+ ($(this).index()+1)  +')').toggleClass('active');
      
		 viewstate.rigor0 = $('#detailsModal .rigora:eq(0)').is('.active');
		 viewstate.rigor1 = $('#detailsModal .rigora:eq(1)').is('.active');
		 viewstate.rigor2 = $('#detailsModal .rigora:eq(2)').is('.active');
		 viewstate.dirty = true;
		 if($(this).closest('#tools-details').size())
		 	updateView();
		//$(this).toggleClass('active');
	});

    $('#detailsModal').on('change click mouseenter mouseleave keyup', 'input, textarea, .rigora, select', function() { 
    	var ok = $('#detailsModal input.form-control:visible, #detailsModal textarea:visible').filter(function() { return !$(this).val(); }).size() == 0 &&
			($('#detailsModal .rigora.active').size() > 0 || viewstate.subject != 2) && ($('#terms').is(':checked') || !$('#terms').is(':visible')) && ($('#detailsModal #ca1sub').val() || !$('#detailsModal #ca1sub').is(':visible'));
    	
		$('#details-submit').toggleClass('disabled', !ok ); 
	});
    
    $('#tools-res').on('click', 'div + p > a', function() { _gaq.push(['_trackEvent', 'UI', 'Parent Site Link' ]);  });
	$('#tools-res').on('click', '#addbtn', function() {
		$('#addurl').prev('p').remove();
    var url = $('#addurl').val();
    url = url.replace(/^https?\:\/\//, '');
    url = url.replace(/^www\./, '');
		if( new RegExp('^'+location.hostname).test(url ) ) {
			addRes( location.protocol + '//' + url ); 
		}
		else {
			
			$('#addurl').before('<p class="errors">');
			$('#addurl').prev('p').text('Please enter a URL from ' + location.hostname + '.');
			
		}
	});
	$('#tools-res').on('click', '.remove-res', function() { $(this).parent().remove(); 
		viewstate['suggested'] = $('#tools-res .added-container').html();
		viewstate.dirty = true;
		return false;
	});
	
    $('header .nav a').off('click'); // disable top nav GA from main.js
    $(".aboutBtn").click(function(){
        _gaq.push(['_trackPageview', '/coaching-tool/about' ]);
    });
    


    $(".newobsBtn, .navbar-brand").click(function(){
    	_gaq.push(['_trackEvent', 'UI', 'Start New Observation' ]);
    	// trailing # fails to refresh
		if(/#$/.test(location.href)) {
			if (typeof window.history.replaceState == 'function') {
			  history.replaceState({}, '', window.location.href.slice(0, -1));
			}
			else {
				location.href = location.href.replace('#','');
			}
		}
      location.hash = '';
      location.search="new";
    	//location.reload();
        //viewstate.mainclass = 'landing';
        //window.viewid = null;
        //updateView();
        return false;
    });

    
	$('.savedata').on('click', '.btn-delete', areyousure('td', function(){ var me = $(this).closest('td').find('.btn-delete'); $.post('/coaching-delete-data', {id: me.attr('href').split(/#/)[1]}, function(data){
		me.parent().parent().fadeOut();
		_gaq.push(['_trackEvent', 'Data', 'Delete Saved Data' ]);
	}, 'json'); return false; }) );


	$('.savedata').on('click', '.btn-viewdetail', function(){ $.get('/coaching-get-data/' + this.hash.split('#')[1], loadSavedData, 'json'); return false; })

    $(document).on("click", ".btn-edit-profile", function() {
    	_gaq.push(['_trackEvent', 'UI', 'Edit Account Details']);
        //populate register form
        $("#firstname").val(globals.getprofile.name.split(" ")[0]);
        $("#lastname").val(globals.getprofile.name.split(" ")[1]);

        $(".grade-group input[type=checkbox]").each(function(){
            var gradearr = globals.getprofile.grades.split(",");

            if($.inArray($(this).val(),gradearr)>-1) $(this).prop("checked",true);
        });
        
        $('#registerform #password').val('');

        $("#role").val(globals.getprofile.role);
        $("#subject").val(globals.getprofile.subject);
        $("#registerform #email").val(globals.getprofile.email);
        $("#school").val(globals.getprofile.school);
        $("#state").val(globals.getprofile.state);
        $("#city").val(globals.getprofile.city);
        $("#newsletter").attr("checked",((globals.getprofile.optin == "0")? false : true));

        $("#registerModal").removeClass("myacct").addClass("edit");

        return false;
    });

    $('#profile-submit').unbind("click");
    $('#profile-submit').click(function() {
        $(this).addClass('disabled');
        $.post( site.root_uri + '/edit-profile', $('#registerform input, #registerform select').serialize(), registerform_response, "json" );
    });

    $(".btn-go-inverse.editmode").click(function(){
        $("#registerModal .close").trigger("click");
        return false;
    });
    
    //custom grade button behavior
    $(".gradebuttons button").unbind("click");

    $(".gradebuttons button").click(function() {
        $(".gradebuttons button").removeClass(settings.activeClass);
        $(this).addClass(settings.activeClass);
        $(".btn-group").removeClass("open");

        formatGrades();
    });
    
    $('#register-submit').unbind("click");
    $('#register-submit').click(function() {
        $(this).addClass('disabled');
        $.post( site.root_uri + '/register', $('#registerform input, #registerform select').serialize(), registerform_response, "json" );

        return false;
    });
    
    $(".alreadyTxt a").click(function(){
        $("#registerModal").trigger("click");
        setTimeout(function(){
            $(".loginbtn").trigger("click");
        },100);
        return false;
    });
    
    //modal events
    $('#registerModal, #loginModal, #saveModal').on('shown.bs.modal', function() {  $(this).find('input').eq(0).focus(); })
    
    $('#emailModal').on('shown.bs.modal', function() {
      if(globals.getprofile && globals.getprofile.email) {
        var h = $('#emailModal .copyme').html();
        h = h.replace(/Send copy to myself.*/, 'Send copy to myself at ' + globals.getprofile.email);
        $('#emailModal .copyme').html(h);
      }
		if(!window.viewid) {
			$.post('/coaching-new-temp-data', {title:viewstate.details_teacher||'',notes:viewstate.details_class||'',subject:subject_name[viewstate.subject]||'',shared:viewstate.shared||0,id:0,data:JSON.stringify(viewstate)}, function(data) { 
				window.pdf_viewid = data.id;  
			}, 'json' );
			
		}
		else window.pdf_viewid = viewid;
		
    });
    
    $('#exportModal').on('shown.bs.modal', function() {
    	if(!window.viewid) {
			$.post('/coaching-new-temp-data', {title:viewstate.details_teacher||'',notes:viewstate.details_class||'',subject:subject_name[viewstate.subject]||'',shared:viewstate.shared||0,id:0,data:JSON.stringify(viewstate)}, function(data) { 
				window.pdf_viewid = data.id;  
			}, 'json' );
			
		}
		else window.pdf_viewid = viewid;
	
	});
    
    $('#registerModal, #loginModal, #saveModal').on('hidden.bs.modal', function () {
        removeErrors();
        
        if(loggingIn && !$('.modal:visible').size()) {
        	loggingIn = false;
        	// opening w/o timeout results in no .modal-open on body
			setTimeout(function() { $('#detailsModal').modal({backdrop:'static',keyboard:false}); }, 10);
			
		}

        //reset login
        $("#loginModal .modal-content").removeClass("forgotpass").removeClass("forgotsent");

        //reset register
        $("#registerModal input[type!=checkbox], #registerModal textarea").val("");
        $("#registerModal input[type=checkbox]").attr("checked", false);
        $('#registerModal select').get(0).selectedIndex = 0;
        $("#registerModal").removeClass("myacct").removeClass("editacct");
    })
    
    
    $('#detailsModal').on('hidden.bs.modal', maybeShowInstructions);
    
    
    $('.navstep').click(function(){ _gaq.push(['_trackEvent', 'Step Navigation', 'Top Nav' ]); viewstate.step = 1 + $(this).index('.navstep'); updateView(); viewstate.dirty = true; });
    
    $('.step .btn-goforward').click(function() { 
    	if(viewstate.ca == $('.ca').size() || viewstate.step == 1) {
			_gaq.push(['_trackEvent', 'Step Navigation', 'Next Step' ]);
			if(viewstate.step == 1) viewstate.step = 2; 
			viewstate.step++; 
		}
		else {
			_gaq.push(['_trackEvent', 'CA Navigation', 'Next CA' ]); 
			if(viewstate.ca == 1 && viewstate.subject == 1 && viewstate.grades == 1) viewstate.ca++
			viewstate.ca++;
		}
		updateView(); 
		viewstate.dirty = true; $('html,body').animate({scrollTop:0}, 500); 
		return false; 
		
		});
    
    $('.form').on('click', '.editnotes', function() { _gaq.push(['_trackEvent', 'Step Navigation', 'Edit Notes' ]); viewstate.step--; updateView(); return false; });

	$('#tools-notes').on('keyup click paste', 'textarea', function() {
		var _this = $(this);
		setTimeout(function() {
			var myindex = 0;//_this.index('.step:visible textarea');
			viewstate['notes' +  myindex] = _this.val();
			
			// wipe out html and highlights
			/*
      delete viewstate['hnotes' + myindex];
			for(var k in viewstate) {
				if(k.split('_')[0] == 'inotes' + myindex)
					delete viewstate[k];
			}
			*/
			viewstate.dirty = true;
		}, 10);
		
		_this.removeClass('tip');
	});
  
  tinymce.init({selector:'#tools-notes textarea',height:325, toolbar:"bold italic underline | bullist", plugins: "paste", paste_as_text: true, menubar:false, statusbar:false, browser_spellcheck: true, skin_url:'css/tinymce/atc', content_css: $('link[rel=stylesheet]').map(function() { return this.href }).get(),
  setup: function(ed) {
   ed.on('change', function(e) { ed.save();  $('#tools-notes textarea').trigger('keyup'); });
  } 
  });
  
  
  
  $('#tools').affix({offset:{top:function() { return ($('.warning').hasClass('shown') ? 440 : 350) }, bottom:141 }});
  
  $('#tabs').affix({offset:{top:448-40, bottom:162 }});
  
  
  
  //$('#searchform').hide();
  
  
  $('.mode-notes').click(function() {
    viewstate.mode = 'notes';
    $('.questions h2').text('Start here.');
    $('#modes').hide(); $('#searchform').removeClass('hidden');
    return false;
  });
  $('.mode-guide').click(function() {
    viewstate.mode = 'guide';
    $('.questions h2').text('Start here.');
    $('#modes').hide(); $('#searchform').removeClass('hidden');
    return false;
  });
  
  $(window).on('scroll', function() { 
    $('.bar').css('width', '0%');
    var idx = (viewstate.step == 4) ? $('.ca').size() : (viewstate.ca-1);
    if($(window).scrollTop() > 300) $('.fguide:visible').click();
    $('.bar').eq(idx).css('width', Math.min(1, $(window).scrollTop() / ( $('#main').height() - $(window).height() ) ) * 100 + '%');
  });
  
    
    $(window).on('scroll', function() {
		$('a.btt').toggleClass('shown', $(window).scrollTop() > 320);
	
	});
	
	$(document).on('click', 'a.btt', function() {
		$('html,body').animate({scrollTop:0}, 500);
		return false;
	});
  
	
	$('.subjectsdropdown').click(function() {
		$('.gradesdropdown a').hide().each(function(i,e) { if(!gradeband_name[roledata.subjects][i+1]) return; $(e).show().text(gradeband_name[roledata.subjects][i+1]); });
		if(roledata.grades)
			$('.gradesdropdown a').eq(Math.min(roledata.grades-1, $('.gradesdropdown a:visible').size()) ).click();
		if(roledata.subjects >= 3)
			$('.gradesdropdown a:eq(2)').click();
	});
	
	
	$('.step-3').on('click', '.encircled', function() {
		//$(this).addClass('active');
		var lbl = $(this).parent().index() + 1;
		_gaq.push(['_trackEvent', 'UI', 'Apply Rating', '' + lbl ]);
		
    var rating = $(this).parent().index() + 1;
    if(viewstate.subject == 1 && rating < 5) {
		if(activeStrings().actions[$(this).parent().parent().data('action')-1].indicators[$(this).parent().parent().data('indicator')-1].ratings.length == 5) {
			rating = 5 - rating;
		}
	}
    if(viewstate.subject == 2 && rating < 5 && $(this).parent().parent().data('action') > 1) {
      rating = 5 - rating;
    }
		viewstate['obs' + $(this).parent().parent().data('action') + '_' + $(this).parent().parent().data('indicator') ] = rating;
		viewstate.dirty = true;
		$(this).closest('ul').find('.active').removeClass('active'); $(this).addClass('active');
		setTimeout(updateView, 500);
	});

    //search ajax
    $("#search-submit").click(function(){
        var errors = 0;
        var data = {
            "formid": "#searchform",
            "errors": []
        };
        
        
   

        if(!roledata.subjects) {
            errors++;

            data.errors.push({
                "id":"subject-select",
                "message":"Subject is required."
            });
        }
        if(!roledata.grades) {
            errors++;

            data.errors.push({
                "id":"grade-select",
                "message":"Grade is required."
            });
        }

        if(errors == 0){
            if(!$(this).hasClass("disabled")){
                $(this).addClass('disabled');
                
                if(roledata.subjects == 3 || roledata.subjects == 4) {
					if(roledata.grades != 3) { // K-5 -> ELA/L
						roledata.subjects = 1;
						subject_name[1] = 'ELA / Literacy';
						viewstate.backupguide = true;
					}
				}
                
                viewstate.subject = roledata.subjects;
                viewstate.grades = roledata.grades;
                
                
                _gaq.push(['_trackEvent', 'Create Coaching Guide', subject_name[viewstate.subject] + ' - ' + gradeband_name[viewstate.subject][viewstate.grades] ]);
                
                
                //coachingsearch_response();
                $.post( '/coaching-new-data', coachingsearch_response, "json" );
                //$.post( site.root_uri + '/coaching-scan', $('#searchform').serialize(), coachingsearch_response, "json" );
            }
        }

        errorHandling(data);

        return false;
    });
    
    
    // scale key popup
    
    $('.step-3').on('click', '.ratingstip', function() {
    	/*
		$('#scaleModal .illustrative').text('');
		var aNum = $(this).data('action') - 1;
		var iNum = $(this).data('indicator') - 1;
		
		_gaq.push(['_trackEvent', 'Evidence Observed Scale Tip']);
		
		var labels = scalelabels[ scaleIndexes[viewstate.subject-1][viewstate.grades-1] ][aNum][iNum];
		
    if(labels.length == 4) {
      $('#scaleModal .illustrative').text('');
			$('#scaleModal .desc:eq(0)').text(labels[3]);
			$('#scaleModal .desc:eq(1)').text(labels[2]);
			$('#scaleModal .desc:eq(2)').text(labels[1]);
			$('#scaleModal .desc:eq(3)').text(labels[0]);
    }
		else if(labels.length == 2) {
			$('#scaleModal .illustrative').text('');
			$('#scaleModal .desc:eq(0)').text(labels[0]);
			$('#scaleModal .desc:eq(3)').text(labels[1]);
		}
		else {
			$('#scaleModal .illustrative').text(labels[0]);
			
			//if(viewstate.subject==2)
			//	applyFootnote($('#scaleModal .illustrative'), 'Some portions adapted from ‘Looking for Standards in the Mathematics Classroom’ 5x8 card published by the Strategic Education Research Partnership (math.serpmedia.org/tools_5x8.html)');
			
			$('#scaleModal .desc:eq(0)').text('The teacher does not provide students opportunity and very few students demonstrate this behavior.');
			$('#scaleModal .desc:eq(1)').text('The teacher provides students opportunity inconsistently and few students demonstrate this behavior.');
			$('#scaleModal .desc:eq(2)').text('The teacher provides students opportunity consistently and some students demonstrate this behavior.');
			$('#scaleModal .desc:eq(3)').text('The teacher provides students opportunity consistently and all students demonstrate this behavior.');
		}
		
		$('.modal-content .observed').off('click', '.encircled');
		$('.modal-content .observed').on('click', '.encircled', function() {  $('.step-3 .observed[data-action='+(aNum+1)+'][data-indicator='+(iNum+1)+'] .encircled').eq($(this).parent().index()).click(); $('#scaleModal').modal('hide'); })
*/
		
	});


    //login ajax
    $('#login-submit').unbind("click");
    $('#login-submit').click(function() {
        if(!$(this).hasClass("disabled")) $(this).addClass('disabled');

        if(!$("#loginModal .modal-content").hasClass("forgotpass")) {
            $.post( site.root_uri + '/login', $('#loginform input').serialize(), function(data) {
                if(data.success){
                    //location.reload();

                    $("#login-submit").removeClass('disabled');
                    loggedin = true;
                    $.get( "getprofile.php", {}, function(data){
                        globals.getprofile = data.user;
                        globals.username = data.user.name;
                        
                        trackprof = [data.user.id, data.user.role, data.user.subject, data.user.grades, 'Login'];
					     var trnames = ['uid', 'role', 'subject', 'grades'];
					     for(var i=1;i<=4;i++)
					        _gaq.push(['_setCustomVar', i, trnames[i-1], trackprof[i-1], 2]);
                        _gaq.push(['_trackEvent', 'Account', trackprof[4]]);

                        $("#loginModal .close").trigger("click");
                        $("#profilenamelink").html(globals.username);
                        $("body").addClass("loggedin");
                    });
                    
                    
                    if(viewstate.dirty && !window.viewid) {
                    	$.post( '/coaching-new-data', function(data) {
							if(data.success)
								window.viewid = data.id;
						
						}, "json" );
                    }

                    if(loggingIn) {
                        loggingIn = false;
                        $('#detailsModal').modal({backdrop:'static',keyboard:false});
                        //$(".saveSearchBtn").trigger("click");
                    }
                }else{
                    errorHandling(data);
                }

            }, "json" );
        }else{
            $.post( site.root_uri + '/forgotpass', $('#loginform input').serialize(), function(data) {
            	_gaq.push(['_trackEvent', 'Account', 'Forgot Password']);
                if(data.success){
                    $("#loginModal .modal-content").removeClass("forgotpass").addClass("forgotsent");
                }

                errorHandling(data);
            }, "json" );
        }
        return false;
    });

    $(".forgetpasswordBtn").click(function(){
        $("#loginModal .modal-content").addClass("forgotpass");

        return false;
    })

    $(".registerhere").click(function(){
        $("#loginModal .close").trigger("click");
        setTimeout(function(){
            $(".registerbtn").trigger("click");
        },100);

        return false;
    });
    
    
    $('#tools-printable').on('click', '.dailyPrint, .yearlyPrint', function() {
    	var fn = viewstate.subject == 2 ? 'PrintGuide_Math_{{mgrade}}_{{dy_cap}}.pdf' : 'instructional_practice_guide_{{dy}}_{{sub}}_{{grade}}.pdf';
    	
    	var dy = $(this).hasClass('dailyPrint') ? 'd' : 'y';
    	var dy_cap = dy.toUpperCase();
    	fn = Mustache.render(fn, {sub:['','ela','math','hss','sct'][viewstate.subject], grade:['','k-2','3-12','6-12'][viewstate.grades], mgrade:['','K-8','HS'][viewstate.grades], 'dy':dy,'dy_cap':dy_cap } );
    	
    	_gaq.push(['_trackEvent', 'Download Print Guide', fn]);
    	
		window.open('print/'+fn);
		return false;
	});
    
    setInterval(doSync, 5000);
    
    
    $('.step').on('click', '.addobs, .obsedit', function() {
      if($(this).parent().find('.indicatormenu').size()) return false;
      
      var lbl = 'Save';
      //if($(this).hasClass('obsedit')) lbl = 'Edit';
      $(this).before('<div class="indicatormenu"><a href="#" class="close">&times;</a><textarea class="form-control"></textarea><a href="#" class="btn btn-go btn-goforward">'+lbl+'</a></div>');
      
      $(this).prev().css({opacity:0,height:0}).animate({height:173}).animate({opacity:1});
      
      if($(this).hasClass('obsedit')) {
        $(this).prev().find('textarea').val( $(this).parent().prev().html() );
        $(this).parent().prev().slideUp();
      }
      
      

		var $im = $(this).prev();
	  
		tinymce.init({selector:'.indicatormenu textarea',
			height:130,
			resize: true,
			toolbar:"bold italic underline | bullist", 
			plugins: "paste", paste_preprocess: mce_whitelist_paste, 
			menubar:false, statusbar:false, 
			skin_url:'css/tinymce/atc', 
			browser_spellcheck: true,
			content_css: $('link[rel=stylesheet]').map(function() { return this.href }).get(), 
			setup: function(ed) {
   			ed.on('change', function(e) { ed.save(); });
   			ed.on('init', function(e) { 
			   	//ed.focus(); 
			      if($im.find('.btn-go:below-the-fold').size()) {
				      var t = $im.find('.mce-tinymce')[0];
					  $('html,body').animate({scrollTop: $im.find('.mce-tinymce').offset().top - Math.floor($(window).height()/2) }, 200, function() {
					  	//t.focus();
					  	ed.focus();
					  	//tinyMCE.activeEditor.focus();
					  });
				  }
				  else {
				  	//$(this).find('textarea')[0].focus();
				  	ed.focus();
				  }
			});
   			
			} });
	  
	   
      //$(this).find('.close')[0].focus(); //scroll
      //$(this).find('textarea')[0].focus();
      
      
      $(this).prev().find('.close').click(areyousure('.close', function() {
      	$(this).closest('.close').parent().parent().prev('.obs').slideDown();
        $(this).closest('.close').parent().remove();
        
        return false;
      }, 'Discard Changes?'));
      
      
      $(this).prev().find('.btn-go').click(function() {
        var a = $('.step-3 .ca').index($(this).closest('.ca'));
        var i =  $('.ca:visible .notesleft').index($(this).closest('.notesleft'));
        
        
        if($(this).closest('.obstools').size()) {
          //$(this).closest('.obsedit').parent().prev().text( $(this).parent().find('textarea').val() );
          $(this).closest('.obstools').prev().html ( $(this).parent().find('textarea').val() );
        }
      
        var old = $(this).closest('.notesleft').find('.obs').map(function(i,e){ return $(e).html().trim(); }).get().join(" \n");
        
        
        if(old) old = " \n" + old;
        viewstate['inotes'+a+'_'+i] = $(this).parent().find('textarea').val() + old;
        
        if($(this).closest('.obstools').size()) {
           viewstate['inotes'+a+'_'+i] = old.trim();
        }
        

        
        $(this).parent().remove();
        
        viewstate.dirty = true;
        updateView();
        
        if(!$(this).closest('.obstools').size())
        $(this).closest('.notesleft').find('.obs').eq(0).hide().slideDown();
        return false;
      });
    
      return false;
    
    });
    
    
    
    $('.step').on('click', '.obsdel', areyousure('.obsdel', function() {
    
    		 $(this).closest('.obsdel').parent().add( $(this).closest('.obsdel').parent().prev()).animate({opacity:0}).slideUp();
    		 
    		 var that = this;
    		 
    		 setTimeout(function() {
    	
		            var a = $('.step-3 .ca').index($(that).closest('.ca'));
		        var i =  $('.ca:visible .notesleft').index($(that).closest('.notesleft'));
		        
		        $(that).closest('.obsdel').parent().prev().remove();
		        
		        
		        var old = $(that).closest('.notesleft').find('.obs').map(function(i,e){ return $(e).html().trim(); }).get().join(" \n");
		        
		
		           viewstate['inotes'+a+'_'+i] = old.trim();
		           
		        $(that).closest('.obsdel').parent().remove();
		        
		        viewstate.dirty = true;
		        updateView();
	        
	        
	        }, 1100);
	        
	        return false;
	        
        })

    );
    
    
    /*$('.step').on('click', '.obsdel', function() {
    	$(this).append('<div class="indicatormenu areyousure">Are you sure? <a href="#" class="btn btn-go btn-goforward">Yes</a></div>');
    	$(this).find('.indicatormenu').hide().fadeIn();
    	
    	$(this).find('.btn').click(function() {
    	
	            var a = $('.step-3 .ca').index($(this).closest('.ca'));
	        var i =  $('.ca:visible .notesleft').index($(this).closest('.notesleft'));
	        
	        $(this).closest('.obsdel').parent().prev().remove();
	        
	        
	        var old = $(this).closest('.notesleft').find('.obs').map(function(i,e){ return e.innerText.trim(); }).get().join(" \n");
	        
	
	           viewstate['inotes'+a+'_'+i] = old.trim();
	           
	        $(this).closest('.obsdel').parent().remove();
	        
	        viewstate.dirty = true;
	        updateView();
	        return false;
	        
        });
        
        setTimeout(function() {
        $('html').one('click', function() {  $('.obsdel .indicatormenu').remove(); });
        },10);
      
      
        return false;
        

    });*/
    
    $('#tools-details').on('change', 'input, select, textarea', function() {
		viewstate[this.id] = $(this).val();
		
		viewstate.dirty = true;
		
		$('body').removeClass('reading foundation').addClass(viewstate.ca1sub);
		if(viewstate.ca == 1 && viewstate.ca1sub == 'foundation') { viewstate.ca = 2; updateView(); }
		if(viewstate.ca == 2 && viewstate.ca1sub == 'reading') { viewstate.ca = 1; updateView(); }
	
	});
	

	

    $("#details-submit").click(function(){
          if($('#details-submit').is('.disabled')) return false;
        
        	$('#detailsModal .form-control:not([readonly])').each(function(i,e) {
        		if($(e).val() || !viewstate[e.id])
    				viewstate[e.id] = $(e).val();
    		});
        	//viewstate.teacher = $("#detailsform input[name=teacher]").val();
        	
        	if(viewstate.subject == 1 && viewstate.grades == 1) {
        		viewstate.ca1sub = $('#detailsModal #ca1sub').val();
				$('body').removeClass('reading foundation').addClass(viewstate.ca1sub);
			}
        	
    		_gaq.push(['_trackEvent', 'Details', 'Submit' ]);
            
    		
    		$('#tools-details input, #tools-details textarea, #tools-details select').each(function() {
    			if(viewstate[this.id])
    				$(this).val(viewstate[this.id]).trigger('change');
    			
    		});      
        	
        	viewstate.dirty = true;
        	
        	updateView();
        	
        	$('#detailsModal').modal('hide');
        	//$('#detailsModal .close').trigger("click");
          
          return false;
    });
    $('#details-skip').click(function(){
    	_gaq.push(['_trackEvent', 'Details', 'Skip' ]);
    });
    
    $("#save-submit").click(function(){

        _gaq.push(['_trackEvent', 'Sync' ]);

    	viewstate.title = $("#saveform input").val();
    	viewstate.notes = $("#saveform textarea").val();
    	
    	viewstate.dirty = true;
    	
    	$("#saveModal .close").trigger("click");
    	
    	if(!window.loggedin) {
    		loggingIn = true;
			$(".loginbtn").trigger("click");
			return false;
		}
    	
    	
    	/*
        var saveobj = {
            title:$("#saveform input").val(),
            notes:$("#saveform textarea").val(),
            text:globals.searchText,
            grade:globals.searchGrade
        };

        $.post( site.root_uri + '/coaching-save-search', saveobj, function(data){
            if(data.success){
                $("#saveModal .close").trigger("click");
            }else{
                alert("error");
            }
        }, "json" );
		*/
		
        return false;
    });
    
    
	var submitValues = function(url, params) {
	    var form = [ '<form method="POST" target="_blank" action="', url, '">' ];
	
	    for(var key in params) 
	        form.push('<input type="hidden" name="', key, '" value="', Mustache.escape(params[key]), '"/>');
	
	    form.push('</form>');
	
	    jQuery(form.join('')).appendTo('body')[0].submit();
	}

  $('.savedata').on('click', '.btn-email', function() {
    $.get('/coaching-get-data/' + this.hash.split('#')[1], 
		function(d) { 
			//loadSavedData(d);
			window.viewid = d.id;
			viewstate = JSON.parse(d.data);
			var oldclass = viewstate.mainclass;
			viewstate.mainclass = 'savedsearches';
	//if(!viewstate.ca) viewstate.ca = 1; // for old saves
	//window.viewid = data.id;
	//$('html,body').animate({scrollTop:0}, 500);
			updateView();
			
			viewstate.mainclass = oldclass;
			
			$("#savedSearchesBtn").click();
			$('.act-email').click();
		}, 'json'); 
		return false;
  });
  
  	
  $('.act-email').click(function() {
    $('#emailform textarea').height($(window).height() - 496);
  });

	// email
 	$("#email-submit").click(function(){
 		_gaq.push(['_trackEvent', 'Email', 'Omit Scale:' + ($('#email_omit:checked').size()?'Yes':'No') ]);
 		
 		viewstate.shared = 1;
 		viewstate.dirty = true;
 		
 		
 		var $body = $('.step-4 .form').clone();
		 if( $('#email_omit:checked').size()) $body.find('.obsomit').remove();
		 if( $('#email_omitnotes:checked').size()) $body.find('.obsomitnotes').remove();
 		
    $body.find('.header-left, .header-right').wrapAll('<table style="width:80%">').wrapAll('<tr>').wrap('<td>').css('width', '100%');
    $body.find('table').eq(0).after('<hr>');
    	var url = location.protocol + '//' + location.hostname + location.pathname + '#static/' + window.pdf_viewid + '/' + ($('#email_omit:checked').size()?'1':'0') + '/' + ($('#email_omitnotes:checked').size()?'1':'0');

		$.post( site.root_uri + '/coaching-mail', { 'url': url, 'comments':nl2br($("#emailform textarea").val()), 'mailto': $("#emailform input").val(), 'omit':0/*unused*/, 'copyme':$('#email_copyme:checked:visible').length }, function() {}, "json" );
		
		$("#emailform textarea, #emailform input:eq(0)").val('');
		
		$('.modal.in').modal('hide'); 
		$('<div class=modal><div class=modal-dialog><div class=modal-content><div class=modal-header><button type="button" class="close" data-dismiss="modal">&times;</button></div><h2>Your observation has been sent.</h2></div></div></div>').modal();
		
		if($('#main').hasClass('coaching-savedsearches')) {
		 $('a[href="#' + window.viewid + '"]:eq(0)').parent().prev().html('<i class="icon icon-sapicon-check"></i>');
		}
	});
	
	$('.act-print').click(function() {
		_gaq.push(['_trackEvent', 'UI', 'Print']);
	});
	
	$('.feedback').click(function() {
		_gaq.push(['_trackEvent', 'UI', 'Send Feedback']);
	});
	
	$('#print-submit').click(function() {
		$('body').toggleClass('print_omitrating', $('#print_omit').is(':checked'));
		$('body').toggleClass('print_omitnotes', $('#print_omitnotes').is(':checked'));
		$('.modal.in').modal('hide');
		
		print();
	});

	
    //export
    $(".pdfBtn, .rtfBtn").click(function(){
        $(".pdfBtn, .rtfBtn").removeClass("selected");
        $(this).addClass("selected");
        $('#export-submit').trigger('click');
        return false;
    });
    
    

    $("#export-submit").click(function(){
    	var params = {
				//viewstate: JSON.stringify(viewstate),
				tpldata: JSON.stringify(generateTemplateData()),
				omit: $('#omit:checked').length,
				omitnotes: $('#omitnotes:checked').length
				};
				
        if($(".pdfBtn").hasClass("selected")){
        	_gaq.push(['_trackEvent', 'Export', 'PDF - ' + 'Omit Scale:' + ($('#omit:checked').size()?'Yes':'No')]);

			var fn = ["Observation", (new Date()).toLocaleDateString("en-us"), viewstate.details_teacher].join(" ").replace(/\//g,'-').replace(/[^A-Za-z0-9-]+/g, '_') + '.pdf';
			window.open('pdf2.php?url=' + encodeURIComponent(location.protocol + '//' + location.hostname + location.pathname + '#static/' + window.pdf_viewid + '/' + params.omit + '/' + params.omitnotes) + '&filename=' + encodeURIComponent(fn) );        	
			
			$('.modal:visible').modal('hide');
        	
        	//submitValues('pdf.php', params);
        	
        	//var pdfhtml = $('html').clone();
        	//pdfhtml.find('header, footer, body > :not(#main), #main > :not(.steps), .steps > :not(.step-4)').remove();
        	//pdfhtml.addClass('staticreview');
        	
            //window.open("pdf.php?html=test");
            //window.open("pdf.php?viewstate=" + JSON.stringify(viewstate));

        }else if($(".rtfBtn").hasClass("selected")) {
        	_gaq.push(['_trackEvent', 'Export', 'RTF - ' + 'Omit Scale:' + ($('#omit:checked').size()?'Yes':'No')]);
            //window.open("rtf.php?html=test");
            var tpl = generateTemplateData();
            if(viewstate.subject==1&&viewstate.grades==1&&viewstate.ca1sub=="reading") {
				tpl.actions.splice(1,1);
				for(var i in tpl.actions[0].indicators) {
					if(viewstate['obs'+(1+0)+'_'+(1+i)] == undefined) tpl.actions[0].indicators[i].obs = "NO";
				}
			}
            if(viewstate.subject==1&&viewstate.grades==1&&viewstate.ca1sub=="foundation") tpl.actions.splice(0,1);
            if(viewstate.subject==2) {
				for(var i in tpl.actions[0].indicators) {
					if(viewstate['obs'+(1+0)+'_'+(1+i)] == undefined) tpl.actions[0].indicators[i].obs = "NO";
				}
			}
            params.tpldata = JSON.stringify(tpl);
            params.tpldata = params.tpldata.replace(/<a data-footnote.*?<\/a>/g, '');
            submitValues('rtf.php', params);
            //window.open("rtf.php?viewstate=" + JSON.stringify(viewstate));
        }else{
            //show error
        }
        });
        

    //submit on enter
    $('input').keypress(function(e){
        if(e.keyCode == 13 && $(this).closest('form').size()) {
            $(this).closest('form').find('.btn-goforward').click();
        }
    });
    
    $('.warning .close').click(function() { $('.warning').removeClass('shown');
		window.seenWarning = true;
	 });
    
});

function nl2br(s) {
	if(!s) return '';
	return s.replace("\n","<br>\n");
}

function lineify(txt) {
	return $.map(txt.split('\n'), 
				function(v){return {'line':v||''}; });
}


function lineify_rigor(txt) {
	var i = -1;
	if(!viewstate['rigor1'] || !viewstate['rigor2']) return lineify(txt);
	
	return $.map(txt.split(' \n'), 
				function(v){i++; return {'line':v||'', 'rigor1':(viewstate['rigor1'][i]||'').split(', '), 'rigor2':(viewstate['rigor2'][i]||'').split(', ') }; });
}

function obslabel(a,i,num) {
	if(num === undefined) return '';
  //if(viewstate.subject == 1 && viewstate.grades == 1 && a == 1 && num == 1) return 'Yes';
	if(num == 5) return 'NA';
	if(viewstate.subject <= 2 && activeStrings().actions[a].indicators[i].ratings.length < 4 && num == 1) return 'Yes';
	if(viewstate.subject <= 2 && activeStrings().actions[a].indicators[i].ratings.length < 4 && (num == 4||num == 5)) return 'No';
	
	
	return num;
}

for(var i=1;i<=12;i++)
	$('#details_mm').append('<option>' + i +'</option>');
for(var i=1;i<=31;i++)
	$('#details_dd').append('<option>' + i +'</option>');
for(var i=100;i<=200;i++)
	$('#details_yy').append('<option value='+i+'>' + (1900+i) +'</option>');

viewstate.details_mm = (new Date()).getMonth()+1;
viewstate.details_dd = (new Date()).getDate();
viewstate.details_yy = (new Date()).getYear();

function getObsDesc(a,i,val) {
		if(val === undefined) return "";
		var aNum =a ;
		var iNum = i;
		
		var labels = scalelabels[ scaleIndexes[viewstate.subject-1][viewstate.grades-1] ][aNum][iNum];
		
    //if(viewstate.subject <= 2 && activeStrings().actions[a].indicators[i].length < 4 && val == 5) val = 3;
    //if(viewstate.subject == 1 && viewstate.grades == 1 && a == 0 && val == 5) val = 3;
        
        
        if(viewstate.subject <= 2 && val == 5) {
			if( (viewstate.subject == 1 && viewstate.ca1sub == "foundation" && a <= 1) || a == 0) {
				return activeStrings().actions[a].indicators[i].ratings[1].label;
			}
		}
        
		if(val == 5) return "Not Observed.";
		
    if(labels.length == 5) {
      return labels[val];
    }
    if(labels.length == 4 && viewstate.subject < 3) {
      return labels[val - 1];
    }
    if(labels.length == 3 && viewstate.subject < 3) {
      if(val == 1) return labels[2];
      if(val == 4) return labels[1];
      return labels[0];
    }
    if(labels.length == 4) {
      return labels[4 - val];
    }
		else if(labels.length == 2) {
			if(viewstate.subject <= 2 && activeStrings().actions[a].indicators[i].ratings.length < 4) val = 4 - val;
			if(val < 3) return labels[0];
			return labels[1];
		}
		else {
			//$('#scaleModal .illustrative').text(labels[0]);
			if(val == 1) return('The teacher does not provide students opportunity and very few students demonstrate this behavior.');
			if(val == 2) return('The teacher provides students opportunity inconsistently and few students demonstrate this behavior.');
			if(val == 3) return('The teacher provides students opportunity consistently and some students demonstrate this behavior.');
			if(val == 4) return('The teacher provides students opportunity consistently and all students demonstrate this behavior.');
		}
		

}

function addRes(url) {
	_gaq.push(['_trackEvent', 'Add Resource', url ]);
	
	$.get(url, function(data) {
		var m, title, desc;
		if(m = data.match(/<title>Achievethecore.org :: (.*?)<\/title>/)) {
			title = m[1];
		}
		if(m = data.match(/<meta name="description" content="(.*?)">/)) {
			desc = m[1];
		}
		
    if(!title) title = url.split(location.hostname)[1];
    if(!desc) desc = ' ';
		if(title && desc) {
			$('#tools-res .added-container').append( Mustache.render( $('#addres-template').html(), {title:title,desc:desc,link:url} ) );
			$('#addurl').val('');
			
			viewstate['suggested'] = $('#tools-res .added-container').html();
			viewstate.dirty=true;
			
			updateView();
		}
	
	});
}

function activeStrings() {
	return [
		[strings_ela_k2,strings_ela_312],
		[strings_math_k8, strings_math_hs]
		][viewstate.subject-1][viewstate.grades-1];
}

function getAllChoices(a, i) {
	if(viewstate.subject > 2) {
		return $.map([4,3,2,1,5], function(x) {
			return { 'label':getObsDesc(a,i,x), 'value':obslabel(a,i,x), 'active':(x==(viewstate['obs'+(1+a)+'_'+(1+i)]||5)?'active':'') };
		});
	}
	
	return $.map(activeStrings().actions[a].indicators[i].ratings, function(x) {
		var xval2 = x.value;
		/*if(a == 0 && viewstate['obs'+(1+a)+'_'+(1+i)] === undefined)*/ xval2 = x.value.replace("No", "5");
		var value_num = obslabel(a,i,viewstate['obs'+(1+a)+'_'+(1+i)]);
		if(a == 0 && viewstate['obs'+(1+a)+'_'+(1+i)] === undefined) value_num = '5';
		value_num = (""+value_num).replace('NA', '5').replace('No', '5');
		return { 'label':x.label, 'value':obslabel(a,i,x.value), 'active':(xval2==(value_num)?'active':'') };
	});
	
}
function generateTemplateData() {
	var tpldata;

	tpldata = {'actions':$.map(
			corestructure[viewstate.subject-1][viewstate.grades-1], 
			function(v,k){return {
				num:1+k,
				num2:((viewstate.subject == 1 && viewstate.grades == 1) ? (1+Math.max(0,k-1)) : 1+k),
				sub:((viewstate.subject == 1 && viewstate.grades == 1) ? (activeStrings().actions[k].sub) : ''),
				indicators:$.map(
					v, 
					function(v,k0){ return {
						alpha:['A','B','C','D','E','F','G'][k0],
						inum:1+k0,
						text:v,
						rigor1:(viewstate.subject==2&&k0==2&&k==0)?$('#tools-details .rigora.active').map(function(){ return this.innerText||this.textContent; }).get():[],
						rigor2:(viewstate.subject==2&&k0==2&&k==0)?$('.step-3 .rigora.active').map(function(){ return this.innerText||this.textContent; }).get():[],
						obs:obslabel(k,k0,viewstate['obs'+(1+k)+'_'+(1+k0)]||5),
						obsdesc:getObsDesc(k,k0,(viewstate['obs'+(1+k)+'_'+(1+k0)]||5)),
						allchoices:getAllChoices(k,k0),
            obsnotes: viewstate['inotes'+k+'_'+k0] ? (viewstate['inotes'+k+'_'+k0].split(' \n').map(lineify)) : undefined,
						notes: (viewstate.subject==2&&k0==2&&k==0) ? lineify_rigor(viewstate['inotes'+k+'_'+k0]||'') : lineify(viewstate['inotes'+k+'_'+k0]||'')
					} }),
				text:(viewstate.subject > 2 ? (viewstate.subject == 2 ? coreActions_M[k] : coreActions_ELA[k]) : activeStrings().actions[k].desc ),
				notes:lineify(viewstate['notes'+k]||'')
				
				};
			}) 
		};
	for(var k in viewstate) {
		if(k.split('_')[0] == 'details' && viewstate[k]) {
			tpldata[k] = viewstate[k];
		}
	}
	if(tpldata.details_standards) tpldata.details_standards = tpldata.details_standards.replace(',', ', ');
	
	tpldata.subject = subject_name[viewstate.subject];
	tpldata.grades = gradeband_name[viewstate.subject][viewstate.grades];
	
	tpldata.rigors = $('#tools-details .rigora.active').map(function(){ return this.innerText||this.textContent; }).get().join(", ");
	
	tpldata.date = [1900 + 1*viewstate.details_yy, viewstate.details_mm, viewstate.details_dd].join('-');
	
	tpldata.suggested = viewstate.suggested;
	
	tpldata.suggested_data = $('#tools-res .added-container .added-res').map(function() { return {title:$(this).find('h3 a').text(), link:$(this).find('h3 a').attr('href'), desc:$(this).find('p').text() }; }).get();
	
	return tpldata;
}


function updateView() {
		$('#tools-details a:eq(0), #detailsModal a:eq(0)').attr('href', 
		viewstate.subject == 2 ? 
		'http://www.corestandards.org/Math'
		: 'http://www.corestandards.org/ELA-Literacy'
		);
	
	$('body').removeClass('reading foundation').addClass(viewstate.ca1sub);
		if(viewstate.ca == 1 && viewstate.ca1sub == 'foundation') { viewstate.ca = 2; }
		if(viewstate.ca == 2 && viewstate.ca1sub == 'reading') { viewstate.ca = 1; }
	$("#main").removeClass().addClass('container').addClass('coaching-' + viewstate.mainclass);
	
	if(viewstate.step == 1) viewstate.mode = 'notes';
	else viewstate.mode = 'guide';
	$('#main').toggleClass('coaching-notes', viewstate.mode == 'notes');

	// commit changes before wiping out the text areas - click has to remove textareas or this will blow up
	if($('.indicatormenu textarea').length) $('.indicatormenu textarea').next().click();	
  
  $('.steps').css('height', '5000px');
	
	$('.statusnav .active').removeClass('active');
	
	$('.assheader h1').text(subject_name[viewstate.subject]);
	
	$('#details_subject').val($('.assheader h1').text());
	
	$('.assheader h2:eq(0)').text('Grades ' + gradeband_name[viewstate.subject][viewstate.grades]);
	
	$('#detailsModal #details_text, #tools-details #details_text').toggle(viewstate.subject != 2);
	
	$('.rigorq, .rigorslide, .rigorslide + hr').toggle(viewstate.subject == 2);
	
	$('.elak2 select').toggle(viewstate.subject == 1 && viewstate.grades == 1);
	
	//if(!$('#details_grade').val())
	//$('#details_grade').val($('.assheader h2:eq(0)').text());
	
	$('.assheader').toggleClass('backupshown', viewstate.backupguide||false);
	
	
	$('.assheader .col-md-4').toggle(viewstate.step == 4);
	$('#tools-res, a[href="#tools-res"]').toggleClass('wrongstep', viewstate.step != 4);
	$('#tools-notes, a[href="#tools-notes"]').toggleClass('wrongstep', viewstate.step == 4);
	
	$('#tools-res.firsttime:not(.wrongstep):not(.in)').removeClass('firsttime').prev().click();

	
	$('#detailsModal .form-control:not([readonly])').each(function(i,e) {
		if(viewstate[e.id])
			$(e).val(viewstate[e.id]).trigger('change');
		else $(e).val('')
	});
	$('#tools-details .form-control:not([readonly])').each(function(i,e) {
		if(viewstate[e.id])
			$(e).val(viewstate[e.id]).trigger('change');
		else $(e).val('').trigger('change');
	});
	
	$('#saveform input').val(viewstate.title);
	$('#saveform textarea').val(viewstate.notes);
	
	$('#tools-details .rigora').each(function(){$(this).toggleClass('active', !!viewstate['rigor'+$(this).index()]); });
	
	//$('.assheader h2:eq(1)').text('Daily);
	
	// step changed
	if(!$('.step-' + viewstate.step + ':visible').size() || (viewstate.step == 3 && !$('.step-3 .ca').eq(viewstate.ca-1).is(':visible'))) {
		if(viewstate.step == 3)
			_gaq.push(['_trackPageview', '/coaching-guide/step-3/ca-' + viewstate.ca]);
		else
			_gaq.push(['_trackPageview', '/coaching-guide/step-' + viewstate.step]);
	}
	
	$('.statusnav .navstep').eq(viewstate.step-1).addClass('active');
	$('.step').hide();
	$('.step-' + viewstate.step).show();
	
	

	// for coreactions
	
	var tpldata = generateTemplateData();

	if(!window.notetempl_compiled) notetempl_compiled = Mustache.compile($('#notes-template').html());
	$('.step-1 .form').html(notetempl_compiled(tpldata));

	
	if(!window.indtempl_compiled) indtempl_compiled = Mustache.compile($('#indicator-template').html());
	$('.step-2 .form').html(indtempl_compiled(tpldata));
	
	if(!window.obstempl_compiled) obstempl_compiled = Mustache.compile($('#observation-template').html());
	$('.step-3 .form').html(obstempl_compiled(tpldata));
	
	if(!window.revtempl_compiled) revtempl_compiled = Mustache.compile($('#complete-template').html());
	$('.step-4 .form').html(revtempl_compiled(tpldata));
  
	if(!window.printtempl_compiled) printtempl_compiled = Mustache.compile($('#print-template').html());
	$('.step-4 .printonly').html(printtempl_compiled(tpldata));
  
  $('.printonly .header-left, .printonly .ipg-end').addClass('subj'+viewstate.subject).addClass('grade'+viewstate.grades);
  if(viewstate.subject == 2) $('.printonly section.ca-2 h2 + p + h4').append(document.createTextNode('<a data-footnote=\"2\">[i]</a>'));
  $('.printonly .subj2 .intro-copy.subj2 p:eq(1)').append(document.createTextNode('<a data-footnote=\"1\">[i]</a>'));
	
	// reformat br to p for touch
	if('ontouchstart' in window) {
		$('.step-2 .highlightable').each(function() {
			$(this).html(
				$.map( $(this).html().split('<br>'), function(e) { return '<p>'+(e||"&nbsp;")+'</p>'; }).join('')
			);
		});
	
	}
	
	$('#tabs, #tools-progress').empty();
	
	$('#tabs').append('<a class="btn-go" href="#observationmode"><i class="icon icon-atc-notes"></i></a>');
	
	$('.ca').each(function(i,e) {
		var n = i+1;
		if(viewstate.subject == 1 && viewstate.grades == 1) n = 1+Math.max(i-1,0); 
		$('#tabs').append('<a class="btn-go">'+(n)+'</a>');
    $('#tools-progress').append('<a>Core Action '+(n)+'<span class=bar></span></a>');
	});
	$('#tabs').append('<a class="btn-go" href="#review">R</a>');
  $('#tools-progress').append('<a href="#review">Review <span class=bar></span></a>');
	setTimeout(function() { $(window).scroll(); }, 10);
	
	$('.ca').hide();
	$('.ca').eq((viewstate.ca||1) - 1).show();
  
  if(viewstate.step == 3)
    $('#tabs a').eq((viewstate.ca||1) - 0).addClass('active');
  else if(viewstate.step == 4)
    $('#tabs a:last-child').addClass('active');
  else if(viewstate.step == 1)
    $('#tabs a:first-child').addClass('active');    
	
	$('#tabs, #tools-progress, .step-1').off('click', 'a');
	$('#tabs, #tools-progress, .step-1').on('click', 'a', function() {
		if($(this).attr('href') == '#review') {
			viewstate.step = 4;
			viewstate.mode = 'guide';
		}
		else if($(this).attr('href') == '#observationmode') {
			viewstate.step = 1;
			viewstate.mode = 'notes';
		}
		else {
			viewstate.step = 3;
			viewstate.mode = 'guide';
			viewstate.ca = ($(this).data('action') || $(this).index()) + 0;
			var ind = $(this).data('indicator');
			if( ind ) {
				setTimeout(function() {
					$('html,body').animate({scrollTop:$('ul[data-action='+viewstate.ca+'][data-indicator='+ind+']').parent().offset().top }, 500);
				}, 250);
			}
		}
		viewstate.dirty = true;
		$('html,body').animate({scrollTop:0}, 250);
		updateView();
		return false;
	});
	
	if(viewstate.step == 1) { 
		$('.assheader h1').text('Summary');
		$('.assheader h2').text('If you want to transcribe what you see and hear in the lesson while seeing an overview of the Core Actions and indicators, you can type in the notes section. If you want to note observations directly next to the indicator, use the left-hand navigation or click on the Core Action within the summary.');
	}
	if(viewstate.step == 3) { 
		var n = viewstate.ca;
		$('.step-3 .form h2').hide();
		if(viewstate.subject == 1 && viewstate.grades == 1) {
			n = 1 + Math.max(viewstate.ca-2,0);
			if(viewstate.ca < 3)
				$('.step-3 .form h2').show().text(strings_ela_k2.actions[viewstate.ca-1].sub);
			else
				$('.step-3 .form h2').hide();
		}
		$('.assheader h1').text('Core Action ' + n);
		$('.assheader h2').text(tpldata.actions[viewstate.ca-1].text);
	}
	if(viewstate.step == 4){ 
		$('.assheader h1').text('Review');
		$('.assheader h2').text('Please take a moment to review your observations and feedback by scrolling all the way down this page. You may return to and edit the any of the content, if necessary.');
	}
  
  $('.step-3 .observed li:nth-child(1) .desc').each(function() { $(this).text( getObsDesc($(this).parent().parent().data('action')-1, $(this).parent().parent().data('indicator')-1, 1) ); });
  if(viewstate.subject <= 2) {
  $('.step-3 .observed li:nth-child(2) .desc').each(function() { $(this).text( getObsDesc($(this).parent().parent().data('action')-1, $(this).parent().parent().data('indicator')-1, 2) ); });
  $('.step-3 .observed li:nth-child(3) .desc').each(function() { $(this).text( getObsDesc($(this).parent().parent().data('action')-1, $(this).parent().parent().data('indicator')-1, 3) ); });
}
  $('.step-3 .observed li:nth-child(4) .desc').each(function() { $(this).text( getObsDesc($(this).parent().parent().data('action')-1, $(this).parent().parent().data('indicator')-1, 4) ); });
  
  // ca3 illust behavior labels
  $('.step-3 .ca:eq(2) .observed li:nth-child(2) .desc').each(function() { $(this).text( getObsDesc($(this).parent().parent().data('action')-1, $(this).parent().parent().data('indicator')-1, 2) ); });
  $('.step-3 .ca:eq(2) .observed li:nth-child(3) .desc').each(function() { $(this).text( getObsDesc($(this).parent().parent().data('action')-1, $(this).parent().parent().data('indicator')-1, 3) ); });
  
 $('.step-3 .observed li:nth-child(5) .desc').each(function() { $(this).text( 'Not Observed.' ); });
	
	
	if(viewstate.ca == $('.ca').size()) { 
		$('.step-3 .btn-goforward.btn-lg').text('Review Observations');
	}
	else {
		$('.step-3 .btn-goforward.btn-lg').text('Go to Core Action ' + $('#tabs a.active').nextAll(':visible').eq(0).text());
	}
	
	
	if(viewstate.subject != 2) { // ELA, HSS, SCI
		window.footnotecounter = 0;
		//applyFootnote($('.notesleft:nth-child(2) ul li:nth-child(2), .step-3 .notesleft:nth-child(6) p, .step-4 .form > div:eq(4) > p:eq(0)'), 'Refer to achievethecore.org/ela-literacy-common-core/text-complexity/ for text complexity resources.');
		//applyFootnote($('.ca:eq(0) .notesleft:eq(1) p:eq(0)'), 'Refer to <a href="http://achievethecore.org/ela-literacy-common-core/text-complexity/" target=_blank>achievethecore.org/ela-literacy-common-core/text-complexity/</a> for text complexity resources.');
	}
	else {
		window.footnotecounter = 0;
		// Math CA2 - Evidence gathered
		//applyFootnote($('ul[data-action=2]').parent().next().find('h4'), 'These actions may be viewed over the course of 2-3 class periods.' );
		if(viewstate.ca == 2) applyFootnote($('.step-3 .form h3'), 'These actions may be viewed over the course of 2-3 class periods.');
		if(viewstate.ca == 3) applyFootnote($('.step-3 .form h3'), 'Some portions adapted from ‘Looking for Standards in the Mathematics Classroom’ 5x8 card published by the Strategic Education Research Partnership (math.serpmedia.org/ tools_5x8.html)<br><br>Some or most of the indicators and student behaviors should be observable in every lesson, though not all will be evident in all lessons.');
		
		applyFootnote($('.step-1 h3:eq(1), .step-2 h3:eq(1), .step-3 h3:eq(1), .step-4 h2:eq(2)'), 'These actions may be viewed over the course of 2-3 class periods.');
		// CA3 desc
		applyFootnote($('.step-1 h3:eq(2), .step-2 h3:eq(2), .step-3 h3:eq(2), .step-4 h2:eq(3)'), 'Some portions adapted from ‘Looking for Standards in the Mathematics Classroom’ 5x8 card published by the Strategic Education Research Partnership (math.serpmedia.org/ tools_5x8.html)<br><br>Some or most of the indicators and student behaviors should be observable in every lesson, though not all will be evident in all lessons.');
		//applyFootnote($('ul[data-action=3]').parent().next().find('h4'), 'Some or most of the indicators and student behaviors should be observable in every lesson, though not all will be evident in all lessons.' );
		
	}
	
	// illustrative student behavior pseudo-footnotes on step 3
	
	
	//$('.step-3 h3:eq(2) ~ .notesleft p').each(function(i,e){if(scalelabels[ scaleIndexes[viewstate.subject-1][viewstate.grades-1] ][2][i]) $(this).append('<p><a title="'+ scalelabels[ scaleIndexes[viewstate.subject-1][viewstate.grades-1] ][2][i] +'">Illustrative Student Behavior</a></p>').find('a').tooltip({container:'#main',html:true}); });

	//$('.step-1 h3:eq(2) ~ ul li').each(function(i,e){if(scalelabels[ scaleIndexes[viewstate.subject-1][viewstate.grades-1] ][2][i]) $(this).append('<p><a title="'+ scalelabels[ scaleIndexes[viewstate.subject-1][viewstate.grades-1] ][2][i] +'">Illustrative Student Behavior</a></p>').find('a').tooltip({container:'#main',html:true}); });
	
	// old illustrative ...
	if(viewstate.subject > 2) {
	$('.step-3 .ca:eq(2) .notesleft h4+p').each(function(i,e){if(scalelabels[ scaleIndexes[viewstate.subject-1][viewstate.grades-1] ][2][i]) $(this).append('<p>'+ scalelabels[ scaleIndexes[viewstate.subject-1][viewstate.grades-1] ][2][i] +'</p>');  });
	$('.step-1 h3:eq(2) ~ ul li').each(function(i,e){if(scalelabels[ scaleIndexes[viewstate.subject-1][viewstate.grades-1] ][2][i]) $(this).append('<p>'+ scalelabels[ scaleIndexes[viewstate.subject-1][viewstate.grades-1] ][2][i] +'</p>');  });
	}
	
	$('.step-2 h3:eq(2) ~ ul li').each(function(i,e){if(scalelabels[ scaleIndexes[viewstate.subject-1][viewstate.grades-1] ][2][i]) $(this).append('<p><a title="'+ scalelabels[ scaleIndexes[viewstate.subject-1][viewstate.grades-1] ][2][i] +'">Illustrative Student Behavior</a></p>').find('a').tooltip({container:'#main',html:true}); });
	
	if(viewstate.subject == 2 || viewstate.subject == 1) { 
		$('ul[data-action=1]').addClass('yesno').prev().text("SELECT A RATING");
		$('ul[data-action=1] li:nth-child(1) .encircled').text('YES');
		$('ul[data-action=1] li:nth-child(4) .encircled').text('NO');
    
    for(var ind in activeStrings().actions[1].indicators) {
	    if(activeStrings().actions[1].indicators[ind].ratings.length == 3) {
	  		$('ul[data-action=2][data-indicator='+(1*ind+1)+']').addClass('yesno').prev().text("SELECT A RATING");
	  		$('ul[data-action=2][data-indicator='+(1*ind+1)+'] li:nth-child(1) .encircled').text('YES');
	  		$('ul[data-action=2][data-indicator='+(1*ind+1)+'] li:nth-child(4) .encircled').text('NO');
	      $('.step-4 .form h2 ~ div:lt(8) ul.observed').addClass('yesno');
	    }
    }
		
		$('.step-4 .form h2 ~ div:lt(3) ul.observed').addClass('yesno');
    
    
    
    if(viewstate.subject == 2) {
    //$('.ca:eq(0) .notesleft:eq(2) .observed').after($('#tools-details .rigorq, #tools-details .rigorslide').clone());
    $('.ca:eq(0) .notesleft:eq(2) .obsnotes').after($('#tools-details .rigorq, #tools-details .rigorslide').clone());
    $('.ca:eq(0) .notesleft:eq(2) .rigorq').html('Note the aspect(s) of rigor targeted in <b>this lesson</b>:');
    $('.ca:eq(0) .notesleft:eq(2) .rigorq').after('<a href="#" style="display:block;margin-bottom:20px" onclick="$(\'#tools .panel-collapse.in:not(#tools-details)\').collapse(\'hide\');$(\'#tools-details\').collapse(\'show\');$(\'#tools-details\').scrollTop($(\'#tools-details .rigorq\').position().top + $(\'#tools-details\').scrollTop() );return false">Reference previously selected aspects of rigor</a>');
    $('.ca:eq(0) .notesleft:eq(2) .rigora').removeClass('active');
    $('.ca:eq(0) .notesleft:eq(2) .rigora').removeClass('active');
    
		
    $('#tools-details .rigora').each(function(){$(this).toggleClass('active', !!viewstate['rigor'+$(this).index()]); });
    $('.step-3 .rigora').each(function(){$(this).toggleClass('active', !!viewstate['CA1ICrigor'+$(this).index()]); });
    }
    
    $('.step-3 .ca:gt(0) .observed:not(.yesno)').each(function() { $(this).prepend($(this).children(':lt(4)').get().reverse()); })
    
    
    
	}
	
	// fix up non-templated state
	
	$('.step-2 .highlightable').each(function(i,e) {
		if(viewstate['hnotes'+i])
			$(this).html(viewstate['hnotes'+i]);
	});
	
	$('.step-3 ul.observed').each(function() {
		var o = viewstate['obs' + $(this).data('action') + '_' + $(this).data('indicator')];
    if(viewstate.subject == 1 && o < 5) {
		if(activeStrings().actions[$(this).data('action')-1].indicators[$(this).data('indicator')-1].ratings.length == 5) {
			o = 5 - o;
		}
	}
    if(viewstate.subject == 2 && $(this).data('action') > 1 && o !== undefined && o < 5) { o = 5 - o; }
		if(o !== undefined) $(this).find('.encircled').eq(o-1).css('transition', 'none').addClass('active');
	});
	
	// show Add Observation only if no observations 
	// $('.addobs').each(function() { $(this).toggle($(this).parent().next('.obsnotes').find('.obs').length===0); });
  
  $('.ie .step-3 span.desc:empty').addClass('empty');
  
  	// bold teacher/student behaviors
	$('.ca .notesleft p:nth-child(2), .step-1 .notesleft li, .step-4 section h4 + p').each(function() { if( /teacher[\s\S]*[.][\s\S]*student/i.test($(this).text()) ) $(this).html( $(this).html().replace(/(Teacher|Students?)([\s\S]*?)\./gi, "<b>$1</b>$2.") ); });
	
	$('#tools-res .added-container').html(viewstate.suggested);
	
	$('.step-4 .added-container').html(viewstate.suggested);
	
	if(viewstate.subject == 1 && viewstate.ca1sub == 'foundation')
		$('.step-4 .form section:gt(1) span.obs-NA').each(function() {
			$(this).parent().parent().after('<h4 class="obsXomit">Goal:</h4><ul class="observed obsXomit ideal"><li><span class="encircled active obs-4">4</span><span class="desc">'+ getObsDesc( $(this).parent().data('action')-1, $(this).parent().data('indicator')-1, 4) +'</span></li></ul>');
			});
	else
		$('.step-4 .form section:gt(0) span.obs-NA').each(function() {
			$(this).parent().parent().after('<h4 class="obsXomit">Goal:</h4><ul class="observed obsXomit ideal"><li><span class="encircled active obs-4">4</span><span class="desc">'+ getObsDesc( $(this).parent().data('action')-1, $(this).parent().data('indicator')-1, 4) +'</span></li></ul>');
			});
	
	$('.step-4 .yesno span.obs-NA').text('NO');
			
	$('.printonly .obs-Yes, .printonly .obs-No').parent().parent().addClass('yesno');
	
	
	if(!$('.warning').hasClass('shown')) $('#tools, .warning').addClass('anim-ok');
	setTimeout(function() { $('#tools, .warning').removeClass('anim-ok') }, 650);
	
	if($('.warning').hasClass('shown') && viewstate.step != 4) {
		window.seenWarning = true;
	}
	
	if(viewstate.subject == 1 && viewstate.ca1sub == 'foundation')
		$('.warning').toggleClass('shown', !!(!window.seenWarning && (viewstate.subject <= 2) && (viewstate.step == 4) && $('section.ca-2 ul span.encircled.obs-NA').length));
	else
		$('.warning').toggleClass('shown', !!(!window.seenWarning && (viewstate.subject <= 2) && (viewstate.step == 4) && $('section.ca-1 ul span.encircled.obs-NA').length));
	
	//$('.step-4 .header-left h3').text(subject_name[viewstate.subject]);
	if(gradeband_name[viewstate.subject][viewstate.grades] == "HS") $('.form .header-left h4').text('HS | Lesson');
  $('.subj2 .guidetype-row h3:eq(0)').text('MATH');
	
	$('#tools-notes textarea:eq(0)').each(function(){ if(!$(this).val()) $(this).addClass('tip'); });
  
  	// new footnotes!
	window.fns = []; 
	$('.assheader h2, .step-1:visible .form *, .step-3:visible .form .ca:visible *, .step-4:visible .form *').contents().filter(function(e,i) { var t=this; if(this.nodeType == 3) this.nodeValue=this.nodeValue.replace(/<a data-footnote="(\d)">\[i\]<\/a>/,function(m,d){window.fns.push([t.parentNode,d]); return ''; }); });
  for(var fn in fns) {
		applyFootnote($(fns[fn][0]), activeStrings().footnotes[fns[fn][1]-1].replace(/^\d[.]\s+/, ''));
	}
	window.fns = []; 
	$('.step-4:visible .printonly *').contents().filter(function(e,i) { var t=this; if(this.nodeType == 3) this.nodeValue=this.nodeValue.replace(/<a data-footnote="(\d)">\[i\]<\/a>/,function(m,d){window.fns.push([t.parentNode,d]); return ''; }); });
  var fn_count = 1;
  for(var fn in fns) {
    $('.printonly').append('<div class=footnote>'+ fn_count + ' ' + activeStrings().footnotes[fns[fn][1]-1].replace(/^\d[.]\s+/, '') + '</div>');
    $(fns[fn][0]).append('<sup>'+fn_count+'</sup>');
    fn_count++;
	}
	
	if(viewstate.grades == 1 && viewstate.subject == 1) {
		$('.reading .step-1 h3:eq(0), .reading .step-4 section:eq(0) h2:eq(0)').after('<h3 style="font-size:26px;letter-spacing:0">for '+ activeStrings().actions[0].sub  +'</h3>');
		$('.foundation .step-1 h3:eq(1), .foundation .step-4 section:eq(1) h2:eq(0)').after('<h3 style="font-size:26px;letter-spacing:0">for '+ activeStrings().actions[1].sub  +'</h3>');
	}
  
  $('.steps').css('height', 'auto');
	
	/*
	for(i in corestructure[viewstate.subject-1][viewstate.grades-1]) {
		console.log('Core Action ' + (i+1));
		console.log(viewstate.subject==1 ? coreActions_ELA[i] : coreActions_M[i]);
		for(j in corestructure[viewstate.subject-1][viewstate.grades-1][i]) {
			console.log(' - Indicator ' + j);
			console.log(' - ' + corestructure[viewstate.subject-1][viewstate.grades-1][i][j]);
		}
	}*/
	
};
	
function doSync() {
	if(!window.viewid) return;
	if(!viewstate.dirty) return;
	viewstate.dirty = false;
	$('.navsave').addClass('disabled').find('i').addClass('icon-spin');
	$.post('/coaching-save-data', {title:viewstate.details_teacher||'',notes:viewstate.details_class||'',subject:subject_name[viewstate.subject]||'',shared:viewstate.shared||0,id:viewid,data:JSON.stringify(viewstate)}, function() { $('.navsave').removeClass('disabled').find('i').removeClass('icon-spin');  } );
}


function maybeShowInstructions() {
	if(!document.cookie.match(/coach_seenguide=seen/) && viewstate.mode != 'notes' && $.support.opacity) {
		$('.fguide').fadeIn(250); 
		$('body').css('position', 'relative');
		$('.fguide').click(function() {
				$('.fguide').fadeOut(250);
				document.cookie = 'coach_seenguide=seen';
			return false;
		});
	}
}

function coachingsearch_response(data) {
	if(data.success)
		window.viewid = data.id;
		
	$('body').removeClass('landing-open');
	$('.landing').fadeOut();
	
	if(viewstate.subject == 1 && viewstate.grades == 1) $('body').addClass('reading');
	
	
	if(!window.loggedin) {
		loggingIn = true;
		$('#loginModal').modal();
	}
	else {
		$('#detailsModal').modal({backdrop:'static',keyboard:false});
		$('#terms').click().parent().hide();
	}
	

	
/*	$('#detailsModal #details_text, #tools-details #details_text').toggle(viewstate.subject != 2);
	
	$('.rigorq, .rigorslide, .rigorslide + hr').toggle(viewstate.subject == 2); */
	
	viewstate.mainclass = 'ass';
	viewstate.step = (viewstate.mode == 'notes') ? 1 : 3;
	viewstate.ca = 1;
	
	viewstate.dirty = true;
	updateView();
	//$("#main").removeClass("coaching-landing").addClass("coaching-ass");
	//$('.step').hide();
	//$('.step-1').show();
	/*
    //store user search
    globals.searchText = $(".question textarea").val();
    globals.searchGrade = $(".gradebuttons .active").html();

    //confirm there are results
    if(data.words.length > 0) {
        //process response
        globals.search_selectedGrade.words = [];
        globals.search_belowGrade.words = [];
        globals.search_aboveGrade.words = [];

        globals.search_selectedGrade.gradeNum = globals.search_belowGrade.gradeNum = globals.search_aboveGrade.gradeNum = numSelectedGrade = parseInt($(".gradebuttons .active").html());
        for(var i=0; i<data.words.length; i++){
            if(data.words[i].grade.toLowerCase() === "k"){

            }else{
                var numGrade = parseInt(data.words[i].grade);
                if(numSelectedGrade == numGrade){
                    globals.search_selectedGrade.words.push(data.words[i]);
                }else if(numSelectedGrade > numGrade){
                    globals.search_belowGrade.words.push(data.words[i]);
                }else{
                    globals.search_aboveGrade.words.push(data.words[i]);
                }
            }
        }

        //populate results page
        $(".details h4").html(returnGradeTxt(globals.searchGrade));
        $(".details p").html(globals.searchText);

        $(".loaddata").html("");
        if(globals.search_selectedGrade.words.length > 0){
            $(".loaddata").append(Mustache.render(templateHolder.TEMPLATES['tpl-searches'], globals.search_selectedGrade));
        }

        if(globals.search_belowGrade.words.length > 0){
            $(".loaddata").append(Mustache.render(templateHolder.TEMPLATES['tpl-searches'], globals.search_belowGrade));
        }

        if(globals.search_aboveGrade.words.length > 0){
            $(".loaddata").append(Mustache.render(templateHolder.TEMPLATES['tpl-searches'], globals.search_aboveGrade));
        }

        //display results page
        $("#main").removeClass("coaching-landing").addClass("coaching-search");
    } else {
        alert("no words found");
    }
    */
}

function login_response(data) {
    if(data.success){
        location.reload();
    }

    errorHandling(data);
}


function registerform_response(data) {
    if(data.success) {
        $("#login-submit").removeClass('disabled');
        $("#profile-submit").removeClass('disabled');
        loggedin = true;

        globals.username = $("#firstname").val() + " " + $("#lastname").val();
        var editing = !!(globals.getprofile);
        globals.getprofile = false;

        $("#registerModal").removeClass("edit");

        $("#registerModal .close").trigger("click");
        $("#profilenamelink").html(globals.username);
        $("body").addClass("loggedin");

        if(viewstate.dirty && !window.viewid) {
        	$.post( '/coaching-new-data', function(data) {
				if(data.success)
					window.viewid = data.id;
			
			}, "json" );
        }
        
        if(loggingIn){
            loggingIn = false;
            $('#detailsModal').modal();
            //$(".saveSearchBtn").trigger("click");
        }
        
        if($('.landing-login:visible')) {
		        viewstate.subject = roledata.subjects;
                viewstate.grades = roledata.grades;
                viewstate.mode = 'notes';
                if(roledata.subjects)
                	$.post( '/coaching-new-data', coachingsearch_response, "json" );
		}

        $.get( "getprofile.php", {}, function(data){
            globals.getprofile = data.user;
            globals.username = data.user.name;
            
            trackprof = [data.user.id, data.user.role, data.user.subject, data.user.grades, 'Register'];
		     var trnames = ['uid', 'role', 'subject', 'grades'];
		     for(var i=1;i<=4;i++)
		        _gaq.push(['_setCustomVar', i, trnames[i-1], trackprof[i-1], 2]);
		    if(!editing)
            	_gaq.push(['_trackEvent', 'Account', trackprof[4]]);
        });
    }else{
        errorHandling(data);
    }
}

function errorHandling(data) {
    $(data.formid + ' a.btn-go').removeClass('disabled');
    $(data.formid + ' .errors').remove();
    $(data.formid + ' .has-error').removeClass('has-error');

    for(var i in data.errors) {
        $(data.formid + ' #' + data.errors[i].id ).parent().prepend('<p class="errors">' + data.errors[i].message + '</p>');
        $(data.formid + ' #' + data.errors[i].id ).parent().addClass('has-error');
    }
}

function removeErrors() {
    $(".form-group.has-error").each(function(){
        $(this).removeClass("has-error");
    });

    $(".errors").each(function(){
        $(this).remove();
    });
}

function returnGradeTxt(thegrade){
    var str = thegrade;
    str = str.split('');
    if(str[0] === '0') str[0] = 'K';
    var pl = str.length>1 ? 's ':' ';
    if(str.join('') == '10' || str.join('') == '11' || str.join('') == '12') pl=' ';
    return 'Grade'+pl+ str;
}



function unwrapOuter(a) {
       if(a.size())
    a.replaceWith(a[0].childNodes);
}

$('.step').on('click', '.indclose', function() {
	var actionindex = $(this).closest('.highlightable').index('.step-2 .highlightable');
	var indidx = $(this).parent().data('indidx');
	
	var hlarea = $(this).closest('.highlightable');
	unwrapOuter($(this).parent().prevAll('.highlighted').eq(0).removeClass('highlighted')); $(this).parent().remove();
    
    //delete viewstate['inotes' + actionindex + '_' + indidx /*$(this).index()*/];
 	viewstate['inotes' + actionindex + '_' + indidx ] = $('.highlightable').eq(actionindex).find('.indicator[data-indidx=' + indidx + ']').prev().map(function(i,e){ return e.innerText||e.textContent; }).get().join("\n"); //highlighting.text();
			
	viewstate['rigor1'] = $('.highlightable').eq(actionindex).closest('.highlightable').find('.indicator').map(function(){return $(this).attr('data-rigor1') }).get();
	viewstate['rigor2'] = $('.highlightable').eq(actionindex).closest('.highlightable').find('.indicator').map(function(){return $(this).attr('data-rigor2') }).get();
	
    viewstate['hnotes' + actionindex] = hlarea.html();
});
//$('.highlightable').on('click', function() { $('.indicatormenu').remove(); });


/*$('html').on('click', ':not(.highlightable)', function(e) {
	if($(e.target).closest('.highlightable').size()) return true; 
	$('.indicatormenu').remove(); 
})*/


if(/static\/(\d+)\/(\d+)/.test(location.hash)) {
	var id = location.hash.split('/')[1];
	var omit = location.hash.split('/')[2];
	var omitnotes = location.hash.split('/')[3];
	$('html').addClass('staticreview');
	$('body').removeClass('landing-open'); $('.landing').hide();
	$.getJSON('/coaching-get-data/' + id + '/static', function(d){ if(omit==='1') $('html').addClass('print_omitrating'); if(omitnotes==='1') $('html').addClass('print_omitnotes'); loadSavedData(d); viewstate.step=4;viewstate.mode="guide";updateView();	$('body').removeClass('landing-open'); $('.landing').hide(); window.status='ready'; } )
}

function mce_whitelist_paste(plugin, args) {
	// strip out uncool tags (although mce likes to use span for underlines...)
	args.content = args.content.replace(/<(?!\/?(?:p|br|ul|li|b|em|i|strong|u)\b).*?>/g, '');
}

var templateLoader = function (options) {
    "use strict";

    var self = this,
        settings = {
            loadpath:"",
            templateHolder: { TEMPLATES: {} }
        };
    $.extend(settings, options);

    this.loadTemplates = function (callback) {
        $.get(settings.loadpath, function (tpl) {
            $(tpl).filter("script").each(function (i, elm) {
                settings.templateHolder.TEMPLATES[$(elm).attr("id")] = $(elm).html();
            });

            if(typeof callback === "function") callback();
        });
    };
};
