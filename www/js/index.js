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
scrollDetectEnable = true;
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}
var videoUrl = "http://edge-ind.inapcdn.in:1935/berry1/smarts2.stream_aac/playlist.m3u8";
function golive(){
    window.plugins.streamingMedia.playVideo(videoUrl);
}
if($('.page').attr('data-category')=='9'){
    var slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 256,
        'tolerance': 256,
        'duration': 500,
        'fx': 'ease',
        'grabWidth': 70,
        'touch': false
    });
}else{
    var slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 256,
        'tolerance': 90,
        'duration': 500,
        'fx': 'ease',
        'grabWidth': 70,
        'touch': false
    });
}
slideout.on('beforeclose', function () {
    $('.flaticon-close').removeClass('flaticon-close').addClass('flaticon-menu-button');
});
slideout.on('beforeopen', function () {
    $('.flaticon-menu-button').removeClass('flaticon-menu-button').addClass('flaticon-close');
});
if($("ul.postlist:not(.related)").length){
    $('.page').scroll(function(e){
        if(($('.page').scrollTop() + $('.page').height()) > ($('.postlist').height() - 0) && scrollDetectEnable){
            scrollDetectEnable = false;
            loadlist($('.page').attr('data-category'),$('.postlist').attr('data-last'));
        }
    });
}
function datecon(date2conv) {
    return date2conv.replaceAll('Monday','সোমবার').replaceAll('Tuesday','মঙ্গলবার').replaceAll('Wednesday','বুধবার').replaceAll('Thursday','বৃহস্পতিবার').replaceAll('Friday','শুক্রবার').replaceAll('Saturday','শনিবার').replaceAll('Sunday','রবিবার').replaceAll('1','১').replaceAll('2','২').replaceAll('3','৩').replaceAll('4','৪').replaceAll('5','৫').replaceAll('6','৬').replaceAll('7','৭').replaceAll('8','৮').replaceAll('9','৯').replaceAll('0','০').replaceAll('January','জানুয়ারী').replaceAll('February','ফেব্রুয়ারি').replaceAll('March','মার্চ').replaceAll('April','').replaceAll('May','এপ্রিল').replaceAll('June','জুন').replaceAll('July','জুলাই').replaceAll('August','অগাস্ট').replaceAll('September','সেপ্টেম্বর').replaceAll('October','অক্টোবর').replaceAll('November','নভেম্বর').replaceAll('December','ডিসেম্বর');
}
function loadlist(id,last){
    $.ajax({
        url: 'http://banglatimetv.com/jason_data.php',
        type: 'post',
        datatype:'json',
        crossDomain: true,
        data: {type: 'list', id:id, range:10, first: $("ul.postlist").attr('data-first'), last:last},
        success: function(reply){
            reply = $.parseJSON(reply);
            if(reply[0]){
                for(post in reply){
                    $("ul.postlist").append('<li><a href="javascript:slide(\'post.html?id='+reply[post].id+'&ref='+location.pathname.substr(location.pathname.lastIndexOf("/")+1)+'\',\'flip\')"><img src="http://banglatimetv.com/news/'+reply[post].img+'"><div class="overlay"><div class="title">'+reply[post].title+'</div><span class="time">'+datecon(reply[post].dte)+'</span></div></a></li>');
                    $("ul.postlist").attr('data-last',reply[post].id);
                    if($("ul.postlist").attr('data-first')=='0'){$("ul.postlist").attr('data-first',reply[post].id);}
                }
                scrollDetectEnable = true;
            } else {
                $('.loaderror').html('That\'s all folks!!');
                $('.flaticon-refresh-button').addClass('flaticon-check-square').removeClass('flaticon-refresh-button').removeClass('rotating');
            }
        },
        error: function(reply){
            $('.loaderror').html("Unable to connect to server. Please check your internet connection. We will retry in 15 seconds.");
            setTimeout(function() { loadlist(id,last); }, 15000);
        }
    });
}
function loadgal(last){
    $.ajax({
        url: 'http://banglatimetv.com/album2.php',
        type: 'post',
        datatype:'json',
        crossDomain: true,
        data: {type: 'gallery', range:10, first: $(".page").attr('data-first'), last:last},
        success: function(reply){
            if(reply[0]){
                for(post in reply){
                    pele = '<li><div class="cover"><img src="http://banglatimetv.com/album/'+reply[post].img+'" alt=""><div class="overlay"><h3>'+reply[post].title+'</h3></div></div><div class="lightgallery" data-id="'+reply[post].id+'">';

                    for(imgs in reply[post].images){
                        pele += '<a href="http://banglatimetv.com/album/images/'+reply[post].images[imgs]+'"><img src="http://banglatimetv.com/album/images/'+reply[post].images[imgs]+'"/></a>';
                    }

                    pele += '</div></li>';

                    $("ul.appsl-gallery").append(pele);
                    $(".page").attr('data-last',reply[post].id);
                    if($(".page").attr('data-first')=='0'){$(".page").attr('data-first',reply[post].id);}
                    $('.lightgallery[data-id='+reply[post].id+']').lightGallery();
                }
                scrollDetectEnable = true;
            } else {
                $('.loaderror').html('That\'s all folks!!');
                $('.flaticon-refresh-button').addClass('flaticon-check-square').removeClass('flaticon-refresh-button').removeClass('rotating');
            }
        },
        error: function(reply){
            $('.loaderror').html("Unable to connect to server. Please check your internet connection. We will retry in 15 seconds.");
            setTimeout(function() { loadgal(last); }, 15000);
        }
    });
}
function loadvidgal(last){
    lgal = $('.appsl-vid-gallery');
    $.ajax({
        url: 'http://banglatimetv.com/album2.php',
        type: 'post',
        datatype:'json',
        crossDomain: true,
        data: {type: 'video', range:10, first: $(".page").attr('data-first'), last:last},
        success: function(reply){
            if(reply[0]){
                for(post in reply){
                    $(".appsl-vid-gallery").append('<a href="https://www.youtube.com/watch?v='+reply[post].videoid+'" data-poster="http://img.youtube.com/vi/'+reply[post].videoid+'/hqdefault.jpg" ><img src="http://img.youtube.com/vi/'+reply[post].videoid+'/hqdefault.jpg" /></a>');
                    $(".page").attr('data-last',reply[post].id);
                    if($(".page").attr('data-first')=='0'){$(".page").attr('data-first',reply[post].id);}
                }
                try {
                    lgal.data('lightGallery').destroy(true);
                }
                catch(err) {
                    console.log(err);
                }
                lgal.lightGallery({
                    youtubePlayerParams: { modestbranding: 0, showinfo: 0, controls: 0 },
                    loadYoutubeThumbnail: false,
                    youtubeThumbSize: 'default'
                });
                scrollDetectEnable = true;
            } else {
                $('.loaderror').html('That\'s all folks!!');
                $('.flaticon-refresh-button').addClass('flaticon-check-square').removeClass('flaticon-refresh-button').removeClass('rotating');
            }
        },
        error: function(reply){
            $('.loaderror').html("Unable to connect to server. Please check your internet connection. We will retry in 15 seconds.");
            setTimeout(function() { loadvidgal(last); }, 15000);
        }
    });
}
function loadrelated(id,category){
    $.ajax({
        url: 'http://banglatimetv.com/jason_data.php',
        type: 'post',
        datatype:'json',
        crossDomain: true,
        data: {type: 'related', id:id, category:category},
        success: function(reply){
            reply = $.parseJSON(reply);
            if(reply[0]){
                for(post in reply){
                    $("ul.postlist").append('<li><a href="javascript:slide(\'post.html?id='+reply[post].id+'&ref='+get('ref')+'\',\'flip\')"><img src="http://banglatimetv.com/news/'+reply[post].img+'"><div class="overlay"><div class="title">'+reply[post].title+'</div><span class="time">'+datecon(reply[post].dte)+'</span></div></a></li>');
                }
            }
        },
        error: function(reply){
            $('.loaderror').html("Unable to connect to server. Please check your internet connection. We will retry in 15 seconds.");
            setTimeout(function() { loadrelated(id,category); }, 15000);
        }
    });
}
function slide(hrf,direction) {
    $('.flaticon-close').removeClass('flaticon-close').addClass('flaticon-menu-button');
    slideout.close();
    setTimeout(function()
    {
        if (direction != 'flip') {
            window.plugins.nativepagetransitions.slide(
                {
                    "direction"        : direction, // 'left|right|up|down', default 'left' (which is like 'next')
                    "duration"         :  400, // in milliseconds (ms), default 400
                    "slowdownfactor"   :    1, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
                    //"slidePixels"      :  100, // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
                    "iosdelay"         :  500, // ms to wait for the iOS webview to update before animation kicks in, default 60
                    "androiddelay"     :  500, // same as above but for Android, default 70
                    "fixedPixelsTop"   :   44, // the number of pixels of your fixed header, default 0 (iOS and Android)
                    "fixedPixelsBottom":    0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
                    'href'             :  hrf
                },
                function () {
                    //console.log('------------------- slide transition finished');
                });
        } else if (direction == 'flip') {
            window.plugins.nativepagetransitions.flip({
                    "direction"      : "right", // 'left|right|up|down', default 'right' (Android currently only supports left and right)
                    "duration"       :  400, // in milliseconds (ms), default 400
                    "iosdelay"       :  500, // ms to wait for the iOS webview to update before animation kicks in, default 60
                    "androiddelay"   :  500, // same as above but for Android, default 70
                    'href'           :  hrf
                },
                function () {
                    //console.log('------------------- flip transition finished');
                });
        }
    }, 800);



}


var app = {
    // Application Constructor
    initialize: function () {
        // Toggle button
        document.querySelector('.toggle-button').addEventListener('click', function () {
            slideout.toggle();
        });
        this.bindEvents();
        // $('.toggle-button').click(function () {
        //     if ($(this).children('.flaticon-menu-button').length) {
        //         $(this).children('.flaticon-menu-button').removeClass('flaticon-menu-button').addClass('flaticon-close');
        //     } else {
        //         $(this).children('.flaticon-close').removeClass('flaticon-close').addClass('flaticon-menu-button');
        //     }
        // });
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
        if(window.MobileAccessibility){
            window.MobileAccessibility.usePreferredTextZoom(false);
        }
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
                // $('.slidepage-container').css('height', $(window).height() - 42 + 'px');
                // $('.content section').css('height', $(window).height() - 42 - 39 + 'px');
            }, 2000);
        }, 2000);
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
    }
};
