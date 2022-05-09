import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import '/node_modules/primeflex/primeflex.css';
import '../index.css';
import ReactDOM from 'react-dom';
import StudentForm from './StudentForm';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { StudentService } from '../service/StudentService';
import { UtilService } from '../service/UtilService';

export const DataTableBasicDemo = () => {
    const emptyStudent = {
        tckn: '',
        adi: '',
        telefon: '',
        sehir: 0,
        ilce: 0
    }


    const [filterTckn, setFilterTckn] = useState("");
    const [filterStudentName, setFilterStudentName] = useState("");
    const [filterPhone, setFilterPhone] = useState("");
    const [filterCity, setFilterCity] = useState(0);
    const [filterTown, setFilterTown] = useState(0);

    const [displayBasic, setDisplayBasic] = useState(false);
    const [dialog, setDialog] = useState(null);

    const [deleteStudentDialog, setDeleteStudentDialog] = useState(false);

    const [student, setStudent] = useState(emptyStudent);
    const [students, setStudents] = useState([]);
    const studentService = new StudentService();

    const [cities, setCities] = useState([]);

    const utilService = new UtilService();

    const toast = useRef(null);

    useEffect(() => {
        initialize();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const initialize = async () => {
        await utilService.getCities().then(data => setCities(data));
        // await studentService.getStudents().then(data => setStudents(data));
    }

    const cityBodyTemplate = (rowData) => {
        return <span>{getCity(rowData.sehir).aciklama}</span>;
    }

    const townBodyTemplate = (rowData) => {
        return <span>{getTown(rowData.sehir, rowData.ilce).aciklama}</span>;
    }

    // const onCityChange = (e) => {
    //     setSelectedCity1(e.value);
    // }

    const cityDropDown = () => {
        return <Dropdown value={filterCity} options={cities} onChange={(e) => setFilterCity(e.target.value)} optionLabel="aciklama" placeholder="şehir seçiniz..." style={{ width: "100%" }} />
    }

    const townDropDown = () => {
        return <Dropdown value={filterTown} options={filterCity.ilceBilgisi} onChange={(e) => setFilterTown(e.target.value)} optionLabel="aciklama" placeholder="ilçe seçiniz..." style={{ width: "100%" }} />
    }

    const getCity = (cityCode) => {
        return cities.find(city => city.kod === cityCode);
    }

    const getTown = (cityCode, townCode) => {
        return getCity(cityCode).ilceBilgisi.find(town => town.MernisKodu === townCode);
    }

    const listStudents = async () => {

        // console.log("query", q);        
        await studentService.getStudents(filterTckn, filterStudentName, filterPhone, filterCity.kod || 0, filterTown.mernisKodu || 0).then(data => setStudents(data));
    };

    const resetFilters = async () => {

        setFilterTckn("");
        setFilterStudentName("");
        setFilterPhone("");
        setFilterCity(0);
        setFilterTown(0);
    };

    const editProduct = (product) => {
        // setProduct({...product});
        // setProductDialog(true);
    }

    const confirmDeleteProduct = (student) => {
        setStudent(student);
        setDeleteStudentDialog(true);
    }

    const hideDeleteStudentDialog = () => {
        setDeleteStudentDialog(false);
    }

    const deleteStudent = async () => {
        let _students = students.filter(val => val.id !== student.id);
        setStudents(_students);
        setDeleteStudentDialog(false);
        setStudent(emptyStudent);
        await studentService.delete(student);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    const deleteStudentDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteStudentDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteStudent} />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const openNew = () => {
        // setProduct(emptyProduct);
        // setSubmitted(false);
        // setProductDialog(true);
    }

    const confirmDeleteSelected = () => {
        // setDeleteProductsDialog(true);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={() => setDisplayBasic(true)} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} />
            </React.Fragment>
        )
    }

    const renderFooter = (name) => {
        return (
            <div>
                {/* <Button
                    label="No"
                    icon="pi pi-times"
                    onClick={() => {
                        dialog.props.onHide();
                        setDisplayBasic(false);
                    }}
                    className="p-button-text"
                /> */}
                <Button
                    label="Kaydet"
                    icon="pi pi-check"
                    onClick={() => setDisplayBasic(false)}
                    autoFocus
                />
            </div>
        );
    };

    return (
        <React.Fragment>
            <div className="col-3">
                <div className="field grid">
                    <label htmlFor="tckn" className="col-fixed" style={{ width: "150px" }}>T.C. Kimlik No.</label>
                    <div className="col">
                        <InputMask
                            mask="99999999999"
                            value={filterTckn}
                            placeholder="tckn..."
                            id="tckn"
                            style={{ width: "100%" }}
                            className="inputfield w-full"
                            onChange={(e) => setFilterTckn(e.target.value)}
                        />
                    </div>
                </div>

                <div className="field grid">
                    <label htmlFor="adi" className="col-fixed" style={{ width: "150px" }}>Öğrenci Adı</label>
                    <div className="col">
                        <InputText
                            keyfilter="alpha"
                            value={filterStudentName}
                            placeholder="adı..."
                            id="adi"
                            style={{ width: "100%" }}
                            className="inputfield w-full"
                            onChange={(e) => setFilterStudentName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="field grid">
                    <label htmlFor="telefon" className="col-fixed" style={{ width: "150px" }}>Telefon</label>
                    <div className="col">
                        <InputMask
                            id="telefon"
                            mask="0(599)9999999"
                            value={filterPhone}
                            style={{ width: "100%" }}
                            placeholder="0(999)9999999"
                            className="inputfield w-full"
                            onChange={(e) => setFilterPhone(e.target.value)}></InputMask>
                    </div>
                </div>

                <div className="field grid">
                    <label htmlFor="sehir" className="col-fixed" style={{ width: "150px" }}>Şehir</label>
                    <div className="col">
                        {cityDropDown()}
                    </div>
                </div>

                <div className="field grid">
                    <label htmlFor="ilce" className="col-fixed" style={{ width: "150px" }}>İlçe</label>
                    <div className="col">
                        {townDropDown()}
                    </div>
                </div>

                <div className="field grid">
                    <div className="col">

                    </div>
                    <div className="col">
                        <Button label="sorgula" className="right-0" onClick={listStudents} />
                    </div>
                    <div className="col">
                        <Button label="temizle" className="right-0" onClick={resetFilters} />
                    </div>
                </div>
            </div>

            <div>
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <div className="card">
                    <DataTable value={students} responsiveLayout="scroll">
                        <Column field="tckn" header="T.C. Kimlik No."></Column>
                        <Column field="adi" header="Öğrenci Adı"></Column>
                        <Column field="telefon" header="Telefon"></Column>
                        <Column field="sehir" header="Şehir" body={cityBodyTemplate}></Column>
                        <Column field="ilce" header="İlçe" body={townBodyTemplate}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ maxWidth: '4rem' }}></Column>
                    </DataTable>
                </div>
            </div>

            <Dialog
                //ref={(el) => setDialog(el)}
                header="Yeni Öğrenci Ekle"
                visible={displayBasic}
                style={{ width: "50vw" }}
                // footer={renderFooter("displayBasic")}
                onHide={() => {
                    console.log("onHide");
                    setDisplayBasic(false);
                }}
            >
                <StudentForm></StudentForm>
            </Dialog>

            <Dialog visible={deleteStudentDialog} style={{ width: '600px' }} header="Confirm" modal footer={deleteStudentDialogFooter} onHide={hideDeleteStudentDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {student && <span>Are you sure you want to delete <b>{student.adi}</b>?</span>}
                </div>
            </Dialog>

        </React.Fragment>
    );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<DataTableBasicDemo />, rootElement);
//export default DataTableBasicDemo;