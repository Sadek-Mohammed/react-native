$(document).ready(function () {
    $(".location-method").hide();
    navigator.geolocation.getCurrentPosition(function (pos) {
        //Location
        let myLat = pos.coords.latitude;
        let myLng = pos.coords.longitude;
        let lat = myLat;
        let lng = myLng;
        //Date
        let day = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let hour = new Date().getHours();
        let min = new Date().getMinutes();
        let ampm = hour > 12 ? "PM" : "AM";
        //?parameters=T2M&community=SB&longitude=0&latitude=0&start=20170101&end=20170102&format=JSON
        let link = "https://power.larc.nasa.gov/api/temporal";
        $(".loc").html("Latitude: " + lat + "<br>Longitude: " + lng);
        $(".time").html(`${hour % 12 < 10 ? 0 : ''}${hour % 12}:${min < 10 ? 0 : ''}${min} ${ampm} <br> ${day}-${month}-${year}`);

        $(".b1").click(function () {
            $(this).next(".location-method").slideToggle();
        });
        $(".submit-location-manually").click(function () {
            if ($("#lat").val() == "" || $("#lng").val() == "") {
                alert('Please Enter Latitide and Longitude');
            } else {
                lat = $("#lat").val();
                lng = $("#lng").val();
                $(".loc").html("Latitude: " + lat + "<br>Longitude: " + lng);
            }
        });
        $(".get-loc").click(function () {
            lat = myLat;
            lng = myLng;
            $(".loc").html("Latitude: " + lat + "<br>Longitude: " + lng);
        });
        $(".fetch-hour").click(function () {
            lat = myLat;
            lng = myLng;
            //https://power.larc.nasa.gov/api/temporal/hourly/point?parameters=T2M&community=SB&longitude=31.2737792&latitude=30.0548096&start=2021101&end=2021102&format=JSON
            //`${link}/hourly/point?parameters=T2M&community=SB&longitude=${myLng}&latitude=${myLat}&start=${year}${month}${day - 1}&end=${year}${month}${day}&format=JSON`
            $.get(`https://power.larc.nasa.gov/api/temporal/hourly/point?parameters=T2M&community=SB&longitude=31.2737792&latitude=30.0548096&start=2021101&end=2021102&format=JSON`, function (data) {
                console.log(data)
                alert("done with success");
            });
        });
        // function initMap() {
        //     let options = {
        //         zoom: 7,
        //         center: {lat: 30.0444, lng: 31.2357},
        //     };
        //     let map = new google.maps.Map(document.getElementById('map'), options);
        // }
    });
});