import * as React from 'react';
import { TemplateRenderProps, GetHeadConfig, HeadConfig } from '@yext/pages';
import {
	SearchHeadlessProvider,
	provideHeadless,
	HeadlessConfig,
} from '@yext/search-headless-react';

const headlessConfig: HeadlessConfig = {
	apiKey:
		import.meta.env.YEXT_PUBLIC_SEARCH_API_KEY ||
		'593aac674b4c4039d0cc787ea675a872',
	experienceKey: 'regional_finance_answers',
	locale: 'en',
};

const searcher = provideHeadless(headlessConfig);
interface SearchExperienceProps {
	children?: React.ReactNode;
	verticalKey?: string;
}
const SearchExperience = ({ children }: SearchExperienceProps) => {
	return (
		<SearchHeadlessProvider searcher={searcher}>
			{children}
		</SearchHeadlessProvider>
	);
};

export default SearchExperience;
