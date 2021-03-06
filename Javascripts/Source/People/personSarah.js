/****************************************************************
	Sarah Gates

Basic after charm description about Sarah Gates on Charmed path:

You have carefully managed to seduce and charm Sarah without her uncle noticing it. Sarah warned you that her maid, Lauren should be put under your command if you haven’t done it yet, because Sarah has been blackmailing her to become her slave without any use of magic. Sarah is no longer in control of her life or any other’s, her sole purpose is to do anything you ask. You asked her to make a plan on how to put Sir Gates out of the picture, on which she quickly offered that she kills him in his sleep. As amusing as it is seeing her fierce loyalty, you stopped her, you are not a killer after all!
   Sarah is waiting for you in her room, her clothes become sluttier and more open each time you visit. She kisses your hand as you enter through the door and goes on all four and bows to you three times. She knows her manners that’s for sure!  That’s because she’s of noble blood.


****************************************************************/
function visitSarah(md)
{
	var perS = findPerson("Sarah");
	if (perS.other == 1000) return;
	var perVamp = findPerson("Vampyre");
	if (isCharmedPath()) {
		if (perS.place == 192 && (perS.other == 114 || perS.other == 117 || perS.other == 120)) {
			if (md === undefined) gotoPlace(192, 'type=laurenattending');
			else addLinkToPlaceC(md, "visit Sarah", 192, 'type=laurenattending');
		} else if (perVamp.isCharmedBy("Sarah") && !perS.checkFlag(8) && !perS.checkFlag(2) && perVamp.hoursCharmed("Sarah") > 36 && !isDay()) {
			if (md === undefined) gotoPlace(299);
			else addLinkToPlaceC(md, "visit Sarah", 299);
		} else if (perS.other > 109) {
			if (md === undefined) gotoPlace(192);
			else addLinkToPlaceC(md, "visit Sarah", 192);
		}
	} else {
		if (perVamp.isCharmedBy("Sarah") && !perS.checkFlag(8) && !perS.checkFlag(2) && perVamp.hoursCharmed("Sarah") > 36 && !isDay()) {
			if (md === undefined) gotoPlace(299);
			else addLinkToPlaceC(md, "visit Sarah", 299);
		} else if (md === undefined) gotoPlace(192);
		else addLinkToPlaceC(md, "visit Sarah", 192);	// Sarah Gates Main
	}
}

