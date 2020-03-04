require('dotenv').config(); // Configs

const Discord = require("discord.js");
const jimp = require("jimp");
const fs = require("fs")
const client = new Discord.Client();

client.login(process.env.TOKEN)

function getUser(id) {
	let usr = null;
	client.guilds.forEach(function (val,id2,arr) {
		val.members.forEach(function (val2,id3,arr2) {
			if (val2.user.id == id) {
				usr = val2;
			}
		})
	})
	return usr;
}

function getServers(user) {
	var usr = "";
	client.guilds.forEach(function (val,id2,arr) {
		val.members.forEach(function (val2,id3,arr2) {
			if (val2.user.id == user.id) {
				if (usr != "") {
					usr = usr+", "+val.name;
				} else {
					usr = val.name;
				}
			}
		})
	})
	return usr;
}

function getRandomUser() {
	let usr = null;
	while (usr == null) {
		client.guilds.forEach(function (val,id2,arr) {
			val.members.forEach(function (val2,id3,arr2) {
				if (Math.floor(Math.random() * 10) == Math.floor(Math.random() * 10) && !val2.user.bot) {
					usr = val2;
				}
			})
		})
	}
	return usr;
}

// Gru

client.on("messageReactionAdd",(reaction,user) => {
	if(!user.bot) {
		
		if(reaction.message.content.toLowerCase().indexOf("%rps") == 0 && user.id == reaction.message.author.id) {
			var canDo = 0
			
			reaction.message.reactions.array().forEach(function (v,id,arr) {
				v.users.forEach(function (v2,id,arr) {
					if (v2.id == '627501985175830529') {
						v.remove()
						canDo += 1
					}
				})
			})
			
			if(canDo == 3) {
			
				var escolha = Math.floor(Math.random() * 2)
				if(reaction.emoji.name ==  "✂") {
					if(escolha == 0) {
						reaction.message.reply("perdeste, escolhi pedro")
					}
					
					if(escolha == 1) {
						reaction.message.reply("ganhaste :pensive:, escolhi papel")
					}
					
					if(escolha == 2) {
						reaction.message.reply("empatar, escolhi tesoro")
					}
				}
				
				if(reaction.emoji.name ==  "🌕") {
					if(escolha == 0) {
						reaction.message.channel.send("empatar, escolhi pedro")
					}
					
					if(escolha == 1) {
						reaction.message.channel.send("perdeste, escolhi papel")
					}
					
					if(escolha == 2) {
						reaction.message.channel.send("ganhaste :sob:, escolhi tesoro")
					}
				}
				
				if(reaction.emoji.name ==  "📰") {
					if(escolha == 0) {
						reaction.message.channel.send("ganhaste :angry:, escolhi pedro")
					}
					
					if(escolha == 1) {
						reaction.message.channel.send("emapte, escolhi papel")
					}
					
					if(escolha == 2) {
						reaction.message.channel.send("perdeste, escolhi tesoro")
					}
				}
				
			}
		}
	}
})

client.on("ready",() => {
	console.log("Gru online");
	if(Math.floor(Math.random() * 2) == 0) {
		client.user.setActivity("nad de sons irritants | %ajuda",{ // Atividade
			"type":"STREAMING",
			"url":"https://twitch.tv/monstercat"
		});
	} else {
		client.user.setActivity("nad de sons irritants | %ajuda",{ // Atividade
			"type":"STREAMING",
			"url":"https://twitch.tv/monstercat"
		});
	}
});

