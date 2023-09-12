// JavaScript Document

// googlesheet needs to be shared as viewable with link or with everyone and make sure there are no hidden sheets to throw your count off.
function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

function getDescription(stratText) {
    switch (stratText) {
        case "pv1":
            valText = "UC ANR: Promoting economic prosperity in California"
            break;
        case "pv2":
            valText = "UC ANR: Developing a qualified workforce for California"
            break;
        case "pv3":
            valText = "UC ANR: Safeguarding abundant and healthy food for all Californians"
            break;
        case "pv4":
            valText = "UC ANR: Protecting California’s natural resources"
            break;
        case "pv5":
            valText = "UC ANR: Building climate-resilient communities and ecosystems"
            break;
        case "pv6":
            valText = "UC ANR: Promoting healthy people and communities"
            break;
        case "pv7":
            valText = "UC ANR: Developing an inclusive and equitable society"
            break;
        case "sg1":
            valText = "UC ANR: Strengthen research and extension partnerships"
            break;
        case "sg2":
            valText = "UC ANR: Increase UC ANR's reach"
            break;
        case "sg3":
            valText = "UC ANR: Build sustainable economies for working landscapes"
            break;
        case "sg4":
            valText = "UC ANR: Catalyze support system for innovation and entrepreneurship"
            break;
        case "sg5":
            valText = "UC ANR: Prioritize programs and services"
            break;
        case "sg6":
            valText = "UC ANR: Recruit and retain people"
            break;
        case "sg7":
            valText = "UC ANR: Improve equity, inclusion and diversity"
            break;
        case "sg8":
            valText = "UC ANR: Expand career and leadership development"
            break;
        case "sg9":
            valText = "UC ANR: Improve volunteer management"
            break;
        case "sg10":
            valText = "UC ANR: Generate revenue and optimize resource deployment"
            break;
        case "sg11":
            valText = "UC ANR: Expand and diversify fundraising"
            break;
        case "sg12":
            valText = "UC ANR: Modernize technology and facilities infrastructure"
            break;
        case "sg13":
            valText = "UC ANR: Streamline administrative functions"
            break;
        case "sg14":
            valText = "UC ANR: Leverage UC's business systems improvements"
            break;
        case "sg15":
            valText = "UC ANR: Tell UC ANR's story"
            break;
        default:
            // code block
    }
    return valText;
}

function getIcons(catText) {
    var footerText = '';
    var t = catText;
    if (t.includes('hours')) {
        footerText += '<span><a href="http://igis.ucanr.edu/Resources/Online_Office_Hours/"><img class="imgIcon"  title="Office Hours" src="https://geodata.ucanr.edu/igis_site/taskbar-icon-hours-default@2x.png"></img></a></span>';
    }
    if (t.includes('gis')) {
        footerText += '<span><a href="http://igis.ucanr.edu/GIS_Services/"><img class="imgIcon"  title="GIS Services" src="https://geodata.ucanr.edu/igis_site/taskbar-icon-gis-default@2x.png"></img></a></span>';
    }
    if (t.includes('drone')) {
        footerText += '<span><a href="http://igis.ucanr.edu/Drone_Services/"><img class="imgIcon"  title="Drone Services" src="https://geodata.ucanr.edu/igis_site/taskbar-icon-drones-default@2x.png"></img></a></span>';
    }
    if (t.includes('training')) {
        footerText += '<span><a href="http://igis.ucanr.edu/Training/"><img class="imgIcon"  title="Training Services" src="https://geodata.ucanr.edu/igis_site/taskbar-icon-training-default@2x.png"></img></a></span>';
    }
    if (t.includes('research')) {
        footerText += '<span><a href="http://igis.ucanr.edu/Research_and_Innovation/"><img class="imgIcon"  title="Research and Innovation" src="https://geodata.ucanr.edu/igis_site/taskbar-icon-research-default@2x.png"></a></img></span>';
    }
    return footerText
}

function getIconCat(catText) {
    var footerText = '';
    var f = catText.toLowerCase();
    var j = f.split(",")

    for (i = 1; i < 6; i++) {
        p = 'pv' + i
        for (t = 0; t < j.length; t++) {
            if (j[t].trim() == p) {
                footerText += '<a href="https://ucanr.edu/sites/anrstaff/2016-2020_Strategic_Plan/Goal_5__Prioritize_programs_and_services/Public_values_statement/" target="_blank"><div class="anrGoals" title="' + getDescription(p) + '">PV' + i + '</div></a>';
            }
        }
    }

    for (i = 1; i < 6; i++) {
        for (i = 1; i < 16; i++) {
            p = 'sg' + i
            for (t = 0; t < j.length; t++) {
                if (j[t].trim() == p) {
                    footerText += '<a href="https://ucanr.edu/sites/anrstaff/2016-2020_Strategic_Plan/" target="_blank"><div class="anrGoals" title="' + getDescription(p) + '">SG' + i + '</div></a>';
                }
            }
        }
    }

    return footerText
}

