function setTime(){
    var date = new Date();
    var h = date.getHours();
    var m = setZero(date.getMinutes());
    var s = setZero(date.getSeconds());
    var d = date.getUTCDay();
    const Day = setDay(d);
    var h12 = setZero(setHours(Number(h)));
    const time = h12 + ' : ' + m + ' : ' + s;
    document.querySelector('.dayDiv').textContent = Day;
    document.querySelector('.timeDiv').textContent = time;
}

function setZero(h){
    if(Number(h)< 10 ){
        var n = '0'+String(h);
        return n;
    }
    else{
        return String(h);
    }
}

function setDay(d){
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[d];
}

function setHours(h){
    if(h > 12 ){
        return h-12;
    }
}

setInterval(setTime,1000);


$('.loginDiv').click(function(){
    $('#myModal').show();
    
});

$('.close').click(function(){
    $('#myModal').hide();
});

//when a user click ouside the modal close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         $('#myModal').hide();
//     }
//   }

$('#enab').click(function(){
   if( $(this).prop('checked') == true){
       console.log($(this).prop('checked'));
        $('#svgPath').attr('fill','rgb(18, 19, 19 ,0.958)');
        $('body').css('backgroundColor','rgb(194, 198, 195) ');
        $('.dateDiv').css('backgroundColor','rgb(36, 38, 37)');
        $('.addbutton').css('backgroundColor','rgb(47, 48, 48)');
    }
    else{
        $('#svgPath').attr('fill','rgb(65, 15, 85,0.792)');
        $('body').css('backgroundColor','rgb(248, 218, 248)');
        $('.dateDiv').css('backgroundColor','rgb(93, 173, 238)');
        $('.addbutton').css('backgroundColor','rgb(47, 48, 48)');
    }
});