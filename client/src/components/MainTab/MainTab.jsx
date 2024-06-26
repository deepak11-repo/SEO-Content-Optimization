import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    setAnchorResponse,
    setH1Response,
    setH2Response,
    setH3Response,
    setH4Response,
    setH5Response,
    setH6Response,
    setImageResponse,
    setMetaResponse,
    setParagraphResponse,
    setTitleResponse,
    setUrlResponse
} from "../../utility/inputsSlice";
import {
    getAnchor,
    getH1,
    getH2,
    getH3,
    getH4,
    getH5,
    getH6,
    getImage,
    getMeta,
    getPara,
    getTitle,
    getUrl
} from "../../api/optimization";
import TitleContent from "../WebContent/TitleContent";
import MetaContent from "../WebContent/MetaContent";
import Heading1 from "../WebContent/Heading1";
import Heading2 from "../WebContent/Heading2";
import Heading3 from "../WebContent/Heading3";
import Heading4 from "../WebContent/Heading4";
import Heading5 from "../WebContent/Heading5";
import Heading6 from "../WebContent/Heading6";
import Paragraph from "../WebContent/Paragraph";
import { PiCodesandboxLogoBold } from "react-icons/pi";
import { MdSpaceDashboard, MdTitle } from "react-icons/md";
import { BsCardHeading, BsImageAlt, BsLink } from "react-icons/bs";
import { LiaHeadingSolid } from 'react-icons/lia';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuHeading6 } from 'react-icons/lu';
import { FaImage, FaParagraph } from 'react-icons/fa';
import { GrDocumentMissing } from 'react-icons/gr';
import { CiText } from 'react-icons/ci';
import { TbWorldWww } from 'react-icons/tb';
import ImageAlt from '../WebContent/ImageAlt';
import ImageAltTitle from '../WebContent/ImageAltTitle';
import ImageTitle from '../WebContent/ImageTitle';
import { AiOutlineFileImage } from 'react-icons/ai';
import AnchorTextMissing from '../WebContent/AnchorTextMissing';
import AnchorText from '../WebContent/AnchorText';
import LinearWithValueLabel from '../Loader/Loader';
import UrlContent from '../WebContent/UrlContent';
import { setAnchorLoading, setH1Loading, setH2Loading, setH3Loading, setH4Loading, setH5Loading, setH6Loading, setImageLoading, setMetaLoading, setParagraphLoading, setTitleLoading, setUrlLoading } from '../../utility/loaderSlice';
import { CircularProgress } from '@mui/material';

