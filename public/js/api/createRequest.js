/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.withCredentials = true;
    xhr.responseType = options.responseType;
    if (options.method === "GET") {
        for (let key in options.data) {
            options.url += `?${key}=${options.data[key]}&`;
        }
    } else {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }

    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            options.callback(null, xhr.response);
            console.log(xhr.response);
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            const err = new Error("error");
            options.callback(err);
        }
    })

    try {
        xhr.open(options.method, options.url);
        xhr.send(formData);
    } catch (err) {
        console.log(err);
        callback(err);
    }
};
