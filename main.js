song = "" ;
leftWristX = 0 ;
leftWristY = 0 ;

rightWristX = 0 ;
rightWristY = 0 ;

scoreLeftWristY = 0;

function preload() {
    song = loadSound("ROCKSTAR.mp3") ;
}

function setup() {
     canvas = createCanvas(300,300) ;
     canvas.center() ;
     video = createCapture(VIDEO) ;
     video.hide() ;

     poseNet = ml5.poseNet(video,modelLoaded) ;
     poseNet.on("pose",gotPoses) ;
}

function modelLoaded () {
    console.log("Pose Is Initialised") ;
}

function draw() {
    image(video,0,0,300,300) ;
    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX,leftWristY,20) ;

    
    if(rightWristY >0 && leftWristY <=100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x" ;
        song.rate(0.5) ;
    }
    else if(rightWristY >100 && leftWristY <=200) {
        document.getElementById("speed").innerHTML = "Speed = 1x" ;
        song.rate(1) ;
    }
    else if(rightWristY >200 && leftWristY <=300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x" ;
        song.rate(1.5) ;
    }
    else if(rightWristY >300 && leftWristY <=400) {
        document.getElementById("speed").innerHTML = "Speed = 2x" ;
        song.rate(2) ;
    }
    else if(rightWristY >400 && leftWristY <=500) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x" ;
        song.rate(2.5) ;
    }


    if(scoreLeftWristY > 0.2) {
        InNumberleftWristY = Number(leftWristY) ;
        remove_decimals = floor(InNumberleftWristY) ;
        volume = remove_decimals/500 ;
        document.getElementById("volume").innerHTML = "Volume" + volume ;
        song.setVolume(volume) ;
    }
}

function play() {
    song.play() ;
    song.setVolume(1) ;
    song.rate() ;
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results) ;
        scoreLeftWristY = results[0].pose.keypoints[9].score ;
        console.log("ScoreLeftWristY"+scoreLeftWristY) ;
 
        leftWristX = results[0].pose.leftWrist.x ;
        leftWristY = results[0].pose.leftWrist.y ;
        console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY) ;

        rightWristX = results[0].pose.rightWrist.x ;
        rightWristY = results[0].pose.rightWrist.y ;
        console.log("rightWristX" + rightWristX + "rightWristY" + rightWristY) ;
    }
}

