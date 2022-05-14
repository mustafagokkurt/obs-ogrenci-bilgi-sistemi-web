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

    async getStudents(filterTckn, filterStudentName, filterStudentSurName, filterPhone, filterCity, filterTown) {
        var search = "";
        if (filterTckn) search = search + `tckn=${filterTckn}&`;
        if (filterStudentName) search = search + `adi=${filterStudentName}&`;
        if (filterStudentSurName) search = search + `soyadi=${filterStudentSurName}&`;
        if (filterPhone) search = search + `telefon=${filterPhone}&`;
        search = search + `sehir=${filterCity}&`;
        search = search + `ilce=${filterTown}&`;

        var response = await fetch(`http://localhost:8080/students?${search}`, {
            "method": "GET",
            // mode: 'no-cors',
            // "content-type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Credentials": true
            // "accept": "application/json"
        });

        return response.json();
    }

    async save(student) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        };
        var response = await fetch('http://localhost:8080/students/save', requestOptions)
        return response.json();
    }

    async delete(student) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        };
        var response = await fetch('http://localhost:8080/students/delete', requestOptions);
        return response;
    }

    async getById(id) {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        var response = await fetch(`http://localhost:8080/students/${id}`, requestOptions);
        return response.json();
    }
}