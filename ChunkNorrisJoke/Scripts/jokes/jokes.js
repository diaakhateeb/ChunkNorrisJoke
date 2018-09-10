var intVal = null;
var buttonObject = null;
var counter = 1;

function stopTimer() {
    clearInterval(intVal);
    intVal = null;
    $(buttonObject).text("Timer (OFF) - MAX(10)");
    $(buttonObject).css("background-color", "");
    counter = 0;
    console.log(counter);
}

class JokeHandler {
    fetchSavedJokes($elementId, restUrl) {
        return $.ajax({
            url: restUrl,
            success: (response) => {
                console.log(response);

                $.each(response.value,
                    (k, v) => {
                        const group = $('<optgroup label="' + v.categories + '">');
                        $("<option value='" + v.id + "' />").html(v.joke).appendTo(group);
                        //group.appendTo("#jokesList");
                        group.appendTo($elementId);
                    });
            }
        });
    }

    fetchJokes($elementId, jokesRestUrl) {
        const jsonRx = $.getJSON(jokesRestUrl,
            (data) => {
                if (data.type === "success") {
                    clearInterval(intVal);
                    intVal = null;
                    $(buttonObject).text("Timer (OFF) - MAX(10)");
                    $(buttonObject).css("background-color", "");
                    $elementId.empty();
                    $.each(data.value,
                        (k, v) => {
                            const group = $('<optgroup label="' + v.categories + '">');
                            $("<option value='" + v.id + "' />").html(v.joke).appendTo(group);
                            group.appendTo($elementId);
                        });

                }
            });
        return jsonRx.then(() => {
            $elementId.multiSelect("deselect_all");
            $elementId.multiSelect("refresh");
            $elementId.multiSelect("deselect_all");
        });
    }

    fireJokesTimer($elementId, jokesRestUrl, interval, button) {
        if (!intVal) {
            $elementId.empty();
            buttonObject = button;
            $(button).text("Timer (ON) - MAX(10)");
            $(button).css("background-color", "red");
            intVal = setInterval(() => {
                const jsonRx = $.getJSON(jokesRestUrl,
                    (data) => {
                        if (data.type === "success" && counter <= 10) {
                            console.log(data.value[0]);
                            const group = $('<optgroup label="' + data.value[0].categories + '">');
                            $("<option value='" + data.value[0].id + "' />").html(data.value[0].joke).appendTo(group);
                            group.appendTo($elementId);
                            console.log($(button).text());
                            counter++;
                            console.log(counter);
                        } else stopTimer();
                    });
                return jsonRx.then(() => {
                    $elementId.multiSelect("deselect_all");
                    $elementId.multiSelect("refresh");
                    $elementId.multiSelect("deselect_all");
                });
            },
                interval);
        } else {
            stopTimer();
        }
    }
}