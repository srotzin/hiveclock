'use strict';const{Router}=require('express');const e=require('../services/clock-engine');const r=Router();
r.get('/v1/clock/now',(_,s)=>s.json(e.now()));
r.post('/v1/clock/proof',(q,s)=>{const{agent_did,event}=q.body;if(!agent_did||!event)return s.status(400).json({error:'agent_did and event required'});s.status(201).json({status:'proof_issued',proof:e.issueProof(agent_did,event)})});
r.post('/v1/clock/sla',(q,s)=>{const{agent_did,metric,threshold,window_seconds,penalty}=q.body;if(!agent_did)return s.status(400).json({error:'agent_did required'});s.status(201).json({status:'sla_created',sla:e.createSLA(agent_did,{metric,threshold,window_seconds,penalty})})});
r.post('/v1/clock/sla/check/:id',(q,s)=>{const{value}=q.body;const result=e.checkSLA(q.params.id,value);if(!result)return s.status(404).json({error:'SLA not found'});s.json(result)});
r.post('/v1/clock/epoch',(q,s)=>{s.status(201).json({status:'epoch_created',epoch:e.createEpoch(q.body.name,q.body)})});
r.get('/v1/clock/stats',(_,s)=>s.json(e.getStats()));
module.exports=r;
