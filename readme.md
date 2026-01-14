Playwright E2E testovi – Lichess.org


Ova zadaća sadrži testove napisane pomoću Playwright testnog okvira.
Testovi automatiziraju i provjeravaju osnovne funkcionalnosti web-aplikacije lichess.org, s fokusom na autentifikaciju korisnika i osnovne korisničke radnje nakon prijave.

Alati:
Playwright Test
JavaScript (Node.js)
Testiranje u pregledniku (Chromium / Firefox / WebKit)



TEST CASE 1. - Uspješna prijava

Opis:
Test provjerava može li se korisnik uspješno prijaviti s ispravnim korisničkim imenom i lozinkom.

Koraci:
Otvara se stranica za prijavu
Unosi se ispravno korisničko ime i lozinka
Klikne se gumb „Sign in“

Očekivani rezultat:
Vidljiv je .lobby element, što potvrđuje uspješnu prijavu

/////


TEST CASE 2.  - Korisnik se može prijaviti i odjaviti

Opis:
Test provjerava cijeli proces prijave i odjave korisnika.

Koraci:
Prijava s ispravnim podacima
Otvaranje korisničkog izbornika
Klik na gumb „Sign out“

Očekivani rezultat:
Korisnik je odjavljen
Aplikacija ga vraća na stranicu za prijavu
Polje za unos korisničkog imena je ponovno vidljivo

/////


TEST CASE 3.  - Korisnik može započeti 3+0 blitz igru

Opis:
Test provjerava može li prijavljeni korisnik započeti blitz partiju s kontrolom vremena 3+0.

Koraci:
Prijava korisnika
Klik na opciju „3+0 Blitz“

Očekivani rezultat:
Pokreće se nova šahovska partija
Vidljiv je <cg-container> element (šahovska ploča)

/////



TEST CASE 4. - Korisnik može vidjeti svoj profil i statistiku

Opis:
Test provjerava može li korisnik otvoriti svoj profil i vidjeti osnovne statistike.

Koraci:
Prijava korisnika
Otvaranje korisničkog izbornika
Klik na opciju „Profile“

Očekivani rezultat:
Korisnik je preusmjeren na svoju profilnu stranicu
Vidljiva je kartica „Activity“

/////



TEST CASE 5. -  Korisnik može vidjeti svoje odigrane partije

Opis:
Test provjerava može li korisnik pregledati povijest svojih odigranih partija.

Koraci:
Prijava korisnika
Otvaranje profila
Klik na karticu „Games“

Očekivani rezultat:
Otvara se stranica s popisom svih odigranih partija
Vidljiv je broj odigranih partija 