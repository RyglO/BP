import Auth from "./Auth";


const loadDataPoly = (id, key, order, interval, aggregateFunction, startTS, endTS) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "token": Auth.getJwt(),
            "DeviceID": id,
            "startTS": startTS,
            "endTS": endTS,
            "keys": key,
            "orderBy": order,
            "interval": interval,
            "agg": aggregateFunction
        }),
    }
    return fetch("http://127.0.0.1:8000/api/dataDevices", requestOptions)
    .then((response) =>
    response.json())
    .then((d) => {
        return d
    })
}

export default loadDataPoly