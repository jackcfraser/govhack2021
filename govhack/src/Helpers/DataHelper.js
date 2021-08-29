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
		var mainList = [];

		for (let obj in SA2.features) {
			mainList.push({ SA2_MAIN16: SA2.features[obj].properties['SA2_MAIN16'], data: {}, isComplete: false })
		}

		var promiseArray = [];
		var notComplete = true;
		var counter = 0;
		var batchSize = 10;
		var totalBatched = 0;
		var tokens;
		var batchCounter = 0;

		while (notComplete) {
			tokens = "";
			counter = 0;
			mainList.forEach(function (obj, index) {
				if (!obj.isComplete && counter < batchSize) {
					tokens += obj.SA2_MAIN16 + "+";
					counter++;
					totalBatched++;
					obj.isComplete = true;
				}
			});

			tokens = tokens.substring(0, tokens.length - 1);

			if (totalBatched < mainList.length) {
				batchCounter++;
				promiseArray.push(new Promise((resolve, reject) => {
					try {
						var callStart = "https://api.data.abs.gov.au/data/ERP_ASGS2016/ERP.3+1+2.TT+A04+A59+A10+A15+A20+A25+A30+A35+A40+A45+A50+A55+A60+A65+A70+A75+A80+8599.AUS+STE+SA4+SA3+SA2+GCCSA.";
						var callEnd = ".A/all?startPeriod=2016&format=jsondata";
						var callURL = callStart + tokens + callEnd;

						fetch(callURL)
							.then(res => res.json())
							.then(
								(result) => {
									resolve(result);
								},
								(error) => {
									reject(error);
								}
							);

					} catch (e) {
						console.log("Catch error");
						console.log(e);
					}
				}));
			} else {
				notComplete = false;
			}
		}

		console.log("batchCounter: " + batchCounter);

		Promise.all(promiseArray).then(result => {
			console.log(result);
		}, (error) => {
			console.log(error);
		});



		// for (var obj in mainList && (counter < batchSize)) {
		// 	console.log("looping");
		// 	if (!obj.isComplete) {
		// 		tokens += obj.SA2_MAIN16 + "+";
		// 		counter++;
		// 		totalBatched++;
		// 		console.log("Adding");
		// 		mainList[obj].isComplete = true;
		// 	} else {
		// 		console.log("Already Completed");
		// 	}

		// }

		// console.log("end loop");

		// if (totalBatched !== mainList.length) {
		// 	console.log(tokens);
		// } else {
		// 	notComplete = false;
		// }

		counter = 0;
		// }

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
