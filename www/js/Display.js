// This is a JavaScript file

// Projectの背景色
const Color10 = [
                  "orange",
                  "gold",
                  "greenyellow",
                  "lime",
                  "aquamarine",
                  "royalblue",
                  "mediumslateblue",
                  "magenta",
                  "hotpink",
                  "tomato"]

var DispPageNow;  // 現在表示しているページ　0：Home　1：Setting　2：About


// スタートボタン押下時の画面描画処理
function Display_TimerStart(){
  // 会議開始文章表示 （これがないと動作しているかわからない）
  TimerArea = document.getElementById("Main-Text");
  ButtonArea = document.getElementById("Main-Button");

  TimerArea.innerHTML = "会議が開始されました。";
  ButtonArea.innerHTML = "<form id='RadiusButton' >"
          +"<a type='submit' id='btn_stp' class='dbl_btn' onclick='CountStop()'>STOP</a>"
          +"</form>"
          +"<form id='RadiusButton' >"
          +"<a type='submit' id='btn_end' class='dbl_btn' onclick='CountEnd()'>END</a>"
          +"</form>";

  Menu_Hide();
  PullMenu_Hide();
}


// タイマ不使用時の画面描画
function Display_TimerIdle(){
  ResArea = document.getElementById("Main-Project");
  TimerArea = document.getElementById("Main-Text");
  ButtonArea = document.getElementById("Main-Button");
  
  ReadProjectPullMenu();

  ResArea.innerHTML = "";
  TimerArea.innerHTML = "<input type=’number' pattern='\d*' id='TOTAL_TIME'>分の会議";
  ButtonArea.innerHTML = "<form id='RadiusButton' >"
          +"<a type='submit' id='btn_srt' class='sgl_btn' onclick='StartTimer()'>START</a>"
          +"</form>";

  ButtonArea.style.position = "relative";
  ButtonArea.style.top = "0vh";
  ButtonArea.style.left = "0vw";

  Menu_Visible();
  PullMenu_Visible();
}


// タイマ実行時の画面描画処理
function Display_TimerExe(){
  TimerArea = document.getElementById("Main-Text");
  ButtonArea = document.getElementById("Main-Button");

  TimerArea.innerHTML = DispNowKosu + "円分経過...";
  ButtonArea.innerHTML = "<form id='RadiusButton' >"
          +"<a type='submit' id='btn_stp' class='dbl_btn' onclick='CountStop()'>STOP</a>"
          +"</form>"
          +"<form id='RadiusButton' >"
          +"<a type='submit' id='btn_end' class='dbl_btn' onclick='CountEnd()'>END</a>"
          +"</form>";

  Menu_Hide();
  PullMenu_Hide();
}



// タイマ一時停止時の画面描画処理
function Display_TimerStop(){
  TimerArea = document.getElementById("Main-Text");
  ButtonArea = document.getElementById("Main-Button");

  TimerArea.innerHTML = "会議を中断しています。"
          + DispNowKosu + "円分経過しています。";
  ButtonArea.innerHTML = "<form id='RadiusButton' >"
          +"<a type='submit' id='btn_srt' class='dbl_btn' onclick='TimerContinue()'>START</a>"
          +"</form>"
          +"<form id='RadiusButton' >"
          +"<a type='submit' id='btn_end' class='dbl_btn' onclick='CountEnd()'>END</a>"
          +"</form>";

  Menu_Hide();
  PullMenu_Hide();
}


// タイマ終了時の画面描画処理
function Display_TimerEnd(){
  TimerArea = document.getElementById("Main-Text");
  ButtonArea = document.getElementById("Main-Button");
  ResArea = document.getElementById("Main-Project");

  ResArea.innerHTML = "お疲れ様です。<br />" + DispNowKosu +"円分の会議はできましたか？";
  TimerArea.innerHTML = "";
  ButtonArea.innerHTML = "<form id='RadiusButton' >"
        +"<a type='submit' id='btn_rst' class='sgl_btn' onclick='TimerReset()'>RESET</a>"
        +"</form>";
  
  ButtonArea.style.position = "absolute";
  ButtonArea.style.top = "45vh";
  ButtonArea.style.left = "22vw";

  Menu_Visible();
  PullMenu_Hide();
}




// メニューを隠す
function Menu_Hide() {
  var mn = document.getElementById("Home-Menu");
  mn.className="Menu-On-Exe";
}


// メニューを可視化する
function Menu_Visible() {
  var mn = document.getElementById("Home-Menu");
  mn.className="Menu-On-Idle";
}


// プロジェクト選択メニューを隠す
function PullMenu_Hide() {
  var mn = document.getElementById("sel-pro");
  mn.className="Menu-On-Exe";
}


// プロジェクト選択メニューを可視化する
function PullMenu_Visible() {
  var mn = document.getElementById("sel-pro");
  mn.className="Menu-On-Idle";
}



function ChangePull(){
  var mn = document.getElementById("sel-pro");
  var SelectProject = mn.value

  // プロジェクトに匹敵する色を選択する
  for(var i=0;i<PRO_KEY.length;i++){
    if(PRO_KEY[i]==SelectProject){
      mn.style.backgroundColor = Color10[i];
      return;
    }
  }

  // 選択中のプロジェクトが範囲外のためエラー表示
  alert("プロジェクトエラーです");
}