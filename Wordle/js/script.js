var htmlElements = [];
var answer = "";
var wordString = "About,Alert,Argue,Beach,Above,Alike,Arise,Began,Abuse,Alive,Array,Begin,Actor,Allow,Aside,Begun,Acute,Alone,Asset,Being,Admit,Along,Audio,Below,Adopt,Alter,Audit,Bench,Adult,Among,Avoid,Billy,After,Anger,Award,Birth,Again,Angle,Aware,Black,Agent,Angry,Badly,Blame,Agree,Apart,Baker,Blind,Ahead,Apple,Bases,Block,Alarm,Apply,Basic,Blood,Album,Arena,Basis,Board,Boost,Buyer,China,Cover,Booth,Cable,Chose,Craft,Bound,Calif,Civil,Crash,Brain,Carry,Claim,Cream,Brand,Catch,Class,Crime,Bread,Cause,Clean,Cross,Break,Chain,Clear,Crowd,Breed,Chair,Click,Crown,Brief,Chart,Clock,Curve,Bring,Chase,Close,Cycle,Broad,Cheap,Coach,Daily,Broke,Check,Coast,Dance,Brown,Chest,Could,Dated,Build,Chief,Count,Dealt,Built,Child,Court,Death,Debut,Entry,Forth,Group,Delay,Equal,Forty,Grown,Depth,Forum,Guard,Doing,Event,Found,Guess,Doubt,Every,Frame,Guest,Dozen,Exact,Frank,Guide,Draft,Exist,Fraud,Happy,Drama,Extra,Fresh,Harry,Drawn,Faith,Front,Heart,Dream,False,Fruit,Heavy,Dress,Fault,Fully,Hence,Drill,Fibre,Funny,Night,Drink,Field,Giant,Horse,Drive,Fifth,Given,Hotel,Drove,Fifty,Glass,House,Dying,Fight,Globe,Human,Eager,Final,Going,Ideal,Early,First,Grace,Image,Earth,Fixed,Grade,Index,Eight,Flash,Grand,Inner,Elite,Fleet,Grant,Input,Empty,Floor,Grass,Issue,Enemy,Fluid,Great,Irony,Enjoy,Focus,Green,Juice,Enter,Force,Gross,Joint,Judge,Metal,Media,Newly,Known,Local,Might,Noise,Label,Logic,Minor,North,Large,Loose,Minus,Noted,Laser,Lower,Mixed,Novel,Later,Lucky,Model,Nurse,Laugh,Lunch,Money,Occur,Layer,Lying,Month,Ocean,Learn,Magic,Moral,Offer,Lease,Major,Motor,Often,Least,Maker,Mount,Order,Leave,March,Mouse,Other,Legal,Music,Mouth,Ought,Level,Match,Movie,Paint,Light,Mayor,Needs,Paper,Limit,Meant,Never,Party,Peace,Power,Radio,Round,Panel,Press,Raise,Route,Phase,Price,Range,Royal,Phone,Pride,Rapid,Rural,Photo,Prime,Ratio,Scale,Piece,Print,Reach,Scene,Pilot,Prior,Ready,Scope,Pitch,Prize,Refer,Score,Place,Proof,Right,Sense,Plain,Proud,Rival,Serve,Plane,Prove,River,Seven,Plant,Queen,Quick,Shall,Plate,Sixth,Stand,Shape,Point,Quiet,Roman,Share,Pound,Quite,Rough,Sharp,Sheet,Spare,Style,Times,Shelf,Speak,Sugar,Tired,Shell,Speed,Suite,Title,Shift,Spend,Super,Today,Shirt,Spent,Sweet,Topic,Shock,Split,Table,Total,Shoot,Spoke,Taken,Touch,Short,Sport,Taste,Tough,Shown,Staff,Taxes,Tower,Sight,Stage,Teach,Track,Since,Stake,Teeth,Trade,Sixty,Start,Texas,Treat,Sized,State,Thank,Trend,Skill,Steam,Theft,Trial,Sleep,Steel,Their,Tried,Slide,Stick,Theme,Tries,Small,Still,There,Truck,Smart,Stock,These,Truly,Smile,Stone,Thick,Trust,Smith,Stood,Thing,Truth,Smoke,Store,Think,Twice,Solid,Storm,Third,Under,Solve,Story,Those,Undue,Sorry,Strip,Three,Union,Sound,Stuck,Threw,Unity,South,Study,Throw,Until,Space,Stuff,Tight,Upper,Upset,Whole,Waste,Wound,Urban,Whose,Watch,Write,Usage,Woman,Water,Wrong,Usual,Train,Wheel,Wrote,Valid,World,Where,Yield,Value,Worry,Which,Young,Video,Worse,While,Youth,Virus,Worst,White,Worth,Visit,Would,Vital,Voice,Glyph";
var wordsArray = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var unguessedLetters = [];
var chatMessage = "";
var guessCount = 0;
var GUESSLIMIT = 6;
var lost = false;
var WRONG = "h2";
var ALMOST = "h3";
var CORRECT = "h4";
var SPACER = "h5";
var EMPTY = "h6";
var CURSOR = "h7";
var LETTERBANK = "h8"
var currentInputValue = "";

