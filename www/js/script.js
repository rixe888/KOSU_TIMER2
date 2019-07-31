// This is a JavaScript file

const MSEC    = 1;// ミリ秒
const SEC       = MSEC * 1000;        // 秒
const MINUTE = SEC * 60;              // 分

const CYCLE = MSEC;

const TIMER_IDLE    = 0;
const TIMER_START = 1;
const TIMER_EXE     = 2;
const TIMER_STOP   = 5;
const TIMER_FIN      = 9;

var TimerID;              // タイマー用ID
var IntervalID;           // インターバル用ID
var Time = 0;             // トータル経過時間
var Kosu = 0;             // 1分ごとの工数

var CountTime = 0;        // 経過時間
var NowKosu = 0;          // 現在の工数
var Status = TIMER_IDLE;

var StartTime, NowTime;
var PreMnt = 0;


/*************************************
 * home.html 画面の初期化関数。
 * 画面が切り替わる度にリセットされてしまうので、
 * ページ読み込みの度に初期化する。
 *************************************/
function HomeInit(){
  if(Status == TIMER_FIN){
    Display_TimerEnd();
  }
  else if(Status == TIMER_EXE){
    Display_TimerExe();
  }
  else if(Status == TIMER_START){
    Display_TimerStart();
  }
  else{
    Display_TimerIdle();
  }
}

/*************************************
 *  タイマースタート
 *************************************/
function StartTimer(){
  var SelectProject = document.getElementById("sel-pro").value
  console.log(SelectProject);
  // 入力情報の取得
  Time = document.getElementById("TOTAL_TIME").value;
  Kosu = GetKosu(SelectProject) / 60;
  
  // 数値（半角）以外エラー
  if((isNaN(Time) || !Time) || (isNaN(Kosu) || !Kosu)){
    alert("数値(半角)を入力してください");
    return;
  }
  
  // 時間を分からミリ秒単位に変換
  Time *= MINUTE;	

  // 開始時間の取得
  StartTime = new Date();
  
  // インターバル開始関数 （1分ごとに工数を計算する）
  IntervalID = setInterval("CountKosu()", CYCLE);
  
  // タイマ開始関数
  //TimerID = setTimeout("CountEnd()",Time);
  
  // 画面更新
  Display_TimerStart();

  // ステータス更新
  Status = TIMER_START;

  
}


/*************************************
 * 工数計算。一分ごとに計算する
 *************************************/
function CountKosu(){
  var elapsedMsc;  // ミリ秒
  var elapsedSec;  // 秒
  var elapsedMnt;  // 分

  // 現在の時間取得
  NowTime = new Date();

  // 経過時間の取得
  elapsedMsc = (NowTime - StartTime);          // ミリ秒取得
  elapsedSec = Math.floor(elapsedMsc / 1000);  // 秒取得
  elapsedMnt = Math.floor(elapsedSec / 60);    // 分取得

  // 前周期と分が異なっていれば工数計測処理
  if(elapsedMnt != PreMnt) {
    // 工数計測
    CountTime += 1;
    NowKosu = elapsedMnt * Kosu;

    // アプリを閉じているときに
    if(Time < elapsedMnt){
    }

    // 現在の工数表示
    Display_TimerExe();

    // ステータス更新
    Status =  TIMER_EXE;

    // 指定時間に達すれば終了
    if(elapsedMsc >= Time ) {
      NowKosu = (Time / MINUTE) * Kosu;
      Ring_AS();
      alert("会議終了時間です");
      Stop_AS();
      CountEnd();
    }
  }

  // 前回の分を覚えておく
  PreMnt = elapsedMnt;
}


/*************************************
 * タイマーストップ
 *************************************/
function CountStop(){
  // インターバル停止
  clearInterval(IntervalID);

  // タイマー再開用に残り時間を取得しておく
  Time -= (NowTime - StartTime);

  // ステータス更新
  Status =  TIMER_STOP;

  // 画面更新
  Display_TimerStop();
}


function TimerContinue(){
  // 開始時間の再取得
  StartTime = new Date();

  // インターバル開始関数 （1分ごとに工数を計算する）
  IntervalID = setInterval("CountKosu()", CYCLE);

  // ステータス更新
  Status = TIMER_EXE;

  // 画面更新
  Display_TimerExe();

  
}


/*************************************
 * タイマー終了
 * ************************************/
function CountEnd(){
  //clearTimeOut(TimerID);
  // インターバル終了関数
  clearInterval(IntervalID);
  
  // 使用工数合計表示
  Display_TimerEnd();
  
  // 次の処理のために初期化
  CountTime = 0;
  NowKosu = 0;
  msec = 0;
  sec = 0;
  minute = 0;

  // ステータス更新
  Status = TIMER_FIN;
}


function TimerReset(){
  Status = TIMER_IDLE;

  Display_TimerIdle();
}

function Ring_AS(){
  document.getElementById("Alarm-Sound").play();
}

function Stop_AS(){
  document.getElementById("Alarm-Sound").pause();
}

/*************************************
 * ローカルストレージの初期化
 * ************************************/
function InitLocalStrage(){
  ons.notification.confirm({
    title: "ローカルストレージを初期化してよろしいですか？",
    messageHTML: "※すべてのプロジェクトの1人あたりの工数は"+KOSU_INIT_VALUE+"円/時間になります。",
    callback: function(index) {
      if(index){
        localStorage.clear();
        ReadProjectsKosu();
        ons.notification.alert({
          title: "",
          messageHTML: "ローカルストレージを初期化しました。"
        });
      }      
    }
  });
}


/*************************************
 * このアプリについて
 * ************************************/
function AboutThisApp(){
  ons.notification.alert({
    title: "About This App",
    messageHTML: VERSION
  });
}