$.getJSON("https://spreadsheets.google.com/feeds/list/1B_1syWClB-XZJedNXzf4ynRGnmp0WvQiN1wJw1hE8zY/5/public/values?alt=json", function (data) {
    var array = [];

    $.each(data.feed.entry, function (key, val) {
        array.push(val)
    });

    array = shuffle(array);

    $('#sourceId').attr('src', array[0].gsx$url.$t);
    $('#videoId').get(0).load();
});

$.getJSON("https://spreadsheets.google.com/feeds/list/1B_1syWClB-XZJedNXzf4ynRGnmp0WvQiN1wJw1hE8zY/4/public/values?alt=json", function (data) {
    var trHTML = '';
    var recCount = 0;
    var deckCount = 0;
    var array = [];
    var cutoff = parseInt($('#cards').attr("data-count"));
    var category = $('#cards').attr("data-category");

    $.each(data.feed.entry, function (key, val) {
        // include check for draft
        test = val.gsx$category.$t;
        draft = val.gsx$draft.$t;
        draft = draft.toLowerCase();
        if (draft != 'yes') {
            if (category == 'all') {
                array.push(val)
            } else {
                if (test.includes(category)) {
                    array.push(val)
                }
            }
        }
    });

    array = shuffle(array);

    $.each(array, function (key, val) {
        recCount += 1;
        if (recCount <= cutoff) {
            if (deckCount == 0) {
                trHTML += '<div class="card-deck" style="padding-left: 15px; padding-right: 15px; padding-bottom: 15px;">';
            }
            deckCount += 1;

            trHTML += '<div class="card"><div class="card-body"><h5 class="card-title">' + val.gsx$title.$t + '</h5><p>' + val.gsx$subtitle.$t + '<a href="' + val.gsx$link.$t + '">Link</a></p><img class="imgBanner" src="' + val.gsx$photo.$t + '"></img></div><div class="card-footer text-muted anrBlue"><div style="float: left; display:inline-block;">' + getIcons(val.gsx$category.$t) + '</div><div style="float: right; display:inline-block;">' + getIconCat(val.gsx$stratcat.$t) + '</div></div></div>';
            if (deckCount == 3) {
                trHTML += '</div>';
                deckCount = 0;
            }
        }

    });
    trHTML += '</div>';

    $('#cards').empty();
    $('#cards').append(trHTML);
});

$.getJSON("https://spreadsheets.google.com/feeds/list/1-APx2HLxz2RIYO_e7LyqyearVBYabGbkMJOZwz6Vk94/22/public/values?alt=json", function (data) {
    var projects = data.feed.entry[2].gsx$count.$t;
    var drones = data.feed.entry[3].gsx$count.$t;
    var trainings = (parseInt(data.feed.entry[6].gsx$count.$t) + parseInt(data.feed.entry[7].gsx$count.$t));

    $('#trainings').text(trainings);
    $('#drones').text(drones);
    $('#projects').text(projects);
});

$.getJSON("https://spreadsheets.google.com/feeds/list/1B_1syWClB-XZJedNXzf4ynRGnmp0WvQiN1wJw1hE8zY/6/public/values?alt=json", function (data) {
    var trHTML = '';
    //var cutoff = 4;
    var recCount = 0;

    var array = [];

    $.each(data.feed.entry, function (key, val) {
        //test = val.gsx$category.$t;
        //if (test.includes('gis')) {
        array.push(val)
            //}
    });

    array = shuffle(array);

    var cutoff = parseInt($('#testimonials').attr("data-count")) + 1;

    $.each(array, function (key, val) {
        recCount += 1

        if (recCount < cutoff) {
            trHTML += '<li class="list-group-item"><div class="media"><div class="media-left d-flex mr-3"><a href="#"> <img src="' + val.gsx$photo.$t + '" alt=""> </a></div><div class="media-body"><div class="testimonial"><p>' + val.gsx$testimonial.$t + '</p><p class="overview"><strong>' + val.gsx$name.$t + '</strong>, ' + val.gsx$position.$t + '</p></div></div></div></li>';
        }
    });

    $('#testimonials').empty();
    $('#testimonials').append(trHTML);
});