function setupGame() {
    document.addEventListener('keydown', this.handleKeyPress);

    wordsArray = wordString.split(',');
    for (var i = 0; i < wordsArray.length; i++) {
        wordsArray[i] = wordsArray[i].toUpperCase();
    }

    unguessedLetters = alphabet.toUpperCase().split('');

    answer = pickAnswer();
    htmlElements.push(toElement("WORD-L", "h1"));
    htmlElements.push(toElement("Remaining letters: \n" + unguessedLetters.join(', '), LETTERBANK));
    htmlElements.push(toElement("Begin!", 'p'));


    htmlElements.push(toElement("", SPACER));
    for (var i = 0; i < 5; i++) {
        htmlElements.push(toElement("_", i == 0 ? CURSOR : EMPTY));
    }
    htmlElements.push("<br/>");
}

function pickAnswer() {
    var r = Math.round((Math.random()) * (wordsArray.length));
    return wordsArray[r];
}

function clearLastRow() {
    var stop = false;
    for (var i = 0; i < 7; i++) {
        var elem = htmlElements.pop();
        if (elem.charAt(1) == 'i') {
            htmlElements.push(elem);
            stop = true;
            break;
        }
        if (stop) break;
    }

    for (var i = 0; i < htmlElements.length; i++) {
        var elem = htmlElements[i];
        if (elem.includes(LETTERBANK)) {
            htmlElements[i] = toElement("Remaining letters: \n" + unguessedLetters.join(', '), LETTERBANK);
            stop = true;
            break;
        }
        if (stop) break;
    }
}

function updateRowFromInput(val) {
    guessArr = val.toUpperCase().split('');

    for (var i = 0; i < guessArr.length; i++) {
        var letter = guessArr[i];
        htmlElements.push(toElement(letter, EMPTY));
    }

    var lettersNotGuessed = 5 - guessArr.length;
    if (lettersNotGuessed > 0) {
        for (var i = 0; i < lettersNotGuessed; i++) {
            htmlElements.push(toElement("_", i == 0 ? CURSOR : EMPTY));
        }
    }
    htmlElements.push("<br/>");
}

function handleBackspace() {
    var erasedLetter = currentInputValue.charAt(currentInputValue.length-1).toUpperCase();
    if (erasedLetter != "") unguessedLetters.push(erasedLetter);
    clearLastRow();
    htmlElements.push(toElement("", SPACER));

    currentInputValue = currentInputValue.substring(0,currentInputValue.length-1);
    updateRowFromInput(currentInputValue);

    render();
}

