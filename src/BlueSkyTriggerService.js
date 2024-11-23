const identifier = PropertiesService.getScriptProperties().getProperty("BLUESKY_IDENTIFIER");

const password = PropertiesService.getScriptProperties().getProperty("BLUESKY_PASSWORD");

const serviceUrl = "https://bsky.social";
const videoUrl = "https://video.bsky.app";

function onTriggerBlueSky(e) {
  
  if(new Date().getDay() == 2) {

    let bluesky = BlueSkyAPI.init(serviceUrl, videoUrl, identifier, password);

    console.log("HOY ES MARTEEEEEEEEEES");

    try {
      let exp = getOneMinuteInFuture();
      let videoBlob = DriveApp.getFileById(videoId).getBlob();
      let uploadResponse = bluesky.uploadVideo(videoBlob, exp);
      Logger.log(uploadResponse);
      let jobId = uploadResponse.jobId;
      var jobStatusResponse = bluesky.getJobStatus(jobId, exp);
      Logger.log(jobStatusResponse);
      while(jobStatusResponse.jobStatus.state != "JOB_STATE_COMPLETED") {
        Utilities.sleep(1000);
        jobStatusResponse = bluesky.getJobStatus(jobId, exp);
      }
      let blobLink = jobStatusResponse.jobStatus.blob.ref["$link"];
      Logger.log(videoBlob.getBytes().length);

      let record = bluesky.createVideoRecord("", blobLink, "video/mp4", "Orale putos que ya es martes", videoBlob.getBytes().length, 254, 144, ["es"]);
      console.log(record);
      if (record) {
        console.log("Blueskys sent! " + record.id)
      } else {
        console.error("Blueskys NOT Sent " + record);
        // Blueskys could not be sent
        // Go to View -> Logs to see the error message
      }
    } catch (f) {
      console.error(f.toString());
    }

  }  
}
