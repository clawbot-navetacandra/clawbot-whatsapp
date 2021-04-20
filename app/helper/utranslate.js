const fetch = require('node-fetch');

async function helper(from, to, text) {
    let _text = encodeURIComponent(text);
    const base_url = `https://fierce-brushlands-90323.herokuapp.com/translate/google?lang_from=${from.toLowerCase()}&lang_target=${to.toLowerCase()}&text=${_text}`;
    const a = await fetch(base_url,  {mode: 'no-cors', timeout: 0});
    const b = await a.json()
    return b
    
}

module.exports = helper