const MainTab = () => {
    // const [activeItem, setActiveItem] = useState(null);
    const [activeItem, setActiveItem] = useState('URL');

    const [loading, setLoading] = useState(true); // State to manage loading state
    const [progress, setProgress] = useState(0); // Initialize progress state
    
    const [isAnchorDropdownOpen, setIsAnchorDropdownOpen] = useState(false);
    const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
    const [isImageDropdownOpen, setIsImageDropdownOpen] = useState(false);
    
    const { url, primaryKeywords, secondaryKeywords, titleResponse, metaResponse, h1Response, h2Response, h3Response, h4Response, h5Response, h6Response, paragraphResponse, imageResponse, anchorResponse, urlResponse } = useSelector((state) => state.inputs);
    
    const { urlLoading, titleLoading, metaLoading, h1Loading, h2Loading, h3Loading, h4Loading, h5Loading, h6Loading, paragraphLoading, imageLoading, anchorLoading } = useSelector((state) => state.loader);
    
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
          if (url && primaryKeywords && secondaryKeywords) {
            try {
              setLoading(true);
    
              // Reset previous responses
              dispatch(setTitleResponse(null));
              dispatch(setMetaResponse(null));
              dispatch(setH1Response(null));
              dispatch(setH2Response(null));
              dispatch(setH3Response(null));
              dispatch(setH4Response(null));
              dispatch(setH5Response(null));
              dispatch(setH6Response(null));
              dispatch(setParagraphResponse(null));
              dispatch(setImageResponse(null));
              dispatch(setAnchorResponse(null));
              dispatch(setUrlResponse(null));
    
              // Define dispatch actions
              const dispatchActions = [
                { action: () => getUrl(url), responseSetter: setUrlResponse, loadingSetter: setUrlLoading },
                { action: () => getTitle(url, primaryKeywords), responseSetter: setTitleResponse, loadingSetter: setTitleLoading },  
                { action: () => getMeta(url, primaryKeywords), responseSetter: setMetaResponse, loadingSetter: setMetaLoading },                              
                { action: () => getH1(url, primaryKeywords), responseSetter: setH1Response, loadingSetter: setH1Loading },
                { action: () => getH2(url, secondaryKeywords), responseSetter: setH2Response, loadingSetter: setH2Loading },
                { action: () => getH3(url, secondaryKeywords), responseSetter: setH3Response, loadingSetter: setH3Loading },
                { action: () => getH4(url, secondaryKeywords), responseSetter: setH4Response, loadingSetter: setH4Loading },
                { action: () => getH5(url, secondaryKeywords), responseSetter: setH5Response, loadingSetter: setH5Loading },
                { action: () => getH6(url, secondaryKeywords), responseSetter: setH6Response, loadingSetter: setH6Loading },
                // { action: () => getPara(url, primaryKeywords, secondaryKeywords), responseSetter: setParagraphResponse, loadingSetter: setParagraphLoading },
                { action: () => getImage(url), responseSetter: setImageResponse, loadingSetter: setImageLoading },
                { action: () => getAnchor(url), responseSetter: setAnchorResponse, loadingSetter: setAnchorLoading },
              ];
    
              // Calculate increment for each dispatch action
              const increment = 100 / dispatchActions.length;
    
              // Execute dispatch actions one by one with a delay
              let currentProgress = 0;
              await dispatchActions.reduce(async (previousPromise, { action, responseSetter, loadingSetter }, index) => {
                await previousPromise; // Wait for the previous action to complete
    
                const response = await action();
                dispatch(responseSetter(response));
    
                // Set loading to false
                dispatch(loadingSetter(false));
    
                // Update progress
                currentProgress += increment;
                setProgress(Math.min(currentProgress, 100)); // Ensure progress does not exceed 100%
    
                // Introduce a delay between actions (500ms)
                if (index < dispatchActions.length - 1) {
                  await new Promise(resolve => setTimeout(resolve, 500));
                }
              }, Promise.resolve());
    
              setLoading(false);
            } catch (error) {
              setLoading(false);
              // Handle errors appropriately
            }
          }
        };
    
        fetchData();
    }, [url, primaryKeywords, secondaryKeywords, dispatch]);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const renderContent = () => {
        switch (activeItem) {
            case 'Title':
                return <TitleContent data={titleResponse} />;
            case 'Metadata':
                return <MetaContent data={metaResponse} />;
            case 'Heading1':
                return <Heading1 data={h1Response} />;
            case 'Heading2':
                return <Heading2 data={h2Response} />;
            case 'Heading3':
                return <Heading3 data={h3Response} />;
            case 'Heading4':
                return <Heading4 data={h4Response} />;
            case 'Heading5':
                return <Heading5 data={h5Response} />;
            case 'Heading6':
                return <Heading6 data={h6Response} />;
            case 'Paragraph':
                return <Paragraph data={paragraphResponse} />;
            case 'ImageAlt':
                return <ImageAlt data={imageResponse} />;
            case 'ImageAltTitle':
                return <ImageAltTitle data={imageResponse} />;
            case 'ImageTitle':
                return <ImageTitle data={imageResponse} />;
            case 'MissingAnchor':
                return <AnchorTextMissing data={anchorResponse} />
            case 'AnchorText':
                return <AnchorText data={anchorResponse} />
            case 'URL':
                return <UrlContent data={urlResponse} />
            default:
                return null;
        }
    };

    const getItemClassName = (itemName) => {
        return activeItem === itemName ? 'active bg-brandPrimary text-white' : '';
    };

    const toggleHeaderDropdown = () => {
        setIsHeaderDropdownOpen(!isHeaderDropdownOpen);
    };

    const toggleAnchorDropdown = () => {
        setIsAnchorDropdownOpen(!isAnchorDropdownOpen);
    };

    const toggleImageDropdown = () => {
        setIsImageDropdownOpen(!isImageDropdownOpen);
    };

    // if (loading) {
    //     return (
    //         <div className="w-3/4 flex justify-center h-full mx-auto pt-10 pb-10 gap-5">
    //             <LinearWithValueLabel progress={progress} />
    //         </div>
    //     );
    // }

    return (
        <div className="w-full flex justify-center h-full mx-auto pt-10 pb-10 gap-5">
            <div className="w-full flex shadow-mg rounded-xl">
                {/* Sidebar */}
                <div className="flex flex-col items-center w-[15%] overflow-hidden text-gray-400 bg-gray-900 rounded">
                    <div className="flex items-center w-full px-3 mt-3">
                        <PiCodesandboxLogoBold />
                        <span className="ml-2 text-sm font-bold tracking-wide">OptiSEO</span>
                    </div>
                    <div className="w-full px-2">
                        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                            {/* URL */}
                            <div
                                className={`flex items-center justify-between w-full h-12 px-3 mt-2 mb-2 rounded hover:bg-gray-700 hover:text-gray-300 cursor-pointer ${getItemClassName('URL')}`}
                                onClick={() => !urlLoading && handleItemClick('URL')}
                                style={{ pointerEvents: urlLoading ? 'none' : 'auto' }}
                            >
                                <div className="flex items-center">
                                    <TbWorldWww />
                                    <span className="ml-2 text-sm font-medium tracking-wide">URL</span>
                                </div>
                                {urlLoading && <CircularProgress color="inherit" size={20} thickness={6}/>}
                            </div>
                            {/* Title */}
                            <div
                                className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('Title')}`}
                                onClick={() => !titleLoading && handleItemClick('Title')}
                                style={{ pointerEvents: titleLoading ? 'none' : 'auto' }}
                            >
                                <div className="flex items-center">
                                    <MdSpaceDashboard />
                                    <span className="ml-2 text-sm font-medium tracking-wide">Title</span>
                                </div>
                                {titleLoading && <CircularProgress color="inherit" size={20} thickness={6}/>}
                            </div>
                            {/* Metadata */}
                            <div
                                className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('Metadata')}`}
                                onClick={() => !metaLoading && handleItemClick('Metadata')}
                                style={{ pointerEvents: metaLoading ? 'none' : 'auto' }}
                            >
                                <div className="flex items-center">
                                    <BsCardHeading />
                                    <span className="ml-2 text-sm font-medium tracking-wide">Meta Description</span>
                                </div>
                                {metaLoading && <CircularProgress color="inherit" size={20} thickness={6}/>}
                            </div>
                            {/* Heading */}
                            <div className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('Heading1')}`} onClick={() => !h1Loading && handleItemClick('Heading1')} style={{ pointerEvents: h1Loading ? 'none' : 'auto' }}>
                                <div className="flex items-center">
                                    <LiaHeadingSolid />
                                    <span className="ml-2 text-sm font-medium tracking-wide">Heading (H1)</span>
                                </div>
                                {h1Loading && <CircularProgress color="inherit" size={20} thickness={6}/>}
                            </div>

                            {/* Subheading Group */}
                            <div className={`relative flex items-center w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${isHeaderDropdownOpen ? 'bg-gray-700 text-gray-300' : ''}`} onClick={toggleHeaderDropdown}>
                                <BsCardHeading />
                                <span className="ml-2 text-sm font-medium tracking-wide">SubHeading</span>
                                {isHeaderDropdownOpen ? (
                                    <IoIosArrowDropup className='absolute right-3 text-lg text-white cursor-pointer' />
                                ) : (
                                    <IoIosArrowDropdown className='absolute right-3 text-lg text-white cursor-pointer' />
                                )}
                            </div>
                            <div className={`flex flex-col w-full ${isHeaderDropdownOpen ? '' : 'hidden'}`}>
                                {/* Heading (H2) */}
                                <div className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('Heading2')}`} onClick={() => !h2Loading && handleItemClick('Heading2')} style={{ pointerEvents: h2Loading ? 'none' : 'auto' }}>
                                    <div className="flex items-center">
                                        <LuHeading2 />
                                        <span className="ml-2 text-sm font-medium tracking-wide">Heading (H2)</span>
                                    </div>
                                    {h2Loading && <CircularProgress color="inherit" size={20} thickness={6} />}
                                </div>
                                {/* Heading (H3) */}
                                <div className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('Heading3')}`} onClick={() => !h3Loading && handleItemClick('Heading3')} style={{ pointerEvents: h3Loading ? 'none' : 'auto' }}>
                                    <div className="flex items-center">
                                        <LuHeading3 />
                                        <span className="ml-2 text-sm font-medium tracking-wide">Heading (H3)</span>
                                    </div>
                                    {h3Loading && <CircularProgress color="inherit" size={20} thickness={6} />}
                                </div>
                                {/* Heading (H4) */}
                                <div className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('Heading4')}`} onClick={() => !h4Loading && handleItemClick('Heading4')} style={{ pointerEvents: h4Loading ? 'none' : 'auto' }}>
                                    <div className="flex items-center">
                                        <LuHeading4 />
                                        <span className="ml-2 text-sm font-medium tracking-wide">Heading (H4)</span>
                                    </div>
                                    {h4Loading && <CircularProgress color="inherit" size={20} thickness={6} />}
                                </div>
                                {/* Heading (H5) */}
                                <div className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('Heading5')}`} onClick={() => !h5Loading && handleItemClick('Heading5')} style={{ pointerEvents: h5Loading ? 'none' : 'auto' }}>
                                    <div className="flex items-center">
                                        <LuHeading5 />
                                        <span className="ml-2 text-sm font-medium tracking-wide">Heading (H5)</span>
                                    </div>
                                    {h5Loading && <CircularProgress color="inherit" size={20} thickness={6} />}
                                </div>
                                {/* Heading (H6) */}
                                <div className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('Heading6')}`} onClick={() => !h6Loading && handleItemClick('Heading6')} style={{ pointerEvents: h6Loading ? 'none' : 'auto' }}>
                                    <div className="flex items-center">
                                        <LuHeading6 />
                                        <span className="ml-2 text-sm font-medium tracking-wide">Heading (H6)</span>
                                    </div>
                                    {h6Loading && <CircularProgress color="inherit" size={20} thickness={6} />}
                                </div>
                            </div>
                            {/* Paragraph */}
                            <div className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('Paragraph')}`} onClick={() => !paragraphLoading && handleItemClick('Paragraph')} style={{ pointerEvents: paragraphLoading ? 'none' : 'auto' }}>
                                <div className="flex items-center">
                                    <FaParagraph />
                                    <span className="ml-2 text-sm font-medium tracking-wide">Paragraph</span>
                                </div>
                                {paragraphLoading && <CircularProgress color="inherit" size={20} thickness={6} />} {/* Render CircularProgress if paragraphLoading is true */}
                            </div>
                            {/* Image Group*/}
                            <div className={`relative flex items-center w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${isImageDropdownOpen ? 'bg-gray-700 text-gray-300' : ''}`} onClick={toggleImageDropdown}>
                                <FaImage />
                                <span className="ml-2 text-sm font-medium tracking-wide">Image</span>
                                {isImageDropdownOpen ? (
                                    <IoIosArrowDropup className='absolute right-3 text-lg text-white cursor-pointer' />
                                ) : (
                                    <IoIosArrowDropdown className='absolute right-3 text-lg text-white cursor-pointer' />
                                )}
                            </div>
                            <div className={`transition-all duration-500 ease-in-out w-full ${isImageDropdownOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                {isImageDropdownOpen && (
                                <div className="flex flex-col">
                                    {/* Dropdown items for Image */}
                                    <div className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('ImageAlt')}`} onClick={() => !imageLoading && handleItemClick('ImageAlt')} style={{ pointerEvents: imageLoading ? 'none' : 'auto' }}>
                                        <div className="flex items-center">
                                            <BsImageAlt/>
                                            <span className="ml-2 text-sm font-medium tracking-wide">Missing Alt Text</span>
                                        </div>
                                        {imageLoading && <CircularProgress color="inherit" size={20} thickness={6} />} {/* Render CircularProgress if imageLoading is true */}
                                    </div>
                                    <div className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('ImageTitle')}`} onClick={() => !imageLoading && handleItemClick('ImageTitle')} style={{ pointerEvents: imageLoading ? 'none' : 'auto' }}>
                                        <div className="flex items-center">
                                            <MdTitle/>
                                            <span className="ml-2 text-sm font-medium tracking-wide">Missing Title</span>
                                        </div>
                                        {imageLoading && <CircularProgress color="inherit" size={20} thickness={6} />}
                                    </div>
                                    <div className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('ImageAltTitle')}`} onClick={() => !imageLoading && handleItemClick('ImageAltTitle')} style={{ pointerEvents: imageLoading ? 'none' : 'auto' }}>
                                        <div className="flex items-center">
                                            <AiOutlineFileImage/>
                                            <span className="ml-2 text-sm font-medium tracking-wide">Missing Alt & Title</span>
                                        </div>
                                        {imageLoading && <CircularProgress color="inherit" size={20} thickness={6} />}
                                    </div>
                                </div>
                                )}
                            </div>
                            {/* Anchor Group */}
                            <div className={`relative flex items-center w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${isAnchorDropdownOpen ? 'bg-gray-700 text-gray-300' : ''}`} onClick={toggleAnchorDropdown}>
                                <BsLink/>
                                <span className="ml-2 text-sm font-medium tracking-wide">Anchor</span>
                                {isAnchorDropdownOpen ? (
                                    <IoIosArrowDropup className='absolute right-3 text-lg text-white cursor-pointer' />
                                ) : (
                                    <IoIosArrowDropdown className='absolute right-3 text-lg text-white cursor-pointer' />
                                )}
                            </div>
                            <div className={`transition-all duration-500 ease-in-out w-full ${isAnchorDropdownOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                {isAnchorDropdownOpen && (
                                <div className="flex flex-col">
                                    {/* Dropdown items for Anchor - Missing Anchor Text */}
                                    <div className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('MissingAnchor')}`} onClick={() => !anchorLoading && handleItemClick('MissingAnchor')} style={{ pointerEvents: anchorLoading ? 'none' : 'auto' }}>
                                        <div className="flex items-center">
                                            <GrDocumentMissing/>
                                            <span className="ml-2 text-sm font-medium tracking-wide">Missing Anchor Text</span>
                                        </div>
                                        {anchorLoading && <CircularProgress color="inherit" size={20} thickness={6} />}
                                    </div>
                                    {/* Dropdown items for Anchor - Anchor Text */}
                                    <div className={`flex items-center justify-between w-full h-12 px-3 mt-2 rounded cursor-pointer hover:bg-gray-700 hover:text-gray-300 ${getItemClassName('AnchorText')}`} onClick={() => !anchorLoading && handleItemClick('AnchorText')} style={{ pointerEvents: anchorLoading ? 'none' : 'auto' }}>
                                        <div className="flex items-center">
                                            <CiText/>
                                            <span className="ml-2 text-sm font-medium tracking-wide">Anchor Text</span>
                                        </div>
                                        {anchorLoading && <CircularProgress color="inherit" size={20} thickness={6} />}
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Content Area */}
                <div className="w-[85%] h-full overflow-y-auto bg-softGrey p-3">{renderContent()}</div>                
            </div>
        </div>
    );
};

export default MainTab;
