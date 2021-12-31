var timeText
var rotations = 0

// Mouse pointer location
var mouse_x = null;
var mouse_y = null;

function drawCanvas(imageSource) {
    imageObj = new Image();
    imageObj.onload = function () {
        ctx.drawImage(imageObj, 0, 0, imgWidth, imgHeight);
    };
    imageObj.src = imageSource;
    canvas.addEventListener('mousemove', function(e){trackMouse(duration,e)}, false);
}

//MOUSE TRACKING
mouseArray = [];
var timeChange2 = setInterval(function() {duration = Math.round((duration - .1) * 10) / 10}, 100);

function trackMouse(duration,e) {
  mouseArray.push([duration,e.offsetX,e.offsetY]);
}

function renderQuestion(userID, sequence, duration) {
    exercise_img_src = "/images/5_1_3-Images/img-" + sequence + ".png";
    obj_img = "/images/objects/targetobjects.png";

    if (duration > 0) {
        drawCanvas(exercise_img_src);

        document.getElementById("img2find").src = obj_img;
        document.getElementById("img2find").width = "200"
    } else {
        document.getElementById("canvas").style.visibility = "hidden";
        document.getElementById("imgText").innerHTML = "Times up! Submit your answer.";
        display.textContent = " 00:00";
    }

    var canvas = document.getElementById("canvas");

    var w = window.innerWidth;

    var formatter = d3.format("");
    var tickFormatter = function(d) {
      return formatter(d) + "%";
    }

    let sliderWidth = d3.select('#slider-simple').node().offsetWidth


var sliderSimple = d3
    .sliderHorizontal()
    .min(0)
    .max(100)
    .width(sliderWidth/1.2)
    .tickFormat(tickFormatter)
    .ticks(9)
    .step(10)
    .default(50)
    .on('onchange', val => {
        d3.select('p#value-simple').text(d3.format('.0%')(val));
    });

d3.select('div#slider-simple')
    .append('svg')
    .attr('width', sliderWidth)
    .attr('height', 90)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(sliderSimple);

      d3.select('p#value-simple').text(d3.format('.0%')(sliderSimple.value()));

    //
    //Button
    //
    d3.select(".btn-outline-success").on("click", function () {
      console.log("BUTTON PRESSED");
        var q1 = [];
        var q2

        //
        //Get time
        //
        var timeLeft = document.getElementById("time").innerHTML
        console.log(timeLeft)

        timeLeft = timeLeft.substring(timeLeft.length - 2)
        timeLeft = parseInt(timeLeft)
        console.log(timeLeft)

        //
        //Question 1
        //

        var radio11 = document.getElementById('option11')
        var radio12 = document.getElementById('option12')

        if (option11.checked){
            q1[0] = 1;
        }
        else{
            q1[0] = 0;
        }

        console.log(q1)

        //
        //Question 2
        //


        q2 = document.getElementById("value-simple").innerHTML
        console.log(q2)

        sendData(userID, timeLeft, q1, q2, mouseArray);

    })
}


function sendData(userID, time, q1, q2, array) {
    console.log("sending data")

    url2go = userID + "/data"
    data2send = [time, q1, q2, array]
    console.log("time: " + time + " q1: " + q1 + "q2: " + q2 + " array: " + array);

    //add ajax function
    new Promise((resolve, reject) => {
        $.ajax({
            dataType: "json",
            url: url2go,
            type: "POST",
            data: JSON.stringify(data2send),
            success: resolve
        });
    });
}

function startTimer(duration, display, captionText, userID) {
    var timer = duration, minutes, seconds;
    var timeChange = setInterval(function () {
        if (--timer < 0) {
            //document.getElementById("submitButton").style.visibility = "hidden";
            //document.getElementById("errorText1").innerHTML = "Time is out! Changing to next question...";
            //document.getElementById("errorText2").innerHTML = "Time is out! Changing to next question...";

            clearInterval(timeChange)

            //setTimeout(sendFunc, 1000)
            document.getElementById("canvas").style.visibility = "hidden";
            document.getElementById("imgText").innerHTML = "Times up! Submit your answer.";
            display.textContent = " 00:00";

            return
        } else {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
            captionText.innerHTML = "Time remaning: " + timeText;
            timeText = minutes + ":" + seconds;
        }

    }, 1000);


}