// Conversation options
function RepliesSarahGates(nR)
{
	var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	var ret = true;

	if (nR == 100)
	{
		per.setFlag(5);
		if (nMoney < 100)	{
			AddCash(50);
			addComments('"I can help out my ally, but only a certain amount, I may have more tomorrow"');
		} else addComments('"Sorry Uncle Ronny controls the finances, I have a fund I can use but only so much per day and today I have noting much left."');
	}
	else if (nR == 666)
	{
		addComments(
			'"' + myName + ' I do not consort with demons, I have studied them a little but they are too difficult to deal with. While some can work out bargains with them it is always at a terrible cost."</p>' +
			'<p>She heitates, "There was a <i>woman</i> who once met with Uncle Ronnie". You can hear the comtempt in her voice. "She was a skilled demonologist, and was not yet a demon-slave. She knew much of them and wanted to trade with Uncle Ronnie. He refused, I am not sure why, he seemed embarrassed."</p>' +
			'<p>You ask more about this woman, and he answers,</p>' +
			'<p>"She called herself Mistress Jade, apparently she is based out of a \'gentlemens club\' in town. I have no idea where that place is, I did not know there was one here in Glenvale, try asking someone else where it is."</p>' +
			'<p>Strange, you have never hear of such a club in town either, it must be very private!</p>'
		);
		perGates.setFlag(6);
	}
	else if (nR == 2901)
	{
		per.other = 2;
		addComments('"What! You couldn\'t have. Uncle Ronny can not be killed by any mere mortal."<br>');
	}
	else if (nR == 2902)
	{
		per.other = 5;
		addComments('"Another detective. Well go back to your ' + getPoliceChief() + ' or whoever he is and tell him that I want the murderer found and locked up."<br>');
	}
	else if (nR == 2905)
	{
		per.other = 10;
		addComments('"I hardly think so," she says defiantly.  "I am staying right here.  Tell your men to do their own duty. Leave me alone."<br>');
	}
	else if (nR == 2903)
	{
		per.other = 10;
		addComments('<p>"Because Uncle Ronny was a great warlock. Only another warlock, one of immense power, could defeat him and then only when he does not hold the blue crystal. You are only a stupid teenager."</p>');
	}
	else if (nR == 2904)
	{
		per.other = 3;
		addComments(
			'You describe how you saw the people who killed him,</p>' +
			'<p>"What! They couldn\'t have. Uncle Ronny can not be killed by any mere mortal. I heard a police ' + getOfficer(false) + ' mention your name as a suspect, but you are just an ordinary mortal too."'
		);
	}
	else if (nR == 2906)
	{
		per.other = 10;
		addComments('<p>"Because Uncle Ronny was a great warlock. Only another warlock, one of immense power, could defeat him and then only when he does not hold the blue crystal. Those people sound just like burglars, and you are only a stupid teenager."</p>');
	}
	else if (nR == 2801)
	{
		if (isConspiracyPath()) addComments('"Of course ' + myName + ' this is our agreement and alliance.  "');
		else addComments('"Of course ' + myName + '. I am so pleased to be able to serve you like this.  This was something my Uncle gave to me.  All you need do is translate this message.  Forgive me ' + myName + ', I was never able to do so myself."');
		if (!isRunes()) setQueryParams("type=learnclairvoyance");
		else {
			Research("Spell", "TuoDuo");
			ret = false;
		}
	}
	else if (nR == 2802)
	{
		if (isConspiracyPath()) addComments('"Of course, ' + myName + '"');
		else addComments('"Of course, ' + myName + '.  I only wish I could help more..."');
		if (!isRunes()) setQueryParams("type=learnclairvoyance");
		else {
			Research("Spell", "TuoDuo");
			ret = false;
		}
	}
	else if (nR == 999)
	{
		if (!bCharm) {
			if (checkPersonFlag("AmyRoss", 1)) moveItem(4, 998);
			else moveItem(4, 76); // Place the book in Mr Beasley's office waiting for you to pick up.
			addComments('"Are you the thief who stole my uncle\'s book?" asks Sarah. "I would never give it to you, even if I did have it."<br>');
		} else {
			if (checkPersonFlag("AmyRoss", 1)) {
				moveItem(4, 192);
				addComments('"Oh ' + myName + ', I am glad you\'re okay! The book was returned to me by the police, here it is!"');
				return "refresh";
			} else {
				moveItem(4, 76); // Place the book in Mr Beasley's office waiting for you to pick up.
				addComments('"Oh ' + myName + ', I am glad you\'re okay! But the book?  Miss White mentioned something about finding it but it wasn\'t with the other things they brought from the hospital."');
			}
		}
		if (wherePerson("MrBeasley") !== 11) {
			movePerson("MrBeasley", 11); // Put Mr Beasley back in his office so you can get the book.
			moveDavyToHotel1();
		}
	}
	else if (nR == 2910)
	{
		addComments('"Part of the reason I came to town, ' + myName + '.  There is... <i>something</i> out there.  Something I will have to take care of myself," she says ominously.');

		if (isConspiracyPath()) {
			if (perYourBody.FindItem(4) === 0) addComments('</p><p>"If you had only brought the book...  I\'m afraid without it I am doomed to failure."');
			else addComments(' A look of inevitable defeat crosses her face until she notices your backpack.</p><p>"You have the book here!?! Quickly, give it to me!  It\'s dark, and it could be here soon."');
		} else if (perYourBody.FindItem(4) === 0) addComments('</p><p>"If only I had the book...  I\'m afraid without it I am doomed to failure."');
		else addComments(' A look of inevitable defeat crosses her face until she notices your backpack.</p><p>"What do you have there? The book!?! Quickly, give it to me!  It\'s almost dark, then it will be too late."');

		if (per.other == 10) per.other = 11;
		setPersonOther("Vampyre", 1);  // Start the Vampire Plot

	}
	else if (nR == 1350)
	{

		setPersonOther("Vampyre", 51);
		addComments('"Thank you. Now we must prepare for the onslaught. Please wait here with me."<br>');
	}
	else if (nR == 1351)
	{
		setPersonOther("Vampyre", 43);
		AddCash(25);
		addComments('"Well I think we are safe until the next full moon in a week. Please return here before then, do not forget!" She then hands you some money and tells you, "So you can get anything you need to help"');
		PlaceI(5, 141);
	}
	else if (nR == 11200)
	{
		setPersonFlag("Lauren", 1);	// introduce Lauren
		PlaceI(40, 0);  // remove it from the game.
		addComments('"Of course, ' + myName + '.  Sit back and relax while I call the maid to open the bottle.  I\'m sure you\'ll find her... delicious."');
	}
	else if (nR == 901)
	{
		if (isConspiracyPath()) {
			perYou.setQuestAftane(5); //Advance the Aftane Path
			addComments('"Oh yes, ' + myName + '! My uncle keeps it in the safe. He has the key hidden somewhere I cannot find"</p>');
		} else if (bCharm) {
			//CHARMED
			perYou.setQuestAftane(5); //Advance the Aftane Path
			addComments('"Oh yes, ' + myName + '! My uncle left a note for me in the event of his death.  It mentioned the Aftane, but I\'m afraid I couldn\'t open the safe.  I\'m sorry, ' + myName + ', please forgive me." She grovels.</p>');
		}	else {
			//NORMALE
			perYou.setQuestAftane(3); //You've asked her but she wasn't charmed (just to remove the question until you charm her.
			addComments('"The Aft..." She asks, quite surprised that you would know of such things.  "I... I have no idea what you\'re talking about.  And neither do you.  I suggest you never bring up such a thing again!" Something about that question seems to have reminded her of a subject she would rather not think about.</p>');
		}
	}
	else if (nR == 905)
	{
		addComments('<p>"Oh yes, ' + myName + '!  Follow me."</p>');
		Place = 191; //Take you to the Safe room
	}
	else if (nR == 5904) //Blue bottle path
	{
		if (!bCharm) {
			//NOT CHARMED
			addComments('<p>"A little... what?" She asks, her temper flaring for a moment.  "And why would I tell you about anything like that?"</p>');
			perDavy.setQuestBlueBottle(5); //Set it so that you have to charm her to get the option again
		}
		else  //CHAMRED
		{
			addComments('<p>"A little blue bottle, ' + myName + '?" She asks, thinking for a moment.  "Oh yes!" She says, running off and quickly returning with something in her hand.  "Here you are, ' + myName + ', please take it.  Is there... anything <i>else</i> you would like?"</p>');
			perDavy.setQuestBlueBottle(9);
			PlaceI(33);  //Puts the blue bottle in the room with you.
		}
	}
	else if (nR == 3000)
	{
		//<ask about moving the ghost>
		setPersonFlag("Ghost", 11);
		addComments(
			'You ask Sarah about ghosts and what keeps them tied to a particular place, and if they can move from that place,</p>' +
			'<p>"Well ' + myName + ' are you having problems with a simple ghost, they are almost always harmless, unless you are in a Place of Power?"</p>' +
			'<p>You explain a little about Nurse Keana and wanting to free her from the hospital basement, but not anything more. Sarah immediately answers,</p>' +
			'<p>"It is trivially easy as long as you have a magical tie to them. Either an item of personal importance or a magical binding or a link of other sort. If you do, take them by the hand, and lead them where-ever you desire and keep them there until dawn. The following night they will be there again and will stay there. In some cases you may need to repeat, but mostly they will stay."'
		);
	}

	return ret;
}


