const convertCurrencyAmountToNumber = (plnAmountText: string): number => {
  return parseFloat(plnAmountText.replace(',', '.').replace(/[^\d.-]/g, ''));
};

const splitFloatNumber = (decimalNumber: number): number[] => {
  const parts = decimalNumber.toString().split('.');
  return [parseInt(parts[0]), parts[1] ? parseInt(parts[1]) : 0];
};

const amountInWords = (amountAsString: string): string => {
  const UNITY = [
    '',
    ' jeden',
    ' dwa',
    ' trzy',
    ' cztery',
    ' pięć',
    ' sześć',
    ' siedem',
    ' osiem',
    ' dziewięć',
  ];
  const TEEN = [
    '',
    ' jedenaście',
    ' dwanaście',
    ' trzynaście',
    ' czternaście',
    ' piętnaście',
    ' szesnaście',
    ' siedemnaście',
    ' osiemnaście',
    ' dziewiętnaście',
  ];
  const DOZENS = [
    '',
    ' dziesięć',
    ' dwadzieścia',
    ' trzydzieści',
    ' czterdzieści',
    ' pięćdziesiąt',
    ' sześćdziesiąt',
    ' siedemdziesiąt',
    ' osiemdziesiąt',
    ' dziewięćdziesiąt',
  ];
  const HUNDREDS = [
    '',
    ' sto',
    ' dwieście',
    ' trzysta',
    ' czterysta',
    ' pięćset',
    ' sześćset',
    ' siedemset',
    ' osiemset',
    ' dziewięćset',
  ];
  const GROUPS = [
    ['', '', ''],
    [' tysiąc', ' tysiące', ' tysięcy'],
    [' milion', ' miliony', ' milionów'],
    [' miliard', ' miliardy', ' miliardów'],
    [' bilion', ' biliony', ' bilionów'],
    [' biliard', ' biliardy', ' biliardów'],
    [' trylion', ' tryliony', ' trylionów'],
  ];

  const amountAsNumber: number = convertCurrencyAmountToNumber(amountAsString);
  if (amountAsNumber < 0) {
    throw new Error('The amount must not be a negative value');
  }

  if (amountAsNumber === 0) return 'zero złotych';

  const amountPartsNumber: number[] = splitFloatNumber(amountAsNumber);
  if (amountPartsNumber[1] > 99) {
    throw new Error(
      'The amount given must not have more than two decimal digits'
    );
  }
  if (amountPartsNumber[1] < 10) {
    amountPartsNumber[1] = amountPartsNumber[1] * 10;
  }

  const amountPartsInWords: string[] = [];

  amountPartsNumber.forEach((amountPartNumber) => {
    if (amountPartNumber === 0) {
      amountPartsInWords.push('zero');
    } else {
      let amountInWords = '';
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

  const addZlotyToAmount = (): string => {
    if (amountPartsNumber[0] < 5) {
      return `${amountPartsInWords[0]} złote`;
    } else {
      return `${amountPartsInWords[0]} złotych`;
    }
  };

  const addGroszyToAmount = (): string => {
    if (amountPartsNumber[1] === 0) {
      return 'zero groszy';
    } else if (amountPartsNumber[1] === 1) {
      return `${amountPartsInWords[1]} grosz`;
    } else if (amountPartsNumber[1] < 5) {
      return `${amountPartsInWords[1]} grosze`;
    } else {
      return `${amountPartsInWords[1]} groszy`;
    }
  };
  return `${addZlotyToAmount()}${addGroszyToAmount()}`;
};

console.log(amountInWords('1320320,20'));
