// GOOGLE SHEET WEB APP URL
const scriptURL = "https://script.google.com/macros/s/AKfycbzXCcovs5ZM9YzqMXgckN_vwzTu_FRc9Nd1Reab__COKVJnJf65vv5NomY_PgZfoFlL/exec";


let guestData = null;


// =======================
// MUSIC CONTROL
// =======================

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

if(musicButton && music){

    musicButton.addEventListener("click", function(){

        if(music.paused){

            music.play();
            musicButton.innerHTML = "⏸ Pause Music";

        }else{

            music.pause();
            musicButton.innerHTML = "▶ Play Music";

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



    fetch(scriptURL + "?name=" + encodeURIComponent(name))


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


    .catch(error => {

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
    placeholder="Write your message here...">
    </textarea>



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

    .forEach(input => {


        if(input.value.trim() !== ""){

            guests.push(input.value.trim());

        }


    });



    const message =

    document.getElementById("message")

    ?

    document.getElementById("message").value

    :

    "";





    fetch(scriptURL, {


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

});


        } else {



            document.getElementById("result").innerHTML = `


            <div class="thank-you">


            <div class="heart">
            🤎
            </div>


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


    });



}
