Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{

    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'">';
    });
}

console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/WefHtC3PK/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "First Prediction is " + prediction_1;
    speak_data_2 = " and Second Prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function gotResult(error, results) 
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById('result_emoji_name1').innerHTML = results[0].label;
        document.getElementById('result_emoji_name2').innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Nice")
        {
            document.getElementById('update_emoji1').innerHTML = "&#128076;";
        }
        if(results[0].label == "Two")
        {
            document.getElementById('update_emoji1').innerHTML = "&#9996;";
        }
        if(results[0].label == "Thumbs Up")
        {
            document.getElementById('update_emoji1').innerHTML = "&#128077;";
        }
        
        if(results[1].label == "Nice")
        {
            document.getElementById('update_emoji2').innerHTML = "&#128076;";
        }
        if(results[1].label == "Two")
        {
            document.getElementById('update_emoji2').innerHTML = "&#9996";
        }
        if(results[1].label == "Thumbs Up")
        {
            document.getElementById('update_emoji2').innerHTML = "&#128077;";
        }
    }
}

function check()
{
    img = document.getElementById('capture_image'); 
    classifier.classify(img, gotResult);
}