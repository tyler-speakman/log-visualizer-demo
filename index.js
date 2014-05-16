console.log('success');

function initialize() {
    // Initialize datetime picker
    $('.timepicker').timepicker({
        template: false,
        showInputs: false,
        minuteStep: 5,
        showSeconds: true,
        showMeridian: false
    }).on('changeTime.timepicker', function(e) {
        console.log('The time is ' + e.time.value);
        console.log('The hour is ' + e.time.hour);
        console.log('The minute is ' + e.time.minute);
        console.log('The meridian is ' + e.time.meridian);
    })

    $('.timepicker').on('focusin', function(e) {
        console.log('focusin');
        clearTimeout(timedUpdateId);
    });
    $('.timepicker').on('focusout', function(e) {
        console.log('focusout');
        timedUpdateId = setTimeout(timedUpdate, 1000);
    });


    var now = moment()

    updateDateTime(now)
}

function update() {
    var dateTime = getDateTime();

    dateTime.add('milliseconds', 1000);

    updateDateTime(dateTime);
}

function updateDateTime(now) {
    $('.timepicker').timepicker('setTime', now.format('HH:mm:ss'));

    var second = now.seconds() * 6,
        minute = now.minutes() * 6 + second / 60,
        hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;

    $('#hour').css("transform", "rotate(" + hour + "deg)");
    $('#minute').css("transform", "rotate(" + minute + "deg)");
    $('#second').css("transform", "rotate(" + second + "deg)");
}

function getDateTime() {
    var dateTime = moment($('.timepicker').val(), 'HH:mm:ss');

    return dateTime;
}

var timedUpdateId;

function timedUpdate() {
    update();
    timedUpdateId = setTimeout(timedUpdate, 1000);
}

$(document).ready(function() {
    initialize();
    timedUpdate();
});

// (function() {
//     initialize();
//     // timedUpdate();
// })();