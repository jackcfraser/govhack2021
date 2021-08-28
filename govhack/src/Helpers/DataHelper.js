class DataHelper {
	// GeoJSON SA2 bounds. Some anaconda script generates it from ESRI shapefiles.
	static getSA2Bounds() {
		return new Promise((resolve, reject) => {
			try {
				var SA2Bounds = require('../Helpers/SA2_BOUNDS.json');
				resolve(SA2Bounds);
			} catch (error) {
				console.log(error);
				reject("Error");
			}
		});
	}

	// For generating new IDs. Provide length of ID and an id will generate. Currently used for generating a new key to rerender the map.
	static getNewId(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() *
				charactersLength));
		}
		return result;
	}


	static getErpBySa2(SA2) {

		// TODO

		/*
			Make an array of promise objects, use Promise.all() to resolve them.

			var total_batched = 0

			while(not done){
				for(each object AND counter < batch size){
					if(object not completed){
						add item to url
						increase counter
						item is batched, add to total_batched counter
					}
				}

				if(total_batched doesnt equal the size of all items to be batched, continue adding promises)
					add new promise to promise array
				else
					process is done, break while loop
			}

			Resolve the promises
			
			// Potentially handle this in the map size so we can constantly set the state. This way, it can async load instead of locking up until all the data is ready.
			Promise.all()
			As promises resolve, add them to a results array and return it.

		*/

		// console.log(SA2);

		// var firstItem = true;
		// var mainList = [];
		// // https://api.data.abs.gov.au/data/ABS_ANNUAL_ERP_ASGS/ERP.AUS+STE+SA4+SA3+SA2+GCCSA.301011001+301011002+301011003+301011004+301011005+301011006.A/all?startPeriod=2016

		// var isProcessed = false;
		// var isSubProcessed = false;

		// for (var obj in SA2.features) {
		// 	mainList.push({SA2_MAIN16: SA2.features[obj].properties['SA2_MAIN16'], data: {}, isComplete: false})
		// }

		// while (!isProcessed){
		// 	for(var obj in mainList){
		// 		if(!obj.isComplete){
					
		// 		}
		// 	}
			
		// }
		
	}
}

export default DataHelper
