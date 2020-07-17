/********************* Homes **************************************************************************/

function showGeneralPlace(title, img, desc, exitlabel, exitto, exitlabel2, exitto2, wid)
{
	var md = WritePlaceHeader(false, wid);

	addPlaceTitle(md, title, img);

	if (desc !== undefined && desc !== '') md.write('<p>' + desc + '</p>');

	startQuestions();

	addLinkToPlace(md, exitlabel === undefined ? 'exit' : exitlabel, exitto === undefined ? nFromPlace : exitto);
	if (exitlabel2 !== undefined && exitlabel2 !== '') addLinkToPlace(md, exitlabel2, exitto2);

	WritePlaceFooter(md);
}

function addEntry(md, lnk, plc, params, vis, empty, key, lockmsg, invismsg, msg)
{
	if (!vis) return;
	
	if (isInvisible()) addLinkToPlace(md, lnk, plc, params, invismsg);
	// Normal entry
	addLinkToPlace(md, lnk, plc, params, msg);
}
