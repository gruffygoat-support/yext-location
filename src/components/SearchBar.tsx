// src/components/JobSearch.tsx

import * as React from 'react';
import { SearchBar, onSearchFunc } from '@yext/search-ui-react';
import { IoCafe } from 'react-icons/io5';

const Search = (): JSX.Element => {
	const handleSearch: onSearchFunc = (searchEventData) => {
		const { query } = searchEventData;

		const queryParams = new URLSearchParams(window.location.search);

		if (query) {
			window.location.href = `https://answers.regionalfinance.com/?query=${query}`;
		} else {
			queryParams.delete('query');
		}
	};

	return (
		<div className='  lg:w-[290px] xl:w-[440px] w-[230px]  max-w-[90rem]'>
			<SearchBar
				placeholder='Ask a question...'
				onSearch={handleSearch}
				customCssClasses={{
					searchBarContainer: 'rounded-lg mb-4 lg:my-3',
					searchButtonContainer: 'hidden',
				}}
			/>
		</div>
	);
};

export default Search;
