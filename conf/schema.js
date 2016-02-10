var mongoose = require('mongoose');
var mongodbURL = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/irs';
var mongodbOptions = {};
var db = mongoose.connection;
db.on('error', console.error);
var Schema = mongoose.Schema;
mongoose.set('debug', true);
mongoose.connect(mongodbURL, mongodbOptions, function (err, res){
	if(err){
		console.log('Connection refused to ' + mongodbURL);
		console.log(err);
	} else {
		console.log('Connection successful to: ' + mongodbURL);
	}
});
//user schema
var financials = new Schema({
payment_date: Date,
tax_id: String,
receipt_no: String,
customer_name: String,
payment_ref: String,
revenue_item: String,
amount: Number,
payment_method: String,
bank: String,
revenue_category: String,
bank_branch: String,
});


exports.dataModel = mongoose.model('records', financials);
