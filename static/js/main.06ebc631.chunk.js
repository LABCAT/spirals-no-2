(this["webpackJsonpspirals-no-2"]=this["webpackJsonpspirals-no-2"]||[]).push([[0],{15:function(e,n,o){},28:function(e,n,o){"use strict";o.r(n);var t=o(1),a=o.n(t),i=o(9),s=o.n(i),r=(o(15),o(2));window.p5=r;o(17);var d=o(10),c=o(0);function u(){return Object(c.jsxs)("svg",{id:"play-icon",className:"fade-out",xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 0 24 24",width:"24",children:[Object(c.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),Object(c.jsx)("path",{d:"M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"})]})}var l=o.p+"static/media/spirals-no-2.60442a4c.ogg",g=o.p+"static/media/spirals-no-2.ac42301c.mid",h=function(){var e=Object(t.useRef)(),n=function(e){e.canvas=null,e.canvasWidth=window.innerWidth,e.canvasHeight=window.innerHeight,e.audioLoaded=!1,e.player=null,e.PPQ=15360,e.loadMidi=function(){d.Midi.fromUrl(g).then((function(n){console.log(n);var o=n.tracks[3].notes,t=n.tracks[0].notes;e.scheduleCueSet(o,"executeCueSet1"),e.scheduleCueSet(t,"executeCueSet2"),e.audioLoaded=!0,document.getElementById("loader").classList.add("loading--complete"),document.getElementById("play-icon").classList.remove("fade-out")}))},e.preload=function(){e.song=e.loadSound(l,e.loadMidi),e.song.onended(e.logCredits)},e.scheduleCueSet=function(n,o){for(var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=-1,i=1,s=0;s<n.length;s++){var r=n[s],d=r.ticks,c=r.time;(d!==a||t)&&(r.currentCue=i,e.song.addCue(c,e[o],r),a=d,i++)}},e.bgColour={},e.setup=function(){e.canvas=e.createCanvas(e.canvasWidth,e.canvasHeight),e.background(0),e.colorMode(e.HSB),e.rectMode(e.CENTER),e.bgColour=e.color(0,0,100)},e.pointCount=16,e.loopsToDraw=0,e.draw=function(){e.audioLoaded&&e.song.isPlaying()},e.themes=["rainbow","tetradic"],e.theme="tetradic",e.baseHue=0,e.colours=[],e.shapes=["ellipse","equilateral","rect","pentagon","hexagon","octagon"],e.sizeDivisor=384,e.executeCueSet1=function(n){var o=n.currentCue,t=n.duration,a=o>28?o%28%8:o%8;e.loopsToDraw=0===a?16:2*a,o>84&&(e.bgColour=e.color(0,0,0));var i=1.5,s=2*e.loopsToDraw*i;o%28===1&&(e.theme=e.random(e.themes),e.baseHue=e.random(0,360),e.colours=function(e,n){for(var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100,t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:100,a=[],i=0;i<4;){n=(n+=90*i)<360?n:n-360;var s=e.color(n,o,t,1);a.push(s),i++}return a}(e,e.baseHue),e.sizeDivisor>64&&(e.sizeDivisor=e.sizeDivisor-64)),e.background(e.bgColour),e.strokeWeight(2),(o%28>24||o%28<1)&&(e.loopsToDraw=e.sizeDivisor/4*1.5,i=1,s=o%28===0?4*e.loopsToDraw:e.loopsToDraw*(o%28-24),e.background(e.baseHue,100,100,.2),"rainbow"===e.theme&&e.background(0,100,100,.2));for(var r=e.width>=e.height?e.width/e.sizeDivisor*i:e.height/e.sizeDivisor*i,d=e.random(e.shapes),c=e.pointCount*s,u=0,l=function(n){for(var a=.75*r*n,i=(e.random(0,360),function(i){var l=a/2*Math.cos(i+n*e.pointCount)+e.width/2,g=a/2*Math.sin(i+n*e.pointCount)+e.height/2,h=o%28>24||o%28<1?800*t/c*u:20*i,v="rainbow"===e.theme?360/s*n:e.colours[n%4]._getHue();setTimeout((function(){e.fill(v,100,100,.2),e.stroke(v,100,100,1),(o%28>24||o%28<1)&&(e.stroke(0,0,0,.5),o>84&&e.stroke(v,0,100,.5)),e[d](l,g,.02*r*n,.02*r*n),e.fill(v,100,100,.4),e.stroke(v,100,100,.4),e[d](l,g,.01*r*n,.01*r*n),e.fill(v,100,100,.6),e.stroke(v,0,100,.6),e[d](l,g,.005*r*n,.005*r*n)}),h),u++}),l=0;l<e.TWO_PI+0;l+=e.TWO_PI/e.pointCount)i(l)},g=1;g<=s;g++)l(g)},e.executeCueSet2=function(e){e.midi},e.hasStarted=!1,e.mousePressed=function(){e.audioLoaded&&(e.song.isPlaying()?e.song.pause():(parseInt(e.song.currentTime())>=parseInt(e.song.buffer.duration)&&(e.reset(),"undefined"!==typeof window.dataLayer&&window.dataLayer.push({event:"play-animation",animation:{title:document.title,location:window.location.href,action:"replaying"}})),document.getElementById("play-icon").classList.add("fade-out"),e.canvas.addClass("fade-in"),e.song.play(),"undefined"===typeof window.dataLayer||e.hasStarted||(window.dataLayer.push({event:"play-animation",animation:{title:document.title,location:window.location.href,action:"start playing"}}),e.hasStarted=!1)))},e.creditsLogged=!1,e.logCredits=function(){!e.creditsLogged&&parseInt(e.song.currentTime())>=parseInt(e.song.buffer.duration)&&(e.creditsLogged=!0,console.log("Music By: http://labcat.nz/","\n","Animation By: https://github.com/LABCAT/"),e.song.stop())},e.equilateral=function(n,o,t){var a=t;e.angleMode(e.DEGREES),e.push(),e.translate(n,o),e.rotate(270);var i=a*e.cos(0),s=a*e.sin(0),r=a*e.cos(120),d=a*e.sin(120),c=a*e.cos(240),u=a*e.sin(240);e.triangle(i,s,r,d,c,u),e.pop()},e.pentagon=function(n,o,t){t=t,e.angleMode(e.RADIANS);var a=e.TWO_PI/5;e.beginShape();for(var i=e.TWO_PI/10;i<e.TWO_PI+e.TWO_PI/10;i+=a){var s=n+e.cos(i)*t,r=o+e.sin(i)*t;e.vertex(s,r)}e.endShape(e.CLOSE)},e.hexagon=function(n,o,t){t=t,e.angleMode(e.RADIANS);var a=e.TWO_PI/6;e.beginShape();for(var i=e.TWO_PI/12;i<e.TWO_PI+e.TWO_PI/12;i+=a){var s=n+e.cos(i)*t,r=o+e.sin(i)*t;e.vertex(s,r)}e.endShape(e.CLOSE)},e.octagon=function(n,o,t){t=t,e.angleMode(e.RADIANS);var a=e.TWO_PI/8;e.beginShape();for(var i=e.TWO_PI/16;i<e.TWO_PI+e.TWO_PI/16;i+=a){var s=n+e.cos(i)*t,r=o+e.sin(i)*t;e.vertex(s,r)}e.endShape(e.CLOSE)},e.reset=function(){},e.updateCanvasDimensions=function(){e.canvasWidth=window.innerWidth,e.canvasHeight=window.innerHeight,e.canvas=e.resizeCanvas(e.canvasWidth,e.canvasHeight)},window.attachEvent?window.attachEvent("onresize",(function(){e.updateCanvasDimensions()})):window.addEventListener&&window.addEventListener("resize",(function(){e.updateCanvasDimensions()}),!0)};return Object(t.useEffect)((function(){new r(n,e.current)}),[]),Object(c.jsx)("div",{ref:e,children:Object(c.jsx)(u,{})})};var v=function(){return Object(c.jsx)(h,{})};s.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(v,{})}),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.06ebc631.chunk.js.map