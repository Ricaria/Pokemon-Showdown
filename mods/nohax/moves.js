exports.BattleMovedex = {
	"armthrust": {
		inherit: true,
		multihit: [3,3]
	},
	"barrage": {
		inherit: true,
		multihit: [3,3]
	},
	"bonerush": {
		inherit: true,
		multihit: [3,3]
	},
	"bulletseed": {
		inherit: true,
		multihit: [3,3]
	},
	"cometpunch": {
		inherit: true,
		multihit: [3,3]
	},
	"doubleslap": {
		inherit: true,
		multihit: [3,3]
	},
	"furyattack": {
		inherit: true,
		multihit: [3,3]
	},
	"furyswipes": {
		inherit: true,
		multihit: [3,3]
	},
	"iciclespear": {
		inherit: true,
		multihit: [3,3]
	},
	"pinmissile": {
		inherit: true,
		multihit: [3,3]
	},
	"rockblast": {
		inherit: true,
		multihit: [3,3]
	},
	"spikecannon": {
		inherit: true,
		multihit: [3,3]
	},
	"tailslap": {
		inherit: true,
		multihit: [3,3]
	},
	acidarmor: {
		inherit: true,
		pp: 40
	},
	aircutter: {
		inherit: true,
		basePower: 55
	},
	assurance: {
		inherit: true,
		basePower: 50,
		basePowerCallback: function(pokemon, target) {
			if (pokemon.volatiles.assurance && pokemon.volatiles.assurance.hurt) {
				this.debug('Boosted for being damaged this turn');
				return 100;
			}
			return 50;
		}
	},
	aurasphere: {
		inherit: true,
		basePower: 90
	},
	barrier: {
		inherit: true,
		pp: 30
	},
	blizzard: {
		inherit: true,
		basePower: 120
	},
	bubble: {
		inherit: true,
		basePower: 20
	},
	camouflage: {
		inherit: true,
		desc: "The user's type changes based on the battle terrain. Ground-type in Wi-Fi battles. (In-game: Ground-type in puddles, rocky ground, and sand, Water-type on water, Rock-type in caves, Ice-type on snow and ice, and Normal-type everywhere else.) Fails if the user's type cannot be changed or if the user is already purely that type.",
		shortDesc: "Changes user's type based on terrain. (Ground)",
		onHit: function(target) {
			this.add('-start', target, 'typechange', 'Ground');
			target.types = ['Ground'];
		}
	},
	charm: {
		inherit: true,
		type: "Normal"
	},
	chatter: {
		inherit: true,
		basePower: 60
	},
	cottonspore: {
		inherit: true,
		onTryHit: function() {}
	},
	defog: {
		inherit: true,
		desc: "Lowers one adjacent target's evasion by 1 stage. Whether or not the target's evasion was affected, the effects of Reflect, Light Screen, Safeguard, Mist, Spikes, Toxic Spikes, and Stealth Rock end for the target's side. Pokemon protected by Magic Coat or the Ability Magic Bounce are unaffected and instead use this move themselves. Ignores a target's Substitute, although a Substitute will still block the evasion lowering.",
		shortDesc: "Removes target's hazards, lowers evasion by 1.",
		onHit: function(pokemon) {
			if (!pokemon.volatiles['substitute']) this.boost({evasion:-1});
			var sideConditions = {reflect:1, lightscreen:1, safeguard:1, mist:1, spikes:1, toxicspikes:1, stealthrock:1};
			for (var i in sideConditions) {
				if (pokemon.side.removeSideCondition(i)) {
					this.add('-sideend', pokemon.side, this.getEffect(i).name, '[from] move: Defog', '[of] '+pokemon);
				}
			}
		}
	},
	dracometeor: {
		inherit: true,
		basePower: 140
	},
	dragonpulse: {
		inherit: true,
		basePower: 90
	},
	energyball: {
		inherit: true,
		basePower: 80
	},
	extrasensory: {
		inherit: true,
		pp: 30
	},
	fireblast: {
		inherit: true,
		basePower: 120
	},
	firepledge: {
		inherit: true,
		basePower: 50,
		basePowerCallback: function(target, source, move) {
			if (move.sourceEffect in {grasspledge:1, waterpledge:1}) {
				this.add('-combine');
				this.debug('triple damage');
				return 150;
			}
			return 50;
		}
	},
	flamethrower: {
		inherit: true,
		basePower: 95
	},
	frostbreath: {
		inherit: true,
		basePower: 40
	},
	furycutter: {
		inherit: true,
		basePower: 20
	},
	futuresight: {
		inherit: true,
		basePower: 100,
		onTryHit: function(target, source) {
			source.side.addSideCondition('futuremove');
			if (source.side.sideConditions['futuremove'].positions[source.position]) {
				return false;
			}
			source.side.sideConditions['futuremove'].positions[source.position] = {
				duration: 3,
				move: 'futuresight',
				targetPosition: target.position,
				source: source,
				moveData: {
					basePower: 100,
					category: "Special",
					affectedByImmunities: true,
					type: 'Psychic'
				}
			};
			this.add('-start', source, 'move: Future Sight');
			return null;
		}
	},
	glare: {
		inherit: true,
		accuracy: 90
	},
	grasspledge: {
		inherit: true,
		basePower: 50,
		basePowerCallback: function(target, source, move) {
			if (move.sourceEffect in {waterpledge:1, firepledge:1}) {
				this.add('-combine');
				this.debug('triple damage');
				return 150;
			}
			return 50;
		}
	},
	gunkshot: {
		inherit: true,
		accuracy: 70
	},
	heatwave: {
		inherit: true,
		basePower: 100
	},
	hex: {
		inherit: true,
		basePower: 50,
		basePowerCallback: function(pokemon, target) {
			if (target.status) return 100;
			return 50;
		}
	},
	hiddenpower: {
		inherit: true,
		basePower: 0,
		basePowerCallback: function(pokemon) {
			return pokemon.hpPower || 70;
		},
		desc: "Deals damage to one adjacent target. This move's type and power depend on the user's individual values (IVs). Power varies between 30 and 70, and type can be any but Normal.",
		shortDesc: "Varies in power and type based on the user's IVs."
	},
	hiddenpowerbug: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerdark: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerdragon: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerelectric: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerfighting: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerfire: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerflying: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerghost: {
		inherit: true,
		basePower: 70
	},
	hiddenpowergrass: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerground: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerice: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerpoison: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerpsychic: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerrock: {
		inherit: true,
		basePower: 70
	},
	hiddenpowersteel: {
		inherit: true,
		basePower: 70
	},
	hiddenpowerwater: {
		inherit: true,
		basePower: 70
	},
	hurricane: {
		inherit: true,
		basePower: 120
	},
	hydropump: {
		inherit: true,
		basePower: 120
	},
	icebeam: {
		inherit: true,
		basePower: 95
	},
	incinerate: {
		inherit: true,
		basePower: 30,
		desc: "Deals damage to all adjacent foes and destroys any Berry they may be holding.",
		shortDesc: "Destroys the foe(s) Berry.",
		onHit: function(pokemon, source) {
			var item = pokemon.getItem();
			if (item.isBerry && pokemon.takeItem(source)) {
				this.add('-enditem', pokemon, item.name, '[from] move: Incinerate');
			}
		}
	},
	knockoff: {
		inherit: true,
		basePower: 20
	},
	leafstorm: {
		inherit: true,
		basePower: 140
	},
	lick: {
		inherit: true,
		basePower: 20
	},
	lowsweep: {
		inherit: true,
		basePower: 60
	},
	meteormash: {
		inherit: true,
		accuracy: 85,
		basePower: 100
	},
	minimize: {
		inherit: true,
		pp: 20
	},
	moonlight: {
		inherit: true,
		type: "Normal"
	},
	muddywater: {
		inherit: true,
		basePower: 95
	},
	naturepower: {
		inherit: true,
		desc: "This move calls another move for use depending on the battle terrain. Earthquake in Wi-Fi battles.",
		shortDesc: "Attack changes based on terrain. (Earthquake)",
		onHit: function(target) {
			this.useMove('earthquake', target);
		}
	},
	overheat: {
		inherit: true,
		basePower: 140
	},
	pinmissile: {
		inherit: true,
		accuracy: 85,
		basePower: 14
	},
	poisongas: {
		inherit: true,
		accuracy: 80
	},
	poisonpowder: {
		inherit: true,
		onTryHit: function() {}
	},
	powergem: {
		inherit: true,
		basePower: 70
	},
	ragepowder: {
		num: 476,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Until the end of the turn, all single-target attacks from the foe's team are redirected to the user if they are in range. Such attacks are redirected to the user before they can be reflected by Magic Coat or the Ability Magic Bounce, or drawn in by the Abilities Lightningrod or Storm Drain. Fails if it is not a double or triple battle. Priority +3.",
		shortDesc: "The foes' moves target the user on the turn used.",
		id: "ragepowder",
		name: "Rage Powder",
		pp: 20,
		priority: 3,
		volatileStatus: 'followme',
		secondary: false,
		target: "self",
		type: "Bug"
	},
	roar: {
		inherit: true,
		accuracy: 100,
		isNotProtectable: false
	},
	rocktomb: {
		inherit: true,
		accuracy: 80,
		basePower: 50,
		pp: 10
	},
	skullbash: {
		inherit: true,
		basePower: 100,
		pp: 15
	},
	sleeppowder: {
		inherit: true,
		onTryHit: function() {}
	},
	smog: {
		inherit: true,
		basePower: 20
	},
	snore: {
		inherit: true,
		basePower: 40
	},
	spore: {
		inherit: true,
		onTryHit: function() {}
	},
	stormthrow: {
		inherit: true,
		basePower: 40
	},
	strugglebug: {
		inherit: true,
		basePower: 30
	},
	stunspore: {
		inherit: true,
		onTryHit: function() {}
	},
	surf: {
		inherit: true,
		basePower: 95
	},
	sweetkiss: {
		inherit: true,
		type: "Normal"
	},
	swordsdance: {
		inherit: true,
		pp: 30
	},
	synchronoise: {
		inherit: true,
		basePower: 70
	},
	thief: {
		inherit: true,
		basePower: 40
	},
	thunder: {
		inherit: true,
		basePower: 120
	},
	thunderbolt: {
		inherit: true,
		basePower: 95
	},
	vinewhip: {
		inherit: true,
		basePower: 35,
		pp: 15
	},
	wakeupslap: {
		inherit: true,
		basePower: 60,
		basePowerCallback: function(pokemon, target) {
			if (target.status === 'slp') return 120;
			return 60;
		}
	},
	waterpledge: {
		inherit: true,
		basePower: 50,
		basePowerCallback: function(target, source, move) {
			if (move.sourceEffect in {firepledge:1, grasspledge:1}) {
				this.add('-combine');
				this.debug('triple damage');
				return 150;
			}
			return 50;
		}
	},
	whirlwind: {
		inherit: true,
		accuracy: 100,
		isNotProtectable: false
	},
	willowisp: {
		inherit: true,
		accuracy: 75
	}

};
