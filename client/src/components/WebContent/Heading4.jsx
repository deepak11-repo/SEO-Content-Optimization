import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { Chip } from "@mui/material";
import toast from "react-hot-toast";
import TooltipComponent from "../Tooltip/TooltipComponent";
import nodata from '../../assets/nodata.png'

function Heading4({ data }) {
    console.log('Inside Heading4');
    if (data.message === "empty") {
        return (
            <>
                <div className="flex justify-end">
                      <TooltipComponent msg="Currently, the website does not contain any H4 headings or associated data." />
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <img src={nodata} alt="No Data Available" className="w-1/2"/>
                </div>
            </>
        );
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

    const originalSubheadingsMsg = "Subheadings (H2 - H6) in SEO<br/> help organize content into<br/> sections, making it easier<br/> for users and search<br/> engines to navigate<br/> and understand.";
    const recommendedSubheadingsMsg = "Recommended subheadings are<br/> optimized with relevant<br/> keywords to enhance<br/> readability and SEO<br/> performance by structuring<br/> content effectively.";

    return (
        (data && (
            <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                    <tr>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Heading (H4) <TooltipComponent msg={originalSubheadingsMsg}/></th>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Recommended Heading (H4) <TooltipComponent msg={recommendedSubheadingsMsg}/></th>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason</th>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Impact</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">{item.h4}</td>
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
                            </td>
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">{item.reason}</td>
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

export default Heading4;
