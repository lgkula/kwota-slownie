var convertCurrencyAmountToNumber = function (plnAmountText) {
    // const convertCurrencyAmountToNumber = (plnAmountText) => {
    return parseFloat(plnAmountText.replace(",", ".").replace(/[^\d.-]/g, ""));
};
var splitFloatNumber = function (number) {
    var parts = number.toString().split('.');
    return [parseInt(parts[0]), parts[1] ? parseInt(parts[1]) : 0];
};
var amountInWords = function (amountAsString) {
    // const amountInWords = (amountAsString) => {
    var unity = [
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
    var teen = [
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
    var ty = [
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
    var hundreds = [
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
    var groups = [
        ["", "", ""],
        [" tysiąc", " tysiące", " tysięcy"],
        [" milion", " miliony", " milionów"],
        [" miliard", " miliardy", " miliardów"],
        [" bilion", " biliony", " bilionów"],
        [" biliard", " biliardy", " biliardów"],
        [" trylion", " tryliony", " trylionów"],
    ];
    var amountAsNumber = convertCurrencyAmountToNumber(amountAsString);
    // let amountAsNumber = convertCurrencyAmountToNumber(amountAsString);
    if (amountAsNumber < 0) {
        throw new Error("The amount must not be a negative value");
    }
    if (amountAsNumber === 0)
        return "zero złotych";
    var amountParts = splitFloatNumber(amountAsNumber);
    console.log('amountParts: ', amountParts);
    var amountInWords = "";
    var amountPartsInWords = [];
    // if (amountParts[1] === 0) {
    //   amountInWords = "złotych";
    // } else {
    //   amountInWords = "złotych " + amountParts[1] + "/100";
    // }
    amountParts.forEach(function (amountPart) {
        while (amountPart > 0) {
            var g = 0;
            var s = Math.floor((amountPart % 1000) / 100);
            var n = 0;
            var d = Math.floor((amountPart % 100) / 10);
            var j = Math.floor(amountPart % 10);
            if (d == 1 && j > 0) {
                n = j;
                d = 0;
                j = 0;
            }
            var k = 2;
            if (j == 1 && s + d + n == 0)
                k = 0;
            if (j == 2 || j == 3 || j == 4)
                k = 1;
            if (s + d + n + j > 0)
                amountInWords =
                    amountInWords +
                        hundreds[s] +
                        ty[d] +
                        teen[n] +
                        unity[j] +
                        groups[g][k];
            g++;
            amountPart = Math.floor(amountPart / 1000);
        }
    });
    console.log(amountInWords);
    return amountInWords;
};
amountInWords("1020340,45");
