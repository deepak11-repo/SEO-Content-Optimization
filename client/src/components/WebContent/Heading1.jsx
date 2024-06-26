import React, { useState } from "react";
import { Chip } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import TooltipComponent from "../Tooltip/TooltipComponent";

function Heading1({ data }) {
    const [ isHovered, setIsHovered ] = useState(false);
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(data.outputJson.optimized);
        toast.success('Copy to clipboard', {
            duration: 800,
        });
    }
    console.log(data);
    const originalH1Msg = "The H1 tag in SEO is<br/> crucial as it indicates<br/> the main topic of a<br/> webpage, helping search<br/> engines and users<br/> understand its content.";
  const recommendedH1Msg = "Recommended H1 is optimized<br/> with primary keywords to<br/> clearly define the page's<br/> content, improving its<br/> relevance and ranking.";
    if (data.message === "yes") {
        return (
            <div className="h1-content">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                    <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                        <tr>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Original Heading <TooltipComponent msg={originalH1Msg}/></th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Recommended Heading (H1) <TooltipComponent msg={recommendedH1Msg}/></th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason for Optimization</th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b  hover:bg-gray-50 text-neutralDGrey">
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">{data.outputJson.h1}</td>
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
                    <div className="flex-1 text-justify tracking-wide leading-5">{data.h1[0]}</div>
                    <Chip label="Already Optimized" color="success"/>
                </div>
                <div className="flex justify-end">
                      <TooltipComponent msg="Current Header 1 is already optimized with the specified keywords, therefore additional optimization is not required." />
                </div>
            </>
        );
    }
}

export default Heading1;
