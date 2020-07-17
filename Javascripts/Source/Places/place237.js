// Place: Hannah's apartment (only visitable when the Mechinics Shop is closed, except logically in sex events)

function ShowPlace237()
{
	var perHannah = findPerson("Hannah");
	var perMonique = findPerson("Monique");
	var clvM = perMonique.getCharmedLevel();

	var md = WritePlaceHeader();

	if (perHannah.isHere()) perHannah.showPerson("hannah9.jpg");
	else AddImage("hannah-stairway.jpg");
	addPlaceTitle(md, "Hannah's Apartment");

	md.write(
		'<p>Hannah and Monique live in a  comparably small apartment right above Hannah\'s workshop with a single corridor connecting a Kitchen, the bath and a room for each of them. You\'ve heard that the rent is quite steep around the commercial center, which is likely the reason they live together.</p>' +
		'<p>The place is neat and tidy, much like the workshop.</p>'
	);
	if (perHannah.isHere()) {
		if (isVisible()) md.write('<p>Hannah looks happy to see you as she opens the door, ushering you in and offering whatever you want, a drink, food, or herself.</p>');
		else md.write('<p>Hannah is relaxing, watching some sports on TV.</p>');
		if (perMonique.isHere()) md.write('<p>Monique seems to be in her room as well, working on her PC.</p>');
	} else if (perMonique.isHere()) md.write('<p>Hannah is not here to greet you this time, but you hear noises from Monique\'s room as you enter the stairway.</p>');
	else md.write('<p>Hannah is not here to greet you this time, and Monique is probably at the Library.</p>');

	startQuestions();
	if (perHannah.isHere()) {
		if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceC(md, '"I want you, now"', 237, 'type=iwantyou');
		if (perMonique.isHere() && clvM > 1) addLinkToPlaceC(md, 'Tell Monique and Hannah to "Service your ride"', 237, 'type=service');
		addLinkToPlace(md, 'enter Hannah\'s room', 284);
	}
	if (perMonique.isHere()) addLinkToPlace(md, 'enter Monique\'s room', 283);
	addLinkToPlace(md, "leave the apartment", 194);

	WritePlaceFooter(md);
}