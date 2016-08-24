/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var videoUrl = "http://edge-ind.inapcdn.in:1935/berry1/smarts2.stream_aac/playlist.m3u8";




var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
		$('.toggle-button').click(function(){
			if($(this).children('.flaticon-menu-button').length){
                $(this).children('.flaticon-menu-button').removeClass('flaticon-menu-button').addClass('flaticon-close');
            }else{
                $(this).children('.flaticon-close').removeClass('flaticon-close').addClass('flaticon-menu-button');
            }
		});
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        var push = PushNotification.init({
            "android": {"senderID": "335673861035"},
            "ios": {"alert": "true", "badge": "true", "sound": "true"}
        });
        push.on('registration', function (data) {
            $.ajax({
                type: "POST",
                url: 'http://www.sayantanbakshi.in/gcm/action.php',
                data: {device: data.registrationId, action: '1'},
                success: function (sdata) {

                },
                error: function (fdata) {

                }
            });
        });
        push.on('notification', function (data) {

        });
        push.on('error', function (e) {
            alert(e.message);
        });
        setTimeout(function () {
            navigator.splashscreen.hide();
            setTimeout(function () {
                $('.slidepage-container').css('height', $(window).height() - 42 + 'px');
                $('.content section').css('height', $(window).height() - 42 - 39 + 'px');
            }, 2000);
        }, 2000);
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
    }
};
