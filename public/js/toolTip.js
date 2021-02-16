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
    clickables.push(new Clickable(802,58,"divCodeReady"));
    clickables.push(new Clickable(399,230,"divIntegration",));
    clickables.push(new Clickable(810,230,"divRuntimes"));
    clickables.push(new Clickable(1234,233,"divPAM"));
    clickables.push(new Clickable(834,308,"divACM"));
    clickables.push(new Clickable(756,381,"divOpenShift"));
    clickables.push(new Clickable(239,525,"divRHEL"));
    clickables.push(new Clickable(427,529,"divRHV"));
    clickables.push(new Clickable(592,529,"divOpenStack"));
    clickables.push(new Clickable(804,592,"divOCS"));
    clickables.push(new Clickable(790,671,"divRHEL"));    
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
    currentClickable=clickable.divName;
    var d = document.getElementById(currentClickable);
    d.style.position = "absolute";
    d.style.left = clickable.x+'%';
    d.style.top = clickable.y+'%';
    document.getElementById(currentClickable).style.display= "block";
}

function closeClickableForm() 
{
  document.getElementById(currentClickable).style.display= "none";
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