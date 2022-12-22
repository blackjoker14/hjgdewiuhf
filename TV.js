TV_image = "";
status = "";
results = "";

function preload() {
    TV_image = loadImage('TVTV.jpg');
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}


function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}



function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();
}

function start(){
 objectDetector = ml5.objectDetector('cocossd', modelLoaded);
 document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(video, 0, 0, 640, 420);

    if(status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ object.length;

            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(objects[i].label + "" + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}