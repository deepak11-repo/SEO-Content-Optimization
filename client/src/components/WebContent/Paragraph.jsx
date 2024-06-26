import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { Chip } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import TooltipComponent from "../Tooltip/TooltipComponent";

function Paragraph({ data }) {
    console.log('Inside Paragraph');
    if (data.message === "empty") {
        return <p>No data available</p>;
    }

    if (data.message === "optimized") {
        return (
            <div className="flex items-center bg-white p-3 rounded-lg gap-3">
                <div className="flex-1 text-justify tracking-wide leading-5">Data already optimized</div>
                <Chip label="Already Optimized" color="success"/>
            </div>
        );
    }
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate the indices for slicing the data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
    const [isHovered, setIsHovered] = useState(null);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copy to clipboard', {
            duration: 800,
        });
    };

    const originalParagraphMsg = "Paragraphs in SEO should be<br/> clear, concise, and provide<br/> valuable information to<br/> readers, making it easy<br/> for them to understand<br/> and engage with.";
  const recommendedParagraphMsg = "Recommended paragraphs are<br/> optimized with relevant keywords<br/> and structured to enhance<br/> readability, user engagement,<br/> and search engine rankings.";

    return (
        (data && (
            <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                    <tr>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Paragraph (p) <TooltipComponent msg={originalParagraphMsg}/></th>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Recommended Paragraph (p) <TooltipComponent msg={recommendedParagraphMsg}/></th>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason</th>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Impact</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">{item.p}</td>
                            <td 
                                className={`${isHovered === index ? 'bg-gray-100 rounded-xl ' : ''} relative flex transition-colors duration-300 px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium`}
                                onMouseEnter={() => setIsHovered(index)}
                                onMouseLeave={() => setIsHovered(null)}
                            >
                                {item.optimized} 
                                {isHovered === index && 
                                    <MdContentCopy 
                                        className="ml-2 text-black absolute right-2 top-2 cursor-pointer" 
                                        onClick={() => handleCopyToClipboard(item.optimized)}
                                    />
                                }
                            </td>                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">{item.reason}</td>
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">{item.impact}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
        ))
    );
}

export default Paragraph;
