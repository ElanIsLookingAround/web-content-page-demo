/*
 * Created on Sat November 16 2024
 *
 * Written by Allen  
 */

const serieslist = [];
var previousspotlight;
window.onload = function(){

    
    populateSeries();
    populateRandomSection();
    populateSeriesSection();
    populatePopularSection();
    populateSpotlightSection()


    $('.booksectionimg').tilt({
        glare: true,
        maxGlare: 1,
        maxTilt: 5  
    })
    $('.seriessectionimg').tilt({
        glare: true,
        maxGlare: 1,
        maxTilt: 13  
    })
    $('.scrollbutton-left').on('click', function() {
        $(this).closest('div').find('.scrollbox').animate( { scrollLeft: '-=400' }, 500);
    });
    $('.scrollbutton-right').on('click', function() {
        $(this).closest('div').find('.scrollbox').first().animate( { scrollLeft: '+=400' }, 500);
    });

    setInterval(function(){
        populateSpotlightSection()
    }, 4000 )
    
}

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 120) {
        $("#nav").addClass("boxshadow");
    }else{
        $("#nav").removeClass("boxshadow");
    }
});

function populateSeries(){
    books = data['books']
    for (var index in books){
        const book = books[index]
        if(!serieslist.includes(book['series'])){
            serieslist.push(book['series'])
        }
    }
}

function randSeries(){
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(serieslist.length) - 1; //never select the last series
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function populateSection(series, insertinto, attribute){
    books = data['books']
    for (var index in books){
        const book = books[index];

        if(book['series']==series){
            document.querySelector(insertinto).innerHTML += 
            '<div class="m-1 p-1 ' + attribute +' d-flex flex-column justify-content-center text-center">' +
            '<a href="'+book["link"]+'" class="text-decoration-none">' +
            '<img class="p-1 '+attribute+'img" src="'+book["cover"]+'"/>' +
            '<p class="'+attribute+'title">' + book["title"] + '</p>' +
            '</a></div>';
        }
    }
}

function randBook(){
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(data['books'].length)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function populateSpotlightSection(){
    const book = randBook();
    while(previousspotlight==book){
        book = randBook();
    }
    const spotlight = data['books'][book]
    $("#spotlightitle").fadeOut(500,function(){
        document.querySelector("#spotlightitle").innerHTML = spotlight['title']
        $("#spotlightitle").fadeIn();
    });
    $("#spotlightimg").fadeOut(500,function(){
        document.querySelector("#spotlightdesc").innerHTML = spotlight['desc']
        $("#spotlightimg").fadeIn();
    });
    $("#spotlightdesc").fadeOut(500,function(){
        document.querySelector("#spotlightimg").src = spotlight['cover']
        $("#spotlightdesc").fadeIn();
    });
    previousspotlight = book;
}

function populateRandomSection(){
    const random = randSeries();
    document.querySelector('#random').innerHTML = serieslist[random];
    populateSection(serieslist[random], "#randombox", "booksection")
}

function populateSeriesSection(){
    console.log(serieslist);
    for (var index in serieslist){
        const series = serieslist[index];
        const boxcode = series.replace(/\s/g, '');
        document.querySelector("#seriescontainer").innerHTML +=
        '<div class="seriesbox text-center m-2 p-1 scrollcontainer position-relative col-md-5">' +
        '<p class="faustina fontreg">' + series + '</p>' + 
        '<div class="d-flex flex-row mb-3 mb-md-0 overflow-y-scroll scrollbox position-relative" style="scrollbar-width: none;" id="'+boxcode+'box">' + '</div>' +
        '<button class="position-absolute start-1 m-0 p-0 scrollbuttonseries scrollbutton-left btn btn-dark d-flex justify-content-center align-items-center"><i class="bi bi-chevron-left seriessectionicon"></i></button>' +
        '<button class="position-absolute end-1 m-0 p-0 scrollbuttonseries scrollbutton-right btn btn-dark d-flex justify-content-center align-items-center"><i class="bi bi-chevron-right seriessectionicon"></i></button>' +
        '</div>'

        const insertinto = '#'+boxcode + 'box'
        console.log(insertinto);
        populateSection(series, insertinto, 'seriessection')
    }
}

function populatePopularSection(){
    books = data["books"]
    let currentIndex = books.length;
  
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [books[currentIndex], books[randomIndex]] = [
        books[randomIndex], books[currentIndex]];
    }

    for(var index in books){
        const book = books[index];
        if(book["rating"]>=4.40){
            document.querySelector("#popular").innerHTML += 
            '<div class="m-1 p-1 booksection d-flex flex-column justify-content-center text-center">' +
            '<a href="'+book["link"]+'" class="text-decoration-none">' +
            '<img class="p-1 booksectionimg" src="'+book["cover"]+'"/>' +
            '<p class="booksectiontitle">' + book["title"] + '</p>' +
            '</a></div>';
        }
    }
}