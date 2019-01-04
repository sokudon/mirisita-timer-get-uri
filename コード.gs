/**
 * Return a list of sheet names in the Spreadsheet with the given ID.
 * @param {String} a Spreadsheet ID.
 * @return {Array} A list of sheet names.
 */


var sid="1CpwNLrurUVVLX2dmMgZHU-uQC7WQfyfWqLlaiooRaN8";
var sname="イベント";


function doGet() {
  var ss = SpreadsheetApp.openById(sid);
  var sheets = ss.getSheetByName(sname);
  
　var last_row = 2;
　var last_col = 6;
  
  var values= sheets.getRange(1,1,last_row ,last_col).getValues();
 var value = JSON.parse(JSON.stringify(values));
 
  var title="[ミリシタ]" +value[1][3] +" ～" + value[1][0] +"～　終了"; 
  var title2="[ミリシタ]" +value[1][3] +" ～" + value[1][0] +"～　開始"; 
  var stat= value[1][4];
  var end= value[1][5];
  var moment = Moment.load();
  
  var reg = new RegExp('[<>#"%]',"gm");
  title = title.replace(reg,"");
  
  var url="http://www.shurey.com/js/timer/countdown.html?C,"; //154626840,
  if(moment(end)!=null){
  end = (moment(end).valueOf()/10000).toFixed(0);
  }
  
  if(moment(stat)!=null){
  stat = (moment(stat).valueOf()/10000).toFixed(0);
  }
  
  var header= "<style>th,td{  border:solid 1px #aaaaaa;},.table-scroll{  overflow-x : auto}</style>";
  
   var i, len, arr,arr2;
  
        for(i=0,len=title.length,arr=[]; i<len; i++) {
            arr +="%25u"+  ("00"+title.charCodeAt(i).toString(16)).slice(-4);
        }
        for(i=0,len=title2.length,arr2=[]; i<len; i++) {
            arr2 +="%25u"+  ("00"+title2.charCodeAt(i).toString(16)).slice(-4);
        }
  
  var html="";
  
  html = header +"<tr><td>のこりじかんたいまー</td><td>"+ hyperlink( url +end +"," +arr) +"</td></tr>";
  html += "<tr><td>けいかじかんたいまー</td><td>"+ hyperlink( url +stat +"," +arr2) +"</td></tr>";
  
  
 html+= "<tr><td>いべたいまー(経過＋世界)</td>"+"<td>"+ hyperlink("http://sokudon.s17.xrea.com/ibetimer.html")+"</td></tr>";
 html+= "<tr><td>いべしゅうりょうせかい</td>"+"<td>"+ hyperlink("http://sokudon.s17.xrea.com/sekai.html") +"</td></tr>";
  
  
 html= "<table><tbody>" +html + "<tbody></table>";
  
  return HtmlService.createHtmlOutput(html);
  //return ContentService.createTextOutput(url).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

//<>#"%　"#"はURI参照として、"%"はエスケープ用文字として使われます。
//除外されている記号 (RFC2396 に定義がないもの)
//以下の文字は使用できません。
// {}|\^[]`<>#"%

function hyperlink(link){
  link= "<a href='" + link +"'>" +link +"</a>";
  
  return link;
}

function wmap_getSheetsName(sheets){
  //var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var sheet_names = new Array();
  
  if (sheets.length >= 1) {  
    for(var i = 0;i < sheets.length; i++)
    {
      sheet_names.push(sheets[i].getName());
    }
  }
  return sheet_names;
}