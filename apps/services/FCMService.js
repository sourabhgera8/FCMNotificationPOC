import React from 'react';
// import React, { useEffect } from 'react';
import {Platform, Alert

} from 'react-native'
import messaging from '@react-native-firebase/messaging';
import iid from '@react-native-firebase/iid';

class FCMService {

	

	register = (onRegister, onNotification, onOpenNotification) => {
		this.checkPermission(onRegister);
		// when register function call that time we create notification listener
		this.createNotificationListener(onRegister, onNotification, onOpenNotification);
	}

	registerAppwithFCM = async() => {
		if (Platform.OS === 'ios'){
			// await messaging().registerDeviceForRemoteMessages();		
			await messaging().setAutoInitEnabled(true);
		}
	}

	checkPermission = (onRegister) =>{
		messaging().hasPermission()
		.then(enabled =>{
			if(enabled){
				//user has permission	
				this.getToken(onRegister)
			}else{
			//user don't have permission
				this.requestPermission(onRegister)
			}
		}).catch( error =>{
			console.log("R_____ [FCMService] permission rejected ", error);
			// alert("[FCMService] permission rejected ", error);
		})
	}

	getToken = (onRegister) => {
		messaging().getToken()
			.then(fcmToken => {
				if (fcmToken) {
					onRegister(fcmToken)
				} else {
					console.log("R_____ [FCMService] user doesn't have a device token");
					alert("[FCMService] user doesn't have a device token");

				}
			}).catch(error => {
				console.log("\n\n\n\n\n\n  [FCMService] get Token rejected ", error);
				// alert("[FCMService] get Token rejected ", error);
			})
	}
	
	requestPermission = (onRegister) =>{
		messaging().requestPermission()
		.then(() => {
			this.getToken(onRegister)
		}).catch( error =>{
			console.log("R_____ [FCMService] requestPermission rejected ", error);
			// alert("[FCMService] requestPermission rejected ", error);
		})
	}
	
	deleteToken = () =>{
		console.log("R_____ [FCMService] deleteToken ");

		messaging().deleteToken()
		.then(() => {
			console.log("R_____ [FCMService] deleteToken successs ");

		}).catch( error =>{
			console.log("R_____ [FCMService] deleteToken rejected ", error);
			// alert("[FCMService] deleteToken rejected ", error);
		})
	}

	createNotificationListener = (onRegister, onNotification, onOpenNotification) =>{
		messaging()
		.onNotificationOpenedApp(remoteMessage =>{
			console.log("R_____ [FCMService] onNotificationOpenedApp notification cause open to app remoteMessage :- ", remoteMessage);
			if(remoteMessage){
				const notification = remoteMessage.notification
				onOpenNotification(notification)
				alert("cause open to app "+JSON.stringify(notification));
			}
		});

		// when application is opened from a quit state.
		messaging()
		.getInitialNotification()
		.then(remoteMessage =>{			
			console.log("R_____ [FCMService] getInitialNotification notification cause app to open from quit state "+ remoteMessage);
			if(remoteMessage){
				const notification = remoteMessage.notification
				onOpenNotification(notification)
				console.log("R_____ [FCMService] open from quit state "+JSON.stringify(notification));
				alert("open from quit state "+JSON.stringify(notification));
			}
		});

		// Foreground state messages
		this.messageListener = messaging()
		.onMessage(async remoteMessage =>{
			console.log("R_____ [FCMService] messageListener remoteMessage :- ", remoteMessage);
			if(remoteMessage){
				console.log("R_____ [FCMService] messageListener if remoteMessage :- ", remoteMessage);

				let notification = null;
				if(Platform.OS === 'ios'){
					notification = remoteMessage.data.notification;
				}else{
					notification = remoteMessage.notification;
				}
				onNotification(notification)
			}
		});

		//  Triggered when device token update (new token)
		messaging().onTokenRefresh(fcmToken =>{
			console.log("R_____ [FCMService] onTokenRefresh fcmToken :- ", fcmToken);
			onRegister(fcmToken)

		})
	}

	unRegister = () =>{
		this.messageListener();
	}
}

export const fcmService = new FCMService()
