// Place: Gate's Garage Outside

function ShowPlace15(stype)
{
	var md = WritePlaceHeader();
	
	addPlaceTitle(md, "Gates's Mansion Garage", "mansiongarage.jpg");
	md.write(
		'<p>This house must have been built much later than the mansion. It looks stylish, simple and modern. The three huge doors give away this building’s purpose; it’s a garage. Interestingly, it has an office area and one upper floor which is for living you presume. This must mean that a servant or one of the help lives here.</p>'
	);
	
	var perSarah = findPerson("Sarah");
	var bSarahMet = perSarah.checkFlag(7);
	var perSofia = findPerson("Sofia");

	startQuestions();
	if (perSofia.whereNow() == 999) {
		addPopupLinkC(md, 'go to the entrance door', "Garage Office",
			"<p><img src='Images/steeldoor.jpg' style='width:40%;float:right;margin-left:5px' alt='Garage Door'>" +
			"There is a reinforced steel door which prevents you from entering an office area. The office is empty, Sofia is gone.",
			false
		);
	} else if (bSarahMet && perSofia.whereNow() === 0) {
		addPopupLinkC(md, 'go to the entrance door', "Garage Office",
			"<p><img src='Images/steeldoor.jpg' style='width:30%;float:right;margin-left:5px' alt='Garage Door'>" +
			"The steel door is unlocked from the inside and it’s slightly open, leaving an opportunity to you to check around. Someone is in the office!.",
			false, 'movePerson("Sofia", 14);gotoPlace(14)'
		);
	} else if (!bSarahMet) {
		addPopupLinkC(md, 'go to the entrance door', "Garage Office",
			"<p><img src='Images/steeldoor.jpg' style='width:40%;float:right;margin-left:5px' alt='Garage Door'>" +
			"There is a reinforced steel door which prevents you from entering an office area. As you look through one of the windows you feel like you are not missing out on anything interesting.</p><p>The place looks empty and no one’s here.",
			false
		);
	} else if (getHour() > 7 && getHour() < 10) {
		addPopupLinkC(md, 'go to the entrance door', "Garage Office",
			"<p><img src='Images/steeldoor.jpg' style='width:40%;float:right;margin-left:5px' alt='Garage Door'>" +
			"This reinforced steel door is impossible to break. You have to get in there in an another way.",
			false
		);
	} else addLinkToPlace(md, "enter the garage office", 14);
	addLinkToPlace(md, "return to the mansion entrance", 16);

	WritePlaceFooter(md);
}