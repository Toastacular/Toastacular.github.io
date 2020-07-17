/**********************************************************************************
Your Phone
***********************************************************************************/

//*********************************************************
// SMS's
var bNewSMS;	// Was a sms received just now
var arSMSImages;
var nUnreadSMS;

// An array of sms's by unique id's (they do not have to be contiguous)
// NOTE: currently max allowed is 352, change saves.js, phone.js for arSMSImages from 11 (11 * 32 = 352)
var arSMS;
// Assigned id's
// Ms. Titus	: 1, 2, 3, 4
// Janet Kelly	: 10, 11, 12
// Tracy			: 20, 21, 22, 23
// Amy+Charlie : 30, 31, 32, 33, 39(Charlie)
// Ms.Jones		: 40, 41 (skip 42-43)
// Miss Logan	: 42, 43
// Victoria		: 50, 51, 52, 53, 54, 55, 56
// Jesse			: 60, 61, 62, 63
// Madison		: (for Zoey) 70, 71, (herself) 72, 73
// Zoey			: 79
// Bambi + Mia	: 80, 81, 82, 83, (Mia) 88, 89
// Sarah			: 90, (Conspiracy only) 91, 92
// Diane			: 100, 101, 102, 103, 104, 105, 106
// Angela		: 110, 111, 112, 113, 114
// Donna			: 120, 121, 122
// Alison		: 130, 131, 132
// Ellie+Carol : 140, 141, 142(Carol)
// Church		: 150(Desiree), 151(Pamela)
// Catherine	: 160, 161, 162, 163, 164, 165, 166, 167
// Leanne		: 170, 171, 172(Louise)
// Hannah		: 180, 181, 182, 183
// Monique		: 190, 191, 192
// Mom			: 200, 201, 202, 203
// Kerry Batton: 210
// Mrs Granger	: 220, 221, 222
// Nina			: 230, 231, 232
// Kate			: 240, 241-249 (photo only), 255,256,257
// Abby			: 260, 261, 262
// Miku			: 270, 271, 272
//	Didi			: 280, 281
// Kylie			: 290, 291, 292
// Robbins		: 300, 301(Mrs)
// Kristin		: 310
// Adamses		: 320 (Tess)
// Emily			: 330, 331, 332
// Nella			: 340, 341
// Elian			: 349, 350, 351		(NOTE: cannot currently exceed 351)

// Popup to notify of an SMS
function newSMS()
{
	bChat = false;
	setTimeout(updateRightBar, 100);
	setCommentsNoClick('<table><tr><td style="width:15%"><img src="UI/smsblack.png" style="width:95%;float:left" alt="SMS"></td><td><p><b>Incoming SMS</b><br>Your phone chimes to indicate you have just received an SMS.</p>');
	addOptionLink("comments", 'check your SMS messages', "ClearComments();showRightBar(gameState.nRightBarState + 2,'sms')");
	addOptionLink("comments", 'not now', "ClearComments()", "optionblock", "padding-top:0.25em;line-height:0.75em;width:200px;max-width:20%;max-width:14vw;margin-top:0.75em");
	addComments('</td></tr></table>');
}

// Incoming SMS from another (entire exchange)
// delimiters | ~ ^ `
function addSMS(id) { arSMS.push(id); }

// Incoming SMS from another
function receiveSMS(from, txt, img, wid)
{
	if (img === undefined) img = '';
	return from + '^' + txt + '^' + img + (wid !== undefined ? '`' + wid : '') + '|';
}

// Your reply to anothers SMS
function replyToSMS(txt) { return '~' + txt + '~' + '|'; }

// A popup when you receive a phone call
function receiveCall(from, txt, nt)
{
	bChat = false;
	if (nt !== true) {
		showRightBar(gameState.nRightBarState + 2);
		//setTimeout(usePhone, 100);
	}
	setComments('<div class="conversebubble"><table><tr><td style="width:15%;vertical-align:top"><img src="UI/phonecall.png" style="width:95%" alt="Phone Call"></td><td><p>' + (from !== '' ? '<b>Phone call from ' + from + '</b><br>' : '') + txt + '</p></td></tr></table>', txt.indexOf("gblock") == -1);
}

// Make a call/SMS
// from is a text string for phone calls, the person's name
// for SMS's it is a number id
// txt is only used for phone calls
function makeCall(bSMS, from, txt)
{
	if (sType !== "") return false;
	//if (bPopupShown || perYourBody.FindItem(2) === 0 || isCommentsShown()) return false;
	if (bSMS) {
		if (bNewSMS) return false;
		addSMS(from);
		bNewSMS = true;
		nUnreadSMS++;
	} else receiveCall(from, txt, false);
	return true;
}

function makePhoneCall(ps)
{
	if (findPerson(ps) !== null) per.callThem();
}

function addSMSToPhotos(id)
{
	var imdx = Math.floor((id - 1) / 32);
	arSMSImages[imdx] = setBitFlag(arSMSImages[imdx], ((id - 1) % 32) + 1);
}

function addListenMessage(md, txt, ps, js, lnk)
{
	addQuestionR(md, lnk === undefined ? 'listen to the message' : lnk,
		'<div class="conversebubble"><table><tr><td style="width:15%;vertical-align:top"><img src="' + getThemeFolder() + 'phone2.png" style="width:95%" alt="Phone Message"></td><td><p>' +
		txt +
		'</p></td></tr></table>',
		ps, 
		js
	);
}


//*******************
// Phone Wallpapers
var nPhoneWallpapers;
var sPhoneImage;
var arPhotos;

function addWallpapers(wfrom, wto)
{
	for (var i = wfrom; i <= wto; i++) nPhoneWallpapers = setBitFlag(nPhoneWallpapers, i);
}
function removeWallpaper(wall)
{
	nPhoneWallpapers = setBitFlag(nPhoneWallpapers, wall, false);
}

// Phone wallpaper image
function setWallpaper(img, msg)
{
	if (img.substr(0, 7) == "Images/") img = img.substr(7);		// Strip leadimg Images/
	perYou.extra[7] = -1;
	var j;
	if (sPhoneImage !== '' && sPhoneImage != img) {
		for (j = 0; j < arPhotos.length; j++) {
			if (img == arPhotos[j]) break;
		}
		if (j >= arPhotos.length) {
			if (arPhotos.length >= gameState.nMaxPhotos) arPhotos.splice(0, 1);
		} else arPhotos.splice(j, 1);
		arPhotos.push(sPhoneImage);
	}
	sPhoneImage = img;
	if (gameState.nRightBarState >= 3) usePhone();
	var bPop = bPopupShown;
	bPopupShown = false;
	if (msg === undefined) WriteComments("Set as your wallpaper");
	else WriteComments(msg);
	bPopupShown = bPop;
}

//**********************************************
// Use the phone!
function showDelete(doc, no) {
	var el = doc.getElementById("del" + no);
	if (el) el.style.display="block";
}
function hideDelete(doc, no) {
	var el = doc.getElementById("del" + no);
	if (el) el.style.display="none";
}

function rotatePhone()
{
	var sb = gameState.sPhoneState;
	gameState.bPhoneLandscape = !gameState.bPhoneLandscape;
	if (gameState.bPhoneLandscape) {
		hideSidebars();
		usePhone(sb);
	} else {
		showRightBar(-1 * gameState.nRightBarState);
		showLeftBar();
		gameState.sPhoneState = sb;
		updateGameDisplay();
		dispPlace();
	}
}

