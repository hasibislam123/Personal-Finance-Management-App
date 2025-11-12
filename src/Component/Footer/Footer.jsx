import React, { useContext } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import img2 from '../../assets/undraw_metrics_5v8d.svg'
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';


const Footer = () => {
    const { user } = useContext(AuthContext); 
    
    const subscribePath = user ? '/mytransactions' : '/login';

    return (
        <footer className="bg-[#f0f4f7] text-[#333] py-10 dark:bg-gray-900 dark:text-gray-200">
            
            <div className="bg-[#e0f2f7] py-8 mb-10 relative overflow-hidden flex dark:bg-gray-800">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center z-10 relative">
                    <div className="text-center md:text-left mb-6 md:mb-0 max-w-2xl">
                        <p className="text-sm uppercase text-[#666] font-semibold dark:text-gray-400">Category: Footer</p>
                        <h2 className="text-2xl font-bold text-[#333] mt-2 dark:text-white">Subscribe to Fin Ease</h2>
                        <p className="text-[#555] mt-2 dark:text-gray-300">
                            Keep up to date with your latest transactions, funding opportunities, and manage your financial reports easily.
                        </p>
                        
                        <Link 
                            to={subscribePath} 
                            className="mt-4 px-6 py-2 bg-[#1e88e5] text-white rounded-md hover:bg-[#1565c0] transition-colors inline-block"
                        >
                            Subscribe now
                        </Link>
                    </div>
                    <div className="absolute right-0 bottom-0 md:relative md:w-auto -mr-16 md:mr-0 opacity-50 md:opacity-100">
                        <div className="w-64 h-40 bg-contain bg-no-repeat" style={{ backgroundImage: 'url("https://www.semphn.org.au/themes/custom/semphn/img/newsletter-banner.svg")' }}></div>
                    </div>
                </div>

                <div>
                    <img className='h-60 w-120' src={img2} alt="" />
                </div>
            </div>

            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-gray-300 dark:border-gray-700">
                
                <div>
                    <h3 className="font-semibold text-lg mb-4 text-[#333] dark:text-white">Fin Ease</h3>
                    <p className="text-sm text-[#555] dark:text-gray-400">Level 2, 15 Corporate Drive</p>
                    <p className="text-sm text-[#555] dark:text-gray-400">Heatherton Victoria 3202</p>
                    <p className="text-sm text-[#555] dark:text-gray-400">ABN 65 603 858 751</p>
                    <div className="flex gap-3 mt-4">
                        <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#1e88e5] shadow-sm hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                            <FaFacebookF className="text-sm" />
                        </a>
                        <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#1e88e5] shadow-sm hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                            <FaLinkedinIn className="text-sm" />
                        </a>
                        <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#1e88e5] shadow-sm hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                            <FaXTwitter className="text-sm" />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-4 text-[#333] dark:text-white">Contact Us</h3>
                    <p className="text-sm text-[#555] dark:text-gray-400">T: 1300 331 981</p>
                    <p className="text-sm text-[#555] dark:text-gray-400">F: 03 8514 4499</p>
                    <p className="text-sm text-[#1e88e5] hover:underline dark:text-cyan-400"><a href="mailto:info@semphn.org.au">info@semphn.org.au</a></p>
                </div>

                <div className="flex flex-col md:items-end text-left md:text-right">
                    <h3 className="font-semibold text-lg mb-4 text-[#333] dark:text-white">Site usage</h3>
                    <Link to="/privacy" className="text-sm text-[#1e88e5] hover:underline mb-1 dark:text-cyan-400">Privacy Policy</Link>
                    <Link to="/accessibility" className="text-sm text-[#1e88e5] hover:underline mb-1 dark:text-cyan-400">Accessibility</Link>
                    <Link to="/sitemap" className="text-sm text-[#1e88e5] hover:underline dark:text-cyan-400">Sitemap</Link>
                    <button className="mt-6 px-4 py-2 border border-[#999] text-[#555] rounded-md hover:bg-gray-100 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                        Provide feedback
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-10 text-xs text-[#555] grid grid-cols-1 md:grid-cols-2 gap-8 dark:text-gray-400">
                <div>
                    <p>While the Australian Government Department of Health has contributed to the funding of this website, the information on this website does not necessarily reflect the views of the Australian Government and is not advice that is provided, or information that is endorsed, by the Australian Government. The Australian Government is not responsible in negligence or otherwise for any injury, loss or damage however arising from the use of or reliance on the information provided on this website.</p>
                </div>
                <div className="text-left md:text-right">
                    <div className="mb-4">
                        <p>SEMPHN acknowledges the Boonwurrung and Woiwurrung peoples of the Kulin Nation, the Traditional Owners and Custodians of the lands, water, and skies on which we work. We pay our respects to their Elders past and present. We also acknowledge all First Nations peoples with whom we work. Sovereignty was never ceded!</p>
                    </div>
                    <p className="mt-6">South Eastern Melbourne Primary Health Network | All Rights Reserved © {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;