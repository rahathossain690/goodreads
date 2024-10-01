
$(document).ready(function () {
    checkForLoggedin();
    function checkForLoggedin() {
        const profile = JSON.parse(localStorage.getItem('profile'));

        if (profile) {
            $('#myProfile').attr('href', `/user/${profile.id}`);
            $('#myProfileSection').show();
            $('#loginSection').hide();
            $('#registerSection').hide();
            return;
        }

        const token = localStorage.getItem('token');
        if (token) {
            $.ajax({
                url: '/api/auth/profile',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: function (data) {
                    localStorage.setItem('profile', JSON.stringify(data));
                    $('#myProfile').attr('href', `/user/${data.id}`);
                    $('#myProfileSection').show();
                    $('#loginSection').hide();
                    $('#registerSection').hide();
                },
                error: function () {
                    $('#myProfileSection').hide();
                    $('#loginSection').show();
                    $('#registerSection').show();
                }
            });
        } else {
            $('#myProfileSection').hide();
            $('#loginSection').show();
            $('#registerSection').show();
        }
    }
});