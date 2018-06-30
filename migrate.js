const mongodb= require('mongodb')
const url = 'mongodb://localhost:27017/assignment3-db'
//import databases
let customers=require('./customer-data.json')
const addData=require('./customer-address-data.json')
const  async= require('async')

//define tasks for async use
let tasks =[]
mongodb.MongoClient.connect(url,(error,db) => {
if(error) return process.exit(1)//error handling
	
//assign missing arguments to objects in customers array
	customers = Object.assign(customers, addData)
	
	 let merge = (end) => {
		return (callback) => {
			
			
		db.collection('customers').insert(customers, (err,results) => {
		if (error) return process.exit(1)
		callback(error,results)
		});
	};
};
	tasks.push(merge) //importing migrate functio
	  console.log(`Launching ${tasks.length} parallel task(s)`)
		const startTime = Date.now()
	async.parallel(tasks, (error, results) => { //running async function
	if (error) console.error(error)
	  const endTime = Date.now()
    console.log(`Execution time: ${endTime-startTime}`)
  console.log(results)
  
	});
db.close()
			
});