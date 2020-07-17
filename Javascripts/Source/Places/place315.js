// Repeatable sex scene with Gina

function ShowPlace315(stype)
{
	var md = WritePlaceHeader(false, stype != "play" && stype !== "" && isExplicit() ? "td-left-med" : "");

	var perG = findPerson("Gina");

	var bMuseum = (perG.place === 0);		// At the museum

	if (stype == "play") {
		if (perG.place === 0) perG.showPersonRorX("gina11a.jpg");
		else perG.showPersonRorX("gina11b.jpg");
	} else if (isExplicit() && stype !== "") {
		if (bMuseum) {
			//At the Museum
			if (perYou.isMaleSex()) {
				if (stype == "bj") perG.showPersonRandomX("gina10b", 2);
				else perG.showPersonRandomX("gina12b", 2);
			} else {
				if (stype == "bj") perG.showPersonX("gina10ga.jpg");
				else perG.showPersonX("gina10gb.jpg");
			}
		} else {
			//At Home
			if (perYou.isMaleSex()) {
				if (stype == "sixtynine") perG.showPersonX("gina26ba.jpg");
				else if (stype == "fuck") perG.showPersonX("gina26bb.jpg");
				else perG.showPersonX("gina26bc.jpg");
			} else perG.showPersonX("gina26g.jpg");
		}
	} else {
		if (bMuseum) perG.showPerson("gina10.jpg");			//At the Museum
		else perG.showPerson("gina26.jpg");		//At Home
	}

	addPlaceTitle(md, "Slave Gina Showing her Gratitude");

	var myName = perYou.getMaster();

	if (stype === "") {
		// Start of scene
		md.write(
			'<p>"Oh yes!" she cries, instantly removing her clothing, and carefully assisting ' +
			'in the removal of yours. "How shall I please you today, ' + myName +
			'?" she asks as she lies back in her chair, displaying her naked body just the way you like it.</p>'
		);

		if (perYou.isMaleSex())
		{
			md.write(
				'<p>"Shall I swallow your cum again, ' + myName + '?  I so love the taste of it."</p>' +
				'<p>"Or would you like to take me from behind as I lean over the chair?  That always reminds me that I am not a real person, but a slave, an object for your use... and I <i>love</i> being reminded of that," she says, beginning to work herself into a fit.</p>'
			);
		}
		else
		{
			md.write('<p>"Shall I drink of your juices once more, ' + myName + '?  I so love the way you taste!"</p>');
			if (perG.place === 0) md.write('<p>"Or shall we lay on the floor and use a double ended dildo, the thought of you fucking yourself on this poor worthless slave is almost more than I can stand," she says,  beginning to work herself into a fit.</p>');
		}

		md.write(
			'<p>Or shall I simply run my hands all over the body of my ' + myName + ', worshiping every inch as if it was my sole purpose in life?  Which it is," she says smiling.</p>' +
			'<p>You think of your options for a while,</p>'
		);
		//before finally saying, "You decide," -- allowing your slave to determine how best to please her ' + myName + '.</p>');

	} else if (stype == "fuck") {
		// Anywhere, any gender
		if (perYou.isMaleSex()) {
			md.write(
				'<p>You fuck Gina</p>' +
				'<p></p>'
			);
		} else {
			md.write(
				'<p>You fuck Gina with the dildo</p>' +
				'<p></p>'
			);
		}

	} else if (stype == "bj") {
		// Anywhere, any gender
		if (perYou.isMaleSex()) {
			md.write(
				'<p>Gian gives you a blowjob</p>' +
				'<p></p>'
			);
		} else {
			md.write(
				'<p>Gina licks you</p>' +
				'<p></p>'
			);
		}

	} else if (stype == "sixtynine") {
		// Home & Male only
		md.write(
			'<p>Eagerly Gina removes what little she is wearing and then almost rips your clothing off in her desire to obey you. She almost forcefully pushes you down and straddles your chest. You feel her hot, moist mouth envelope your hardening cock. She pushes her equally moist pussy towards your face.</p>' +
			'<p>You firmly reassert your control as you slap her ass and tell her to take your cock as deeply as she can. You grab her ass and start to lick her dripping folds. As you do she takes your cock deeper and deeper with long practised skill.</p>' +
			'<p>Gina is very talented and it does not take long before you are cumming hard down your slaves throat. As you do you feel a splash of her juices and see her pussy pulsing in her orgasm.</p>' +
			'<p>You both redress and Gina looks at you, "Thank you ' + perYou.getMaster() + '!"</p>'
		);

	} else if (stype == "play") {
		// Anywhere, any gender
		if (bMuseum) {
			md.write(
				'<p>Gina steps off of the desk and starts to play with herself, making a big show of her large breasts. She is mainly playing for your attention, and not focusing much on her pleaure.</p>' +
				'<p>Still, her passion grows, you can see it in her nipples, her moistness and her breathing. She looks at you "' + perYou.getMaster() + ' are you ready for me to cum?". You tell her "Yes, cum for me slave".</p>'
			);
		} else {
			md.write(
				'<p>Gina quickly removes what little she is wearing and sits on the couch and intently plays with her pussy and breasts. She seems to be less playing for your entertainment than to arouse herself.</p>' +
				'<p>She quickly reaches the edge of her climax and she looks at you "Can I cum for you, and only you?". You see no reason to deny your big-breasted slave and tell her to cum. She cries out "' + perYou.getMaster() + '" and has a strong orgasm.</p>'
			);
		}

	}

  startQuestions();

	if (bMuseum) //@ the Museum
	{
		if (stype === "") {
			if (perYou.isMaleSex()) {
				addLinkToPlaceC(md, '"I will take you"', 315, "type=fuck");
				addLinkToPlaceC(md, '"swallow my cum"', 315, "type=bj");
			} else {
				addLinkToPlaceC(md, '"get the dildo"', 315, "type=fuck");
				addLinkToPlaceC(md, '"drink my juices"', 315, "type=bj");
			}
			addLinkToPlaceC(md, '"play with yourself"', 315, "type=play");
		}
		addLinkToPlace(md, "let her finish, then speak with Gina some more", 304);
		addLinkToPlace(md, "leave the Museum", 238);
	}
	else //@ home
	{
		if (stype === "") {
			if (perYou.isMaleSex()) {
				addLinkToPlaceC(md, '"We will sixty-nine"', 315, "type=sixtynine");
				addLinkToPlaceC(md, '"I will take you"', 315, "type=fuck");
				addLinkToPlaceC(md, '"swallow my cum"', 315, "type=bj");
			} else {
				addLinkToPlaceC(md, '"drink my juices"', 315, "type=bj");
			}
			addLinkToPlaceC(md, '"play with yourself"', 315, "type=play");
		}
		addLinkToPlace(md, "let her finish, then speak with Gina some more", 302);
		addLinkToPlace(md, "leave the house", 229);
	}

	WritePlaceFooter(md);
}