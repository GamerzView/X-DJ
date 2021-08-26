volume = 0;
speed = 1;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftwrist = 0;
scoreRightwrist = 0;
song = "";
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function music() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() { console.log("model is working noicely") }
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        console.log("left wrist X is" + leftWristX);
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist Y is" + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        console.log("right wrist X is" + leftWristX);
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist Y is" + rightWristY);
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        scoreRightwrist = results[0].pose.keypoints[10].score;
    }
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("blue");
    stroke("pink");

    if (scoreLeftwrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        inNumberleftWristY = Number(leftWristY);
        removeDesimals = floor(inNumberleftWristY);
        volume = removeDesimals / 500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "volume = " + volume
    }
    if (scoreRightwrist > 0.2) {
        fill("pink");
        stroke("blue");
        circle(rightWristX, rightWristY, 20)
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "speed = 0.5x "
            song.rate(0.5)
        }
        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "speed = 1x "
            song.rate(1)
        }
        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "speed = 1.5x "
            song.rate(1.5)
        }
        else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "speed = 2x "
            song.rate(2)
        }
        else if (rightWristY > 400) {
            document.getElementById("speed").innerHTML = "speed = 2.5x "
            song.rate(2.5)
        }
    }
}
function stop() {
    volume = 1;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.rate(1);
    document.getElementById("speed").innerHTML = "speed = 1x "
    song.stop();
}