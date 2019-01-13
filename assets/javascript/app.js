$(document).ready(function() {
   
    var trivia=[trivia1,trivia2,trivia3,trivia4,trivia5,trivia6,trivia7,trivia8,trivia9,trivia10], correct=[], wrong=[];
  
    $(".start").on("click", function() {       
        $("#timeCounter").empty();       
        $('#timeCounter').css("border", "none");  
        
        for(var i=0;i<trivia.length;i++){
            
            $("#question").append("<br>"+trivia[i].q+"<br>");
      
            for(var j=0;j<4;j++){
                var x = document.createElement("INPUT");
                x.setAttribute("type", "radio");
                x.setAttribute("name",i);
                x.setAttribute("value",trivia[i].a[j]);
                x.setAttribute("class","answer");
                x.setAttribute("id","answer"+i);
                $("#question").append(x);

                $("#question").append(trivia[i].a[j]+" ");
            } 

            $("#question").append("<br>");
    
        }
        var done = $('<input type="button" id="done" value="done"/>');
        done.appendTo('#question');

        // Set the date we're counting down to
        var countDownDate =new Date().getTime()+47000;

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
            $("#timeCounter").html("Time remaining: "+ seconds); 
            
            $(":radio").click(function(){
                var radioName = $(this).attr("name"); //Get radio name
                var radioValue = $(this).attr("value"); //Get radio name
                $(":radio[name='"+radioName+"']").attr("disabled", true); //Disable all with the same name
                if(radioValue===(trivia[$(this).attr("name")].correct)){
                    correct.push(parseInt(radioName));
                    
                }else{
                    wrong.push(parseInt(radioName));
                    
                }
            });
            
            //remove dup
            correct.sort();wrong.sort();
            uniqueCorrect = correct.filter(function(item, pos) {
                return correct.indexOf(item) == pos;
            })  ;
            uniqueWrong = wrong.filter(function(item, pos) {
                return wrong.indexOf(item) == pos;
            }) ;
            

            $("#done").on("click", function() { 
                done();
            });

            function done(){
                clearInterval(x);
                $("#question,#answer1, #answer2, #answer3, #answer4").empty();
                $("#timeCounter").html("Out of time!!! <br>"+"Correct Answers: "+uniqueCorrect.length+"<br> Wrong Answers: "+uniqueWrong.length+"<br>"
                +"Unanswered: "+(10-(uniqueWrong.length+uniqueCorrect.length))+"<br>"); 
                var retry = $('<input type="button" id="retry"/>');
                retry.appendTo('#timeCounter');
                $('#timeCounter').append("<br>Click the flag to Retry");
                $("#timeCounter").on("click", function() { 
                    location.reload();
                });
            }
            
            if (distance < 0 ) {
                done();
            }

        }, 1000);
    });
});