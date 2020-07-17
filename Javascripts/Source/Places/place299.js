// Event: Transfer the vampyre

function ShowPlace299(stype)
{
	var md = WritePlaceHeader();

	var perSarah = findPerson("Sarah");
	var perVamp = findPerson("Vampyre");
	if (stype == "free" && perVamp.isCharmedBy("You")) stype = "yours";
	var perB = findPerson("Bambi");
	var sWait = getQueryParam("wait");

	if (stype === "") {
		// Initial meeting/Start

		perVamp.showPerson("vamp9s.jpg");

		addPlaceTitle(md, "Sarah and her Vampyre");

		perVamp.setFlag(6);
		if (perSarah.checkFlag(2)) {
			md.write(
				'<p>You hear Sarah say something annoyed to the vampyre, it looks like she is trying again to make her submit. Clearly unsuccessfully. Sarah asks you</p>' +
				'<p>"Do you want to take her now?"</p>'
			);
		} else {
			perSarah.setFlag(2);
			if (sWait == "true") {
				md.write(
					'<p>You are sitting talking to Sarah and the Vampyre walks into the room, ignoring you completly and quietly stands next to Sarah. Sarah looks at you and smiles, she stands and starts to remove her clothing, but she turns her back to you and orders the vampyre, "Lilith, show our visitor your obedience and devotion, lick me and make me cum". Still ignoring you the Vampyre kneels behind Sarah, and starts licking her delightful rear end. You can see the vampyre has a curious mixture of lust and hunger in her expression, then she bites Sarah\'s ass, drawing a small trickle of blood and she starts to lick the blood. Sarah calls out in pain, she tells the vampyre,</p>' +
					'<p>"Enough Lilith!" and the speaks to you, "She will not act right, she says she loves me and will obey me, but she refuses to do some things. She will not submit to me, no matter how reluctantly, unlike someone I could name."</p>' +
					'<p>Sarah starts to redress, and the vampyre says to her,</p>' +
					'<p>"I am no slave, I am a predator and have my own will. You command my heart and soul, but you cannot control my nature."</p>' +
					'<p>Sarah looks annoyed, "See what I mean? Look, do you want her? Maybe we can work out how you could enspell her instead of me. We would have to free her of the Unlife-enspelled and the you could bind her. We would have to make sure she did not kill us inbetween, I do not feel confident any protective items would work again. Could we just tie her up? I do not have any experience with that sort of stuff, do you?"</p>'
				);

			} else {
				md.write(
					'<p>You hear Sarah yell out something, she sounds annoyed! You step into her room and see she is naked and the Vampyre is kneeling behind her, licking her delightful rear end. You can see the vampyre has a curious mixture of lust and hunger in her expression and you see a slight trace of blood. Sarah looks at you and she looks a little embarrassed, she tells the vampyre,</p>' +
					'<p>"Enough Lilith!" and the speaks to you, "She will not act right, she says she loves me and will obey me, but she refuses to do some things. She will not submit to me, no matter how reluctantly, unlike someone I could name."</p>' +
					'<p>Sarah starts to redress, and the vampyre says to her,</p>' +
					'<p>"I am no slave, I am a predator and have my own will. You command my heart and soul, but you cannot control my nature."</p>' +
					'<p>Sarah looks annoyed, "See what I mean? Look, do you want her? Maybe we can work out how you could enspell her instead of me. We would have to free her of the Unlife-enspelled and the you could bind her. We would have to make sure she did not kill us inbetween, I do not feel confident any protective items would work again. Could we just tie her up? I do not have any experience with that sort of stuff, do you?"</p>'
				);
			}
		}
		if (!isSpellKnown("MirDaru") || perYourBody.FindItem(32) === 0) {
			md.write('<p>');
			if (!isSpellKnown("MirDaru")) md.write('Unfortunately you have not learned the spell to bind the vampyre yet.');
			if (perYourBody.FindItem(32) === 0) md.write(' You have no means to free the vampyre from the spell.');
			md.write('</p>');
		}

		//Choices
		startQuestions();
		addLinkToPlaceC(md, '"No, deal with her yourself"', 192, 'type=nohelp');
		addLinkToPlaceC(md, "not yet", 192, '', 'You tell Sarah to cope for now, you will deal with the vampyre later');
		if (perYourBody.FindItem(32) > 0 && isSpellKnown("MirDaru")) addLinkToPlaceC(md, '"I can free and bind her so we can do this"', 299, isCharmedBy("Bambi") ? 'type=bound' : 'type=notbound');
		else addLinkToPlaceC(md, "there is nothing you can do", 192, '', 'You tell Sarah that there is nothing you can do, you have no means to free the Vampyre');

	} else if (stype === "notbound") {

		// Vamyre is bound
		perVamp.showPerson("vamp1b.jpg");

		addPlaceTitle(md, "Vampyre");

		md.write(
			'<p>You know you can free the vampyre and bind her with magic, but you are not sure how to restrain her after freeing her with the Silver Ring. If only you know more of bondage or knew someone skilled in these arts or at least talented as a courtesan.</p>' +
			'<p>You will have to leave it here, until you can work out a way to restrain the vampyre.</p>'
		);

		//Choices
		startQuestions();
		addLinkToPlaceC(md, "leave it there for now", 192);

	} else if (stype === "bound") {

		// Vamyre is bound
		perVamp.showPersonRandom("vamp6", 3);

		var myName = perB.getYourNameFor();

		addPlaceTitle(md, "Vampyre Bound");

		md.write(
			'<p>You remember that Bambi has mentioned some experience in BDSM and phone her to join you here with Sarah. She eagerly agrees, and tells you she will be there as soon as she can. Maybe 30 mintes later there is a knock at the door and Bambi enters carrying a bag and dressed...differently. She looks around and says,</p>' +
			'<p>"Not what I expected ' + myName + ' I thought we were going to play with Miss Gates! Since I came here to play, how do you like my old school uniform? It still fits me!"</p>' +
			'<p>She giggles in a theatrical way, and continues,</p>' +
			'<p>"So is it this woman or Miss Gates who is to be the center of attention?"</p>' +
			'<p>The vampyre looks at Bambi with a murderous expression, and starts to, well, stalk towards Bambi. Sarah orders her to stop, and let Bambi tie her up. The vampyre stops with great reluctance, it seems she is near the limits of the control of the spell. Still, she sits still as Bambi gets out her bondage gear. You tell Bambi to make sure she is <b>very</b> tightly tied, <b>very</b>. Bambi winks, and continues, but Bambi being Bambi she first strips the vampyre naked before tying her extremely tightly.</p>' +
			'<p>After a while you look and the vampyre is securely bound and Bambi asks, continuing her role-playing "What kind of game are we going to play?"</p>'
		);

		//Choices
		startQuestions();
		addLinkToPlaceC(md, '"No, no, not now!"', 192, '', 'You tell Sarah and Bambi that you will forget it now and try this later');

		AddPeopleColumnMed();
		perB.showPerson("bambi14a.jpg");

	} else if (stype === "boundfree") {

		// Vamyre is bound
		perVamp.showPersonRandom("vamp6", 3);
		startTimedEvent("dispPlace(299,'type=free')", 1);
		AddMana(5);

		addPlaceTitle(md, "Freed Vampyre Bound");

		md.write(
			'<p>The silver ring absorbs the power of the spell binding the vampyre. Immediately the vampyre screams, a sound of fury and lust and you hear her bindings creak as she strains with her inhuman strength to break them, and kill everyone in this room.</p>' +
			'<p>Bambi looks confused, "Strange games you are playing here!"</p>' +
			'<p>You hear something snap in the vampyres bindings and you realise you only have a moment before she breaks free...</p>'
		);

		//Choices
		startQuestions();
		addLinkToPlaceC(md, "tell Bambi to leave", 299, 'type=free');
		addLinkToPlaceC(md, "ask Sarah what is wrong", 299, 'type=free');

		AddPeopleColumnMed();
		perB.showPerson("bambi14a.jpg");


	} else if (stype === "free") {

		perVamp.showPerson("vamp3b.jpg");

		addPlaceTitle(md, "Vampyre Breaks Free");

		md.write(
			'<p>The vampyre screams as her bindings all break, and she leaps on you with inhuman speed. All goes dark...</p>' +
			'<p>...briefly you awaken to see the vampyre and Sarah embracing as they are standing over Bambi\'s body. There are fang marks on Sarah\'s neck and blood is flowing into her mouth from the vampyre.</p>' +
			'<p>They notice you are awake, and there is a blur as the vampyre attacks, killing you in an instant...</p>' +
			'<p>That would seem to be it, darkness falls over your eyes and over Glenvale as a plague of vampyres descend. You were just too slow in binding the vampyre.</p>'
		);

		//Choices
		addRestartLink(md);

	} else if (stype === "free2") {

		perVamp.showPerson("vamp3b.jpg");

		addPlaceTitle(md, "Vampyre Freed");

		md.write(
			'<p>The vampyre screams as you free her at the wrong time, and she leaps on you with inhuman speed. All goes dark...</p>' +
			'<p>...briefly you awaken to see the vampyre and Sarah embracing as they are standing over Bambi\'s body. There are fang marks on Sarah\'s neck and blood is flowing into her mouth from the vampyre.</p>' +
			'<p>They notice you are awake, and there is a blur as the vampyre attacks, killing you in an instant...</p>' +
			'<p>That would seem to be it, darkness falls over your eyes and over Glenvale as a plague of vampyres descend. You were just too slow in binding the vampyre.</p>'
		);

		//Choices
		addRestartLink(md);

	} else if (stype === "yours") {

		perVamp.showPerson("vamp1b.jpg");

		addPlaceTitle(md, "Your Vampyre");

		perVamp.place = -1;
		perVamp.other = 100;
		perSarah.other = 116;
		perVamp.charmThem(4);
		perSarah.setFlag(8);

		md.write(
			'<p>The vampyre stops stuggling and you realise she is yours. With a sligh hesitation you tell Bambi to untie the vampyre, she looks at you, having no idea what has just happened,</p>' +
			'<p>"What, no games?"</p>' +
			'<p>You tell her that you will play another time, and she looks disappointed, but she unties the vampyre who looks intensely and hungrily at Bambi. You tell the vampyre to stop, and then order Bambi to leave and return to the hotel. Still unsure what is happening Bambi gets her things and leaves, waving you goodbye.</p>' +
			'<p>The vampyre stands and pointedly ignores Sarah, she clearly remembers everything and appears to be feeling scorned by Sarah, her ex-mistrsss and ex-lover. She looks at you intensely, as she partially removes her clothing, leaving a hood in place to cover most of her face. She has a beautiful, if pale body, and black hair, but her hair had odd quailities, and can appear reddish at times.</p>' +
			'<p>"' + perYou.getMaster() + ', that was the spell of Necromancy the charm of \'Bind the Dead\', or \'Unlife Enspelled\'. It has made me your thrall, in body and heart. I will do anything you command, my mind is my own but I still must obey and love you."</p>' +
			'<p>You ask the vampyre where she came from, and she replies, "' + perYou.getMaster() + ', I am yours to command, <b>you</b> may command me to do anything, except answer questions."</p>' +
			'<p>She continues, "I am yours, I will follow you to the grave, but in the daytime I must rest in the crypt."</p>' +
			'<p>Without looking at Sarah she states, "' + perYou.getMaster() +  ' I will now kill the witch-girl"</p>' +
			'<p>You order her to stop and she will only kill at your command, never at any other time!. The vampyre smiles cruely, you think more for Sarah, "Of course ' + perYou.getMaster() + '"</p>'
		);

		//Choices
		startQuestions();

		addLinkToPlaceC(md, "speak to Sarah", 192);

		AddPeopleColumnMed();
		perB.showPerson("bambi14a.jpg");
		
	} else if (stype == "stakevampyre") {
		perVamp.showPerson("vampdead.jpg");

		addPlaceTitle(md, "Your Vampyre");

		perVamp.place = 1000;
		perVamp.health = 0;
		perSarah.other = 116;
		perVamp.unCharmThem();
		perSarah.setFlag(8);

		md.write(
			'<p>You tell Bambi to leave as you grab a heavy ornament and take out one of the stakes you had made. You briefly hesitate, you are after all going to kill this person, but she is a fiend, and terrible vampire!</p>' +
			'<p>You hammer the stake but to little effect, and the vampyre looks around and strains at her bonds with her inhuman strength. You hea a snap and then another, and with desperation you hammer at the stake again. Somehow how it sinks into her flesh and she screams and falls limp. You do not know if she is dead, or well more dead, or not. You finish the ill-deed until the stake is deeply embedded in her and Sarah tells you,</p>' +
			'<p>"Stop, that is enough ' + perSarah.getYourNameFor() + ', she is lain to rest. I did not expect you to do this..."</p>' +
			'<p>TSarah looks rather surprised and a little shocked. She skaes her head as she regains her composure and tells you, a little hesitantly,</p>' +
			'<p>"It is the taks of my family to guard against these creatures...I will have the body dealt with...but can you leave me for a while...please."</p>'
		);

		//Choices
		startQuestions();
		if (checkPersonFlag("Lauren", 3)) addLinkToPlace(md, 'go to the guest room', 290, '', '', '', '', 'moveblock');
		addLinkToPlace(md, 'exit the house', 16);
		
	} else if (stype == "nohelp") {
		
		perVamp.showPerson("vamp9s.jpg");

		addPlaceTitle(md, "Sarah and her Vampyre");

		perSarah.other = 116;
		perSarah.setFlag(8);

		md.write(
			'<p>You tell Sarah that the idea of controlling a vampyre is distateful to you and she should do her best to get her slave under her control. You promise to help her in any way you can, but not to the extent of taking the vampyre from Sarah.</p>' +
			'<p>TSarah looks disappointed,</p>' +
			'<p>"It is the taks of my family to guard against these creatures, I will just have to lean to control Lilith here better. I wish you had of take her, but so be it!"</p>'
		);

		//Choices
		startQuestions();

		addLinkToPlaceC(md, "speak to Sarah", 192);

	}

	WritePlaceFooter(md, '', true, true);
}