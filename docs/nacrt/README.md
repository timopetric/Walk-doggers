# Načrt sistema

|                             |                                                         |
| :-------------------------- | :------------------------------------------------------ |
| **Naziv projekta**          | **TO-DO** naziv projekta                                |
| **Člani projektne skupine** | **TO-DO** 1. član, 2. član, 3. član, 4. član in 5. član |
| **Kraj in datum**           | **TO-DO** kraj, datum                                   |

## Povzetek

**TO-DO**

- Povzetek je, kot že vemo, celoten dokument, strnjen v največ 150 besed.

## 1. Načrt arhitekture

**TO-DO**

- Za prikaz uporabite enostavne prikaze, kot so blokovni ali paketni diagrami. Uporabite arhitekturne vzorce.

## 2. Načrt strukture

### 2.1 Razredni diagram

**TO-DO**

- Izdelajte razredni diagram.

### 2.2 Opis razredov


### ExploreView

Razred ExploreView predstavlja mejni razred primera uporabe pregledovanja in iskanja oglasov. Gre za **pogled** v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode           | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten)           |
|:---------------------|:-------------------------|:--------------|:-------------------------------|
| toggleFilter()       | -                        | void          | Odpri oz. zapri filter iskanja |
| search()             | -                        | void          | -                              |
| openListingDetails() | -                        | void          | -                              |
| adminDeleteListing() | -                        | void          | -                              |

__________________________________________________________________________

### Explore

Razred Explore predstavlja kontrolni razred primera uporabe pri razdelku ExploreView. Uporablja se za iskanje in filtriranje oglasov in pošiljanje le teh v ExploreView. Gre za **krmilnik** v arhitekturnem vzorcu MVC.

#### Atributi

| Ime atributa | Podatkovni tip(če ni očiten) | Zaloga vrednosti(če ni očitna) | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| listings | List\<> | Listing | Lista posameznih oglasov, ki bodo prikazani na strani |


#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
|---|---|---|---| 
| getLocation() |                         - | List\<float> | Pridobi uporabnikovo lokacijo |
| showErrorNoListings()  |                - | void | - |
| search() | weight: List\<int>,<br> distanceMax: int,<br> lat: float,<br> float: float | List\<Listing> | - |
| openListingDetails() |     listingId: str | void | - |
| showErrorLocationPermissionRequired() | - | void | - |
| adminDeleteListing() |     listingId: str | bool | Administratorju omogoči izbris oglasa |

__________________________________________________________________________
<br>





### ListingsAPI

Ta razred skrbi za dostopanje do entitetnega modela Listing. Omogoča spreminjanje in pridobivanje vnosov oglasov. Gre za **krmilnik** v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode                      | Imena in tipi parametrov                                                   | Tip rezultata  | Pomen (če ni očiten)                               |
|:--------------------------------|:---------------------------------------------------------------------------|:---------------|:---------------------------------------------------|
| search()                        | weight: List\<int>,<br> distanceMax: int,<br> lat: float,<br> float: float | List\<Listing> | -                                                  |
| getListingDetails()             | listingId: str                                                             | Listing        | -                                                  |
| addRequest()                    | listingId: str,<br> userId: str                                            | bool           | -                                           |
| addSoftApply()                  | listingId: str,<br> userId: str                                            | bool           | Doda mehko prijavo sprehajalca na nek oglas |
| confirmWalker()                 | listingId: str,<br> userId: str                                            | bool           | Potrdi enega od uporabnikov kot sprehajalca   |
| getMyListings()                 | userId: str                                                                | List\<Listing> | Pridobi uporabnikove objavljene oglase             |
| getAppliedListings()            | userId: str                                                                | List\<Listing> | Pridobi uporabnikove za sprehod prijavljene oglase |
| getActiveListingsConversation() | userId1: str,<br> userId2: str                                             |   List\<Listing>     | Pridobijo se oglasi, ki jih vrneta funkciji getMyListingsByApplied() in getAppliedListingsByOwner() |
| getMyListingsByApplied()        | ownerId: str,<br> walkerId: str                                            | List\<Listing>       | Pridobijo se objavljeni oglasi lastnika z ownerId, na katere je prijavljen sprehajalec walkerId. |
| getAppliedListingsByOwner()     | walkerId: str,<br> ownerId: str                                            | List\<Listing>       | Pridobijo se oglasi na katere je prijavljen sprehajalec walkerId in lastnik oglasov je ownerId.                                            |
| adminDeleteListing()            | listingId: str                                                             | status       | Izbris oglasa                                      |
| getLocationText()               | lat: float,<br> lon: float                                                 | str            | Iz koordinat pridobi tekst naslova oglasa          |

