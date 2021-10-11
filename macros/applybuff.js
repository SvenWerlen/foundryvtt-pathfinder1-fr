Id: yAC3DxS0LGLuwzlB
Name: effet
Icon: systems/pf1/icons/spells/air-burst-sky-1.jpg
------------
// Macro utilitaire qui ne doit pas être utilisée individuellement
//
/*- EXEMPLES -*/
// MacrosPF1.applyBuff('Permuter "Défense totale"')
// MacrosPF1.applyBuff('Activer "Défense totale"')
// MacrosPF1.applyBuff('Permuter "Bouclier de la foi"')
//
/*- DOCUMENTATION -*/
// Adaptation francophone de: https://gitlab.com/JusticeNoon/foundry-macros/-/blob/master/PF1E%20Entity-Link/Utilities/Force%20Update%20All.js
//
// Syntaxe: <Action> <Nom effet> [de/sur <cibles>] [etq <Nom alternatif>] [au <niveau>]
//
// Action: 
//   Appliquer:  Crée et active un effet
//   Retirer:    Désactive et supprime un effet
//   Permuter:   Désactive un effet si activé ou l'inverse (change l'état). Crée l'effet s'il n'existe pas
//   Activer:    Active l'effet si présent
//   Désactiver: Désactive l'effet ou le crée
//   Changer:    Ne fait rien sauf modifier le niveau
//
// Nom de l'effet:
//   Cherche en priorité dans la liste de compendium (compendiumPriority), puis dans "pf1-fr.buffsfr" par défaut
//
// Cibles (Séparées par des virgules, "-" pour retirer):
//   sélection: (défaut). Les jetons/acteurs sélectionnés
//   [nom]:     L'acteur correspondant au nom
//   cible(s):  Toutes les cibles
//   template:  Tous les jetons/acteurs sous le dernier template
//   moi:       La personne sur la carte (chat) ou le personnage du joueur
//   actif:     L'acteur actif de la personne
//   #[uuid]:   Utilisé à l'interne pour l'instant
//
// Nom alternatif:
//   Recherche le nom alternatif ou l'original. Les guillemets ne fonctionnent pas. Utiliser _ si le nom contient un mot-clé (de,sur,etq,au)
//
// Niveau
//   Niveau:    Spécifie le niveau si indiqué.
//   @cl-[1,2,3,s]	Accepte les données "rollData". @cl-1, @cl-2, @cl-3, @cl-s sont des raccourcis pour @attributes.spells.spellbooks.X.cl.total

const c = {
	compendiumPriority: ["world.buffs"]
}

