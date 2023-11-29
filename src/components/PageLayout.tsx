import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Banner } from './Location/Banner';
import SearchExperience from './SearchExperience';
import Search from './SearchBar';
import Loader from './Loader';
import Cta from './Cta';
import Apis from '../utils/Apis';

export interface PageLayoutProps {
	children?: React.ReactNode;
	_site?: any;
	content?: string;
	header?: any;
	footer?: any;
	mobileFooter?: any;
}

const PageLayout = ({
	children,
	_site,
	content,
	header,
	footer,
	mobileFooter,
}: PageLayoutProps) => {
	const [loading, Isloading] = React.useState(true);
	const [headerNav, setHeaderNav] = React.useState([]);
	const [footerNav, setFooterNav] = React.useState([]);
	const [mobileFooterNav, setMobileFooterNav] = React.useState([]);

	const fetchData = async () => {
		try {
			const [footer, header, mobileFooter] = await Promise.all([
				Apis.getDesktopFooter(),
				Apis.getHeaderMenuNav(),
				Apis.getMobileFooter(),
			]);
			setHeaderNav([
				{ name: 'Loans', href: '/', dropDown: header?.slice(1, 10) },
				{ name: 'Locations', href: '#', dropDown: [] },
				{ name: 'Education', href: '#', dropDown: header?.slice(12, 15) },
				{ name: 'About us', href: '#', dropDown: header?.slice(21, 28) },
				{ name: 'Payment Options', href: '#', dropDown: [] },
			]);
			setFooterNav(footer);
			setMobileFooterNav(mobileFooter);

			Isloading(false);
		} catch (error) {
			console.log(error);
		}
		// } finally {
		// 	setTimeout(() => {
		// 		Isloading(false);
		// 	}, 1000);
		// }
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className='min-h-screen'>
					<div className='sticky top-0 z-50'>
						<SearchExperience>
							<div className='lg:hidden md:hidden bg-bg h-max flex gap-[0.5rem] items-center  justify-between px-2  pt-4  '>
								<div>
									<Search />
								</div>
								<div className='mb-4 text-white'>
									<Cta
										buttonText='Login'
										url='#'
										style=' bg-orange shadow-md  lg:w-max bg-primary px-3 text-s py-2 text-center'
									/>
								</div>
							</div>
							{content && (
								<Banner
									variant='default'
									content={content}
								/>
							)}
							<div className='hidden lg:block'>
								<div className='grid grid-cols-12 bg-bg '>
									<div className='col-span-8' />
									<div>
										<Search />
									</div>
								</div>
							</div>
							<Header
								_site={_site}
								navigation={headerNav}
							/>
						</SearchExperience>
					</div>

					{children}
					<Footer
						_site={_site}
						footerItems={footerNav}
						mobileFooterItems={mobileFooterNav}
					/>
				</div>
			)}
		</>
	);
};

export default PageLayout;
