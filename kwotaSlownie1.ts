const convertCurrencyAmountToNumber = (plnAmountText: string): number => {
// const convertCurrencyAmountToNumber = (plnAmountText) => {
  return parseFloat(plnAmountText.replace(",", ".").replace(/[^\d.-]/g, ""));
};

const splitFloatNumber = (decimalNumber: number) => {
    let parts = decimalNumber.toString().split('.');
    return [parseInt(parts[0]), parts[1] ? parseInt(parts[1]) : 0];
}

const amountInWords = (amountAsString: string): string => {
// const amountInWords = (amountAsString) => {
  let unity = [
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
  let teen = [
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
  let dozens = [
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
  let hundreds = [
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
  let groups = [
    ["", "", ""],
    [" tysiąc", " tysiące", " tysięcy"],
    [" milion", " miliony", " milionów"],
    [" miliard", " miliardy", " miliardów"],
    [" bilion", " biliony", " bilionów"],
    [" biliard", " biliardy", " biliardów"],
    [" trylion", " tryliony", " trylionów"],
  ];

  let amountAsNumber: number = convertCurrencyAmountToNumber(amountAsString);
  // let amountAsNumber = convertCurrencyAmountToNumber(amountAsString);
  if (amountAsNumber < 0) {
    throw new Error("The amount must not be a negative value");
  }
  if (amountAsNumber === 0) return "zero złotych";

  const amountParts: number[] = splitFloatNumber(amountAsNumber);
  console.log('amountParts: ', amountParts);

  let amountPartsInWords: string[] = [];
  
  amountParts.forEach((amountPart) => {
    if (amountPart === 0) {
      amountPartsInWords.push('zero');
    } else {
    let amountInWords = "";
    let g = 0;
      while (amountPart > 0) {
        let h = Math.floor((amountPart % 1000) / 100);
        let t = 0;
        let d = Math.floor((amountPart % 100) / 10);
        let u = Math.floor(amountPart % 10);

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
          hundreds[h] +
            dozens[d] +
            teen[t] +
            unity[u] +
            groups[g][p] +
            amountInWords;

        g++;
        amountPart = Math.floor(amountPart / 1000);
      }
      amountPartsInWords.push(amountInWords);
    }
    });
  console.log(amountPartsInWords);
  return '';
};

amountInWords("0");
// amountInWords("1020345");
