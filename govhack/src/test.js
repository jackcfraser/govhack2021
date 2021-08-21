import Papa from 'papaparse';

class test {
    static testm() {
			try {
                var f = require(process.env.REACT_APP_PATH);
				var t = String(f);
				console.log(typeof t);
				Papa.parse(t, {
					complete: results => {
                        console.log(results.data);
                        
                        
					},
					error: (error) => {
					}
				});
			} catch (error) {
                console.log(error);
			}
	}
}

export default test
