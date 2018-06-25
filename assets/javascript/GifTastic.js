$('document').ready(() => {
    let colorCounter=0; 

    //changes button color to rainbow spectrum
    let rainbowColors= ()=>{
       let color = rainbowArray[colorCounter];
        colorCounter++;
        if (colorCounter===9){
            colorCounter=0;
        }
        return color;
    }

    let cycleQuotes = ()=>{
        $('#quotes').fadeOut(300,
        function(){$('#quotes').html(quotesArray[quotesCounter])})
        .fadeIn(300);
        quotesCounter++;
        if (quotesCounter===6){
            quotesCounter=0;
        }
    }
    setInterval(cycleQuotes,7000);

    //creates several buttons on reload
    for(i=0;i<buttonStrings.length; i++){
        let newButton= $('<button/>', {
            text: buttonStrings[i],
            "search-value":buttonStrings[i],
            class: "btn",
            id: buttonStrings[i],
        });
        newButton.css("background-color", rainbowColors);
        $('.btn-group').prepend(newButton);
    };
    
    //creates button w value of search box
    $('#submit').on('click',()=>{
        let userButton= $('<button/>', {
            text: $('#searchBox').val(),
            "search-value":$.trim($('#searchBox').val()),
            class: "btn",
            id: $('#searchBox').val(),
        });
        userButton.css("background-color", rainbowColors);
        $('.btn-group').prepend(userButton);
    })

    $('#clear').click(function(){
        $('#main').empty();
    });
    //button on-click event
    $('.btn-group').on('click', 'button',function(){
        let input= $(this).attr("search-value");
        let queryURL= "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=9GdBMQ7hiLi9PxnQuSQb1p9ChTd64pBZ&limit=10"

        $.ajax({
            url:queryURL,
            method: "GET"
        }).then((response)=>{
            let results=response.data;

            for(i=0;i<results.length;i++){
                let rating=results[i].rating;
                let p=$('<p>').text(`Rating: ${rating}`);
                let gif=$('<img class="gifs">').attr('src',results[i].images.fixed_height.url);
                (gif).append(p);
                $('#main').prepend(gif);
            }
        })

        

    })

    clear

});
let quotesArray = [
    "I declaaaarreee...BANKRUPTCY!!", 
    "I think comic Sans always screams FUN.",
    "..everyone's supposed to sleep every night now? You realize that nightime makes up half of all time.",
    "I don't have an ego - my Facebook picture's a landscape.",
    "I finally have the body I want. It's easy, actually, you just have to want a really sh***y body.",
    " \"What do you normally do when I'm gone?\" \"Wait for you to get back.\" ",
    "England is my city"];

let buttonStrings=["Mr. Rogers", "Epic Sax", "the Office", "Randy Savage", "Doge", "Muppets", "Broad City"];
let rainbowArray=["#FF0000", "#E2571E","#FF7F00","#FFFF00","#00FF00","#96bf33","#0000FF","#4B0082","#8B00FF"];

let quotesCounter=0;
