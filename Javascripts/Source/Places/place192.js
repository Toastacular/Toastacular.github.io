// Sarah Gates' Room

function ShowPlace192(stype)
{
	var md = WritePlaceHeader();
	var bMurder = isMurderPath();
	//var perVamp = findPerson("Vampyre");
	var perMiku = findPerson("Miku");
	var perLauren = findPerson("Lauren");
	var perSarah = findPerson("Sarah");
	var bCharmed = perSarah.isCharmedBy();
	var myName = perSarah.getYourNameFor();
	if (perSarah.place == 17) perSarah.place = 192;

	if (whereItem(41) == 191) moveItem(41, 192);	//Left the aftane in the room with the safe, move it here for you to pick up
	if (perYou.getQuestAftane() == 3 && bCharmed && bMurder) {
		//You asked her about the Aftane before charming her
		perYou.setQuestAftane(1);					// Reset the Aftane path so you can ask her again
	}
	if ((bCharmed || isConspiracyPath()) && whereItem(4) == 998)  moveItem(4, 999);
	var bAfter = perSarah.place == 192 && (Math.floor(perSarah.other) == 114 || Math.floor(perSarah.other) == 117 || Math.floor(perSarah.other) == 120);

	//**********************  Picture Placement *********************
	if (perMiku.other == -3) addPlaceImage(md, "mansionlibrary.jpg");
	else if (bAfter) perSarah.showPerson("sarah13.jpg");
	else if (bCharmed) perSarah.showPersonDN("sarah7.jpg");
	else if (bMurder) perSarah.showPerson("sarah1a.jpg");
	else perSarah.showPersonDN("sarah12.jpg");

	//*********************  Description ****************************
	if (bMurder) addPlaceTitle(md, "Gates Mansion");
	else addPlaceTitle(md, "Sarah Gates's Room");

	if (stype == "magic" || stype == "power") {
		// (Conspiracy Path) Initial meeting part 2
		perLauren.showPersonDN("lauren1a.jpg", "40%", "right");
		if (stype == "magic") {
			perYou.addCorruption(-5);
			md.write('<p>You explain about you fascination with magic and the legends of the Book of Control and how this has shaped your quest to date. Sarah listens sipping her wine with a doubtful expression on her face, she does not seem to completely believe you.</p>');
		} else {
			perYou.addCorruption(5);
			md.write('<p>You agree with Sarah, she has summed up what you want as well, though maybe the term \'modicum\' could be expanded upon.</p>');
		}
		md.write(
			'<p>"Well ' + perYou.getPersonName() + ' I think our first order of business is to exchange magic. Please teach me the spells you have learned so far. I will teach you the spell I know currently and any more I learn."</p>' +
			'<p>You spend a little while teaching Sarah the spells from the Book that you know, she is brilliant and learns the spells with no effort. She offers to teach you her spell any time you like.</p>' +
			'<p>Lauren re-fills the wine glasses, and Sarah continues talking, "You are looking to perform a séance soon, to talk to the despised warlock Kurndorf. You must be very careful, he will be dangerous even in death. You will need protection, my uncle has an item call an \'Aftane\' that will help you."</p>' +
			'<p>She pauses, "Do not attempt to ally yourself with Kurndorf, he will enslave you, he will never help you or share power with you, just use you for his own evil."</p>' +
			'<p>She smiles again, "Alright, let\'s leave it there for now, you are welcome to visit again other evenings in the same way you did tonight. Lauren can escort you out of the mansion when you wish to leave. Ohh one last thing, Lauren is my maid, mine in mind and body, she will do anything I ask of her."</p>' +
			'<p>You see Lauren look at Sarah, a look of acceptance and loyalty, not one of devotion.</p>'
		);

	} else if (perSarah.place == 192 && perSarah.other == 50 && isConspiracyPath()) {
		// (Conspiracy Path) First meeting with Sarah
		perYou.setQuestAftane(1);
		perSarah.setFlag(1);
		perSarah.other = 51;
		perYourBody.RemoveItem(40);  // remove the wine from the game.
		perLauren.showPersonDN("lauren1a.jpg", "40%", "right");
		md.write(
			'<p>Lauren leads you to a bedroom and gestures for you to enter before her, which you do and you are met by a beautiful young woman dressed in a lovely black nightie. She smiles at you as Lauren takes her place nearby,</p>' +
			'<p>"Well ' + (perYou.isBornMale() ? 'Mr' : 'Miss') + ' Not Apprentice, we finally meet in person. I am Sarah Gates, the niece of ' + perGates.getPersonNameShort() + ' Gates whom you met before."</p>' +
			'<p>She looks at the wine bottle you are carrying, "An excellent vintage, a delightful exchange of gifts isn\'t it Lauren? Will you please pour the wine for us Lauren, you may have a glass as well if you like". Lauren opens the bottle and pours 3 glasses handing one to Sarah and then one to yourself. She stands back, awkwardly sipping from the remaining glass.</p>' +
			'<p>One small thing you noticed in that exchange there, Sarah subtly stressed Lauren\'s name. Was she teasing Lauren about her offer at the hotel, but it seemed something else, maybe Lauren is a nickname or something.</p>' +
			'<p>Sarah sips her wine and addresses you, "I suppose you want to know why I am doing this, taking the Book of Control and helping you. It is simple, Uncle Ronny will not teach me magic, he says my attitude is wrong, that magic is to defend and help, never for your personal desires. I am no Buddhist or Jedi, but I am not a wanton power-mad despot like the warlock Kurndorf was. ' +
			'I want to have fun and a modicum of power and not <i>only</i> help people. I can see you have similar desires from what I have seen of your explorations. Is that not true?"</p>'
		);

		startQuestions("You reply");
		addLinkToPlaceC(md, '"No, I am just fascinated by magic"', 192, 'type=magic');
		addLinkToPlaceC(md, '"Yes, that is it precisely!"', 192, 'type=power');

		WritePlaceFooter(md);
		return;

	} else if (isConspiracyPath()) {
		// Later meetings with Sarah on the conspiracy path
		// No content except vampire stuff currently
		md.write('<p>You knock on the door to Sarah Gate\'s room and she brightly asks you to enter.</p>');

		if (whereItem(25) == 999 || whereItem(21) == 999) // Lost when shot
		{
			md.write('<p>"' + perYou.getPersonName() + '! I am so glad you are alright.  I visited you in the hospital but you were still in intensive care.  Here, the police brought a few things from when you were shot, I was able to keep them from Uncle Ronnie.</p>');
			if (whereItem(25) == 999) moveItem(25); // put the wooden box here.
			if (whereItem(21) == 999) moveItem(21); // put the blue key here
		}

	} else if (bCharmed) {
		// CHARMED
		md.write('<p>Sarah Gates is so glad to see her One True ' + perYou.getMaster() + '. She grovels before you, begging for attention.</p>');

		if (perLauren.flags[0] === 0)	{
			if (whereItem(40) == 192) md.write('<p>"This wine looks very delicious.  Thank you, ' + perYou.getMaster() + '. Would you like me to call the maid to open it?" Sarah asks.</p>');
			else if (perYourBody.FindItem(40) > 0) md.write('<p>"Oh yes, ' + myName + '," says Sarah. "I see that you brought me a special wine. Please give it to me so we can celebrate my new role as your faithful, loyal, devoted, and oh so <i>willing</i> slave."</p>');
			else md.write('<p>"' + perYou.getMaster() + '," says Sarah. "I am so thirsty... if only we had a bottle of wine, I could serve you properly..."</p>');
		}
		else md.write('<p>"Thank you for the wine, ' + perYou.getMaster() + '. Is there any <i>other</i> way that I may serve you?"</p>');

		if (perSarah.checkFlag(1) && !isSpellKnown("Clairvoyance")) md.write('<p>"Oh darling," she says in a husky tone. "I can teach you something I know you would like. A spell, so powerful that it will lead you to places no other can go."');

		if (whereItem(25) == 999 || whereItem(21) == 999) // Lost when shot
		{
			md.write('<p>"' + perYou.getMaster() + '! I am so glad you are alright.  I visited you in the hospital but you were still in intensive care.  Here, the police brought a few things from when you were shot.</p>');
			if (whereItem(25) == 999) moveItem(25); // put the wooden box here.
			if (whereItem(21) == 999) moveItem(21); // put the blue key here
		}
	} else {
		// NOT CHARMED
		if (bMurder) {
			// Murder Path
			md.write('<p>You enter the Gates\' Mansion to see a elegant young lady, sitting on the floor. You recognise her from her from the paper. It is Sarah Gates, the richest lady in Glenvale.</p>');
			if (perSarah.other === 1) md.write('<p>She is obviously distressed by the departing of her uncle Ronald. Drying tears away she looks up to see you. \"Who are you?\" she asks in a sweet, if wearied voice. \"Do you know what happened to Uncle Ronny?\"</p>');

		} else {
			// Apprentice Path
			if (perSarah.place == 192 && (perSarah.other == 114 || perSarah.other == 117 || perSarah.other == 120)) md.write('<p>Sarah sits up after Lauren finishes \'attending\' her, still partially unclothed. Lauren stand nearby looking acutely uncomfortable.</p>');
			else md.write('<p>You knock on the door to Sarah Gate\'s room and she brightly asks you to enter.</p>');
		}
	}
	if (perLauren.flags[0] == 1) {
		md.write(
			'<p>With a brisk, set pace a woman enters the room to open the darkened bottle of wine. For the first time you notice that the label seems old and faded.  Most likely a rather rare and expensive wine, and very good as well. With practiced grace she lifts the bottle and pours out the appropriate amounts, filling the flute with a deep red liquid, almost as if blood poured for the lips of her mistress. After setting the wine down carefully upon the table, she takes hold of the slender shaft of a feather duster and waits for permission to leave.</p>' +
			'<p>When you turn your eyes upon her, she seems to lightly tilt her head and look away not seeming to care about your presence one or another, simply tolerating you for the moment. However, your eyes tend to stray to the shiny material of uniform, done in the classic cut of a French maid, with the appropriate touches of frilly lace, high heels and stockings, but, done in latex instead of the usual cotton or silk. Upon her release, she quickly turns and makes her way back into a guest rooms.</p>'
		);
	}

	//****************************** Dialogue Options  ***********************************
	startQuestions();

	if (bCharmed) addLinkToPlaceC(md, '"You may <i>serve</i> me now Sarah."', Place, 'type=sarahservice');

	// Murder Path or Conspiracy Path Options only
	if (bMurder || isConspiracyPath()) {
		if (perYou.getQuestAftane() > 0) // Have Jump Started the "Aftane Path"
		{
			if (perYou.getQuestAftane() == 1) addQuestionC(md, isConspiracyPath() ? '"Do you know where your uncle keeps the <i>Aftane</i>?"' : '"Do you know where your uncle kept the <i>Aftane</i>?"', "Sarah", 901);
			if (perYou.getQuestAftane() == 5) addQuestionC(md, '"Show me this safe. The one with the Aftane."', "Sarah",905);
		}

		if (perSarah.checkFlag(1) && !isSpellKnown("Clairvoyance")) addQuestionC(md, 'try to learn the spell', "Sarah", 2801);		// Learn Clairvoyamce

		if (perYou.isShot() && whereItem(4) == 999) addQuestionC(md, '"Do you have the book?"', "Sarah", 999);

		if (isDemonFreed() && !perGates.checkFlag(6)) addQuestionC(md, 'ask Sarah about demons', "Sarah", 666);

	}

	// Conspiracy only
	if (isConspiracyPath()) {
		// Learn a training
		if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Sarah for help deciphering the passages in the book', 'spendExperience()');
		// Money
		if (!perSarah.checkFlag(5)) addQuestionC(md, '"Can you help me with some money?"', "Sarah", 100);

	} else if (bMurder) {
		// Murder only

		//The Blue Bottle Path Questions
		if (perDavy.getQuestBlueBottle() == 4) {
			//Know that Mrs Robbins sold the bottle to Sir Ronald Gates
			addQuestionC(md, '"Hey... Have you noticed a, uh...  little <i>blue</i> bottle lying around?"', "Sarah", 5904);
		} else if (perDavy.getQuestBlueBottle() == 5 && bCharmed) {
			//Have already asked her once but she wasn't charmed yet
			addQuestionC(md, '"Lets try this again...  Have you noticed a little blue bottle?"', "Sarah",5904);
		}

		if (perSarah.other == 1) {
			if (isMurderPath(true)) addQuestionC(md, '"I saw his murderers, Miss."', "Sarah", 2904);		// Soft
			else addQuestionC(md, '"I\'m afraid <i>I</i> killed your uncle, Miss."', "Sarah", 2901);
			addQuestionC(md, '"I\'m a police detective"', "Sarah", 2902);
		} else if (perSarah.other == 2) addQuestionC(md, '"Why couldn\'t I have killed him?"', "Sarah", 2903);
		else if (perSarah.other == 3) addQuestionC(md, '"Why couldn\'t they have killed him?"', "Sarah", 2906);
		else if (perSarah.other == 5) addQuestionC(md, '"Please just come down to the station with me"', "Sarah", 2905);

	}
	if (sType === "" && whereItem(40) == 192 && perLauren.flags[0] === 0 && bMurder) addQuestionC(md, '"Summon the maid, Sarah."', "Sarah", 11200);

	// Charm Lauren options
	if (perLauren.flags[0] == 1) addLinkToPlace(md, 'follow the maid to the guest rooms', 290, '', '', '', '', 'moveblock');
	else if (perLauren.checkFlag(3)) addLinkToPlace(md, 'go to the guest room', 290, '', '', '', '', 'moveblock');

	if (bMurder && bCharmed) {
		addSleepLink(md, "take Sarah to bed for the night", "Sleeping with Sarah",
			'<p style="position:absolute;left:5%;top:15%;cursor:pointer;font-size:1.1em;width:50%">' +
			'You tell Sarah that it is time for bed, and she calls Lauren to prepare the bed, and then lies down ready for you to join her.', 
			perSarah.getImg("sarah-bed1.jpg"), true
		);		
	}
	
	// Leaving
	if (!isConspiracyPath() && !bMurder) {
		addLinkToPlace(md, 'leave Sarah\'s room', 18, 'area=upstairs', '', '', '', 'moveblock');
		addLinkToPlace(md, 'go downstairs', 18, '', '', '', '', 'moveblock');
	}
	addLinkToPlace(md, 'exit the house', 16);

	if (bAfter || (bMurder && perLauren.flags[0] == 1) || (isConspiracyPath() && stype === "") || (isCharmedPath())) {
		AddPeopleColumnMed(md);
		perLauren.showPersonDN("lauren1a.jpg");
	}

	WritePlaceFooter(md);
}