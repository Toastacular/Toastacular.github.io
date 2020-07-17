/****************************************************************
		Miss Logan (Biology Teacher)
****************************************************************/

// Timed event to auto-select assignment 'Neurology' if you do not answer
function LoganAssignment()
{
	var perL = findPerson("MissLogan");
	if (perL.other == 1) {
		perL.other = 2;
		perL.place = 9999;
	}
}

function RepliesMissLogan(nR)
{
	//var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 1)
	{
		if (per.other == 1) per.other = 2;
		bChat = false;
		addComments(per.addPersonFace());
		addComments('<p>"Good, I wish you luck with the project and don\'t forget to call if you need any help."</p>');
		per.place = 9999;
	}
	else if (nR == 2)
	{
		if (per.other < 5) per.other = 5;
		PlaceI(5, 141);  /* Place a stone in the sacred clearing */
		setPlaceKnown("AnatomyClassroom"); /* Access Anatomy classroom */
		per.place = 234;
		bChat = false;
		addComments(per.addPersonFace());
		addComments('<p>"My favorite topic. Why don\'t you come to class later and I\'ll help you out?"</p>');
	}
	else if (nR == 6)
	{
		if (per.other == 6) per.other = 7;
		addComments('<p>"Oh ' + myName + '. Are you here to discuss reproduction?"</p>');
	}
	else if (nR == 2600)
	{
		setPlaceKnown("LogansHouse");
		addComments('"Oh, ' + myName + ', it is 12 Cherise Rd, please come and visit any evening!"');
	}
	else if (nR == 2601)
	{
		per.setFlag(5);
		addComments('You comment about her desktop and the lock screen of the pregnant woman. Miss Logan says,</p><p>"I have no secrets from you, use my computer any time you like", and she tells you her password.');
	}	
	return true;
}

