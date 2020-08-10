const content_area = "Textarea"; //dont change it , it will break the editor
const num_add = 0;
let startup = () => {
    check_theme()
    check_diag()
    run_auto()
    document.getElementById("targetCode").style.display = "block";
    document.getElementById("targetCode").style.zIndex = "1";
    document.getElementById("hif").style.backgroundColor = "transparent";
};
let run = () => {
  let inputz = document.getElementById(content_area).value;
  let iframe = document.getElementById('targetCode');
  iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument) ? iframe.contentDocument.document :
    iframe.contentDocument;

  iframe.document.open();
  iframe.document.write(inputz);
  iframe.document.close();
  return false;
}

let run_auto = () => {
  run();
  auts = setTimeout("run_auto()", 500);

}

let copy = (idx) => {
  let datax = document.getElementById(idx);
  datax.select();
  document.execCommand("copy");
  msg('coppied to clipboard')
}

let engine = () => {
  let get_text = document.getElementById(content_area).value;
  let get_textAsBlob = new Blob([get_text], {
    type: "text/plain"
  });
  let get_textAsURL = window.URL.createObjectURL(get_textAsBlob);
  
  if ( document.getElementById("inputFileNameToSaveAs").value != "")
     fileName=  document.getElementById("inputFileNameToSaveAs").value;
  
  else if ( document.getElementById("inputFileNameToSaveAs").value == "") {
     fileName = "index.html";
  }

  if (get_text == ""){
      msg('no content found , press ok or esc to save it')
  }
  else if (get_text != "") {
    msg('file saved')
  }
  let downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.innerHTML = "Download File";
  downloadLink.href = get_textAsURL;
  downloadLink.onclick = destroyClickedElement;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);

  downloadLink.click();

}

let destroyClickedElement = (event) => {
  document.body.removeChild(event.target);
  document.getElementById('savmn').style.display = "none";
}

let modules = () => {
  let fileToLoad = document.getElementById("fileToLoad").files[0];

  let fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    let textFromFileLoaded = fileLoadedEvent.target.result;
    document.getElementById(content_area).value = textFromFileLoaded;
  }
  if (fileToLoad == null) {
    msg('no file selected')
  }
  fileReader.readAsText(fileToLoad, "UTF-8");
  msg(`Successfully loaded  ${fileToLoad.name}`);

  document.getElementById('loadmn').style.display = "none";

}

let shwmen = (menu) => {
  let listx = document.getElementById(menu);
  if (listx.style.display === "none") {
    listx.style.display = "block";
  } else {
    listx.style.display = "none";
  }
};


let hdemen = (menu) => {
  document.getElementById(menu).style.display = "none";
  document.getElementById(menu).style.transition = "1s all ease-in";
}

// counter
let cntline;

let keyup = (obj, e) => {
  if (e.keyCode >= 33 && e.keyCode <= 40) // arrows ; home ; end ; page up/down
    selectionchanged(obj, e.keyCode);
}
let selectionchanged = (obj) => {
  let substr = obj.value.substring(0, obj.selectionStart).split('\n');
  let row = substr.length;
  let col = substr[substr.length - 1].length;
  let tmpstr = `(${row.toString()},${col.toString()})`;
  // if selection spans over
  if (obj.selectionStart != obj.selectionEnd) {
    substr = obj.value.substring(obj.selectionStart, obj.selectionEnd).split('\n');
    row += substr.length - 1;
    col = substr[substr.length - 1].length;
    tmpstr += ` - (${row.toString()},${col.toString()})`;
  }
}

let input_changed = (obj_txt) => {
  obj_rownr = obj_txt.parentElement.parentElement.getElementsByTagName('textarea'
  )[0];
  cntline = count_lines(obj_txt.value);
  if (cntline == 0) cntline = 1;
  tmp_arr = obj_rownr.value.split('\n');
  cntline_old = parseInt(tmp_arr[tmp_arr.length - 1], 10);
  // if there was a change in line count
  if (cntline != cntline_old) {
    obj_rownr.cols = cntline.toString().length; // new width of txt_rownr
    populate_rownr(obj_rownr, cntline);
    scroll_changed(obj_txt);
  }
  selectionchanged(obj_txt);
}

