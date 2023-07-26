peter_pan_song="";
harry_potter_theme_song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
scorerightWrist=0;
song_music="";
song_music2="";


function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    Video=createCapture(VIDEO);
    Video.hide();
    posenet=ml5.poseNet(Video, modelLoaded);
    posenet.on('pose', gotpose);
}

function modelLoaded(){
    console.log("posenet is intialized");
}

function preload(){
    peter_pan_song=loadSound("music.mp3");
    harry_potter_theme_song=loadSound("music2.mp3");
}

function draw(){
    image(Video,0,0,600,500);
    fill("green");
    stroke("yellow");

    song_music=peter_pan_song.isPlaying();
    song_music2=harry_potter_theme_song.isPlaying();
    console.log(song_music);
    console.log(song_music2);

    if(scoreleftwrist > 0.2){
        circle(leftwristx,leftwristy, 25);
        harry_potter_theme_song.stop();
        if (song_music==false) {
            peter_pan_song.play();
        
            document.getElementById("song_id").innerHTML="song Name: peter pan song";
        }
    }
    if(scorerightwrist > 0.2){
        circle(rightwristx,righttwristy, 25);
        peter_pan_song.stop();
        if (song_music2==false) {
            harry_potter_theme_song.play();
        
            document.getElementById("song_id").innerHTML="song Name: harry_potter_theme_song";
        }
    }

}


function gotpose(results){
    if (results.length > 0) {
        console.log(results);

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwristx= "+leftwristx);
        console.log("leftwristy= "+leftwristy);

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("rightwristx= "+rightwristx+"rightwristy= "+rightwristy);
        
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist= "+scoreleftwrist);

        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("scorerightwrist= "+scorerightwrist);
    }
}