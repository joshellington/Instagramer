$(function() {

  localPhotos();

  $('#searchform').submit(function() {
    var q = $(this).find('#s').val();
    search(q);
    return false;
  });

});

function localPhotos() {

  if (navigator.geolocation) {
    var obj = {};

    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      obj.lat = lat;
      obj.lng = lng;

      $.getJSON('/location/?lat='+obj.lat+'&lng='+obj.lng, function(d) {
        $('h2 span').empty();
        parseLocal(d, $('#local'));
      });
    });
  }
}

function parseLocal(json, obj) {
  $.each(json.data, function(i,item) {
    if ( i < 10 ) {
      obj.append('<div class="local-image"><a href="'+item.link+'" target="_blank"><img src="'+item.images.thumbnail.url+'"></a></div>');
      log(item);
    }

    if ( i == json.data.length - 1 ) {}
  });
}

function search(query) {
  var results = $('#results'),
      status = $('#search h2 span');

  status.text('loading...');
  $.getJSON('/search/?q='+query, function(d) {
    results.empty();
    $.each(d, function(i,item) {
      results.append('<div class="search-image"><a href="#"><img src="'+item.profile_picture+'"><h4>'+item.full_name+'</h4></a></div>');
    });
    status.empty();
    log(d);
  });
}




//     keymaster.js
//     (c) 2011 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.
(function(a){function h(a,b){var c=a.length;while(c--)if(a[c]===b)return c;return-1}function i(a){var b,g,i,j,k,m;g=(a.target||a.srcElement).tagName,b=a.keyCode;if(b==93||b==224)b=91;if(b in d){d[b]=!0;for(j in f)f[j]==b&&(l[j]=!0);return}if(g=="INPUT"||g=="SELECT"||g=="TEXTAREA")return;if(!(b in c))return;for(k=0;k<c[b].length;k++){i=c[b][k];if(i.scope==e||i.scope=="all"){m=i.mods.length>0;for(j in d)if(!d[j]&&h(i.mods,+j)>-1||d[j]&&h(i.mods,+j)==-1)m=!1;(i.mods.length==0&&!d[16]&&!d[18]&&!d[17]&&!d[91]||m)&&i.method(a,i)===!1&&(a.preventDefault?a.preventDefault():a.returnValue=!1,a.stopPropagation&&a.stopPropagation(),a.cancelBubble&&(a.cancelBubble=!0))}}}function j(a){var b=a.keyCode,c;if(b==93||b==224)b=91;if(b in d){d[b]=!1;for(c in f)f[c]==b&&(l[c]=!1)}}function k(){for(b in d)d[b]=!1;for(b in f)l[b]=!1}function l(a,b,d){var e,h,i,j;d===undefined&&(d=b,b="all"),a=a.replace(/\s/g,""),e=a.split(","),e[e.length-1]==""&&(e[e.length-2]+=",");for(i=0;i<e.length;i++){h=[],a=e[i].split("+");if(a.length>1){h=a.slice(0,a.length-1);for(j=0;j<h.length;j++)h[j]=f[h[j]];a=[a[a.length-1]]}a=a[0],a=g[a]||a.toUpperCase().charCodeAt(0),a in c||(c[a]=[]),c[a].push({shortcut:e[i],scope:b,method:d,key:e[i],mods:h})}}function m(a){e=a||"all"}function n(){return e||"all"}function o(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,function(){c(window.event)})}var b,c={},d={16:!1,18:!1,17:!1,91:!1},e="all",f={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,command:91},g={backspace:8,tab:9,clear:12,enter:13,"return":13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,"delete":46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220};for(b=1;b<20;b++)f["f"+b]=111+b;for(b in f)l[b]=!1;o(document,"keydown",i),o(document,"keyup",j),o(window,"focus",k),a.key=l,a.key.setScope=m,a.key.getScope=n,typeof module!="undefined"&&(module.exports=key)})(this)


// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};


