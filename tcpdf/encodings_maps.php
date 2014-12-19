<?php
//============================================================+
// File name   : encodings_maps.php
// Version     : 1.0.001
// Begin       : 2011-10-01
// Last Update : 2011-11-15
// Author      : Nicola Asuni - Tecnick.com LTD - Manor Coach House, Church Hill, Aldershot, Hants, GU12 4RQ, UK - www.tecnick.com - info@tecnick.com
// License     : GNU-LGPL v3 (http://www.gnu.org/copyleft/lesser.html)
// -------------------------------------------------------------------
// Copyright (C) 2008-2012  Nicola Asuni - Tecnick.com LTD
//
// This file is part of TCPDF software library.
//
// TCPDF is free software: you can redistribute it and/or modify it
// under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// TCPDF is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// See the GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with TCPDF.  If not, see <http://www.gnu.org/licenses/>.
//
// See LICENSE.TXT file for more information.
// -------------------------------------------------------------------
//
// Description : Unicode data for TCPDF library.
//
//============================================================+

/**
 * @file
 * Font encodings maps class for TCPDF library.
 * @author Nicola Asuni
 * @package com.tecnick.tcpdf
 * @since 5.9.123 (2011-10-01)
 */

/**
 * @class TCPDF_ENCODING_MAPS
 * This is a PHP class containing Font encodings maps class for TCPDF library.
 * @package com.tecnick.tcpdf
 * @version 1.0.000
 * @author Nicola Asuni - info@tecnick.com
 */
class TCPDF_ENCODING_MAPS {

/**
 * Array of Encoding Maps.
 * @public
 */
public $encmap = array(

// encoding map for: cp1252
'cp1252' => array(0=>'.notdef',1=>'.notdef',2=>'.notdef',3=>'.notdef',4=>'.notdef',5=>'.notdef',6=>'.notdef',7=>'.notdef',
8=>'.notdef',9=>'.notdef',10=>'.notdef',11=>'.notdef',12=>'.notdef',13=>'.notdef',14=>'.notdef',15=>'.notdef',
16=>'.notdef',17=>'.notdef',18=>'.notdef',19=>'.notdef',20=>'.notdef',21=>'.notdef',22=>'.notdef',23=>'.notdef',
24=>'.notdef',25=>'.notdef',26=>'.notdef',27=>'.notdef',28=>'.notdef',29=>'.notdef',30=>'.notdef',31=>'.notdef',
32=>'space',33=>'exclam',34=>'quotedbl',35=>'numbersign',36=>'dollar',37=>'percent',38=>'ampersand',39=>'quotesingle',
40=>'parenleft',41=>'parenright',42=>'asterisk',43=>'plus',44=>'comma',45=>'hyphen',46=>'period',47=>'slash',
48=>'zero',49=>'one',50=>'two',51=>'three',52=>'four',53=>'five',54=>'six',55=>'seven',
56=>'eight',57=>'nine',58=>'colon',59=>'semicolon',60=>'less',61=>'equal',62=>'greater',63=>'question',
64=>'at',65=>'A',66=>'B',67=>'C',68=>'D',69=>'E',70=>'F',71=>'G',
72=>'H',73=>'I',74=>'J',75=>'K',76=>'L',77=>'M',78=>'N',79=>'O',
80=>'P',81=>'Q',82=>'R',83=>'S',84=>'T',85=>'U',86=>'V',87=>'W',
88=>'X',89=>'Y',90=>'Z',91=>'bracketleft',92=>'backslash',93=>'bracketright',94=>'asciicircum',95=>'underscore',
96=>'grave',97=>'a',98=>'b',99=>'c',100=>'d',101=>'e',102=>'f',103=>'g',
104=>'h',105=>'i',106=>'j',107=>'k',108=>'l',109=>'m',110=>'n',111=>'o',
112=>'p',113=>'q',114=>'r',115=>'s',116=>'t',117=>'u',118=>'v',119=>'w',
120=>'x',121=>'y',122=>'z',123=>'braceleft',124=>'bar',125=>'braceright',126=>'asciitilde',127=>'.notdef',
128=>'Euro',129=>'.notdef',130=>'quotesinglbase',131=>'florin',132=>'quotedblbase',133=>'ellipsis',134=>'dagger',135=>'daggerdbl',
136=>'circumflex',137=>'perthousand',138=>'Scaron',139=>'guilsinglleft',140=>'OE',141=>'.notdef',142=>'Zcaron',143=>'.notdef',
144=>'.notdef',145=>'quoteleft',146=>'quoteright',147=>'quotedblleft',148=>'quotedblright',149=>'bullet',150=>'endash',151=>'emdash',
152=>'tilde',153=>'trademark',154=>'scaron',155=>'guilsinglright',156=>'oe',157=>'.notdef',158=>'zcaron',159=>'Ydieresis',
160=>'space',161=>'exclamdown',162=>'cent',163=>'sterling',164=>'currency',165=>'yen',166=>'brokenbar',167=>'section',
168=>'dieresis',169=>'copyright',170=>'ordfeminine',171=>'guillemotleft',172=>'logicalnot',173=>'hyphen',174=>'registered',175=>'macron',
176=>'degree',177=>'plusminus',178=>'twosuperior',179=>'threesuperior',180=>'acute',181=>'mu',182=>'paragraph',183=>'periodcentered',
184=>'cedilla',185=>'onesuperior',186=>'ordmasculine',187=>'guillemotright',188=>'onequarter',189=>'onehalf',190=>'threequarters',191=>'questiondown',
192=>'Agrave',193=>'Aacute',194=>'Acircumflex',195=>'Atilde',196=>'Adieresis',197=>'Aring',198=>'AE',199=>'Ccedilla',
200=>'Egrave',201=>'Eacute',202=>'Ecircumflex',203=>'Edieresis',204=>'Igrave',205=>'Iacute',206=>'Icircumflex',207=>'Idieresis',
208=>'Eth',209=>'Ntilde',210=>'Ograve',211=>'Oacute',212=>'Ocircumflex',213=>'Otilde',214=>'Odieresis',215=>'multiply',
216=>'Oslash',217=>'Ugrave',218=>'Uacute',219=>'Ucircumflex',220=>'Udieresis',221=>'Yacute',222=>'Thorn',223=>'germandbls',
224=>'agrave',225=>'aacute',226=>'acircumflex',227=>'atilde',228=>'adieresis',229=>'aring',230=>'ae',231=>'ccedilla',
232=>'egrave',233=>'eacute',234=>'ecircumflex',235=>'edieresis',236=>'igrave',237=>'iacute',238=>'icircumflex',239=>'idieresis',
240=>'eth',241=>'ntilde',242=>'ograve',243=>'oacute',244=>'ocircumflex',245=>'otilde',246=>'odieresis',247=>'divide',
248=>'oslash',249=>'ugrave',250=>'uacute',251=>'ucircumflex',252=>'udieresis',253=>'yacute',254=>'thorn',255=>'ydieresis'),


); // end of encoding maps

} // --- END OF CLASS ---

//============================================================+
// END OF FILE
//============================================================+
