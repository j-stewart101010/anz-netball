/*global define*/
define([
      'jquery',
], function ($) {

var model = {

//

  content:[
     
     // the start
     {id:"startx", gridImage:["images/100_moments_small.png"], copy:"", color:"#46374a"},
     
     // 10
     {user:"Emma", 
      xmas:"true", 
      lockedImage:"images/adventNo_01.png",
      loaction:"Brighton",
      id:"xmas/01dec",
      rfid:"December1st", 
      gridImage:["images/01_Dec.png"], 
      copy:"IN-STORE SING SONG",  
      story:"I was in McDonaldâ€™s when a group of carol singers came by and started singing. It made my day!", 
      type:"big_ham", 
      color:"#004f8b", 
      colorInner:"#006aba", 
      textColor1:"#FFFFFF", 
      textColor2:"#6FC0E9", 
      scale:0.7},

      {user:"Dez", 
      xmas:"true", 
      lockedImage:"images/adventNo_02.png",
      loaction:"Norfolk",
      id:"xmas/02dec",
      rfid:"December2nd", 
      gridImage:["images/02_Dec.png"], 
      copy:"STANDING OVATION",  
      story:"After seeing my little bro in his Christmas play, I took him for a celebratory Happy Mealâ„¢", 
      type:"big_ham", 
      color:"#78b8dd",  
      colorInner:"#9fcde7", 
      textColor1:"#FFFFFF", 
      textColor2:"#1F69B3", 
      scale:1},

      {user:"Nat", 
      xmas:"true", 
      lockedImage:"images/adventNo_03.png",
      loaction:"Ferndown",
      id:"xmas/03dec",
      rfid:"December3rd", 
      gridImage:["images/03_Dec.png"], 
      copy:"GOOD TIMES",  
      story:"I always catch up with old school friends on Christmas Eve. We swap gifts before heading off for a Big MacÂ®", 
      type:"big_ham", 
      color:"#0e5433", 
      colorInner:"#1b6a45", 
      textColor1:"#FFFFFF", 
      textColor2:"#A0CDE5", 
      scale:1},

      {user:"Dennis", 
      xmas:"true", 
      lockedImage:"images/adventNo_04.png",
      loaction:"London",
      id:"xmas/04dec",
      rfid:"December4th", 
      gridImage:["images/04_Dec.png"], 
      copy:"QUICK FIX",  
      story:"I once broke down in the snow but thankfully next to a McDâ€™s. I had a Hot Apple Pie while I waited for the mechanic.", 
      type:"big_ham", 
      color:"#b0c6c1", 
      colorInner:"#c3e4dc", 
      textColor1:"#5D9288", 
      textColor2:"#88152D", 
      scale:0.8},

      {user:"Felicity", 
      xmas:"true", 
      lockedImage:"images/adventNo_05.png",
      loaction:"London",
      id:"xmas/05dec",
      rfid:"December5th", 
      gridImage:["images/05_Dec.png"], 
      copy:"GREAT GRAN",  
      story:"My Granny comes down to visit me in London once a year to do her Christmas shopping. She always warms up with a Festive Pie.", 
      type:"big_ham", 
      color:"#ece7ac", 
      colorInner:"#fdf6a7", 
      textColor1:"#808284", 
      textColor2:"#CE1F33", 
      scale:1},

      {user:"Shazia", 
      xmas:"true", 
      lockedImage:"images/adventNo_06.png",
      loaction:"Birmingham",
      id:"xmas/06dec",
      rfid:"December6th", 
      gridImage:["images/06_Dec.png"], 
      copy:"HOLIDAY ROMANCE",  
      story:"We were in McDonaldâ€™s when my boyfriend pulled out some mistletoe. I gave him a big kiss right there ;-)", 
      type:"big_ham", 
      color:"#78b8dd",  
      colorInner:"#9fcde7", 
      textColor1:"#FFFFFF", 
      textColor2:"#1F69B3", 
      scale:0.8},

      {user:"Rachel", 
      xmas:"true", 
      lockedImage:"images/adventNo_07.png",
      loaction:"Birmingham",
      id:"xmas/07dec",
      rfid:"December7th", 
      gridImage:["images/07_Dec.png"], 
      copy:"BREAKFAST IN BED",  
      story:"Woke up to find my boyfriend had gone out and got me a Big Breakfast and a yummy Hot Chocolate. Great for a frosty morning.", 
      type:"big_ham", 
      color:"#ab1a2e", 
      colorInner:"#ce132c", 
      textColor1:"#FFFFFF", 
      textColor2:"#E0E67A",
      scale:0.7},

      {user:"Stevo", 
      xmas:"true", 
      lockedImage:"images/adventNo_08.png",
      loaction:"London",
      id:"xmas/08dec",
      rfid:"December8th", 
      gridImage:["images/08_Dec.png"], 
      copy:"HO HO HO",  
      story:"I once did a charity run with a few mates. We were all dressed as Santas and went for a well-earned McDonaldâ€™s afterwards.", 
      type:"big_ham", 
      color:"#d0d15d", 
      colorInner:"#e3e46e", 
      textColor1:"#595959", 
      textColor2:"#88152D", 
      scale:1},

      {user:"Ali", 
      xmas:"true", 
      lockedImage:"images/adventNo_09.png",
      loaction:"Hitchin",
      id:"xmas/09dec",
      rfid:"December9th", 
      gridImage:["images/09_Dec.png"], 
      copy:"ALL WRAPPED UP",  
      story:"I ran out of wrapping paper so used a McDâ€™s takeaway bag to wrap my brotherâ€™s pressie. He laughed his head off!!", 
      type:"big_ham", 
      color:"#d0d15d", 
      colorInner:"#e3e46e", 
      textColor1:"#595959", 
      textColor2:"#88152D", 
      scale:0.7},

      {user:"Philip", 
      xmas:"true", 
      lockedImage:"images/adventNo_10.png",
      loaction:"Edinburgh",
      id:"xmas/10dec",
      rfid:"December10th", 
      gridImage:["images/10_Dec.png"], 
      copy:"SNOW WAY",  
      story:"Woke up to find I was snowed in so had a day off. Still managed to get to a McDonaldâ€™s though!", 
      type:"big_ham", 
      color:"#78b8dd",  
      colorInner:"#9fcde7", 
      textColor1:"#FFFFFF", 
      textColor2:"#BC263E", 
      scale:0.8},

      {user:"Fiona", 
      xmas:"true", 
      lockedImage:"images/adventNo_11.png",
      loaction:"London",
      id:"xmas/11dec",
      rfid:"December11th", 
      gridImage:["images/11_Dec.png"], 
      copy:"HOT & COLD",  
      story:"I love popping to McDonaldâ€™s for a Hot Chocolate after ice-skating in central London.", 
      type:"big_ham", 
      color:"#b0c6c1", 
      colorInner:"#c3e4dc", 
      textColor1:"#5D9288", 
      textColor2:"#88152D", 
      scale:0.7},

      {user:"Alice", 
      xmas:"true", 
      lockedImage:"images/adventNo_12.png",
      loaction:"High Wycombe",
      id:"xmas/12dec",
      rfid:"December12th", 
      gridImage:["images/12_Dec.png"], 
      copy:"LIGHTEN UP",  
      story:"Went to see the Xmas lights being switched on in town â€“ it was freezing so my boyf grabbed us some Fries and a Coffee... warmed us right up!", 
      type:"big_ham", 
      color:"#ab1a2e", 
      colorInner:"#ce132c", 
      textColor1:"#FFFFFF", 
      textColor2:"#E0E67A", 
      scale:1},

      {user:"Gubbsy", 
      xmas:"true", 
      lockedImage:"images/adventNo_13.png",
      loaction:"Nottingham",
      id:"xmas/13dec",
      rfid:"December13th", 
      gridImage:["images/13_Dec.png"], 
      copy:"BOXING DAY BIG MACÂ®",  
      story:"My present to myself is a Boxing Day visit to the cinema followed by a Big MacÂ®. Happy Christmas to me!", 
      type:"big_ham", 
      color:"#004f8b", 
      colorInner:"#006aba", 
      textColor1:"#FFFFFF", 
      textColor2:"#6FC0E9", 
      scale:1},

      {user:"Cath", 
      xmas:"true", 
      lockedImage:"images/adventNo_14.png",
      loaction:"London",
      id:"xmas/14dec",
      rfid:"December14th", 
      gridImage:["images/14_Dec.png"], 
      copy:"PARTY SEASON",  
      story:"After a week of late nights and Christmas parties I popped into McDâ€™s for a Bacon & Egg McMuffinÂ® to keep me going. Yum!", 
      type:"big_ham", 
      color:"#ab1a2e", 
      colorInner:"#ce132c", 
      textColor1:"#FFFFFF", 
      textColor2:"#E0E67A", 
      scale:0.8},

      {user:"Rawling", 
      xmas:"true", 
      lockedImage:"images/adventNo_15.png",
      loaction:"Petersfield",
      id:"xmas/15dec",
      rfid:"December15th", 
      gridImage:["images/15_Dec.png"], 
      copy:"McDONALDâ€™S MEET UP",  
      story:"Itâ€™s a great meeting point when the whole familyâ€™s out doing Christmas shopping.", 
      type:"big_ham", 
      color:"#0e5433", 
      colorInner:"#1b6a45", 
      textColor1:"#FFFFFF", 
      textColor2:"#A0CDE5",
      scale:0.8},

      {user:"Ben", 
      xmas:"true", 
      lockedImage:"images/adventNo_16.png",
      loaction:"York",
      id:"xmas/16dec",
      rfid:"December16th", 
      gridImage:["images/16_Dec.png"], 
      copy:"WINTER WARM UP",  
      story:"When it's freezing cold and snowing hard, I pop into McDonald's to warm up with a Big MacÂ®.", 
      type:"big_ham", 
      color:"#78b8dd",  
      colorInner:"#9fcde7", 
      textColor1:"#FFFFFF", 
      textColor2:"#1F69B3", 
      scale:1},

      {user:"Will", 
      xmas:"true", 
      lockedImage:"images/adventNo_17.png",
      loaction:"Huddersfield",
      id:"xmas/17dec",
      rfid:"December17th", 
      gridImage:["images/17_Dec.png"], 
      copy:"PICK-ME-UPS",  
      story:"When I had the flu last Christmas, my wife bought me some Chicken McNuggetsÂ® to cheer me up.", 
      type:"big_ham", 
      color:"#0e5433", 
      colorInner:"#1b6a45", 
      textColor1:"#FFFFFF", 
      textColor2:"#A0CDE5",
      scale:0.8},

      {user:"Amber", 
      xmas:"true", 
      lockedImage:"images/adventNo_18.png",
      loaction:"Stockton-on-Tees",
      id:"xmas/18dec",
      rfid:"December18th", 
      gridImage:["images/18_Dec.png"], 
      copy:"SALE STOP-OFF",  
      story:"When we go Boxing Day sale shopping we pop into McD's to restore our energy!", 
      type:"big_ham", 
      color:"#004f8b", 
      colorInner:"#006aba", 
      textColor1:"#FFFFFF", 
      textColor2:"#6FC0E9",
      scale:1},

      {user:"Samantha", 
      xmas:"true", 
      lockedImage:"images/adventNo_19.png",
      loaction:"Torquay",
      id:"xmas/19dec",
      rfid:"December19th", 
      gridImage:["images/19_Dec.png"], 
      copy:"AMAZEBALLS",  
      story:"Every year I have an epic snowball fight with my four brothers. Loser buys everyone a McDâ€™s!", 
      type:"big_ham", 
      color:"#004f8b", 
      colorInner:"#006aba", 
      textColor1:"#FFFFFF", 
      textColor2:"#6FC0E9",
      scale:1},

      {user:"Jason", 
      xmas:"true", 
      lockedImage:"images/adventNo_20.png",
      loaction:"Wakefield",
      id:"xmas/20dec",
      rfid:"December20th", 
      gridImage:["images/20_Dec.png"], 
      copy:"COSY CHRISTMAS",  
      story:"Last Christmas Eve I came home from work with a Big MacÂ® meal and enjoyed it in front of a roaring fire. Very relaxing!", 
      type:"big_ham", 
      color:"#ece7ac", 
      colorInner:"#fdf6a7", 
      textColor1:"#808284", 
      textColor2:"#CE1F33", 
      scale:1},

      {user:"Phil", 
      xmas:"true", 
      lockedImage:"images/adventNo_21.png",
      loaction:"Newport",
      id:"xmas/21dec",
      rfid:"December21st", 
      gridImage:["images/21_Dec.png"], 
      copy:"I DIG IT",  
      story:"When it snows, I get the job of clearing my Grandadâ€™s driveway. I always get a McDâ€™s meal afterwards so I hope it will be a white Christmas!", 
      type:"big_ham", 
      color:"#b0c6c1", 
      colorInner:"#c3e4dc", 
      textColor1:"#5D9288", 
      textColor2:"#88152D",
      scale:1},

       {user:"Matthew", 
      xmas:"true", 
      lockedImage:"images/adventNo_22.png",
      loaction:"Cambridge",
      id:"xmas/22dec",
      rfid:"December22nd", 
      gridImage:["images/22_Dec.png"], 
      copy:"JUMPER FOR JOY",  
      story:"Everyone at work was wearing Christmas jumpers so we thought it would be fun all turning up at McDâ€™s wearing them. LOL", 
      type:"big_ham", 
      color:"#0e5433", 
      colorInner:"#1b6a45", 
      textColor1:"#FFFFFF", 
      textColor2:"#A0CDE5",
      scale:0.7},

      {user:"Nia", 
      xmas:"true", 
      lockedImage:"images/adventNo_23.png",
      loaction:"Chester",
      id:"xmas/23dec",
      rfid:"December23rd", 
      gridImage:["images/23_Dec.png"], 
      copy:"OH DEER",  
      story:"We went to see some reindeer last Christmas and one of them tried to eat my Dadâ€™s Fries!", 
      type:"big_ham", 
      color:"#ece7ac", 
      colorInner:"#fdf6a7", 
      textColor1:"#808284", 
      textColor2:"#CE1F33", 
      scale:0.8},

      {user:"Darius", 
      xmas:"true", 
      lockedImage:"images/adventNo_24.png",
      loaction:"Kendal",
      id:"xmas/24dec",
      rfid:"December24th", 
      gridImage:["images/24_Dec.png"], 
      copy:"PERFECT RUN",  
      story:"We were on a Christmas holiday and there was a hill we sledged down with a McD's at the bottom. Result!", 
      type:"big_ham", 
      color:"#b0c6c1", 
      colorInner:"#c3e4dc", 
      textColor1:"#5D9288", 
      textColor2:"#88152D", 
      scale:1},

      {user:"Teagan", 
      xmas:"true", 
      lockedImage:"images/adventNo_25.png",
      loaction:"Dumfries",
      id:"xmas/25dec",
      rfid:"December25th", 
      gridImage:["images/25_Dec.png"], 
      copy:"BYE-BYE BIRDY",  
      story:"Weâ€™d all had enough turkey by Boxing Day so Mum and Dad took us to McD's and it was sooooooooo good!!!!!", 
      type:"big_ham", 
      color:"#0e5433", 
      colorInner:"#1b6a45", 
      textColor1:"#FFFFFF", 
      textColor2:"#A0CDE5",
      scale:0.9},



     {user:"Robin", loaction:"Royal Leamington Spa", id:"100_ShiningKnight", rfid:"m068y8", gridImage:["images/100_knight_a8c075.png"], copy:"SHINING KNIGHT",  story:"I drove 10 miles to buy my girlfriend a Happy MealÂ® and a Chocolate Milkshake after a hard day.", type:"big_ham", color:"#a8c075", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

     {user:"Leah", loaction:"Paisley", id:"99_LuckyCharm", rfid:"bh8367", gridImage:["images/99_lucky_6092a7.png"], copy:"LUCKY CHARM",  story:"I always have a Happy MealÂ® before a performance. It seems to bring me luck!", type:"big_ham", color:"#6092a7", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

     {user:"Carl", loaction:"Hinckley", id:"98_service", rfid:"o3iq8z", gridImage:["images/98_service_e3dbb5.png"], copy:"GOOD SERVICE",  story:"Iâ€™m always welcomed by my local McDonaldâ€™s manager. He even knows my order!", type:"big_ham", color:"#e3dbb5", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

     {user:"Raymond", loaction:"Blackheath", id:"97_TheatreLuvee", rfid:"h3oief", gridImage:["images/97_theatre_f5baa5.png"], copy:"THEATRE LUVEE",  story:"I had an Apple Pie on my way to see the theatre.It was the perfect start, the taste was amazing!!!!!", type:"big_ham", color:"#f5baa5", textColor1:"#FFFFFF", textColor2:"#D15158", scale:0.7},

     {user:"Joan", loaction:"Warrington", id:"96_Motor", rfid:"y796ad", gridImage:["images/96_motor_cf5258.png"], copy:"MOTOR TO MCDONALDâ€™S",  story:"A classic car show then a Big MacÂ® meal for two at McDonaldâ€™s. What a way to end a lovely day.", type:"big_ham", color:"#cf5258", textColor1:"#FFFFFF", textColor2:"#F7B7D3", scale:0.7},

     {user:"Matt", loaction:"Bristol", id:"95_CustomMade", rfid:"qxj5uu", gridImage:["images/95_custom_6093a7.png"], copy:"CUSTOM MADE",  story:"I like to put 20 fries in with my Big MacÂ®. 10 on top of the burger, 10 on the bottom, then dunked in BBQ sauceâ€¦ yummy!", type:"big_ham", color:"#6093a7", textColor1:"#FFFFFF", textColor2:"#F9D9CB", scale:0.7},

     {user:"Jennifer", loaction:"Hadleigh", id:"93_FrappeDays", rfid:"hu6u9c", gridImage:["images/93_frappe_a8c075.png"], copy:"FRAPPÃ‰ DAYS",  story:"In the car, windows down, sunglasses on, sun shining, music blasting on the radio and stopping off for a Caramel FrappÃ©! Yum!", type:"big_ham", color:"#a8c075", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

     {user:"Alison", loaction:"Dundee", id:"94_StrutStuff", rfid:"54ugqc", gridImage:["images/94_strut_67516f.png"], copy:"STRUT YOUR STUFF",  story:"After 2 weeks of practice for our fashion show, I got out on the catwalk and impressed the crowd. To celebrate I had a McDâ€™s!", type:"big_ham", color:"#67516f", textColor1:"#FFFFFF", textColor2:"#E6D976", scale:0.7},

     {user:"Matt", loaction:"Rochester", id:"92_FeelGoodFactor", rfid:"mc2tno", gridImage:["images/92_feelGood_e4dbb6.png"], copy:"FEEL GOOD FACTOR",  story:"When I had been stood up for a date, I went to McDonaldâ€™s feeling a little down but after a Cheeseburger I was smiling again :P", type:"big_ham", color:"#e4dbb6", textColor1:"#FFFFFF", textColor2:"#538194", scale:0.7},

     {user:"Thomas", loaction:"York", id:"78_MakingGrade", rfid:"8pda1s", gridImage:["images/78_grade_cf5158.png"], copy:"MAKING THE GRADE",  story:"After finishing my A-Levels, I walked to my local Maccas to celebrate with a box of Chicken McNuggetsÂ®. Nothing better.", type:"big_ham", color:"#cf5158", textColor1:"#FFFFFF", textColor2:"#F7B7D3", scale:0.8},
      
     {user:"Mandy", loaction:"Hull", id:"91_BagaBargain", rfid:"m89auq", gridImage:["images/91_bargain_db834c.png"], copy:"BAG A BARGAIN",  story:"I got up really early on a Sunday to go to a car-boot sale. Afterwards, I stopped off for a Sausage & Egg McMuffinÂ®. Yum!", type:"big_ham", color:"#db834c", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

     {user:"Tess", loaction:"St Leonards-on-Sea", id:"89_RunRunRun", rfid:"ftit5i", gridImage:["images/89_runrunrun_-a9c175.png"], copy:"RUN RUN RUN",  story:"After we ran a charity race we all stopped off at McDonald's for a slap up meal... delish!", type:"big_ham", color:"#a9c175", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

     {user:"Lisa", loaction:"Bolton", id:"88_FullofBeans", rfid:"a43jla", gridImage:["images/88_beans_ce5157.png"], copy:"FULL OF BEANS",  story:"Watching my father get excited when he gets his free Coffee after collecting the stickers all week!", type:"big_ham", color:"#ce5157", textColor1:"#FFFFFF", textColor2:"#F7B7D3", scale:0.7},

     {user:"Mark", loaction:"Aberystwyth", id:"87_TastingVictory", rfid:"jyd9yo", gridImage:["images/87_victory_6092a7.png"], copy:"TASTING VICTORY",  story:"Winning the Cup Final with the lads and filling up the trophy with a McDonald's Milkshake. Perfect.", type:"big_ham", color:"#6092a7", textColor1:"#FFFFFF", textColor2:"#F9D9CB", scale:0.7},

     {user:"Stephanie", loaction:"Manchester", id:"86_GreatGran", rfid:"slknta", gridImage:["images/86_gran_f9d9cc.png"], copy:"GREAT WITH GRAN",  story:"A fond Moment was when me and my nan took our weekly trip to McDonaldâ€™s. We both had a Happy MealÂ® and her false teeth danced with delight!", type:"big_ham", color:"#f9d9cc", textColor1:"#AE7D82", textColor2:"#CE5157", scale:0.7},

     {user:"Jake", loaction:"Bristol", id:"85_Festival", rfid:"ja19a6", gridImage:["images/85_festival_675270.png"], copy:"FESTIVAL FINISH",  story:"Having spent the weekend at a festival in Liverpool, we stopped on the way home for the best McDonald's ever!!", type:"big_ham", color:"#675270", textColor1:"#FFFFFF", textColor2:"#E6D976", scale:0.7},

     {user:"Jasmine", loaction:"Bristol", id:"84_Bonding", rfid:"mpon1y", gridImage:["images/84_bonding_6092a7.png"], copy:"BONDING OVER BREAKFAST",  story:"When I was younger, I would go to work with my Dad and we would always get a Maccy Dâ€™s breakfast!", type:"big_ham", color:"#6092a7", textColor1:"#FFFFFF", textColor2:"#F9D9CB", scale:0.7},

     {user:"Driu", loaction:"Northampton", id:"83_LeavingJungle", rfid:"mf6ggj", gridImage:["images/83_jungle_a8c075.png"], copy:"LEAVING THE JUNGLE",  story:"My best memory of my honeymoon was in a McDonaldâ€™s enjoying a Big MacÂ® after a week in the jungle eating rice and chicken.", type:"big_ham", color:"#a8c075", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

     {user:"Keith", loaction:"Buxton", id:"82_RestaurantTour", rfid:"at0fit", gridImage:["images/82_tour_db834c.png"], copy:"RESTAURANT TOUR",  story:"My son was treated to a behind-the-scenes tour of a McD's after he was overheard praising the speed of service.", type:"big_ham", color:"#db834c", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

     {user:"Helen", loaction:"Dundee", id:"80_GoodMove", rfid:"ou3vdc", gridImage:["images/80_goodMove_e3dab5.png"], copy:"GOOD MOVE",  story:"We were enjoying a large cup of tea when we got a text saying our bid for a house had been accepted!", type:"big_ham", color:"#e3dab5", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.8},

     {user:"Stewart", loaction:"Blair Atholl", id:"81_TeeTime", rfid:"ttlrhg", gridImage:["images/81_teeTime_a8c075.png"], copy:"TEE TIME",  story:"Thereâ€™s nothing like a McDonaldâ€™s to celebrate a cracking round of golf!", type:"big_ham", color:"#a8c075", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.9},

     {user:"Mike", loaction:"Southend", id:"75_CoolOff", rfid:"0q13ci", gridImage:["images/75_CoolOff_da834b.png"], copy:"COOL OFF",  story:"Hot summer in the city, back of my neck getting gritty... Solution? A cold McDonaldâ€™s Ice Cream Cone. Magic!", type:"big_ham", color:"#da834b", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},


     {user:"Danish", loaction:"Leicester", id:"90_CoolBritannia", rfid:"r8vxog", gridImage:["images/90_britania_6092a7.png"], copy:"COOL BRITANNIA",  story:"5am in chilly Southport keeping warm with a McDonaldâ€™s Coffee and McMuffinÂ®. I was celebrating my first anniversary of being in the UK!", type:"big_ham", color:"#6092a7", textColor1:"#FFFFFF", textColor2:"#F9D9CB", scale:0.7},

     {user:"Sophy", loaction:"Witham", id:"77_GrandOpening", rfid:"v96wmh", gridImage:["images/77_grandOpen_67516f.png"], copy:"GRAND OPENING",  story:"When McDonald's first opened in London in the 70's we'd never seen anything like it!", type:"big_ham", color:"#67516f", textColor1:"#FFFFFF", textColor2:"#E6D976", scale:0.9},

//      {user:"The Noize", loaction:"Stourbridge", id:"53_FirstWords", rfid:"f17phf", gridImage:["img/thumbnails/53_firstWords_f8d9cb.png"], copy:"FIRST WORDS",  story:"My baby boy said â€œDaddaâ€ for the first time in a McDonald's restaurant.", type:"big_ham", color:"#f5baa5", textColor1:"#FFFFFF", textColor2:"#D15158", scale:0.7},

//      {user:"Samuel", loaction:"Plymouth", id:"76_BFF", rfid:"ut7cea", gridImage:["img/thumbnails/76_BFF_a69089.png"], copy:"BFF",  story:"After a late night, starving hungry, I came home to find my flatmate had some McDonald's Fries awaiting my arrival. Best friend ever!!", type:"big_ham", color:"#a69089", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

// {user:"Natalie", loaction:"London", id:"46_AllTheFamily", rfid:"po0qv5", gridImage:["img/thumbnails/46_allFamily_da834b.png"], copy:"ALL THE FAMILY",  story:"After a big family trip, the whole troop would pile into McD's, from the youngest to the oldest, to enjoy a hearty meal!", type:"big_ham", color:"#da834b", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.8},   
 
//      {user:"David", loaction:"Liverpool", id:"73_WalkEgyptian", rfid:"w14mbp", gridImage:["img/thumbnails/73_egypt_a69089.png"], copy:"WALK LIKE AN EGYPTIAN",  story:"Went to Egypt on a Nile cruise. We went exploring and I found a McDonaldâ€™s. Best Big MacÂ® ever looking across the Nile.", type:"big_ham", color:"#a69089", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.8},

//      {user:"Patricia", loaction:"Stone", id:"72_HereComes", rfid:"6mu7w4", gridImage:["img/thumbnails/72_bride_ce5157.png"], copy:"HERE COMES THE BRIDE",  story:"I popped into McDonaldâ€™s on the way to my wedding reception wearing my wedding dress!", type:"big_ham", color:"#ce5157", textColor1:"#FFFFFF", textColor2:"#F7B7D3", scale:0.7},

// {user:"Chelsea", loaction:"Griffithstown", id:"33_winner", rfid:"scxl2e", gridImage:["img/thumbnails/33_winner_4f5c39.png"], copy:"ON TO A WINNER",  story:"I came first in the East Wales Regionals and got a gold medal. To top it off I had a Quarter Pounder with Cheese meal!!", type:"big_ham", color:"#4f5c39", textColor1:"#FFFFFF", textColor2:"#E3DBB5", scale:0.7},

//      {user:"Michael", loaction:"London", id:"70_SmoothMoves", rfid:"74vf8w", gridImage:["img/thumbnails/70_moves_a69089.png"], copy:"SMOOTH MOVES",  story:"A girl sipped her drink and smiled at me. I lent towards her.<br>''A taste of your Milkshake for a bite of my Big MacÂ®?''<br>4 years together now!", type:"big_ham", color:"#a69089", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

//      {user:"Alicia", loaction:"Kent", id:"69_BrokenHeart", rfid:"y9jekp", gridImage:["img/thumbnails/69_broken_505c3a.png"], copy:"BROKEN HEART",  story:"Popping in with my best friend and having yummy McDonald's Strawberry Milkshakes to help her get over her break up.", type:"big_ham", color:"#505c3a", textColor1:"#FFFFFF", textColor2:"#E3DBB5", scale:0.7},
      
//      {user:"Dale", loaction:"Norwich", id:"68_pitStop", rfid:"o52izd", gridImage:["img/thumbnails/68_pitStop_ce5157.png"], copy:"PIT STOP",  story:"I do a morning pit stop at a McDonaldâ€™s to grab a Latte during the school run! Some days itâ€™s essential!!!", type:"big_ham", color:"#ce5157", textColor1:"#FFFFFF", textColor2:"#F7B7D3", scale:0.7},

//       {user:"Vanessa", loaction:"Derby", id:"62_walking", rfid:"ox8ma1", gridImage:["img/thumbnails/62_walking_da834b.png"], copy:"WALKING THE DOG",  story:"I love an Apple Pie when I take the dog out for a walk.", type:"big_ham", color:"#da834b", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},


//      {user:"Kyle", loaction:"Huntingdon", id:"65_goodTaste", rfid:"f340bq", gridImage:["img/thumbnails/65_goodTaste_a8c075.png"], copy:"GOOD TASTE",  story:"I remember my first Chicken LegendÂ® a long time ago. It tasted like a million pound meal at a fancy restaurant!", type:"big_ham", color:"#a8c075", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

//      {user:"Kev", loaction:"Tipton", id:"66_dippy", rfid:"fy8e0g", gridImage:["img/thumbnails/66_dippy_f5baa5.png"], copy:"DEEPLY DIPPY",  story:"I love savouring Chicken McNuggetsÂ® with BBQ sauce. Itâ€™s my comfort moment!", type:"big_ham", color:"#f5baa5", textColor1:"#FFFFFF", textColor2:"#D15158", scale:0.7},

//      {user:"Sophie", loaction:"Nottingham", id:"63_wibble", rfid:"pvxoql", gridImage:["img/thumbnails/63_wibble_6092a7.png"], copy:"WIBBLE WOBBLE",  story:"I once got stung by a jellyfish. A trip to McDonald's helped cheer me up.", type:"big_ham", color:"#6092a7", textColor1:"#FFFFFF", textColor2:"#F9BAAB", scale:0.8},
      
//      {user:"Claire", loaction:"Norwich", id:"64_breakingNews", rfid:"ia07gz", gridImage:["img/thumbnails/64_breaking_e3dbb5.png"], copy:"BREAKING NEWS",  story:"I took my little boy out for a Happy MealÂ® and told him he was going to be a big brother!", type:"big_ham", color:"#e3dbb5", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

//      {user:"Tom", loaction:"Cawthorn", id:"67_comfort", rfid:"aqczcs", gridImage:["img/thumbnails/67_comfort_badadc.png"], copy:"HOME COMFORT",  story:"I had a Big MacÂ® shipped over to me during a trip to Antarctica. I missed them too much!", type:"big_ham", color:"#badadc", textColor1:"#FFFFFF", textColor2:"#5D3564", scale:0.7},

//       {user:"Vaughan", loaction:"Craigavon", id:"23_fullHouse", rfid:"jkw45d", gridImage:["img/thumbnails/23_fullhouse_6e5976.png"], copy:"FULL HOUSE",  story:"My girlfriend and I went to McDonaldâ€™s at 4am after an awesome night on the town. It was totally packed!", type:"big_ham", color:"#6e5976", textColor1:"#FFFFFF", textColor2:"#E6D976", scale:0.8},   

//      {user:"Jack", loaction:"Manchester", id:"61_score", rfid:"ob2lnm", gridImage:["img/thumbnails/61_score_ce5157.png"], copy:"SCORE!",  story:"I lost big time at table football and the only thing to lift my spirits was a McDonaldâ€™s.", type:"big_ham", color:"#ce5157", textColor1:"#FFFFFF", textColor2:"#F7B7D3", scale:0.7},

//      {user:"Lynsey", loaction:"Southend-on-Sea", id:"57_pukey", rfid:"otrn52", gridImage:["img/thumbnails/57_pukey_505c3a.png"], copy:"A FIRST FOR EVERYTHING",  story:"First day of college and went for a Maccy D's with my new friend who introduced me to dipping Fries in Milkshakes â€“ Iâ€™ve never looked back!!", type:"big_ham", color:"#505c3a", textColor1:"#FFFFFF", textColor2:"#E3DBB5", scale:0.7},

// {user:"Kerry", loaction:"Newcastle", id:"56_hearty", rfid:"kxgtn9", gridImage:["img/thumbnails/56_hearty_45384A.png"], copy:"HEARTY MEAL",  story:"I was in McDonaldâ€™s with my boyfriend when I looked down and saw he had made a heart with his fries. It was so cute.", type:"big_ham", color:"#45384A", textColor1:"#FFFFFF", textColor2:"#E6D976", scale:0.7},

//      {user:"Taz", loaction:"Coventry", id:"59_workIt", rfid:"2zlfuj", gridImage:["img/thumbnails/59_workIt_6092a7.png"], copy:"WORK IT",  story:"After a hard workout I love to go for a Milkshake... It makes the gym so worth it!", type:"big_ham", color:"#6092a7", textColor1:"#FFFFFF", textColor2:"#F9BAAB", scale:0.7},


//      {user:"Jude", loaction:"Market Harborough", id:"55_80s", rfid:"ormxl7", gridImage:["img/thumbnails/55_80s_6092a7.png"], copy:"80s CLASSIC",  story:"I remember my very first McDonald's was on my birthday in the 80's. I had a Big MacÂ®â€¦ yum!", type:"big_ham", color:"#E3DBB5", textColor1:"#FFFFFF", textColor2:"#538194", scale:0.7},

//      {user:"Ashleigh", loaction:"Newport", id:"54_Lights", rfid:"moeolz", gridImage:["img/thumbnails/54_lights_badadc.png"], copy:"LIGHTS, CAMERA, ACTION",  story:"My mates and I once made a picture movie with sugar, salt and straws from McDonaldâ€™s â€“ best two hours ever!", type:"big_ham", color:"#badadc", textColor1:"#FFFFFF", textColor2:"#5D3564", scale:0.7},

//      {user:"Pauline", loaction:"Folkestone", id:"50_Welcome", rfid:"cxesdj", gridImage:["img/thumbnails/50_HomeSweet_ce5157.png"], copy:"WELCOME RETURN",  story:"After collecting my daughter from Uni for the last time, we stopped for a coming home treat â€“ a Chicken McNuggetsÂ® meal.", type:"big_ham", color:"#ce5157", textColor1:"#FFFFFF", textColor2:"#F7B7D3", scale:0.7},
 
//      {user:"Bonquisha", loaction:"Brixton", id:"74_ShakeIt", rfid:"v96wmh", gridImage:["img/thumbnails/74_shake_a8c075.png"], copy:"SHAKE IT",  story:"I did the Harlem shake in a McDonald's Drive Thru!!!", type:"big_ham", color:"#a8c075", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.9},

//      {user:"Arron", loaction:"London", id:"34_playtime", rfid:"zqvg3c", gridImage:["img/thumbnails/34_playtime_da834b.png"], copy:"PLAYTIME",  story:"I used to jump for joy when I got a Happy Meal as a kid. I was super excited for the toy inside!", type:"big_ham", color:"#da834b", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

//      {user:"Ann", loaction:"Balham", id:"51_Whistle", rfid:"cwfrsw", gridImage:["img/thumbnails/51_whistle_a69089.png"], copy:"WHISTLE WHILE YOU WORK",  story:"I was munching my Cheeseburger when 3 workmen in hardhats and overalls came in singingâ€¦ They made everyone smile.", type:"big_ham", color:"#a69089", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

//       {user:"Kieron", loaction:"Barnsley", id:"41_BrainFreeze", rfid:"x9azl6", gridImage:["img/thumbnails/41_freeze_6092a7.png"], copy:"BRAIN FREEZE",  story:"I had a McDonaldâ€™s Milkshake and all my family got brain freeze except me!", type:"big_ham", color:"#6092a7", textColor1:"#FFFFFF", textColor2:"#F9D9CB", scale:0.7},

//      {user:"Melissa", loaction:"Norwich", id:"43_LunchingLadies", rfid:"u704zz", gridImage:["img/thumbnails/43_ladies_ce5157.png"], copy:"LUNCHING LADIES",  story:"Whenever me and my friends are on a shopping spree we go into McDonaldâ€™s to sip Iced FrappÃ©s and munch a Big MacÂ®.", type:"big_ham", color:"#ce5157", textColor1:"#FFFFFF", textColor2:"#F7B7D3", scale:1},

     
//      {user:"Kenyad", loaction:"Southall", id:"79_PlaneSpotting", rfid:"f36e9f", gridImage:["img/thumbnails/79_spotting_17272e.png"], copy:"PLANE SPOTTING",  story:"My son loves to watch planes so we visit the McDonaldâ€™s near Heathrow. He has a Happy MealÂ® and I have a Big MacÂ®.", type:"big_ham", color:"#6093a7", textColor1:"#FFFFFF", textColor2:"#F9D9CB", scale:0.7},

//      {user:"Vicky", loaction:"Northampton", id:"10_shop", rfid:"rfi432", gridImage:["img/thumbnails/10_shop_A69089.png"], copy:"SHOP. DONâ€™T DROP",  story:"On my BIG shopping trips I always pop into McDonald's for a break and a recharge!", type:"big_ham", color:"#A69089", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},


//      {user:"Victoria", loaction:"Brighton", id:"44_HappyReturns", rfid:"n6i2qz", gridImage:["img/thumbnails/44_plane_6092a7.png"], copy:"HAPPY RETURNS",  story:"Coming off a delayed flight from Egypt and starving hungry I finally reached a McDonaldâ€™sâ€¦ Heaven!", type:"big_ham", color:"#6092a7", textColor1:"#FFFFFF", textColor2:"#F9D9CB", scale:0.9},

//      {user:"Deborah", loaction:"Preston", id:"58_lastStraw", rfid:"y8g5yg", gridImage:["img/thumbnails/58_lastStraw_ce5157.png"], copy:"THE LAST STRAW!",  story:"The shocked look on my hubbyâ€™s face as my straw wrapper hit him right between the eyes as he took his first bite of his Big MacÂ®.", type:"big_ham", color:"#ce5157", textColor1:"#FFFFFF", textColor2:"#F7B7D3", scale:0.7},
 
//      {user:"Phil", loaction:"Twickenham", id:"45_SuitsYou", rfid:"5ewu6w", gridImage:["img/thumbnails/45_suits_e3dbb5.png"], copy:"SUITS YOU",  story:"After a black-tie do, I dined on a Quarter Pounderâ„¢ with Cheese and Fries in the back of a limo with 8 friends!", type:"big_ham", color:"#cfc7a3", textColor1:"#FFFFFF", textColor2:"#538194", scale:0.9},

//      {user:"Septina", loaction:"Wolverhampton", id:"48_Breakfast", rfid:"1rdu6u", gridImage:["img/thumbnails/48_breakfast_6092a7.png"], copy:"BREAKFAST IN BED",  story:"I took a McDonaldâ€™s home for my family after an 11 hour night shift and woke them with breakfast.", type:"big_ham", color:"#6092a7", textColor1:"#FFFFFF", textColor2:"#F9D9CB", scale:0.7},
     
//      {user:"Alex", loaction:"Leicester", id:"42_Smart", rfid:"eeq26j", gridImage:["img/thumbnails/42_smart_a69089.png"], copy:"SMART THINKING",  story:"Every Friday morning we go to McDonaldâ€™s<br>to have breakfast and a coffee before heading to Uni.<br>It sets us up for the long day ahead.", type:"big_ham", color:"#a69089", textColor1:"#FFFFFF", textColor2:"#493E4C", scale:0.7},
     
//      {user:"Neil", loaction:"Birmingham", id:"39_Practice", rfid:"onauym", gridImage:["img/thumbnails/39_practice_505c3a.png"], copy:"PRACTICE MAKES PERFECT",  story:"I always get hungry after band practice so McDonaldâ€™s is the place for me!", type:"big_ham", color:"#505c3a", textColor1:"#FFFFFF", textColor2:"#E3DBB5", scale:0.7},

// {user:"Gareth", loaction:"Ashby de la Zouch", id:"49_Ready", rfid:"hawprj", gridImage:["img/thumbnails/49_ready_a8c075.png"], copy:"READY TO GO",  story:"It was gone midnight and the caravan was packed, but before we headed to the ferry, we went and had a McDonaldâ€™s.", type:"big_ham", color:"#a8c075", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},


//      {user:"Megan", loaction:"Bolton", id:"40_Prom", rfid:"7wze30", gridImage:["img/thumbnails/40_prom_f5baa5.png"], copy:"PROM QUEENS",  story:"After my prom, me and my friends went into McDonaldâ€™s in our dresses and heels for Chicken McNuggetsÂ® and Fries.", type:"big_ham", color:"#f5baa5", textColor1:"#FFFFFF", textColor2:"#D15158", scale:0.7},
 
//      {user:"Aimee", loaction:"London", id:"38_NiceCream", rfid:"u3nnzv", gridImage:["img/thumbnails/38_NiceCream_da834b.png"], copy:"NICE CREAM",  story:"During the Easter holidays, Iâ€™d go and get a McFlurryÂ® with friends and then go chill in the sun.", type:"big_ham", color:"#da834b", textColor1:"#FFFFFF", textColor2:"#493E4C", scale:0.7},

// {user:"Jack", loaction:"Newry", id:"47_CoolNews", rfid:"zwb6fb", gridImage:["img/thumbnails/47_stork_badadc.png"], copy:"COOL NEWS",  story:"I was enjoying a Mango & Pineapple Iced Fruit Smoothie when my friend told me she was pregnant. So excited!", type:"big_ham", color:"#badadc", textColor1:"#FFFFFF", textColor2:"#5D3564", scale:0.7},
    
//      {user:"Abigail", loaction:"Nottingham", id:"06_deely", rfid:"eueqjr", gridImage:["img/thumbnails/06_deely_a8c074.png"], copy:"DRESSED TO IMPRESS",  story:"We went to McDonaldâ€™s the morning after a great fancy-dress party still in our costumes. Our Big MacsÂ® distracted us from the strange looks!", type:"big_ham", color:"#E3DBB5", textColor1:"#99857E", textColor2:"#538194", scale:0.6},
 
//      {user:"Vinay", loaction:"Lancaster", id:"32_surprise", rfid:"5a3diq", gridImage:["img/thumbnails/32_surprise_a69089.png"], copy:"SURPRISE!",  story:"We arranged a surprise party for our friend on his 18th birthday at McDonaldâ€™s.", type:"big_ham", color:"#a69089", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

//      {user:"Pallab", loaction:"London", id:"31_afterHrs", rfid:"pxi0bq", gridImage:["img/thumbnails/31_afterHrs_5f92a7.png"], copy:"AFTER HOURS",  story:"After a tiring, hectic and long day at the office, I was still happy because the McDonaldâ€™s next door was open till late. Thank you.", type:"big_ham", color:"#5f92a7", textColor1:"#FFFFFF", textColor2:"#F9D9CB", scale:0.7},

//       {user:"Alexander", loaction:"Ayr", id:"71_SillyStop", rfid:"6yrnvl", gridImage:["img/thumbnails/71_silly_da834b.png"], copy:"SILLY STOP OFF",  story:"My friends and I rolled into McDonaldâ€™s in full fishing gear with blue mohawks, sombreros and shades. The staff remained professional.", type:"big_ham", color:"#da834b", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},  


//      {user:"Stephen", loaction:"Runcorn", id:"30_filmfood", rfid:"u099s7", gridImage:["img/thumbnails/30_filmFood_6e5976.png"], copy:"FILM FOOD",  story:"We were about to watch a film at <br>home but fancied a McDonaldâ€™s. We popped to <br>the drive-thru and brought it back to enjoy!", type:"big_ham", color:"#6e5976", textColor1:"#FFFFFF", textColor2:"#E6D976", scale:0.7},
 
//      {user:"Lara", loaction:"Plymouth", id:"29_proposal", rfid:"ik05zt", gridImage:["img/thumbnails/29_proposed_badadc.png"], copy:"HAPPY ANNIVERSARY",  story:"My husband proposed to me on a beach whilst eating McDonaldâ€™s. Itâ€™s now our anniversary meal every year!", type:"big_ham", color:"#badadc", textColor1:"#FFFFFF", textColor2:"#5D3564", scale:0.7},
      
//      {user:"Laura", loaction:"London", id:"28_taxi", rfid:"3i5ome", gridImage:["img/thumbnails/28_taxi_45384a.png"], copy:"ON THE WAY",  story:"Persuading my cab to go through the 24-hour drive-thru. I went to bed very happy!", type:"big_ham", color:"#45384a", textColor1:"#FFFFFF", textColor2:"#E6D976", scale:0.8},
 
//      {user:"Faye", loaction:"Whitley Bay", id:"27_wedding", rfid:"7ttmca", gridImage:["img/thumbnails/27_wedded_f5baa5.png"], copy:"WEDDED BLISS",  story:"My family was en route to a wedding when we popped into a McDonaldâ€™s â€“ I had a Double Cheeseburger.", type:"big_ham", color:"#f5baa5", textColor1:"#FFFFFF", textColor2:"#D15158", scale:0.7},

//      {user:"Sinead", loaction:"London", id:"25_goldRush", rfid:"4u30zr", gridImage:["img/thumbnails/25_goldrush_4f5c39.png"], copy:"GOLD RUSH",  story:"I was at the Olympic Park in London when<br>Great Britain had just won 3 Gold Medals.<br>I celebrated with a winning Big MacÂ®.", type:"big_ham", color:"#ce5057", textColor1:"#FFFFFF", textColor2:"#F7B7D3", scale:0.7},

//      {user:"Jared", loaction:"London", id:"22_allTime", rfid:"x9g2pi", gridImage:["img/thumbnails/22_alltime_4f5c39.png"], copy:"ALL-TIME FAVOURITE",  story:"I remember when I had my first Cheeseburger. Over 25 years later, itâ€™s still my favourite.", type:"big_ham", color:"#4f5c39", textColor1:"#FFFFFF", textColor2:"#E3DBB5", scale:0.9},

//       {user:"Calum", loaction:"Aberdeen", id:"60_speedy", rfid:"sfhcdr", gridImage:["img/thumbnails/60_speedy_a8c075.png"], copy:"SPEEDY SEARCH",  story:"Zipping around on my rollerblades on a mission to get some Chicken McNuggetsÂ®.", type:"big_ham", color:"#a8c075", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},




//    {user:"Philly", loaction:"Weymouth", id:"05_kissey", rfid:"3ykbn4", gridImage:["img/thumbnails/05_kissey_d98351.png"], copy:"GREAT FOR A DATE",  story:"I remember when I was 14 and a boy I fancied took me for a Coke and a Hamburger. I had my first kiss in a McDonaldâ€™s!", type:"big_ham", color:"#45384a", textColor1:"#FFFFFF", textColor2:"#E6D976"},       

//      {user:"John-Paul", loaction:"Manchester", id:"13_ronald", rfid:"r0Rgup", gridImage:["img/thumbnails/13_ronald_da834b.png"], copy:"RIGHT-ON RONALD",  story:"I remember having a birthday party at my local McDonald's and Ronald McDonald was there giving out gifts.", type:"big_ham", color:"#da834b", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},

//      {user:"Tanya", loaction:"Camberley", id:"08_cupid", rfid:"nqvvf3", gridImage:["img/thumbnails/08_cupid_f2bead.png"], copy:"LOVE IS IN THE AIR",  story:"I met my future hubby while we both worked at McDonaldâ€™s in the early 90s!", type:"big_ham", color:"#b9d9dc", textColor1:"#5E92A7", textColor2:"#5D3564", scale:0.7},

//      {user:"Martina", loaction:"United Kingdom", id:"11_movies", rfid:"fyogcv", gridImage:["img/thumbnails/11_movies_a8c074.png"], copy:"MOVIE MAGIC",  story:"After the cinema my kids loved being treated to a McDonaldâ€™s. Itâ€™s been a tradition for years and now my kids take their kids!", type:"big_ham", color:"#a8c074", textColor1:"#FFFFFF", textColor2:"#45384A", scale:0.7},
  
//      {user:"Jonathan", loaction:"Worcester", id:"04_thought", rfid:"fd4tht", gridImage:["img/thumbnails/04_thought_badadc.png"], copy:"FOOD FOR THOUGHT",  story:"Whenever I got time between lectures I'd race off to McDonalds to grab a cheeky Cheeseburger. Good times!", type:"big_ham", color:"#badadc", textColor1:"#5E92A7", textColor2:"#5D3564", scale:0.7},  

//      {user:"Miljan", loaction:"London", id:"07_kungfu", rfid:"mg2drh", gridImage:["img/thumbnails/07_kungfu_e3dbb5.png"], copy:"PERFECT PICK-ME-UP",  story:"I lost in a Judo competition and the only thing that cheered me up was a McChickenÂ® Sandwich Meal.", type:"big_ham", color:"#5e92a7", textColor1:"#FFFFFF", textColor2:"#F9D9CB", scale:0.8},
 
//    {user:"Eve", loaction:"Wigan", id:"37_McbitesBday", rfid:"4c4zxm", gridImage:["img/thumbnails/37_McBites_a8c075.png"], copy:"A McBITESÂ® BIRTHDAY",  story:"I went to McDonaldâ€™s for my birthday<br>and had my first ever Chicken McBitesÂ®.<br>Iâ€™d never had anything so delicious in my life!", type:"big_ham", color:"#a8c075", textColor1:"#FFFFFF", textColor2:"#493E4C", scale:0.7},
   
//       {user:"Conna", loaction:"Leicester", id:"18_windmill", rfid:"aq8f1l", gridImage:["img/thumbnails/18_windmill_badadc.png"], copy:"FUN IN THE SUN",  story:"Thereâ€™s nothing better than having a McFlurryÂ® in the middle of a hot sunny day on the beach.", type:"big_ham", color:"#badadc", textColor1:"#5E92A7", textColor2:"#95373C", scale:0.7}

    
          
  ],
  
  dimensions:[12,12],

      // xmasGrids:{

      //       "#78b8dd":[
      //             143,142,141,      140,139,138,137,136,     135,134,133,132,
      //             100, 99, 98,      97, 96, 95, 94, 93,      92, 91, 90,131,
      //             101, 64, 63,      62, 61, 60, 59, 58,      57, 56, 89,130,
      //             102, 65, 36,      35, 34, 33, 32, 31,      30, 55, 88,129,
      
      //             103, 66, 37,      24, 8, 22, 21, 20,      29, 54, 87,128,
      //             104, 67, 38,      9, 23,  7,  6,  19,      28, 53, 86,127,
      //             105, 68, 39,      0, 2,  5,  10,  18,      27, 52, 85,126,
      //             106, 69, 40,      11, 1,  3,  4,  16,       26, 51, 84,125,
      //             107, 70, 41,      12, 13, 14, 15, 17,      25, 50, 83,124,
            
      //             108, 71, 42,      43, 44, 45, 46, 47,      48, 49, 82,123,
      //             109, 72, 73,      74, 75, 76, 77, 78,      79, 80, 81,122,
      //             110,111,112,      113,114,115,116,117,     118,119,120,121
      //       ],
      //       "#ece7ac":[
      //             143,142,141,      140,139,138,137,136,     135,134,133,132,
      //             100, 99, 98,      97, 96, 95, 94, 93,      92, 91, 90,131,
      //             101, 64, 63,      62, 61, 60, 59, 58,      57, 56, 89,130,
      //             102, 65, 36,      35, 34, 33, 32, 31,      30, 55, 88,129,
      
      //             103, 66, 37,      24, 1, 22, 21, 20,      29, 54, 87,128,
      //             104, 67, 38,      9, 23,  7,  6,  19,      28, 53, 86,127,
      //             105, 68, 39,      0, 8,  4,  10,  18,      27, 52, 85,126,
      //             106, 69, 40,      11, 2,  3,  17,  5,       26, 51, 84,125,
      //             107, 70, 41,      12, 13, 14, 15, 16,      25, 50, 83,124,
            
      //             108, 71, 42,      43, 44, 45, 46, 47,      48, 49, 82,123,
      //             109, 72, 73,      74, 75, 76, 77, 78,      79, 80, 81,122,
      //             110,111,112,      113,114,115,116,117,     118,119,120,121
      //       ],
      //       "#0e5433":[
      //             143,142,141,      140,139,138,137,136,     135,134,133,132,
      //             100, 99, 98,      97, 96, 95, 94, 93,      92, 91, 90,131,
      //             101, 64, 63,      62, 61, 60, 59, 58,      57, 56, 89,130,
      //             102, 65, 36,      35, 34, 33, 32, 31,      30, 55, 88,129,
      
      //             103, 66, 37,      24, 23, 7, 21, 20,      29, 54, 87,128,
      //             104, 67, 38,      9, 8,  22,  6,  18,      28, 53, 86,127,
      //             105, 68, 39,      0, 1,  14,  5,  19,      27, 52, 85,126,
      //             106, 69, 40,      11, 2,  3,  4,  17,       26, 51, 84,125,
      //             107, 70, 41,      10, 13, 12, 15, 16,      25, 50, 83,124,
            
      //             108, 71, 42,      43, 44, 45, 46, 47,      48, 49, 82,123,
      //             109, 72, 73,      74, 75, 76, 77, 78,      79, 80, 81,122,
      //             110,111,112,      113,114,115,116,117,     118,119,120,121
      //       ],
      //       "#ab1a2e":[
      //             143,142,141,      140,139,138,137,136,     135,134,133,132,
      //             100, 99, 98,      97, 96, 95, 94, 93,      92, 91, 90,131,
      //             101, 64, 63,      62, 61, 60, 59, 58,      57, 56, 89,130,
      //             102, 65, 36,      35, 34, 33, 32, 31,      30, 55, 88,129,
      
      //             103, 66, 37,      24, 23, 22, 21, 20,      29, 54, 87,128,
      //             104, 67, 38,      9,  8,  10,  7,  18,      28, 53, 86,127,
      //             105, 68, 39,      0, 1,  6,  5,  19,      27, 52, 85,126,
      //             106, 69, 40,      11, 2,  3,  4,  17,       26, 51, 84,125,
      //             107, 70, 41,      12, 13, 14, 15, 16,      25, 50, 83,124,
            
      //             108, 71, 42,      43, 44, 45, 46, 47,      48, 49, 82,123,
      //             109, 72, 73,      74, 75, 76, 77, 78,      79, 80, 81,122,
      //             110,111,112,      113,114,115,116,117,     118,119,120,121
      //       ],
      //       "#004f8b":[
      //             143,142,141,      140,139,138,137,136,     135,134,133,132,
      //             100, 99, 98,      97, 96, 95, 94, 93,      92, 91, 90,131,
      //             101, 64, 63,      62, 61, 60, 59, 58,      57, 56, 89,130,
      //             102, 65, 36,      35, 34, 33, 32, 31,      30, 55, 88,129,
      
      //             103, 66, 37,      24, 23, 07, 21, 20,      29, 54, 87,128,
      //             104, 67, 38,      9, 8,  22,  6,  19,      28, 53, 86,127,
      //             105, 68, 39,      10, 1,  0,  5,  18,      27, 52, 85,126,
      //             106, 69, 40,      11, 2,  3,  4,  16,       26, 51, 84,125,
      //             107, 70, 41,      12, 13, 14, 15, 17,      25, 50, 83,124,
            
      //             108, 71, 42,      43, 44, 45, 46, 47,      48, 49, 82,123,
      //             109, 72, 73,      74, 75, 76, 77, 78,      79, 80, 81,122,
      //             110,111,112,      113,114,115,116,117,     118,119,120,121
      //       ],
      //       "#b0c6c1":[
      //             143,142,141,      140,139,138,137,136,     135,134,133,132,
      //             100, 99, 98,      97, 96, 95, 94, 93,      92, 91, 90,131,
      //             101, 64, 63,      62, 61, 60, 59, 58,      57, 56, 89,130,
      //             102, 65, 36,      35, 34, 33, 32, 31,      30, 55, 88,129,
      
      //             103, 66, 37,      24, 23, 22, 21, 20,      29, 54, 87,128,
      //             104, 67, 38,      9 , 8,  6,  7,  19,      28, 53, 86,127,
      //             105, 68, 39,      0 , 1,  10, 5,  3,       27, 52, 85,126,
      //             106, 69, 40,      11, 2,  18,  4, 17,      26, 51, 84,125,
      //             107, 70, 41,      12, 13, 14, 15, 16,      25, 50, 83,124,
            
      //             108, 71, 42,      43, 44, 45, 46, 47,      48, 49, 82,123,
      //             109, 72, 73,      74, 75, 76, 77, 78,      79, 80, 81,122,
      //             110,111,112,      113,114,115,116,117,     118,119,120,121
      //       ],
      //       "#d0d15d":[
      //             143,142,141,      140,139,138,137,136,     135,134,133,132,
      //             100, 99, 98,      97, 96, 95, 94, 93,      92, 91, 90,131,
      //             101, 64, 63,      62, 61, 60, 59, 58,      57, 56, 89,130,
      //             102, 65, 36,      35, 34, 33, 32, 31,      30, 55, 88,129,
      
      //             103, 66, 37,      24, 23, 22, 21, 20,      29, 54, 87,128,
      //             104, 67, 38,      9, 8,  10,  6,  19,      28, 53, 86,127,
      //             105, 68, 39,      0, 1,  7,  5,  18,      27, 52, 85,126,
      //             106, 69, 40,      11, 2,  3,  17,  4,       26, 51, 84,125,
      //             107, 70, 41,      12, 13, 14, 15, 16,      25, 50, 83,124,
            
      //             108, 71, 42,      43, 44, 45, 46, 47,      48, 49, 82,123,
      //             109, 72, 73,      74, 75, 76, 77, 78,      79, 80, 81,122,
      //             110,111,112,      113,114,115,116,117,     118,119,120,121
      //       ]

      // },

  layout:[
    
    143,142,141,140,139,138,137,136,135,134,133,132,
    100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90,131,
    101, 64, 63, 62, 61, 60, 59, 58, 57, 56, 89,130,
    102, 65, 36, 35, 34, 33, 32, 31, 30, 55, 88,129,
    103, 66, 37, 16, 15, 14, 13, 12, 29, 54, 87,128,
    104, 67, 38, 17, 4,  3,  2,  11, 28, 53, 86,127,
    105, 68, 39, 18, 5,  0,  1,  10, 27, 52, 85,126,
    106, 69, 40, 19, 6,  7,  8,  9,  26, 51, 84,125,
    107, 70, 41, 20, 21, 22, 23, 24, 25, 50, 83,124,
    108, 71, 42, 43, 44, 45, 46, 47, 48, 49, 82,123,
    109, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81,122,
    110,111,112,113,114,115,116,117,118,119,120,121
  ]
}

return model;

});