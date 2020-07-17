// Place: Anatomy Classroom

function ShowPlace234()
{
	var md = WritePlaceHeader();
	
	var bOpen = isShopOpen(2);
	
	var perLogan = findPerson("MissLogan");
	var clv = perLogan.getCharmedLevel();

	if (bOpen && perLogan.isHere()) {
		if (clv == 1) perLogan.showPerson("logan7a.jpg");
		else if (clv == 2) perLogan.showPerson("logan7b.jpg");
		else if (perLogan.other == 6) perLogan.showPerson("logan2.jpg");
		else if (perLogan.other == 7) perLogan.showPerson("logan3.jpg");
		else addPlaceImage(md, "classroom3.jpg");
	} else addPlaceImage(md, "classroom3.jpg");

	addPlaceTitle(md, "Anatomy Classroom");

	md.write('<p>Your favorite class. You have enjoyed many hours in this room watching Miss Logan explain about things that are usually banned at home. Vandals have defaced the chalkboard. Again.</p>');

	if (bOpen) {
		if (clv > 0) {
			if (clv == 1) {
				// Basic slave
				md.write('<p>After you took over her mind, Miss Logan rapidly forgot about that project that she gave to you. However you two have discussed the idea of some private lessons about the only thing that interests you in anatomy; Her. Miss Logan liked the idea so much that she doesn’t even care about the other students or her normal lessons. She’s always well prepared for your arrival to these kind of sessions. By dressing sexy and letting you fuck her anytime you want she slowly turns into your servant.</p>');
				if (isVisible()) md.write('<p>Miss Logan is patiently sitting next to her desk, waiting for you when you enter the somewhat run down empty classroom. She gently kisses you on the lips (her way of welcoming you) and asks you if you want your extra coaching or you want something more.</p>');
			} else {
				// Breeder
				md.write('<p>After you took over her mind, Misss Logan rapidly forgot about that project that she gave to you. However you two have discussed the idea of reproduction, and breeding, breeding her that is.</p>');
				if (perYou.isMaleSex()) {
					if (perLogan.checkFlag(1)) md.write('<p>With luck you have already bred her, but if not you can always try again!. Miss Logan is standing near her desk waiting for more discussions on breeding.</p>');
					else md.write('<p>You have not yet tried to  breed her, and you look forward to fulfilling her desire! Miss Logan is standing near her desk waiting for more discussions on breeding.</p>');
				} 	else md.write('<p>While you cannot breed her personally, you have promised to find a good slave to breed her! Miss Logan is standing near her desk waiting for more discussions on breeding.</p>');
			}
		} else if (perLogan.other == 6) md.write('<p>She is busy marking some papers.</p>');
		else if (isVisible() && perLogan.other == 7) md.write('<p>She looks up and asks, "How is that project going? Do you need any help?"</p>');
	}
	startQuestions();

	if (bOpen) {
		if (perLogan.other == 6 && clv === 0) addQuestionCO(md, 'cough to get Miss Logan\'s attention', "MissLogan", 6);
		if (clv > 0) addLinkToPlaceC(md, clv == 1 ? "ask Miss Logan for a lesson" : "discuss reproduction with Miss Logan", 234, 'type=loganxxx');
	}

	addLinkToPlace(md, "exit the room", 70);

	WritePlaceFooter(md);
}