// Define the BENTWI API object with specific routes
BENTWI.api = {
    emulate: (params) => {
      return BENTWI.api._execute('emulate', {
        ...params,
        type: params.type || '',  // Making sure that type is set
        isCharityDonation: params.isCharityDonation || false,
        name: params.name || '',
        tiers: params.tiers || '',
        message: params.message || '',
        amount: params.amount || 0,
      });
    },
    
    hasPremium: (params) => {
      return BENTWI.api._execute('has-premium', {
        bentwiToken: params.bentwiToken,
      });
    },
    
    storeGet: (params) => {
      return BENTWI.api._execute('store/get', {
        bentwiToken: params.bentwiToken,
        tile: params.tile,
      });
    },
    
    storeSet: (params) => {
      return BENTWI.api._execute('store/set', {
        bentwiToken: params.bentwiToken,
        tile: params.tile,
        store: params.store,
      });
    },
    
    recent: (params) => {
      return BENTWI.api._execute('recent', {
        bentwiToken: params.bentwiToken,
        since: params.since || '',
        type: params.type || '',
        event: params.event || '',
        limit: params.limit || 10, // default to 10
      });
    },
    
    channel: (params) => {
      return BENTWI.api._execute('channel', {
        username: params.username,
        userID: params.userID,
      });
    },
    
    schedule: (params) => {
      return BENTWI.api._execute('schedule', {
        bentwiToken: params.bentwiToken,
        userID: params.userID,
      });
    },
    
    channelInfo: (params) => {
      return BENTWI.api._execute('channel-info', {
        bentwiToken: params.bentwiToken,
        userID: params.userID,
      });
    },
    
    channelUpdate: (params) => {
      return BENTWI.api._execute('channel-update', {
        bentwiToken: params.bentwiToken,
        userID: params.userID,
        updatePayload: params.updatePayload,
      });
    },
    
    peopleLove: (params) => {
      return BENTWI.api._execute('people-love', {
        bentwiToken: params.bentwiToken,
      });
    },
    
    goals: (params) => {
      return BENTWI.api._execute('goals', {
        bentwiToken: params.bentwiToken,
        userID: params.userID,
      });
    },
    
    userAccess: (params) => {
      return BENTWI.api._execute('userAccess', {
        bentwiToken: params.bentwiToken,
      });
    },
    
    spotifyExtension: (params) => {
      return BENTWI.api._execute('extensions/spotify', {
        bentwiToken: params.bentwiToken,
        action: params.action,
        data: params.data,
      });
    },

      _execute: async (endpoint, params) => {
  const url = `https://bentwi.skykopf.com/api/bentwi/${endpoint}`;
  
  // Prepare headers for authorization
  const headers = {
    'Content-Type': 'application/json',
  };

  // Handle the parameters and bentwiToken
  if (!params.bentwiToken) {
    throw new Error("bentwiToken is required");
  }

  // Send the request
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${error}`);
    throw error;
  }
}
      
  
};
