// This is a JavaScript file
const PROJECT_MAX = 10;
const KOSU_INIT_VALUE = 3000;
const PRO_KEY = ["PRO1_KEY",
                  "PRO2_KEY",
                  "PRO3_KEY",
                  "PRO4_KEY",
                  "PRO5_KEY",
                  "PRO6_KEY",
                  "PRO7_KEY",
                  "PRO8_KEY",
                  "PRO9_KEY",
                  "PRO10_KEY"];
const PROJECT_CNT_KEY = "PRO_CNT_KEY";

var pro_yen = [];

var ProjectCnt;
var NowProject = 1;


/*************************************
 * 指定したプロジェクトの工数（人/時間/円）をローカルストレージから取得
 * 
 * @input     ユーザーが選択したプロジェクト
 * @return   引数に対応するプロジェクトの工数（人/時間/円）
 *************************************/
function GetKosu(pro){
  var Ret = window.localStorage.getItem(pro);

  if(pro == PRO_KEY[0]){
    if(!Ret){
      window.localStorage.setItem(pro, String(KOSU_INIT_VALUE));
    }
  }

  return Ret;
}

/*************************************
 * Applyボタン実行
 * 入力された各プロジェクトの工数円/時間/人をすべて保存
 *************************************/
function ApplyProjectAll(){
  var val;

  // 各プロジェクトの工数円/時間/人
  for(var i=0; i<ProjectCnt; i++){
    val = document.getElementById("KOSU_YEN"+(i+1)).value;
    window.localStorage.setItem(PRO_KEY[i], String(val));
  }

  // プロジェクト数の保存
  window.localStorage.setItem(PROJECT_CNT_KEY, String(ProjectCnt));

  // 適応されたことを示すメッセージ
  ons.notification.toast('OK! There were adapted.', { timeout: 400, animation: 'fall'});
}

/*************************************
 * Add Projectボタン実行
 * プロジェクト欄の追加
 *************************************/
function AddProject(){
  var pro = document.getElementById("Project-List");
  var yen = 0;

  if(ProjectCnt<PROJECT_MAX){
    ProjectCnt =ProjectCnt+ 1;
    pro.innerHTML += "<ons-row id='Project'><ons-col id='Pro-Name' width='20%' ><h1>"
            +ProjectCnt+"</h1></ons-col><ons-col>"
            +"<form class='list-inline' id='Setting'>"
            +"1人当たりの工数"
            +"</form>"
            +"<input type=’number' pattern='\d*' "
            +"id='KOSU_YEN"+ProjectCnt+"' "
            +"value='"+yen+"'>"
            +"円/時間<br />"
            +"</ons-col></ons-row>";
  } else{
    alert("Error!!\nプロジェクトは10個までしか作れません")
  }

  // 1番目のプロジェクトのみHTMLファイルに直接記入なので、別枠で設定する必要がある。
  yen = window.localStorage.getItem(PRO_KEY[0]);
  document.getElementById("KOSU_YEN1").value = yen;
}

/*************************************
 * プロジェクト数の読み出し。
 * アプリの起動時に実行される。
 *************************************/
function ReadProjectsFromStorage(){
  var pc;
  if(!window.localStorage.getItem(PROJECT_CNT_KEY)){
    window.localStorage.setItem(PROJECT_CNT_KEY, String(1));
  }

  pc = window.localStorage.getItem(PROJECT_CNT_KEY);
  ProjectCnt = Number(pc);
}

/*************************************
 * Setting.html 画面の初期化関数。
 * 画面が切り替わる度にリセットされてしまうので、
 * ページ読み込みの度に初期化する。
 *************************************/
function Display_Setting(){
  
  var area = document.getElementById("Project-List");
  var yen;
  
  for(var i=1; i<ProjectCnt;i++){
    if(document.getElementsByTagName("li").length < ProjectCnt){
      yen = window.localStorage.getItem(PRO_KEY[i]);


      area.innerHTML += "<p id='Project'>"
          +"<form class='list-inline' id='Setting'>"
          +"1人当たりの工数"
          +"</form>"
          +"<input type=’number' pattern='\d*' "
          +"id='KOSU_YEN"+(i+1)+"' "
          +"value='"+yen+"'>"
          +"円/時間<br />"
          +"</p>";
    }
  }
  
  // 1番目のプロジェクトのみHTMLファイルに直接記入なので、別枠で設定する必要がある。
  yen = window.localStorage.getItem(PRO_KEY[0]);
  document.getElementById("KOSU_YEN1").value = yen;
}

function ReadProjectPullMenu(){
  var i, InProj;

  ProjArea = document.getElementById("sel-pro2");
  InProj = ProjArea.childElementCount;

  for(i=InProj; i<ProjectCnt; i++){
   ProjArea.innerHTML += "<option value='"+PRO_KEY[i]+"'>Project "+(i+1)+"</option>";
   
  }
}