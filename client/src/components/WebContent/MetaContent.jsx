import React, { useState } from "react";
import { Chip } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import TooltipComponent from "../Tooltip/TooltipComponent";

function MetaContent({ data }) {
    const [ isHovered, setIsHovered ] = useState(false);
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(data.outputJson.optimized);
        toast.success('Copy to clipboard', {
            duration: 800,
        });
    }
    const originalMetaMsg = "The meta description in SEO<br/> provides a brief summary<br/> of a webpage's content,<br/> helping users and search<br/> engines understand its<br/> relevance.";
    const recommendedMetaMsg = "Recommended meta description<br/> is optimized with target<br/> keywords to attract the<br/> right audience and<br/> improve click-through<br/> rates.";
    if (data.message === "yes") {
        return (
            <div className="meta-content">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                    <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                        <tr>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Original Metadata <TooltipComponent msg={originalMetaMsg}/></th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Recommended Metadata <TooltipComponent msg={recommendedMetaMsg}/></th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason for Optimization</th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b  hover:bg-gray-50 text-neutralDGrey">
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">{data.outputJson.meta}</td>
                            <td className={`${isHovered ? 'bg-gray-100 rounded-xl ' : ''} relative flex transition-colors duration-300 px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>{data.outputJson.optimized} {isHovered && <MdContentCopy className="ml-2 text-black absolute right-2 top-2 cursor-pointer" onClick={handleCopyToClipboard}/>}</td>
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">{data.outputJson.reason}</td>
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">{data.outputJson.impact}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <>
                <div className="flex items-center bg-white p-3 rounded-lg gap-3">
                    <div className="flex-1 text-justify tracking-wide leading-5">{data.meta}</div>
                    <Chip label="Already Optimized" color="success"/>
                </div>
                <div className="flex justify-end">
                      <TooltipComponent msg="Current meta description is already optimized with the specified keywords, so further optimization is unnecessary." />
                </div>
            </>
        );
    }
}

export default MetaContent;