// Initialise
function initialiseMissLogan()
{
	// Miss Logan
	addPerson("Miss Logan", Math.random() < 0.5 ? 70 : 196, "MissLogan");
	per.getPossessionFace = function() { return "logan-face"; };
	per.Replies = RepliesMissLogan;
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		return this.isCharmedBy() ? (this.getCharmedLevel() == 1 ? this.name + ", your Slave" : this.name + ", your Breeder") : this.name;
	};
	
	per.getPersonAddress = function() { return isPlaceKnown("LogansHouse") ? '16 Cherise Rd, Glenvale' : ''; };

	per.whereNow = function() {
		if (!isShopOpen(2) && getDay(true) != "Sun") return 440;
		if (this.place == 196 || this.place == 70) {
			if (!isShopOpen(2)) return 440;
			return this.place;
		}
		if (isDemonQuestDone() && getDay(true) == "Sun" && isDay()) {
			if (this.other < 5 || (this.other >= 5 && this.getCharmedLevel() > 0)) return 269;
		}
		if (this.place == 0) return 234;
		return this.place;
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 70 && isShopOpen(2) && this.isHere() && this.other == 1) {
			// Miss Logan in the school hallway
			return this.showPerson("logan1b.jpg", '', '', '', '', false, "string");
		}
		if (Place == 440 && this.isHere() && sType === "") return this.showPerson("home1a.jpg", '', '', '', '', false, "string");
		return '';
	};
		
	// Can you chat with Miss Logan
	per.showPersonChat = function(bGeneral, md)
	{
		if (sType !== "") return;
		
		//   Miss Logan Path 1=Just Met
		if (this.other == 1 && ((isShopOpen(2) && this.place == 70 && Place == 70) || (this.place == 196 && Place == 196 && isShopOpen(4)))) {
			startAlternatives(md, "How do you respond to Miss. Logan");
			addQuestionC(md, 'ask to do the neurology assignment', "MissLogan", 1);
			addQuestionC(md, 'ask to do the reproductive assignment', "MissLogan", 2);
			endAlternatives(md);
		} else if (this.isHere() && this.isCharmedBy()) {
			if (Place == 269) addLinkToPlaceC(md, this.getCharmedLevel() == 1 ? "ask Miss Logan to participate in the 'club'" : "discuss water based reproduction with Miss Logan", Place, 'type=loganxxx');
			if (!isPlaceKnown("LogansHouse")) addQuestionC(md, 'ask Miss. Logan where she lives', "MissLogan", 2600);
			if (this.checkFlag(6) && !this.checkFlag(5)) addQuestionC(md, 'ask Miss. Logan about her home desktop computer', "MissLogan", 2601);
			if (Place == 440) {
				// At her home
				addLinkToPlaceC(md, 'ask her for a lesson', Place, 'type=loganfuck');
				this.addSleepLink(md, "bed Miss Logan", "Sleeping with the Teacher",
					'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Miss Logan to bed for the night.</b>',
					'bed1.jpg', true, '', '', '', "overflow-y:hidden"
				);				
			}
		} else if (Place == 440) {
			// At her home on your own
			if (this.checkFlag(5)) addLinkToPlaceC(md, 'check out her desktop computer', Place, 'type=checkloganpc');
		}
	};
	
	
	per.isPlaceImageRight = function()
	{
		if (this.other == 1 && this.whereNow() == 196 && sType === "" && Place == 196) {
			SetRightColumnSize("large");
			return true;
		}
		return false;
	};
	
	per.showPlaceImageRight = function(md)
	{
		this.showPerson("logan1d.jpg");
	};

	per.showEventPopup = function()
	{
		// Futa reaction
		if (sType == "loganxxx" && !this.checkFlag(7) && perYou.isFuta() && !perYou.isBornMale()) {
			this.setFlag(7);
			showPopupWindow("Miss Logan and Your Changes",
				perYou.addPersonString("xf-futa.jpg", "height:max%", "right") +
				'You have a surprise for Miss Logan. A big surprise already halfway erect when you undress and raking its mushroom head towards your Teacher.</p>' +
				'<p>“Wait, that is...” Miss Logan takes a step back from you. “' + perYou.getPersonName() + ' why do you have a penis?”</p>' +
				'<p>You smile and wrap your fingers around your new cock, slowly stroking it and letting it grow in your hand.</p>' +
				'<p>“To impregnate you, of course.” You tell her. “What else would one use a big, hard cock like this for?”</p>' +
				'<p>“But this is... it\'s...” Miss Logan is clearly confused, struggling with the weirdness of the whole situation when the pink glow in her eyes suddenly flares up and you watch her bend over with a long, drawn out moan.</p>' +
				'<p>“It\'s wonderful!” Doubt and confusion have vanished from her face as she looks back up to you, replaced with a greedy hunger as her eyes rest on your now fully erect cock.</p>' +
				'<p>“I\'ve always thought that we would find someone to impregnate both of us, but this is so much better!” She takes your hand and drags you into the bedroom. “Let\'s examine your new reproductive organs. You must have so many questions and I can\'t wait to answer them hands on.”'
			);
			return true;
		}	
		
		if (sType !== "") return false;
		
		if (Place == 70 && this.other == 7) this.other = 6;

		//  Miss Logan Path 1=Just Met
		// if Mrs Robbins Freed from Davy -AND- Tess Adams Sent to your room or later -AND- later and Logan Path hasn't started yet
		if ((Place == 70 || Place == 196) && !isCharmedBy("MrsRobbins", "Davy") && getPersonOther("Tess") >= 10 && this.other === 0) {
			if (Place == 70 && isShopOpen(2) && this.place == 70) {
				this.other = 1; // Start Miss Logans path
				startTimedEvent('LoganAssignment()', 20);
				showPopupWindow("Miss Logan",
					this.addPersonString("logan1a.jpg", "height:max%", "right") +
					"In the hallway you see Miss. Logan your anatomy teacher, a teacher who most of her classes drool over her anatomy." +
					"<br><br>" +
					"She is a very casual teacher with an easy air of friendship who is happy to spend one-on-one time with her students. You have never heard any rumours about her, so strictly professional one-on-one time." +
					"<br><br>" +
					"You have been avoiding her, there is a project you must complete, but you have been more interested in your pursuit of the Kurndorf Book. " +
					"She told you many times that she sees something in you and thinks that you have a great talent in literature and biology and she prodded you way too many times to count to pursue this line of things. However, you never did care about the stuff she tried to ram into your head and overall, you were just too lazy to care about these boring topics. Then again, you are afraid of disappointing her and that’s why you are trying to hide from her." +
					"<br><br>" +
					"Miss. Logan comes to a halt as she notices you and runs towards you. This is it! You’re busted! You\'ve got to think something up about that unmade project! Or maybe she wants something else and there’s nothing to worry about? As you run through a series of options in your head Miss. Logan arrives right in front of you."
				);
				return true;
			}
			if (Place == 196 && this.place == 196 && isShopOpen(4) ) {
				this.other = 1; // Start Miss Logans path
				startTimedEvent('LoganAssignment()', 20);
				showPopupWindow("Miss Logan",
					this.addPersonString("logan1c.jpg", "height:max%", "right") +
					"As you step into the Restaurant you come across your anatomy teacher, a teacher who most of her classes drool over her anatomy. Miss. Logan dining alone, absorbed into her thoughts and doesn’t recognise you at first. " +
					"She is casually dressed as usual, you would guess she is here get some food. One time your friend Catherine mentioned Miss Logan is fond of bratwurst, though as usual she implied that your teacher was fond of the long sausage more as a cock substitute!" +
					"<br><br>" +
					"Miss Logan is a very casual teacher with an easy air of friendship who is happy to spend one-on-one time with her students. You have never heard any rumours about her, so strictly professional one-on-one time." +
					"<br><br>" +
					"It’s fortunate she has not noticed you because you are trying to avoid her, because there is a project you must complete, but you have been more interested in your pursuit of the Kurndorf  Book." +
					"<br><br>" +
					"You try to sneak past her as silently as you can without disturbing her, but all of a sudden she looks up and points a finger at you then motions you to come to her. You despondently walk towards her, knowing that there is a high chance that she will be angry with you over the undone project. " +
					"Now, what was it? Reproductive or Neurology topics that was assigned to you?"
				);
			}
		}

		return false;
	};
	
	per.showEvent = function()
	{
		var md;
		
		if (Place != 269 && Place != 234 && Place != 440) return false;
		
		var bPool = Place == 269;	
		var bBreed = this.getCharmedLevel() == 2;
		
		if (sType == "charmlogan1") {
			// Event: Charm Miss Logan: part 1
			// Can be either in the Biology classroom or at the Broken Inn Hotel Pool			
			md = WritePlaceHeader(false, "td-left-med");
			setPlaceKnown("AnatomyClassroom");
			
			if (bPool) {
				// Hotel Pool
				this.showPerson("logan12.jpg");
				addPlaceTitle(md, "Miss Logan Charmed");
				md.write(
					'<p>Miss Logan shakes her head and looks over at you. Somewhat confused, she steps over and asks you,</p>' +
					'<p>"You are doing a project on the brain, right? Are you sure you would not prefer to do a study of anatomy?"</p>' +
					'<p>She suggestively squeezes her breasts together as she leans in toward you,</p>' +
					'<p>"I think that you need some help in reproduction," she claims. "Have you thought of a practical project?"</p>' +
					'<p>You\'re unsure exactly what she means but you get a pretty good idea...</p>'
				);
				
			} else {
				// Anatomy Classroom
				this.showPerson("logan4.jpg");
				addPlaceTitle(md, "Miss Logan Charmed");
				md.write(
					'<p>Miss Logan shakes her head. Somewhat confused, she tries to remember what she was talking about. ' +
					'As her mind shifts she climbs onto her desk like a panther.</p>' +
					'<p>"I think that you need some help in reproduction," she claims. "Have you thought of a practical project?"</p>' +
					'<p>You\'re unsure exactly what she means...</p>'
				);
			}

			startQuestions();
			addLinkToPlaceC(md, "ask your teacher what she means", Place, 'type=charmlogan2');
			if (perYou.checkFlag(26)) addLinkToPlaceC(md, '"practical about reproduction?"', Place, "type=charmlogan2breeder");
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmlogan2" || sType == "charmlogan2breeder") {
			// Event: Charm Miss Logan: part 2
			// Can be either in the Biology classroom or at the Broken Inn Hotel Pool			
			md = WritePlaceHeader();
			bBreed = sType == "charmlogan2breeder";
			if (bBreed) this.charmThem(2);		// now a breeder
			
			if (bPool) {
				// Hotel Pool
				this.showPerson("logan13.jpg");
				addPlaceTitle(md, "Miss Logan Charmed");
				md.write(
					'<p>As you look at your teacher you remember a time a while ago Amy had whispered to you during a lesson that she thought Miss Logan was a lesbian. Catherine had dramatically told her <b>not</b> to spread rumours about the lesbian affair between two teachers, and proceeded to tell her lurid details.</p>' +
					'<p>Then again one time when you went to the Gym to meet Amy you saw Miss Logan flirting with some guy...</p>' +
					'<p>Your attention is drawn back to the present as Miss Logan slips off her bikini top, exposing her large breasts, larger than you had thought from school! You notice a couple of other people looking appreciatively at her. You are going to have to find somewhere more private.</p>'
				);
				if (bBreed) {
					// Breeder
					if (perYou.isMaleSex()) {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may..."</p>' +
							'<p>You remember her offer of a practical and ask "You mean impregnate her, breed her?". Miss Logan looks at you and down at your growing erection. A wave of desire crushes the last of your teacher\'s will.</p>' +
							'<p>"Just take me ' + perYou.getPersonName() + '! Fuck me and cum in me, I am not taking contraceptives!"</p>'
						);
					} else {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may..."</p>' +
							'<p>You remember her offer of a practical and ask "You mean impregnate her, breed her?". Miss Logan looks at you and a wave of desire crushes the last of your teacher\'s will.</p>' +
							'<p>"Let me show you how to make a man really hot, so he can breed us! All men love to see two women together!"</p>'
						);
					}	
					
				} else {
					// Standard
					if (perYou.isMaleSex()) {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
							'<p>A wave of desire crushes the last of your teacher\'s will. "Just take me ' + perYou.getPersonName() + '! Take me now!"</p>'
						);
					} else {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
							'<p>A wave of desire crushes the last of your teacher\'s will. "Let me show you how to make a man really hot, ' + perYou.getPersonName() + '! All men love to see two women together!"</p>'
						);
					}
				}
				
			} else {
				// Anatomy Classroom
				this.showPerson("logan5.jpg");
				addPlaceTitle(md, "Miss Logan Charmed");
				md.write(
					'<p>As you look at your teacher you remember a time a while ago Amy had whispered to you during a lesson that she thought Miss Logan was a lesbian. Catherine had dramatically told her <b>not</b> to spread rumours about the lesbian affair between two teachers, and proceeded to tell her lurid details.</p>' +
					'<p>Then again one time when you went to the Gym to meet Amy you saw Miss Logan flirting with some guy...</p>' +
					'<p>Your attention is drawn back to the present as Miss Logan starts to unbutton her top,</p>'
				);
				if (bBreed) {
					// Breeder
					if (perYou.isMaleSex()) {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may..."</p>' +
							'<p>You remember her offer of a practical and ask "You mean impregnate her, breed her?". Miss Logan looks at you and down at your growing erection. A wave of desire crushes the last of your teacher\'s will.</p>' +
							'<p>"Just take me ' + perYou.getPersonName() + '! Fuck me and cum in me, I am not taking contraceptives!"</p>'
						);
					} else {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may..."</p>' +
							'<p>You remember her offer of a practical and ask "You mean impregnate her, breed her?". Miss Logan looks at you and a wave of desire crushes the last of your teacher\'s will.</p>' +
							'<p>"Let me show you how to make a man really hot, so he can breed us! All men love to see two women together!"</p>'
						);
					}
					
				} else {
					// Standard
					if (perYou.isMaleSex()) {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
							'<p>A wave of desire crushes the last of your teacher\'s will. "Just take me ' + perYou.getPersonName() + '! Take me now!"</p>'
						);
					} else {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
							'<p>A wave of desire crushes the last of your teacher\'s will. "Let me show you how to make a man really hot, ' + perYou.getPersonName() + '! All men love to see two women together!"</p>'
						);
					}
				}
			}

			startQuestions();
			addLinkToPlace(md, bBreed ? (perYou.isMaleSex() ? "breed Miss Logan" : "discuss reproduction") : "take Miss Logan", Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmlogan3") {
			// Event: Charm Miss Logan: part 3
			// Can be either in the Biology classroom or at the Broken Inn Hotel Pool			
			md = WritePlaceHeader(false, "td-left-med");
			passTime(true);	// TODO: only once?
			setPlaceKnown("LogansHouse");

			if (bPool) {
				// Hotel Pool
				if (isExplicit()) {
					if (perYou.isMaleSex() && bBreed) this.showPersonRandomX("logan15", 2);
					else if (perYou.isMaleSex()) this.showPersonX("logan14.jpg");
					else this.showPersonRandomX("logan6g", 2);
				} else if (perYou.isMaleSex() && bBreed) this.showPersonRandomX("logan15", 2);
				else if (perYou.isMaleSex()) this.showPerson("logan14.jpg");
				else this.showPerson("logan6g.jpg");
				addPlaceTitle(md, "Miss Logan Charmed");

				if (bBreed || !perYou.isMaleSex()) {
					md.write(
						'<p>Miss Logan is losing all control, but this is a public place. You tell Miss Logan you need to continue this in a more private place. She refits her bikini top and grabs your hand and drags you to the hotel front desk. She quick rents a room, and you see a knowing look on the person at the desk, while this is no \'love hotel\' or one that rents by the hour, still they must get quite a number of people having private...lessons.</p>' +
						'<p>A little later you are in the room, Miss Logan tearing off her clothing....</p>'
					);
				} else {
					md.write(
						'<p>Miss Logan is losing all control, but this is a public place. You glance around and see a more secluded area, out of the sight of the other people using the pool.</p>'
					);
				}
				if (bBreed) {
					// Breeder
					if (perYou.isMaleSex()) {
						this.setFlag(1);
						md.write(
							'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes, as she instructs you in the best positions and ways to maximise the chance of pregnancy.</p>' +
							'<p>After she seems confident you have successfully bred her, but that is more the influence of the spell on her mind. Still there is nothing stopping you trying again and again if she is not. As far as you know the charm spell does not affect the fertility of women you cast it on...</p>'
						);
					} else {
						md.write(
							'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes, and she instruct you in the best positions to increase the chance of pregnancy. She emphasises that if you orgasm it may increase the chance of conception. You had thought you had heard conflicting information on this, but Miss Logan is adamant, and besides she is very good at making you orgasm!</p>' +
							'<p>After she is a little disappointed that you could not breed her, and asks if you can arrange it with a friend of yours? It is impressive how the spell has shaped her mind, created this considerable desire, at leasts as far as you know the charm spell does not affect the fertility of women you cast it on...</p>'
						);
					}
					md.write('<p>As you dress you have to think that in all of the years of attending school you never dreamed that an anatomy lesson could be so much fun.</p>');
				} else {
					// Standard
					md.write(
						'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes.</p>' +
						'<p>In all of the years of attending school you never dreamed that an anatomy lesson could be so much fun.</p>'
					);
				}
				md.write(
					'<p>Miss Logan tells you in her \'teacher\' voice, "Make sure to visit me in the Anatomy Class tomorrow for a lesson...about my anatomy"</p>' +
					'<p>She continues, "You can also come and fuck me at my mone, 12 Cherise Rd when I am at home!"</p>'
				);
				startQuestions();
				addLinkToPlace(md, "return to the pool", 269);

			} else {
				// Anatomy Classroom
				if (isExplicit()) {
					if (perYou.isMaleSex()) this.showPersonRandomX("logan6b", 2);
					else this.showPersonRandomX("logan6g", 2);
				} else if (perYou.isMaleSex()) this.showPersonRorX("logan6b.jpg");
				else this.showPerson("logan6g.jpg");
				addPlaceTitle(md, "Miss Logan Charmed");
				if (bBreed) {
					// Breeder
					if (perYou.isMaleSex()) {
						this.setFlag(1);
						md.write(
							'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes, as she instructs you in the best positions and ways to maximise the chance of pregnancy.</p>' +
							'<p>After she seems confident you have successfully bred her, but that is more the influence of the spell on her mind. Still there is nothing stopping you trying again and again if she is not. As far as you know the charm spell does not affect the fertility of women you cast it on...</p>'
						);
					} else {
						md.write(
							'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes, and she instruct you in the best positions to increase the chance of pregnancy. She emphasises that if you orgasm it may increase the chance of conception. You had thought you had heard conflicting information on this, but Miss Logan is adamant, and besides she is very good at making you orgasm!</p>' +
							'<p>After she is a little disappointed that you could not breed her, and asks if you can arrange it with a friend of yours? It is impressive how the spell has shaped her mind, created this considerable desire, at leasts as far as you know the charm spell does not affect the fertility of women you cast it on...</p>'
						);
					}
					md.write('<p>As you dress you have to think that in all of the years of attending school you never dreamed that an anatomy lesson could be so much fun.</p>');
				} else {
					// Standard
					md.write(
						'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes.</p>' +
						'<p>In all of the years of attending school you never dreamed that an anatomy lesson could be so much fun.</p>'
					);
				}
				md.write('<p>She tells you, "You can also come and fuck me at my mone, 12 Cherise Rd when I am at home!"</p>');
				startQuestions();
				addLinkToPlace(md, "exit the room", 70);
			}
			if (bBreed && perYou.isMaleSex()) {
				AddRightColumn(md);
				AddImageRandom("GenericSex/creampie", 2);
			}
			WritePlaceFooter(md, '', true, true);
			return true;
		}

		
		if (sType == "recharmlogan1") {
			// Re-charm Mis Logan
			if (bBreed) {
				this.charmThem(1);
				bBreed = false;
			} else {
				this.charmThem(2);
				bBreed = true;
			}
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPersonRorX("logan-pool-recharm" + (perYou.isMaleSex() ? "b" : "g") + ".jpg");
			addPlaceTitle(md, "Miss Logan Under A Charm Spell - Again");
			
			md.write(
				'<p>Once again you cast the spell on your teacher, ' + (bBreed ? 'this time with the intent of further following up her talk of reproduction and breeding' : 'this time to calm down her obsession with reproduction, if that is possible.') + '</p>' +
				'<p>As you talk about this Miss Logan loses all control, but this is a public place. You tell Miss Logan you need to continue this in a more private place. She refits her bikini top and grabs your hand and drags you to the hotel front desk. She quick rents a room, and you see a knowing look on the person at the desk, while this is no \'love hotel\' or one that rents by the hour, still they must get quite a number of people having private...lessons. Fortunately a room is available, not yet ready for a customer so the bed it still being readied and some other cleaning materials are around.</p>' +
				'<p>A little later you are in the room, Miss Logan tearing off her bikini....</p>'
			);
			if (bBreed) {
				if (perYou.isMaleSex()) {
					this.setFlag(1);
					md.write(
						'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes, as she instructs you in the best positions and ways to maximise the chance of pregnancy.</p>' +
						'<p>After she seems confident you have successfully bred her, but that is more the influence of the spell on her mind. Still there is nothing stopping you trying again and again if she is not. As far as you know the charm spell does not affect the fertility of women you cast it on...</p>'
					);
				} else {
					md.write(
						'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes, and she instruct you in the best positions to increase the chance of pregnancy. She emphasises that if you orgasm it may increase the chance of conception. You had thought you had heard conflicting information on this, but Miss Logan is adamant, and besides she is very good at making you orgasm!</p>' +
						'<p>After she is a little disappointed that you could not breed her, and asks if you can arrange it with a friend of yours? It is impressive how the spell has shaped her mind, created this considerable desire, at leasts as far as you know the charm spell does not affect the fertility of women you cast it on...</p>'
					);
				}
			} else {
				// Standard
				if (perYou.isMaleSex()) {
					md.write(
						'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
						'<p>A wave of desire crushes the last of your teacher\'s will. "Just take me ' + perYou.getPersonName() + '! Take me now!"</p>'
					);
				} else {
					md.write(
						'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
						'<p>A wave of desire crushes the last of your teacher\'s will. "Let me show you how to make a man really hot, ' + perYou.getPersonName() + '! All men love to see two women together!"</p>'
					);
				}
				md.write('<p>You enjoy the pleasures of Miss Logan for the next twenty minutes.</p>');
			}
			md.write('<p>As you dress you have to think that in all of the years of attending school you never dreamed that an anatomy lesson could be so much fun.</p>');

			startQuestionsOnly();
			addLinkToPlace(md, "return to the pool", 269);
			if (perYou.isMaleSex() && bBreed) {
				AddRightColumn(md);
				AddImageRandom("GenericSex/creampie", 2);
			}			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "loganxxx") {
			md = WritePlaceHeader();

			this.showPerson(Place == 269 ? 'logan13.jpg' : "logan8.jpg");
			addPlaceTitle(md, "Miss Logan");

			md.write(
				'<p>&quot;I\'m always ready to teach,&quot; says the teacher in heat. ' +
				'&quot;All you have to do is ask and it is all yours.&quot;</p>'
			);

			startQuestions();
			if (perYou.isMaleSex()) {
				addLinkToPlaceC(md, bBreed ? 'breed Miss Logan' : '"How about a test on reproduction"', Place, "type=loganfuck");
				addLinkToPlaceC(md, bBreed ? 'breasts are important for your breeder' : '"Teach me the purpose of breasts"', Place, "type=logantitfuck");
				addLinkToPlaceC(md, bBreed ? '"Get me ready to breed you"' : '"Can I have an oral exam"', Place, "type=loganbj");
			} else {
				addLinkToPlaceC(md, bBreed ? '"Let\'s practice getting ready for breeding"' : '"Can I have an oral exam"', Place, "type=loganbj");
			}
			
			if (Place == 269) addLinkToPlace(md, "return to the pool", 269);
			else addLinkToPlace(md, "exit the room", 70);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "loganbj") {
			md = WritePlaceHeader(false, Place == 269 && !isExplicit() ? 'td-left-med' : '');
			if (Place == 269) this.showPersonRorX("logan16.jpg");
			else if (isExplicit()) {
				if (perYou.isMaleSex()) this.showPersonRandomX("logan10b", 2);
				else this.showPersonRandomX("logan6g", 2);
			} else this.showPerson(perYou.isMaleSex() ? "logan10b.jpg" : "logan10g.jpg");

			addPlaceTitle(md, "Miss Logan");

			md.write(
				'<p>Miss Logan examines you orally.</p>' +
				'<p></p>'
			);
			startQuestions();
			if (Place == 269) addLinkToPlace(md, "return to the pool", 269);
			else addLinkToPlace(md, "exit the room", 70);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "logantitfuck") {
			md = WritePlaceHeader();
			if (Place == 269) this.showPersonRorX("logan14.jpg");
			else if (isExplicit()) this.showPersonRandomX("logan9", 2);
			else this.showPerson("logan9.jpg");

			addPlaceTitle(md, "Miss Logan");

			md.write(
				'<p>Miss Logan demonstrates an important function of breasts.</p>' +
				'<p></p>'
			);
			startQuestions();
			if (Place == 269) addLinkToPlace(md, "return to the pool", 269);
			else addLinkToPlace(md, "exit the room", 70);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "loganfuck") {
			md = WritePlaceHeader(false, Place == 440 ? 'td-left-med' : '');
			if (Place == 440) {
				if (perYou.isFuta()) this.showPersonRorX("logan17.jpg");
				else if (isExplicit()) {
					if (perYou.isMaleSex()) this.showPersonRandomX("home-sexb", 2);
					else this.showPersonX("home-sexg.jpg");
				} else if (perYou.isMaleSex()) this.showPerson("home-sexb.jpg");
				else this.showPerson("home-sexg.jpg");
			} else if (Place == 269) {
				// At the Pool
				if (isExplicit()) {
					if (perYou.isMaleSex() && bBreed) this.showPersonRandomX("logan15", 2);
					else if (perYou.isMaleSex()) this.showPersonX("logan14.jpg");
					else this.showPersonRandomX("logan6g", 2);
				} else if (perYou.isMaleSex() && bBreed) this.showPersonRandomX("logan15", 2);
				else if (perYou.isMaleSex()) this.showPerson("logan14.jpg");
				else this.showPerson("logan6g.jpg");
			} else {
				// At the classroom
				if (isExplicit()) {
					if (perYou.isMaleSex()) this.showPersonRandomX("logan6b", 2);
					else this.showPersonRandomX("logan6g", 2);
				} else if (perYou.isMaleSex()) this.showPersonRorX("logan6b.jpg");
				else this.showPerson("logan6g.jpg");
			}
			if (bBreed && perYou.isMaleSex()) this.setFlag(1);

			addPlaceTitle(md, "Miss Logan");

			md.write(
				'<p>Miss Logan gives you a practical test on methods of reproduction.</p>' +
				'<p></p>'
			);
			startQuestions();
			if (Place == 440) addLinkToPlace(md, "talk more to Miss Logan", 440);
			else if (Place == 269) addLinkToPlace(md, "return to the pool", 269);
			else addLinkToPlace(md, "exit the room", 70);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "checkloganpc") {
			// Browse her PC
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson("desktop.jpg");
			addPlaceTitle(md, "Miss Logan's Computer");

			md.write(
				'<p>Miss Logan is a reasonable current model PC and you see after you logon she has an image set as her desktop wallpaper, from a Japanese game your think. A bit of a \'noisy\' image for a wallpaper really.</p>' +
				'<p>You browse around and mostly see a routine system, a range of standard applications installed and so on. A better system than you have at home! Mostly routine as she does seem to have quite a lot of porn linked on her desktop and bookmarked in her browser. <b>All</b> of it is pregnancy related, images of pregnant women posing or sexually active!</p>' +
				'<p>One thing you do note, the images she has saved and almost all of blonde women, and you cannot help but wonder is this is how your blonde teacher fantasises.</p>' +
				'<p>You also find a folder of home videos...well more like sex-tapes...</p>'
			);
			startQuestions();
			addLinkToPlace(md, "browse the porn", Place, 'type=checkloganpcporn&stage=1');
			addWatchTVLink(md, 'watch one of the videos', 'Miss Logan\'s home video',
				'Only one of the videos will play at the moment, and it seems to be a fairly old one, Miss Logan is noticably younger</p>' +
				'<p>You see her masturbating whie watching a video on her computer, she definitely likes her porn and seems to like recording herself!</p>' +
				(!isExplicit() ? '<p>Unfortunately the video must be damaged and cuts out after a little while.</p>' : ''),
				this.getImg((isExplicit() ? "Explicit/" : "") + 'video1.mp4')
			);
			addLinkToPlace(md, "logoff the computer", Place);
			WritePlaceFooter(md);
			return true;			
		}
		if (sType == "checkloganpcporn") {
			// Browse her PC porn
			var stg = parseInt(getQueryParam("stage"), 10);
			md = WritePlaceHeader();
			this.showPersonAnon("pc" + stg + ".jpg");
			addPlaceTitle(md, "Miss Logan's Porn");
			md.write(
				'<p>Miss Logan\'s porn of pregnant women...all of them blonde like Miss. Logan...</p>'
			);
			if (stg == 20) md.write('<p>Just a minute, is that Ms. Titus in that image, it certainly looks like her!</p>');
			stg++;
			if (stg > 20) stg = 1;
			startQuestions();
			addLinkToPlace(md, "check some more", Place, 'type=checkloganpcporn&stage=' + stg);
			addLinkToPlace(md, "logoff the computer", Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		var perBreeder;
		if (sType == "missloganbreeder") {
			// Breed her with someone else
			perBreeder = findPerson(sWho);
			md = WritePlaceHeader();

			switch(sWho) {
			case "mrbeasley":
				perBreeder.showPerson("beasley14b.gif");
				addPlaceTitle(md, "Miss Logan's Breeder, Mr Beasley");
				md.write(
					'<p>"I\'m... not sure about this."</p>' +
					'<p>Miss Logan is understandably hesitant when you propose that a colleague should impregnate her, probably even more when that colleague is Mr Beasley, but you can be quite convincing if need be.</p>' +
					'<p>You pitch your teacher like he is some sort of breeding animal, much to his annoyance, praising his physique and girth while at the same time making sure to mention that his shoddy personality won\'t be much of an issue since all you need him for is his sperm anyway.</p>' +
					'<p>Mr. Beasley grinds his teeth at being forced to endure this indignity, but you do manage to convince Miss Logan that he would be a good sperm donor, making her all the more enthusiastic about doing this.</p>' +
					'<p>"You\'re right, let\'s not wait any longer and have your stud breed me already!" Miss Logan takes off the rest of her clothes and smiles to you. "And you should join us, too! The more the merrier and I don\'t care who knocks me up!/We could get pregnant together and have lots of Babies!"</p>'
				);
				break;
			case "johnadams":
				if (isExplicit()) perBreeder.showPersonX("breed.jpg");
				else perBreeder.showPerson("john4.jpg");
				addPlaceTitle(md, "Miss Logan's Breeder, John Adams");				
				md.write(
					'<p>Miss Logan takes a long, scrutinizing look at John, ordering the visibly bewildered man to take of his shirt and spin around.</p>' +
					'<p>“I like this one, but he looks like he may get clingy after knocking me up.”</p>' +
					'<p>You shush John as he tries to answer and speak for him instead, explaining that he has a wife to return to and is just doing this as a favor for you.</p>' +
					'<p>“Oh, so an open relationship! I\'ve been in one of those, too!” Miss Logan is visibly exited now. ”My partner was amazing and taught me so much about sexuality and how to entice potential breeding partners.”</p>' +
					'<p>Again, John tries to insert himself, but this time, it\'s Ms, Logan who interrupts him.</p>' +
					'<p>“I\'ve learned so much from her and will gladly pass on all I know to you so you can give your wife lots and lots of Babies as well!”</p>' +
					'<p>Miss Logan takes John\'s hand and drags him with her towards the bedroom.”</p>' +
					'<p>“And with ' + perYou.getPersonName() + ' here we can learn even more. ' + (perYou.isMaleSex() ? 'Two cocks have a much higher chance to impregnate a woman, after all.' : 'It\'s always good to have another female around to help entice the male. And maybe she\'ll get pregnant as well!') + '”</p>'
				);				
				break;	
			case "charlie":
				perBreeder.showPerson("gym2.jpg");
				addPlaceTitle(md, "Miss Logan's Breeder, Charlie");				
				md.write(
					'<p>“M... Miss Logan?”</p>' +
					'<p>Charlie\'s eyes go wide when he sees Miss Logan before him in little more than her underwear, and while it seemingly takes her a moment, she does recognize him, too.</p>' +
					'<p>“Charlie King? Oh yes, it -is- you!” She smiles brightly. “I haven\'t seen you since you graduated! And oh my, you have grown into a fine looking young man.”</p>' +
					'<p>“Th...thank you, Ma\'am.” Charlie is visibly flustered seeing his former teacher practically undress him with her eyes, especially when those eyes linger on the bulge involuntarily forming in his pants, and his head quickly snaps to you. “You didn\'t tell me that the chi... the lady you want me to... to have sex with would be my former biology teacher!”</p>' +
					'<p>You didn\'t know that, either, but before you are able to answer, Miss Logan is already addressing it.</p>' +
					'<p>“This isn\'t suddenly a problem, is it? I remember quite well how you and your friends looked at me when I began dressing more openly, or what you were saying you wanted to do with me and Emanuelle when you thought we couldn\'t hear you.”</p>' +
					'<p>“This was... we were...”</p>' +
					'<p>“...having urges that I was not allowed to properly teach you boys about, I know.” Miss Logan again interrupts him, and by now Charlies head is a deep shade of red.</p>' +
					'<p>“If I remember correctly, you once said you\'d “love to bend me over my desk” and “pound my pussy until I scream”. So let\'s start with that and work ourselves up from there.”</p>' +
					'<p>Charlie is completely dumbstruck as his former teacher pushes him towards the bedroom, but with the spell affecting him, there is no way he could deny her even if he wanted to, and Miss Logan won\'t take no for an answer anyway.</p>' +
					'<p>“You\'re joining in, too, right, ' + perYou.getPersonName() + '?” You hear her shout from the bedroom. ' + (perYou.isMaleSex() ? '“I like to keep my chances high!' : '“We could get pregnant together!') + '”</p>'
				);				
				break;	
			case "daria":
				perBreeder.showPerson("mothersuperior7f.jpg");
				addPlaceTitle(md, "Miss Logan's Breeder, Daria");				
				md.write(
					'<p>Miss Logan looks skeptical when a nun enters her house, but only about until the Mother Superior takes off her habit and reveals she is wearing nothing underneath besides her magically gifted cock.</p>' +
					'<p>“I did not expect this... have you always been...”</p>' +
					'<p>“...blessed like this?” Daria interrupts her. “No, this divine tool has only recently been gifted to me, but I have already shared its blessings with many of my sisters and disciples, and I will gladly share them with you as well.”</p>' +
					'<p>Miss Logan chuckles at that, but she is clearly intrigued by how much Daria\'s cock grows as she begins stroking it.</p>' +
					'<p>“You are either really dedicated to an erotic roleplay, or at the center of some Cult, but if ' + perYou.getPersonName() + ' believes you to be a good choice to impregnate me I will gladly receive your “blessing”.”</p>' +
					'<p>“You will find ' + perYou.getHimHer() + ' wise beyond ' + perYou.getHisHer() + ' years when it comes to the joys of the flesh. And if you do enjoy my blessings, I would love to regularly see you at church, too.”</p>' +
					'<p>Miss Logan says that she will at least consider it, and as she vanishes into her bedroom, Daria takes you aside.</p>' +
					'<p>“' + perYou.getMaster() + ', will you assist me with this potential disciple of the flesh? Nothing would please me more to spread the gospel by your side.”</p>'
				);				
				break;
			case "louise":
				perBreeder.showPerson(perBreeder.checkFlag(4) ? "poledancebefuta.jpg" : "poledancefuta.jpg");
				addPlaceTitle(md, "Miss Logan's Breeder, Louise");				
				md.write(
					'<p>Miss Logan welcomes Louise into her home, but it\'s obvious that she didn\'t expect you to invite another woman.</p>' +
					'<p>“' + perYou.getPersonName() + ' said you will help impregnate me, ' + (perYou.isMaleSex() ? 'and I\'m always happy to have another girl with me to entice my stud and maybe bear another child.”' : 'but I\'m not sure how anyone of us could become pregnant without a man present.”') + '</p>' +
					'<p>“I\'m not here to be impregnated, I think?” Louise looks to you for a moment, and there is a sign of relive on her face as you nod.</p>' +
					'<p>“' + perYou.getMaster() + ' wants me to be here because of this.”</p>' +
					'<p>Miss Logan\'s eyes go wide when Louise reveals her already half erect cock and begins to slowly stroke it, small drips of precum already leaking off.</p>' +
					'<p>“This is... unexpected, I would never have thought that you are....</p>' +
					'<p>“I\'m a woman!” Louise interrupts her, the cock growing to an impressive length under her attention.</p>' +
					'<p>“' + perYou.getPersonName() + ' likes my... dick, so I like it, too, but I am still a woman.”</p>' +
					'<p>There is a certain tension in Louise\'s voice, but she is still not able to stop stroking herself while in your presence. Luckily, Miss Logan gets the hint. “I was going to say “so well-endowed”, of course you are a woman.”</p>' +
					'<p>The comment seems to relax Louise somewhat, and she turns her attention back to you.</p>' +
					'<p>“I am still a little unsure about... this.” She gestures vaguely towards her crotch. “But if you want me to impregnate one of your other slaves or girlfriends I happily do it for you, ' + perYou.getMaster() + '.”</p>' +
					'<p>“Will you be with me when I do it?</p>'
				);				
				break;
			case "jenny":
				perBreeder.showPerson("jenny11.jpg");
				addPlaceTitle(md, "Miss Logan's Breeder, Jenny");				
				md.write(
					'<p>“Jenny!”</p>' +
					'<p>Miss Logan, half naked as she is, rushes to the door to give the waitress a hug. “I had no idea that you\'re a friend of ' + perYou.getPersonName() + '.”</p>' +
					'<p>“' + capitalizeFirstLetter(perYou.getHeShe()) + '\'s a regular at the Bavaria Hut, just like you.” Jenny seems to be completely unphased by your teachers nudity. The two women trade kisses to the cheek like old friends and Miss Logan quickly asks the waitress to join her inside.</p>' +
					'<p>“I heard that you decided to actually have a baby, now.”</p>' +
					'<p>Jenny waste no time getting to the point, and Miss Logan beams as she answers.</p>' +
					'<p>“Yes. I\'m not sure why but it feels like a good time to start a family.”</p>' +
					'<p>“And live out your long held secret fetish.”</p>' +
					'<p>“That too.”</p>' +
					'<p>The two woman share a laugh. You knew that Miss Logan likes to eat at the Bavaria Hut, but only now you see that the Bratwurst may not be the main reason.</p>' +
					'<p>“Nunja, thanks to ' + perYou.getPersonName() + '...” She motions to you conspiratorially. “...I may be able to help with that.”</p>' +
					'<p>Jenny makes a big show out of slowly pulling up her skirt as more and more of her magic cock becomes visible, and while Miss Logan seems to be bemused at first, she quickly realizes that this is not just a very realistic strap on.</p>' +
					'<p>“But... this is... how...?” She looks from Jenny to you and back, her eyes wide. “You definitely didn\'t have that last summer at the hotel pool.”</p>' +
					'<p>“Nunja...” Jenny scratches the back of her head. “I\'m not sure how ' + perYou.getPersonName() + ' did it, but it\'s working just like a man\'s tool. We tested it... a lot.”</p>' +
					'<p>Miss Logan looks dumbstruck for a moment. You think you notice the pink glow in her eyes flashing up as if the spell reasserts dominance over her mind, but after that, she has a very enthusiastic smile on her lips.</p>' +
					'<p>“Well, I\'d love for you to be the mother of my children, Jenny. And I can\'t wait to...” There is a short pause.” ...deinen harten Schwanz in meiner feuchten Fotze zu spüren? Was that correct?”</p>' +
					'<p>“If you wanted to be -really- vulgar, yes.” Again, the two women share a laugh before Jenny turns to you.</p>' +
					'<p>“Thank you for letting me help the two of you, ' + perYou.getMaster() + '. Do you want to join in, or just watch?” She grins mischievously. “I love being watched, you know, but I love sex with you even more.”</p>'
				);				
				break;				
			}
			startQuestions();
			addLinkToPlace(md, "stay out of it and just watch", Place, 'type=missloganbreederwatch&who=' + sWho);
			addLinkToPlace(md, "join in", Place, 'type=missloganbreederjoin&who=' + sWho);			
			addLinkToPlace(md, "reconsider and send " + perBreeder.getPersonName() + " away", Place, '', 'Maybe you reconsidered the suitability of the breeder or maybe you want to keep Miss Logan for yourself. Either way, you decide it\'s best to send ' + perBreeder.getPersonName() + ' away and promise Miss Logan to ' + (perYou.isMaleSex() ? 'impregnate her yourself' : 'find another mate for her') + '.');
			WritePlaceFooter(md);
			return true;			
		}
		if (sType == "missloganbreederwatch") {
			// Breed her with someone else - do it
			perBreeder = findPerson(sWho);
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson(perBreeder.isFuta() ? "loganbreed2.jpg" : "loganbreed1.jpg");
			addPlaceTitle(md, "Miss Logan's Breeding");
			md.write(
				'<p>Miss Logan\'s initial disappointment doesn\'t last long. And soon, she finds herself on all fours with ' + perBreeder.getPersonName() + '\'s cock deeply inside her,</p>' +
				'<p>She is very enthusiastic, begging and moaning and demanding to be fucked harder and deeper and faster in a way that would probably cause ' + perBreeder.getPersonName() + ' some performance anxiety if not for the spell keeping them perpetually hard even after they reach a climax.</p>' +
				'<p>In fact, you make sure to use it to increase their arousal even further to the point where they seem barely able to think of anything but pounding your teacher\'s pussy and shooting their load into her.</p>' +
				'<p>And well, they get to do that a lot.</p>' +
				'<p>It takes more than one go until Miss Logan is satisfied, and she has put a scary amount of thought into this. ' + perBreeder.getPersonName() + ' gets to take her in several positions that may or may not improve fertility with little to no break in-between orgasms, and even under the spell the whole session leaves them visibly exhausted.</p>' +
				'<p>In the end, Miss Logan does look satisfied, in more than one way, but ' + perBreeder.getPersonName() + ' has to promise her to be back and try again until they have been successful.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "send " + perBreeder.getPersonName() + " home and tend to your teacher", Place);
			WritePlaceFooter(md);
			return true;			
		}	
		if (sType == "missloganbreederjoin") {
			// Breed her with someone else - join in
			perBreeder = findPerson(sWho);
			md = WritePlaceHeader();
			this.showPerson(perYou.isMaleSex() ? "loganbreed3.jpg" : "loganbreed4.jpg");
			addPlaceTitle(md, "Miss Logan's Breeding");
			if (perYou.isMaleSex()) {
				md.write(
					'<p>Miss Logan demands that no drop is wasted, so you and ' + perBreeder.getPersonName() + ' take turns ravaging her pussy in a variety of positions she claims will improve the odds of getting pregnant. It\'s very apparent that your teacher has put a scary amount of thought into this, and with the spell essentially eliminating whatever had kept her from living out that fantasy, she has a lot to catch up on.</p>' +
					'<p>Essentially, Miss Logan doesn\'t care about the actual sex as much as she loves the feeling of someone cumin inside her, and she will make that very clear whenever she feels that one of you is taking too long to do just that.</p>' +
					'<p>Luckily, two cocks are more than enough to keep her happy. ' + perBreeder.getPersonName() + '\'s presence for once allows you to occasionally catch a breather with her, and in the end, the two of you are leaving her more than satisfied, at least for the day.</p>'
				);
			} else {
				md.write(
					'<p>Miss Logan\'s eyes light up when you agree to join her, and before you are able to say anything more, she has already pulled you into a tight embrace.</p>' +
					'<p>“It\'s just as we practiced it, ' + perYou.getPersonName() + '.” She whispers conspiratorial while her hands slip under your top. “When the females are getting hot, they put on a show to entice the male to breed them.”</p>' +
					'<p>Before you know it, Miss Logan has you spun around to face ' + perBreeder.getPersonName() + ', taking off your top in one swift motion and squeezing your breasts.</p>' +
					'<p>“Men love it when we play with each others breasts...” You feel her nipples harden under her touch, her fingertips expertly teasing you. “If done right...” She princes your nipples just enough to cause a brief jolt of pain and make your gasp. “Their cocks will harden and signal a willingness to mate.”</p>' +
					'<p>This is not the first time Miss Logan has turned sex with you into a lesson on how to put on a show for a potential mate, but seeing ' + perBreeder.getPersonName() + ' actually getting hard and taking out their cock is something else entirely, and you can\'t help notice that she has taken control of the situation away from you.</p>' +
					'<p>Miss Logan shushes you when you try to speak and, to your surprise, ignores any further attempt to exert control, her desire to see herself, and possibly you, impregnated stronger than even her compulsion to obey.</p>' +
					'<p>You catch a faint glimpse of ' + perBreeder.getPersonName() + ' undressing as Miss Logan pushes you to the ground and removes what remains of your clothes, her naked body now on top of you.</p>' +
					'<p>“Of course, most importantly, the female needs to be wet.”</p>' +
					'<p>You moan softly as you feel her fingers spread your folds and playfully circle your clit, and your reaction only encourages her.</p>' +
					'<p>“Good, relax just as we\'ve practiced it.” She pushes deeper into you, and you can\'t deny that as weird as this situation is, she very much knows what she is doing. “As the female\'s arousal increases, her body gets ready for the male\'s cock...” You are gasping for air when her fingers retreat and Miss Logan shifts position to spread your legs and lift your hip. “Who should by now be sufficiently enticed to play his part.”</p>' +
					'<p>' + perBreeder.getPersonName() + ', of course, understands the hint. You see him get into position behind Miss Logan, and feel her twitch on top of you the moment he enters her.</p>' +
					'<p>“Hmmmyes! Please breed me... breed us!”</p>' +
					'<p>You feel Miss Logans clit brush against yours with every trust before ' + perBreeder.getPersonName() + ' pulls out and finally pushes into your own tunnel as well. Their thick shaft stretching you for several strokes before They once again switches back to your teacher, luring a loud moan from her lips.</p>' +
					'<p>In the next half hour, ' + perBreeder.getPersonName() + ' alternates between the two of you while you and Miss Logan trade deep and passionate kisses, you feel him cum inside you several times, and you are sure he services your teacher just as often, but she is nigh insatiable and with the spell keeping their arousal at peak, your chosen stud is always ready to go for another round.</p>' +
					'<p>By the time you feel the last load flow into you, all three of you are sweaty and exhausted. ' + perBreeder.getPersonName() + ' looks ready to sleep for several days straight, but you don\'t think you\'ve ever seen Miss Logan as content as she is now.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, "send " + perBreeder.getPersonName() + " home and tend to your teacher", Place);
			WritePlaceFooter(md);
			return true;			
		}			
		
		return false;
	};
	
	per.showPersonTextHere = function(md)
	{
		if (this.other == 1 && ((isShopOpen(2) && this.place == 70 && Place == 70) || (this.place == 196 && Place == 196 && isShopOpen(4)))) {
			md.write('<p>Miss Logan, your anatomy teacher, greets you in the hallway.</p><p>She asks which project you are interested in. The options are Neurology or The Reproductive System.</p>');
		} else if (Place == 440) {
			if (this.isHere()) {
				if (!isVisible()) md.write('<p>Miss Logan is here, she seems to be browsing on her computer.</p>');
				else {
					md.write('<p>Miss Logan greets you, and eagerly suggest she teaches you more about reproduction.</p>');
					if (this.getCharmedLevel() == 2 && !this.checkFlag(1)) {
						if (perYou.isMaleSex()) md.write("<p>You can do the deed yourself, but maybe you want to call someone else to be the father?</p>");
						else md.write("<p>You don't really have the means to impregnate her yourself, but maybe you could <b>call</b> someone to do it instead</p>");
					}
					if (this.checkFlag(6)) md.write('<p>You notice her desktop computer nearby but Miss Logan is too insistent to teach you to use the computer.</p>');
				}
			} else {
				this.setFlag(6);
				md.write('<p style="clear:both">');
				AddImage("Images/People/MissLogan/logon.jpg", "20%", "left", '', '', undefined, md, 'none');
				md.write('You see Miss Logan\'s desktop computer ready to be logged on. ' + (this.checkFlag(5) ? 'You know the password and can logon anytime' : 'You do not know the password') + '.</p>');
			}
		}
	};
	
	// Cast a spell on Jenny
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// At the Restaurant public area and she is present?
			if (Place == 70 && this.isHere()) {
				if (this.other == 1) {
					// Miss Logan in the hallway
					if (isSpellKnown("Shielded Charm")) addComments('Even using Shielded Charm, it is really just too public here. It would be best to find a more private place.');
					else addComments('It is really just too public here. It would be best to find a more private place.');
					return "handled";
				}
			}
			// At the Restaurant public area and she is present?
			if (Place == 196 && this.isHere()) {
				if (!isSpellKnown("Shielded Charm")) addComments('Even using Shielded Charm, it is really just too public here. It would be best to find a more private place.');
				else addComments('It is really just too public here. It would be best to find a more private place.');
				return "handled";
			}
			
			//Anatomy Classroom
			if (Place == 234 && (this.other > 5 && this.other < 999)) {
				// Mrs Logan Path Active & In the room
				if (this.getCharmedLevel() == 2) addComments("Miss Logan is already under your charm spell, and she is focused on breeding and reproduction. You do not think you will be able to shake her of this obsession.");
				else if (this.getCharmedLevel() == 1) addComments("Miss Logan is already under your charm spell, but it is possible you may be able to firther discuss reproduction with her, but for some reason you think you will have to do this somewhere else...");
				else CastCharmSpell("MissLogan", Place, 1, 'type=charmlogan1');
				return "handled";
			}
			
			// The Pool
			if (Place == 269 && this.isHere()) {
				// Miss Logan is HERE
				if (!isSpellKnown("Shielded Charm")) addComments('Don\'t cast the spell here. It is too public.');
				else if (!isCharmedBy("Bambi", "You")) addComments("You may need access to a room here at the hotel, and they are out of your price range. Talk to the staff first, well by talk, maybe more like charm!");
				else CastCharmSpell("MissLogan", Place, 2, '', '', 'type=recharmlogan1');
				return "handled";
			}

		}
		return "";		// do nothing
	};
	
	per.addPersonPhoneCall = function() {
		if (this.hoursCharmed() > 24 && !this.checkFlag(4) && this.whereNow() == 440) {
			// SMS 1 day later when she is at home
			if (makeCall(true, 43)) this.setFlag(4);
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		switch(id) {
			case 42:
				// Miss Logan part
				return receiveSMS('FascinatingAnatomy', 'Both Ms. Jones and me are always ready for private tutoring, of course. You don\'t have to worry about your grades, but that does not mean you shouldn\'t strife to improve yourself!', 'logansms1.jpg');
			case 43: 
				if (this.getCharmedLevel() == 2) return receiveSMS('BreedingBitchLogan', perYou.isMaleSex() ? 'I was just thinking why not cum here...and often' : 'I was thinking we need more practice and also someone to knock us up', 'logansms2.jpg');
				return receiveSMS('Miss Logan', 'I was just thinking of all the things I could teach you', 'logansms2.jpg');
		}
		return '';
	};
}