function usePhone(stypein, no)
{
	gameState.sPhoneState = stypein === undefined ? "type=" : stypein.indexOf("type=") == -1 ? "type=" + stypein : stypein;
	var stype = getQueryParam("type", gameState.sPhoneState);

	var i;

	if (stype === "" || stype === undefined || stype == "alarm" || stype == "sms" || stype == "clear" || stype == "delete" || stype == "addressbook" || stype == "apps" || stype == "game" || stype == "games") {

		if (stype == "clear") {
			// Clear all sms's
			arSMS = new Array();
			gameState.sPhoneState = "";
		} else if (stype == "delete") {
			// Delete an sms exchange
			// no = the index to delete
			arSMS.splice(no, 1);
			if (arSMS.length > 0) {
				gameState.sPhoneState = "type=sms";
			} else {
				gameState.sPhoneState = "";
			}
		} else if (stype == "game") gameState.sPhoneState = "type=game&id=" + no;
		else if (stype == "sms" && no !== undefined) gameState.sPhoneState = "type=sms&id=" + no;
		updateRightBar(true);
		updateMain();
		return;
	}

	if (gameState.bPhoneLandscape) hideSidebars();

	if (stype == "gamebig") gameState.sPhoneState = "type=gamebig&id=" + no;
	else if (stype == "clearphotos") {
		// Clear all photos
		arSMSImages = new Array();
		// SMS Limit: 11 * 32 = 352
		for (i = 0; i < 11; i++) arSMSImages.push(0);
		sPhoneImage = '';
		perYou.extra[7] = 0;
		gameState.sPhoneState = "type=photos";
	}
	else if (stype == "deletephoto") {
		// Delete a photo
		// no = the index to delete
		if (no == -1) {
			sPhoneImage = '';
			perYou.extra[7] = 0;
		} else if (no < 0) {
			arPhotos.splice((no * -1) - 1, 1);
		} else {
			i = Math.floor((no - 1) / 32);
			arSMSImages[i] = setBitFlag(arSMSImages[i], ((no - 1) % 32) + 1, false);
		}
		//gameState.bLBNoShow = false;
		gameState.sPhoneState = "type=photos";
	}
	else if (stype == "deletewallpaper") {
		// Delete a wallpaper
		// no = the index to delete
		removeWallpaper(no);
		gameState.sPhoneState = "type=photos";
	}	

	if (gameState.bPhoneLandscape) updateMain(getPhoneContents());
	else {
		updateRightBar(true);
		updateMain();
	}
}