__________________________________________________________________________
<br>

### Listing

Ta razred skrbi za shranjevanje, urejanja in pridobivanje podatkov o oglasih. Gre za **model** v arhitekturnem vzorcu MVC.

#### Atributi

| Ime atributa | Podatkovni tip(če ni očiten) | Zaloga vrednosti(če ni očitna) | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| title           | str      | - | - |
| description     | str      | - | - |
| dateStart       | dateTime | - | - |
| dateEnd         | dateTime | - | - |
| locationCoordinatesLon | float | - | - |
| locationCoordinatesLat | float | - | - |
| locationText       | str   | - | - |
| dogId              | str   | - | - |
| ownerId            | str   | - | - |
| interestedWalkersIds  | List\<str> | - | Seznam idjev sprehajalcev prijavljenih na oglas |
| softAppliedWalkersIds | List\<str> | - | Seznam idjev sprehajalcev, ki so kontaktirali lastnika, vendar se še niso prijavili na oglas. |
| confirmedWalker    | str   | - | Id potrjenega sprehajalca |

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| addInterestedWalker() | listingId: str,<br> userId: str | List\<str> | Ko se sprehajalec prijavi na oglas, se to zapiše. |
| addSoftApplyWalker()  | listingId: str,<br> userId: str | List\<str> | Sprehajalec pošlje sporočilo še preden pošlje prošnjo za prijavo na oglas. |

__________________________________________________________________________
<br>

### ConfirmedListingState, ConfirmedListing in UnconfirmedListing

Uporabili smo načrtovalski vzorec State, saj imamo objekt razreda Listing, ki uporablja različne metode glede na stanje v katerem je objekt. Listing ima različne metode glede na status oglasa, ki je lahko confirmed oz. unconfirmed. Če je sprehajalec potrjen, lahko ocenimo sprehajalca, če sprehajalec še ni potrjen, sprehajalca ne moremo oceniti. Po klicu metode confirmWalker(), oglas nima več metod addInterestedWalker(), addSoftApplyWalker() in confirmWalker(), pridobi pa metodo leaveReview().	


### ListingDetailsView

V tem pogledu lahko pregledujemo podrobnosti objav. Gre za pogled v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| imInterested() | - | void | Uporabnik se prijavi na oglas |
| deleteListing() | - | void | Administrator lahko pobriše oglas. |

__________________________________________________________________________
<br>


### ListingDetails

Ta razred se uporablja za pridobivanje podrobnosti oglasov in odpiranje pogovorov z lastniki. Gre za **krmilnik** v arhitekturnem vzorcu MVC.

#### Atributi

| Ime atributa | Podatkovni tip(če ni očiten) | Zaloga vrednosti(če ni očitna) | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| title             | str | -   | - |
| description       | str | -   | - |
| dateStart         | dateTime  | - | - |
| dateEnd           | dateTime  | - | - |
| locationText      | str | -   | - |
| ownerName         | str | -   | - |
| ownerDescription  | str | -   | - |
| ownerReview       | float | -  | - |
| dogName           | str | -   | - |
| dogDescription    | str | -   | - |
| dogWeight         | int | -   | - |

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| openConversation() | conversationId: str,<br> listingId: str | void | Odpre pogovor z lastnikom |
| getListingDetails() | listingId: str | Listing | - |
| getOwnerInfo()     | ownerId: str | Dog | - |
| getDogInfo()       | dogId: str | User | - |