var punir = null;
var lastimg = [];
client.on("message",(message) => {
	var line = "";
	
	{
		var debounce = false
		er.slice(process.env.SIZE).split("").forEach(function (v,id,arr) {
			if(!debounce) {
				if (v == ":") {
					debounce = true;
				} else {
					line = line + v
				}
			}
		})
	}
	
	if (punir != null) {
		punir.send("<:kkkoprimi:624742096909369370>")
	}
	
	// Adicionando imagens na lista de imagens
	if(message.embeds[0] != null) {
		var debounce = false
		message.embeds.forEach(function (v,id,arr) {
			if(!debounce) {
				if(v.image != null) {
					debounce = true
					lastimg.push([message.channel.id,v.image.url])
				} else if (v.url != null) {
					debounce = true
					lastimg.push([message.channel.id,v.url])
				}
			}
		})
	}
	if(message.attachments.first() != null) {
		lastimg.push([message.channel.id,message.attachments.first().url])
	}
	
	
	// Setando lastchannelimg para a última imagem a ser colocada no canal
	let lastchannelimg = null;	
	lastimg.forEach(function (v,id,arr) {
		if (v[0] == message.channel.id) {
			lastchannelimg = v
		}
	});
	
	if(!message.author.bot) {
		if(Math.floor(Math.random() * 500000) == 0) {
			message.react("🍈");
		}
		
		if(message.content.toLowerCase().indexOf("%ajuda") == 0) { // Ajuda
			
			var semb = new Discord.RichEmbed()
				.setDescription("aq ta os comando q da pra faze")
				.addField("**informasao**",`**ajuda**: mostra essa mensage\n**ping**: mostra o ping dos bagui\n**info**:information`)
				.addField("**imagem**",`**avatar**: mostra o seu avatar\n**grayscale**/**gscale**: muda a escala de cinza da imagem\n**gscale2**: muda a escala de cinza da imagem porem nao da contraste\n**normalize**: normaliza a imagem\n**togif**: transforma uma imagem em um frame de um gif`)
				.addField("**montagem**",`**quadro**: enquadre uma imagem\n**nao**: seila e aquele carinha do monopoly`)
				.addField("**texto**",`**cla**/**tropa**: tenta transforma um texto num texto q seria do cla(wip)\n**revers**: invert um texto`)
				.addField("**usuarios**",`**randavatar**: manda a imagem de uma foto de um usuar\n**userinfo**: mostra informeition de um usuario`)
				.addField("**diversao**",`**rps**:pedra papel tesora nub`)
				.setFooter("tem poco mas fodase e o coiso e %")
			
			if (message.content.slice("%ajuda ".length) != "") {
				var sended = false
				
				if (message.content.slice("%ajuda ".length) == "ajuda" || message.content.slice("%ajuda ".length) == "%ajuda") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand ajuda:")
						.addField("uso:",`use para consegui information sobr os otro comando\nvc pod usar %ajuda (nome do comando) pra consegui ainda mais information sobre os comando`)
						.addField("interasoes",`com ou sem argumentos, os args precisam ser nomes de comandos`)
						.addField("entrada:",`mostra essa mensage\nentrada numero 00 do campo informasao`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "ping" || message.content.slice("%ajuda ".length) == "%ping") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand ping:")
						.addField("uso:",`use para consegui information sobr a latencia dos bagui(da api e do bot)`)
						.addField("interasoes",`sem argumentos`)
						.addField("entrada:",`mostra o ping dos bagui\nentrada numero 01 do campo informasao`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "avatar" || message.content.slice("%ajuda ".length) == "%avatar") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand avatar:")
						.addField("uso:",`use para consegui o avatar de alguem\nvc pod usar o id tb mas so vai funsiona se eu tive no memo serv`)
						.addField("interasoes",`com ou sem mensoes ou id`)
						.addField("entrada:",`mostra o seu avatar\nentrada numero 00 do campo imagem`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "grayscale" || message.content.slice("%ajuda ".length) == "%grayscale" || message.content.slice("%ajuda ".length) == "gscale" || message.content.slice("%ajuda ".length) == "%gscale" && message.content.slice("%ajuda ".length) != "%gscale2") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand gscale:")
						.addField("uso:",`use para deixar uma imagem cinza\na prinsipal diferensa q tem esse o gscale2 é q esse deixa com  mais contraste (o seja 100% preto e branco)`)
						.addField("interasoes",`com mensoes id ou ultima image enviada`)
						.addField("entrada:",`muda a escala de cinza da imagem\nentrada numero 01 do campo imagem`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "gscale2" || message.content.slice("%ajuda ".length) == "%gscale2") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand gscale2:")
						.addField("uso:",`deixa a imagem sem cor (sem o spectro colorid, ent e so preto branco e tons de cinza)\na prinsipal diferensa q tem esse e o gscale é q esse deixa sem (o seja vai ter tons de cinza)`)
						.addField("interasoes",`com ou sem mensoes ou id ou ultima image`)
						.addField("entrada:",`muda a escala de cinza da imagem porem nao da contraste\nentrada numero 02 do campo imagem`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "normalize" || message.content.slice("%ajuda ".length) == "%normalize") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand normalize:")
						.addField("uso:",`deixa a imagem mais normalizada(com alterasoes minimas)\nda pra entender melhor qq ela fas em imagens co baixa qualidad`)
						.addField("interasoes",`com ou sem mensoes ou id ou ultima image`)
						.addField("entrada:",`normaliza a imagem\nentrada numero 03 do campo imagem`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "quadro" || message.content.slice("%ajuda ".length) == "%quadro") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand quadro:")
						.addField("uso:",`coloca um quadro em volta da image\no quadro pod buga um poco dependendo do tamanho da image`)
						.addField("interasoes",`com ou sem mensoes ou id ou image`)
						.addField("entrada:",`enquadre uma imagem\nentrada numero 00 do campo montagem`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "nao" || message.content.slice("%ajuda ".length) == "%nao") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand nao:")
						.addField("uso:",`adisiona aquele carinha do monopolio em cima da image\ntem alguns bugs de tela branca isso pod se causado pq a image e pequena`)
						.addField("interasoes",`com ou sem mensoes ou id ou image`)
						.addField("entrada:",`seila e aquele carinha do monopoly\nentrada numero 01 do campo montagem`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "cla" || message.content.slice("%ajuda ".length) == "%cla" || message.content.slice("%ajuda ".length) == "tropa" || message.content.slice("%ajuda ".length) == "%tropa") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand tropa:")
						.addField("uso:",`transforma um text em um text q o cla faria\no comando ainda e experimental e ta em fase de construction(por isso ta o wip ali)`)
						.addField("interasoes",`requer um texto`)
						.addField("entrada:",`tenta transforma um texto num texto q seria do cla\nentrada numero 00 do campo texto`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "randavatar" || message.content.slice("%ajuda ".length) == "%randavatar") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand randavatar:")
						.addField("uso:",`manda um avatar de um usuario aleatorio (e mostra o nome e a tag dele tb)\npor enquanto nao tem como bloquea de vc aparese mas vai te embreve`)
						.addField("interasoes",`n precisa de nada`)
						.addField("entrada:",`manda a imagem de uma foto de um usuar\nentrada numero 00 do campo usuarios`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "userinfo" || message.content.slice("%ajuda ".length) == "%userinfo") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand userinfo:")
						.addField("uso:",`pega a information de um usuario por meis de id ou mensao\npor enquanto nao tem como bloquea de vc aparese mas vai te embreve²`)
						.addField("interasoes",`nada id ou mensao`)
						.addField("entrada:",`mostra informeition de um usuario\nentrada numero 01 do campo usuarios`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "revers" || message.content.slice("%ajuda ".length) == "%revers") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand revers:")
						.addField("uso:",`inverte a posisao dos caracteres de um texto\nseila ele so fas isso memo`)
						.addField("interasoes",`texto`)
						.addField("entrada:",`invert um texto\nentrada numero 01 do campo texto`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "rps" || message.content.slice("%ajuda ".length) == "%rps") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand rps:")
						.addField("uso:",`reage com os emoji q aparese la pra joga\nsao as regras basicas do pedra papel tesora\nn reage antes de reagir tudo se n n vai funsiona`)
						.addField("interasoes",`nada so reagir`)
						.addField("entrada:",`pedra papel tesora nub\nentrada numero 00 do campo diversao`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "info" || message.content.slice("%ajuda ".length) == "%info") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand info:")
						.addField("uso:",`use pra ganha information sobre algumas coisa\nnao e tao util mas e daora`)
						.addField("interasoes",`nenhuma`)
						.addField("entrada:",`information\nentrada numero 02 do campo informasao`)
					message.channel.send(emb);
					sended = true
				}
				
				if (message.content.slice("%ajuda ".length) == "togif" || message.content.slice("%ajuda ".length) == "%togif") {
					var emb = new Discord.RichEmbed()
						.setDescription("information sobre o comand togif:")
						.addField("uso:",`use pra transforma uma imagem em um gif\nos gif so tem 1 frame`)
						.addField("interasoes",`precisa de uma image`)
						.addField("entrada:",`transforma uma imagem em um frame de um gif\nentrada numero 04 do campo informasao`)
					message.channel.send(emb);
					sended = true
				}
				
				if (!sended) {
					message.channel.send(semb)
				}
				
			} else {
				message.channel.send(semb);
			}
		}
		
		if(message.content.toLowerCase().indexOf("%randavatar") == 0) { // avatar aleatorio
			var ppl = getRandomUser().user;
			
			var emb = new Discord.RichEmbed()
				.setDescription("foto de "+ppl.tag)
				.setImage(ppl.displayAvatarURL);
			message.channel.send(emb)
		}
		
		if(message.content.toLowerCase().indexOf("%userinfo") == 0) { // userinfo
			async function main() {
				Promise.resolve(client.fetchUser(message.content.slice("%userinfo".length + 1))).then(usr => {
					var ppl = message.author
					
					ppl = usr
					
					var bota = ppl.bot
					if (bota) {
						bota = "ss"
					} else {
						bota = "n"
					}
					
					var presensa = ppl.presence.game
					
					var emb = new Discord.RichEmbed()
						.setImage(ppl.displayAvatarURL)
						.setDescription("information conseguida da rusia de "+ppl.tag)
						.addField("information","id: "+ppl.id+"\nentro em: "+ppl.createdAt.day+"/"+ppl.createdAt.month+"/"+ppl.createdAt.year+"\nbot: "+bota);
					
					if (getServers(ppl) != null) {
						emb.addField("servs em comum",getServers(ppl))
					}
					
					if (presensa != null) {
						emb.setFooter('"'+presensa.name+'" -'+ppl.username)
					}
					message.channel.send(emb)
				}).catch(err => {
					ppl = message.author
					
					if(message.mentions.users.first() != null) {
						ppl = message.mentions.users.first()
					}
					
					var bota = ppl.bot
					if (bota) {
						bota = "ss"
					} else {
						bota = "n"
					}
					
					
					var presensa = null
					if(ppl.presence.game != null) {
						presensa = ppl.presence.game.name
					}						
					if(presensa == "Custom Status") {
						presensa = ppl.presence.game.state
					}
					
					var emb = new Discord.RichEmbed()
						.setImage(ppl.displayAvatarURL)
						.setDescription("information conseguida da rusia de "+ppl.tag)
						.addField("information","id: "+ppl.id+"\nentro em: "+ppl.createdAt.getDate()+"/"+(ppl.createdAt.getMonth() + 1)+"/"+ppl.createdAt.getFullYear()+"\nbot: "+bota);
					
					if (getServers(ppl) != null) {
						emb.addField("servs em comum",getServers(ppl))
					}
					
					if (presensa != null) {
						emb.setFooter('"'+presensa+'" -'+ppl.username)
					}
					message.channel.send(emb)
				})
			}
			
			main()
		}
		
		if(message.content.toLowerCase().indexOf("%grayscale") == 0 || message.content.toLowerCase().indexOf("%gscale") == 0 && !(message.content.toLowerCase().indexOf("%gscale2") == 0)) { // gscale
			var ppl = message.author.displayAvatarURL
			if (message.mentions.users.first() != null) {
				ppl = message.mentions.users.first().displayAvatarURL
			} else if (!(lastchannelimg == null)) {
				ppl = lastchannelimg[1]
			} else if (message.content.toLowerCase().indexOf("%grayscale") == 0) {
				if (getUser(message.content.slice("%grayscale".length + 1)) != null) {
					ppl = getUser(message.content.slice("%grayscale".length + 1)).user.displayAvatarURL
				}
			} else if (message.content.toLowerCase().indexOf("%gscale") == 0) {
				if (getUser(message.content.slice("%gscale".length + 1)) != null) {
					ppl = getUser(message.content.slice("%gscale".length + 1)).user.displayAvatarURL
				}
			}
			async function main() {
				
				message.channel.send("carregano imagem")
				jimp.read(ppl).then(async function(img) {
					var buff = img.grayscale().contrast(1)
					await buff.write("aaa.png")
					buff = [await jimp.read('./aaa.png')]
					Promise.all([buff]).then(function(data) {
						return Promise.all([buff]);
					})
					message.channel.send("",{files: ['./aaa.png']})
				}).catch(err => {
					console.log(err)
					message.channel.send("deu erro nub: "+err)
				})
			}
			
			main()
			
		}
		
		if(message.content.toLowerCase().indexOf("%nao") == 0) { // nao monopoly
			var ppl = message.author.displayAvatarURL
			if (message.mentions.users.first() != null) {
				ppl = message.mentions.users.first().displayAvatarURL
			} else if (lastchannelimg != null) {
				ppl = lastchannelimg[1]
			} else if (getUser(message.content.slice("%nao".length + 1)) != null) {
				ppl = getUser(message.content.slice("%nao".length + 1)).user.displayAvatarURL
			}
			async function main() {
				message.channel.send("carregano imagem")

				jimp.read(ppl).then(async function(img) {
					jimp.read('./nao.png').then(async function(nao) {
						jimp.read('./blank.png').then(async function(blk) {
							var nwblank = blk.resize(img.bitmap.width,img.bitmap.height + 250)
							var nwquadro = nao.resize(nwblank.bitmap.width,nwblank.bitmap.height)
							var buff = await blk.composite(img,0,250).composite(nwquadro,0,0).write("aaa.png")
							buff = [await jimp.read('./aaa.png')]
							Promise.all([buff]).then(function(data) {
								return Promise.all([buff]);
							})
							message.channel.send("",{files: ['./aaa.png']})
						})
					})
				}).catch(err => {
					console.log(err)
					message.channel.send("deu erro nub: "+err)
				})
			}
			
			main()
		}
		
		if(message.content.toLowerCase().indexOf("%quadro") == 0) { // enquadre imagens
			var ppl = message.author.displayAvatarURL
			if (message.mentions.users.first() != null) {
				ppl = message.mentions.users.first().displayAvatarURL
			} else if (lastchannelimg != null) {
				ppl = lastchannelimg[1]
			} else if (getUser(message.content.slice("%quadro".length + 1)) != null) {
				ppl = getUser(message.content.slice("%quadro".length + 1)).user.displayAvatarURL
			}
			async function main() {
				message.channel.send("carregano imagem")

				let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK) 
				jimp.read(ppl).then(async function(img) {
					jimp.read('./quadro.png').then(async function(quadro) {
						var nwquadro = quadro.resize(img.bitmap.width,img.bitmap.height)
						var buff = img.composite(nwquadro,0,0)
						await buff.write("aaa.png")
						buff = [await jimp.read('./aaa.png')]
						Promise.all([buff]).then(function(data) {
							return Promise.all([buff]);
						})
						message.channel.send("",{files: ['./aaa.png']})
					})
				}).catch(err => {
					console.log(err)
					message.channel.send("deu erro nub: "+err)
				})
			}
			
			main()
		}
		
		if(message.content.toLowerCase().indexOf("%revers") == 0) { // inverta textos
			if(message.content.slice("%revers ".length) == null) {
				message.channel.send("tem q ter texto nub")
			} else {
				var output = ""
				message.content.slice("%revers ".length).split("").forEach(function (v,id,arr) {
					output = v + output
				})
				var emb = new Discord.RichEmbed()
					.addField("a sua mensage vai fica assi:",output)
				message.channel.send(emb)
			}
		}
		
		if(message.content.toLowerCase().indexOf("%normalize") == 0) { // normalize elas
			var ppl = message.author.displayAvatarURL
			if (message.mentions.users.first() != null) {
				ppl = message.mentions.users.first().displayAvatarURL
			} else if (lastchannelimg != null) {
				ppl = lastchannelimg[1]
			} else if (getUser(message.content.slice("%normalize".length + 1)) != null) {
				ppl = getUser(message.content.slice("%normalize".length + 1)).user.displayAvatarURL
			}
			
			async function main() {
				message.channel.send("carregano imagem")

				let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK) 
				jimp.read(ppl).then(async function(img) {
					var buff = img.normalize()
					await buff.write("aaa.png")
					buff = [await jimp.read('./aaa.png')]
					Promise.all([buff]).then(function(data) {
						return Promise.all([buff]);
					})
					message.channel.send("",{files: ['./aaa.png']})
				}).catch(err => {
					console.log(err)
					message.channel.send("deu erro nub: "+err)
				})
			}
			
			main()
			
		}
		
		if(message.content.toLowerCase().indexOf("%gscale2") == 0) { // gscale sem contraste
			var ppl = message.author.displayAvatarURL
			if (message.mentions.users.first() != null) {
				ppl = message.mentions.users.first().displayAvatarURL
			} else if (lastchannelimg != null) {
				ppl = lastchannelimg[1]
			} else if (getUser(message.content.slice("%gscale2".length + 1)) != null) {
				ppl = getUser(message.content.slice("%gscale2".length + 1)).user.displayAvatarURL
			}
			async function main() {
				message.channel.send("carregano imagem")

				let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK) 
				jimp.read(ppl).then(async function(img) {
					var buff = img.grayscale()
					await buff.write("aaa.png")
					buff = [await jimp.read('./aaa.png')]
					Promise.all([buff]).then(function(data) {
						return Promise.all([buff]);
					})
					message.channel.send("",{files: ['./aaa.png']})
				}).catch(err => {
					console.log(err)
					message.channel.send("deu erro nub: "+err)
				})
			}
			
			main()
		}
		
		if(message.content.toLowerCase().indexOf("%togif") == 0) { // transofrm imags in gifs bugados maisomeno
			var ppl = message.author.displayAvatarURL
			if (message.mentions.users.first() != null) {
				ppl = message.mentions.users.first().displayAvatarURL
			} else if (!(lastchannelimg == null)) {
				ppl = lastchannelimg[1]
			} else if (message.content.toLowerCase().indexOf("%togif") == 0) {
				if (getUser(message.content.slice("%togif".length + 1)) != null) {
					ppl = getUser(message.content.slice("%togif".length + 1)).user.displayAvatarURL
				}
			}
			async function main() {
				jimp.read(ppl).then(async function(img) {
					await img.write("aaa.png")
					buff = [await jimp.read('./aaa.png')]
					Promise.all([buff]).then(function(data) {
						return Promise.all([buff]);
					})
					
					await fs.rename("./aaa.png","./aaa.gif",function(err) {
						if (err) console.log(err)
					})
					
					message.channel.send("",{files: ['./aaa.gif']})
				}).catch(err => {
					console.log(err)
				})
			}
			
			main()
		}
		
		if(message.content.toLowerCase().indexOf("%avatar") == 0) { // avatar da pessoa
			var ppl = message.author
			
			if(message.mentions.users.first() != null) {
				ppl = message.mentions.users.first()
			} else if (getUser(message.content.slice("%avatar".length + 1)) != null) {
				ppl = getUser(message.content.slice("%avatar".length + 1)).user
			}
			
			
			var emb = new Discord.RichEmbed().setImage(ppl.displayAvatarURL)
			message.channel.send(emb)
		}
		
		if(message.content.toLowerCase().indexOf("%ping") == 0) { // ping
			message.channel.send("perai").then(m => {
				let ping = m.createdTimestamp - message.createdTimestamp
				m.edit('latencia do bot: ' + ping +'ms, latencia da API: ' + Math.round(client.ping) +"ms")
			});
		}
		
		if(message.content.toLowerCase().indexOf("%info") == 0) { // informaiton
			var emb = new Discord.RichEmbed()
				.setDescription("informaasion")
				.setFooter("daora ne")
				.addField("codigo","linhas: "+line+"\napis usadas: discord.js, jimp")
				if(client.user.lastMessage != null) {
					emb.addField("ultima mensage:",client.user.lastMessage.content+"\nno canal: "+client.user.lastMessage.channel.name+"\nno servidor: "+client.user.lastMessage.guild.name)
				}
			message.channel.send(emb)
		}
			
		if(message.content.toLowerCase().indexOf("%rps") == 0) { // pedra papel tesoro
			function coiso() {
				message.react("🌕").then(a => {
					message.react("📰").then(b => {
						message.react("✂").then(v => {
						})
					})
				}).catch(err => {
					message.channel.send("algo deu erado quando foi faze o comando (provavelment to ser permisso de reagir)")
					console.log(err)
				})
			}
			
			coiso()
		}
		
		if(message.content.toLowerCase().indexOf("%cla") == 0 || message.content.toLowerCase().indexOf("%tropa") == 0) { // fale q nem o cla
			var palavrs = [
				["não","nao","n","naum","ñ","nn"],
				
				["sim","s","ss"],
				
				["ódio","que ódio","com ódio","odio","que odio","com odio","raiva","que raiva","com raiva"],
				
				["belesa","bls","bl","beleza","blz","bele"],
				
				["oi","oiee","oieee","oieeee","ola","olá","hai","hoi","iai","eae","oin"],
				
				["moça","mulher","mulhe","menina","loli","feminina","feminino"],
				
				["gostosa","gostos","gosto","gostoso","comida","comid"],
				
				["boa","bom","claro"],
				
				["você","vc","voce","voc","tu","voçê","voçe"],
				
				["dou","do","dor","dô"],
				
				["abortado","aborto","abortada"],
				
				["cala a boca","calboca","calaaboca","calaboca","cale-se","cala-te"],
				
				["escória","escoria","escori","escorio","escório"],
				
				["burro","burra"],
				
				["br"],
				
				["amor","amorzinho","amorzinha","amorzão","amorzao","mozao","mozão","mosao","mosão","linda","lindah","lindo","lindoh","linduh","lindu"],
				
				["moças","mulheres","mulhers","meninas","lolis","traps"],
				
				["ah","ahh","aah","ha"],
				
				["monumental","grande","gigante"],
				
				["foda","incrivel","maravilhoso"],
				
				["coxas"],
				
				["essa","esse"],
				
				["toy"],
				
				["percebi"],
				
				["é","es","és"],
				
				["mundo"],
				
				["dinheiro","dinhero","dimdim","dindim","dim-dim","money"],
				
				["bosta","merda","coco","cocô"],
				
				["chorei"],
				
				["fiz"],
				
				["adicionei"],
				
				["vocês","vcs","voces","vocs","vós","vos"],
				
				["comunismo","communismo","comunism"],
				
				["da","dar","darei"],
				
				["choque"],
				
				["também","tambem","tabem"],
				
				["está","esta"],
				
				["espião","espiar","espiao","espiona","espionou","espionei"],
				
				["louco","louca","loko"],
				
				["gulino","gulino1","gulinoum","golino"],
				
				["cachorro"],
				
				["bater","bati"],
				
				["aceite"],
				
				["adicionar","add","adisionar"],
				
				["logic","logi","logix"],
				
				["bi","bisexual","bissexual","trans","transexual","transsexual"]
			]
			
			var emojs = [
				"<:naoporra:633334612206288906>",
				"<:kkmtorui:633334604282986496>",
				"<:vatomanocu:633334602001416254>",
				"<:roger:633334604765462575>",
				"<:putogenuino:633334606015365134>",
				"<:kkmtobom:633334601552625690>"
			]
			
			var cla = [
			
				[emojs[0],emojs[1]+" n",emojs[2]+" n","nao " + emojs[0],"nao " + emojs[1],"nao " + emojs[2]],
				
				["s","sisi","si"],
				
				[emojs[3],emojs[4]],
				
				[emojs[5],"belesa " + emojs[5]],
				
				["eae"], // eae
				
				["muie"],
				
				["gostosakkk","gostosakkk","gostosakkkk " + emojs[5]],
				
				["bo","bo " + emojs[5]],
				
				["vc","vose"],
				
				["do", "n do"],
				
				["bastardo malnascido"],
				
				[`Cala a boca palhaco\nNinguem liga`,"calboc"],
				
				["escória da Internet e a toxicidade fatal"],
				
				["burrao","burroid","currao"],
				
				["corno","br"],
				
				["gay"],
				
				["muiers"],
				
				["a"],
				
				["fodasticamente","fuckeamente"],
				
				["fuck","foda"],
				
				["coxa"],
				
				["ess"],
				
				["motel","toy"],
				
				["persebi"],
				
				["e"],
				
				["mumdo","mundow"],
				
				["diero","monei"],
				
				["bost","bostor","merd","coco","shit","o shit","o shot","o chit"],
				
				["shorey","shorei :sob:"],
				
				["fis"],
				
				["adisionei"],
				
				["vcs","voses","voseis"],
				
				["salvasao","salvaçao","salvação","comunism","comunismow","comunismkk"],
				
				["da","(vc)da"],
				
				["shokk","shok"],
				
				["tb","tambe"],
				
				["ta","sta"],
				
				["spy :spy:",":spy:"],
				
				["viado","lok"],
				
				["gaylino"],
				
				["cachorr"],
				
				["bat"],
				
				["aseit","aceit"],
				
				["adisiona","adiciona"],
				
				["Logic","Logic 😎"],
				
				["hetero","heter"]

			]
			
			var coisasproibidas = [
				":cry:",
				":3",
				">:3",
				"3:",
				"3:<",
				"owo",
				"uwu",
				"B3",
				"3B",
				"ewe",
				"nwn",
				";-;",
				";n;",
				";u;",
				";.;",
				";';",
				"=c",
				"=‘c",
				"=´c",
				":c",
				"><",
				"> <",
				">.<",
				">-<",
				">=<",
				">,<",
				"(>-)>",
				"t-t",
				"e-e",
				"n-n",
				"u-u",
				"o-o",
				","
			]
			
			var input = ""
			if (message.content.toLowerCase().indexOf("%cla") == 0) {
				var input = message.content.slice(5)
			} else {
				var input = message.content.slice(7)
			}
			input.replace(/[\u{2500}-\u{10FFFF}]/giu, ' ')
			
			coisasproibidas.forEach(function (x,y,z) {
				input.split("").forEach(function (y,z,zz) {
					input = input.replace(new RegExp(x,"gi"), ' ')
				})
			})
			
			input = input.replace(/:.*:/gu, ' ')
			
			input = input.replace(/\s+/gi, ' ');
			
			input = input.split(" ")
			
			var output = "";
			
			var q = false;
			
			function createOutput(inp,id,arr) {
				var out = null;
				palavrs.forEach(function (palarr,id2,arr) {
					palarr.forEach(function (pal,id3,arr) {
						if (q || out == null) {
							var qsamm = ["que "+inp.toLowerCase(),"q "+inp.toLowerCase(),"qi "+inp.toLowerCase()]
							qsamm.forEach(function (qsam,id4,arr) {
								if (pal == inp.toLowerCase()) {
									var ip;
									if (input[id - 1] != undefined) {
										ip = input[id - 1]
									} else {
										ip = ""
									}
									
									if (ip.toLowerCase()+" "+inp == qsam) {
										out = cla[id2][Math.floor(Math.random() * cla[id2].length)]
									} else if (q) {
										out = "q" + cla[id2][Math.floor(Math.random() * cla[id2].length)]
										q = false
									} else if (pal == inp.toLowerCase()) {
										out = cla[id2][Math.floor(Math.random() * cla[id2].length)]
									}
								}
							})
						}
					})
				})
				
				if (out == null) {
					if (inp != "que" || inp != "q" || inp != "qi") {
						if (inp == "a" || inp == "o" || inp == "da" || inp == "de" || inp == "do" || inp == "as" || inp == "os" || inp == "das" || inp == "dos" || inp == "e" || inp == "no" || inp == "na" || inp == "nos" || inp == "nas" || inp == "como" || inp == "com" || inp == "contra" || inp == "um" || inp == "uns" || inp == "uma" || inp == "umas" || inp =="para" || inp == "seu" || inp == "sua" || inp == "seus" || inp == "suas" || inp == "meu" || inp == "minha" || inp == "meus" || inp == "minhas") {
							output = output+inp+" "
						} else {
							if(Math.floor(Math.random() * 30) == 0 && !inp.slice(0,-1).endsWith("t") && !inp.endsWith("re")) {
								if (inp.endsWith("ando")) {
									output = output+"coisando "
								} else if (inp.endsWith("indo")) {
									output = output+"coisando "
								} else if (inp.endsWith("ado")) {
									output = output+"coisado "
								} else if (inp.endsWith("ido")) {
									output = output+"coisado "
								} else if (inp.endsWith("ar")) {
									output = output+"coisar "
								} else if (inp.endsWith("ou")) {
									output = output+"coisou "
								} else if (inp.endsWith("ei")) {
									output = output+"coisei "
								} else if (inp.endsWith("o")) {
									output = output+"coiso "
								} else if (inp.endsWith("a")) {
									output = output+"coisa "
								} else {
									output = output+inp+" "
								}
							} else {
								output = output+inp+" "
							}
						}
					} else {
						q = true
					}
				} else {
					output = output+out+" "
				} 
			}
			
			input.forEach(createOutput)
			
			message.channel.send(output)
		}
		
		if(message.author.id == 274915778761981952) { // Comandos secretos
			if(message.content.toLowerCase().indexOf("%reset") == 0) { // Desliga o bot
				message.channel.send("desliganokk").then(a => {
					process.exit()
				})
			}
			
			if(message.content.toLowerCase().indexOf("%test") == 0) { // test
				async function main(coiso) {
					message.channel.fetchMessages({limit: coiso + 1}).then(p => {
						Promise.resolve(p).then(m => {
							m.map(function (v,i,arr) {
								v.delete();
							})
						})
					}).catch(err => {
						console.log(err);
					})
				}
				
				var coiso = parseInt(message.content.slice("%test ".length));
				if(coiso >= 1 && coiso <= 99) {
					main(coiso)
				}
				else {
					message.channel.send("tem q te numero valido nub")
				}
			}
			
			if(message.content.toLowerCase().indexOf("%junior") == 0) { // test
				async function main() {
					message.channel.fetchMessages({limit: 100}).then(p => {
						Promise.resolve(p).then(m => {
							m.map(function (v,i,arr) {
								if (v.attachments != null) {
									v.attachments.map(function (v2,i,arr) {
										message.channel.send(v2.url);
									})
								}
							})
						})
					}).catch(err => {
						console.log(err);
					})
				}
				
				main()
			}
			
			if(message.content.toLowerCase().indexOf("%sandy") == 0) { // test
				async function main() {
					message.channel.fetchMessages({limit: 100}).then(p => {
						var debounce = false;
						Promise.resolve(p).then(m => {
							m.map(function (v,i,arr) {
								if (v.attachments != null) {
									v.attachments.map(function (v2,i,arr) {
										if(!debounce) {
											message.channel.send(v2.url);
											debounce = true;
										}
									})
								}
							})
						})
					}).catch(err => {
						console.log(err);
					})
				}
				
				main()
			}
			
			if(message.content.toLowerCase().indexOf("%patrico") == 0) { // test
				async function main() {
					message.channel.fetchMessages({limit: 100}).then(p => {
						var debounce = false;
						Promise.resolve(p).then(m => {
							m.map(function (v,i,arr) {
								if (v.attachments.first() != null) {
									if (!debounce) {
										debounce = true
										jimp.read(v.attachments.first().url).then(async function (img) {
											var wa = await img.grayscale().write("./patrio.png")
											Promise.resolve(wa).then(b => {
												return Promise.resolve(b)
											}).then(a => {
												jimp.read("./patrio.png").then(u => {
													message.channel.send("",{files: ["./patrio.png"]})
												})
											})
										})
									}
								}
							})
						})
					}).catch(err => {
						console.log(err);
					})
				}
				
				main()
			}
			
			if(message.content.toLowerCase().indexOf("%say") == 0) { // faz ele dizer algo
				message.channel.send(message.content.slice(5))
			}
		}
	} else if (Math.floor(Math.random() * 50000) == 2 && message.author.id != 627501985175830529) {
		if (Math.floor(Math.random() * 8) == 0) {
			message.reply("cala a boc ai krl nub")
		} else {
			message.react(`633334602001416254`)
		}
	}
});

var er = new Error().stack