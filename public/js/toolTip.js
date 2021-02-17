const CLICK_TOLERANCE=5;
const NONE="";

var imgPortfolio;
var backgroundCanvas;
var ctxBack;
var clickables=[];
var currentClickable;

init = function()
{
    console.log("toolTip: Initialising");
    imgPortfolio = document.getElementById("imgPortfolio");
    backgroundCanvas = document.getElementById("backgroundDisplay");
    fixDPI(backgroundCanvas);
    ctxBack = backgroundCanvas.getContext("2d");
    addCanvasClickListener(backgroundCanvas);
    
    addClickables();
    currentClickable=NONE;

    ctxBack.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    ctxBack.drawImage(imgPortfolio, 0,0);
};

addClickables=function()
{
    clickables=[];
    // Numbers are %width & %height
    clickables.push(new Clickable(47,7,"divCodeReady"));
    clickables.push(new Clickable(23,27,"divIntegration",));
    clickables.push(new Clickable(47,26,"divRuntimes"));
    clickables.push(new Clickable(72,27,"divPAM"));
    clickables.push(new Clickable(47,36,"divACM"));
    clickables.push(new Clickable(44,44,"divOpenShift"));
    clickables.push(new Clickable(13,61,"divRHEL"));
    clickables.push(new Clickable(24,61,"divRHV"));
    clickables.push(new Clickable(36,62,"divOpenStack"));
    clickables.push(new Clickable(46,69,"divOCS"));
    clickables.push(new Clickable(46.79,"divRHEL"));    
    clickables.push(new Clickable(5,9,"divInsights"));
    clickables.push(new Clickable(5,38,"divAnsible"));
    clickables.push(new Clickable(5,64,"divSatellite","Satellite"));
}

addCanvasClickListener=function(canvas)
{
    canvas.addEventListener('click', function(event) 
    {
        var xPercent = Math.floor((100*event.offsetX)/backgroundCanvas.width);
        var yPercent = Math.floor((100*event.offsetY)/backgroundCanvas.height);
        console.log("Click at "+xPercent+"% / "+yPercent+"%");
        findClickable(xPercent,yPercent);
    }, false);
}

findClickable=function(x,y)
{
    for (var i=0;i<clickables.length;i++)
    {
        if (Math.abs(x-clickables[i].x) <= CLICK_TOLERANCE && Math.abs(y-clickables[i].y) <= CLICK_TOLERANCE)
        {
            showClickableForm(clickables[i]);
            return;
        }
    }
}

function showClickableForm(clickable) 
{
    console.log("showClickableForm: "+clickable.divName);
    var d = document.getElementById(clickable.divName);
    d.style.position = "absolute";
    d.style.left = clickable.x+'%';
    d.style.top = clickable.y+'%';
    document.getElementById(clickable.divName).style.display= "block";
}

function closeClickableForm(divName) 
{
  document.getElementById(divName).style.display= "none";
}

function fixDPI(canvas)
{
    var dpi = window.devicePixelRatio;
    var style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    var style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}

Clickable=function(x,y,divName)
{
    this.x=x;
    this.y=y;
    this.divName=divName;
}