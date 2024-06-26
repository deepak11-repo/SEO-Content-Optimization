import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-between items-center px-6 py-3 text-white bg-gray-900">
            <button
                className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-600 cursor-pointer"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="text-sm text-white font-medium">
                Page {currentPage} of {totalPages}
            </span>
            <button
                className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-600 cursor-pointer"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
