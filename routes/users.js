var express = require('express');
var router = express.Router();
var request = require('http');
var model = require('../conf/schema');
var fs = require('fs');
var Converter = require("csvtojson").Converter;
var converter= new Converter({delimiter:";", headers:["channel_name", "payment_log_date", "payment_ref_no",
"payer_id", "payer_name", "payer_address", "telephone_number", "bank_name", "bank_code", "cbn_bank_code", "branch_code",
"branch_name","deposit_slip_no","payment_method_name","zone_code","zone_name","agency_code","agency_name",
"revenue_code","revenue_name","payment_currency","assessment_ref","payment_amount","bank_coll_fee",
"isw_trans_fee","lead_bank_name","lead_bank_code","lead_bank_cbn_code","settlement_date",
"remittance_date"]});
var multiparty = require('multiparty');
var data = model.dataModel;
converter.on("end_parsed", function(jsonObj){

  for(var i=0; i < jsonObj.length; i++){
    var date = jsonObj[i].payment_log_date.split(" ");
    var new_date = date[0].replace("/", "-");
    new_date = new_date.replace("/", "-");
    var dat = new data({
      payment_date: new_date,
      tax_id: jsonObj[i].payer_id,
      receipt_no: jsonObj[i].deposit_slip_no,
      customer_name: jsonObj[i].payer_name,
      payment_ref: jsonObj[i].payment_ref_no,
      revenue_item: jsonObj[i].revenue_name,
      amount: jsonObj[i].payment_amount,
      payment_method: jsonObj[i].payment_method_name,
      bank: jsonObj[i].bank_name,
      revenue_category: jsonObj[i].agency_name,
      bank_branch: jsonObj[i].bank_branch

  });
  dat.save(function(err, data){
    if(err){
      console.log(err);
    }else {
      console.log("success");
    }
  });
}
  //console.log(jsonObj[0].channel_name);

});
router.post('/upload', function(req, res, next) {
  var form = new multiparty.Form();
  form.on("part", function(part){
    part.pipe(converter);
  });
  form.parse(req);

  res.render('index', { title: 'Express' });
});

router.post('/banks', function(req, res){
  var start = req.body.start.split("-");
  var end = req.body.end.split("-");
  var tmp_start = start[1] - 1;
  var tmp_end = end[1] - 1;
  var new_start = start[0] + "-" + tmp_start + "-" + start[2];
  var new_end = end[0] + "-" + tmp_end + "-" + end[2];
  var map = {};
  var dat = [];
  data.find({"payment_date":{"$gte": new Date(new_start), "$lte": new Date(new_end)}}, function(err, result){
    if(err){
      consoloe.log(err);
      res.send(500);
    }
    for(var i = 0; i < result.length; i++){
      if(!(result[i].bank in map)){
          map[result[i].bank] = parseInt(result[i].amount);
      }
    map[result[i].bank] += parseInt(result[i].amount);
    }
    for (var ii in map){
      dat.push({
        bank_name:ii,
        amount:map[ii]
      });
    }
    res.status(200).json(dat);
  });
});

module.exports = router;
