import React, { useCallback, useContext, useEffect, useState } from "react";
import { RadioButton } from "../../components/RadioButton/RadioButton";
import Select from 'react-select';
import './FilterBar.scss';

export const FilterBar = ({ ads, setAds, tempAds, setTempAds, type, setType }) => {

    const [options, setOptions] = useState([]);
    const [gender, setGender] = useState('all');
    const [text, setText] = useState('');
    const [price, setPrice] = useState({ minPrice: 0, maxPrice: 1000000 });
    const [age, setAge] = useState({ minAge: 0, maxAge: 1000000 })
    const [selectedOption, setSelectedOption] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);


    const getOptions = useCallback(() => {
        type.map((item) => {
            setOptions((prev) => [...prev, { value: item, label: item }]);
        })
        options.splice(0, type.length);
    }, [type]);

    useEffect(() => {
        getOptions();
    }, [getOptions]);


    const handleTextChange = event => {
        setText(event.target.value);
    }

    const handleGenderChange = event => {
        setGender(event.target.name);
    }

    const handlePriceChange = event => {
        setPrice({ ...price, [event.target.name]: event.target.value });
    }

    const handleAgeChange = event => {
        setAge({ ...age, [event.target.name]: event.target.value });
    }


    const filterAds = () => {
        setAds(tempAds);
        let temp = tempAds
        temp = temp.filter(item =>
            ((((item.type) + (item.breed)).toLowerCase()).includes(text.toLowerCase()))
        );
        if (gender != 'all') {
            temp = temp.filter(item => item.gender.toLowerCase() === gender.toLowerCase());
        }
        temp = temp.filter(item => (item.price >= price.minPrice && item.price <= price.maxPrice))
        if (selectedOption && selectedOption.length > 0) {
            temp = temp.filter(item => (selectedOption.filter(e => e.value === item.type.toLowerCase()).length > 0));
        }
        setAds(temp)
    }

    return (
    <div className="Filter-Bar" style={{ marginTop: '5vw' }}>
        <div className="Search-Line__flex">
                <button className="Search-Line-border-button" onClick={toggling}>Filter</button>
                <input 
                className="Search-Line"
                placeholder="Search"
                id="search"
                type="text"
                name="search"
                value={text}
                onChange={handleTextChange} />
                <button className="Search-Line-full-button" onClick={filterAds}>Search</button>
            </div>
        {isOpen && 
        <div className="filter-container">
            <div className="filter-div">
                <div  className="filter-div-radio">
                    <p className="filter-div-text">Pet gender</p>
                    <div className="flex-filter">
                        <RadioButton
                            label="Male"
                            name='male'
                            value={gender === 'male'}
                            onChange={handleGenderChange}
                        ></RadioButton>
                        <RadioButton
                            label="Female"
                            name='female'
                            value={gender === 'female'}
                            onChange={handleGenderChange}
                        ></RadioButton>
                        <RadioButton
                            label="All"
                            name='all'
                            value={gender === 'all'}
                            onChange={handleGenderChange}
                        ></RadioButton>
                    </div>  
                </div>
                    <div className="input-filter__container">
                        <p className="filter-div-text">Price</p>
                        <input
                            className="input-filter"
                            placeholder="Minimal Price"
                            id="minPrice"
                            type="number"
                            name="minPrice"
                            value={price.minPrice}
                            min={0}
                            max={1000000}
                            onChange={handlePriceChange} />
                        <input
                            className="input-filter"
                            placeholder="Maximal Price"
                            id="maxPrice"
                            type="number"
                            name="maxPrice"
                            min={0}
                            max={1000000}
                            value={price.maxPrice}
                            onChange={handlePriceChange} />
                    </div>
                    <div className="input-filter__container">
                        <p className="filter-div-text">Age</p>
                        <input
                            className="input-filter"
                            placeholder="Minimal Age"
                            id="minAge"
                            type="number"
                            name="minAge"
                            value={age.minAge}
                            min={0}
                            max={1000000}
                            onChange={handleAgeChange} />
                        <input 
                            className="input-filter"
                            placeholder="Maximal Age"
                            id="maxAge"
                            type="number"
                            name="maxAge"
                            min={0}
                            max={1000000}
                            value={age.maxAge}
                            onChange={handleAgeChange} />
                    </div>
                    <div className="FilterBar-Select">
                        <p className="filter-div-text">Type</p>
                        <Select
                        className="select-menu"
                            isMulti
                            options={options}
                            defaultValue={selectedOption} onChange={setSelectedOption}
                            theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                                ...theme.colors,
                                primary25: '#ffe032',
                                primary: 'black',
                            },
                            })}
                        />
                    </div>
                </div>
                <div className="Search-Line__flex">
                    <button className="Search-Line-border-button button-center" onClick={() => {setAds(tempAds); setGender('all'); }}>Restart</button>
                </div>
            </div>}
        </div>
    )



}