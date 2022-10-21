import React, { useEffect, useState } from 'react';
import { View,Text, Image } from 'react-native';
import { fcmService } from '../services/FCMService';
import { localNotificationService } from '../services/LocalNotificationService';

// import PushNotificationIOS from '@react-native-community/push-notification-ios'


export default function SplashScreen({ route, navigation }) {

    useEffect(() => {
        
        fcmInit();

    }, [])

    
    const fcmInit = async () =>{
		await fcmService.registerAppwithFCM();
		fcmService.register(onRegister, onNotification, onOpenNotification);
		localNotificationService.configure(onOpenNotification);

		function onRegister(fcmtoken){
			console.log("R_____ [APP] dashboard  onRegister", fcmtoken);
			firebaseTokenn = fcmtoken;
			console.log("R_____ [APP] dashboard  onRegister firebaseTokenn ", firebaseTokenn );
		}

		function onNotification(notify){
			alert("onNotification  "+JSON.stringify(notify))
			console.log("R_____ [APP] dashboard onNotification", notify);
			const options = {
				soundName: 'default',
				playSound: true
			}
			localNotificationService.showNotification(
					0,
					notify.title,
					notify.body,
					notify,
					options
				)				
		}
		function onOpenNotification(notify){
			console.log("R_____ [APP] dashboard onOpenNotification is called ", notify);
			alert("onOpenNotification", notify.body)
		}
	}

    return (
        <View>
            <Text style={{ marginTop:10,textAlign: 'center',  fontWeight: 'bold',fontSize:30}}>
                {"Ram Ramji"}
            </Text>
            <Text style={{ marginTop:10, marginBottom:-10 ,textAlign: 'center', fontWeight: 'bold',fontSize:30}}>
                {"Sita Ram ji"}
            </Text>
            <Text style={{ marginTop:10, marginBottom:-10 ,textAlign: 'center', fontWeight: 'bold',fontSize:30}}>
                {"Sita Ram ji Fcm notification"}
            </Text>

            {/* <View  style={{ justifyContent:'center', alignItems: 'center',}}  >
                <Image
                    style={{ width: 300, height: 450, alignItems: 'center' }}
                    resizeMode="contain"
                    source={require('../assets/heart.jpg')}
                />
            </View> */}
            
        </View>
    );

}