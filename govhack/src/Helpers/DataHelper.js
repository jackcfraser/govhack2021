import Papa from 'papaparse';

class DataHelper {
	static getSA2Data() {
		return new Promise((resolve, reject) => {
			try {
				var dataPath = require(process.env.REACT_APP_PATH);
				Papa.parse(dataPath, {
					header: true,
					download: true,
					skipEmptyLines: true,
					complete: results => {
						var heatmapData = [];
						for (var obj in results.data) {
							heatmapData.push({ x: results.data[obj]['lat'], y: results.data[obj]['lon'], z: results.data[obj]['nelm'] });
						}
						resolve(heatmapData);
					},
					error: (error) => {
						reject(error);
					}
				})
			} catch (error) {
                console.log("Failing here");
				reject(error);
			}
		});
	}
}

export default DataHelper
