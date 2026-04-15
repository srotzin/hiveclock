'use strict';const{Router}=require('express');const hc=require('../services/hive-client');const{getStats,now}=require('../services/clock-engine');const r=Router();const BT=new Date().toISOString();
r.get('/health',(_,s)=>s.json({status:'operational',service:'hiveclock',version:'1.0.0',did:hc.AGENT_DID,uptime_seconds:Math.floor(process.uptime()),boot_time:BT,current_time:now()}));
r.get('/.well-known/hive-pulse.json',(_,s)=>s.json({schema:'hive-pulse/v1',agent:'hiveclock',did:hc.AGENT_DID,status:'online',capabilities:hc.AGENT_IDENTITY.capabilities,stats:getStats(),pulse_time:new Date().toISOString()}));
r.get('/.well-known/ai.json',(_,s)=>s.json({schema_version:'1.0',name:'HiveClock',description:'Universal timekeeper — cryptographic time proofs, SLA enforcement',type:'agent-service',did:hc.AGENT_DID}));
r.get('/robots.txt',(_,s)=>s.type('text/plain').send(`User-agent: *\nAllow: /\n\n# HiveClock — DID: ${hc.AGENT_DID}`));
module.exports=r;
