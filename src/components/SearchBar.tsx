// src/components/JobSearch.tsx

import * as React from 'react';
import { SearchBar, onSearchFunc } from '@yext/search-ui-react';
import '../index.css';
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
		<div className='lg:w-[290px] xl:w-[440px] small:w-[75vw] w-[330px] max-w-[90rem] target-class'>
			<SearchBar
				placeholder='Ask a question...'
				onSearch={handleSearch}
				customCssClasses={{
					searchBarContainer: 'rounded-lg mb-4 lg:my-3', // Add lg:rounded-full for larger border radius
					searchButtonContainer: 'hidden',
					inputElement: 'border-none',
				}}
			/>
		</div>
	);
};

export default Search;