__________________________________________________________________________
<br>



### ListingsView

Ta pogled omogoča uporabniko pregled prijavljenih in objavljenih oglasov. Gre za **pogled** v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| openAddListing()      | - | void | Odpre pogled za dodajanje oglasov |
| openMyListings()      | - | void | Odpre zavihek My Listings |
| openAppliedListings() | - | void | Odpre zavihek Applied |
| showAppliedUsers()    | - | void | Odpre Inbox pogled s prijavljenimi ljudmi |
| leaveFeedback()       | - | void | Omogoči dodajanje ocene uporabnika |
| messageOwner()        | - | void | Odpre pogovor z lastnikom |

__________________________________________________________________________
<br>


### ListingsViewController

Ta kontrolni razred nalaga prijavljene in objavljane oglase ter na splošno podpira delovanje pogleda ListingsView. Gre za **krmilnik** v arhitekturnem vzorcu MVC.

#### Atributi

| Ime atributa | Podatkovni tip(če ni očiten) | Zaloga vrednosti(če ni očitna) | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| myListings | List\<Listing> | - | - |
| appliedListings | List\<Listing> | - | - |

#### Nesamoumevne metode

| Ime metode           | Imena in tipi parametrov                                                                                                                          | Tip rezultata  | Pomen (če ni očiten)                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------- |
| openAddListing()     | -                                                                                                                                                 | void           | Odpre pogled za dodajanje oglasov         |
| getAppliedListings() | userId: str                                                                                                                                       | List\<Listing> | -                                         |
| showAppliedUsers()   | -                                                                                                                                                 | void           | Odpre Inbox pogled s prijavljenimi ljudmi |
| leaveFeedback()      | rating: int,<br> userId: str                                                                                                                      | void           | Omogoči dodajanje ocene uporabnika        |
| getMyListings()      | userId: str                                                                                                                                       | List\<Listing> | -                                         |
| messageOwner()       | -                                                                                                                                                 | void           | Odpre pogovor z lastnikom                 |
| publishListing()     | title:string,<br> dogId: str,<br> desc: str,<br> datetimeFrom: datetime,<br> datetimeTo: datetime,<br> locationLon: float,<br> locationLat: float | bool           | Dodajanje oglasa                          |
| getLocation()        | -                                                                                                                                                 | List\<float>   | Pridobi uporabnikovo lokacijo             |
| getUserDogs()        | -                                                                                                                                                 | List\<Dog>     | Pridobi uporabnikove pse                  |

__________________________________________________________________________
<br>


### NewListingView

Ta razred omogoča uporabniku dodajanje novih oglasov. Gre za **pogled** v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| publishListing() | title: str,<br> dogId: str,<br> desc: str,<br> datetimeFrom: datetime,<br> datetimeTo: datetime | void | - |

__________________________________________________________________________
<br>


### LeaveFeedbackView

Ta razred omogoča uporabniku oddajo ocene uporanika. Gre za **pogled** v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| submitFeedback() | - | void | Dodaj oceno uporabniku |

__________________________________________________________________________
<br>



### NavigationMenuView

Ta razred uporabniku omogoča premikanje med glavnimi razdelki v aplikaciji. Nahaja se na dnu vsakega pogleda. Gre za **pogled** v arhitekturnem vzorcu MVC. Opomba: vsi ostali pogledi imajo dostop do tega pogleda, vendar zaradi preglednosti to ni prikazano na razrednem diagramu.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| explore() | - | void | Odpre ExploreView |
| inbox() | - | void | Odpre InboxView |
| blog() | - | void | Odpre BlogView |
| listings() | - | void | Odpre ListingsView |
| settings() | - | void | Odpre SettingsView |

__________________________________________________________________________
<br>

### NavigationMenu