// Sarah Gates

function initialiseSarah()
{
	// Sarah Gates
	addPerson("Sarah", 0, "Sarah");
	per.Replies = RepliesSarahGates;
	
	per.getPersonName = function(full) { return full !== true && this.isCharmedBy() ? "Slave Sarah" : "Sarah Gates"; };
	per.getPossessionFace = function() {
		if (this.isCharmedBy()) return "sarah9b";
		return "sarah9a";
	};
	
	per.isPersonInfo = function() { return this.isCharmedBy(); };
	per.getPersonInfo = function() {
		// Charmed on murder path
		return this.addPersonString("sarah6.jpg", "height:max%", "right") +
			'The richest gal in town is officially yours to command! Now the Gates family will not be standing in your way, ' + perGates.getPersonName() + ' is dead and Sarah is your plaything. Things couldn’t have turned out better than this.<br><br>' +
			'Sarah is such a complex person, just by the brief, sex filled encounters with her makes you realise that she has two sides; a soft, charming one and a dominant, power hungry one. She even managed to enslave her maid, Lauren without mind control or any other magic spells. She briefly told you about some kind of blackmailing going on, but you don’t remember. You were busy fucking her brains out!';
	};

	per.getPersonAddress = function() { return this.place !== 0  ? 'Gate\'s Mansion' : ''; };

	per.passTimeDay = function() {
		if (this.isCharmedBy() && isMurderPath() && !this.checkFlag(3)) this.setFlag(3);
		this.setFlag(5, false);
		return '';
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		// Introduction to Sarah on the Murder Path
		if (Place == 192 && !this.checkFlag(7) && isMurderPath()) {
			this.setFlag(7);
			showPopupWindow("Sarah Gates",
				this.addPersonString("sarah0.jpg", "height:max%", "right") +
				"<p>You enter the Gates' Massion to see an elegant young lady, sitting on the floor. You recognise her from her face from the paper. It is Sarah Gates, the richest lady in Glenvale.</p>" +
				"<p>Her eyes are still watery, it is obvious she’s still crying about the death of Sir Ronald. Here’s a woman all to herself, without protection which is already strange. She doesn’t have bodyguards around her or guards at all in the house. This makes her an easy and quick conquest to your charms, " +
				(isMurderPath(true) ? "but if she is playing tricks on you and thinks that you were the one who killed Sir Gates?" : "but if she is playing tricks on you and realized that you were the one who killed Sir Gates?") +
				"</p><p>You have to think carefully and plan everything around, there is a high chance that she is dangerous. However the wealth and influence she now possess over the town after the of her uncle makes her a key player to your road to full domination.</p>" +
				"<p>The elegant yet lovely Sarah is talking to you, asking questions about you and your relationship with her uncle. So you have to decide to tell her the truth or come up with something.</p>"
			);
			return true;
		}

		// Initial delivery on the conspiracy path
		if (Place == 45) {
			if (perGates.other == 499) {
				showPopupWindow("A Delivery",
					findPerson("Zoey").addPersonString("zoey0b.jpg", "height:max%", "right") +
					'As you approach your front door, you see a cute delivery girl knocking on the door. You ask her what she wants and she turns,<br><br>' +
					'"Hello, are you ' + perYou.getPersonName() + '...", and she confirms your identity. She asks you to sign for a package and hands it to you,<br><br>' +
					'With her business done she leaves you, riding off on a small motor-scooter. Inside the house you check the package, it is the <b>Book!!!</b> There are also an envelope with a little money in bills and a simple note,<br><br>' +
					'"<i>Well ' + (perYou.isBornMale() ? 'Mr' : 'Miss') + ' Not Apprentice, he will not miss this for a time, learn what you can and we will talk more later. Take care as we are now allies and co-conspirators!</i>"<br><br>' +
					'You consider that you could return the book, or hand it in to the police, it would be safer....<b>no way</b>!! You will not give up the book!'
				);
				perGates.other = 700;
				perYou.startQuest(1);
				movePerson('Kurndorf', 0);
				AddCash(50);
				moveItem(4);  // places book in the room
				if (!isPlaceKnown("ShoppingCenter")) setPlaceKnown("ShoppingCenter");	// Know the Shops to turn in the Letter of Credit
				return true;
			}
			if (this.checkFlag(4) && whereItem(60) == 1000 && isDay()) {
				var sibling = 'Sis';
				if (perYou.isBornMale()) sibling = 'Bro';
				showPopupWindow("A Second Delivery",
					findPerson("Zoey").addPersonString("zoey0b.jpg", "height:max%", "right") +
					'As you approach your front door, you see the same delivery girl who brought you the book. She is just leaving and flashes you a smile as she hops onto her scooter and rides off before you can do anything.<br><br>Tracy greets you from the door,<br><br>' +
					'"Hey ' + sibling + ' you have a package", and she puts it down on the side table, "You must be earning more money than I thought to be ordering large packages like this. I must get you to buy me a chocolate-sunday sometime". She smiles and walks off to the kitchen to get a hot drink.<br><br>' +
					'You check the package, and yes it is a book on hypnosis, and there is also a little money in bills and a simple note,<br><br>' +
					'"<i>Have fun, and I thought you may need a little more cash to help as well."<br><br>'
				);
				AddCash(20);
				moveItem(60);  // Places book in the room
				return true;
			}
		}
		return false;
	};
	
	per.showEvent = function() {
		
		if (Place != 192) return false;
		
		var md;
		
		if (sType == "learnunlifeenspelled") {
			// Learn Unlife Enspelled
			if (isRunes()) {
				Research("Spell", "MirDaru", "sarah9a.jpg", 192);
				return true;
			}
			md = WritePlaceHeader();
			// Sarah is teaching you.
			if (isCharmedBy("Sarah")) this.showPerson("sarah9a.jpg");
			else this.showPerson("sarah9b.jpg");
			addPlaceTitle(md, "New Spell Research");
			md.write(
				'<form method="POST" name="FormChar">' +
				'<p>I want to look up the word(s):</p>' +
				'<p><input type="text" size="20" name="research">' +
				'<input type="button" name="button" value="please" onClick="ResearchOLD(\'SG\', document.FormChar.research.value)"></p></form>'
			);
			addLinkToPlace(md, "Never mind...", 192);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmsarahm1") {
			// Charm Sarah )Murder PAth) 1
			md = WritePlaceHeader();
			this.showPerson("sarah3.jpg");
			addPlaceTitle(md, "Charmed Sarah Gates");
			md.write(
				'<p>&quot;What the...&quot; exclaims Sarah. &quot;How did you learn the Dai Chu spell? That magic is a family secret ' +
				'that should never be used without proper training.&quot;</p>' +

				'<p>The young lady staggers to her feet, lifting her hands raised into a fighting stance. &quot;You cast it on me!&quot; she finally realizes. &quot;I have to...  I have to resist. I have ' +
				'to... to find a counter spell.&quot; Her fists are already relaxing, fingers tugging at her clothes.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "wait for the spell to take effect", Place, 'type=charmsarahm2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmsarahm2") {
			// Charm Sarah )Murder PAth) 2
			md = WritePlaceHeader();
			this.showPerson("sarah4.jpg");
			addPlaceTitle(md, "Charmed Sarah Gates");
			md.write(
				'<p>"I... I can\'t resist can I," Sarah cries out, unable to stop her hands from fondling herself. "Whatever ' +
				'happens, I must keep my virginity. Uncle Ronny told me that I have to wait for the one. Oh..."</p>' +
				'<p>"Look at me," you tell the heiress. "And tell me that you want me."</p>' +
				'<p>Sarah throws her head back, trying to avoid your stare.  Inch by inch her face turns towards you, until her eyes lock with yours. ' +
				'A wave shudders through her body as the first orgasm hits.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, "tell Sarah to remove her clothes", Place, 'type=charmsarahm3');
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "charmsarahm3") {
			// Charm Sarah )Murder PAth) 3
			md = WritePlaceHeader();
			this.showPerson("sarah5.jpg");
			addPlaceTitle(md, "Charmed Sarah Gates");
			md.write(
				'<p>"Remove my clothes? Are you the one? You have the book, the mana and knowledge of the magic. Perhaps I must give myself to you."</p>' +
				'<p>The inner turmoil within Sarah dissolves as her mind comes to terms with the spell\'s effects. Her movements become more fluid and relaxed. She smiles.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, "tell Sarah that you are the one she was waiting for", Place, 'type=charmsarahm4');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmsarahm4") {
			// Charm Sarah )Murder PAth) 4 (Final)
			if (whereItem(25) === 0 || whereItem(25) == 202) moveItem(25, 192);	// Place the Wooden Box
			md = WritePlaceHeader();
			this.showPerson("sarah6.jpg");
			addPlaceTitle(md, "Charmed Sarah Gates");
			md.write(
				'<p>Sarah\'s hands grope her sensitive spots as she kneels on the floor. She sighs, giving up her will to you. ' +
				'&quot;Yes... Yes, you are aren\'t you. I know that it is the spell making me feel this way but I simply cannot live without you. ' +
				'Everything that I have, everything I own, is yours. Please, accept ' +
				'this box - a family heirloom for generations.  It will give you all the power you need to continue my family\'s legacy.&quot;</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, "talk more to Sarah", 192);
			addLinkToPlace(md, "exit the house?", 16);
			WritePlaceFooter(md);
			return true;
		}		

		if (sType == "laurenattending") {
			// Event: Sarah/Lauren Attending
			var idx = Math.floor((this.other - 114) / 3);
			this.other = this.other + 0.1;
			
			md = WritePlaceHeader(false, isExplicit() && idx != 1 ? "td-left-large" : "");

			if (isExplicit()) this.showPersonX("sarah13" + String.fromCharCode(idx + 97) + ".jpg");

			addPlaceTitle(md, "Lauren Attending Sarah", !isExplicit() ? "door1.jpg" : "");

			if (isExplicit()) {
				md.write(
					'<p>You lightly knock on Sarah\'s door, and she answers,</p>' +
					'<p>"Uhh, come in."</p>' +
					'<p>You open the door and see Sarah lying on a couch, naked, and her maid Lauren kneeling between her legs, licking Sarah\'s pussy nervously. Sarah looks at you,</p>' +
					'<p>"Uhh, just a little..umm..bit..my maid is attending to ahhh very urgent duty. Lauren won\'t take too long...ohhh that is very nice...ummm Lauren you are getting much, much better.<br><br>Faster, lick me...uhhh..come on I am close...ahhhh..make your Mistress cummmmm!!"</p>' +
					'<p>Sarah breaths heavily and tells Lauren she has done well, and then speaks to you,</p>' +
					'<p>"Well what can I do for you?"</p>'
				);
			} else {
				md.write(
					'<p>You lightly knock on Sarah\'s door, and she answers,</p>' +
					'<p>"Uhh, just a little..umm..bit..my maid is attending to ahhh very urgent duty"</p>' +
					'<p>You hear some soft noises and then Sarah continues speaking at a slightly lower volume, but easily heard,</p>' +
					'<p>"Don\'t worry Lauren, they won\'t interrupt..ohhh that is very nice...ummm you are getting much, much better.<br><br>Faster, lick me...uhhh..come on I am close...ahhhh..make your Mistress cummmmm!!"</p>' +
					'<p>You hear some heavy breathing and then Sarah calls out,</p>' +
					'<p>"You may enter"</p>'
				);
			}

			//Choices
			startQuestions();
			addLinkToPlaceC(md, "speak to Sarah", 192);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "sarahservice") {
			// Serving start
			md = WritePlaceHeader();
			this.showPerson("sarah8.jpg", "height:max");
			addPlaceTitle(md, "Sarah Gates Serving You");

			md.write('<p>Sarah obeys your orders. She is so eager to do whatever you want.</p>');

			startQuestions();
			if (perYou.isMaleSex()) {
				addLinkToPlace(md, 'you will fuck her', Place, 'type=sarahfuck');
				addLinkToPlace(md, 'she will serve you with a blowjob', Place, 'type=sarahbj');
			} else {
				addLinkToPlace(md, 'she will serve your pussy', Place, 'type=sarahbj');
				if (perYourBody.FindItem(45) > 0) {
					// own the strap-on
					addLinkToPlace(md, 'fuck her with your strap-on', Place, 'type=sarahfuck');
				}
			}
			addLinkToPlaceC(md, 'talk to Sarah', 192);
			WritePlaceFooter(md);
			return true;
		}

		var myName = this.getYourNameFor();
		var herName = this.getPersonName();

		if (sType == "sarahbj") {
			// Blowjob/lick
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) {
				this.showPersonRandomRorX("sarah11b", isExplicit() ? 3 : 1, "height:max", "left");
				addPlaceTitle(md, "Sarah Gates Serving You");
				md.write('<p>You tell ' + herName + ' to serve you by using her mouth to pleasure you. She is no expert and she takes your length into her mouth. She does her best and after a pleasurable time you release into her mouth. She swallows and smiles and says, "Thank you ' + myName + '".</p>');
			} else {
				this.showPersonRandomRorX("sarah11g", isExplicit() ? 2 : 1, "height:max", "left");
				addPlaceTitle(md, "Sarah Gates Serving You");
				md.write('<p>You tell ' + herName + ' to serve you by using her tongue to pleasure you and for her to play with herself. To your delight she is somewhat experienced at pleasuring women and she make you reach the peak of ecstasy after a pleasant time. At the same time she cries out her pleasure, muffled by your pussy, and after she lies back and says, "Thank you!".</p>');
			}

			startQuestions();
			addLinkToPlaceC(md, 'talk to Sarah', 192);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "sarahfuck") {
			// fuck her
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) {
				this.showPersonRandomRorX("sarah10b", 2, "height:max", "left");
				addPlaceTitle(md, "Sarah Gates Serving You");
				md.write('<p>You order her to serve you with her body, and you take her and you sink you manhood into her delightful pussy, ramming into her over and over. You feel her shudder in her release and that is the final straw and you pour your passion into her depths.</p>');
			} else {
				if (!isExplicit()) this.showPerson("sarah10g.jpg", "height:max", "left");
				else AddImageRandom("GenericSex/Explicit/sex-ff strapon ", 8);
				addPlaceTitle(md, "Sarah Gates Serving You");
				md.write('<p>You order her to serve you with her body and that you will use your strap-on to explore ' + herName + '\'s lovely ass. You find she is somewhat experienced with this, and she very much enjoys your strap-on, reaching her peak not long after you do.</p>');
			}

			startQuestions();
			addLinkToPlaceC(md, 'talk to Sarah', 192);
			WritePlaceFooter(md);
			return true;
		}
		
		return false;
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			//Gates Mansion w/ Sarah
			if (Place == 192)  {
				this.setFlag(9);		// Tried to charm Sarah
				if (isMurderPath()) CastCharmSpell("Sarah", Place, 1, 'type=charmsarahm1');
				else if (isConspiracyPath()) addComments('You attempt to cast the spell but nothing happens. Sarah waggles a finger, "Naughty ally, my uncle has protected me well, and you cannot have Lauren"');
				else addComments('You attempt to cast the spell but nothing happens. Sarah waggles a finger, "Naughty apprentice, my uncle has protected me well"');
				return "handled";
			} else if (Place == 17) {
				// Gates
				if (this.isHere() && this.other == 1) {
					// Meeting Sarah Games for first time
					addComments('You attempt to cast the spell nothing happens. Sarah waggles a finger, "Naughty apprentice, my uncle has protected me well"');
				} else if (this.isHere() && this.other >= 100) {
					// Meeting Sarah Games for first time
					addComments('It is too public with the two of them here, and do you really think a warlock like ' + perGates.getPersonName() + ' will not have defences for him and his niece?');
				} else {
					//Sir Ronald
					addComments('Do you really think a warlock like ' + perGates.getPersonName() + ' will not have defences for himself?');
				}
				return "handled";
			}
		}
		return "";		// do nothing
	};


	per.addPersonPhoneCall = function() {
		if (isConspiracyPath()) {
			if (Place != 45 && Place != 46 && Place != 154 && !this.checkFlag(3)) {
				if (makeCall(true, 90)) {
					this.setFlag(3);
					var perBeasley = findPerson("Mr Beasley");
					if (perBeasley.other < 2) perBeasley.other = 2;
				}
			} else if (Place != 11 && perYou.checkFlag(12) && !this.checkFlag(4)) {
				if (makeCall(true, 91)) {
					this.setFlag(4);
					PlaceI(60, 1000);		// Hide the book from the New Age Store, so it can be delivered
				}
			} else if (Place == 161 && isSpellKnown("Wealth") && !this.checkFlag(6) && getPersonOther("Jessica") === 0) {
				if (makeCall(false, "unknown", 'The call is intermittent with many drop-outs. All you can clearly make out is "...witch of the legend...hidden near...sent a SMS...cute..." and the call cuts out')) {
					addSMS(92);
					this.setFlag(6);
				}
			}
		} else if (isMurderPath()) {
			if (Place != 192 && Place != 290 && Place != 16 && this.checkFlag(3) && !this.checkFlag(1)) {
				if (makeCall(true, 90)) this.setFlag(1);
			}
		} else if (Place != 192 && Place != 290 && Place != 16 && this.other >= 110 && this.other < 1000 && !this.checkFlag(3) && !isDay() && this.place == 192) {
			if (makeCall(true, 90)) this.setFlag(3);
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			case 90: 
				if (isMurderPath()) return receiveSMS('Sarah', perYou.getMaster() + ', my Maid was just helping me to get ready for the day and she mentioned some of my Uncle\'s papers. One looks to discuss a spell you may be interested in. I can teach it to you if you would like?', 'sarahsms1.jpg');
				if (isConspiracyPath()) return receiveSMS('noble ally', 'I can see the Book in your hands, one power it can teach you, ' + perYou.getPersonName() + '. It is all I know now, I hope to share what you can learn once you master the nature of mana and spells') + replyToSMS("Mana?") + receiveSMS('noble ally', 'It is the power of magic. Without it, a warlock or witch is powerless. It can be found in certain items, but a true witch gains it every sunrise. Speak to the cute girl at the Antiques ' + getShopStore(true) + ' for some more help.', "Items/stone2.png", "30%") + replyToSMS("Who are you?") + receiveSMS('noble ally', 'Not now, we will talk more later');
				return receiveSMS('Sarah', perYou.getPersonName() + ', it is rather hot here, I love an open fire. I will have to ask Lauren to join me. Imagine two hot women in front of the fire...', 'sarahsms2.jpg');
			case 91: 
				return receiveSMS('noble ally', 'That man is such a slime, ' + perYou.getPersonName() + ', sorry I was "watching" just then. There is a book on hypnosis here, I will have it sent over to your house, enjoy');
			case 92: 
				return receiveSMS('noble ally', 'A painting $%@$ time of the cults, $@$@$ the witch Jessica', 'jessica0.jpg');
		}
		return '';
	};
	
}