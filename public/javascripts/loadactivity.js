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

function mouseMove(e) {
  mousex = e.offsetX;
  mousey = e.offsetY;

  //zoom feature
  if(e.offsetX > 100 && e.offsetX < 400 && e.offsetY > 100 && e.offsetY < 400)  //within main bounds
    zoom_ctx.drawImage(canvas, e.offsetX-100, e.offsetY-100, 200, 200, 0, 0, 500, 500);
  else if(e.offsetX < 100 && e.offsetY < 100)                                   //top left corner
    zoom_ctx.drawImage(canvas, 0, 0, 200, 200, 0, 0, 500, 500);
  else if(e.offsetX > 400 && e.offsetY > 400)                                   //bottom right corner
    zoom_ctx.drawImage(canvas, 300, 300, 200, 200, 0, 0, 500, 500);
  else if(e.offsetX < 100 && e.offsetY > 100 && e.offsetY < 400)                //left edge
    zoom_ctx.drawImage(canvas, 0, e.offsetY-100, 200, 200, 0, 0, 500, 500);
  else if(e.offsetY < 100 && e.offsetX > 100 && e.offsetX < 400)                //top edge
    zoom_ctx.drawImage(canvas, e.offsetX-100, 0, 200, 200, 0, 0, 500, 500);
  else if(e.offsetX > 400 && e.offsetY > 100 && e.offsetY < 400)                //right edge
    zoom_ctx.drawImage(canvas, 300, e.offsetY-100, 200, 200, 0, 0, 500, 500);
  else if(e.offsetY > 400 && e.offsetX > 100 && e.offsetX < 400)                //bottom edge
    zoom_ctx.drawImage(canvas, e.offsetX-100, 300, 200, 200, 0, 0, 500, 500);


  if(drag){
      ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
      ctx.drawImage(imageObj, 0, 0, imgWidth, imgHeight);
      ctx.beginPath();
      rect.w = mousex - rect.startX;
      rect.h = mousey - rect.startY;
      ctx.strokeStyle = 'red';
      ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
      ctx.closePath();
  }
    //Output
    $('#output').html('current: ' + mousex + ', ' + mousey + '<br/>last: ' + rect.startX + ', ' + rect.startY + '<br>height: ' + rect.h + ', width: ' + rect.w + '<br/>' + '<br/>mousedown: ' + drag + '<br>offset: ' + this.offsetLeft + ', ' + this.offsetTop + '</br>');
}

function renderQuestion(userID, sequence, duration) {
    var x = parseInt(sequence)+13;
    console.log(sequence);
    if(sequence > 11){
      //console.log(sequence+13);
      exercise_img_src = "/images/4_3_1_Z-Images/image-z_" + x + ".png";
      ex_img_left = "/images/4_3_1_X-Images/image-x_" + x + ".png";
      ex_img_right = "/images/4_3_1_Y-Images/image-y_" + x + ".png";
    }
    else{
      exercise_img_src = "/images/4_3_1_Z-Images/image-z_" + sequence + ".png";
      ex_img_left = "/images/4_3_1_X-Images/image-x_" + sequence + ".png";
      ex_img_right = "/images/4_3_1_Y-Images/image-y_" + sequence + ".png";
    }

    obj_img = "/images/objects/targetobjects.png";

    if (duration > 0) {
        drawCanvas(exercise_img_src);
        document.getElementById("img2find_left").src = ex_img_left;
        document.getElementById("img2find_right").src = ex_img_right;

        document.getElementById("img2find").src = obj_img;
        document.getElementById("img2find").width = "200"
    } else {
        document.getElementById("canvas").style.visibility = "hidden";
        document.getElementById("zoomcanvas").style.visibility = "hidden";
        document.getElementById("imgText").innerHTML = "Times up! Submit your answer.";
        display.textContent = " 00:00";
    }

    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var canvas = document.getElementById("canvas");
    var zoomcanvas = document.getElementById("zoomcanvas");

    var w = window.innerWidth;


    // TODO: Add canvas in zoomed-in image

    targetobjbutton.onclick = function () {

      modal.style.display = "block";
      modalImg.src = obj_img;
      modalImg.width = '75%';
    }
    canvas.ondblclick = function () {
        modal.style.display = "block";
        modalImg.src = exercise_img_src;
        modalImg.width = '75%';
    }
    img2find_left.ondblclick = function () {
        modal.style.display = "block";
        modalImg.src = ex_img_left;
        modalImg.width = '75%';
    }
    img2find_right.ondblclick = function () {
        modal.style.display = "block";
        modalImg.src = ex_img_right;
        modalImg.width = '75%';
    }

    var span = document.getElementsByClassName("close")[0];
    span.width = w / 2
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }



  var formatter = d3.format(",.2f");
      var tickFormatter = function(d) {
        if(d == 0){
          return "Uncertain";
        }
        if(d == .30){
          return "Slightly Confident";
        }
        if(d == .70){
          return "Confident";
        }
        if(d == 1){
          return "Very Confident";
        }
      }

      let sliderWidth = d3.select('#slider-simple').node().offsetWidth
  var data = [0, .30, .70,1];

  var sliderSimple = d3
      .sliderHorizontal()
      .min(d3.min(data))
      .max(d3.max(data))
      .width(sliderWidth/1.2)
      .tickFormat(tickFormatter)
      .ticks(9)
      .step(.1)
      .default(.5)
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
        var q3

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
        //
        //Question 2
        //


        q2 = document.getElementById("value-simple").innerHTML
        console.log(q2)

        //
        //Question 3
        //

        var radio21 = document.getElementById('option21')
        var radio22 = document.getElementById('option22')

        if (radio21.classList.contains('active')) {
            q3 = 1
        } else if (radio22.classList.contains('active')) {
            q3 = 0
        } else {
            q3 = -2
        }


        sendData(userID, timeLeft, q1, q2, q3, rect, mouseArray);

    })
}


function sendData(userID, time, q1, q2, q3, bb, array) {
    console.log("sending data")

    url2go = userID + "/data"
    data2send = [time, q1, q2, q3, bb, array]
    console.log("time: " + time + " q1: " + q1 + " q2: " + q2 + " q3: " + q3 + " rectangle: {" + bb.startX + ", " + bb.startX + ", " + bb.w + ", " + bb.h + "}" + " array: " + array);

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
            document.getElementById("img2find_left").style.visibility = "hidden";
            document.getElementById("img2find_right").style.visibility = "hidden";
            document.getElementById("canvas").style.visibility = "hidden";
            document.getElementById("zoomcanvas").style.visibility = "hidden";
            document.getElementById("imgText").innerHTML = "Times up! Submit your answer.";
            display.textContent = " 00:00";

            var modal = document.getElementById("myModal");
            modal.style.display = "none";


            //function sendFunc(){
            //    sendData(userID, 0, -1,"-1%",-1)
            //    document.forms.item(0).submit()
            //}
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