Ta razred je podporni razred za pogled NavigationMenuView. Omogoča povezavo z ostalimi podpornimi razredi, ki odpirajo poglede glavnih razdelkov aplikacije. Gre za **krmilnik** v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| openExplore() | - | void | Odpre ExploreView |
| openInbox() | - | void | Odpre InboxView |
| openBlog() | - | void | Odpre BlogView |
| openListings() | - | void | Odpre ListingsView |
| openSettings() | - | void | Odpre SettingsView |

__________________________________________________________________________
<br>




### LoginRegisterController

Ta razred je podporni razred za pogleda RegisterView in LoginView. Gre za **krmilnik** v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| checkEmail()      | mail: str | bool | Preveri če je email veljavne oblike |
| checkPassword()   | password: str | bool | Preveri če je geslo veljavne oblike |
| registerUser()    | firstName: str,<br> lastName: str,<br> email: str,<br> password: str | bool | - |
| signInUser()      | email: str, password: str | bool | - |

__________________________________________________________________________
<br>


### UserAPI

Ta razred skrbi za dostopanje do entitetnega modela User. Gre za **krmilnik** v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| registerUser()   | firstName: str,<br> lastName: str,<br> email: str,<br> password: str | token | - |
| signInUser()     | email: str,<br> password: str | token | - |
| checkEmail()     | mail: str          | bool | Preveri če je email že zaseden |
| checkPassword()  | password: str      | bool | Preveri če je geslo veljavne oblike |
| validateJwt()    | jwt: str           | str | - |
| addReviewScore() | userId: str,<br> review: float  | status | - |
| editProfile()    | userId: str,<br> fstName: str,<br> lstName: str,<br> email: str,<br> about: str  | status | - |
| becomeReporter() | userId: str        | status | - |

__________________________________________________________________________
<br>





### BecomeReporterView

Ta razred omogoča uporabniku, da postane pisec bloga, če to še ni. Gre za **pogled** v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| becomeReporter() | - | void | - |

__________________________________________________________________________
<br>

### BecomeReporter

Ta razred je podporni razred za pogled BecomeReporterView. Omogoča da uporabnik postane pisec bloga. Gre za **krmilnik** v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| becomeReporter() | userId: str | status | - |

__________________________________________________________________________
<br>





### User

Ta razred skrbi za shranjevanje, urejanja in pridobivanje podatkov uporabnikov. Gre za **model** v arhitekturnem vzorcu MVC.

#### Atributi

| Ime atributa | Podatkovni tip(če ni očiten) | Zaloga vrednosti(če ni očitna) | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| userId | str | - | - |
| name | str | - | - |
| lastname | str | - | - |
| email | str | - | - |
| hashedPass | str | - | - |
| description | str | - | - |
| reviewScores | List\<int> | - | Seznam vseh ocen uporabnika |
| reviewScore | float | - | Povprečna ocena uporabnika |
| isReporter | bool | - | Status pisca |
| image | bytes | - | - |

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| verifyCredentials() | email: str,<br> password: str | str{userId} | - |
| addReviewScore()    | score: int,<br> userId: str | void | - |

__________________________________________________________________________
<br>


### RegisterView

Ta razred omogoča uporabniku, da se registrira. Gre za **pogled** v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| register() | - | void | - |
| openLogin() | - | void | - |

__________________________________________________________________________
<br>



### LoginView

Ta razred omogoča uporabniku, da se prijavi v aplikacijo. Gre za **pogled** v arhitekturnem vzorcu MVC.

#### Atributi

Ta razred nima atributov.

#### Nesamoumevne metode

| Ime metode | Imena in tipi parametrov | Tip rezultata | Pomen (če ni očiten) |
| --- | --- | --- | --- |
| login() | - | void | - |
| openRegistration() | - | void | - |

__________________________________________________________________________
<br>



TODO





## 3. Načrt obnašanja

**TO-DO**

- Za izdelavo načrta obnašanja lahko uporabite:
  - diagrame zaporedja,
  - končne avtomate,
  - diagrame aktivnosti,
  - diagrame stanj in
  - psevdokodo.
