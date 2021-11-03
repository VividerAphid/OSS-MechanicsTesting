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