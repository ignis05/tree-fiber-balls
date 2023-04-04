# Zadanie: Wizualizacja symulacji zderzeń

## Uruchomienie projektu:

1. Instalacja pakietów przez `npm i`
2. Uruchomienie wersji developerskiej przez `npm run start` lub budowa pod produkcję przez `npm run build`  
   <br/>

Build hostowany jest również na github pages: https://ignis05.github.io/tree-fiber-balls/

<hr/>

## Napotkane problemy:

- Aktualizacje prędkości i pozycji odbywają się co klatkę, przy użyciu delty zegara w celu utrzymania poprawnego zachowania przy skokach klatek. Przy przełączaniu karty, po powrocie i wznowieniu animacji, delta potrafi być na poziomie parunastu sekund, co powoduje przeskoczenie kul daleko poza krawędzie symulacji. W celu uniknięcia takiego zachowania, maksymalna wartość delta została ograniczona do 0.1s, co za to może spowodować spadki prędkości animacji na urządzeniach niepotrafiących utrzymać 10FPS.
- Jedyną siłą w układzie jest siła grawitacji. Kolizje z krawędzią oraz z innymi kulami nie powodują żadnych strat energii, jedynie zmianę kierunku lub bezstratny jej transfer między kulami. W rezultacie działanie układu nie spowalnia z czasem, a wręcz potrafi przyspieszyć przez błędy zaokrągleń i uproszczeń obliczeń fizycznych.
- Układ znajduje się w komponencie `CollisionSim`. Pozycję układu we wszystkich 3 osiach można ustawić za pomocą jego propów, jednak układ zawsze operuje w płaszczyźnie x-y, ignorując oś z. Konsekwencją tego jest brak możliwości obrotu układu względem żadnej z osi.
- Początkowa wersja systemu kolizji między kulami powodowała problemy gdy kule pojawiły się wewnątrz siebie lub zbyt głęboko zbliżyły się środkami przed odbiciem. Poprawiony system kolizji "teleportuje" kulę do punktu idealnego styku po obliczeniu nowych prędkości. Wyeliminowało to przypadki "sklejenia" kul.
- Początkowo przy tworzeniu kolizji między kulami, zastosowałem zwykłe `THREE.Vector3.reflect()`. Jednak po głębszym przeanalizowaniu zauważyłem, że ta metoda na kolizję nie przenosi energii między kulami, jedynie zmienia kierunek ich ruchu: obie traktują się wzajemnie jako statyczny nieporuszalny obiekt. Kolizję poprawiłem, używając dokładnego wzoru na zderzenie sprężyste z transferem energii.
- Pozycję, prędkości i kolizję wszystkich kul są przeliczane w jednej funkcji `useFrame`. Kule są zbierane z `state.scene.children` dzięki identyfikującemu je parametrowi w `userData` mesh. W tym samym miejscu jest też zapisana ich prędkość. Takie rozwiązanie upraszcza dostęp do wszystkich kul oraz aktualizacje ich prędkości, jednak przy większym projekcie należy się upewnić, że identyfikujący je parametr `mesh.userData.customType` nie powtarza się nigdzie w projekcie. Przy bardzo dużym projekcie zawierającym ogromną ilość elementów na jednej scenie, można by też rozważyć wpływ filtrowania tablicy `scene.children` na wydajność.
- Próba użycia `THREE.Line` do narysowania okręgu granicznego powodowała błąd. Po wyszukaniu problemu dowiedziałem się, że komponent `line` jest wbudowanym komponentem jsx, i w celu wykorzystania komponentu `THREE.Line` należy nadać mu alternatywny alias np. `line_`, co rozwiązało mój problem.
