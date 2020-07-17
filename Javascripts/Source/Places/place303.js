// Place: Gina's Bathroom

function ShowPlace303(stype)
{
	var md = WritePlaceHeader(false, (stype == "mirror4" && isExplicit()) || (stype == "mirror6" && !isExplicit()) ? 'td-left-med' : '');
	var perG = findPerson("Gina");

	var bNoShow = false;

	if (perG.place == 302 && !isPossess() && !perG.isCharmedBy()) {
		//Gina is AT HOME and NOT POSSESSED and NOT CHARMED
		showPopupWindow("Gina",
			perG.addPersonString("gina7a.jpg", "height:max%", "right") +
			'"Excuse me?" she says, blocking your way.  "You can\'t just barge in here and poke around!  Get out of my house!"',
			"gotoPlace(229)"
		);
		setPlaceFlag("GinasHouse", 5);   //Has thrown you out.
		WritePlaceFooter(md, '', bNoShow);  //She kicks you out of her house.
		return;
	}

	if (stype == "mirror") {
		perG.showPerson("gina27.jpg");
		addPlaceTitle(md, "Gina\'s Bathroom Mirror");
		md.write('<p>In the mirror you see Gina, or actually yourself possessing Gina. You are wearing a bathtowel and it appears nothing else. Gina&apos;s large breasts are keeping the towel from falling or is it that the towel is barely containing them?');
		if (perYou.isBornMale()) md.write(' Being a large breasted blonde woman is a very strange experience for you, to say the least!');
		md.write('</p>');

		setPlaceFlag("GinasHouse", 3);	// set shower scene as done
		bNoShow = true;
		startQuestions();
		addLinkToPlace(md, 'look closer', 303, 'type=mirror1');
		addLinkToPlace(md, 'look away', 303, 'type=');

	} else if (stype == "mirror1") {
		perG.showPerson("ginashower1.jpg");
		addPlaceTitle(md, "Gina\'s Bathroom Mirror");
		md.write('<p>You look fascinated and see out of the corner of your eye there is a full length mirror nearby and you hear the shower is running. You look in the mirror and see Gina, or is it you?</p>');

		bNoShow = true;
		startQuestions();
		addLinkToPlace(md, 'well... while you are here', 303, 'type=mirror2');
		addLinkToPlace(md, 'No, no get back what you were here for', 303, 'type=');

	} else if (stype == "mirror2") {
		perG.showPersonRandom("ginashower2", 2);
		addPlaceTitle(md, "Gina\'s Bathroom Mirror");
		md.write('<p>You step into the shower and lean against the glass wall, pressing Gina\'s...your breasts against the glass wall. In the mirror you can see the lovely sight.</p>');

		bNoShow = true;
		startQuestions();
		addLinkToPlace(md, '...she was just about to have a shower...', 303, 'type=mirror3');
		addLinkToPlace(md, 'No, no get back what you were here for', 303, 'type=');

	} else if (stype == "mirror3") {
		perG.showPerson("ginashower3.jpg");
		addPlaceTitle(md, "Gina\'s Bathroom Mirror");
		md.write('<p>You feel the shower on your body and start to rub your body with hands and soap. You start to feel very aroused, especially when you touch your large breasts.</p>');

		bNoShow = true;
		startQuestions();
		addLinkToPlace(md, 'you have to explore more...', 303, 'type=mirror4');
		addLinkToPlace(md, 'No, no get back what you were here for', 303, 'type=');

	} else if (stype == "mirror4") {
		perG.showPersonRorX("ginashower4.jpg");
		addPlaceTitle(md, "Gina\'s Bathroom Mirror");
		md.write('<p>You touch your pussy, well Gina\'s, and feel a surge of arousal. quickly feeling close to your first orgasm in her body...</p>');

		bNoShow = true;
		startQuestions();
		addLinkToPlace(md, '...what is that over there...', 303, 'type=mirror5');
		addLinkToPlace(md, 'No, no get back what you were here for', 303, 'type=');

	} else if (stype == "mirror5") {
		perG.showPerson("ginashower5.jpg");
		addPlaceTitle(md, "Gina\'s Bathroom Mirror");
		md.write('<p>You see a dildo sitting on a shelf nearby, ready for use...</p>');

		bNoShow = true;
		startQuestions();
		addLinkToPlace(md, '...well Gina uses it...', 303, 'type=mirror6');
		addLinkToPlace(md, 'No, no get back what you were here for', 303, 'type=');

	} else if (stype == "mirror6") {
		perG.showPersonRorX("ginashower6.jpg");
		addPlaceTitle(md, "Gina\'s Bathroom Mirror");
		md.write('<p>You play with the dildo for a little, but very quickly ');
		if (perYou.isBornMale()) md.write(' come to your first powerful orgasm as a woman!');
		else md.write(' orgasm in Gina\'s body, it feels wonderful, similar but different!');
		md.write('.</p>');

		bNoShow = true;
		startQuestions();
		addLinkToPlace(md, '...ummm...', 303, 'type=mirror7');

	} else if (stype == "mirror7") {
		perG.showPerson("ginashower7.jpg");
		addPlaceTitle(md, "Gina\'s Bathroom Mirror");
		md.write('<p>You look at Gina in the mirror in the afterglow of your orgasm, vowing to try this again sometime...</p>');

		bNoShow = true;
		startQuestions();
		addLinkToPlace(md, 'Enough for now, get back to what you were here for', 303, 'type=');

	} else {
		if (sType === "ginabath") {
			perG.showPersonRandom("gina-bath", 3);
			addPlaceTitle(md, "Gina\'s Bath");
		} else addPlaceTitle(md, "Gina\'s Bathroom", "bath1.jpg");
		if (sType === "ginabath") md.write('<p>Gina is bathing, well playing in the bath for your pleasure.</p>');
		else md.write('<p>A nice, well kept, and clean bathroom.  Did you expect anything less from someone like Gina?</p>');

		if (!checkPlaceFlag("GinasHouse",7)) {
			//Haven't cast PASS to open the drawer
			md.write('<p>One of the drawers beside the sink seems to be jammed shut - quite out of place in such an immaculate room.</p>');}
		else md.write('<p>The drawer now sits open...</p>');

		if (whereItem(34) == 303) {
			md.write('<p>You notice a small lock of blonde hair caught up in one of the brushes within the drawer.</p>');
		}
		if (checkPlaceFlag("GinasHouse", 6)) {
			md.write('<p>You notice a small stone in the drawer... where <i>do</i> these things come from, you can\'t help but wonder.</p>');
		}
		if (isPossess("Gina")) {
				// Possessed
			if (perG.extra[1] == 1) {
				// First time possessing her
				md.write('<p>You are in the living room of Gina&apos;s home, for some reason you feel cold.</p>');
				if (!checkPlaceFlag("GinasHouse", 3)) {
					// Shower scene
					md.write('<p>A shower is running nearby and you catch a glimpse of yourself, or should you say Gina in a mirror...</p>');
				}
			}
		}

		//**********************************************************************************
		startQuestions();

		if (isPossess("Gina")) {
			// YOU HAVE POSSESSED GINA
			if (perYourBody.FindItem(43) > 0) addQuestionC(md, 'remove the heirloom and hide it so Gina won\'t be able to find it', "Misc", 30300);
			if (perG.extra[1] == 1 && !checkPlaceFlag("GinasHouse", 3)) {
				// Shower scene
				addLinkToPlace(md, 'look in the mirror', 303, 'type=mirror');
			}
		}
		if (checkPlaceFlag("GinasHouse", 6)) addQuestionC(md, 'pick up the stone', "Misc", 1506);
		if (perG.isCharmedBy() && perG.place == 302 && sType !== "ginabath") {
			// Charmed and at home
			addLinkToPlaceC(md, 'ask Gina to join you in the bathroom', Place, 'type=ginabath', 'Gina joins you, quickly stripping and staring to run a hot bath. As the tub fills she plays with the shower-head and other bathing accessories for your entertainment.');
		}
		addLinkToPlace(md, 'leave the bathroom', 302, '', sType == "ginabath" ? 'Gina dries off and follows you in a few minutes' : '');
	}

	WritePlaceFooter(md, '', bNoShow);
}