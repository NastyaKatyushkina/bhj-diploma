/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.responseType = 'json';
    if (options.method === "GET") {
        const query = new URLSearchParams(options.data)
        console.log(query.toString())
        xhr.open("GET", options.url + "?" + query.toString(), true)
        xhr.send()
    } else {
        const formData = new FormData()
        for (const [key, value] of Object.entries(options.data)) {
            formData.append(key, value)
        }
        xhr.open(options.method, options.url, true);
        xhr.send(formData);
    }
    xhr.addEventListener("load", () => {
        options.callback(null, xhr.response)
    })
    xhr.addEventListener("error", () => {
        options.callback(xhr.status, null)
    })

};
