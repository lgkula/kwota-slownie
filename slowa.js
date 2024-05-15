const slowa = (kwota) => {
// function slowa(kwota) {
  var liczba = parseInt(kwota);

  var jednosci = [
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
  var nascie = [
    "",
    " jedenaście",
    " dwanaście",
    " trzynaście",
    " czternaście",
    " piętnaście",
    " szesnaście",
    " siedemnaście",
    " osiemnaście",
    " dziewietnaście",
  ];
  var dziesiatki = [
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
  var setki = [
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
  var grupy = [
    ["", "", ""],
    [" tysi�c", " tysi�ce", " tysi�cy"],
    [" milion", " miliony", " milion�w"],
    [" miliard", " miliardy", " miliard�w"],
    [" bilion", " biliony", " bilion�w"],
    [" biliard", " biliardy", " biliard�w"],
    [" trylion", " tryliony", " trylion�w"],
  ];

  // jezeli pole zawiera poprawna wartosc calkowita
  if (kwota == liczba.toString()) {
    var wynik = "";
    var znak = "";
    if (liczba == 0) wynik = "zero";
    if (liczba < 0) {
      znak = "minus";
      liczba = -liczba;
    }

    var g = 0;
    while (liczba > 0) {
      var s = Math.floor((liczba % 1000) / 100);
      var n = 0;
      var d = Math.floor((liczba % 100) / 10);
      var j = Math.floor(liczba % 10);

      if (d == 1 && j > 0) {
        n = j;
        d = 0;
        j = 0;
      }

      var k = 2;
      if (j == 1 && s + d + n == 0) k = 0;
      if (j == 2 || j == 3 || j == 4) k = 1;
      if (s + d + n + j > 0)
        wynik =
          setki[s] +
          dziesiatki[d] +
          nascie[n] +
          jednosci[j] +
          grupy[g][k] +
          wynik;

      g++;
      liczba = Math.floor(liczba / 1000);
    }
    console.log(znak + wynik);
  } else {
    console.log("Podano nieprawidłowa wartosc!");
  }
}

slowa("12356789");

// https://www.algorytm.org/inne/zamiana-liczby-na-slowa-z-polska-gramatyka/zlns-gramatyka-js.html