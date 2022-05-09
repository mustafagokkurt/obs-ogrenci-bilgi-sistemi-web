import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { StudentService } from '../service/StudentService';
import { UtilService } from '../service/UtilService';
import { useForm, Controller } from "react-hook-form";


export default function StudentForm({ childToParent }) {
    const [filterTckn, setFilterTckn] = useState("");
    const [filterStudentName, setFilterStudentName] = useState("");
    const [filterPhone, setFilterPhone] = useState("");
    const [filterCity, setFilterCity] = useState(0);
    const [filterTown, setFilterTown] = useState(0);
    const [cities, setCities] = useState([]);
    const [towns, setTowns] = useState([]);
    const [formData, setFormData] = useState({});


    const utilService = new UtilService();
    const studentService = new StudentService();

    const defaultValues = {
        tckn: '',
        adi: '',
        telefon: '',
        sehir: 0,
        ilce: 0
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = async (data) => {
        setFormData(data);
        // setShowMessage(true);
        alert(JSON.stringify(data));

        await studentService.create(data);
        alert("success");
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="field grid">
                        <label htmlFor="tckn" className="col-fixed" style={{ width: "150px" }}>T.C. Kimlik No.</label>
                        <div className="col-5">
                            <Controller name="tckn" control={control} rules={{ required: 'Tckn is required.' }} render={({ field, fieldState }) => (
                                <InputMask
                                    mask="99999999999"
                                    value={field.value}
                                    placeholder="tckn..."
                                    autoFocus
                                    id={field.name} {...field}
                                    style={{ width: "100%" }}
                                    // className="inputfield w-full"
                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                // onChange={(e) => setFilterTckn(e.target.value)}
                                />



                            )} />
                            {/* <label htmlFor="tckn" className={classNames({ 'p-error': errors.tckn })}>Tckn*</label> */}


                        </div>
                        {getFormErrorMessage('tckn')}

                    </div>

                    <div className="field grid">
                        <label htmlFor="adi" className="col-fixed" style={{ width: "150px" }}>Öğrenci Adı</label>
                        <div className="col-5">
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
                        {getFormErrorMessage('studentName')}
                    </div>

                    <div className="field grid">
                        <label htmlFor="telefon" className="col-fixed" style={{ width: "150px" }}>Telefon</label>
                        <div className="col-5">
                            <Controller name="telefon" control={control} rules={{ required: 'Telefon is required.' }} render={({ field, fieldState }) => (
                                <InputMask
                                    id={field.name} {...field}
                                    mask="0(599)9999999"
                                    value={field.value}
                                    style={{ width: "100%" }}
                                    placeholder="0(999)9999999"
                                    className="inputfield w-full"
                                // onChange={(e) => setFilterPhone(e.target.value)}
                                ></InputMask>
                            )} />
                        </div>
                        {getFormErrorMessage('phone')}
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
