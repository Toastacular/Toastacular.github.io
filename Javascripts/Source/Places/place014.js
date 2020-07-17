// Place: Gate's Garage Office

function ShowPlace14(stype)
{
	var md = WritePlaceHeader();
	var perSofia = findPerson("Sofia");
	
	if (perSofia.isCharmedBy()) perSofia.showPerson("sofia_office_charmed.jpg");
	else perSofia.showPerson("sofia_office_noncharmed.jpg");
	
	addPlaceTitle(md, "Gates's Mansion Garage Office");
	md.write(
			'<p>The room looks like a small work station with few basic furniture, a coffee table, chairs, some houseplants and one or two paintings. There is a door which leads to the upper floor of the place. That is where the chauffeur\'s bedroom is located. Other than that there’s another wood-door that connects the office with garage, where the family’s cars are stored.</p>'
	);
	
	if (perSofia.isCharmedBy()) {
		md.write(
			'<p>Sofia is standing between the coffee table and the chairs, already lifting up her dress, playing with her panty. She felt your arrival.</p>'
		);
	} else {
		if (perSofia.checkFlag(3)) md.write('<p>Sofia is standing between the coffee table and the chairs, watching you suspiciously, ready to jump at you if you try anything stupid.</p>');
		else md.write('<p>The chauffeur is standing between the coffee table and the chairs, watching you suspiciously, ready to jump at you if you try anything stupid.</p>');
	}
	
	startQuestions();
	addLinkToPlace(md, "leave the office", 15);

	WritePlaceFooter(md);
}