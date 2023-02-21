import Cookies from "js-cookie";

export async function csrfFetch(url, options = {}) {
    // set options.method to "GET" if there is no method
    options.method = options.method || "GET";

    // set options.headers to an empty object if there are no headers
    options.headers = options.headers || {};

    // if options.method is not "GET", set "Content-Type" header to "application/json"
    // set "XSRF-TOKEN" header to the value of the "XSRF-TOKEN" cookie
    if (options.method.toUpperCase() !== "GET") {
        if (options.headers["Content-Type"] === "multipart/form-data") {
            delete options.headers["Content-Type"];
        } else {
            options.headers["Content-Type"] =
                options.headers["Content-Type"] || "application/json";
        }
        options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
    }

    console.log("hit csrfFetch", url, options)

    // call the default window's fetch with the url and the options passed in
    const res = await window.fetch(url, options);

    // if the response status code is 400 or above, then throw an error with error being the response
    console.log("res", res)
    if (res.status >= 400) throw res;


    // if the response is under 400, then return the response to the next promise chain
    return res
}

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch("/api/csrf/restore");
}
