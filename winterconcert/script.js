const scriptContent = `
<div class="scene">
    <p class="scene-heading">Song For a Winter's Night<br>Winter Concert, 2024</p>
<div class="scene">
</div>
<p class="scene-heading">Welcome</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 1}'>Welcome lights - audience enters</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 2}'>Opening video</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 3}'>Spotlights for opening words</p>
</div>
<div class="scene">
    <p class="scene-heading">1. Waltz of the Flowers</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 4}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 5}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">2. Dance of the Sugar Plum Fairy</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 6}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 7}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">3. Russian Dance</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 8}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 9}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">4. Swan Lake</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 10}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 11}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">5. Last Christmas</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 12}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 13}'>Last Christmas I gave you my heart,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 14}'>But the very next day you gave it away.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 15}'>This year, to save me from tears,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 16}'>I'll give it to someone special.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 17}'>Once bitten and twice shy.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 18}'>I keep my distance, but you still catch my eye.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 19}'>Tell me baby, do you recognize me?</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 20}'>Well, it's been a year, it doesn't surprise me.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 21}'>"Happy Christmas" I wrapped it up and sent it</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 22}'>With a note saying, "I love you", I meant it.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 23}'>Now I know what a fool I've been</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 24}'>But if you kissed me now, I know you'd fool me again.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 25}'>Last Christmas I gave you my heart,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 26}'>But the very next day you gave it away.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 27}'>This year, to save me from tears,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 28}'>I'll give it to someone special.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 29}'>A crowded room, friends with tired eyes.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 30}'>I am hiding from you and your soul of ice.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 31}'>My Gosh, I thought you were someone to rely on.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 32}'>Me? I guess I was a shoulder to cry on.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 33}'>A face on another with a fire in his heart.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 34}'>A man under cover but you tore me apart.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 35}'>Ooh, ooh, now I've found a real love, you'll never fool me again.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 36}'>Last Christmas I gave you my heart,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 37}'>But the very next day you gave it away.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 38}'>This year, to save me from tears,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 39}'>I'll give it to someone special.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 40}'>Last Christmas I gave you my heart,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 41}'>But the very next day you gave it away.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 42}'>This year, to save me from tears,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 43}'>I'll give it to someone special.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 44}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">6. Once Upon a December</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 45}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 46}'>Dancing bears, painted wings</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 47}'>Things I almost remember</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 48}'>And a song someone sings</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 49}'>Once upon a December</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 50}'>Someone holds me safe and warm</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 51}'>Horses prance through a silver storm</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 52}'>Figures dancing gracefully</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 53}'>Across my memory</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 54}'>Someone holds me safe and warm</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 55}'>Horses prance through a silver storm</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 56}'>Figures dancing gracefully</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 57}'>Across my memory</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 58}'>Far away, long ago</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 59}'>Glowing dim as an ember</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 60}'>Things my heart used to know</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 61}'>Things it yearns to remember</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 62}'>Once upon a December</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 63}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">7. Winter Bells</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 64}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 65}'>Bells on the sleigh</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 66}'>Jingle away.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 67}'>Merry and clear</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 68}'>Winter is here.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 69}'>Frost on the ground,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 70}'>Friends all around,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 71}'>Long winter nights</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 72}'>Warm glowing lights.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 73}'>Winter of fun, sing ev'ryone,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 74}'>Songs filled with cheer for all to hear.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 75}'>Ring, jingle bells,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 76}'>Jing, jingle bells,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 77}'>Festive and bright,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 78}'>Filled with delight.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 79}'>Bells ring-a-ling-ing,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 80}'>Carolers singing,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 81}'>Chill in the air, Joy ev'rywhere.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 82}'>All around us there is winter wonder.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 83}'>All around us there is winter wonder.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 84}'>Ring, jingle bells,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 85}'>Jing, jingle bells,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 86}'>Children at play,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 87}'>Cold winter day,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 88}'>Men made of snow from head to toe.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 89}'>Smiles ev'rywhere,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 90}'>mem'ries to share,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 91}'>Joy all around!</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 92}'>Fa la la la</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 93}'>Bells on the sleigh</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 94}'>Jingle away.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 95}'>Merry and clear</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 96}'>Winter is here.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 97}'>Frost on the ground,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 98}'>Friends all around, Long winter nights</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 99}'>Warm glowing lights.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 100}'>Winter of fun, sing ev'ryone,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 101}'>Songs filled with cheer for all to hear.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 102}'>Ring, jingle bells,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 103}'>Jing, jingle bells,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 104}'>Festive and bright,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 105}'>Filled with delight.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 106}'>Bells ring-a-ling-ing,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 107}'>Carolers singing,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 108}'>Chill in the air, Joy ev'rywhere.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 109}'>All around us there is winter wonder.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 110}'>All around us there is winter wonder.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 111}'>Ring, jingle bells,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 112}'>Jing, jingle bells,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 113}'>Children at play,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 114}'>Cold winter day,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 115}'>Men made of snow from head to toe.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 116}'>Smiles ev'rywhere,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 117}'>mem'ries to share,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 118}'>Joy all around!</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 119}'>Fa la la la</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 120}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
<p class="scene-heading">8. Gloria in Excelsis Deo</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 121}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 122}'>Gloria, gloria,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 123}'>gloria, gloria</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 124}'>in excelsis Deo,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 125}'>in excelsis Deo.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 126}'>Gloria, gloria,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 1, "velocity": 127}'>gloria, gloria</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 1}'>in excelsis Deo.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 2}'>Gloria, gloria</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 3}'>in excelsis Deo.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 4}'>Gloria in excelsis,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 5}'>gloria in excelsis Deo,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 6}'>gloria in excelsis Deo,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 7}'>in excelsis.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 8}'>Gloria in excelsis Deo.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 9}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
<p class="scene-heading">9. Laudamus Te</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 10}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 11}'>Laudamus te,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 12}'>benedicimus te,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 13}'>adoramus te,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 14}'>glorificamus te.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 15}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">10. Domine Deus - Rex Ceolestis</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 16}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 17}'>Domine Deus, Rex coelestis,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 18}'>Deus Pater omnipotens.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 19}'>Domine Fili unigenite, Jesu Christe.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 20}'>Domine Deus, Agnus Dei, Filius Patris.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 21}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">11. Domine Deus - Agnus Dei</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 22}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 23}'>Domine Deus, Agnus Dei,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 24}'>Filius patris</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 25}'>Domine Deus, Domine Deus, Agnus Dei,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 26}'>Filius patris</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 27}'>Qui tollis peccata</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 28}'>Domine Deus rex Coelestis</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 29}'>Qui tollis peccata</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 30}'>Domine Deus fili unigenite</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 31}'>Qui tollis peccata</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 32}'>Domine Deus, Agnus Dei,</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 33}'>Filius patris</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 34}'>Qui tollis peccata mundi</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 35}'>miserere</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 36}'>Agnus Dei</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 37}'>miserere</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 38}'>Filius patris</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 39}'>miserere nobis</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 40}'>miserere miserere</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 41}'>miserere nobis</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 42}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">12. Sound the Trumpet</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 43}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 44}'>Sound the trumpet till around</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 45}'>You make the listening shores rebound.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 46}'>On the sprightly oboe play.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 47}'>All the instruments of joy</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 48}'>That skillful numbers can employ</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 49}'>To celebrate the glory of this day.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 50}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">13. DJ Play a Christmas Song</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 51}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 52}'>No one on the streets and the city is quiet</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 53}'>I should be asleep by the heat of the fire</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 54}'>But I'm on my way out</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 55}'>And I'm gonna stay out</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 56}'>I can feel the pulse as I walk in the door</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 57}'>Take me through the crowd to the middle of the floor</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 58}'>The red and the green lights</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 59}'>Are hitting me just right</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 60}'>Nothing more, nothing less</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 61}'>I got one request</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 62}'>DJ, play a Christmas song</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 63}'>I wanna be dancing all night long</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 64}'>It's cold outside, but it's warm in here</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 65}'>And that's the only thing I want this year</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 66}'>DJ, play a Christmas song</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 67}'>I wanna be dancing all night long</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 68}'>It's tough outside, but it's love in here</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 69}'>And that's the only thing I want this year</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 70}'>Everybody here must be feeling the same</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 71}'>Need a little joy and a little escape</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 72}'>Feeling a spirit</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 73}'>You just wanna hear it</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 74}'>Nothing more, nothing less</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 75}'>I got one request</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 76}'>DJ, play a Christmas song</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 77}'>I wanna be dancing all night long</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 78}'>It's cold outside, but it's warm in here</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 79}'>And that's the only thing I want this year</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 80}'>DJ, play a Christmas song</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 81}'>I wanna be dancing all night long</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 82}'>It's tough outside, but it's love in here</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 83}'>And that's the only thing I want this year</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 84}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">14. Christmas Every Day</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 85}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 86}'>I wish it could be Christmas everyday</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 87}'>When the snowman brings the snow</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 88}'>Well he just might like to know</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 89}'>He's put a great big smile on somebody's face</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 90}'>If you jump into your bed</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 91}'>Quickly cover up your head</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 92}'>Don't you lock the doors</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 93}'>You know that sweet Santa Claus is on the way</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 94}'>Oh well I wish it could be Christmas everyday</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 95}'>When the kids start singing and the band begins to play</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 96}'>Oh I wish it could be Christmas everyday</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 97}'>Let the bells ring out for Christmas</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 98}'>When we're skating in the park</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 99}'>If the snow cloud makes it dark</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 100}'>Then your rosy cheeks are gonna light my merry way</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 101}'>Now the frosty paws appear</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 102}'>And they've frozen up my ear</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 103}'>So we'll lie by the fire</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 104}'>Till the sleet simply knocks 'em all the way</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 105}'>Well I wish it could be Christmas everyday</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 106}'>When the kids start singing and the band begins to play</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 107}'>Oh I wish it could be Christmas everyday</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 108}'>So let the bells ring out for Christmas</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 109}'>When the snowman brings the snow</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 110}'>Well he just might like to know</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 111}'>He's put a great big smile on somebody's face</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 112}'>So if Santa brings that sleigh</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 113}'>All along the milky way</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 114}'>I'll sign my name on the rooftop in the snow</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 115}'>Then he may decide to stay</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 116}'>Well I wish it could be Christmas everyday</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 117}'>When the kids start singing and the band begins to play</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 118}'>Oh I wish it could be Christmas everyday</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 119}'>So let the bells ring out for Christmas</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 120}'>Oh well I wish it could be Christmas everyday</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 121}'>When the kids start singing and the band begins to play</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 122}'>Oh I wish it could be Christmas everyday</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 123}'>Let the bells ring out for Christmas</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 124}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">15. Shine on Me</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 125}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 126}'>Shine on me, oh shine on me</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 2, "velocity": 127}'>I wonder if the lighthouse will shine on me</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 1}'>Shine on me, oh shine on me</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 2}'>I wonder if the lighthouse will shine on me</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 3}'>It is a light shinin' above it is shinin' above in the heavens for me?</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 4}'>I'm wonderin' wonderin' wonderin'</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 5}'>If there's a light that is shinin' above in the heavens for me?</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 6}'>Shine on me, oh shine on me</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 7}'>I wonder if the lighthouse will shine on me</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 8}'>Will it shine on me!</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 9}'>**Scene End** (on applause)</p>
</div>
</div>
<div class="scene">
    <p class="scene-heading">16. Sleigh Ride</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 10}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 11}'>Just hear those sleigh bells jingling Ring-ting-tingling too</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 12}'>Come on, it's lovely weather For a sleigh ride together with you.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 13}'>Outside, the snow is falling, And friends are calling, "Yoo hoo"</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 14}'>Come on, it's lovely weather For a sleigh ride together with you.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 15}'>Our cheeks are nice and rosy And comfy cozy are we</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 16}'>We're snuggled up together Like two birds of a feather would be.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 17}'>Let's take that road before us And sing a chorus or two</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 18}'>Come on, it's lovely weather For a sleigh ride together with you.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 19}'>Just hear those sleigh bells jingling Ring-ting-tingling too</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 20}'>Come on, it's lovely weather For a sleigh ride together with you.</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 21}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">17. Song for a Winter's Night</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 22}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 23}'>The lamp is burning low upon my tabletop</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 24}'>The snow is softly falling</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 25}'>The air is still in the silence of my room</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 26}'>I hear your voice softly calling</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 27}'>If I could only have you near</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 28}'>To breathe a sigh or two</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 29}'>I would be happy just to hold the hands I love</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 30}'>On this winter night with you</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 31}'>The smoke is rising in the shadows overhead</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 32}'>My glass is almost empty</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 33}'>I read again between the lines upon each page</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 34}'>The words of love you sent me</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 35}'>If I could know within my heart, that you were lonely too</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 36}'>I would be happy just to hold the hands I love</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 37}'>On this winter night with you</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 38}'>The fire is dying now, my lamp is growing dim</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 39}'>The shades of night are lifting</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 40}'>The morning light steals across my windowpane</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 41}'>Where webs of snow are drifting</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 42}'>If I could only have you near, to breathe a sigh or two</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 43}'>I would be happy just to hold the hands I love</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 44}'>And to be once again with you</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 45}'>On this winter night with you</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 46}'>**Scene End** (on applause)</p>
</div>
<div class="scene">
    <p class="scene-heading">Conclusion</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 49}'>Final Bows</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 50}'>Thank yous, flowers, etc.</p>
</div>
<div class="scene">
    <p class="scene-heading">Auld Lang Syne (Possible Additional Song)</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 47}'>**Scene Start**</p>
    <p class="dialogue" data-midi='{"channel": 1, "note": 3, "velocity": 48}'>**Scene End** (on applause)</p>
</div>
`;