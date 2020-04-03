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
  
　var last_row = sheets.getRange(1,10).getValue();
　var last_col = 6;
  
  var values= sheets.getRange(1,1,last_row ,last_col).getValues();
 var value = JSON.parse(JSON.stringify(values));
 
  var moment = Moment.load();
  
  var html="";
  var url="http://www.shurey.com/js/timer/countdown.html?C,"; //154626840,
  var neta="http://sokudon.s17.xrea.com/neta/imm.html#";
  
  for(var k=1;k<value.length;k++){
    
    
  var titleraw="[ミリシタ]" +value[k][3] +" ～" + value[k][0]; 
  var title="[ミリシタ]" +value[k][3] +" ～" + value[k][0] +"～　終了"; 
  var title2="[ミリシタ]" +value[k][3] +" ～" + value[k][0] +"～　開始"; 
  var stat= value[k][4];
  var end= value[k][5];
  
  var reg = new RegExp('[<>#"%]',"gm");
  title = title.replace(reg,"");
  
  if(stat!=""){
  stat = (moment(stat).valueOf()/10000).toFixed(0);
  
  
   var i, len, arr;
        for(i=0,len=title.length,arr=[]; i<len; i++) {
          if(title.charCodeAt(i) < 0x80){
            arr += title.substr(i, 1);
          }
          else{
            arr +="%25u"+  ("00"+title.charCodeAt(i).toString(16)).slice(-4);
          }
        }
     html += "<tr><td>"+ hyperlink(neta + encodeURI(titleraw)+","+moment(stat*10000).format()+","+moment(end*10000).format(),titleraw) +"</td>"
    html+= "<td>"+ hyperlink( url +stat +"," +arr,moment(stat*10000).format()) +"</td>";
  }
  if(end!=""){
  end = (moment(end).valueOf()/10000).toFixed(0);
    var i, len, arr;
        for(i=0,len=title2.length,arr=[]; i<len; i++) {
          if(title.charCodeAt(i) < 0x80){
            arr += title2.substr(i, 1);
          }
          else{
            arr +="%25u"+  ("00"+title2.charCodeAt(i).toString(16)).slice(-4);
          }
        }
  html += "<td>"+ hyperlink( url +end +"," +arr,moment(end*10000).format()) +"</td>";
  }
    html += "</tr>";
  }
  
  
 html+= "<tr><td><b>みりした関連</b></td></tr><tr><td>いべたいまー(経過＋世界)</td>"+"<td>"+ hyperlink("http://sokudon.s17.xrea.com/ibetimer.html","http://sokudon.s17.xrea.com/ibetimer.html")+"</td></tr>";
 html+= "<tr><td>いべしゅうりょうせかい</td>"+"<td>"+ hyperlink("http://sokudon.s17.xrea.com/sekai.html","http://sokudon.s17.xrea.com/sekai.html") +"</td></tr>";
  
  
  var header= "<style>th,td{  border:solid 1px #aaaaaa;},.table-scroll{  overflow-x : auto}</style>";
  var h ="<table><thead><tr><th>いべんと名(はんようたいまたいむぞーん対応)</th><th>開始日からのみ</th><th>終了日からのみ</th></tr></thead>";  
  
  html= h+"<tbody>"+ header  +html + "<tbody></table>";
  
  
  return HtmlService.createHtmlOutput(html);
  //return ContentService.createTextOutput(url).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

//<>#"%　"#"はURI参照として、"%"はエスケープ用文字として使われます。
//除外されている記号 (RFC2396 に定義がないもの)
//以下の文字は使用できません。
// {}|\^[]`<>#"%

function hyperlink(link,a){
  link= "<a href='" + link +"'>" +a +"</a>";
  
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