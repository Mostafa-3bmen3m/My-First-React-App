import React, { useState, useEffect, useRef } from 'react';
import { SlOptionsVertical } from "react-icons/sl";

const MovieOptionsBtn = ({ selectedOption, onOptionChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const userChoice = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const option = e.target.value;
        if (option === "Remove") {
            onOptionChange(null);
        } else {
            onOptionChange(option);
        }
        setIsOpen(false);
    }

    return (
        <div className='absolute bottom-[10px] left-[20px] text-[18px]' ref={dropdownRef}>
            <button className='relative cursor-pointer flex' onClick={toggleDropdown}>
                <SlOptionsVertical />
            </button>

            {isOpen && (
                <div className="select-options">
                    <div className="watching-options flex flex-col">
                        <button className={`watching-option ${selectedOption === "Watching" ? "bg-blue-100 dark:bg-blue-800" : ""}`} value={"Watching"} onClick={userChoice}>
                            Watching
                        </button>
                        <button className={`watching-option ${selectedOption === "On-Hold" ? "bg-blue-100 dark:bg-blue-800" : ""}`} value={"On-Hold"} onClick={userChoice}>
                            On-Hold
                        </button>
                        <button className={`watching-option ${selectedOption === "Plan To Watch" ? "bg-blue-100 dark:bg-blue-800" : ""}`} value={"Plan To Watch"} onClick={userChoice}>
                            Plan To Watch
                        </button>
                        <button className={`watching-option ${selectedOption === "Completed" ? "bg-blue-100 dark:bg-blue-800" : ""}`} value={"Completed"} onClick={userChoice}>
                            Completed
                        </button>
                        <button className="watching-option text-red-700 dark:text-red-500" value={"Remove"} onClick={userChoice}>
                            Remove
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieOptionsBtn