import Papa from 'papaparse';

class DataHelper {
	static getSA2Data() {
		return new Promise((resolve, reject) => {
			try {
				var dataPath = require('./SA2_GEO_DATA.csv');
				Papa.parse(dataPath, {
					header: true,
					download: true,
					skipEmptyLines: true,
					complete: results => {
						console.log(results.data);
						var SA2 = [];
						for (var obj in results.data) {
							SA2.push({ 
										SA2_MAINCODE_2016: results.data[obj]['SA2_MAINCODE_2016'],
										GCCSA_NAME_2016: results.data[obj]['GCCSA_NAME_2016'],
										SA2_NAME_2016: results.data[obj]['SA2_NAME_2016'],
										STATE_NAME_2016: results.data[obj]['STATE_NAME_2016'],
										LAT: results.data[obj]['LAT'],
										LNG: results.data[obj]['LNG'] });
						}
						resolve(SA2);
					},
					error: (error) => {
						reject(error);
					}
				})
			} catch (error) {
                console.log(error);
				reject(error);
			}
		});
	}
}

export default DataHelper
