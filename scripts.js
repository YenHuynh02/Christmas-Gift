// Variables declaration
const getId = (id) => { return document.getElementById(id) };

const reindeer = 'Napper'
const textInChatbox = getId('text');
const chatbox = getId('chatbox');
const formScene2 = getId('form');
const startButton = getId('startButton');
const prevButton = getId('prev');
const nextButton = getId('next');
const nameInput = getId('name');
let currentIndexMSG = 0;
const msgSpeed = Math.random() * (100 - 40) + 40;

/*-------------------------------------------------------------- */
const getGreeting = (language) => {
    const currentHour = new Date().getHours();

    if (language === 'en') {
        if (currentHour >= 5 && currentHour < 12) {
            return "Morning";
        } else if (currentHour >= 12 && currentHour < 18) {
            return "Afternoon";
        } else if (currentHour >= 18 && currentHour < 22) {
            return "Evening";
        } else {
            return "Night";
        }
    }

    else if (language === 'vi') {
        if (currentHour >= 5 && currentHour < 12 || currentHour >= 12 && currentHour < 18 || currentHour >= 18 && currentHour < 22) {
            return "Chào cậu";
        } else {
            return "Chào cậu";
        }
    }
}

const retrieveName = () => {
    const name = nameInput.value;
    return name;
}

const handleForm = (event) => {
    event.preventDefault();

    if (msg[currentIndexMSG + 1]?.status === 'scene3') {
        msg[currentIndexMSG + 1].ai = `Hello ${retrieveName()}, How are you?`;
    }

    else {
        msg.push({ ai: `Hi ${retrieveName()}, How are you?`, status: 'scene3' });
    }

    currentIndexMSG++;
    displayMSG();
}

const msg = [
    { ai: getGreeting('en') + `..., I'm ${reindeer}😉\n` + getGreeting('vi') + `..., mình tên là ${reindeer}😉`, status: 'scene1' },
    { ai: 'How about you? what\'s your name 🙂?\n', status: 'scene2' },
];

const blinkingCursor = () => {
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        #cursor {
            display: inline-block;
            transform: translateY(2px);
            width: 2px;
            height: 15px;
            background-color: palevioletred;
            animation: blink 1s step-start infinite;
        }

        @keyframes blink {
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(cursorStyle);
}

blinkingCursor();

const typeMSG = (message, element, speed = 100, callback = null) => {
    let i = 0;
    element.innerHTML = '<span id="cursor"></span>';
    const cursor = getId('cursor');
    const formattedMSG = message.split('\n').join('<br>');
    const chars = formattedMSG.split('');

    const interval = setInterval(() => {
        if (i < chars.length) {
            if (chars[i] === '<') {
                const tagEnd = formattedMSG.indexOf('>', i);
                const htmlTag = formattedMSG.slice(i, tagEnd + 1);
                cursor.insertAdjacentHTML('beforebegin', htmlTag);
                i = tagEnd + 1;
            }

            else {
                cursor.insertAdjacentHTML('beforebegin', chars[i]);
                i++;
            }
        }

        else {
            clearInterval(interval);
            cursor.remove();
            if (callback) callback();
        }
    }, speed)
};

const displayMSG = () => {
    formScene2.style.display = 'none';
    /* Previous button */
    if (currentIndexMSG === 0) prevButton.style.visibility = 'hidden';
    else prevButton.style.visibility = 'visible';

    /* Next button */
    if (currentIndexMSG === msg.length - 1) nextButton.style.visibility = 'hidden';
    else nextButton.style.visibility = 'visible';
    typeMSG(msg[currentIndexMSG].ai, textInChatbox, msgSpeed, () => {
        /*Display the form in scene 2 when the message display the last element of index */
        if (msg[currentIndexMSG].status === 'scene2') formScene2.style.display = 'flex';
    })
};

displayMSG();

/*Page navigation */
['click', 'touchstart'].forEach((event) => {
    nextButton.addEventListener(event, () => {
        if (currentIndexMSG < msg.length - 1) {
            currentIndexMSG++;
            displayMSG();
        }
    });
    prevButton.addEventListener(event, () => {
        if (currentIndexMSG > 0) {
            currentIndexMSG--;
            displayMSG();

            if (msg[currentIndexMSG].status === 'scene2') {
                nameInput.value = retrieveName();
            }
        }
    });
})
/*-------------------------------------------------------------- */

// Scene 1
// ['click', 'touchstart'].forEach((event) => {
//     startButton.addEventListener(event, () => {
//         chatbox.style.display = 'flex';
//         startButton.style.display = 'none';
//     })
// })