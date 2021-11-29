var timeText
var rotations = 0

function rotateElem(){

    var angle = ($('#myImg').data('angle') + 90) || 90;
    $('#myImg').css({'transform': 'rotate(' + angle + 'deg)'});
    $('#myImg').data('angle', angle);

    var angle = ($('#img01').data('angle') + 90) || 90;
    $('#img01').css({'transform': 'rotate(' + angle + 'deg)'});
    $('#img01').data('angle', angle);

}

// Mouse pointer location
var mouse_x = null;
var mouse_y = null;

function drawCanvas(imageSource) {
    imageObj = new Image();
    imageObj.onload = function () {
        ctx.drawImage(imageObj, 0, 0, imgWidth, imgHeight);
    };
    imageObj.src = imageSource;
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousemove', function(e){trackMouse(duration,e)}, false);
}
function mouseDown(e) {
  rect.startX = e.offsetX;
  rect.startY = e.offsetY;
  drag = true;
  document.getElementById('popup').style.visibility = "hidden";
}

function mouseUp() {
    drag = false;
}

//MOUSE TRACKING
mouseArray = [];
var timeChange2 = setInterval(function() {duration = Math.round((duration - .1) * 10) / 10}, 100);

function trackMouse(duration,e) {
  mouseArray.push([duration,e.offsetX,e.offsetY]);
}

function renderQuestion(userID, sequence, duration) {
    var x = parseInt(sequence)+13;
    console.log(sequence);
    if(sequence > 11){
      //console.log(sequence+13);
      exercise_img_src = "/images/4_3_1_Z-Images/image-z_" + x + ".png";
    }
    else{
      exercise_img_src = "/images/4_3_1_Z-Images/image-z_" + sequence + ".png";
    }

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

    var modalImg = document.getElementById("img01");
    var canvas = document.getElementById("canvas");

    var w = window.innerWidth;

  d3.select('p#value-simple').text(d3.format('.0%'));
    //
    //Button
    //
    d3.select(".btn-outline-success").on("click", function () {
      console.log("BUTTON PRESSED");
        var q1 = [];

        //
        //Get time
        //
        var timeLeft = document.getElementById("time").innerHTML
        console.log(timeLeft)

        timeLeft = timeLeft.substring(timeLeft.length - 2)
        timeLeft = parseInt(timeLeft)
        console.log(timeLeft)

        //var endTime = new Date().getTime();
        //var time = endTime - startTime;

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

        if(option12.checked){
          rect.X = null
          rect.Y = null
          rect.w = null
          rect.h = null
          q1[1] = 1;

          document.getElementById("popup").innerText = "";
        }
        else{
            q1[1] = 0;
        }

        if (option13.checked) {
            q1[2] = 1

            //if answer is no, dont send x y data
            rect.X = null
            rect.Y = null
            rect.w = null
            rect.h = null

        }
        else{
            q1[2] = 0;
        }
        console.log(q1)

        sendData(userID, timeLeft, q1, mouseArray);

    })
}


function sendData(userID, time, q1, array) {
    console.log("sending data")

    url2go = userID + "/data"
    data2send = [time, q1, array]
    console.log("time: " + time + " q1: " + q1}" + " array: " + array);

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
