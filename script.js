// =====================================
// Christine & Von Wedding RSVP
// script.js
// PART 1
// =====================================

// ----------------------------
// CHANGE THIS
// ----------------------------
const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbzXCcovs5ZM9YzqMXgckN_vwzTu_FRc9Nd1Reab__COKVJnJf65vv5NomY_PgZfoFlL/exec";

// ----------------------------
// ELEMENTS
// ----------------------------
const loadingScreen = document.getElementById("loadingScreen");
const mainCard = document.getElementById("mainCard");
const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

const guestInput = document.getElementById("guestName");
const searchButton = document.getElementById("searchButton");

const result = document.getElementById("result");

// ----------------------------
// LOADING SCREEN
// ----------------------------
window.onload = function () {

    setTimeout(() => {

        loadingScreen.style.opacity = "0";

        setTimeout(() => {

            loadingScreen.style.display = "none";

            mainCard.classList.remove("hidden");

            mainCard.style.opacity = "0";

            setTimeout(() => {

                mainCard.style.transition = ".8s";

                mainCard.style.opacity = "1";

            },100);

        },600);

    },1500);

};

// ----------------------------
// MUSIC
// ----------------------------
musicButton.addEventListener("click",function(){

    if(music.paused){

        music.play();

        musicButton.innerHTML="⏸ Pause Music";

    }else{

        music.pause();

        musicButton.innerHTML="▶ Play Music";

    }

});

// ----------------------------
// ENTER KEY SEARCH
// ----------------------------
guestInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        searchGuest();

    }

});

searchButton.addEventListener("click",searchGuest);

// ----------------------------
// GREETING
// ----------------------------
function createGreeting(fullName){

    const words=fullName.trim().split(" ");

    const titles=[
        "Ninong",
        "Ninang",
        "Tito",
        "Tita",
        "Lolo",
        "Lola",
        "Dr.",
        "Mr.",
        "Mrs.",
        "Ms."
    ];

    if(titles.includes(words[0])){

        return words[0]+" "+words[1];

    }

    return words[0];

}

// ----------------------------
// PERSONALIZED MESSAGE
// ----------------------------
function invitationMessage(group){

    switch(group){

        case "Principal Sponsor":

            return `
            <p class="groupTitle">Principal Sponsor</p>

            <p>

            It is our greatest honor to have you stand with us as we begin the next chapter of our lives.

            Your guidance, wisdom and blessings mean so much to us.

            </p>

            <p class="signature">

            With love and gratitude,

            <br>

            <strong>Von & Tin</strong>

            </p>
            `;

        case "Family":

            return `
            <p class="groupTitle">Family</p>

            <p>

            Family has always been at the heart of our lives.

            Having you celebrate with us would make this day even more meaningful.

            </p>

            <p class="signature">

            With love and gratitude,

            <br>

            <strong>Von & Tin</strong>

            </p>
            `;

        case "Bridesmaid":

            return `
            <p class="groupTitle">Bridesmaid</p>

            <p>

            Thank you for saying YES to standing beside me on one of the most meaningful days of my life.

            </p>

            <p class="signature">

            Love,

            <br>

            <strong>Tin</strong>

            </p>
            `;

        case "Groomsmen":

            return `
            <p class="groupTitle">Groomsman</p>

            <p>

            Thank you for standing beside me as I begin this new chapter.

            I truly appreciate your friendship.

            </p>

            <p class="signature">

            With appreciation,

            <br>

            <strong>Von</strong>

            </p>
            `;

        default:

            return `
            <p class="groupTitle">Wedding Guest</p>

            <p>

            We are delighted to invite you to celebrate one of the happiest days of our lives.

            We hope you can join us as we begin this beautiful journey together.

            </p>

            <p class="signature">

            With love and gratitude,

            <br>

            <strong>Von & Tin</strong>

            </p>
            `;

    }

}
        }

    });

}



// =======================
// SEARCH INVITATION
// =======================

document.getElementById("searchButton").addEventListener("click", function(){

    const name = document.getElementById("guestName").value.trim();


    if(name === ""){

        alert("Please enter your full name.");
        return;

    }


    fetch(scriptURL + "?action=search&name=" + encodeURIComponent(name))


    .then(response => response.json())


    .then(data => {


        if(data.found === false){

            document.getElementById("result").innerHTML = `

            <div class="invitation-box">

            <p>
            We’re sorry, your name is not on our guest list.
            Please contact Christine & Von.
            </p>

            </div>

            `;

            return;

        }


        guestData = data;


        document.getElementById("result").innerHTML = `


        <div class="invitation-box">


        <h3>
        Dear ${data.name},
        </h3>


        <p>
        We are delighted to invite you
        to celebrate our wedding.
        </p>


        <h4>
        Reserved Seats
        </h4>


        <div class="seat-number">
        ${data.seats}
        </div>


        <p>
        Will you be joining us?
        </p>



        <button onclick="confirmAttendance(true)">
        🤎 Yes, We'll Be There
        </button>



        <button class="no-button" onclick="confirmAttendance(false)">
        🤍 Sorry, We Can't Make It
        </button>



        </div>


        `;


    })


    .catch(error=>{

        console.log(error);

        alert("Something went wrong. Please try again.");

    });


});





// =======================
// CONFIRM ATTENDANCE
// =======================

