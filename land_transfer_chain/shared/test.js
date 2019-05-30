var { _hash1 } = require("../shared/Addressing.js");

let land_hash = get_land_registry_address("1",'santhosh',"byadrahalli");
console.log(land_hash);
let record_id = get_record_id(land_hash)
console.log(get_enrollement_address(record_id,"101"))
console.log(get_cultivation_address(record_id,"102"))
console.log(get_inspection_address(record_id,"103"))
console.log(get_harvest_address(record_id,"104"))
console.log(get_processing_address(record_id,"105"))
console.log(get_sale_address(record_id,"106"))
console.log(get_purchase_address(record_id,"107"))