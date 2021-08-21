import Papa from 'papaparse';

class test {
    static testm() {
			try {
                var f = require(process.env.REACT_APP_PATH);
                console.log(typeof f);
				Papa.parse('this,is,a,test,to,be,parsed', {
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
