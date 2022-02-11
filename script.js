/* Unhide OneTrust if...*/
window.OptanonWrapper = function() {
  _satellite.logger.log("OptanonWrapper");
  
  var buttonControl = document.querySelector("#onetrust-button-group .banner-actions-container");

  buttonControl.appendChild(document.querySelector("#onetrust-reject-all-handler"));
  buttonControl.appendChild(document.querySelector("#onetrust-pc-btn-handler"));
  buttonControl.appendChild(document.querySelector("#onetrust-accept-btn-handler"));
  
  //measure({action: "onetrustLoaded"});
  
  if (OneTrust.IsAlertBoxClosed()) {
    if (_satellite.getVar("Optanon Active Groups") !== ",C0001,C0002,C0003,C0004,") {
      _satellite.logger.log("We don't have all consents");
      document.getElementById("onetrust-consent-sdk").style.display = "block";
    }
    if (_satellite.getVar("Optanon Active Groups") === ",C0001,C0002,C0003,C0004,") {
      _satellite.logger.log("We have all consents");
      document.getElementById("onetrust-consent-sdk").style.display = "none";
    }
  }
  window.dataLayer = window.dataLayer || [];
  var originalPush = window.dataLayer.push;
  window.dataLayer.push = function () {
    var data = [].slice.call(arguments, 0);
    var result = originalPush.apply(window.dataLayer, data);
    try {
      data[0].action = "onetrustEvent";
      _satellite.logger.log("Measuring", data);
      measure(data[0]);
    } catch (err) {
      _satellite.logger.error(err);
    }
    if (data[0].optanonAction === "Preference Center Opened From Button") {
      document.getElementById("onetrust-consent-sdk").style.display = "block";
    }
    return result;
  };
};