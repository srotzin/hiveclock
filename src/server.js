'use strict';const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3017;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/clock'));
app.get('/',(_,r)=>r.json({service:'hiveclock',version:'1.0.0',description:'Universal timekeeper — cryptographic time proofs, SLA enforcement, epoch management',endpoints:{now:'GET /v1/clock/now',proof:'POST /v1/clock/proof',sla:'POST /v1/clock/sla',check_sla:'POST /v1/clock/sla/check/:id',epoch:'POST /v1/clock/epoch',stats:'GET /v1/clock/stats',health:'GET /health'}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hiveclock] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