/*-			COMMAND					-*/
try {
var isEvent = typeof event.srcElement.closest === "function"
	var inputText =  window.macroChain?.pop() || (isEvent && event.srcElement.closest('button,a')?.textContent.trim()),
		macroId = this.id,
		chatMessage = isEvent ? game.messages.get(event.srcElement.closest('.message')?.getAttribute('data-message-id')) : null,
		argParse = /^([aA]ppliquer|[rR]etirer|[pP]ermuter|[aA]ctiver|[dDésactiver]|[cC]hanger) "?([^\n]*?)"?( (?:de|sur|etq|au|pour)(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$) (?:.*))?$/,
		operator, buffName, modString,
		compCollNames = c.compendiumPriority.concat(['pf1-fr.buffsfr']),
		compSearches = [],
		myself = game.actors.get(chatMessage?.data.speaker?.actor) ?? game.user.character ?? canvas.tokens.controlled[0]?.actor,
		targets,
		modList,
		targetActors = [],
		excludedActors = [],
		altName,
		levelOverride;
	if (inputText.indexOf('::') == 0)
		inputText = /['`"](.*)['`"],.*/.exec(event.srcElement.previousElementSibling?.title.trim())?.[1];
	[operator, buffName, modString] = inputText.match(argParse).filter(o => o).slice(1,4);

	if (modString) {
		modList = modString.split(/ (de|sur|etq|au) /).slice(1);
		for (var k = 0; k < modList.length; k += 2) {
			switch(modList[k]) {
				case 'de':
				case 'sur':
					targets = modList[k+1].replace(/_/g,' ');
					break;
				case 'etq':
					altName = modList[k+1].replace(/_/g,' ');
					break;
				case 'au':
					if (modList[k+1].indexOf('->') > -1)
						modList[k+1] = event.srcElement.nextElementSibling?.textContent.trim();
					levelOverride = modList[k+1];
					if (levelOverride.search(/[^\d]/) > -1) {
						let shorthand = {	'cl-1': myself.data.data.attributes.spells.spellbooks.primary.cl.total,
											'cl-2': myself.data.data.attributes.spells.spellbooks.secondary.cl.total,
											'cl-3': myself.data.data.attributes.spells.spellbooks.tertiary.cl.total,
											'cl-s': myself.data.data.attributes.spells.spellbooks.spelllike.cl.total};
						levelOverride = (new Roll(levelOverride, Object.assign(shorthand, myself.data.data)).roll()).total;
					}
					break;
			}
		}
	}

	if (!targets) targets = 'sélection';
	(targets ? targets.split(',') : ['sélection']).forEach(tar => {
		var accuActors;
		tar = tar.trim();
		if (tar.charAt(0) == '-') {
			accuActors = excludedActors;
			tar = tar.slice(1);
		}
		else
			accuActors = targetActors;
		switch(tar.toLowerCase()) {
			case 'sélection':
				if (canvas.tokens.controlled.length == 0) ui.notifications.warn('Aucun jeton sélectionné');
				accuActors.push(...canvas.tokens.controlled.map(o => o.actor));
				break;
			case 'template':
				let temp = chatMessage?.data.flags.pf1?.metadata?.template ?? canvas.templates.objects.children.filter(o => o.data.user == game.userId)?.pop()?.id;
				if (!temp) ui.notifications.warn('Aucun template trouvé');
				else {
					let tokens = canvas.tokens.objects.children.filter(o => canvas.grid.getHighlightLayer('Template.' + temp).geometry.containsPoint(o.center));
					accuActors.push(...tokens.map(o => o.actor));
				}
				break;
			case 'cible':
			case 'cibles':
				accuActors.push(...[...game.user.targets].map(o => o.actor));
				break;
			case 'moi':
				accuActors.push(myself);
				break;
			case 'actif':
				accuActors.push(game.pf1.ActorPF.getActiveActor());
				break;
			case 'restant':
				tar = '#' + chatMessage?.data.flags.applyBuff?.remaining;
				if (tar == '#undefined')
					break;
			default:
				//Name or uuid search
				if (tar.indexOf('#') != 0)
					accuActors.push(game.actors.find(o => o.name == tar));
				else {
					var [uScene, uToken, uActor] = tar.match(/^#(?:Scene\.([^.]*))?(?:\.Token\.([^.]*))?(?:\.?Actor\.([^.]*))?$/).slice(1);
					if (uActor)
						accuActors.push(game.actors.get(uActor));
					else if (uScene == canvas.id)
						accuActors.push(canvas.tokens.objects.children.find(o => o.id == uToken).actor);
				}
		}
	});

	excludedActors = excludedActors.map(o => o.id);
	targetActors = [...new Set(targetActors)].filter(o => o && !excludedActors.includes(o.id));
	excludedActors = [];
	
	//This is only moved down here so I can assume all the serialized stuff above is done
	compCollNames.forEach((coll, place) => {
		compSearches[place] = new Promise((resolve, reject) => {
			(async () => {
				let pack = game.packs.get(coll);
				if (pack) {
					let search = await pack.getIndex().then(p => p.find(o => o.name == buffName));
					if (search)
						pack.getDocument(search._id).then(bItem => resolve(bItem));
					else
						 resolve(false);
				}
				else
					resolve(false);
			})();			
		});
	});
	Promise.all(compSearches).then(comps => buffFound(comps.find(c => c)));
}
catch (err) {
	console.log(err, "Votre commande n'a pas fonctionné");
}
function buffFound(buff) {
	if (!buff) { return ui.notifications.warn("Effet introuvable!") }
	if (typeof levelOverride != 'undefined') buff.data.data.level = levelOverride;
	if (typeof altName != 'undefined') buff.data.name = altName;
	targetActors.forEach(act => {
		if (act && act.testUserPermission(game.user, 'OWNER')) {
			let presentBuff = act.items.find(o => {return o.data.type == 'buff' && (o.name == buffName || o.name == altName);});
			let updateArgs = [];
			switch(operator.toLowerCase()) {
				case 'appliquer':
					if (!buff.data.data.active)
						buff.data.data.active = true;
					
					if (presentBuff)
						presentBuff.update({'data.active': true, 'data.level': buff.data.data.level, 'name': buff.data.name});
					else
						act.createEmbeddedDocuments('Item', [buff.toObject()]);
					break;
				case 'retirer':
					if (presentBuff)
						presentBuff.delete();				
					break;
				case 'permuter':
					if (presentBuff)
						presentBuff.update({'data.active': !getProperty(presentBuff.data, 'data.active'), 'data.level': buff.data.data.level, 'name': buff.data.name});
					else {
						if (!buff.data.data.active)
							buff.data.data.active = true;
						
						act.createEmbeddedDocuments('Item', [buff.toObject()]);
					}
					break;
				case 'activer':
					if (presentBuff)
						presentBuff.update({'data.active': true, 'data.level': buff.data.data.level, 'name': buff.data.name});
					break;
				case 'désactiver':
					if (presentBuff)
						presentBuff.update({'data.active': false, 'data.level': buff.data.data.level, 'name': buff.data.name});
					else
						act.createEmbeddedDocuments('Item', [buff.toObject()]);
					break;
				case 'changer':
					if (presentBuff && typeof levelOverride != 'undefined')
						presentBuff.update({'data.level': buff.data.data.level, 'name': buff.data.name});
				default:
					ui.notifications.warn("Commande inconnue. Se référer à la documentation!");
			}
		}
		else if (act)
			excludedActors.push(act);
	});
	var successStr = 'Aucun jeton/acteur affecté.',
		affectedActors = targetActors.length - excludedActors.length;
	if (affectedActors != 0)
		successStr = `${buff.data.name} changé sur ${affectedActors} jeton/acteur${(affectedActors > 1 ? 's' : '')}.`;
	if (excludedActors.length > 0) {
		successStr += ' Requiert l\'assistance du MJ pour le reste.';
		var remainingModList = modList.filter((o,p) => o != 'to' && modList[p-1] != 'to'),
			excludedNames = excludedActors.map(o => (o.token ? o.token.name : o.name)).join(', '),
			gmButtonTitle = `${operator} ${buffName} sur restant ${remainingModList.join(' ')}`.trim(),
			enrichedButton = `<a class="entity-link" data-entity="Macro" data-id="${macroId}"><i class="fas fa-terminal"></i> ${gmButtonTitle}</a>`,
			flavorText = `J'essaie de<br>${enrichedButton}<br>Le reste: ${excludedNames}`,
			remainingUUID = excludedActors.map(o => (o.token ? o.token.uuid : o.uuid)).join(','),
			spoofedRoll = new Roll(excludedActors.length.toString()).roll();
		spoofedRoll.formula = 'Affectera:';
			ChatMessage.create({
			blind: true,
			sound: null,
			flavor: flavorText,
			speaker: ChatMessage.getSpeaker(),
			content: 'Je vais être supprimé',
			type: CONST.CHAT_MESSAGE_TYPES.ROLL,
			roll: spoofedRoll,
			whisper: ChatMessage.getWhisperRecipients("GM"),
			flags: {applyBuff: {remaining: remainingUUID}}
		});
	}
	ui.notifications.info(successStr.trim());
}

