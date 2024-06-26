import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { MdContentCopy, MdExpandMore } from "react-icons/md";
import toast from "react-hot-toast";
import a3 from '../../assets/a3.png';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useSelector } from "react-redux";
import ContentLoader from "../Loader/ContentLoader";
import LoaderImg from '../../assets/Loader1.gif'

function UrlContent({ data }) {
    const { urlLoading } = useSelector((state) => state.loader);
    if(urlLoading) {
        return (
            <>
                <div className="w-full flex flex-col justify-center items-center mt-10">
                    {/* <ContentLoader/> */}
                    <img src={LoaderImg} alt="Data Loading..." className="mt-8"/>
                </div>
            </>
        );
    }
    if (data && data.message === "No URLs need optimization.") {
        return (
            <div className="w-full flex flex-col justify-center items-center mt-10">
                <img src={a3} alt="done" className="w-[9%] mb-5" />
                <Accordion className="mt-5">
                    <AccordionSummary expandIcon={<MdExpandMore />} aria-controls="panel1-content" id="panel1-header">
                        <p className="text-md tracking-wide leading-4 font-sans font-medium text-brandPrimary">No further URL optimization needed</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>Optimized for SEO</strong>: The URL structure is already optimized for search engines, ensuring relevance and keyword focus.</p>
                        <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>Clear and concise</strong>: The URL effectively communicates the content it links to, enhancing user experience.</p>
                        <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>Effective length</strong>: The URL length is appropriate, balancing readability and SEO best practices.</p>
                        <p className="font-medium tracking-wide leading-4 font-sans pt-5">No further adjustments are necessary.</p>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }

    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [isHovered, setIsHovered] = useState(null);

    // Calculate the indices for slicing the data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

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
        toast.success('Copied to clipboard', {
            duration: 800,
        });
    };

    

    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                    <tr>
                        <th scope="col" className="px-6 py-3" style={{ width: '25%' }}>Original URL </th>
                        <th scope="col" className="px-6 py-3" style={{ width: '25%' }}>Recommended URL</th>
                        <th scope="col" className="px-6 py-3" style={{ minWidth: '200px' }}>Reason</th>
                        <th scope="col" className="px-6 py-3" style={{ minWidth: '200px' }}>Impact</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium break-words" style={{ maxWidth: '300px' }}>{item.url}</td>
                            <td
                                className={`${isHovered === index ? 'bg-gray-100 rounded-xl ' : ''} relative flex transition-colors duration-300 px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium break-words`}
                                style={{ maxWidth: '300px' }}
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
    );
}

export default UrlContent;
