const fs = require("fs");

const names = {
  femaleFirstNames: [
    "Ewa",
    "Elżbieta",
    "Magdalena",
    "Zofia",
    "Barbara",
    "Anna",
    "Maria",
    "Katarzyna",
    "Małgorzata",
    "Agnieszka",
  ],
  maleFirstNames: [
    "Jan",
    "Andrzej",
    "Piotr",
    "Krzysztof",
    "Stanisław",
    "Marek",
    "Tomasz",
    "Paweł",
    "Józef",
    "Marcin",
  ],
  maleLastNames: [
    "Nowak",
    "Kowalski",
    "Wiśniewski",
    "Dąbrowski",
    "Lewandowski",
    "Zieliński",
    "Woźniak",
    "Kozłowski",
    "Jankowski",
    "Wójcik",
  ],
  femaleLastNames: [
    "Nowak",
    "Kowalska",
    "Wiśniewska",
    "Dąbrowska",
    "Lewandowska",
    "Zielińska",
    "Woźniak",
    "Kozłowska",
    "Jankowska",
    "Wójcik",
  ],
};
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateIdentity() {
  const isFemale = Math.random() < 0.5;
  return {
    gender: isFemale ? "F" : "M",
    firstName: isFemale
      ? getRandomElement(names.femaleFirstNames)
      : getRandomElement(names.maleFirstNames),
    lastName: isFemale
      ? getRandomElement(names.femaleLastNames)
      : getRandomElement(names.maleLastNames),
    age: Math.floor(18 + Math.random() * 60),
  };
}

identities = [];
for (let i = 0; i < 20; i++) {
  identities.push(generateIdentity());
}

// save to json file
try {
  fs.writeFileSync("people.json", JSON.stringify(identities));
} catch (err) {
  confirm.log("Something went wrong when saving to file.");
  throw err;
}
console.log("File saved successfully. check people.json file.");
