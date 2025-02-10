const accessToken = PropertiesService.getScriptProperties().getProperty("MASTODON_ACCESS_TOKEN");

const mastodonBaseUrl = 'https://mastodon.social';

const masto = MastodonAPI.init(mastodonBaseUrl, accessToken);

function onTriggerMastodon(e) {
  
  if(new Date().getDay() == 2) {

    console.log("HOY ES MARTEEEEEEEEEES");
    
    try {

      let videoBlob = DriveApp.getFileById(videoId).getBlob();
      let uploadMediaInit = masto.uploadMedia(videoBlob);

      var count = 0;

      while(masto.getMedia(uploadMediaInit.id).getResponseCode() != 200) {
        Utilities.sleep(1000);
        if (count <= 10) {
          count++;
        } else {
          console.log("Too many retries waiting for data to be uploaded and processed.");
          throw "Timeout uploading video to Mastodon";
        }
      }

      let response = masto.publishStatus(null, uploadMediaInit.id)

      if (response) {
        console.log("Toot sent! " + response.id)
      } else {
        console.error("Toot NOT Sent " + response);
        // Toot could not be sent
        // Go to View -> Logs to see the error message
      }
    } catch (f) {
      console.error(f.toString());
    }

  }  
}
