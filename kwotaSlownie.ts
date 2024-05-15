const convertCurrencyAmountToNumber = (plnAmountText: string): number => {
// const convertCurrencyAmountToNumber = (plnAmountText) => {
  return parseFloat(plnAmountText.replace(",", ".").replace(/[^\d.-]/g, ""));
};

const splitFloatNumber = (number) => {
    let parts = number.toString().split('.');
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
  let ty = [
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

  const amountParts = splitFloatNumber(amountAsNumber);
  console.log('amountParts: ', amountParts);

  let amountInWords = "";
  let amountPartsInWords = [];
  

  // if (amountParts[1] === 0) {
  //   amountInWords = "złotych";
  // } else {
  //   amountInWords = "złotych " + amountParts[1] + "/100";
  // }
  amountParts.forEach((amountPart) => {
    while (amountPart > 0) {
      let g = 0;
      let s = Math.floor((amountPart % 1000) / 100);
      let n = 0;
      let d = Math.floor((amountPart % 100) / 10);
      let j = Math.floor(amountPart % 10);

      if (d == 1 && j > 0) {
        n = j;
        d = 0;
        j = 0;
      }

      let k = 2;
      if (j == 1 && s + d + n == 0) k = 0;
      if (j == 2 || j == 3 || j == 4) k = 1;
      if (s + d + n + j > 0)
        amountInWords =
          amountInWords +
          hundreds[s] +
          ty[d] +
          teen[n] +
          unity[j] +
          groups[g][k] 

      g++;
      amountPart = Math.floor(amountPart / 1000);
    }
  });

  console.log(amountInWords);
  return amountInWords;
};

amountInWords("1020340,45");
