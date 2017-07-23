document.addEventListener('DOMContentLoaded', function () {
  restoreOptions();
  document.getElementById("muteWhenAudioTab").addEventListener('change', runTimer);
  document.getElementById("pauseWhenSwitching").addEventListener('change', runTimer2);
});

function restoreOptions() {
  chrome.storage.sync.get('stateMuteWhenAudioTab', function (items) {
         document.getElementById('muteWhenAudioTab').checked = items.stateMuteWhenAudioTab;
    });

    chrome.storage.sync.get('statePauseWhenSwitching', function (items) {
        document.getElementById('pauseWhenSwitching').checked = items.statePauseWhenSwitching;
      });
  };

  function runTimer(e){
    chrome.storage.sync.set({'stateMuteWhenAudioTab' : document.getElementById('muteWhenAudioTab').checked }, function (items) {
    });
  };

  function runTimer2(e){
    chrome.storage.sync.set({'statePauseWhenSwitching' : document.getElementById('pauseWhenSwitching').checked }, function (items) {
    });
  };
