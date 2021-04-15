let timeout;
let intervalRewind;
let video = document.getElementById('fractal');
let speed = 2;

document.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
        clearTimeout(timeout);
        rewind(speed);
    } else {
        clearTimeout(timeout);
        scrolling(speed);
    }
}, true);

function scrolling(speed) {
    video.playbackRate = 2;
    video.play();

    timeout = setTimeout(function() {
        video.pause();
    }, 200);
}

function rewind(speed) {
   clearInterval(intervalRewind);
   let startSystemTime = new Date().getTime();
   let startVideoTime = video.currentTime;

   intervalRewind = setInterval(function(){
       video.playbackRate = 2.0;
       if(video.currentTime == 0){
           clearInterval(intervalRewind);
           video.pause();
       } else {
           let elapsed = new Date().getTime()-startSystemTime;
           console.log('Rewind Elapsed: '+elapsed.toFixed(3));
           video.currentTime = Math.max(startVideoTime - elapsed*speed/1000.0, 0);
       }
   }, 30);
}
