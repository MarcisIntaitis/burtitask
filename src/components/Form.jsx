import useFetchData from "../hooks/useFetchData";
import React, { useState } from "react";
import '../styles/form.css'

const Form = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedVarieties, setSelectedVarieties] = useState({});
    const [output, setOutput] = useState('');
    const { items, varieties, loading, error } = useFetchData("http://localhost:5000/api");

    if (error) console.log(error);

    const handleItemChange = (e) => {
        const selectedCode = e.target.value;
        const foundItem = items.find((item) => item.code === selectedCode);
        setSelectedItem(foundItem);
        setSelectedVarieties({}); // resets varieties when changing item
    };

    // saving the information with 'codes' which isn't needed but is nice to have
    const handleVarietyChange = (e, varietyCode) => {
        setSelectedVarieties((prevSelections) => ({
            ...prevSelections,
            [varietyCode]: e.target.value,
        }));
    };


    // depending on the order that the variety was pressed the code can change which might be an issue
    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (selectedItem && Object.keys(selectedVarieties).length > 0) {
            setOutput(`${selectedItem.code}.${Object.values(selectedVarieties).join('.')}`);
        } else {
            setOutput(selectedItem.code);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {loading && <p>Loading...</p>}

                {/* item selection */}
                {items?.length > 0 && (
                    <select onChange={handleItemChange}>
                        <option value="">Select an item</option>
                        {items.map((item) => (
                            <option key={item.code} value={item.code}>
                                {item.description}
                            </option>
                        ))}
                    </select>
                )}

                {/* variety selection based on selected item */}
                {selectedItem?.varieties?.length > 0 &&
                    selectedItem.varieties.map((varietyCode) => {
                        const variety = varieties.find((v) => v.code === varietyCode);
                        if (!variety) return null;

                        return (
                            <div key={variety.code}>
                                <select onChange={(e) => handleVarietyChange(e, variety.code)}>
                                    <option value="">{variety.description}</option>
                                    {variety.options.map((option) => (
                                        <option key={option.code} value={option.code}>
                                            {option.description}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    })
                }

                <input type="submit" value="Submit" />
            </form>

            <p>{output}</p>
        </>
    );
};

export default Form;
