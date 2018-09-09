var intVal = null;
var buttonObject = null;
var counter = 0;

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
        clearInterval(intVal);
        intVal = null;
        $(buttonObject).text("Timer (Off)");
        $(buttonObject).css("background-color", "");

        const jsonRx = $.getJSON(jokesRestUrl,
            (data) => {
                if (data.type === "success") {
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
        if (!intVal && counter <= 10) {
            $elementId.empty();
            buttonObject = button;
            $(button).text("Timer (ON) - MAX(10)");
            $(button).css("background-color", "red");
            intVal = setInterval(() => {
                const jsonRx = $.getJSON(jokesRestUrl,
                    (data) => {
                        if (data.type === "success" && counter < 10) {
                            const randomJoke = data.value[Math.floor(Math.random() * data.value.length)];
                            console.log(randomJoke);
                            const group = $('<optgroup label="' + randomJoke.categories + '">');
                            $("<option value='" + randomJoke.id + "' />").html(randomJoke.joke).appendTo(group);
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