$.getJSON("https://spreadsheets.google.com/feeds/list/1B_1syWClB-XZJedNXzf4ynRGnmp0WvQiN1wJw1hE8zY/9/public/values?alt=json", function (data) {
    var trHTML = '';
    var recCount = 0;

    var array = [];

    $.each(data.feed.entry, function (key, val) {
        array.push(val)
    });

    //array = shuffle(array);

    var cutoff = parseInt($('#people').attr("data-count")) + 1;

    $.each(array, function (key, val) {
        recCount += 1

        if (recCount <= cutoff) {
            trHTML += '<li class="media list-group-item d-flex justify-content-between align-items-center"><img class="imgClass align-self-start mr-3" src="' + val.gsx$photourl.$t + '" alt="Photo of ' + val.gsx$name.$t + '"><div class="media-body"><h5 class="mt-0 mb-1"><a href="' + val.gsx$profileurl.$t + '" target="_blank">' + val.gsx$name.$t + '</a></h5><p>' + val.gsx$title.$t + '</p><p><i>' + val.gsx$welcomemsg.$t + '</i></p>                <table><tbody><tr><td class="highlight">Joined IGIS:</td><td>' + val.gsx$yearjoined.$t + '</td></tr><tr><td class="highlight">Specialties:</td><td>' + val.gsx$specialtiescsv.$t +
                '</td></tr><tr><td class="highlight">Software expertise:</td><td>' + val.gsx$softwarecsv.$t + '</td></tr><tr><td class="highlight">Address:</td><td>' + val.gsx$address.$t + '</td></tr>'

            if (val.gsx$phone.$t.length > 0) {
                trHTML += '<tr><td class="highlight">Phone:</td><td>' + val.gsx$phone.$t + '</td></tr>'
            }

            trHTML += '<tr><td class="highlight">Email:</td><td><a href="' + val.gsx$email.$t + '" target="_blank">' + val.gsx$email.$t + '</a></td></tr></tbody></table></div></li>';
        }
    });

    $('#people').empty();
    $('#people').append(trHTML);
});

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-foreground', {
        videoId: 'ddFvjfvPnqk', // YouTube Video ID
        playerVars: {
            autoplay: 1, // Auto-play the video on load
            controls: 0, // Show pause/play buttons in player
            showinfo: 0, // Hide the video title
            modestbranding: 1, // Hide the Youtube Logo
            loop: 1, // Run the video in a loop
            fs: 0, // Hide the full screen button
            cc_load_policy: 0, // Hide closed captions
            iv_load_policy: 3, // Hide the Video Annotations
            autohide: 0, // Hide video controls when playing
            playlist: 'ddFvjfvPnqk'
        },
        events: {
            onReady: function (e) {
                e.target.mute();
            }
        }
    });
}

