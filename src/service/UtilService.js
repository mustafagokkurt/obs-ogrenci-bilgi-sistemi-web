export class UtilService {

    async getCities() {

        const requestOptions = {
            method: "GET",
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ title: 'React POST Request Example' }),        
            // mode: 'no-cors',
            // "content-type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Credentials": true
            // "accept": "application/json"
        };

        const response = await fetch('http://localhost:8080/util/cities', requestOptions)
        const data = await response.json();

        return data;
    }
}