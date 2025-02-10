const videoId = PropertiesService.getScriptProperties().getProperty("VIDEO_ID");

function getOneMinuteInFuture() {
  let d1 = new Date();
  let d2 = new Date (d1);
  d2.setHours(d1.getMinutes() + 1);
  return d2;
}

function setTriggers(){
  //ScriptApp.newTrigger("onTriggerTwitter").timeBased().atHour(8).everyDays(1).create();
  ScriptApp.newTrigger("onTriggerMastodon").timeBased().atHour(8).everyDays(1).create();
  ScriptApp.newTrigger("onTriggerBlueSky").timeBased().atHour(8).everyDays(1).create();
}