$(document).ready(function () {
    $("#data").append("<a class='carousel-control-prev' href='#carousel-example' role='button' data-slide='prev'><span class='carousel-control-prev-icon'></span></a><a class='carousel-control-next' href='#carousel-example' role='button' data-slide='next'><span class='carousel-control-next-icon'></span></a>");
    $("#pager").append("<ul class='pagination pagination-lg pager' id='myPager'></ul>");
    $("<div class='px-page-standard d-flex align-items-center'><strong><a style='padding-bottom: 10px; display: block; color: #343a40 !important; text-decoration: none;  font-size: 1rem' href='https://ucanr.edu/sites/IGIS_Revised1/'>ANR’s leader for geospatial knowledge and innovation, meeting the growing demand for tools, data, training, and support across the ANR Continuum.</a></strong></div>").insertAfter("#siteNameLogo");


    $(".hours").click(function () {
        window.location = "http://igis.ucanr.edu/Resources/Online_Office_Hours/";
    });
    $(".gis").click(function () {
        window.location = "http://igis.ucanr.edu/GIS_Services/";
    });
    $(".drones").click(function () {
        window.location = "http://igis.ucanr.edu/Drone_Services/";
    });
    $(".training").click(function () {
        window.location = "http://igis.ucanr.edu/Training/";
    });
    $(".research").click(function () {
        window.location = "http://igis.ucanr.edu/Research_and_Innovation/";
    });

    $('.sound').on('click', function () {
        $('#video-foreground').toggleClass('mute');
        $('.volume-icon').toggleClass('fa-volume-up', 'fa-volume-off');
        if ($('#video-foreground').hasClass('mute')) {
            player.mute();
        } else {
            player.unMute();
        }
    });

    var today1 = new Date();
    var today = new Date();

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                       ];

    today1.setMonth(today1.getMonth() - 12);
    var year = today1.getFullYear();
    //var month = today.getMonth();
    var day = today1.getDate();

    //if (day < 10) {
    //    day = '0' + day;
    //}
    //if (month < 10) {
    //    month = '0' + month;
    //}

    var formattedDate = 'Date range: ' + monthNames[today1.getMonth()] + ' ' + day + ', ' + year + ' to present'

    $('#daterange').append(formattedDate);

    $.getJSON("https://spreadsheets.google.com/feeds/list/1B_1syWClB-XZJedNXzf4ynRGnmp0WvQiN1wJw1hE8zY/1/public/values?alt=json", function (data) {

        var trHTML = '';

        $.each(data.feed.entry, function (key, val) {
            var parts = val.gsx$date.$t.split('/');
            var mydate = new Date(parts[2], parts[0] - 1, parts[1]);
            if (mydate > today) {
                trHTML += '<tr>';
            } else {
                trHTML += '<tr class="grey">';
            }
            trHTML += '<td>' + val.gsx$date.$t + '</td><td>' + val.gsx$workshop.$t + '</td><td>' + val.gsx$location.$t + '</td><td>' + val.gsx$address.$t + '</td><td>' + val.gsx$moreinfo.$t + '</td></tr>';
        });

        $('#dataTable tbody tr').remove();
        $('#dataTable tbody').append(trHTML);

        $('#myTable').pageMe({
            pagerSelector: '#myPager',
            showPrevNext: true,
            hidePageNumbers: false,
            perPage: 6
        });

    });

    $.fn.pageMe = function (opts) {
        var $this = this,
            defaults = {
                perPage: 7,
                showPrevNext: false,
                hidePageNumbers: false
            },
            settings = $.extend(defaults, opts);

        var listElement = $this;
        var perPage = settings.perPage;
        var children = listElement.children();
        var pager = $('.pager');

        if (typeof settings.childSelector != "undefined") {
            children = listElement.find(settings.childSelector);
        }

        if (typeof settings.pagerSelector != "undefined") {
            pager = $(settings.pagerSelector);
        }

        var numItems = children.length;
        var numPages = Math.ceil(numItems / perPage);

        pager.data("curr", 0);

        if (settings.showPrevNext) {
            $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
        }

        var curr = 0;
        while (numPages > curr && (settings.hidePageNumbers == false)) {
            $('<li><a href="#" class="page_link">' + (curr + 1) + '</a></li>').appendTo(pager);
            curr++;
        }

        if (settings.showPrevNext) {
            $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
        }

        pager.find('.page_link:first').addClass('active');
        pager.find('.prev_link').hide();
        if (numPages <= 1) {
            pager.find('.next_link').hide();
        }
        pager.children().eq(1).addClass("active");

        children.hide();
        children.slice(0, perPage).show();

        pager.find('li .page_link').click(function () {
            var clickedPage = $(this).html().valueOf() - 1;
            goTo(clickedPage, perPage);
            return false;
        });
        pager.find('li .prev_link').click(function () {
            previous();
            return false;
        });
        pager.find('li .next_link').click(function () {
            next();
            return false;
        });

        function previous() {
            var goToPage = parseInt(pager.data("curr")) - 1;
            goTo(goToPage);
        }

        function next() {
            goToPage = parseInt(pager.data("curr")) + 1;
            goTo(goToPage);
        }

        function goTo(page) {
            var startAt = page * perPage,
                endOn = startAt + perPage;

            children.css('display', 'none').slice(startAt, endOn).show();

            if (page >= 1) {
                pager.find('.prev_link').show();
            } else {
                pager.find('.prev_link').hide();
            }

            if (page < (numPages - 1)) {
                pager.find('.next_link').show();
            } else {
                pager.find('.next_link').hide();
            }

            pager.data("curr", page);
            pager.children().removeClass("active");
            pager.children().eq(page + 1).addClass("active");

        }
    };
    $.getJSON("https://spreadsheets.google.com/feeds/list/1B_1syWClB-XZJedNXzf4ynRGnmp0WvQiN1wJw1hE8zY/8/public/values?alt=json", function (data) {
        var trHTML = '';
        var counter = 0;
        $.each(data.feed.entry, function (key, val) {
            var partsStart = val.gsx$startdate.$t.split('/');
            var partsEnd = val.gsx$enddate.$t.split('/');
            var startdate = new Date(partsStart[2], partsStart[0] - 1, partsStart[1]);
            var enddate = new Date(partsEnd[2], partsEnd[0] - 1, partsEnd[1]);
            if (startdate <= today && enddate >= today) {
                if (counter == 0) {
                    $("<div id='announcements' class='announce'></div>").insertBefore("#siteNameLogo");
                    trHTML += val.gsx$announcement.$t;
                    counter += 1;
                } else {
                    trHTML += '<br>&bull; ' + val.gsx$announcement.$t;
                    counter += 1;
                }
                //trHTML += val.gsx$announcement.$t;
            }
        });

        if (counter > 1) {
            trHTML = '&bull; ' + trHTML
        }

        $('#announcements').empty();
        $('#announcements').append(trHTML);
        $('#announcements2').empty();
        $('#announcements2').append(trHTML);
    });
    $.getJSON("https://spreadsheets.google.com/feeds/list/1hCw-LB5MznMtvJwxP96zBlQ_PNk63O1yPNdliB5GHlM/11/public/values?alt=json", function (data) {

        var html;
        var html2;
        var count = 0;

        $.each(data.feed.entry, function (key, val) {

            function addCSSRule(sheet, selector, rules, index) {
                if ("insertRule" in sheet) {
                    sheet.insertRule(selector + "{" + rules + "}", index);
                } else if ("addRule" in sheet) {
                    sheet.addRule(selector, rules, index);
                }
            }

            if (val.gsx$showcarousel.$t == "Yes") {

                count = count + 1;
                if (count == 1) {

                    html2 = $("<li data-target='#carousel-example' data-slide-to='" + (count - 1) + "' class='active'></li>");

                    html = $("<div class='carousel-item active divsize" + key + "'>").append(
                            $("<div class='hero'>").append(
                                $("<hgroup>").append(
                                    $("<h3>" + val.gsx$projectname.$t + "</h3><p>" + val.gsx$outcome.$t + "</p>"))))
                        .append($("<div class='overlay'>"))
                        .append($("<a href='" + val.gsx$urllink.$t + "'>"));
                    $("#data").append(html);
                    $("#indicators").append(html2);
                    addCSSRule(document.styleSheets[1], ".divsize" + key, "background: url(" + val.gsx$thumbnail.$t + "); position: relative; opacity: 1.0; background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover; height: 300px; width: 100%;");
                } else {
                    html2 = $("<li data-target='#carousel-example' data-slide-to='" + (count - 1) + "'></li>");
                    html = $("<div class='carousel-item divsize" + key + "'>").append(
                            $("<div class='hero'>").append(
                                $("<hgroup>").append(
                                    $("<h3>" + val.gsx$projectname.$t + "</h3><p>" + val.gsx$outcome.$t + "</p>"))))
                        .append($("<div class='overlay'>"))
                        .append($("<a href='" + val.gsx$urllink.$t + "'>"));
                    $("#data").append(html);
                    $("#indicators").append(html2);
                    addCSSRule(document.styleSheets[1], ".divsize" + key, "background: url(" + val.gsx$thumbnail.$t + "); position: relative; opacity: 1.0; background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover; height: 300px; width: 100%;");
                }
            }
        });
    });
    //Table for Drone Chat
    $.getJSON("https://spreadsheets.google.com/feeds/list/1B_1syWClB-XZJedNXzf4ynRGnmp0WvQiN1wJw1hE8zY/10/public/values?alt=json", function (data) {

        var trHTML = '';

        $.each(data.feed.entry, function (key, val) {
            var parts = val.gsx$date.$t.split('/');
            var mydate = new Date(parts[2], parts[0] - 1, parts[1]);
            var current = today.setHours(0, 0, 0, 0)
            if (val.gsx$speakers.$t != '') {
                if (mydate >= current) {
                    trHTML += '<tr>';
                } else {
                    trHTML += '<tr class="grey">';
                }

                trHTML += '<td>' + val.gsx$date.$t + '</td><td>' + val.gsx$speakers.$t + '</td><td>' + val.gsx$topic.$t + '</td></tr>';
            }
        });

        $('#chatTable tbody tr').remove();
        $('#chatTable tbody').append(trHTML);

        /*$('#myTable').pageMe({
            pagerSelector: '#myPager',
            showPrevNext: true,
            hidePageNumbers: false,
            perPage: 6
        });*/

    });
});
