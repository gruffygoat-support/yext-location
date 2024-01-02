import * as React from 'react';

import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
	return (
		<>
			<div
				style={{
					position: 'fixed',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					zIndex: '999', // Ensure the loader is on top of other elements
				}}>
				<TailSpin
					height='100'
					width='100'
					color='#102B51'
					ariaLabel='tail-spin-loading'
					radius='1'
					wrapperStyle={{}}
					wrapperClass=''
					visible={true}
				/>
			</div>
		</>
	);
};

export default Loader;
