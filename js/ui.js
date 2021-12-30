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
    art.isDragging = true;
    art.dragStart.x = getEventLocation(e).x/ art.cameraZoom - art.cameraOffset.x;
    art.dragStart.y = getEventLocation(e).y/ art.cameraZoom - art.cameraOffset.y;
    //console.log("pointerdown");
}

function onPointerUp(e, art, mats)
{
    art.isDragging = false;
    art.lastZoom = art.cameraZoom;
    if(!art.dragChanged){
      console.log("clicked!");
      checkHit(mats, art);
    }
    art.dragChanged = false;
}

function onPointerMove(e, art)
{
    if (art.isDragging)
    {
      art.cameraOffset.x = getEventLocation(e).x / art.cameraZoom - art.dragStart.x;
      art.cameraOffset.y = getEventLocation(e).y / art.cameraZoom - art.dragStart.y;
      art.dragChanged = true;
      console.log("drag detected");
      console.log(art.cameraOffset);
    }
    //console.log("pointermove");
}

function updateTranslationAndZoom(art, mats){
  //console.log("updater");
  art.ctx.resetTransform();
  art.ctx.clearRect(0, 0, art.ctx.canvas.width, art.ctx.canvas.height);
  art.ctx.translate(-art.ctx.canvas.width / 2 + art.cameraOffset.x, -art.ctx.canvas.height/2 + art.cameraOffset.y);
  render(art, mats);
  requestAnimationFrame(function(){updateTranslationAndZoom(materialArtist, sampleMats);});
}