function confirmAttendance(answer){


    if(answer === false){

        submitRSVP("No");

        return;

    }


    let guestFields = "";


    for(let i = 2; i <= guestData.seats; i++){


        guestFields += `


        <label>
        Guest ${i}
        </label>


        <input
        type="text"
        class="extraGuest"
        placeholder="Guest ${i} Name">


        `;

    }



    document.getElementById("result").innerHTML = `


    <div class="rsvp-details">


    <h3>
    Primary Guest
    </h3>


    <div class="primary">

    ${guestData.name}

    <span>
    ✓ Included
    </span>

    </div>



    ${guestFields}



    <p>
    Only fill in the names of guests who will attend.
    Unused reserved seats may be left blank.
    </p>



    <label>
    Message for the Couple (Optional)
    </label>



    <textarea id="message"
    placeholder="Write your message here..."></textarea>



    <button onclick="submitRSVP('Yes')">
    Submit RSVP
    </button>



    </div>



    `;


}





// =======================
// SUBMIT RSVP
// =======================

function submitRSVP(status){


    let guests = [];


    document.querySelectorAll(".extraGuest")

    .forEach(input=>{


        if(input.value.trim() !== ""){

            guests.push(input.value.trim());

        }

    });



    const message = document.getElementById("message")
    ?
    document.getElementById("message").value
    :
    "";



    fetch(scriptURL,{

        method:"POST",

        body:JSON.stringify({

            name:guestData.name,

            status:status,

            guests:guests.join(", "),

            message:message

        })

    })


    .then(()=>{


        if(status === "No"){


            document.getElementById("result").innerHTML = `


            <div class="thank-you">


            <h2>
            Thank You!
            </h2>


            <p>
            We appreciate you letting us know.
            </p>


            <p>
            We understand that you won't be able to join us.
            </p>


            <p>
            With love and gratitude,
            <br>
            Christine & Von
            </p>


            </div>


            `;


        } else {


            document.getElementById("result").innerHTML = `


            <div class="thank-you">


            <h2>
            Thank You!
            </h2>


            <p>
            Your RSVP has been received.
            </p>


            <p>
            We can't wait to celebrate
            our special day with you.
            </p>


            <p>
            With love and gratitude,
            <br>
            Christine & Von
            </p>


            </div>


            `;


        }


    })


    .catch(error=>{

        console.log(error);

        alert("Something went wrong. Please try again.");

    });


}
// =====================================
// SEARCH GUEST
// =====================================

async function searchGuest(){

    const guestName = guestInput.value.trim();

    if(guestName==""){

        alert("Please enter your name.");

        return;

    }

    result.innerHTML="<p>Searching your invitation...</p>";

    try{

        const response = await fetch(

            WEB_APP_URL +
            "?action=search&name=" +
            encodeURIComponent(guestName)

        );

        const data = await response.json();

        if(!data.found){

            result.innerHTML=`

            <div class="notFound">

            <h2>Invitation Not Found</h2>

            <p>

            We couldn't find your invitation.

            Please check the spelling of your name.

            </p>

            </div>

            `;

            return;

        }

        showInvitation(data);

    }

    catch(error){

        console.log(error);

        result.innerHTML="Unable to connect.";

    }

}

// =====================================
// SHOW INVITATION
// =====================================

function showInvitation(data){

    let html="";

    html+=`

    <div class="fadeIn">

    <h2>

    Dear ${createGreeting(data.name)},

    </h2>

    ${invitationMessage(data.group)}

    <div class="reservedSeats">

    Reserved Seats

    <h1>${data.seats}</h1>

    </div>

    <button onclick="acceptInvitation()">

    🤎 Joyfully Accept

    </button>

    <br><br>

    <button onclick="declineInvitation()">

    🤍 Regretfully Decline

    </button>

    </div>

    `;

    result.innerHTML=html;

    window.currentGuest=data;

}

// =====================================
// ACCEPT
// =====================================

function acceptInvitation(){

    let html="";

    html+="<h2>Guest Names</h2>";

    html+=`

    <input

    value="${currentGuest.name}"

    readonly

    class="lockedGuest">

    `;

    for(let i=2;i<=currentGuest.seats;i++){

        html+=`

        <input

        class="guestField"

        placeholder="Guest ${i} (Optional)">

        `;

    }

    html+=`

    <textarea

    id="guestMessage"

    placeholder="Leave us a message (Optional)">

    </textarea>

    <br><br>

    <button onclick="submitRSVP('Yes')">

    Submit RSVP

    </button>

    `;

    result.innerHTML=html;

}

// =====================================
// DECLINE
// =====================================

function declineInvitation(){

    submitRSVP("No");

}

// =====================================
// SUBMIT
// =====================================

async function submitRSVP(answer){

    let guestNames=[];

    let attending=0;

    if(answer=="Yes"){

        guestNames.push(currentGuest.name);

        attending++;

        document.querySelectorAll(".guestField")

        .forEach(field=>{

            if(field.value.trim()!=""){

                guestNames.push(

                    field.value.trim()

                );

                attending++;

            }

        });

    }

    const message=

    document.getElementById("guestMessage")

    ?

    document.getElementById("guestMessage").value

    :

    "";

    const payload={

        action:"submit",

        guest:currentGuest.name,

        rsvp:answer,

        guests:guestNames.join("\n"),

        attending:attending,

        message:message

    };

    result.innerHTML=`

    <h2>

    Sending your RSVP...

    </h2>

    `;

    try{

        await fetch(WEB_APP_URL,{

            method:"POST",

            body:JSON.stringify(payload)

        });

        result.innerHTML=`

        <div class="thankyou">

        <h2>

        Thank you! 🤎

        </h2>

        <p>

        Your RSVP has been recorded.

        </p>

        </div>

        `;

    }

    catch(error){

        result.innerHTML=`

        <h2>

        Something went wrong.

        </h2>

        `;

    }

}
