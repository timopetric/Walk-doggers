# Dokument zahtev

|                             |                                                         |
| :-------------------------- | :------------------------------------------------------ |
| **Naziv projekta**          | Dog Walkers |
| **Člani projektne skupine** | Matic Bregar, Domen Vilar, Timotej Petrič, Mustafa Grabus in Domen Bukovac |
| **Kraj in datum** | Ljubljana, 05.04.2021 |                              |

## Povzetek projekta

Sedaj, ko se je tempo življenja v času epidemije covid-19 malo upočasnil, mnogo ljudi preživi veliko časa doma. Menimo, da je zdaj morda primeren čas za posvojitev kakšne domače živali, saj lahko več časa namenijo skrbi in vzgajanju le-te. 

Kaj pa se bo zgodilo, ko se bo življenje vrnilo na stare tirnice in bodo spet morali v službo, kdo bo takrat skrbel za domače živali? Veliko ljudi pa si morda želi samo ukvarjati se z živalmi, ne želijo pa jih posvojiti, ker je to za njih prevelika odgovornost, zato mi ponujamo rešitev. Uporabniki, ki bodo preživeli veliko časa zdoma, bodo lahko na naši platformi izbrali primerno osebo, ki bo njihove žival peljala na sprehod ali pa na njih popazila, medtem ko bodo oni zdoma ali pa zaradih drugih razlogov nimajo dovolj časa za skrb hišnih ljubljenčkov.

Aplikacija bo vsebovala intuitiven uporabniški vmesnik, ki bo omogočal enostavno iskanje primernih sprehajalcev oz skrbnikov.


## 1. Uvod

**TO-DO**

- V uvodu opišite problemsko domeno (kateri problem bo naša aplikacija reševala) in kratek pregled glavnih funkcionalnosti (kaj vse bo aplikacija počela).

## 2. Uporabniške vloge

**TO-DO**

- Opredelite glavne tipe uporabnikov vaše aplikacije glede na funkcionalnosti, ki jih imajo na voljo.
- Zelo pomembno je, da uporabniške vloge konsistentno imenujete. Na primer, če ste definirali vlogo **učitelj**, morate povsod uporabljati samostalnik **učitelj**, ne pa morda **profesor** ali **pedagog**. Tehniška besedila žal ne morejo dosegati leposlovnih standardov, tudi če so še tako dobro napisana.

## 3. Slovar pojmov

**TO-DO**

- Natančno opredelite vse têrmine, ki jih boste uporabljali v nadaljevanju dokumenta.

## 4. Diagram primerov uporabe

![image](./images/diagram.png)

## 5. Funkcionalne zahteve

### Registracija

Neprijavljen uporabnik se lahko registrira na strani. Ob registraciji vpiše ime, priimek, email in geslo.

#### Osnovni tok

1. Neprijavljen uporabnik izbere funkcionalnost registracija.
2. Aplikacija mu ponudi registracijski obrazec.
3. Neprijavljen uporabnik izpolni registracijski obrazec. Vpiše svoje ime, priimek, email in geslo. Geslo je dolgo vsaj 8 znakov in sestavljeno iz velikih in malih črk, številk ter vsaj enega posebnega znaka.
4. Neprijavljen uporabnik odda registracijski obrazec.
5. Aplikacija prikaže obvestilo o uspešni registraciji.

#### Alternativni tok

**Alternativni tok 1**,

1. Neprijavljen uporabnik želi dostopati do funkcionalnosti, ki je na voljo le prijavljenim uporabnikom.
2. Aplikacija neprijavljenemu uporabniku prikaže obvestilo, da je zahtevana funkcionalnost na voljo le prijavljenim uporabnikom. Aplikacija ponudi možnost preusmeritve na registracijsko stran.
3. Neprijavljen uporabnik izbere možnost za preusmeritev na stran za registracijo (funkcionalnost registracija).
4. Aplikacija mu ponudi registracijski obrazec.
5. Neprijavljen uporabnik izpolni registracijski obrazec. Vpiše svoje ime, priimek, email in geslo. Geslo je dolgo vsaj 8 znakov in sestavljeno iz velikih in malih črk, številk ter vsaj enega posebnega znaka.
6. Neprijavljen uporabnik odda registracijski obrazec.
7. Aplikacija prikaže obvestilo o uspešni registraciji.

#### Izjemni tok

**Izjemni  tok 1**
Neprijavljen uporabnik je za registracijo uporabil email naslov, ki je že vezan na nek uspešno registriran račun. Aplikacija vrne obvestilo o že uporabljenem email naslovu in ga pozove k uporabi drugega.

**Izjemni  tok 2**
Neprijavljen uporabnik vnese geslo, ki ni sestavljeno iz velikih in malih črk, številk ter vsaj enega posebnega znaka in ni dolgo vsaj 8 znakov. Obrazec odda. Aplikacija prikaže obvestilo o neprimernem geslu.

#### Pogoji
Neprijavljen uporabnik aplikacije za uspešno izvedeno registracijo še ne sme biti prijavljen ali registriran v sistem z email naslovom, ki ga je vpisal v registracijski obrazec.

#### Posledice
Če neprijavljen uporabnik dobi obvestilo o uspešni registraciji, je uspešno registriran. Sedaj se lahko prijavi v aplikacijo s svojim email naslovom in geslom, ki ga je vnesel ob registraciji v registracijski obrazec. Po uspešni prijavi dobi dostop do več funkcionalnosti aplikacije.


#### Posebnosti

Registracijski podatki se med aplikacijo in strežnikom prenašajo po varni povezavi. V bazi so shranjeni z upoštevanje priporočil dobre in varne prakse hranjenja občutljivih podatkov.

#### Prioritete identificiranih funkcionalnosti

**TO-DO**

- Za identificirane funkcionalnosti se z metodo **MoSCoW** (MUST have, SHOULD have, COULD have in WOULD have) določi prioritete.

#### Sprejemni testi

-[Osnovni tok] Neprijavljen uporabnik izpolne registracijski obrazec. Sedaj se lahko prijavi v sistem.

-[Alternativni tok 1] Neprijavljen uporabnik želi dostopati do funkcionalnosti, ki je na voljo le prijavljenim uporabnikom. Aplikacija mu ponudi možnost preusmeritve na registracijsko stran.

-[Izjemni tok 1] Neprijavljeni uporabnik je za registracijo uporabi email naslov, ki je že vezan na nek uspešno registriran račun. Aplikacija mu prepreči registracijo s tem email naslovom in mu prikaže obvestilo o že uporabljenem email naslovu ter ga pozove k uporabi drugega.

-[Izjemni tok 2] Neprijavljen uporabnik vnese geslo, ki ni pravilne oblike. Po oddaji obrazca dobi obvestilo o neprimernem geslu.

## 6. Nefunkcionalne zahteve

**TO-DO**

- Navedite splošne omejitve, ki jih moramo upoštevati v več funkcionalnostih ali celo skozi celoten razvoj aplikacije.

## 7. Osnutki zaslonskih mask

**TO-DO**

## 8. Prototipi vmesnikov

**TO-DO**

- Navesti je potrebno: zaslonske maske, sistemske vmesnike in vmesnike do naprav, vključno z referencami do primerov uporabe.
