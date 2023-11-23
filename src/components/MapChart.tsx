import React from 'react';
import { geoCentroid } from 'd3-geo';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const MapChart = ({ states }) => {
	const handleGeographyClick = (states) => {
		window.location.href = `/il`;
	};
	return (
		<ComposableMap projection='geoAlbersUsa'>
			<Geographies geography={geoUrl}>
				{({ geographies }) => (
					<>
						{geographies.map((geo) => (
							<Geography
								key={geo.rsmKey}
								stroke='#fff'
								geography={geo}
								fill={
									states?.includes(geo.properties.name) ? '#2A71D4' : '#E3E9F3'
								}
								style={{
									default: { outline: 'none' },
									hover: {
										fill: states?.includes(geo.properties.name)
											? '#102B51'
											: '#E3E9F3',
										outline: 'none',
										cursor: 'pointer',
									},
									pressed: { outline: 'none' },
								}}
								onClick={() => handleGeographyClick(states)}
							/>
						))}
					</>
				)}
			</Geographies>
		</ComposableMap>
	);
};

export default MapChart;
