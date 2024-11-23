
/**
 * @deprecated TwitterLib is no longer working due to changes in Twitter API v2's pricing.
 */
function onTriggerTwitter(e) {
  
  if(new Date().getDay() == 2) {

    console.log("HOY ES MARTEEEEEEEEEES");
    
    var props = PropertiesService.getScriptProperties();
    var twit = new Twitterlib.OAuth(props);

    if (twit.hasAccess()) {
      try {

        let videoBlob = DriveApp.getFileById(videoId).getBlob();
        let uploadMediaInit = twit.uploadMediaInit(videoBlob, "tweet_video");
        if(uploadMediaInit.media_id_string) {
          Utilities.sleep(1000);
          let uploadMediaAppend = twit.uploadMediaAppend(videoBlob, uploadMediaInit.media_id_string, 0);
          if(uploadMediaAppend.getResponseCode() >= 200 && uploadMediaAppend.getResponseCode() < 300 ) {
            Utilities.sleep(1000);
            let uploadMediaFinalize = twit.uploadMediaFinalize(uploadMediaInit.media_id_string);

            if(uploadMediaFinalize.processing_info) {
              while(true) {
                Utilities.sleep(1000);
                let uploadMediaStatus = twit.uploadMediaStatus(uploadMediaInit.media_id_string);
                if(uploadMediaStatus.processing_info.state == "succeeded") {
                  break;
                } else if(uploadMediaStatus.processing_info.state == "succeeded") {
                  throw "Error uploading video to Twitter";
                }
              }
            }

            let response = twit.sendTweet('', {
              media_ids: uploadMediaInit.media_id_string
            });

            if (response) {
              console.log("Tweet Sent " + response.id_str);
            } else {
              console.error("Tweet NOT Sent " + response);
              // Tweet could not be sent
              // Go to View -> Logs to see the error message
            }
          }
        }
      } catch (f) {
        console.error(f.toString());
      }

    } else {
      console.error('The bot does not have access to Twitter');
    }
  }  
}
