function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tabLink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function createInventorySlots(count){
  for(let r = 0; r < count; r++){
    let prop = {
      type: "div",
      id: "invSlot" + r,
      class: "inventorySlot",
      parent: document.getElementById("slotHolder"),
      innards: ""
    }
    addElement(prop);
    let canProp = {
      type: "canvas",
      id: "invSlot" + r + "-canvas",
      class: "slotCanvas",
      parent: document.getElementById("invSlot"+r),
      innards: ""
    };
    addElement(canProp);
    let tmpCanv = document.getElementById("invSlot" + r + "-canvas");
    tmpCanv.width = 60;
    tmpCanv.height = 60;

  }
}

function addElement(props){
  //Takes in {type, id, class, parent, innards}
  let child = document.createElement(props.type);
  child.id = props.id;
  child.className = props.class;
  props.parent.appendChild(child);
  child.innerHTML = props.innards;
}

function getEventLocation(e)
{
    if (e.touches && e.touches.length == 1){
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    else if (e.clientX && e.clientY){
        return { x: e.clientX, y: e.clientY };      
    }
}

function onPointerDown(e, art)
{
  //console.log("pointerdown");
    art.isDragging = true;
    art.dragStart.x = getEventLocation(e).x/ art.cameraZoom - art.cameraOffset.x;
    art.dragStart.y = getEventLocation(e).y/ art.cameraZoom - art.cameraOffset.y;
}

function onPointerUp(e, art, mats)
{
  //console.log("pointerup");
    art.isDragging = false;
    art.lastZoom = art.cameraZoom;
    if(!art.dragChanged){
      //console.log("clicked!");
      checkHit(mats, art);
    }
    art.dragChanged = false;
}

function onPointerMove(e, art)
{
  //console.log("pointermove");
    if (art.isDragging)
    {
      //console.log("checking drag");
      tempOffsetX = getEventLocation(e).x / art.cameraZoom - art.dragStart.x;
      tempOffsetY = getEventLocation(e).y / art.cameraZoom - art.dragStart.y;
      if(art.cameraOffset.x != tempOffsetX ||  art.cameraOffset.y != tempOffsetY){
        //console.log("drag");
        art.cameraOffset.x = getEventLocation(e).x / art.cameraZoom - art.dragStart.x;
        art.cameraOffset.y = getEventLocation(e).y / art.cameraZoom - art.dragStart.y;
        art.dragChanged = true;
      }
      
    }
}

function handleTouch(e, singleTouchHandler, art, mats)
{
  //console.log(e.type);
    if ( e.touches.length == 1 )
    {
      //console.log("touch");
        singleTouchHandler(e, art, mats);
    }
    else if (e.type == "touchmove" && e.touches.length == 2)
    {
      //console.log("pinch");
        art.isDragging = false;
        handlePinch(e)
    }
}

function handlePinch(e, art)
{
  let initialPinchDistance = null;
    e.preventDefault();
    
    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY };
    
    let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2;
    
    if (initialPinchDistance == null){
        initialPinchDistance = currentDistance;
    }
    else{
        adjustZoom(art, null, currentDistance/initialPinchDistance);
    }
}

function adjustZoom(art, zoomAmount, zoomFactor)
{
    if (!art.isDragging){
        if (zoomAmount){
          art.cameraZoom += zoomAmount;
        }
        else if (zoomFactor){
            console.log(zoomFactor);
            art.cameraZoom = zoomFactor*art.lastZoom;
        }
        
        art.cameraZoom = Math.min(art.cameraZoom, art.maxZoom);
        art.cameraZoom = Math.max(art.cameraZoom, art.minZoom);
        
        console.log(zoomAmount);
    }
}

function updateTranslationAndZoom(art, mats){
  //console.log("updater");
  art.ctx.resetTransform();
  art.ctx.clearRect(0, 0, art.ctx.canvas.width, art.ctx.canvas.height);
  art.ctx.translate(-art.ctx.canvas.width / 2 + art.cameraOffset.x, -art.ctx.canvas.height/2 + art.cameraOffset.y);
  render(art, mats);
  requestAnimationFrame(function(){updateTranslationAndZoom(materialArtist, materialNodes);});
}