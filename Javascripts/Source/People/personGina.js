/****************************************************************
		Gina
****************************************************************/
function RepliesGina(nR)
{
	//var pCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 11300)
	{
		bChat = false;
		setPlaceFlag("Museum", 3, false);	// Set safe as Open   SAFE CLOSED = FALSE
		moveItem(29, 276);  // Place the Vase in that location
		Place = 276;
		addComments('<table><tr><td>' + this.addPersonString("gina3.jpg", "30%") + '</td><td>');
		addComments('Gina moves to open the safe for you.  "Anything else ' + myName + '?" she asks quickly, a longing look on her face.</td></tr></table>');
	}
	return true;
}


// Gina functions
function GinasVisitor() { setPlaceFlag("GinasHouse", 9); }


/***************** Initialise ******************************************************************************/
function initialiseGina()
{
	// Gina
	addPerson("Gina", 0, "Gina");
	per.extra = [0, 0];
	per.Replies = RepliesGina;
	
	per.getPersonName = function(full) {
		if (full === true) return "Gina James";
		return this.isCharmedBy() ?  "Slave Gina" : "Gina, the Museum Guard";
	};
	per.getPersonNameShort = function() { return this.checkFlag(2) ? this.name : "the guard"; };

	per.getPersonAddress = function() { return isPlaceKnown("GinasHouse") ? '2138 Rathdown Rd, Glenvale' : ''; };

	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		var s = '<p>' + this.addPersonString("gina0.jpg", "height:max%", "right");
		if (this.isCharmedBy()) {
			return s + "It was a bit tricky to get Gina under your influence, but the reward was worth it. You own a blonde babe who is ready to take any commands you give her! Her boobs are only rivaled by Ms Titus, both in quality and size! The fun doesn’t stop there, she rocks a body that would make every man turn their heads. It is quite clear that she trains and exercises a lot and has a great physique. Interestingly enough she told you that she was a bodyguard for the rich and famous before she became a museum security. She can prove useful in hand to hand combat if needed and she can also use guns aswell.<br><br>" +
					 "She curtsies to you every time she sees you and silently comes to your side to protect and follow you. No words needed, she knows her job all too well!";
		} else return s + "Gina, the museum security guard.";
	};
	
	per.whereNow = function() {
		if ((Place == 241 || Place == 304 || Place == 315) && this.place == 0) return Place;
		if (Place == 303 && sType == "ginabath") return Place;
		return this.place;
	};

	per.possessThem = function() {
		if (this.place === 0)
		{
			this.extra[0] += 1;
			Place = 239;
			addComments("<p>You possess the guard, Gina James. You may move Gina within the museum.</p>");
		} else {
			this.extra[1]  += 1;
			if (this.extra[1] == 1) startTimedEvent("GinasVisitor()", 40);		// 20 turns to repossess her
			if (this.extra[1]  == 2 && !checkPlaceFlag("GinasHouse", 9)) setQueryParams('type=visitor1');
			Place = 302;
			addComments("<p>You possess the security guard Gina James while she is at home. You may move Gina within her house.</p>");
		}
		return true;
	};

	per.dispossessThem = function() {
		if (this.place === 1) {
			// Possessed at home
			if (this.extra[1] === 1) {
				setPlaceFlag("GinasHouse", 4);	// set phone message as read for Gina
				setPlaceFlag("GinasHouse", 3);	// set shower scene as done
			}
		}
		return true;
	};

	per.getPossessionFace = function() {
		if (this.place === 0) {
			//Gina is @ the Museum
			return 'gina-m-face';
		} else {
			//Gina is @ HOME
			return 'gina-h-face';
		}
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 239 && !this.checkFlag(1) && this.place === 0) {
			// See the security guard
			showPopupWindow("Security Guard",
				this.addPersonString("ginaintro.jpg", "height:max%", "right") +
				'You see patrolling around an armed guard, it is surprising the level of security for this museum.<br><br>' +
				'The museum guard is, for your surprise, a woman! Hell, she\'s the hottest guard you\'ve ever seen! The blonde bombshell walks around with a gun in her holster and wearing a rigid, cold face. She stops only to look around for unusual or suspicious visitors, like yourself. She is really precise in her job! You know she would kick your ass in a minute if you were to touch any of the museum artefacts.',
				"setPersonFlag('Gina',1)"
			);
			return true;
		}
		return false;
	};
	
	per.showEvent = function()
	{
		var md;
		
		if (Place == 269 && sType == "ginapool") {
			WaitHereOnly(4);
			md = WritePlaceHeader();
			this.showPerson("gina-pool.jpg");
			addPlaceTitle(md, "Swimming with Gina");
			md.write(
				'<p>Gina arrives, dressed in a white bikini, and she seductively poses for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=ginapoolsex');
			addLinkToPlaceC(md, 'say goodbye to Gina', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "ginapoolsex") {
			md = WritePlaceHeader(false, 'td-left-large');
			this.showPerson("gina-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Gina");
			md.write(
				'<p>You ask your large breasted security guard to play with you more privately, and she seductively removes most of her swimsuit and lies back waiting for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Gina', Place);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmgina1") {
			// Event: Charm Gina 1
			//place - 0=@ Museum   1=@ Home
			md = WritePlaceHeader();
					
			// Is it now possible for your player to be arrested in the game?
			if (!isArrestPossible()) {
				// Is the DA in the game
				if (getPersonOther("Diane") === 0) {
					// No, and never would be otherwise
					if (wherePerson("AdeleRoss") == 436 || wherePerson("AdeleRoss") >= 900) {
						// Adele Ross is already at home
						// So move Diane White to the Police Station
						// Just set other, not place so as to trigger an event on entering the station
						setPersonOther("Diane", 30);
					}
				}
			}
			// Image
			if (this.place === 0) this.showPerson("gina1b.jpg");	//At the Museum
			else this.showPerson("gina22.jpg");	//At Home
			// Title
			addPlaceTitle(md, "Gina Under a Spell");
			// Description
			if (this.place === 0) {
				//Charmed at museum
				md.write('<p>"What did you say?" she asks authoritatively, leaving her hands on her gun for the moment.</p>');
			}	else {
				// Charmed at Home
				md.write('<p>"I\'m sorry, what was that?" she asks, suddenly finding herself very attracted to the ' + perYou.getManWoman() + ' standing before her - her hand unconsciously sneaking up to her face flirtatiously.</p>');
			}
			md.write(
				'<p>"Oh... nothing," you lie, buying time for the spell to set in.  "I just said \'look at you\' is all."</p>' +
				'<p>"Look at me?" she asks, confused.  "Wha... What do you mean?"</p>' +
				'<p>"Oh, it\'s just that I was admiring how strong and independent you seem to be.  I imagine that must make you a very attractive woman, for some people."</p>' +
				'<p>"Yes," she says authoritatively. "Strong.  Independent.  Yes, I vowed as a young woman to never let myself be taken advantage of when people thought that just because I was a woman, that made me weak."</p>' +
				'<p>"Thats right.  And a strong, independent woman only does what <i>she</i> wants, doesn\'t she?" you ask, beginning to lead her down the path to her enslavement.</p>' +
				'<p>"Correct...  Yes..." she says, her body beginning to visibly quiver with desire.</p>' +
				'<p>"So... if someone were to tell you to do something, you would only do it if you <i>wanted</i> to, right?"</p>' +
				'<p>"Of course... only if I wanted to."</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Show me what you have on under those clothes, then."', Place, 'type=charmgina2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmgina2") {
			md = WritePlaceHeader();
			if (this.place === 0) this.showPerson("gina2.jpg");	//At the Museum
			else this.showPerson("gina23.jpg");	//At Home
			
			addPlaceTitle(md, "Gina Under a Spell");
			md.write(
				'<p>Without thinking, and driven by the desire welling up within her, Gina immediately ' +
				'begins to reveal what she\'s wearing underneath her clothing.</p>' +
				'<p>"Now.  Why are you doing that Gina?  Why are you doing what I told you to do?"</p>' +
				'<p>"Be... Because I wanted to.  I am a strong, independent woman and I only do what I ' +
				'want to do?" she says, although this time finishing the statement as a question, as if already seeking your approval.</p>' +
				'<p>"We\'ll see," you say.  "But if you <i>wanted</i> to do that, then what does that ' +
				'mean about me?  Why would you be stripping just for me?"</p>' +
				'<p>"Uhmm..." she says, confused, then her expression changes as she finally finds a ' +
				'target for her blooming desire.  "Because I am trying to seduce you," she finally gets out.</p>' +
				'<p>"Seduce me?" you ask. "Well, you would be much more effective at that if you didn\'t ' +
				'tell me you were trying first.  Besides, I don\'t think you\'re trying to seduce me.  At least ' +
				'not very hard," you say somewhat derisively.  "I\'m not really even attracted to you."</p>' +
				'<p>She is somewhat taken aback.  From her looks, you would guess she has never been told that before.  "Not attracted...  Why not?  What should I do, what <i>are</i> you attracted to?" she whimpers.</p>' +
				'<p>"I go more for the submissive type... the type that does what she is told <i>because</i> she is told to do it."</p>' +
				'<p>"Tell me what to do!" she cries.  "I have to have you!"</p>'
			);

			startQuestions();
			if (this.place === 0) {
				//@ Museum
				addLinkToPlaceC(md, '"Well, why don\'t you play with yourself for me."', Place, 'type=charmgina3');
			} else {
				addLinkToPlaceC(md, '"Well, why don\'t you take off your pants, turn around, and show me that ass of yours."', Place, 'type=charmgina3');
			}
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmgina3") {
			md = WritePlaceHeader();
			if (this.place === 0) this.showPerson("gina3.jpg");	//At the Museum
			else this.showPerson("gina24.jpg");	//At Home
			//**************************
			//place (0=@ Museum   1=@ Home) 
			addPlaceTitle(md, "Gina Under a Spell");
			md.write('<p>Gina quickly does as you ordered - ');
			if (this.place === 0) {
				//@ Museum
				md.write(' unbuttoning her trousers and sliding her hand down. The sudden onset of pleasure is amplified by the spell and she quickly begins to moan.</p>');
			} else {
				md.write(' pushing her pants to the floor and then turning to give you a better view.  You run your hands across her soft flesh, quickly drawing out moans of passion as the spell amplifies the pleasure of your touch.</p>');
			}
			md.write(
				'<p>"That\'s better," you say, running your eyes up and down her form as if inspecting a slab of meat. "But now I\'m afraid I am a bit confused."</p>' +
				'<p>"Con... con...  confused?" she tries say, stuttering as her mind and body are racked with wave after wave of pleasure as she continues to follow your order.</p>' +
				'<p>"Yes.  I thought you said that you were a strong, independent woman who only did things that she wanted to do." you say, smacking her on the ass as you do. ' +
				'"But now its looks more like you\'re a weak, submissive woman who will do anything she is told to do. - Something I find very attractive, by the way," you say, knowing how much you are teasing her mind with the idea that she is pleasing you.</p>' +
				'<p>"So which is it?" you ask as you walk circles around her.  "The strong woman that I find completely unattractive - or the submissive slave that is crying out for a ' + perYou.getMaster() + '?"'
			);
			startQuestions();
			addLinkToPlace(md, "wait for her to reply", Place, 'type=charmgina4');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmgina4") {
			md = WritePlaceHeader();
			if (this.place === 0) this.showPerson("gina4.jpg");			//At the Museum
			else this.showPerson("gina25.jpg");		//At Home

			var myName = perYou.getMaster();

			addPlaceTitle(md, "Gina Under a Spell");

			md.write(
				'<p>"Oh, the submissive slave!" she says, turning to face you between shudders of pleasure.</p>' +
				'<p>"The slave?" you ask. "But what happened to the strong woman from before?"</p>' +
				'<p>"That was all an act!" she cries out in desperation.  "I\'ve always been a submissive woman, ' +
				'looking for someone to tell me what to do.  But I didn\'t know who I could trust.  I had to protect myself."</p>' +
				'<p>"Well then...  If you\'ve always been a slave, then who is your ' + myName + ' then?"</p>' +
				'<p>"I don\'t have a ' + myName + '," she says, almost breaking down in tears. ' +
				'"Wait! Would you be my ' + myName + '? Oh please!?!"</p>' +
				'<p>"I don\'t know," you say, pretending to consider the offer.  "You were lying before, how can I trust ' +
				'you now?  What could you possibly do for me as my slave?"</p>' +
				'<p>"I swear I will serve you faithfully and truthfully.  Please!  Ask anything of me and I will do it! ' +
				'I would live to serve you, to be anything you wanted me to be.  Your guard, your slave, your slut, your ' +
				'plaything.  I am whatever you want me to be!  Please, I can not be a slave without a ' +
				myName + '!" she cries.  It almost makes you feel sorry for her.  Almost.</p>' +
				'<p>"Fine then, <i>Slave</i>, come and pleasure your ' + myName + '," you say forcefully.'
			);

			if (perYou.isMaleSex()) md.write('"Prove your devotion to your new ' + myName + ' as you suck my cock and swallow every drop!"</p>');
			else md.write('"Prove your devotion to your new ' + myName + ' as you drink every last drop from my wet slit!"</p>');

			// Choices
			startQuestions();
			if (this.place === 0) //@ the Museum
			{
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 304);
				addLinkToPlace(md, "leave the Museum", 238);
			} else {
				//@ home
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 302);
				addLinkToPlace(md, "leave the house", 229);
			}
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
			// Museum Guard Gina
			if (Place == 241 || Place == 277 || Place == 302) {
				if (isPossess("Gina")) ddComments("You are currently Possessing Gina, there is no-one else around.");
				else {
					if (this.FindItem(43) > 0) {
						// Still wearing her Necklace
						addComments("You attempt to cast the spell...  And it seems to bounce off of her.  It's as if there is something protecting her from your magic.");
					} else {
						// No longer wearing her necklace
						if (!this.checkFlag(2)) addComments("You do not know the guards name, so the spell will not work.");
						else CastCharmSpell("Gina", Place, 1, 'type=charmgina1');
					}
				}
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls
	per.isPhoneable = function() {
		// Can you call them?
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.isCharmedBy();
	};

	per.callThem = function() {
		if (Place == 269) {
			if (this.place === 0) WriteComments("You call Gina to invite her to join you at the pool for a swim, but she replies, \"Sorry " + perYou.getMaster() + " I am on duty. I cannot take time off, maybe if I was home on a holiday, but not now!\". She apologies and promises to another time. ");
			else {
				gotoPlace(Place, 'type=ginapool');
				receiveCall('', 'You call Gina to invite her to join you at the pool for a swim, and she answers enthusiasticaly, "Damn right!" and hangs up. You take that to mean she will be there soon.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};
	
}
