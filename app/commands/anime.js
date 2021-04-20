// const rp = require('request-promise');
// const cheerio = require('cheerio');

// String.prototype.replaceAll = function(search, replacement) {
//     var target = this;
//     return target.split(search).join(replacement);
// };


// const handler = {
//     async exec({ m, args }) {
//         let req = 10;
//         if (args.length >= 1) req = Number(args[0]);
//         if (args.length < 1) req = 10

//         const url = 'https://www.imdb.com/search/keyword/?keywords=anime%2Cbased-on-manga&ref_=kw_ref_key&sort=moviemeter,asc&mode=detail&page=1';

//         try {
//             const request = await rp(url);
//             const $ = cheerio.load(request);
//             let titles = [];
//             let rates = [];
//             let genres = [];
//             $('div[class="lister-list"] > .lister-item > .lister-item-content > .lister-item-header > a').each((i, el) => {
//                 return titles.push($(el).text())
//             });
//             $('div[class="lister-list"] > .lister-item > .lister-item-content > .ratings-bar > .ratings-imdb-rating').each((i, el) => {
//                 return rates.push($(el).text())
//             });
//             $('div[class="lister-list"] > .lister-item > .lister-item-content > .text-muted > .genre').each((i, el) => {
//                 return genres.push($(el).text())
//             });
            
//             let content = []
//             let hr = '\n+============================+\n'
//             for (let i = 0; i < req; i++) {
//                 content.push(`*Title* : _*${titles[i]}*_\n*Genre* : _*${genres[i].replaceAll('\n', '').replaceAll(' ', '').replaceAll(',', ' | ')}*_\n*Rate* : ⭐_${rates[i].replaceAll('\n', '').replaceAll(' ', '')}_`)
//             }
//             m.reply(content.join(hr))

//         } catch (err) {
//             console.log(err)
//         }


//     },
//     commands: ['', 'list'].map(v => 'anime' + v),
//     help: ['', 'list'].map(v => '#anime' + v + ' <limit (Max 50, Default 10)>'),
//     tag: 'Anime'
// };

// module.exports = handler