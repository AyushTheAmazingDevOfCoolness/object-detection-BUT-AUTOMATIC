function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetection=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = ("Status : Object Detected");
    video = createCapture(VIDEO);
    video.hide();
}

img ="";
status="";
objects = [];

function preload()
{
img = loadImage("dog_cat.jpg");
}

function modelLoaded()
{
    console.log("Model Loaded!")
    status= "True";
    objectDetection.detect(video, gotResults);
}

function draw()
{
 image(video, 0, 0, 380, 380);

 if(status !="")
 {
     r = random(255);
     b = random(255);
     g = random(255);
   for (i = 0; i < objects.length; i++)
   {
       document.getElementById("status").innerHTML="Status : Object Detected";
       document.getElementById("numberOfObjects").innerHTML="Number Of Objects Detected Aaarrreee"+objects.length;
       fill(r, g, b);
       percent = floor(objects[i].confidence * 100);
       text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
       noFill();
       stroke(r, g, b);
       rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
   }
 }
}

function gotResults(error, results)
{
    if(error){
        console.log(error)
    }
    else{
       console.log(results);
       objects = results;     
    }
}