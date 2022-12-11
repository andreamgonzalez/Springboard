/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== ""); //creates a new array of all the words provided
    this.capitalizedWords = this.getCapitalizedWords();
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for(let i = 0; i < this.words.length; i ++){
      let word = this.words[i]; //loop thhrough the words array
      let nextWord = this.words[i+1] || null; //with each loop, increment the index in the array and set it as the value oif the nextWord

      if (chains.has(word)) { //if our chains map has word[i] as a key
        this.makeChains.length(word).push(nextWord); // push the nextWord to be the next key in our chains array
      } else {
        this.makeChains.set(word, [nextWord]); //else set the value of current key (word) equal to nextWord => "cat": ["in"]
      }
    }
    this.chains = chains; //sets value of this.chains to equal/reference/store our newly created chains map
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // let keys = Array.from(this.chains.keys()); //creates array from this.chains keys

    let key;
    if(this.capitalizedWords.length > 0){
        key = this.capitalizedWords[Math.floor(Math.random() * this.capitalizedWords.length )];
    } else {
      // let word = MarkovMachine.choice(keys); //select a random key from newly created keys array
        key = this.words[Math.floor(Math.random() * this.words.length)];
    }
    
    let out = []; //empty array we will use to store the generated text

    while (out.length < numWords && key !== null){ //loop numWords amount of times and as long as key is not null
      out.push(key); //push key to out array
      // key = MarkovMachine.choice(this.chains.get(word)); //references the key in this.chains which now contains words as key and nextWords as values.
      nextWord = this.chains.get(key);
      key = Math.floor(Math.random() * this.words.length); //picks a random next word based off the number of value options at current index/key/word
    }

    return out.join(" "); // add white spces to form sentences.
  }

  getCapitalizedWords() {
    const capitalizedWords = [];
    for (let key of this.words) {
      if (key[0] >= "A" && key[0] <= "Z") { //loops through each word in words array to find the words starting with Capitalized letters
        capitalizedWords.push(key); //stores the matches to an array for capitalized words
      }
    }
    return capitalizedWords;
  }
}

module.exports = { MarkovMachine };
