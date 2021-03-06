(function(e){function t(t){for(var i,n,a=t[0],c=t[1],d=t[2],p=0,h=[];p<a.length;p++)n=a[p],Object.prototype.hasOwnProperty.call(o,n)&&o[n]&&h.push(o[n][0]),o[n]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);l&&l(t);while(h.length)h.shift()();return s.push.apply(s,d||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],i=!0,a=1;a<r.length;a++){var c=r[a];0!==o[c]&&(i=!1)}i&&(s.splice(t--,1),e=n(n.s=r[0]))}return e}var i={},o={app:0},s=[];function n(t){if(i[t])return i[t].exports;var r=i[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=i,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/blink-detector/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var d=0;d<a.length;d++)t(a[d]);var l=c;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},1:function(e,t){},2:function(e,t){},3:function(e,t){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var i=r("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("blink-detector")],1)},s=[],n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[e.isIntro?[r("p",[e._v("При идентификации, посмотрите в камеру и моргните минимум 4 раза")]),r("p",[e._v("Избегайте попадания в кадр других людей и слишком тёмного фона.")]),r("button",{staticClass:"btn",on:{click:e.start}},[e._v(" Идентификация ")])]:e.testInProgress?[e.isVideoLoading?r("p",[e._v("Загружаем видеопоток")]):r("video",{ref:"videoSrc",staticClass:"webcam-video hidden",attrs:{width:e.videoWidth,height:e.videoHeight},on:{canplay:e.onSourceReady}},[e._v(" Ваш браузер не поддерживает функционал этой страницы ")])]:e.showProgress&&!e.testInProgress?[r("p",[e._v(" Идентификация пройдена ")]),r("div",{staticClass:"preview"},[r("img",{staticClass:"preview__image",attrs:{src:e.resultPhoto,alt:"Фото для отправки"}})]),r("button",{staticClass:"btn",on:{click:e.restart}},[e._v(" Повторить идентификацию ")])]:[r("p",[e._v(" Произошла неизвестная ошибка ")]),r("button",{staticClass:"btn",on:{click:e.restart}},[e._v(" Повторить идентификацию ")])]],2)},a=[],c=(r("d093"),r("fa11")),d=(r("ee7d"),r("a492"));const l=.2,p=1;let h,u=0,f=0,v=null,g=null;var m={name:"BlinkDetector",data:()=>({isIntro:!0,testInProgress:!0,showProgress:!1,isVideoLoading:!0,videoWidth:0,videoHeight:0,resultPhoto:null}),async mounted(){await c["xd"]("webgl"),h||(h=await d["b"](d["a"].mediapipeFacemesh,{shouldLoadIrisModel:!0,maxFaces:1,iouThreshold:0,scoreThreshold:.9}))},beforeDestroy(){this.stopCamera()},methods:{async start(){this.isIntro=!1,await this.startCamera()},async startCamera(){const e={video:!0,audio:!1,width:{min:480,ideal:720,max:1080},height:{min:480,ideal:720,max:1080},advanced:[{facingMode:"user",aspectRatio:.75}]};try{g=await navigator.mediaDevices.getUserMedia(e);const t=this.$refs.videoSrc;t.setAttribute("autoplay",""),t.setAttribute("muted",""),t.setAttribute("playsinline",""),t.srcObject=g,t.onloadedmetadata=()=>{t.play()}}catch(t){console.error("Camera start error. "+t)}},stopCamera(){g&&(cancelAnimationFrame(v),this.$refs.videoSrc.pause(),this.$refs.videoSrc.srcObject=null,g.getVideoTracks()[0].stop(),g=null,this.testInProgress=!1,this.isVideoLoading=!0)},async restart(){this.stopCamera(),u=0,f=0,this.resultPhoto=null,this.showProgress=!1,this.testInProgress=!0,await this.startCamera()},async onSourceReady(){this.videoWidth=this.$refs.videoSrc.videoWidth,this.videoHeight=this.$refs.videoSrc.videoHeight,await this.processVideo(),this.$refs.videoSrc.classList.remove("hidden"),this.isVideoLoading=!1},eyeAspectRatio(e){return(Math.abs(e.p2-e.p6)+Math.abs(e.p3-e.p5))/(2*Math.abs(e.p1-e.p4))},async processVideo(){if(!this.$refs.videoSrc)return void console.warn("Видеопоток не найден");const e=await h.estimateFaces({input:this.$refs.videoSrc,returnTensors:!1,flipHorizontal:!1,predictIrises:!0}),t=e[0]?e[0].faceInViewConfidence:0,r=e[0]?e[0].annotations:{};if(t>.9&&Object.keys(r).length>0){const e={p1:r.rightEyeLower0[8][0],p2:r.rightEyeUpper0[4][1],p3:r.rightEyeUpper0[3][1],p4:r.rightEyeLower0[0][0],p5:r.rightEyeLower0[3][1],p6:r.rightEyeLower0[4][1]},t={p1:r.leftEyeLower0[8][0],p2:r.leftEyeUpper0[4][1],p3:r.leftEyeUpper0[3][1],p4:r.leftEyeLower0[0][0],p5:r.leftEyeLower0[3][1],p6:r.leftEyeLower0[4][1]},i=this.eyeAspectRatio(e),o=this.eyeAspectRatio(t),s=(i+o)/2;if(s<l)u+=1;else{u>=p&&(f+=1),u=0;const e=f>=Math.floor(Math.random()*Math.floor(4));if(!this.resultPhoto&&e){const e=document.createElement("canvas");e.width=this.videoWidth,e.height=this.videoHeight;const t=e.getContext("2d");t.drawImage(this.$refs.videoSrc,0,0,this.videoWidth,this.videoHeight),this.resultPhoto=e.toDataURL("image/jpeg"),e.remove()}}}v=requestAnimationFrame(this.processVideo),f>=4&&(this.stopCamera(),this.showProgress=!0,navigator.vibrate([300,300,300]))}}},y=m,b=(r("c54e"),r("2877")),w=Object(b["a"])(y,n,a,!1,null,null,null),P=w.exports,_={name:"App",components:{BlinkDetector:P}},S=_,C=(r("034f"),Object(b["a"])(S,o,s,!1,null,null,null)),O=C.exports;i["a"].config.productionTip=!1,new i["a"]({render:e=>e(O)}).$mount("#app")},6562:function(e,t,r){},"85ec":function(e,t,r){},c54e:function(e,t,r){"use strict";r("6562")}});
//# sourceMappingURL=app.63733a3b.js.map