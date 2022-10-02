import React, { useRef, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import { Midi } from '@tonejs/midi'
import PlayIcon from './functions/PlayIcon.js';
import { TetradicColourCalculator } from './functions/ColourCalculators';

import audio from "../audio/spirals-no-2.ogg";
import midi from "../audio/spirals-no-2.mid";

const P5SketchWithAudio = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.audioLoaded = false;

        p.player = null;

        p.PPQ = 3840 * 4;

        p.loadMidi = () => {
            Midi.fromUrl(midi).then(
                function(result) {
                    console.log(result);
                    const noteSet1 = result.tracks[3].notes; // Combinator 1
                    const noteSet2 = result.tracks[0].notes; // Redrum
                    p.scheduleCueSet(noteSet1, 'executeCueSet1');
                    p.scheduleCueSet(noteSet2, 'executeCueSet2');
                    p.audioLoaded = true;
                    document.getElementById("loader").classList.add("loading--complete");
                    document.getElementById("play-icon").classList.remove("fade-out");
                }
            );
            
        }

        p.preload = () => {
            p.song = p.loadSound(audio, p.loadMidi);
            p.song.onended(p.logCredits);
        }

        p.scheduleCueSet = (noteSet, callbackName, poly = false)  => {
            let lastTicks = -1,
                currentCue = 1;
            for (let i = 0; i < noteSet.length; i++) {
                const note = noteSet[i],
                    { ticks, time } = note;
                if(ticks !== lastTicks || poly){
                    note.currentCue = currentCue;
                    p.song.addCue(time, p[callbackName], note);
                    lastTicks = ticks;
                    currentCue++;
                }
            }
        } 

        p.bgColour = {};

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.background(0);
            p.colorMode(p.HSB);
            p.rectMode(p.CENTER);
            p.bgColour = p.color(0, 0, 100);
        }

        p.pointCount = 16;

        p.loopsToDraw = 0;

        p.draw = () => {
            if(p.audioLoaded && p.song.isPlaying()){
               
            }
        }

        p.themes = ['rainbow', 'tetradic'];

        p.theme = 'tetradic';

        p.baseHue = 0;

        p.colours = [];

        p.shapes = ['ellipse', 'equilateral', 'rect', 'pentagon', 'hexagon', 'octagon'];

        p.sizeDivisor = 384;

        p.executeCueSet1 = (note) => {
            const { currentCue, duration } = note,
                compare = currentCue > 28 ? currentCue % 28 % 8 : currentCue % 8;
            
            p.loopsToDraw = compare === 0 ? 16 : compare  * 2;

            if(currentCue > 84) {
                p.bgColour = p.color(0, 0, 0);
            }

            let multiplier = 1.5,
                loops = p.loopsToDraw * 2 * multiplier;
            
            if(currentCue % 28 === 1) {
                p.theme = p.random(p.themes);
                p.baseHue = p.random(0, 360);
                p.colours = TetradicColourCalculator(p, p.baseHue);
                if(p.sizeDivisor > 64) {
                    p.sizeDivisor = p.sizeDivisor - 64;
                }
            }

            p.background(p.bgColour);
            p.strokeWeight(2);

            if(currentCue % 28 > 24 || currentCue % 28 < 1) {
                p.loopsToDraw = p.sizeDivisor / 4 * 1.5;
                multiplier = 1;
                loops = currentCue % 28 === 0 ? p.loopsToDraw * 4 : p.loopsToDraw * (currentCue % 28 - 24);
                p.background(p.baseHue, 100, 100, 0.2);
                if(p.theme === 'rainbow') {
                    p.background(0, 100, 100, 0.2);
                }
            } 
            
            const size = p.width >= p.height ? p.width / p.sizeDivisor * multiplier : p.height / p.sizeDivisor * multiplier;
            const shape =  p.random(p.shapes);
            const totalShapes = p.pointCount * loops;
            let shapeCount = 0;
            
            for (let index = 1; index <= loops; index++) {
                let angle = 0;
                let diameter = size * 0.75 * index;
                let randHue = p.random(0, 360);
                for(let i = angle; i < p.TWO_PI + angle; i += p.TWO_PI / p.pointCount){
                    let x = diameter / 2 * Math.cos(i + index * p.pointCount) + p.width / 2;
                    let y = diameter / 2 * Math.sin(i + index * p.pointCount) + p.height / 2;
                    const delay = (currentCue % 28 > 24 || currentCue % 28 < 1) ? (duration * 800 / totalShapes) * shapeCount : 20 * i,
                    fillColour = p.theme === 'rainbow' ? 360 / loops * index : p.colours[index % 4]._getHue();
                    setTimeout(
                        function () {
                            p.fill(fillColour, 100, 100, 0.2);
                            p.stroke(fillColour, 100, 100, 1);
                            if(currentCue % 28 > 24 || currentCue % 28 < 1) {
                                p.stroke(0, 0, 0, 0.5);
                                if(currentCue > 84) {
                                    p.stroke(fillColour, 0, 100, 0.5);
                                }
                            }
                            p[shape](x, y, size * 0.02 * index, size * 0.02 * index);
                            p.fill(fillColour, 100, 100, 0.4);
                            p.stroke(fillColour, 100, 100, 0.4);
                            p[shape](x, y, size * 0.01 * index, size * 0.01 * index);
                            p.fill(fillColour, 100, 100, 0.6);
                            p.stroke(fillColour, 0, 100, 0.6);
                            p[shape](x, y, size * 0.005 * index, size * 0.005 * index);
                        },
                        delay
                    );
                    shapeCount++;
                }
            }
        }

        p.executeCueSet2 = (note) => {
            const { midi } = note;
            if(midi === 43) {
                // p.bgColour = p.random(p.colours);
                // p.background(p.bgColour);
            }
        }

        p.hasStarted = false;

        p.mousePressed = () => {
            if(p.audioLoaded){
                if (p.song.isPlaying()) {
                    p.song.pause();
                } else {
                    if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                        p.reset();
                        if (typeof window.dataLayer !== typeof undefined){
                            window.dataLayer.push(
                                { 
                                    'event': 'play-animation',
                                    'animation': {
                                        'title': document.title,
                                        'location': window.location.href,
                                        'action': 'replaying'
                                    }
                                }
                            );
                        }
                    }
                    document.getElementById("play-icon").classList.add("fade-out");
                    p.canvas.addClass("fade-in");
                    p.song.play();
                    if (typeof window.dataLayer !== typeof undefined && !p.hasStarted){
                        window.dataLayer.push(
                            { 
                                'event': 'play-animation',
                                'animation': {
                                    'title': document.title,
                                    'location': window.location.href,
                                    'action': 'start playing'
                                }
                            }
                        );
                        p.hasStarted = false
                    }
                }
            }
        }

        p.creditsLogged = false;

        p.logCredits = () => {
            if (
                !p.creditsLogged &&
                parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
            ) {
                p.creditsLogged = true;
                    console.log(
                    "Music By: http://labcat.nz/",
                    "\n",
                    "Animation By: https://github.com/LABCAT/"
                );
                p.song.stop();
            }
        };

        /*
        * function to draw an equilateral triangle with a set width
        * based on x, y co-oridinates that are the center of the triangle
        * @param {Number} x        - x-coordinate that is at the center of triangle
        * @param {Number} y      	- y-coordinate that is at the center of triangle
        * @param {Number} width    - radius of the hexagon
        */
        p.equilateral = (x, y, width) => {
            const size = width;
            p.angleMode(p.DEGREES);
            p.push();
            p.translate(x, y);
            p.rotate(270);
            const x1 = size * p.cos(0), y1 = size * p.sin(0);
            const x2 = size * p.cos(120), y2 = size * p.sin(120);
            const x3 = size * p.cos(240), y3 = size * p.sin(240);
            p.triangle(x1, y1, x2, y2, x3, y3)
            p.pop();
        }

        /*
        * function to draw a pentagon shape
        * adapted from: https://p5js.org/examples/form-regular-polygon.html
        * @param {Number} x        - x-coordinate of the pentagon
        * @param {Number} y      - y-coordinate of the pentagon
        * @param {Number} radius   - radius of the pentagon
        */
        p.pentagon = (x, y, radius) => {
            radius = radius;
            p.angleMode(p.RADIANS);
            var angle = p.TWO_PI / 5;
            p.beginShape();
            for (var a = p.TWO_PI/10; a < p.TWO_PI + p.TWO_PI/10; a += angle) {
                var sx = x + p.cos(a) * radius;
                var sy = y + p.sin(a) * radius;
                p.vertex(sx, sy);
            }
            p.endShape(p.CLOSE);
        }

        /*
        * function to draw a hexagon shape
        * adapted from: https://p5js.org/examples/form-regular-polygon.html
        * @param {Number} x        - x-coordinate of the hexagon
        * @param {Number} y      - y-coordinate of the hexagon
        * @param {Number} radius   - radius of the hexagon
        */
        p.hexagon = (x, y, radius) => {
            radius = radius;
            p.angleMode(p.RADIANS);
            var angle = p.TWO_PI / 6;
            p.beginShape();
            for (var a = p.TWO_PI/12; a < p.TWO_PI + p.TWO_PI/12; a += angle) {
                var sx = x + p.cos(a) * radius;
                var sy = y + p.sin(a) * radius;
                p.vertex(sx, sy);
            }
            p.endShape(p.CLOSE);
        }

        /*
        * function to draw a octagon shape
        * adapted from: https://p5js.org/examples/form-regular-polygon.html
        * @param {Number} x        - x-coordinate of the octagon
        * @param {Number} y      - y-coordinate of the octagon
        * @param {Number} radius   - radius of the octagon
        */
        p.octagon = (x, y, radius) => {
            radius = radius;
            p.angleMode(p.RADIANS);
            var angle = p.TWO_PI / 8;
            p.beginShape();
            for (var a = p.TWO_PI/16; a < p.TWO_PI + p.TWO_PI/16; a += angle) {
                var sx = x + p.cos(a) * radius;
                var sy = y + p.sin(a) * radius;
                p.vertex(sx, sy);
            }
            p.endShape(p.CLOSE);
        }

        p.reset = () => {

        }

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.canvas = p.resizeCanvas(p.canvasWidth, p.canvasHeight);
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    useEffect(() => {
        new p5(Sketch, sketchRef.current);
    }, []);

    return (
        <div ref={sketchRef}>
            <PlayIcon />
        </div>
    );
};

export default P5SketchWithAudio;
