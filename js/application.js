$(function () {
    // nav resizer
    $(window).scroll(function () {
        $('body').toggleClass('small-logo', $(document).scrollTop() > 0);
    });

    // contact form
    var form = $("#form-contact");
    if (form.length) {
        var serialize = function (f) {
            var data = f.serializeArray();
            var result = {};
            $.map(data, function (o) {
                result[o['name']] = o['value'];
            });
            return result;
        };

        var submit = function (f, data) {
            $.ajax({
                url: "https://formspree.io/barbarakastelin#hotmail.com".replace("#", "@"),
                method: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    window.location.href = f.attr("action");
                },
                error: function (xhr, status, errorC) {
                    console.log(xhr.responseText);
                    alert("Oops! Looks like something went wrong trying to send your message");
                }
            });
        };

        form.submit(function (ev) {
            event.preventDefault();
            event.stopPropagation();
            var data = serialize(form);
            if (!data.country) {
                delete data['country'];
                if (form.get(0).checkValidity() === true) {
                    submit(form, data);
                }
                form.toggleClass('was-validated', true);
            }
        });
    }
});
