export class StudentService {
    getStudents2(filterTckn, filterStudentName, filterPhone, filterCity, filterTown) {
        var search = "";
        if (filterTckn) search = search + `Tckn:${filterTckn}`;
        if (filterStudentName) search = search + `Adi:${filterStudentName}`;
        if (filterPhone) search = search + `Telefon:${filterPhone}`;
        if (filterCity) search = search + `Sehir:${filterCity}`;
        if (filterTown) search = search + `Ilce:${filterTown}`;

        return fetch(`http://localhost:8080/students?search=${search}`, {
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
            .then(d => {
                return d;
            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }

    getStudents(filterTckn, filterStudentName, filterPhone, filterCity, filterTown) {
        var search = "";
        if (filterTckn) search = search + `tckn=${filterTckn}&`;
        if (filterStudentName) search = search + `adi=${filterStudentName}&`;
        if (filterPhone) search = search + `telefon=${filterPhone}&`;
        search = search + `sehir=${filterCity}&`;
        search = search + `ilce=${filterTown}&`;

        return fetch(`http://localhost:8080/students?${search}`, {
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
            .then(d => {
                return d;
            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }

    create(student) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        };
        fetch('http://localhost:8080/students/add', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    delete(student) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        };
        fetch('http://localhost:8080/students/delete', requestOptions)
            .then(res => {
                return res.json();
            })
            .then(d => {
                return d;
            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }
}