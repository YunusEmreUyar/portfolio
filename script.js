const setupTypewriter = (t) => {
  var HTML = t.innerHTML;

  t.innerHTML = "";

  var cursorPosition = 0,
  tag = "",
  writingTag = false,
  tagOpen = false,
  typeSpeed = 100,
  tempTypeSpeed = 0;

  var type = () => {

    if (writingTag === true) {
      tag += HTML[cursorPosition];
    }

    if (HTML[cursorPosition] === "<") {
      tempTypeSpeed = 0;
      if (tagOpen) {
        tagOpen = false;
        writingTag = true;
      } else {
        tag = "";
        tagOpen = true;
        writingTag = true;
        tag += HTML[cursorPosition];
      }
    }
    if (!writingTag && tagOpen) {
      tag.innerHTML += HTML[cursorPosition];
    }
    if (!writingTag && !tagOpen) {
      if (HTML[cursorPosition] === " ") {
        tempTypeSpeed = 0;
      } else
      {
        tempTypeSpeed = Math.random() * typeSpeed + 50;
      }
      t.innerHTML += HTML[cursorPosition];
    }
    if (writingTag === true && HTML[cursorPosition] === ">") {
      tempTypeSpeed = Math.random() * typeSpeed + 50;
      writingTag = false;
      if (tagOpen) {
        var newSpan = document.createElement("span");
        t.appendChild(newSpan);
        newSpan.innerHTML = tag;
        tag = newSpan.firstChild;
      }
    }

    cursorPosition += 1;
    if (cursorPosition < HTML.length - 1) {
      setTimeout(type, tempTypeSpeed);
    }

  };

  return {type};

}

var typer = document.querySelectorAll('.typewriter');
typer.forEach((i) => {
  if(i.style.display != "none") {
    typewriter = setupTypewriter(i);
    typewriter.type();
  }
});

const projects = document.querySelectorAll(".project");
projects.forEach((project, index) => {
  var yPos = -100;
  var xPos = "-50%";
  if(index %2 == 0) {
    xPos = "50%";
  }
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: project,
      start: "center bottom",
      ease: "ease",
      pin: "pin",
      toggleAnimations: "play reverse"
    }
  })
  .from(project, {
    x: xPos,
    y: yPos,
    opacity: 0,
    duration: 1
  });

});


// Fourier series

let time = 0;
let wave = [];
let path = []; 

let w = window.innerWidth;
let radiusBase = w > 720 ? 75 : w/8; 
let h = 300; 
let numCircles;
let frequency;
let c;

function windowResized() {
  c.resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    c = createCanvas(w, h);
    c.parent("before-canvas");
    numCircles = createSlider(1, 9, 4);
    frequency = createSlider(1, 5, 3);
    numCircles.parent("before-canvas");
    frequency.parent("before-canvas");
}

function draw() {

    background(0);
    translate(window.innerWidth * 0.25, 150);

    let x = 0;
    let y = 0;

    for (let i = 0; i < numCircles.value(); i++) {
        let prevX = x;
        let prevY = y;

        let n = i * 2 + 1;
        let radius = radiusBase * (4 / (n * PI));
        x += radius * cos(n * time);
        y += radius * sin(n * time);

        stroke(255, 100);
        noFill();
        ellipse(prevX, prevY, radius * 2);

        stroke(255,0,0, 100);
        line(prevX, prevY, x, y);
    }
    wave.unshift(y);


    translate(200, 0);
    stroke(0,255,0, 150);
    line(x - 200, y, 0, wave[0]);
    beginShape();
    noFill();
    for (let i = 0; i < wave.length; i++) {
        vertex(i, wave[i]);
    }
    endShape();

    time += frequency.value() / 100;

    if (wave.length > 500) {
        wave.pop();
    }
}