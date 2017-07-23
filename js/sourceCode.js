function muteAllExceptActive(selectedTabURL,audible){

  var muteWhenAudioTab,pauseWhenSwitching;
  chrome.storage.sync.get('stateMuteWhenAudioTab', function (items) {
    muteWhenAudioTab=items.stateMuteWhenAudioTab;
    //  console.log(items.stateMuteWhenAudioTab);
  });
  chrome.storage.sync.get('statePauseWhenSwitching', function (items) {
    pauseWhenSwitching=items.statePauseWhenSwitching;
    //  console.log(items.statePauseWhenSwitching);
  });

  chrome.windows.getAll(null, function(wins) {
    // console.log(muteWhenAudioTab+" and " +pauseWhenSwitching);
    for ( j = 0; j < wins.length; j++) {
      //console.log('no of windows'+wins.length);
      chrome.tabs.getAllInWindow(wins[j].id, function(tabs) {
        for ( i = 0; i < tabs.length; i++) {
          //console.log(i+'th tab of'+j+'th window');
          console.log(tabs[i].url+" and "+tabs[i].audible);
          if (tabs[i].url != selectedTabURL) {
            chrome.tabs.executeScript(tabs[i].id,{
              code:"Array.prototype.slice.call(document.querySelectorAll('audio,video')).forEach(function(audio) { audio.muted = true;});"
            });
            //console.log(j+'th window '+i+'th tab '+ tabs[i].url);
          }
          else{
            chrome.tabs.executeScript(tabs[i].id,{
              code:"Array.prototype.slice.call(document.querySelectorAll('audio,video')).forEach(function(audio) { audio.muted = false;});"
            });
          }
        }
      });
    }
  });
}
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    muteAllExceptActive(tab.url,tab.audible);
  });
});
