const echoPostRequest = {
    url: ' https://api-us.cloud.com/cctrustoauth2/root/tokens/clients',
    method: 'POST',
    header: 'Content-Type:application/json',
    body: {
      mode: 'application/json',
      raw: JSON.stringify(
          {
              ClientId:'###',
              ClientSecret:'###'
          })
    }
  };
  var getToken = true;
  if (!pm.environment.get('accessTokenExpiry') || 
      !pm.environment.get('currentAccessToken')) {
      console.log('Token or expiration date are missing');
  } else if (pm.environment.get('accessTokenExpiry') <= (new Date()).getTime()) {
      console.log('Token is expired, refreshing token');
  } else {
      getToken = false;
      console.log('Token and expiration date are valid');
  }
  if (getToken === true) {
      pm.sendRequest(echoPostRequest, function (err, res) {
      console.log(err ? err : res.json());
          if (err === null) {
              console.log('Saving the token and expiration date');
              var responseJson = res.json();
              pm.environment.set('currentAccessToken',  "CWSAuth bearer=" 
   + responseJson.token);
              var expiryDate = new Date();
              expiryDate.setSeconds(expiryDate.getSeconds() + responseJson.expiresIn);
              pm.environment.set('accessTokenExpiry', expiryDate.getTime());
          }
      });
  } 