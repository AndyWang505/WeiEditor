// 有空再重寫=ˇ=
// 未來想加入 1.插入code 2.圖檔大小可調整 功能
// 希望也可以寫一個markdown的編輯器
//
// let title = document.getElementById("title");
// let content = document.getElementById("content");
// let btn = document.getElementById("btn");
// let articlelist = document.getElementById("articlelist");
// //button
// let bold =document.getElementById("bold");
// let img =document.getElementById("img");
// let link =document.getElementById("link");
// let list =document.getElementById("list");
// let blue =document.getElementById("blue");
// let black =document.getElementById("black");
// let green =document.getElementById("green");
// let code =document.getElementById("code");
// //variable
// var position = ''

// content.addEventListener("mousedown", e =>{
//     e.target.selectionStart;
//     console.log(e.target.selectionStart)
// })
// content.addEventListener("mouseup", e =>{
//     e.target.selectionEnd;
//     console.log(e.target.selectionEnd)
// })

// content.addEventListener('mouseup', e => {//輸入點
//     if(content.value === ''){
//         noInput()
//         let insertDiv = document.createElement("div")
//         insertDiv.innerHTML = "<p>"+content.value+"</p>"
//         position = window.getSelection().getRangeAt(0)
//         position.insertNode(insertDiv)
//     }else{
//         let contentVal = content.value

//         console.log(contentVal.substr(e.target.selectionStart, e.target.selectionEnd-e.target.selectionStart))
        
//         console.log('mouse down at: ', e.target.selectionStart)
//         console.log('mouse up at: ', e.target.selectionEnd)
//     }

// })
// //document.querySelector(".wrap").addEventListener('DOMNodeInserted',() =>{ //監聽wrap中被插入多餘的div元素
// //    position.removeChild(insertDiv);
// //    alert("test")
// //})

// content.onkeyup = function(e){ //測試鍵盤上移動輸入點
//     console.log('mouse down at: ', e.target.selectionStart)
//     console.log('mouse up at: ', e.target.selectionEnd)
// }
// /* --- */

// btn.addEventListener("click", () =>{ //submit
//     articlelist.innerHTML += `
//     <div class="article">
//         <h2>${(title.value)}</h2>
//         <p>${(content.value)}</p>
//     </div>
//     `;
//     title.value="";
//     content.value="";
// })
// bold.addEventListener("click", e =>{ //blod
//     noInput()
//     let insertBlod = document.createElement("p")
//     insertBlod.innerHTML = "<strong>"+content.value+"</strong>"
//     position.insertNode(insertBlod);
//  
// })
// function noInput(){ //若無輸入點
//     if(position === ''){
//         content.focus()
//         const range = window.getSelection()
//         range.selectAllChildren(content)
//         range.collapseToEnd()
//         position = window.getSelection().getRangeAt(0)
//     }
// }
// function onblur(){ //防止點擊外面失焦
//     content.focus()
// }
// refer to https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Editable_content
// execCommand指令已過時，未來將會替換掉，但這個還是很好用捏QAQ
//


let content,defcontent;

document.getElementById("content").focus();
document.getElementById("btn").addEventListener('click', () => { //submit
    document.getElementById("articlelist").innerHTML = `
    <div class="article">
         <h1>${(title.value)}</h1>
         ${(content.innerHTML)}
    </div>
    `
})

document.getElementById("content").focus();
document.getElementById("input").addEventListener('input', insertImg); //監聽input type=file
function insertImg() { // 匯入圖檔
    content.focus();
    let reader = new FileReader();
    reader.onload = function (e) {
        content.focus();
        document.execCommand('insertImage',false ,e.target.result )
    }
    reader.readAsDataURL(document.getElementById("input").files[0])
}
document.querySelector(".btn-close").addEventListener("click", ()=>{ //關閉後清除
    document.getElementById("input").value = "";
})

function init () { //初始化
    content = document.getElementById("content")
    defcontent = content.innerHTML
    if(document.Form.switchMode.checked) {
        changeMode(true)
    }
}

function formatDoc (Cmd, Value) { //execCommand指令 , 參考https://tools.wingzero.tw/article/sn/17
    if (validateMode()) {
        document.execCommand(Cmd, false, Value);
        content.focus();
    }
}

function validateMode () {
    if (!document.Form.switchMode.checked) {
        return true ;
    }
    alert("目前模式 \" HTML\"，請切換模式後再嘗試。");
    content.focus();
    return false;
}

function changeMode (bToSource) { //轉成html
    var objContent;
    if (bToSource) {
        objContent = document.createTextNode(content.innerHTML);
        content.innerHTML = "";
        var pre = document.createElement("pre");
        content.contentEditable = false;
        pre.id = "sourceText";
        pre.contentEditable = true;
        pre.appendChild(objContent);
        content.appendChild(pre);
        document.execCommand("defaultParagraphSeparator", false, "div");
    } else {
        if (document.getElementsByTagName('*')) { //document.all is now obsolete
            content.innerHTML = content.innerText;
        } else {
            objContent = document.createRange();
            objContent.selectNodeContents(content.firstChild);
            content.innerHTML = objContent.toString();
        }
        content.contentEditable = true;
    }
    content.focus();
}

function printDoc () { //print button
    if (!validateMode()) {
        return;
    }
    var oPrntWin = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
    oPrntWin.document.open();
    oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + content.innerHTML + "<\/body><\/html>");
    oPrntWin.document.close();
}

document.getElementById("code").addEventListener('click', ()=>{
    alert("插入code")
})
