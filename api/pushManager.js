const pushNotifications = require('node-pushnotifications');

const settings = {
    apn: {
        token: {
            key: './certs/AuthKey_62TT6U488C.p8', // optionally: fs.readFileSync('./certs/key.p8')
            keyId: '62TT6U488C',
            teamId: '3978JEAFBL',
        },
        production: false 
    }

};
const push = new pushNotifications(settings);


exports.pushMessageForChat = (registrationIds,text) => {
    
    
    const data = {
    title: 'New message', // REQUIRED for Android
    topic: 'Rotem-Nevgauker.InTheHood-ios', // REQUIRED for iOS (apn and gcm)
    /* The topic of the notification. When using token-based authentication, specify the bundle ID of the app.
     * When using certificate-based authentication, the topic is usually your app's bundle ID.
     * More details can be found under https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns
     */
    body: text,
    custom: {
        sender: 'inTheHood',
    },
    priority: 'high', // gcm, apn. Supported values are 'high' or 'normal' (gcm). Will be translated to 10 and 5 for apn. Defaults to 'high'
    collapseKey: '', // gcm for android, used as collapseId in apn
    contentAvailable: true, // gcm, apn. node-apn will translate true to 1 as required by apn.
    delayWhileIdle: true, // gcm for android
    restrictedPackageName: '', // gcm for android
    dryRun: false, // gcm for android
    icon: '../assets/icon.png', // gcm for android
    image: '', // gcm for android
    style: '', // gcm for android
    picture: '', // gcm for android
    tag: '', // gcm for android
    color: '', // gcm for android
    clickAction: '', // gcm for android. In ios, category will be used if not supplied
    locKey: '', // gcm, apn
    locArgs: '', // gcm, apn
    titleLocKey: '', // gcm, apn
    titleLocArgs: '', // gcm, apn
    retries: 1, // gcm, apn
    encoding: '', // apn
    badge: 2, // gcm for ios, apn
    sound: 'ping.aiff', // gcm, apn
    android_channel_id: '', // gcm - Android Channel ID
    alert: { // apn, will take precedence over title and body
        title: 'New message',
        body: text
        // details: https://github.com/node-apn/node-apn/blob/master/doc/notification.markdown#convenience-setters
    },
    /*
     * A string is also accepted as a payload for alert
     * Your notification won't appear on ios if alert is empty object
     * If alert is an empty string the regular 'title' and 'body' will show in Notification
     */
    // alert: '',
    launchImage: '../assets/icon.png', // apn and gcm for ios
    action: '', // apn and gcm for ios
    category: '', // apn and gcm for ios
    // mdm: '', // apn and gcm for ios. Use this to send Mobile Device Management commands.
    // https://developer.apple.com/library/content/documentation/Miscellaneous/Reference/MobileDeviceManagementProtocolRef/3-MDM_Protocol/MDM_Protocol.html
    urlArgs: '', // apn and gcm for ios
    truncateAtWordEnd: true, // apn and gcm for ios
    mutableContent: 0, // apn
    threadId: '', // apn
    // if both expiry and timeToLive are given, expiry will take precedence
    expiry: Math.floor(Date.now() / 1000) + 28 * 86400, // seconds
    timeToLive: 28 * 86400,
    headers: [], // wns
    launch: '', // wns
    duration: '', // wns
    consolidationKey: 'my notification', // ADM
};
    
                    console.log(registrationIds);

    push.send(registrationIds, data, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});
 
               


};

