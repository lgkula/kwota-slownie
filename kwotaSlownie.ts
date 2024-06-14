const convertCurrencyAmountToNumber = (plnAmountText: string): number => {
  return parseFloat(plnAmountText.replace(",", ".").replace(/[^\d.-]/g, ""));
};

const splitFloatNumber = (decimalNumber: number): number[] => {
  const parts = decimalNumber.toString().split(".");
  if (parts.length > 1) {
    if (parts[1].length === 1) {
      parts[1] = `${parts[1]}0`;
    }
    return [parseInt(parts[0]), parts[1] ? parseInt(parts[1]) : 0];
  } else {
    return [parseInt(parts[0]), 0];
  }
};

export const amountInWords = (amountAsString: string): string => {
  const amountAsNumber: number = convertCurrencyAmountToNumber(amountAsString);
  if (amountAsNumber < 0) {
    throw new Error("The amount must not be a negative value");
  }

  if (amountAsNumber === 0) return "zero złotych";

  const amountPartsNumber: number[] = splitFloatNumber(amountAsNumber);
  if (amountPartsNumber[1] > 99) {
    throw new Error(
      "The amount given must not have more than two decimal digits"
    );
  }

  const amountPartsInWords: string[] = [];

  amountPartsNumber.forEach((amountPartNumber) => {
    if (amountPartNumber === 0) {
      amountPartsInWords.push("zero");
    } else {
      let amountInWords = "";
      let g = 0;
      while (amountPartNumber > 0) {
        const h = Math.floor((amountPartNumber % 1000) / 100);
        let t = 0;
        let d = Math.floor((amountPartNumber % 100) / 10);
        let u = Math.floor(amountPartNumber % 10);

        if (d == 1 && u > 0) {
          t = u;
          d = 0;
          u = 0;
        }

        let p = 2;
        if (u == 1 && h + d + t == 0) p = 0;
        if (u == 2 || u == 3 || u == 4) p = 1;
        if (h + d + t + u > 0)
          amountInWords =
            HUNDREDS[h] +
            DOZENS[d] +
            TEEN[t] +
            UNITY[u] +
            GROUPS[g][p] +
            amountInWords;

        g++;
        amountPartNumber = Math.floor(amountPartNumber / 1000);
      }

      amountPartsInWords.push(amountInWords);
    }
  });

const [numberZl, numberGr] = amountPartsNumber;
const [wordZl, wordGr] = amountPartsInWords;

const getPolishCurrencySuffix = (
  number: number,
  singular: string,
  plural: string,
  pluralGenitive: string
): string => {
  if (number === 1) {
    return singular;
  } else if (
    number % 10 === 0 ||
    number % 10 === 1 ||
    number % 10 >= 5 ||
    (number % 100 >= 10 && number % 100 <= 15)
  ) {
    return pluralGenitive;
  } else {
    return plural;
  }
};

const addZlotyToAmount = (): string => {
  return `${wordZl} ${getPolishCurrencySuffix(
    numberZl,
    "złoty",
    "złote",
    "złotych"
  )}`.trimStart();
};

const addGroszyToAmount = (): string => {
  return `${wordGr} ${getPolishCurrencySuffix(
    numberGr,
    "grosz",
    "grosze",
    "groszy"
  )}`.trimStart();
};
  const fullAmountInWords: string = `${addZlotyToAmount()} ${addGroszyToAmount()}`;
  return fullAmountInWords.trimStart().replace(/  +/g, " ");
};

const UNITY = [
  "",
  " jeden",
  " dwa",
  " trzy",
  " cztery",
  " pięć",
  " sześć",
  " siedem",
  " osiem",
  " dziewięć",
];
const TEEN = [
  "",
  " jedenaście",
  " dwanaście",
  " trzynaście",
  " czternaście",
  " piętnaście",
  " szesnaście",
  " siedemnaście",
  " osiemnaście",
  " dziewiętnaście",
];
const DOZENS = [
  "",
  " dziesięć",
  " dwadzieścia",
  " trzydzieści",
  " czterdzieści",
  " pięćdziesiąt",
  " sześćdziesiąt",
  " siedemdziesiąt",
  " osiemdziesiąt",
  " dziewięćdziesiąt",
];
const HUNDREDS = [
  "",
  " sto",
  " dwieście",
  " trzysta",
  " czterysta",
  " pięćset",
  " sześćset",
  " siedemset",
  " osiemset",
  " dziewięćset",
];
const GROUPS = [
  ["", "", ""],
  [" tysiąc", " tysiące", " tysięcy"],
  [" milion", " miliony", " milionów"],
  [" miliard", " miliardy", " miliardów"],
  [" bilion", " biliony", " bilionów"],
  [" biliard", " biliardy", " biliardów"],
  [" trylion", " tryliony", " trylionów"],
];

console.log(amountInWords("1320320,20"));
console.log(amountInWords("431,52"));
console.log(amountInWords("432,02"));
console.log(amountInWords("435,01"));
console.log(amountInWords("414,05"));
console.log(amountInWords("436,12"));
console.log(amountInWords("411,14"));
console.log(amountInWords("401,19"));
console.log(amountInWords("402,22"));
console.log(amountInWords("414,21"));
console.log(amountInWords("422,24"));
console.log(amountInWords("423,33"));
console.log(amountInWords("431,00"));