function handleInput(currentInput) {
    unguessedLetters = unguessedLetters.filter(l => l !== currentInput.toUpperCase());
    clearLastRow();
    htmlElements.push(toElement("", SPACER));

    currentInputValue = currentInputValue + currentInput;
    updateRowFromInput(currentInputValue);

    if (currentInputValue.length >= 5) {
        handleGuess(currentInputValue);
        currentInputValue = "";
    }

    render();
}


function wordle(a, g) {
    
    var result = "_____".split('');
    var aArr = a.split('');
    var gArr = g.split('');
    var n = a.length;
    
    // find correct
    for (var i = 0; i < n; i++) {
        if (aArr[i] == gArr[i]) {
            result[i] = "X";
            aArr[i] = "";
            gArr[i] = "";
        }
    }

    // find almost
    for (pass = 0; pass < 2; pass++) {
        for (var i = 0; i < n; i++) {
            var broke = false;
            if (aArr.includes(gArr[i]) && gArr[i] != "") {
                result[i] = "O";
                aArr[aArr.indexOf(gArr[i])] = "";
                gArr[i] = "";
                broke = true;
                break;
            }
            if (broke) break;
        }
    }
    return result;
}



function handleGuess(currentGuess) {
    clearLastRow();
    
    htmlElements.push(toElement("", SPACER));
    gArr = currentGuess.toUpperCase().split('');
    var correctLetters = 0;
    var almostLetters = 0;

    result = wordle(answer, currentGuess.toUpperCase());

    var guessElements = ["", "", "", "", ""];

    for (var i = 0; i < result.length; i++) {
        var letter = gArr[i];
        if (result[i] == "X") {
            guessElements[i] = toElement(letter, CORRECT);
            correctLetters = correctLetters + 1;
        }
        else if (result[i] == "O") {
            guessElements[i] = toElement(letter, ALMOST);
            almostLetters = almostLetters + 1;
        }
        else {
            guessElements[i] = toElement(letter, WRONG);
        }
    }

    guessElements.forEach(el => htmlElements.push(el));

    htmlElements.push("<br/>");

    if (lost) return;

    guessCount = guessCount + 1;

    if (correctLetters == guessArr.length) {
        handleWin();
        return;
    }

    if (guessCount >= GUESSLIMIT) {
        handleLoss();
        return;
    }

    updateMessage(correctLetters, almostLetters);

    // push empty blocks as a space for next guess
    htmlElements.push(toElement("", SPACER));
    for (var i = 0; i < 5; i++) {
        htmlElements.push(toElement("_", i == 0 ? CURSOR : EMPTY));
    }
    htmlElements.push("<br/>");
    
    render();


}

function updateMessage(correct, almost) {
    var message = "Keep trying...";
    if (correct >= 3) message = "Getting close...";
    if (correct >= 5) message = "You win!";
    else if (almost >= 2) message = "Making progress...";
    if (correct < 0) message = "You lose :(";
    for (var i = 0; i < htmlElements.length; i++) {
        var elem = htmlElements[i];
        if (elem.charAt(1) == 'p') {
            htmlElements[i] = toElement(message, 'p');
        }
    }
}

function handleWin() {
    updateMessage(5, 0);
    document.removeEventListener('keydown', this.handleKeyPress);
    render();
}

function handleLoss() {
    lost = true;
    handleGuess(answer);
    updateMessage(-1,0);
    document.removeEventListener('keydown', this.handleKeyPress);
    render();
}

function toElement(content, tag) {
    res = "<" + tag + ">" + content + "</" + tag + ">";
    return res;
}

async function startGame() {
    setupGame();
    render();
}

function handleKeyPress(e) {
    let alphaRegex = /^[a-zA-Z]+$/;
    var key = e.key;
    if (key == "Backspace") {
        handleBackspace();
        return;
    }
    if (key.length > 1 || !alphaRegex.test(key)) return;
    handleInput(e.key);
}

async function render() {
    document.body.innerHTML = htmlElements.join('\n');
}

startGame()