let scroll_changed = (obj_txt) => {
  obj_rownr = obj_txt.parentElement.parentElement.getElementsByTagName('textarea')[0];
  scrollsync(obj_txt, obj_rownr);
}

let scrollsync = (obj1, obj2) => {
  // scroll text in object id1 the same as object id2
  obj2.scrollTop = obj1.scrollTop;
}

let populate_rownr = (obj, cntline) => {
  tmpstr = '';
  for (i = 1; i <= cntline; i++) {
    tmpstr = tmpstr + i.toString() + '\n';
  }
  obj.value = tmpstr;
}

let count_lines = (txt) => {
  if (txt == '') {
    return 1;

  }
  return txt.split('\n').length + num_add;

};

// local storage
let set_theme = () => {
  if (localStorage.getItem("theme") == "light") {
    localStorage.setItem("theme", "dark");
    document.getElementById("theme_check").checked = true;
    dark_mode()
  }
  else if (localStorage.getItem("theme") == "dark") {
    localStorage.setItem("theme", "light");
    document.getElementById("theme_check").checked = false;
    light_mode()
  }
};

let dark_mode = () => {
  document.body.style.setProperty("--main", "#202020");
  document.body.style.setProperty("--main-alt", "#588dff");
  document.body.style.setProperty("--main-light", "#278ee2");
  document.body.style.setProperty("--text", "#c2c2c2");
  document.body.style.setProperty("--accent", "#26252b");
  document.body.style.setProperty("--dynam", "#1d1c1c");
  document.body.style.setProperty("--box", "#3b3b3b");
  document.body.style.setProperty("--btnhov", "#278ee2");
}

let light_mode = () => {
  document.body.style.setProperty("--main", "#f0f0f0");
  document.body.style.setProperty("--main-alt", "#5E91ff");
  document.body.style.setProperty("--main-light", "#5E91ff");
  document.body.style.setProperty("--text", "#26252b");
  document.body.style.setProperty("--accent", "#26252b");
  document.body.style.setProperty("--dynam", "#f9fdff");
  document.body.style.setProperty("--box", "#ffffff");
  document.body.style.setProperty("--btnhov", "#d8d8d8");
}
let check_theme = () => {
  if (localStorage.getItem('theme') == null) {
    localStorage.setItem('theme', 'light');
    console.log('theme data not found creating!');
  }
  else if (localStorage.getItem('theme') != null) {
    console.log('theme data found!');
    if (localStorage.getItem('theme') == "light") {
      light_mode()
      document.getElementById("theme_check").checked = false;
    }
    else if (localStorage.getItem('theme') == "dark") {
      dark_mode()
      document.getElementById("theme_check").checked = true;
    }
  }
};
let check_diag = () => {
  if (localStorage.getItem('diag') == null) {
    localStorage.setItem('diag', 'off');
    console.log('diag data not found creating!');
    return allowed = 0;
  }
  else if (localStorage.getItem('diag') != null) {
    console.log('diag data found!');
    if (localStorage.getItem('diag') == "on") {
      document.getElementById("confirm_check").checked = true;
      return allowed = 1;
    }
    else if (localStorage.getItem('diag') == "off") {
      document.getElementById("confirm_check").checked = false;
      return allowed = 0;
    }
    }
  };


// global event

let set_diag = () => {
  if (localStorage.getItem("diag") == "off") {
    localStorage.setItem("diag", "on");
    return allowed = 1;
  }
  else if (localStorage.getItem("diag") == "on") {
    localStorage.setItem("diag", "off");
    return allowed = 0;
  }
};
let colorit = () => {
  let red = document.getElementById('red').value;
  let green = document.getElementById('green').value;
  let blue = document.getElementById('blue').value;
  let rgb_col = `rgb(${red},${green},${blue})`;
  console.log(rgb_col)
  document.getElementById('resultcp').style.background = rgb_col;
  document.getElementById('rgbres').value = rgb_col;
}

let msg = (msge) => {
  if (allowed == 1) {
    alert(msge);
  }
  else if (allowed == 0) {} 
}

