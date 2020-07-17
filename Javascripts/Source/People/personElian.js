/****************************************************************
Demon Elian
****************************************************************/


/***************** Initialise ******************************************************************************/
function initialiseElian()
{
	// Esmeralda the New Age Store Owner
	addPerson("Elian", 500, "Elian", "Succubus", false);
	
	per.getPersonName = function(full) {
		return this.checkFlag(11) || this.dress == "Succubus" ? "Elian" : "Rachael";
	};
	per.getPersonNameShort = function() { return this.getPersonName(); };
	
	per.whereNow = function() {
		if (Place == 269 && sType == "rachaelpoolmeet") return Place;		// Pool event
		if (Place == 282 && (getHour() > 21 || this.checkFlag(12))) return 0;	// Only here after midnight
		return this.place;
	};
	
	per.visitThem = function() { this.other = nTime; };
	
	per.getPersonAddress = function() { return this.checkFlag(3)  ? 'unknown' : ''; };
	
	per.passTimeDay = function() {
		this.setFlag(12, false);
		return '';
	};
	
	// Images
	per.isPlaceImageRight = function()
	{
		// At the club
		return (Place == 282 && this.checkFlag(2) && this.isHere() && sType === "");
	};

	per.showPlaceImageRight = function(md)
	{
		this.showPersonRandom("club1", 2, undefined, undefined, undefined, !this.checkFlag(3) ? "Familiar Customer" : "Rachael");
		this.visitThem();
	};
	
	per.showEventPopup = function()
	{	
		if (sType == "dreamdemoncome") {
			this.setFlag(1);
			showPopupWindow("Girl of Your Dreams",
				this.addPersonString("dreamdemoncome.jpg", "height:max%", "right") +
				'Your dreams are heavily erotic, filled with the sensation of a woman\'s body hotly entwined with yours. At the end you see her clearly. the demonic woman you saw in a clairvoyant vision. Huskily she says,</p>' +
				'<p>"Come to me, to the <i>thin clearing</i> in darkness and <b>teleport</b> while thinking of my name, <b>Elian</b>"' +
				(sComment !== '' ? '</p><p>' + sComment : '')
			);
			return true;
		}
		
		return false;
	};
	
	per.showEvent = function()
	{
		var md, nm;
		
		if (sType == "elianteleportbad") {
			// Elian Demon Bad ending
			md = WritePlaceHeader(false, "", "black");
			perYou.charmThem(4, "Demon");
			nMana = 0;
			updateLeftBar();

			this.showPerson("ending-demonslave.jpg");

			addPlaceTitle(md, "Demon\'s Slave", '', 0, false, 'white');

			md.write(
				'<p>You appear somewhere in darkness, hot, cloying darkness. A feminine presence embraces you and kisses you passionately on your lips.</p>' +
				'<p>You feel a wave of magic wash over you, overpowering any and all of your defenses' +
				(getQueryParam("naile") == "true" ? ', despite using the trick Jade told you about. Then again maybe you do not have the right defenses' : '') +
				', the woman steps back and you clearly see her, your Mistress, your one and only purpose in life!</p>' +
				'<p>She whispers, "Now cum for me my slave, my thrall!"</p>' +
				'<p>Your mind, your will, your sanity is washes away in the cataclysmic orgasm that wracks your....your Mistresses thrall\'s body!</p>' +
				'<p>You are a demon\'s plaything, happily serving her every desire without thought, without will. Better luck next time...</p>'
			);

			addRestartLink(md);
			WritePlaceFooter(md, '', true, true);
			return true;
		}

		if (sType == "naileteleportok") {
			// Elian Demon Bad ending
			md = WritePlaceHeader(false, "", "black");
			this.setFlag(2);
			this.place = 282;
			this.showPerson("demondefended.jpg");
			this.dress = "Catherine";

			addPlaceTitle(md, "Demon\'s Slave, Almost...", '', 0, false, 'white');

			md.write(
				'<p>You appear somewhere in darkness, hot, cloying darkness. A feminine presence embraces you and kisses you passionately on your lips.</p>' +
				'<p>You feel a wave of magic wash over you, <b>almost</b> overpowering your defenses, the woman steps back and you clearly see her, your Mistress, no...the demon who called to you.</p>' +
				'<p>She whispers, "Now cum for me my slave, my thrall!"</p>' +
				'<p>You tell her <b>"No"</b> and ' + (nMana > 9 ? 'cast the charm spell on her. The spell does nothing, washing over her' : 'smile') + '.</p>' +
				'<p>She looks puzzled, ignoring you and starts checking some of the items near her, a rod, a skull and other things. Twice you feel a wave of magic and you realise she is trying to overpower you, failing each time.</p>' +
				'<p>She softly speaks, "So a ' + perYou.getWitch() + ' of some power. Having you as my helplessly ' + (perYou.isMaleSex() ? 'cumming' : 'orgasming') + ' slave-toy will be so much sweeter...Go from here, I will take you another way"</p>' +
				'<p>She gestures with her clawed hand...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'you disappear, leaving her presence', 141);
			WritePlaceFooter(md, '', true, true);
			return true;
		}	
			
		if (Place == 269 && (this.checkFlag(5) && !this.checkFlag(7) && isDay() && sType === "") || sType == "rachaelpoolmeet") {
			md = WritePlaceHeader(false, 'td-left-med');
			this.setFlag(7);
			setQueryParams("type=rachaelpoolmeet");
			this.showPerson("pool.jpg");
			addPlaceTitle(md, "Rachael in the Pool");
			md.write(
				'<p>You see the pool is currently empty, except for Rachael. You see she is leaning against one end of the pool, more like she is posed for a photoshoot than a person going for a swim.</p>' +
				'<p>She looks at you with an odd expression, is it longing, passion or something else. You take it as a passionate look given her recent SMS and approach her. She softly says,</p>' +
				'<p>"Not yet, not here" and she climbs out of the pool and seductively walks towards the changing room.</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, 'watch her leave', Place);
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		
		if (Place == 281 && sType == "elianconfront") {
			// Conrfont about Elian
			this.setFlag(11);
			md = WritePlaceHeader();
			this.showPerson("cluboutside1.jpg");

			addPlaceTitle(md, "Elian and Rachael");

			md.write(
				'<p>You tell Rachael about a demon named Elian you had met and how she looks a lot like her, and Jade says she <i>is</i> Elian. Rachael stands smiling and gestures for you to follow and heads for the exit. You hesitate, but need to resolve this and follow her.</p>' +
				'<p>Outside the club you see Rachael down a small side alley sitting on an access stair, or more likely a sort of fire-escape. It is quite well lit here from the neon lights of the club but still it is chillingly reminiscent of that hot place where you met Elian. You also notice it is surprisingly warm, but your thoughts are interrupted when she speaks to you, softly as always,</p>' +
				'<p>"Yes, of course, <b>part</b> of my name is Elian, but Rachael is just as much my name here. Only <b>true names</b> matter, you can call me what you want here."</p>' +
				'<p>You hesitate, and they ask who summoned her and what she wants here. She smiles,</p>' +
				'<p>"No one summoned me, then again <b>you</b> summoned me in your dreams. I an not seeking a <i>Legion</i> of perversions, I only seek small things. Slaves to worship me, just as you seek out. I am seeking you and you are seeking me. The dance of seduction and slavery"</p>' +
				'<p>You suggest there may be something else she wants. You remember some of Jade\'s words, and ask about a <b>contract</b>. She looks at you,</p>' +
				'<p>"Aside from your eternal worship and unquestioning loyalty? There are a <i>Legion</i> of things I could ask but there is nothing that you have at this time."</p>' +
				'<p>Now you know who she actually is but what can you do about her?'
			);
			if (isDemonQuestDone() || isDemonBound()) md.write(' As you contemplate this she smiles "I have no interest in relics from a certain Church"</p>');
			md.write('<p><i>no more content for Elian</i></p>');

			startQuestions();
			addLinkToPlace(md, 'leave Elian for now', Place, '', 'When you glance back you notice Elian is gone');
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		
		if (Place != 282) return false;
		
		if (this.checkFlag(4) && !this.checkFlag(6) && sType === "") {
			md = WritePlaceHeader();
			this.setFlag(6);
			this.showPerson("poledancea.jpg");
			addPlaceTitle(md, "Rachael Dancing");
			md.write(
				'<p>As you enter the club you glance at the stage and are stopped in your tracks. You see the young woman who calls herself Rachael on the stage. She is performing a very erotic strip-tease, slow and sensual. She looks at you and you see she is holding a toy, it looks like a black sheep or lamb. She must have a thing for them, give that SMS she sent you.</p>' +
				'<p>After her dance she joins you for a drink, the toy is nowhere to be seen. You ask her about it and her SMS, and she just mentions it is related to one of the meanings of her name. The way she says this is a bit playful and you do not believe her for a minute.</p>'
			);
			if (isPersonHere("Vampyre")) md.write('<p>You notice Lilith did not even look at Rachael\'s dance.</p>');

			startQuestionsOnly();
			addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "talkinclub") {
			// Talk to Elian
			md = WritePlaceHeader();
			nm = this.getPersonName();
			this.setFlag(12);
			this.showPerson("clubtalk0.jpg");

			addPlaceTitle(md, "Talking to " + nm);

			md.write(
				'<p>You sit with ' + nm + ' and talk for a while with her. As always she is very attentive and firty, cute in an odd and intense way.</p>' +
				'<p>She suggests she could buy you a drink...</p>'
			);

			startQuestions();
			if (this.checkFlag(9) && !this.checkFlag(11)) addLinkToPlaceC(md, 'ask Rachael if she knows Elian or <b>is</b> Elian?', 281, 'type=elianconfront');
			addLinkToPlaceC(md, 'have a drink with ' + nm, Place, 'type=eliandrink&id=1');
			addLinkToPlace(md, 'leave ' + nm + ' for now', Place, '', 'When you glance back you notice ' + nm + ' is gone');
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		if (sType == "eliandrink") {
			// Drinking with Elian 1 and 2
			md = WritePlaceHeader();
			var id = parseInt(getQueryParam("id"), 10);
			nm = this.getPersonName();
			this.showPersonRandom("clubtalk1", 3);

			addPlaceTitle(md, "Drinking with " + nm);

			switch(id) {
				case 1:
					md.write(
						'<p>You have a drink with ' + nm + ' it is surprisingly strong despite it looking like red wine, but it must be some sort of cocktail.</p>' +
						'<p>' + nm + ' talks to you but the drink makes it hard to focus on her words, despite this she is quite fascinating.</p>'
					);
					break;
				case 2:
					md.write(
						'<p>You do not notice the strength of the drink this time, you just feel warn and a bit turned on. ' + nm + ' chats with you but her workds just wash over you. She is very, very cute...</p>'
					);
					break;
			}
			startQuestions();
			if (id == 2) addLinkToPlaceC(md, 'have another drink with ' + nm, Place, 'type=eliandrinkbadend');
			else addLinkToPlaceC(md, 'have another drink with ' + nm, Place, 'type=eliandrink&id=' + (id + 1));
			addLinkToPlace(md, 'enough for now, excuse yourself and leave ' + nm, Place, '', 'When you glance back you notice ' + nm + ' is gone');
			WritePlaceFooter(md, '', true, true);
			return true;
		}	
		
		if (sType == "eliandrinkbadend") {
			// Elian Drinking Bad ending
			md = WritePlaceHeader(false, "td-left-large");
			nm = this.getPersonName();
			perYou.charmThem(4, "Demon");
			nMana = 0;
			updateLeftBar();
			this.showPerson("clubtalkend.jpg");
			addPlaceTitle(md, "Drunken Slave");
			md.write(
				'<p>You lose track of the night but seem to remember going somewhere with ' + nm + ', stripping off your clothing and <b>all</b> other items. You remember passionately entwined naked bodies hotly pleasuring each other and climaxing over and over.</p>' +
				'<p>You wake and see Elian lying next to you, your Mistress and lover, the <b>only</b> thought in your head is to please her. Your body aches for her touch and she looks at you smiling, "Now you are my slave, forever!" and you agree, anything to please your Mistress.</p>' +
				'<p>You are a demon\'s plaything, happily serving her every desire without thought, without will. Better luck next time...</p>'
			);
			startQuestionsOnly();
			addRestartLink(md);
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		return false;
	};
	
	per.showPersonTextHere = function(md)
	{
		if (sType === "" && Place == 282 && this.isHere()) {
			if (!this.checkFlag(3)) md.write('<p>You see a young woman sitting at the bar drinking, she looks familiar but you cannot place her.</p>');
			else md.write('<p>You see Rachael sitting at the bar, at least that is the name she is using here.</p>');
		}
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 280 && sType === "") {
			var perJade = findPerson("Jade");
			if (perJade.checkFlag(5) && perJade.isHere()) {
				// Questions and bargains
				if (this.checkFlag(1) && !perJade.checkFlag(7)) addQuestionC(md, 'ask about Elian', "Jade", 667);
				if (this.checkFlag(10) && !this.checkFlag(9)) addQuestionC(md, 'ask if she knows Rachael', "Jade", 672);
			}
		} else if (sType === "" && Place == 282 && this.isHere()) {
			if (!this.checkFlag(3)) {
				addPopupLinkC(md, 'talk to the familiar woman', "Really Familiar",
					this.addPersonString("clubtalk1a.jpg", "height:max%", "right") +
					'You approach the young woman and she smiles and invites you to sit with her. She has odd intense blue eyes, and she seems attracted to you. You certainly feel attracted to her but she is naggingly familiar, and it is becoming very annoying.</p>' +
					'<p>You talk with her a bit, introducing yourself, but she avoids giving her name for a while. When you directly ask she smiles,</p>' +
					'<p>"Well, you can call me Rachael here, or should I use Catherine, no Rachael", well it is clearly not her actual name, but that will have to do for now.</p>' +
					'<p>You chat more, and try asking some questions to try to work out where you have met before. She smiles, but there is an edge to it, not from amusement, and she speaks softly,</p>' +
					'<p>"Yes, we have met before, I was dressed differently, and the lighting was much darker", you ask her where it was. All she would say that it was far from here and refuses to explain more.<p>' +
					'<p>You talk and she becomes more flirtatious, but then she pulls back, "Maybe another time, when we are ready". She quickly exchanges phone numbers with you and with that your encounter is over. When you glance back at her, Rachael is gone.' +
					(isPersonHere("Vampyre") ? '</p><p>You notice Rachael ignored Lilith and equally Lilith ignored Rachael' : ''),
					false, 'setPersonFlag("Elian",3);setPersonFlag("Elian",12);dispPlace()'
				);
				this.shown = false;
			} else addLinkToPlace(md, "talk to " + this.getPersonName(), Place, "type=talkinclub");
		}
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		var wwho;

		// The pistol
		if (no == 9 && cmd == 2 && this.checkFlag(11)) {
			if (sType == "elianconfront" || (sType == "talkinclub" || sType == "eliandrink")) {
				if (!this.checkFlag(13)) {
					addComments(
						'You reach down and touch the handle of pistol and a thought from somewhere comes to mind,</p>' +
						'<p>"Five rounds rapid chaps" but then you think, is she even mortal, would a bullet do anything, and more importantly would you want to. She seems to only be interested in you after all!</p>' +
						'<p>You take you hand off the pistol and you see Rachael...that is Elian...smile. You decide, it will be so much better to control that smile than just to kill it.'
					);
				} else {
					addComments(
						'You doubt really the pistol would be of any use and you would prefer to control her, not kill her'
					);
					
				}
				return "handled";	
			}
		}
		
		// Casting the clairvoyance spell
		if (no == 15 && cmd == 2) {

			if (this.isHere && Place == 282) {
				// In the Avernus Club when she is there
				if (CastClairvoyanceSpell()) {
					this.setFlag(10);
					addComments('<p>The spell reveals something strange, Rachael is not human.</p>');
					return "handled";
				}
			}
		}
		
		// Casting the charm spell
		else if (no == 14 && cmd == 2) {

			// Avernus Club
			if (Place == 282 && this.isHere()) {
				// Drinking at the club
				addComments("You try to cast the spell but there are so many people around, so loud, it is too difficult to focus it on any one person");
				return "handled";
			}
			if (Place == 269 && this.isHere()) {
				// Pool event
				this.setFlag(10);
				addComments("You try to cast the spell but it simply fails. You smell a faint odour of sulphur but it immediately passes.</p><p>Rachael smiles, &quot;I\'m not that easy...or that submissive&quot;");
				return "handled";
			}			
		}

		return "";		// do nothing
	};	
	
	per.addPersonPhoneCall = function() {
		if (!this.checkFlag(3)) return false;
		
		if (Place != 282 && Place != 283 && this.hoursSince() > 12 && !isDay()) {
			if (!this.checkFlag(4)) {
				if (makeCall(true, 350)) this.setFlag(4);
			} else if (!this.checkFlag(5)) {
				if (makeCall(true, 351)) this.setFlag(5);
			} else if (!this.checkFlag(8) && this.checkFlag(7)) {
				if (makeCall(true, 349)) this.setFlag(8);
			}
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			case 350: 
				return receiveSMS('a lamb', 'I am feeling lost, can you find me?', 'sms1.jpg');
			case 351: 
				return receiveSMS('a lamb', 'I am lost without you, why don\'t you come to me', 'sms2.jpg');
			case 349: 
				return receiveSMS('a lamb', 'Cheers, let\'s have a drink', 'sms3.jpg');
		}
		return '';
	};
}
