const content_area = "Textarea"; //dont change it , it will break the editor
const num_add = 0;
let startup = () => {
    data = setTimeout(0.6);
    clearTimeout(data);
    check_theme();
    check_diag();
    setsvg();
    run();
    document.getElementById("targetCode").style.display = "block";
    document.getElementById("targetCode").style.zIndex = "1";
    document.getElementById("hif").style.backgroundColor = "transparent";
};
let run = () => {
  let inputz = document.getElementById(content_area).value;
  let iframe = document.getElementById('targetCode');
 
  iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument) ? iframe.contentDocument.document :
    iframe.contentDocument;

  iframe.document.open()
  iframe.document.write(inputz);
  iframe.document.close();
  auto = setTimeout("run()", 100);
  return auto;
}

let load = () => {
  document.getElementById('fileToLoad').click();
}
let copy = (idx) => {
  let datax = document.getElementById(idx);
  datax.select();
  document.execCommand("copy");
  msg('copyied to clipboard')
}

let engine = () => {
  let get_text = document.getElementById(content_area).value;
  if (get_text == ""){
    msg('no content found ,saving it')
  }
  else if (get_text != "") {
    msg('file saved')
  }
  let get_textAsBlob = new Blob([get_text], {
    type: "text/plain"
  });
  let get_textAsURL = window.URL.createObjectURL(get_textAsBlob);
  fileName = "index.html";
  

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
  fileReader.readAsText(fileToLoad, "UTF-8");
  msg(`Successfully loaded  ${fileToLoad.name}`);

  

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
  if (localStorage.getItem("theme") == "dark") {
    localStorage.setItem("theme", "light");
    document.getElementById("theme_check").checked = true;
    light_mode()
  }
  else if (localStorage.getItem("theme") == "light") {
    localStorage.setItem("theme", "dark");
    document.getElementById("theme_check").checked = false;
    dark_mode()
  }
};

let dark_mode = () => {
  document.body.style.setProperty("--main", "#1e1e1e");
  document.body.style.setProperty("--main-alt", "#588dff");
  document.body.style.setProperty("--main-light", "#2c2c2c");
  document.body.style.setProperty("--text", "#c2c2c2");
  document.body.style.setProperty("--accent", "#26252b");
  document.body.style.setProperty("--dynam", "#1d1c1c");
  document.body.style.setProperty("--box", "#1b1b1b");
  document.body.style.setProperty("--btnhov", "#278ee2");
  document.body.style.setProperty("--icon", "#c2c2c2");

}

let light_mode = () => {
  document.body.style.setProperty("--main", "#e6e6e6");
  document.body.style.setProperty("--main-alt", "#5E91ff");
  document.body.style.setProperty("--main-light", "#458096");
  document.body.style.setProperty("--text", "#458096");
  document.body.style.setProperty("--accent", "#26252b");
  document.body.style.setProperty("--dynam", "#f9fdff");
  document.body.style.setProperty("--box", "#f4f4f4");
  document.body.style.setProperty("--btnhov", "#d8d8d8");
  document.body.style.setProperty("--icon", "#5e91ff");
}
let check_theme = () => {
  if (localStorage.getItem('theme') == null) {
    localStorage.setItem('theme', 'dark');
  }
  else if (localStorage.getItem('theme') != null) {
    if (localStorage.getItem('theme') == "dark") {
      dark_mode()
      document.getElementById("theme_check").checked = false;
    }
    else if (localStorage.getItem('theme') == "light") {
      light_mode()
      document.getElementById("theme_check").checked = true;
    }
  }
};
let check_diag = () => {
  if (localStorage.getItem('diag') == null) {
    localStorage.setItem('diag', 'off');
    return allowed = 0;
  }
  else if (localStorage.getItem('diag') != null) {
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


let msg = (txt) => {
    if (allowed  == 1) {
        doc = document;
        if(doc.getElementById("message_container")) return;

        let main_div = doc.getElementsByTagName("body")[0].appendChild(doc.createElement("div"));
        main_div.id = "message_container";
        main_div.style.height = doc.documentElement.scrollHeight + "px";

        let msg_div = main_div.appendChild(doc.createElement("div"));
        msg_div.id = "alertBox";
        if(doc.all && !window.opera) msg_div.style.top = document.documentElement.scrollTop + "px";
        msg_div.style.left = (doc.documentElement.scrollWidth - msg_div.offsetWidth)/2 + "px";
        msg_div.style.visiblity="visible";



          let msg = msg_div.appendChild(doc.createElement("h4"));
          msg.appendChild(doc.createTextNode(txt));
          msg.innerHTML = txt;
          msg.style.padding = "10px 20px";

          close_btn = msg_div.appendChild(doc.createElement("input"));
          close_btn.setAttribute("type", "button");
          close_btn.id = "closeBtn";
          close_btn.value = "Ok";
          close_btn.focus();
          close_btn.onclick = function() { callout();return false; }

          msg_div.style.display = "block";

}
   else if (allowed = 0) {return}
};

let callout = () => document.getElementsByTagName("body")[0].removeChild(document.getElementById("message_container"));


let setsvg = () => {
  document.getElementById('cpbtn').innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" style="width:14px;" class="svg-inline--fa fa-copy fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg>`

  document.getElementById('ldbtn').innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-upload" class="svg-inline--fa fa-file-upload fa-w-12" style="width: 12px;" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path></svg>`

  document.getElementById('svbtn').innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" style="width:14px;"data-icon="save" class="svg-inline--fa fa-save fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path></svg>`

  document.getElementById('clpbtn').innerHTML =  `<svg aria-hidden="true" focusable="false" data-prefix="fas" style="width:15px;" data-icon="palette" class="svg-inline--fa fa-palette fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>`

  document.getElementById('setbtn').innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cog" class="svg-inline--fa fa-cog fa-w-16" role="img"style="width:15px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg>`

  document.getElementById('tglbtn').innerHTML = `<svg aria-hidden="true" style="width:13px;" focusable="false" data-prefix="fas" data-icon="chevron-circle-down" class="svg-inline--fa fa-chevron-circle-down fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z"></path></svg>`
}