function getPhoneContents()
{
	var vis = perYou.extra[1];
	perYou.extra[1] = 0;
	var stype = getQueryParam("type", gameState.sPhoneState);
	var sno = getQueryParam("id", gameState.sPhoneState);
	var no = sno;
	var s;

	var i, perSarah;
	var img;
	var wpt = perYou.extra[7] == 1 ? "black" : "white";
	var wa = Math.round(0.045 * gameState.nWidth);
	var ha = Math.round(0.072 * getHeight(document));
	var la = Math.round(0.05 * gameState.nWidth);
	var lal = Math.round(0.1 * gameState.nWidth);
	var ratio = (screen.availWidth / document.documentElement.clientWidth);
	var zoomLevel = Number(ratio.toFixed(1).replace(".", "") + "0");
	var wtab = 5;
	var htab = Math.round(wtab * gameState.nWidth / 100);
	if (!gameState.bPhoneLandscape) {
		wa = wa / 2 - 4;
		la = la / 2 + 4;
		lal = lal / 2 + 4;
		wtab = 10;
		htab = Math.round(wtab * gameState.nWidth / 100 / 4);
	}
	//wtab = wtab * ratio;
	htab = htab / zoomLevel;
	var imdx;
	var p;
	var sDec;
	var ar;
	var k;
	var sr;
	var bTo;
	var ir;
	var id;
	var hr;
	var hm;
	var min;

	function showQuestF(st, comp, desc, nobr, failed, desccomplete, hdr) {
		if (!st) return '';
		if (comp) {
			var ar = desccomplete != undefined ? desccomplete : desc;
			ar = ar.split('&nbsp;');
			ar[ar.length - 1] = '<span style="' + (hdr === true ? 'position:relative;top:0.25em;font-weight:bold;' : '') + 'text-decoration:line-through">' + ar[ar.length - 1] + '</span> ' + (failed === true ? '&#10006;' : '&#10004;');
			desc = ar.join('&nbsp;');
		} else if (hdr === true) desc = '<span style="position:relative;top:0.25em;font-weight:bold">' + desc + '</span>';
		if (nobr !== true) return desc + '<br>';
		return desc;
	}
	function showQuestFH(st, comp, desc, nobr, failed, desccomplete) { return showQuestF(st, comp, desc, nobr, failed, desccomplete, true); }
	function showQuestH(no, desc, failed, desccomplete) { return showQuestF(perYou.isQuestStarted(no), perYou.isQuestComplete(no), desc, false, failed, desccomplete, true); }
	function showQuest(no, desc, failed, desccomplete, hdr) { return showQuestF(perYou.isQuestStarted(no), perYou.isQuestComplete(no), desc, false, failed, desccomplete, hdr); }
	function addHeader(txt) { return '<span style="position:relative;top:0.25em;font-weight:bold">' + txt + '</span><br>'; }
	
	if (stype == "notes1" || stype == "notes2" || stype == "notes3" || stype == "notes4") {
		// Notes header
		s = '<script type="text/javascript">document.onkeypress = stopRKey;initLightbox();</script>' +
			'<div style="position:absolute;text-align:left;cursor:default;vertical-align:top;overflow-x:hidden;overflow-y:hidden;width:100%;height:100vh;min-height:100vh;z-index:46;border-style:none">' +
			'<div style="position:absolute;top:0px;left:0px;background-color:lightsteelblue;width:' + (wtab + 2) + '%;height:92%;margin-left:2%;margin-top:2%;"></div>' +
			'<div style="position:absolute;top:0px;left:0px;background-color:lightblue;width:90%;height:92%;margin-left:' + (wtab + 4) + '%;margin-top:2%;"></div>' +
			"<img draggable='false' style='float:left;position:absolute;max-height:99%;vertical-align:top;padding:0;width:100%;position:absolute;max-height:100vh;height:100vh;border-left:2px;border-style:solid;border-bottom:none;border-top:none;border-right:none;left:0;top:0' src='UI/phone3l.png'>" +
			addOptionLink("string", "Close", "showRightBar(-1*gameState.nRightBarState);showLeftBar();dispPlace()", "chatblock", "position:absolute;margin-top:0;top:6px;left:5px;margin-left:4%;width:20%") +
			'<span class="zoom-icon" style="position:absolute;top:0px;right:25px;width:7%;height:5%"><img draggable="false" style="cursor:pointer;" onclick="rotatePhone();return false" src="UI/rotate.png" width="48" alt="Rotate" title="Rotate"></span>' +
			'<div id="notdiv" style="position:absolute;top:0px;left:0px;text-align:left;margin:' + (ha + 4) + 'px 0px ' + ha + 'px ' + (wtab + 5) + '%;height:85vh;width:86%;overflow:auto;color:black">';
	}

	if (stype === "" || stype === undefined || stype == "alarm" || stype == "sms" || stype == "clear" || stype == "delete" || stype == "addressbook" || stype == "apps" || stype == "game" || stype == "games") {

		// Just opened the phone
		if (perYou.extra[7] == -1) img = sPhoneImage;
		else img = "phonewallpaper" + String.fromCharCode(perYou.extra[7] + 49) + '.jpg';

		s = '<script type="text/javascript">document.onkeypress = stopRKey</script>' +
			'<div style="position:absolute;top:0;left:0;text-align:left;cursor:default;vertical-align:top;width:100%;height:100%;max-height:300vw;z-index:46;color:black">';
		if (img.indexOf(".mp4") != -1) s += '<video width="100%" autoplay muted loop "float:left;position:relative;vertical-align:top;width:95%;min-height:78%;max-height:78%;border-width:0;border-style:none;top:9%;left:5%;margin: 0px 0px 0px 0px;padding:0"><source src="Images/' + img + '" type="video/mp4"></video>';
		else s += '<img style="float:left;position:relative;vertical-align:top;width:95%;min-height:78%;max-height:78%;border-width:0;border-style:none;top:9%;left:5%;margin: 0px 0px 0px 0px;padding:0" src="Images/' + img + '" alt="' + img + '" onerror="onerrorImage(this)">';

		if (stype == "sms") {
			// View SMS's
			nUnreadSMS = 0;
			// no = the name of the person to ONLY show
			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="smsdiv" style="position:absolute;top:9%;left:6%;width:88%;height:72%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
				'<script type="text/javascript">' +
				'function toggleFilter() {' +
					'var el = document.getElementById("selPerson");' +
					'if (el.style.display == "none") {' +
						'el.style.display = "block";' +
						'document.getElementById("clearall").style.display = "none";' +
						'document.getElementById("done").style.display = "none";' +
					'}' +
					'else {' +
						'el.style.display = "none";' +
						'document.getElementById("clearall").style.display = "block";' +
						'document.getElementById("done").style.display = "block";' +
					'}' +
				'}' +
				'function alterPerson() {' +
					'var x = document.getElementById("selPerson").value;' +
					'if (x == "All") x = undefined;' +
					'usePhone("sms",x);' +
				'}' +
				';var myDiv = document.getElementById("smsdiv");' +
				'if (myDiv) myDiv.scrollTop = myDiv.scrollHeight;' +
				'</script>';

			var cnt = 0;
			var ps = '';
			var j;
			for (j = 0; j < arPeople.length - 2; j++) {
				p = arPeople[j];
				for (i = 0; i < arSMS.length; i++) {
					id = arSMS[i];
					if (p.getPersonSMS(id) !== '') {
						cnt++;
						ps += '<option value="' + p.uid + '"' + (no === p.uid ? ' selected ' : '') + '>' + p.getPersonName() + '</option>';
						break;
					}
				}
			}
			for (i = 0; i < arSMS.length; i++) {
				sDec = '';
				id = arSMS[i];
				for (j = 0; j < arPeople.length - 2; j++) {
					p = arPeople[j];
					if (no !== '' && p.uid !== no) continue;
					sDec = p.getPersonSMS(id);
					if (sDec !== '') break;		// Unknown id
				}
				if (sDec === '') continue;		// Invalid id

				ar = sDec.split('|');
				var bAdd = false;
				for (k = 0; k < ar.length; k++) {
					if (ar[k] === '') continue;
					bTo = ar[k].indexOf('~') != -1;
					if (!bAdd) {
						s +=
							'<div onmouseover="showDelete(document,' + i + ')" onmouseout="hideDelete(document,' + i + ')" style="width:100%">' +
							'<div id="del' + i + '" style="display:none;width:100%;z-index:83"><a href="javascript:usePhone(\'delete\',' + i + ')"><img src="UI/themes/theme0/delete.png" style="height:1.2em;float:' + (bTo ? 'left' : 'right') + '" alt="Delete" title="Delete"></a></div>';
						bAdd = true;
					} else s += '<div style="width:100%">';

					if (bTo) {
						// To
						sr = ar[k].split('~');
						s += '<div class="smsto"><p class="smsp"><span style="font-size:x-small"><b>from: ' + (sr[0] === '' ? perYou.getPersonName() : sr[0]) + '</b></span><br>' + sr[1] + '</p></div>';
					} else {
						//from
						sr = ar[k].split('^');
						s +='<div class="smsfrom"><p class="smsp"><span style="font-size:x-small"><b>from: ' + sr[0] + '</b></span><br>' + sr[1] + '</p></div>';
					}
					s += '</div>';
					if (sr.length > 1 && sr[2] !== '') {
						// Flag the image is present
						imdx = Math.floor((id - 1) / 32);
						arSMSImages[imdx] = setBitFlag(arSMSImages[imdx], ((id - 1) % 32) + 1);
						// Show the image
						var sEx = p.isSMSImageDressVersion(id) ? '' : '!';
						if (sr[2].indexOf("`") == -1) {
							if (sr[2].indexOf(".mp4") != -1) s += '<video width="100%" autoplay muted loop style="width:60%;margin-left:15%"><source src="Images/' + p.getImg(sEx + sr[2]) + '" type="video/mp4"></video><span class="wp-icon" onclick="setWallpaper(\'' + p.getImg(sEx + sr[2]) + '\')"><img src="UI/wallpaperblack.png" width="24px" alt="Wall" title="Set as Wallpaper"></span>';
							else s += '<img onerror="onerrorImage(this)" src="Images/' + p.getImg(sEx + sr[2]) + '" style="width:60%;margin-left:15%" alt="SMS"><span class="wp-icon" onclick="setWallpaper(\'' + p.getImg(sEx + sr[2]) + '\')"><img src="UI/wallpaperblack.png" width="24px" alt="Wall" title="Set as Wallpaper"></span>';
						} else {
							ir = sr[2].split("`");
							if (ir.length > 1) {
								if (ir[0].indexOf(".mp4") != -1) s += '<video width="100%" autoplay muted loop style="width:' + ir[1] + ';margin-left:10%"><source src="Images/' + p.getImg(sEx + ir[0]) + '" type="video/mp4"></video>';
								else s += '<img onerror="onerrorImage(this)" src="Images/' + p.getImg(sEx + ir[0]) + '" style="width:' + ir[1] + ';margin-left:10%" alt="SMS">';
							} else s += sr[2];
						}
					}
				}
			}
			s += '</div>';
			if (cnt < 2) {
				s += addOptionLink("string", "Clear", "usePhone(\'clear\')", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:36%;left:8%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;");
				s += addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;");
			} else {
				s += '<div style="position:absolute;top:79%;top:calc(86% - 1.75em);width:4%;left:8%;"><a href="javascript:toggleFilter()"><img src="UI/filter.png" style="width:100%" alt="Filter" title="Filter Conversations"></a>' +
					'</div><select style="display:none;position:absolute;top:79%;top:calc(86% - 2em);width:70%;left:13%;font-weight:bold" name="selPerson" id="selPerson" size="1" onchange="alterPerson();"><option value="All"' + (no === '' ? ' selected' : '') + '>All</option>' + ps + '</select>';
				s += addOptionLink("string", "Clear", "usePhone(\'clear\')", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:34%;left:13%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;", 'clearall');
				s += addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:34%;left:53%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;", 'done');
			}

		} else if (stype == "addressbook") {
			// View your addressbook
			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="addressdiv" style="position:absolute;top:9%;left:6%;width:88%;height:72%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
				'<table style="margin-left:5px;margin-right:5px;width:98%;vertical-align:top;border-collapse:collapse"><tr><td style="width:80%;vertical-align:top;border:1px solid black"><b>Person</b></td><td style="width:8%;vertical-align:top;border:1px solid black;font-size:x-small"><b>';
			if (isSpellKnown("Charm")) s += '<img src="UI/themes/theme0/mana.png" width="16px" style="display:block;margin:auto" title="Charmed" alt="Charmed">';
			else s += '<img src="UI/themes/theme0/book.png" width="16px" style="display:block;margin:auto" title="Other" alt="Other">';
			s += '</b></td><td style="width:10%">&nbsp;</td></tr>';

			var par = [];
			var nSlaves = 0;
			for (i = 0; i < arPeople.length - 3; i++) {
				p = arPeople[i];
				var ad = p.getPersonAddress();
				var sp = "";
				if (p.isCharmedBy()) {
					sp = '<tr id="' + p.uid + '"><td style="width:80%;padding-left:2px;border:1px solid grey">' + p.getPersonName(true) + '<br>';
					if (ad !== "") sp += '<span style="font-size:small"><b>Address</b>: ' + ad + '</span>';
					else sp += '&nbsp;';
					sp += '</td><td style="width:8%;border:1px solid grey;text-align:center">&#10004;';
					nSlaves++;
				} else if (ad !== "") {
					// Known person not charmed
					sp = '<tr id="' + p.uid + '"><td style="width:80%;padding-left:2px;border:1px solid grey">' + p.getPersonName(true) + '<br><span style="font-size:small"><b>Address</b>: ' + ad +  '</span></td><td style="width:8%;border:1px solid grey;text-align:center">&nbsp;';
				}
				if (sp !== "") {
					sp += '</td><td style="width:10%">';
					if (p.isPhoneable()) sp += '<img onClick="makePhoneCall(\'' + p.uid + '\')" src="UI/phone2enabled.png" width="100%" style="float:left;margin:0 0 0 1px;cursor:pointer" title="Call Them" alt="Phone">';
					else sp += '<img src="UI/phone2disabled.png" width="100%" style="float:left;margin:0 0 0 1px" title="Cannot Call" alt="Phone">';
					sp += '</td></tr>';
					par.push(sp);
				}
			}
			par.sort(function(aa, ab) {
				if (aa.indexOf("phone2enabled") != -1 && ab.indexOf("phone2enabled") == -1) return -1;
				if (aa.indexOf("phone2enabled") == -1 && ab.indexOf("phone2enabled") != -1) return 1;
				return aa.localeCompare(ab); // Sort by name
			});
			for (i = 0; i < par.length; i++) s += par[i];
			s += '<tr><td style="width:80%;border:1px solid grey"><b>Total: ' + nSlaves + '</b></td></tr></table></div>' +
				addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:77%;top:calc(86% - 2.75em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;");
			if (sno !== '') s += '<script>var el=getElementById("' + sno + '").scrollIntoView()</script>';

		} else if (stype == "apps") {
			// View your apps/settings
			var tms = perYou.checkFlag(33) ? "7am" : (perYou.checkFlag(34) ? "8am" : "6am");

			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="appsdiv" style="position:absolute;top:9%;left:6%;width:88%;height:72%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
				'<table style="margin-left:5px;margin-right:5px;width:98%;vertical-align:top;border-collapse:collapse"><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'alarm\')"><img style="width:95%" src="UI/alarmblack.png" alt="Alarm" title="Set your alarm clock"/></a>' +
				'<br><b>Alarm:<br></b>at: ' + tms + '</td>' +

				'<td style="width:33%"><a href=\"javascript:setPersonFlag(\'Glenvale\',36,!checkPersonFlag(\'Glenvale\',36));usePhone(\'apps\')"><img style="width:95%" src="UI/smsnotification.png" alt="SMS" title="Enable SMS Notifications"/></a>' +
				'<br><b>Alert new SMS\'s:</b><br>' + (checkPersonFlag('Glenvale',36) ? "No" : "Yes") + '</td>' +

				'<td style="width:33%"><a href=\"javascript:setExplicit(!isExplicit(true));usePhone(\'apps\')"><img style="width:95%" src="UI/xrated.png" alt="Explicit" title="Explicit content filter"/></a>' +
				'<br><b>Explicit Filter</b><br>' + (isExplicit(true) ? "disabled" : "enabled") + '</td>' +

				'</tr><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:toggleTheme();usePhone(\'apps\')"><img style="width:95%" src="UI/themes.png" alt="Theme" title="App to chamge the display theme"/></a>' +
				'<br><b>Theme:</b><br>' + (nTheme === 0 ? "White" : nTheme == 1 ? "Black" : nTheme == 2 ? "Dark Grey" : "Theme " + nTheme) + ' Theme</td>' +

				'<td style="width:33%"><a href=\"javascript:toggleIcons();usePhone(\'apps\')"><img style="width:95%" src="UI/icons.png" alt="Icon" title="App to change the item icon view"/></a>' +
				'<br><b>Inventory:</b><br>' + (gameState.bUseIcons ? "Icons" : "Text") + '</td>' +

				'<td style="width:33%"><a href=\"javascript:toggleInventoryPopup();usePhone(\'apps\')"><img style="width:95%" src="UI/themes/theme0/bag.png" alt="Icon" title="Alter how the inventory is shown"/></a>' +
				'<br><b>Inventory:</b><br>' + (gameState.bInventoryPopup ? "Popup" : "Sidebar") + '</td>' +

				'</tr><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:setRunes(' + (!isRunes()) + ');usePhone(\'apps\')"><img style="width:95%" src="UI/runes.png" alt="Runes" title="App to change runes to text when learning spells"/></a>' +
				'<br><b>Spell Runes:</b><br>' + (isRunes() ? "Runes" : "Text Names") + '</td>' +

				'<td style="width:33%"><a href=\"javascript:gameState.bAllowUndo=!gameState.bAllowUndo;usePhone(\'apps\')"><img style="width:95%" src="UI/undo.png" alt="UnDo" title="App to rnable undo in actions"/></a>' +
				'<br><b>Undo:</b><br>' + (gameState.bAllowUndo ? "Yes" : "No") + '</td>' +

				'<td style="width:33%"><a href=\"javascript:toggleBubble();usePhone(\'apps\')"><img style="width:95%" src="UI/textpos.png" alt="Bubbles" title="App to change the location of text bubbles"/></a>' +
				'<br><b>Bubbles:</b><br>' + (gameState.bCommentLL ? "Lower Left" : "Centered") + '</td>' +

				'</tr><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:perYou.setFlag(40,!perYou.checkFlag(40));usePhone(\'apps\')"><img style="width:95%" src="UI/pink.png" alt="Icon" title="App to generate pink noise for a mostly dreamless sleep"/></a>' +
				'<br><b>Pink Noise:</b><br>' + (perYou.checkFlag(40) ? "Few Dreams" : "Normal Sleep") + '</td>' +

				'</tr></table></div>' +	addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.7em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;");

		} else if (stype == "games") {
			// View your games

			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="appsdiv" style="position:absolute;top:9%;left:6%;width:88%;height:72%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
				'<table style="margin-left:5px;margin-right:5px;width:98%;vertical-align:top;border-collapse:collapse"><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'pacman\')"><img style="width:95%" src="UI/pacman.jpg" alt="Pacman" title="Play Pacman"/></a>' +
				'<br><b>Play Pacman</b></td>' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'tetris\')"><img style="width:95%" src="UI/tetris.png" alt="Tetris" title="Play Tetris"/></a>' +
				'<br><b>Play Tetris</b></td>' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'snake\')"><img style="width:95%" src="UI/snake.png" alt="Tetris" title="Play Snake"/></a>' +
				'<br><b>Play Snake</b></td>' +

				'</tr><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'pong\')"><img style="width:95%" src="UI/pong.jpg" alt="Pong" title="Play Pong"/></a>' +
				'<br><b>Play Pong</b></td>' +

				'</tr><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:bCheating=!bCheating;dispPlace();usePhone(\'games\')"><img style="width:95%" src="UI/cheat.png" alt="Cheat" title="Assistance to cheating in games"/></a>' +
				'<br><b>Cheat Helper</b><br>' + (bCheating ? "enabled" : "disabled") + '</td>' +

				'<td style="width:33%"><a href=\"javascript:setPuzzles(!isPuzzles());usePhone(\'games\')"><img style="width:95%" src="UI/puzzles.png" alt="Puzzles" title="App to make puzzles trivially easy"/></a>' +
				'<br><b>Puzzles Helper</b><br>' + (isPuzzles() ? "disabled" : "enabled") + '</td>' +

				'</tr></table></div><p style="position:absolute;top:80%;left:7%;color:black;text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;font-size:large;width:43%;text-align:left"><b> ';

				hr = getHour();
				hm = hr > 12 ? hr - 12 : hr;
				min = getTime() - (hr * 100);
				s += getDay(true) + " " + hm + ":" + (min < 10 ? "0" + min : min);
				if (hr > 12) s += "pm";
				else s += "am";
				s += ' </b></p>';

				s += addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.7em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;");

		} else if (stype == "alarm") {
			// Change alarm clock settings
			var tm = perYou.checkFlag(33) ? "7am" : (perYou.checkFlag(34) ? "8am" : "6am");
			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:80%;text-align:center;">' +
				'<p style="color:' + wpt + (perYou.extra[7] == 1 ? ";text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;" : ";text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;") + '"><b>Alarm Settings: ' + tm + '</b></p>' +
				addOptionLink("string", "6am", "perYou.setFlag(33,false);perYou.setFlag(34,false);usePhone()", "phoneblock", "position:relative") +
				addOptionLink("string", "7am", "perYou.setFlag(33);perYou.setFlag(34,false);usePhone()", "phoneblock", "position:relative") +
				addOptionLink("string", "8am", "perYou.setFlag(34);perYou.setFlag(33,false);usePhone()", "phoneblock", "position:relative") +
				'</div></div>';

		} else if (stype == "game") {
			// Play a game
			s +=  '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
					'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:black"></div>' +
					addGame(sno) +
					'<script type="text/javascript">playGame()</script>' +
					addOptionLink("string", "Finish", "finishPhoneGame()",  "chatblock", "position:absolute;top:79%;top:calc(86% - 2.7em);width:20%;left:70%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;");

		} else {
			// Main screen for the phone
			s += '<img style="border:none;position:absolute;width:100%;height:100%;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<p style="position:absolute;top:7vh;left:5%;color:' + wpt + (perYou.extra[7] == 1 ? ";text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;" : ";text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;") + ';font-size:large;width:89%;text-align:right"><b> ';

			hr = getHour();
			hm = hr > 12 ? hr - 12 : hr;
			min = getTime() - (hr * 100);
			s += getDay(true) + " " + hm + ":" + (min < 10 ? "0" + min : min);
			if (hr > 12) s += "pm";
			else s += "am";
			s += ' </b></p>';

			if (arSMS.length > 0) {
				s += '<p style="position:absolute;top:8vh;left:9%;font-size:small"><a href="javascript:usePhone(\'sms\')"><img src="UI/sms' + wpt + '.png" style="float:left;height:2em;margin-right:0;margin-left:0" alt="SMS" title="View SMS"></a></p>';
				if (nUnreadSMS > 0) s += '<p onclick="usePhone(\'sms\')" style="position:absolute;top:10vh;left:12%;font-size:x-small;border:1px solid Blue;background-color:PowderBlue;cursor:pointer"><b>' + nUnreadSMS + ' new</b></p>';

			}

			s +='<p style="position:absolute;top:76vh;left:11%;width:80%;font-size:small"><a href="javascript:usePhone(\'apps\')"><img src="UI/apps.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Photos" title="Apps"></a></p>' +
				 '<p style="position:absolute;top:76vh;left:27%;width:80%;font-size:small"><a href="javascript:usePhone(\'addressbook\')"><img src="UI/addressbook.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Photos" title="Address Book"></a></p>' +
				 '<p style="position:absolute;top:76vh;left:43%;width:80%;font-size:small"><a href="javascript:usePhone(\'photos\')"><img src="UI/camera.png" style=height:8vh;width:19%;margin-right:0;margin-left:0" alt="Photos" title="View Photos"></a></p>' +
				 '<p style="position:absolute;top:76vh;left:59%;width:80%;font-size:small"><a href="javascript:usePhone(\'notes1\')"><img src="UI/notes.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Notes" title="View Notes"></a></p>' +
				 '<p style="position:absolute;top:76vh;left:75%;width:80%;font-size:small"><a href="javascript:usePhone(\'map\')"><img src="UI/map.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Map" title="Local Map"></a></p>';
			if (perYourBody.checkFlag(15)) s += '<p style="position:absolute;top:calc(67vh + 4px);left:75%;width:80%;font-size:small"><a href="javascript:usePhone(\'games\')"><img src="UI/games.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Game" title="Play a Game"></a></p>';
			else s += '<p style="position:absolute;top:calc(67vh + 4px);left:75%;width:80%;font-size:small"><a href="javascript:dispPlace(Place, \'type=playagame\')"><img src="UI/games.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Game" title="Play a Game"></a></p>';

		}
		s += addOptionLink("string", "Off", "showRightBar(gameState.nRightBarState - 2)", "phoneblock", "top:87vh;left:9%;background-color:transparent;color:white;") + '</div>';

	} else if (stype === "notes1") {
		// Personal Notes
		s += getLSD(gameState.bPhoneLandscape ? "20%" : "35%");
		s += addHeader("Personal Details");
		s += '<b>Name, Address</b><br>' + perYou.getPersonName() + ", 16 Kollam St, Glenvale<br>";
		
		if (perYou.getPersonGender() == "futa") s += "You are neither male or female, you are a fully functioning hermaphrodite.<br>";

		s += addHeader("Money");
		// Owe Mom money
		if (checkPersonFlag("Kristin", 13)) s += "I have a low-limit credit card<br>";
		if (perYou.getBankBalance() !== 0) {
			s += "I have an account at the bank 'Friendly Loan Company'<br>";
			var accountMax = perYou.checkFlag(9) ? -1 : (Math.floor(nTime / 288) > 30 ? -1 : 200);
			if (accountMax === -1) s += "There is no limit on my bank account<br>";
			else s += "I can only deposit up to " + sCurrency + accountMax + " in my bank account<br>";
		}
		if (nMoney < 0) s += "I owe Mom " + sCurrency + Math.abs(nMoney) + " and will pay her back any money I get.<br>";
		
		s += addHeader("School");
		findPerson("MissLogan");
		if (per.other == 2) s += 'I have to do the neurology assignment for Miss Logan. I need no more information to do it.<br>';
		else if (per.other >= 5) s += 'I have to do the reproductive assignment for Miss Logan. I should check with her for more details.<br>';
		
		s += addHeader("Keys");
		if (checkPlaceFlag("Hospital", 4)) s += "I have a key to the old hospital basement<br>";
		if (checkPlaceFlag("Park", 5)) s += "I have a key to the construction site<br>";
		if (isPlaceKnown("CharliesHouse")) s += "I have a key to Charlie\s home<br>";
		if (isCharmedBy("Hannah")) s += 'I have a key to Hannah\'s apartment<br>';
		if (getCharmedLevel("Leanne") == 4) s += 'I have a key to Leanne\'s home.<br>';
		
		s += addHeader("Other");
		if (perYou.checkFlag(38)) s += "I have done almost everything I can in Glenvale. I could <b>end</b> my adventure for now on a <b>Sunday night at home</b>, talk to Tess or Tracy.<br>";

		s += '<br></div>';		
		s += 	'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>';
		s += 	'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(10vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>';
		s += 	'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(20vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>';
		s += 	'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(30vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>';

	} else if (stype === "notes2") {
		// Quests
		perSarah = findPerson("Sarah");
		s += '<p style="font-size:medium;margin-bottom:2px"><b>Things to do:</b></p>';

		if (perYou.getExperience() > 0) s += showQuest(4, "Find the Book, " + perGates.getPersonName() + " has it");
		else s += showQuest(4, "Find the Book");
		if (!(isConspiracyPath() && !perSarah.checkFlag(3))) s += showQuest(1, isMurderPath() || isConspiracyPath() ? "Where can I find mana" : "Find a magic stone for " + perGates.getPersonName());
		if (isMurderPath()) s += showQuestF(perYou.isQuestStarted(1), perYou.FindItem(11) > 0, "How do I learn spells from the Book");
		s += showQuest(2, "Find an old key for " + perGates.getPersonName());
		s += showQuestF(checkPlaceFlag("Hotel", 8), getPersonOther("Jessica") > 0, "Find out what Davy wanted in the Hotel Cellar");
		s += showQuest(3, "Find a Magic Gem");
		s += showQuestF(getPersonOther("Mayor") > 0, getPersonOther("Mayor") > 3, "Get an appointment with Mayor Thomas");
		if (perKurndorf.getQuestSeance() >= 16) {
			s += 'Jessica<br>';
			findPerson("Jessica");
			s += showQuestF(true, perKurndorf.getQuestSeance() >= 50, "&nbsp;&nbsp;&nbsp;Summon the ghost of Kurndorf");
			if (!per.isRival()) {
				// Bound in cellar/ally
				var riv = per.getRivalry();
				if (riv >= 0) s += showQuestF(isDemonFreed(), per.whereNow() != 161, "&nbsp;&nbsp;&nbsp;Free Jessica from the bindings");
				else s += showQuestF(true, true, "&nbsp;&nbsp;&nbsp;Jessica is my " + (riv == -1 ? "prisoner" : 'witch-toy'));
			} else {
				// Rival
				s += showQuestF(true, false, "&nbsp;&nbsp;&nbsp;Jessica is free, but is she a friend?");
			}
		}
		s += showQuestFH(perKurndorf.getQuestGhost() >= 100, perKurndorf.getQuestRitual() >= 200, "Perform the Ritual for Kurndorf");
		if (perKurndorf.getQuestGhost() >= 100) {
			s += '&nbsp;&nbsp;&nbsp;Needed: ';
			s += showQuestF(true, perKurndorf.checkFlag(17), "Chalk", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(15), "Candles", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(12), "Chalice", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(13), "Quartz Crystal", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(14), "Silver Dagger", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(11), "Salt", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(16), "Hemlock", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(8), "Human Skull", true) + ', ';
			s += showQuestF(true, perYourBody.FindItem(56) > 0, "Lock of your hair");
			if (checkPlaceFlag("Crypt", 2)) s += "&nbsp;&nbsp;&nbsp;Kurndorf's crypt is in a remote wild and magical place, protected by a stone tablet<br>";
			if (perYou.getQuestAftane() >= 60 && !isMurderPath()) s += "&nbsp;&nbsp;&nbsp;" + perGates.getPersonName() + " said to use a piece of Kurndorf's own skull<br>";
		}
		s += showQuestFH(isDemonFreed(), isDemonQuestDone(), "Deal with Legion");
		findPerson("Desiree");
		s += showQuestF(per.getQuestRelic() > 0, per.getQuestRelic() >= 100, "&nbsp;&nbsp;&nbsp;Get a Catholic Relic for Legion");
		
		findPerson("Leanne");
		s += showQuestH(5, "Save Leanne", per.isCharmedBy("Demon"));
		var bRitualReturn = per.checkFlag(8);
		if (perYou.isQuestStarted(5) && !perYou.isQuestComplete(5) && bRitualReturn) {
			s += '&nbsp;&nbsp;&nbsp;Needed: ';
			s += showQuestF(true, checkPersonFlag("Victoria", 9) || checkPersonFlag("Vampyre", 2), "Mirror of Souls", true) + ', ';
			s += showQuestF(true, whereItem(35) !== 0, "Dragon Gem", true) + ', ';
			s += showQuestF(true, whereItem(35) == -53, "Dragon Gem Bound", true) + ', ';
			s += showQuestF(true, perYou.checkFlag(21), "Can Teleport another person", true) + ', ';
			s += showQuestF(true, isPlaceAttuned(53), "attuned the Hidden Room", false);
		}

		if (isConspiracyPath()) {
			s += showQuestH(6, "Visit 'Noble Ally', serphoni, midnight, Sacred Clearing");
			if (perYou.isQuestStarted(6) && !perYou.isQuestComplete(6)) {
				s += '&nbsp;&nbsp;&nbsp;Needed: ';
				findPerson("Bambi");
				if (per.checkFlag(5)) s += showQuestF(true, perYou.getQuestRustyKey() >= 999, "Find the Key (Park)", true) + ', ';
				s += showQuestF(true, perYou.FindItem(40) > 0, "Bottle of Fine Wine");
			}
		}
		if (perSarah.isCharmedBy() && isMurderPath()) {
			findPerson("Lauren");
			s += showQuestF(true, per.flags[0] > 0 || whereItem(40) == 192 , "Give Sarah a fine bottle of wine");
		}
		if (perSarah.other > 39 && perSarah.other < 51) s += "Sarah needs you to protect her within the next " + (51 - perSarah.other) + "days.</br>";
		
		if (perYou.checkFlag(12)) {
			s += showQuestFH(perYou.checkFlag(12), perYou.checkFlag(25), "Learn hypnosis techniques");
			if (!perYou.checkFlag(25)) {
				s += '&nbsp;&nbsp;&nbsp;Needed: ';
				s += showQuestF(true, perYou.checkFlag(24), "Study the basics", true) + ', ';
				s += showQuestF(true, perYou.checkFlag(25), "Learn from Mr. Beasley (" + (perYou.canUseExperience(true) ? "experience available" : "more experience needed") + ")");
			}
		}
		
		var perAdele = findPerson("AdeleRoss");	
		if (perYou.isQuestStarted(8) || (perAdele.checkFlag(4) && (perSarah.other > 0 || (isConspiracyPath() && perYou.isQuestStarted(6))))) {
			findPerson("Catherine");
			s += showQuestH(8, "Ross Sisters", false);
			// Catherine
			if (per.checkFlag(4)) s += showQuestF(true, per.checkFlag(5), "&nbsp;&nbsp;&nbsp;Meet Catherine at the construction site at midday");
			if (per.checkFlag(5)) s += showQuestF(true, per.checkFlag(10), "&nbsp;&nbsp;&nbsp;Wait for Catherine's call");			
			// Adele
			s += showQuestF(perAdele.checkFlag(4) && (perSarah.other > 0 || (isConspiracyPath() && perYou.isQuestStarted(6))), perAdele.place != 16, "&nbsp;&nbsp;&nbsp;Get rid of Adele, the Police guard at the mansion");
			if (per.checkFlag(10) && !perAdele.checkFlag(6)) s += showQuestF(true, false, "&nbsp;&nbsp;&nbsp;Visit Adele and charm her");
			if (perAdele.checkFlag(8)) s += showQuestF(true, perAdele.isCharmedBy(), "&nbsp;&nbsp;&nbsp;Charm Adele again");			
			// Amy
			var perAmy = findPerson("AmyRoss");
			var perCharlie = findPerson("Charlie");
			s += showQuestF(true, perCharlie.checkFlag(3), "&nbsp;&nbsp;&nbsp;Find Amy", undefined, undefined, "&nbsp;&nbsp;&nbsp;Find Amy - at Gym");
			s += showQuestF(perCharlie.checkFlag(5), perCharlie.other >= 3, "&nbsp;&nbsp;&nbsp;Convince Charlie", true);
			if (perCharlie.other < 3 && perCharlie.checkFlag(5) && (perCharlie.checkFlag(6) || perCharlie.checkFlag(7) || perCharlie.checkFlag(8))) {
				s += 'by: ';
				if (perCharlie.checkFlag(6)) s += "have <b>her</b> arrested" + (perCharlie.checkFlag(7) || perCharlie.checkFlag(8) ? ", " : "");
				if (perCharlie.checkFlag(7)) s += "disciplined by Bambi" + (perCharlie.checkFlag(8) ? ", " : "");
				if (perCharlie.checkFlag(8)) s += "hypnosis";
				s += '<br>';
			} else if (perCharlie.checkFlag(5)) s += '<br>';
		}
		
		findPerson("Kate");
		if (per.place != 47) {
			s += addHeader('Kate');
			if (per.place == 9999) s += '&nbsp;&nbsp;&nbsp;Kate has left Glenvale forever!!<br>';
			else {
				if (per.place === 3) s += '&nbsp;&nbsp;&nbsp;Remember to meet Kate to study in the library<br>';
				if (per.checkFlag(36) && !per.checkFlag(7)) s += '&nbsp;&nbsp;&nbsp;I would like to see her holiday photos<br>';
				if (per.checkFlag(36) && per.checkFlag(7) && per.checkFlag(8) && !per.checkFlag(9)) s += '&nbsp;&nbsp;&nbsp;Where is the other photo album?<br>';
				if (per.checkFlag(24) && per.place == 1000) {
					if (per.checkFlag(16)) s += '&nbsp;&nbsp;&nbsp;Kate is unsure about me, I just have to wait for her to decide<br>';
					else s += '&nbsp;&nbsp;&nbsp;Kate is unsure about me. Where is she? Maybe ask her mother<br>';
				}
			}
		}
		findPerson("MrsGranger");
		if (per.other >= 2) {
			s += addHeader("Mrs Granger");
			if (per.other < 2.2) s += '&nbsp;&nbsp;&nbsp;Mrs Granger is investigating the Wild Ranges.<br>';
			else s += '&nbsp;&nbsp;&nbsp;Mrs Granger investigated the Wild Ranges.<br>';
			if (per.other == 5) s += '&nbsp;&nbsp;&nbsp;Mrs Granger is looking for the Dragon Gem at the Museum.<br>';
			else if (Math.floor(per.place) == 275 || per.place == 278) s += '&nbsp;&nbsp;&nbsp;Mrs Granger is in the hospital.<br>';
			else if (per.place == 261) s += '&nbsp;&nbsp;&nbsp;Mrs Granger is in jail!<br>';
		}		

		findPerson("Sofia");
		if (isMurderPath() && perYou.isQuestStarted(7)) {
			s += showQuestH(7, "Charm Sofia", per.whereNow() == 999);
			if (perYou.isQuestStarted(7) && !perYou.isQuestComplete(7)) {
				s += showQuestF(true, per.checkFlag(11), "&nbsp;&nbsp;&nbsp;Find someone who can tell you more about Sofia");
				if (per.checkFlag(13)) s += showQuestF(true, per.checkFlag(14), "&nbsp;&nbsp;&nbsp;Discuss your plan with someone who has authority");
				if (per.checkFlag(14)) s += showQuestF(true, per.checkFlag(15), "&nbsp;&nbsp;&nbsp;Break into Sofia’s office and search for clues against her (only between 8-10 AM)");
				if (per.checkFlag(15)) s += showQuestF(true, perYou.isQuestComplete(7), "&nbsp;&nbsp;&nbsp;Return to Kerry Batton with the information you have collected on Sofia");
			}
		}

		findPerson("Miku");
		if (per.other < 0) {
			showQuestFH(true, per.isCharmedBy(), "Charm Miku");
			s += addHeader("Miku");
			if (per.other <= -1) s += showQuestF(true, per.other < -1, "&nbsp;&nbsp;&nbsp;Research bloodlines");
			if (per.other < -1) s += showQuestF(true, per.other <= -10, "&nbsp;&nbsp;&nbsp;Speak to the Gates family");
			if (per.other <= -20) s += showQuestF(true, per.other == -100, "&nbsp;&nbsp;&nbsp;Transform Miku");
		}
		if (checkPersonFlag("Hannah", 8) && wherePerson("Camryn") !== 0) {
			findPerson("Camryn");
			s += addHeader("Rescue Camryn");
			s += showQuestF(true, per.place != 801, "&nbsp;&nbsp;&nbsp;Possess Camryn");
			if (per.checkFlag(21) && !per.checkFlag(22)) s += showQuestF(true, per.checkFlag(22), "&nbsp;&nbsp;&nbsp;Report to the Police");
			if (per.place == 457) s += showQuestF(true, per.isCharmedBy(), "&nbsp;&nbsp;&nbsp;Charm Camryn");
		}
		if (checkPersonFlag("Bambi", 7)) {
			findPerson("Mia");
			if (!per.isCharmedBy()) {
				var dc = Math.floor((nTime - this.charmedTime) / 288);		// Days charmed/since arrived
				showQuestFH(true, false, "Charm Mia after " + (7 - dc) + " days (or sooner)");
			} else showQuestFH(true, per.isCharmedBy(), "Charm Mia");
		}
		var perMom = findPerson("Mom");
		findPerson("Gabby");
		if (perMom.checkFlag(34)) {
			s += addHeader("Mom and Gabby");
			s += showQuestF(true, per.checkFlag(3) || per.checkFlag(4), "&nbsp;&nbsp;&nbsp;What is happening between Mom and Gabby");
			if (per.checkFlag(3) || per.checkFlag(4)) {
				s += showQuestF(true, per.checkFlag(8) || per.checkFlag(10), "&nbsp;&nbsp;&nbsp;Find out about the necklace");
				if (perMom.place == 1000) s += "&nbsp;&nbsp;&nbsp;Mom and Gabby ran away together";
				else if (per.checkFlag(10)) {
					// Apprentice/Conspiracy
					if (!per.isCharmedBy()) {
						if (per.checkFlag(13)) s += showQuestF(true, false, "&nbsp;&nbsp;&nbsp;Missed the press conference");
						else s += showQuestF(true, false, "&nbsp;&nbsp;&nbsp;Attend the press conference " + (per.checkFlag(23) ? "today" : "tomorrow") + " at 6pm");
					} else s += showQuestF(true, true, "&nbsp;&nbsp;&nbsp;Attend the press conference");
				}
				s += showQuestF(true, per.isCharmedBy(), "&nbsp;&nbsp;&nbsp;Charm Gabby");
			}
		}

		s += '<br></div>';		
		s += 	'<span class="zoom-icon" style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>';
		s += 	'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:calc(10vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>';
		s += 	'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(20vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>';
		s += 	'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(30vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>';

	} else if (stype === "notes3") {
		// Magic Notes
		s += '<p style="font-size:medium;margin-bottom:2px"><b>Magic:</b></p>';
		if (checkPersonFlag("MrsGranger", 17)) s+= 'The Wild Ranges have long been a center of magical cults<br>';
		if (getPersonOther("Vampyre") >= 60) s += 'The Sacred Clearing is dangerous at night<br>';
		if (perYou.checkFlag(10)) s += 'Use magic stones in the Wild Ranges to get mana<br>';
		if (getPersonOther("Tina") > 3) s += 'Tina can drain the mana powering spells<br>';
		if (checkPersonFlag("Tina", 2)) s += 'Witches bear a mark visible only to other witches, a small tattoo like mark<br>';
		if (whereItem(35) == -53) s += 'The Hidden Room is a place of power<br>';
		if (perYou.checkFlag(11)) s += "The book seems to glow red when I can learn a new magical training<br>";
		if (checkPlaceFlag("Park", 6)) s += "I saw strange symbol that frightened me<br>";
		if (isCharmedBy("Ghost")) s += "Ghosts can be a source of mana<br>";
		if (perYou.checkFlag(45)) s += "You could teleport from the Sacred Clearing at night to Elian<br>";

		// Magic Experience
		if (perYou.checkFlag(26)) s += "Magical Knowledge: I have fine control over the charm process<br>";
		if (perYou.checkFlag(17)) s += "Magical Knowledge: Expensive spells are 1 to 2 points cheaper<br>";
		if (perYou.checkFlag(18)) s += "Magical Knowledge: I can use Mana to block spells cast on me, I need at least 20 mana to do it<br>";
		if (perYou.checkFlag(19)) s += "Magical Knowledge: I can charm men as well as women<br>";
		if (perYou.checkFlag(20)) s += "Magical Knowledge: I get more mana from magic stones<br>";
		if (perYou.checkFlag(21)) s += "Magical Knowledge: I can use teleport to more places and I can carve hexagrams<br>";
		if (perYou.checkFlag(22)) s += "Magical Knowledge: Wealth spell gives more money for me<br>";
		if (perYou.checkFlag(23)) s += "Magical Knowledge: I can charm spirits and ghosts<br>";
		if (perYou.checkFlag(27)) s += "Magical Knowledge: I know the tricks of deciphering spells<br>";
		if (perYou.checkFlag(28)) s += "Magical Knowledge: I can stay invisible for longer<br>";
		if (perYou.checkFlag(29)) s += "Magical Knowledge: I can get visions of other places if I meditate on a pool of water and cast clairvoyance<br>";
		findPerson("Leanne");
		var bRitualReturn = per.checkFlag(8);
		if (bRitualReturn) s += "Magical Knowledge: I know the Ritual of Return<br>";
		if (perYou.checkFlag(25)) s += "Hypnotic Knowledge: I can magically augment hypnosis<br>";
		else if (perYou.checkFlag(24)) s += "Hypnotic Knowledge: I understand the basics of hypnosis<br>";

		s += '<br></div>';		
		s += 	'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>';
		s += 	'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(10vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>';
		s += 	'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:calc(20vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>';
		s += 	'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(30vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>';

	} else if (stype === "notes4") {
		// General Notes
		var perSarah = findPerson("Sarah");
		s += '<p style="font-size:medium;margin-bottom:2px"><b>General Notes:</b></p>';

		if (perBeasley.checkFlag(14)) s += "Read Mr. Beasley's lecture on Carl Kurndorf<br>";
		if (perYou.isQuestStarted(1) && (isCharmedPath() || isGoodPath())) s += "I am " + perGates.getPersonName() + "'s apprentice!<br>";
		else if (isConspiracyPath()) s += perSarah.checkFlag(1) ? "Sarah Gates is helping my researches<br>" : "I have an anonymous friend helping my researches<br>";
		else if (isMurderPath()) {
			if (perGates.other == 600) s += perGates.getPersonName() + " is dead, killed by Davy\'s woman!<br>";
			else s += perGates.getPersonName() + " is dead!<br>";
		}
		if (perDavy.other > 0) s += "Davy Robbins and Mr. Beasley?<br>";
		if (perDavy.checkFlag(9)) s += "That bastard Davy Robbins tried to hurt me!!!<br>";
		if (checkPlaceFlag("Museum", 8)) s += "The Mayor has closed the museum<br>";
		if (perSarah.other > 0) s += "Sarah Gates is now at the Mansion<br>";
		if (checkPersonFlag("Kristin", 9)) s += "Kristin has closed the bank<br>";
		findPerson("Kylie");
		if (per.checkFlag(1)) s += "Kylie plays sports weekdays 12-2pm<br>";
		findPerson("MsTitus");
		if (per.isFreeSlave()) s += "Ms. Titus is my willing slave<br>";
		if (perYou.isQuestComplete(7)) s += "Sofia, your personal chauffeur comes to your every morning. She can give you a lift anywhere around town. You can also call her anytime if you want her to come pick you up.<br>";
		else if (checkPersonFlag("Hannah", 17)) s += "Hannah can give you a ride anywhere you need, just visit her " + getShopStore() + " or apartment<br>";
		if (checkPersonFlag("Bambi", 7)) s += "Bambi is your night guard in the dungeon<br>";
		
		s += '<br></div>';		
		s += 	'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>';
		s += 	'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(10vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>';
		s += 	'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(20vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>';
		s += 	'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:calc(30vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>';
		
	} else if (stype === "map") {
		// Town Map
		s = '<script type="text/javascript">document.onkeypress = stopRKey;initLightbox();</script>' +
			'<div style="position:absolute;text-align:left;cursor:default;vertical-align:top;overflow-x:hidden;overflow-y:hidden;width:100%;height:100vh;min-height:100vh;z-index:46">' +
			"<img draggable='false' style='float:left;position:absolute;max-height:99%;vertical-align:top;padding:0;width:100%;position:absolute;max-height:100vh;height:100vh;border-left:2px;border-style:solid;border-bottom:none;border-top:none;border-right:none;left:0;top:0' src='UI/phone3l.png'>" +
			'<div id="mapdiv" style="position:absolute;top:0px;left:0px;text-align:left;margin:' + (ha + 4) + 'px ' + (wa + 4) + 'px ' + ha + 'px ' + (la - 4) + 'px;height:85%;width:91%;overflow-y:auto;overflow-x:auto;background-image:url(UI/map/mapbg.jpg);background-size:cover">' +
			getMapHTML("100%", "100%") +
			'</div>' +
			addOptionLink("string", "Close", "showRightBar(-1*gameState.nRightBarState);showLeftBar();dispPlace()", "chatblock", "position:absolute;margin-top:0;top:6px;left:5px;margin-left:4%;width:20%") +
			'<span class="zoom-icon" style="position:absolute;top:0px;right:5px"><img draggable="false" style="cursor:pointer;" onclick="rotatePhone();return false" src="UI/rotate.png" width="48" alt="Rotate" title="Rotate"></span>' +
			'</div>';

	} else if (stype == "photos") {
		// View Photos
		s = '<script type="text/javascript">document.onkeypress = stopRKey;initLightbox();gameState.bLBNoShow=false;</script>' +
			'<div style="position:absolute;text-align:left;cursor:default;vertical-align:top;overflow-x:hidden;overflow-y:hidden;width:100%;height:100vh;min-height:100vh;z-index:46;border-style:none">' +
			'<div style="background-color:white;width:95%;height:92%;margin-left:2%;margin-top:2%;"></div>' +
			"<img draggable='false' style='float:left;position:absolute;max-height:99%;vertical-align:top;padding:0;width:100%;position:absolute;max-height:100vh;height:100vh;border-left:2px;border-style:solid;border-bottom:none;border-top:none;border-right:none;left:0;top:0' src='UI/phone3l.png'>" +
			'<div id="photosdiv" style="position:absolute;top:0px;left:0px;text-align:left;margin:' + (ha + 2) + 'px ' + wa + 'px ' + ha + 'px ' + la  + 'px;height:85%;width:92%;overflow:auto">';

		var used = 99;
		var iwall = 0;
		for (i = 1; i < 33; i++) {
			if (!checkBitFlag(nPhoneWallpapers, i)) continue;
			if (used > 66) {
				used = 0;
				if (iwall !== 0) s += '</div>';
				s += '<div style="clear:both">';
			}
			img = "phonewallpaper" + i + '.jpg';
			if (img !== '') {
				s += addImageString(img , "32%", '', '', i + ' ' + img, undefined, "wallpaper" + i);
				used += 32;
			}
			iwall++;
		}		
		for (i = 0; i <  1 + arPhotos.length; i++) {
			if (used > 66) {
				used = 0;
				if (iwall !== 0) s += '</div>';
				s += '<div style="clear:both">';
			}
			if (i == 0) img = sPhoneImage;
			else img = arPhotos[i - 1];
			if (img !== '') {
				s += addImageString(img , "32%", '', '', i + ' ' + img, undefined, "photo" + ((i + 1) * -1));
				used += 32;
			}
			iwall++;
		}		

		// SMS Limit: 11 * 32 = 352
		for (id = 1; id < 353; id++) {
			if (!checkBitFlag(arSMSImages[Math.floor((id - 1) / 32)], ((id - 1) % 32) + 1)) continue;

			sDec = '';
			for (k = 0; k < arPeople.length - 2; k++) {
				p = arPeople[k];
				sDec = p.getPersonSMS(id);
				if (sDec !== '') break;		// Unknown id
			}
			if (sDec === '') continue;		// Invalid id
			var sEx = p.isSMSImageDressVersion(id) ? '' : '!';

			ar = sDec.split('|');
			for (k = 0; k < ar.length; k++) {
				if (ar[k] === '') continue;
				bTo = ar[k].indexOf('~') != -1;

				if (bTo) sr = ar[k].split('~');
				else sr = ar[k].split('^');

				if (sr.length > 1 && sr[2] !== '') {
					if (sr[2].indexOf("<img") == -1) {
						ir = sr[2].split("`");
						if (ir.length > 1) {
							if (used > 35) {
								used = 0;
								s += '</div><div style="clear:both">';
							}
							s += addImageString(p.getImg(sEx + ir[0]), '65%', '', '', '', undefined, "photo" + id);
							used += 65;
						} else {
							if (used > 66) {
								used = 0;
								s += '</div><div style="clear:both">';
							}
							s += addImageString(p.getImg(sEx + sr[2]), "32%", '', '', '', undefined, "photo" + id);
							used += 32;
						}
					} else {
						if (used > 66) {
							used = 0;
							s += '</div><div style="clear:both">';
						}
						s += sr[2].split("width:88").join("float:left;width:65");
						used += 32;
					}
				}
			}
		}
		s += '</div></div>' +
				addOptionLink("string", "Close", "showRightBar(-1*" + gameState.nRightBarState + ");showLeftBar();dispPlace()", "chatblock", "position:absolute;margin-top:0;top:6px;left:5px;margin-left:4%;width:20%") +
				addOptionLink("string", "Clear", "usePhone(\'clearphotos\')", "chatblock", "position:absolute;margin-top:0;top:6px;left:24%;margin-left:4%;width:20%") +
				'<span class="zoom-icon" style="position:absolute;top:0px;right:5px"><img draggable="false" style="cursor:pointer;" onclick="rotatePhone();return false" src="UI/rotate.png" width="48" alt="Rotate" title="Rotate"></span>' +
				'</div>';

	} else if (stype === "gamebig") {
		// Town Map
		s = '<script type="text/javascript">document.onkeypress = stopRKey;initLightbox();</script>' +
			'<div style="position:absolute;text-align:left;cursor:default;vertical-align:top;overflow-x:hidden;overflow-y:hidden;width:100%;height:100vh;min-height:100vh;z-index:46">' +
			"<img draggable='false' style='float:left;position:absolute;max-height:99%;vertical-align:top;padding:0;width:100%;position:absolute;max-height:100vh;height:100vh;border-left:2px;border-style:solid;border-bottom:none;border-top:none;border-right:none;left:0;top:0' src='UI/phone3l.png'>" +
			'<div id="game" style="position:absolute;top:0px;left:0px;text-align:left;margin:' + (ha + 4) + 'px ' + (wa + 4) + 'px ' + ha + 'px ' + (la - 4) + 'px;height:85%;width:91%;overflow-y:auto;overflow-x:auto;background-color:white">' +
			addGame(sno) +
			'</div>' +
			addOptionLink("string", "Finish", "showRightBar(-1*gameState.nRightBarState);finishPhoneGame();dispPlace()", "chatblock", "position:absolute;margin-top:0;top:6px;left:5px;margin-left:4%;width:20%",  "chatblock") +
			'</div>';
	}

	//s += '<div id="commentdiv" class="comment_content_trans' + (gameState.bCommentLL ? '_ll' : '') + '" onclick="ClearComments();"></div>';
	if (isBritish()) s = s.split("Setting/").join("UK/");
	else s = s.split("Setting/").join("US/");

	perYou.extra[1] = vis;
	if (stype === "" || stype === undefined || stype == "alarm" || stype == "sms" || stype == "clear" || stype == "delete" || stype == "addressbook" || stype == "apps") return s;

	if (!gameState.bPhoneLandscape) s += '<div id="commentdiv" class="comment_content_trans' + (gameState.bCommentLL ? '_ll' : '') + '" onclick="ClearComments();"></div><div id="fadeblack" class="black_overlay"></div>';

	return s;
}

// initialisation

function initialisePhone()
{
	arSMSImages = [];
	nUnreadSMS = 0;
	addWallpapers(1, 6);
	sPhoneImage = '';
	arSMS = [];
	arPhotos = [];
}