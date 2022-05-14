import React, { useState, useEffect, useRef } from 'react'
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
// import { Dialog } from "primereact/dialog";
// import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { StudentService } from '../service/StudentService';
import { UtilService } from '../service/UtilService';
import { useForm, Controller } from "react-hook-form";
import TcknValidator from "../validators/tcknValidator";


export default function StudentForm({ student, closePopup }) {
    // const [filterTckn, setFilterTckn] = useState("");
    // const [filterStudentName, setFilterStudentName] = useState("");
    // const [filterPhone, setFilterPhone] = useState("");
    // const [filterCity, setFilterCity] = useState(0);
    // const [filterTown, setFilterTown] = useState(0);
    const [cities, setCities] = useState([]);
    const [towns, setTowns] = useState([]);
    // const [formData, setFormData] = useState({});
    const toast = useRef(null);



    const utilService = new UtilService();
    const studentService = new StudentService();

    const defaultValues = {
        tckn: '',
        adi: '',
        telefon: '',
        sehir: -1,
        ilce: -1
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues: student });

    const onSubmit = async (data) => {
        // setFormData(data);
        // setShowMessage(true);
        //alert(JSON.stringify(data));
        if (data.ilce == -1 || data.sehir == -1) {
            alert("İl ve İlçe Bilgisi Seçiniz.");
            return;
        }


        await studentService.save(data);
        //toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Kaydedildi.', life: 3000 });
        alert("Kaydedildi.")
        reset();
        closePopup();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    var x = 0;
    useEffect(() => {
        initialize();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (student.sehir > 0 && cities.length > 0) {
            setTowns(getCity(student.sehir).ilceBilgisi)
        }
    }, [cities]); // eslint-disable-line react-hooks/exhaustive-deps

    const initialize = async () => {
        if (cities.length === 0) {
            var x = await utilService.getCities();
            setCities(x);

        }
        // reset(student);
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
        return <Controller name="sehir" control={control} render={({ field }) => (
            <Dropdown
                id={field.name}
                value={field.value}
                onChange={(e) => { field.onChange(e.value); setTowns(getCity(e.value).ilceBilgisi) }}
                options={cities.map((city) => { return { label: city.aciklama, value: city.kod }; })}
                // optionLabel="aciklama"
                placeholder="şehir seçiniz..."
                style={{ width: "100%" }} />
        )} />
    }

    const townDropDown = () => {
        return <Controller name="ilce" control={control} render={({ field }) => (
            <Dropdown
                id={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={towns.map((town) => { return { label: town.aciklama, value: town.MernisKodu }; })}
                // optionLabel="aciklama"
                placeholder="ilçe seçiniz..."
                style={{ width: "100%" }} />
        )} />
    }

    const getCity = (cityCode) => {
        return cities.find(city => city.kod === cityCode);
    }

    const getTown = (cityCode, townCode) => {
        return getCity(cityCode).ilceBilgisi.find(town => town.MernisKodu === townCode);
    }



    return (
        <div>
            <Toast ref={toast} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="field grid">
                        <label htmlFor="tckn" className="col-fixed" style={{ width: "150px" }}>T.C. Kimlik No.</label>
                        <div className="col-5">
                            <Controller name="tckn" control={control} rules={{
                                required: 'Tckn is required.',
                                validate: (value) => {
                                    let valid = TcknValidator(value);
                                    return valid ? null : 'Tckn is invalid';
                                }
                            }} render={({ field, fieldState, onChange }) => (
                                <InputText
                                    mask="99999999999"
                                    // value={field.value}
                                    placeholder="tckn..."
                                    // autoFocus
                                    id={field.name} {...field}
                                    style={{ width: "100%" }}
                                    // className="inputfield w-full"
                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                // onChange={onChange}
                                />



                            )} />
                            {/* <label htmlFor="tckn" className={classNames({ 'p-error': errors.tckn })}>Tckn*</label> */}


                        </div>
                        {getFormErrorMessage('tckn')}

                    </div>

                    <div className="field grid">
                        <label htmlFor="adi" className="col-fixed" style={{ width: "150px" }}>Öğrenci Adı</label>
                        <div className="col-5">
                            <div className="formgroup-inline">
                                <div className="field w-6 mr-0">
                                    <Controller name="adi" control={control} rules={{ required: 'Adı is required.' }} render={({ field, fieldState }) => (
                                        <InputText
                                            keyfilter="alpha"
                                            // value={filterStudentName}
                                            placeholder="adı..."
                                            id={field.name} {...field}
                                            style={{ width: "100%" }}
                                            // className="inputfield w-full"
                                            className={classNames({ 'p-invalid': fieldState.invalid })}
                                        />

                                    )} />
                                </div>
                                <div className="field w-6 mr-0">
                                    <Controller name="soyadi" control={control} rules={{ required: 'Soyadı is required.' }} render={({ field, fieldState }) => (
                                        <InputText
                                            keyfilter="alpha"
                                            // value={filterStudentName}
                                            placeholder="soyadı..."
                                            id={field.name} {...field}
                                            style={{ width: "100%" }}
                                            // className="inputfield w-full"
                                            className={classNames({ 'p-invalid': fieldState.invalid })}
                                        />

                                    )} />
                                </div>
                            </div>
                        </div>
                        {getFormErrorMessage('adi')}
                        {getFormErrorMessage('soyadi')}
                    </div>

                    <div className="field grid">
                        <label htmlFor="telefon" className="col-fixed" style={{ width: "150px" }}>Telefon</label>
                        <div className="col-5">
                            <Controller name="telefon" control={control} rules={{ required: 'Telefon is required.' }} render={({ field, fieldState, onChange }) => (
                                <InputText
                                    id={field.name} {...field}
                                    mask="0(599)9999999"
                                    // value={field.value}
                                    style={{ width: "100%" }}
                                    // placeholder="0(999)9999999"
                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                // onChange={onChange}
                                ></InputText>
                            )} />
                        </div>
                        {getFormErrorMessage('telefon')}
                    </div>

                    <div className="field grid">
                        <label htmlFor="sehir" className="col-fixed" style={{ width: "150px" }}>Şehir</label>
                        <div className="col-5">
                            {cityDropDown()}
                        </div>
                    </div>

                    <div className="field grid">
                        <label htmlFor="ilce" className="col-fixed" style={{ width: "150px" }}>İlçe</label>
                        <div className="col-5">
                            {townDropDown()}
                        </div>
                    </div>

                    {/* <div className="field grid">
                    <div className="col">

                    </div>
                    <div className="col">
                        <Button label="sorgula" className="right-0" />
                    </div>
                </div> */}
                </div>
                <Button type="submit" label="Kaydet" className="right-0" />
            </form>
        </div>);
}
