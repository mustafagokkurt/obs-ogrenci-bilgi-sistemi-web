export class UtilService {
    async getCities() {
        return await fetch('http://localhost:8080/util/cities', {
            "method": "GET",
            // mode: 'no-cors',
            // "content-type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Credentials": true
            // "accept": "application/json"
        })
            .then(res => {
                return res.json();
            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }
}