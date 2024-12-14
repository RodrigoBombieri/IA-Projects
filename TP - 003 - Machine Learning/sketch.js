// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */


let imageModelURL = 'https://teachablemachine.withgoogle.com/models/sVWSsN0uz/';
let img;
let label = "Analizando...";
let confidence;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json'); 
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.drop(gotFile);
  
  background(0);
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text('Arrastra una imagen aquí', width / 2, height / 2);
}

function ImageReady() {
  image(img, 0, 0, width, height - 100);
}

function gotFile(file) {
  if (file.type === 'image') {
    img = createImg(file.data, ImageReady).hide();
    classifier.classify(img, gotResult);
  } else {
    alert('Imágen no válida');
  }
}

function gotResult(results) {
 
  console.log(results);
  
  fill(0);
  rect(0, height - 100, width, 100);

  
  fill(255);
  noStroke();
  textSize(24);
  textAlign(LEFT);
  label = `Tipo de nube: ${results[0].label}`;
  confidence = `Confianza: ${(results[0].confidence * 100).toFixed(2)}%`;
  text(label, 10, height - 70);
  text(confidence, 10, height - 40);
}

