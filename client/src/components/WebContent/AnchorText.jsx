import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { MdContentCopy, MdExpandMore } from "react-icons/md";
import toast from "react-hot-toast";
import a3 from '../../assets/a3.png';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import TooltipComponent from "../Tooltip/TooltipComponent";

const AnchorText = ({ data }) => {
    console.log('Inside AnchorText');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [isHovered, setIsHovered] = useState(null);
    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copy to clipboard', {
            duration: 800,
        });           
    };

    // Calculate the indices for slicing the data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.optimizedText.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(data.optimizedText.length / itemsPerPage);

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

    const recommendedAnchorMsg = "Recommended anchor text with relevant<br/> keywords that describe the linked<br/> content. This enhances SEO by providing<br/> context to search engines and improves<br/> user navigation.";
    return (
        <>
            {data.optimizedText?.length > 0 ? (
                <div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                        <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                            <tr>
                                <th scope="col" className="px-6 py-3" style={{ width: '250px', wordBreak: 'break-all' }}>URL</th>
                                <th scope="col" className="px-6 py-3" style={{ width: '150px' }}>Original Anchor</th>
                                <th scope="col" className="px-6 py-3" style={{ width: '210px' }}>Recommended Anchor <TooltipComponent msg={recommendedAnchorMsg}/></th>
                                <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason for Optimization</th>
                                <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Impact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                                    <td className="px-6 py-4 cursor-pointer hover:text-blue-600 relative font-medium align-top text-justify leading-6 tracking-wide" style={{ wordBreak: 'break-all' }}>
                                        <a href={item.href} target="_blank" rel="noopener noreferrer">{item.href}</a>
                                    </td>
                                    <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">
                                        {item.old}
                                    </td>
                                    <td
                                        className="px-6 py-4 cursor-pointer hover:text-blue-600 relative font-medium align-top text-justify leading-6 tracking-wide"
                                        onMouseEnter={() => setIsHovered(index)}
                                        onMouseLeave={() => setIsHovered(null)}
                                        style={{ wordBreak: 'break-all' }}
                                    >
                                        {item.newText}
                                        {isHovered === index && (
                                            <MdContentCopy className="ml-2 text-black absolute right-2 top-2 cursor-pointer" onClick={() => handleCopyToClipboard(item.newText)}/>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">
                                        {item.reason}
                                    </td>
                                    <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">
                                        {item.impact}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination Controls */}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            ) : (
                <div className="w-full flex flex-col justify-center items-center mt-10">
                    <img src={a3}  alt="done" className="w-[9%] mb-5"/>
                    <Accordion className="mt-5">
                        <AccordionSummary expandIcon={<MdExpandMore/>} aria-controls="panel1-content" id="panel1-header">
                           <p className="text-md tracking-wide leading-4 font-sans font-medium text-brandPrimary">The anchor text is already fully optimized for SEO</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>It uses relevant keywords</strong>: The words used are important and related to the content, helping search engines understand what the linked page is about.</p>
                            <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>It's clear and descriptive</strong>: The text clearly indicates what you can expect if you click on the link, improving user experience.</p>
                            <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>It's the right length</strong>: The text is neither too short nor too long, making it effective for both users and search engines.</p>                        
                            <p className="font-medium tracking-wide leading-4 font-sans pt-5">So, you don't need to make any more changes.</p>
                        </AccordionDetails>
                    </Accordion>
                </div>
            )}
        </>
    );
};

export default AnchorText;
