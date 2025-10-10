// frontend/src/components/Searchbar.jsx
import React, { forwardRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";


const Searchbar = forwardRef(
    (
        {
            searchQuery,
            setSearchQuery,
            onSubmit,
            onKeyDown,
            clearQuery,
            placeholder = "Search",
            showButton = true,
            className = "",
        },
        inputRef
    ) => {
        return (
            <form
                onSubmit={onSubmit}
                role="search"
                aria-label="Site search"
                className={`flex items-center ${className}`}
            // className="hidden lg:hidden xl:flex sm:flex items-center flex-1 max-w-5xl mx-4 transition-all"
            >
                <div className="relative flex-1 transition-shadow">
                    {/* Left icon inside Input */}
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* Input Field*/}
                    <Input
                        ref={inputRef}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={onKeyDown}
                        type="search"
                        name="search"
                        placeholder={placeholder}
                        className={
                            "w-full rounded-bl-full rounded-tl-full text-gray-900 font-medium placeholder-gray-300 py-3 pl-10 pr-11 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors"
                        }
                        aria-label="Search"
                    />

                    {/* Clear (X) button — only shows when query exists */}
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={clearQuery}
                            aria-label="Clear search"
                            className="absolute inset-y-0 right-4 flex items-center text-gray-300 hover:text-gray-100 focus:outline-none"
                        >
                            <FaTimes className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* circular search button on right */}
                {showButton && (
                    <Button
                        type="submit"
                        aria-label="Search"
                        className="inline-flex items-center justify-center rounded-br-full rounded-tr-full border border-gray-300 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        <FaSearch className="w-5 h-5 text-gray-500" />
                    </Button>)}
            </form>
        );
    });

Searchbar.displayName = "Searchbar";

export default Searchbar;