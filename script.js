
const openCity =  (evt, name) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
   
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(name).style.display = "flex";
    evt.currentTarget.className += " active";
} 


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
    