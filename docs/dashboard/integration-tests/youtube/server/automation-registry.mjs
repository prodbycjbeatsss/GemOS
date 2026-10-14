export const AUTOMATIONS = {
 'youtube-snapshot-checker':{name:'YouTube snapshot checker',card:'2.2'},
 'drive-assets-sync':{name:'Drive file check',card:'1.2'},
 'drive-catalogue-sync':{name:'Drive release discovery',card:'1.2'},
 'drive-release-ready':{name:'Release Queue approval',card:'1.2'},
 'shorts-analytics-sync':{name:'Shorts analytics sync',card:'2.1'},
 'release-metadata-sync':{name:'Release metadata sync',card:'2.2'},
 'email-list-sync':{name:'Email list sync',card:'2.3'},
 'payhip-sales-sync':{name:'Payhip sales refresh',card:'3.1'},
 'youtube-earnings-sync':{name:'YouTube earnings sync',card:'3.2'},
 'youtube-ranking-sync':{name:'YouTube earnings ranking',card:'3.2'},
 'youtube-payouts-sync':{name:'YouTube payouts sync',card:'3.3'}
};
export const CARDS=[
 {id:'1.1',name:'Schedule Overview',href:'/checklist',mode:'unconnected'},
 {id:'1.2',name:'Release Readiness',href:'/checklist',mode:'sync'},
 {id:'2.1',name:'Short-form Performance',href:'/',mode:'sync'},
 {id:'2.2',name:'24-hour Shorts Ranking',href:'/',mode:'sync'},
 {id:'2.3',name:'Email List',href:'/',mode:'sync'},
 {id:'3.1',name:'Payhip Sales',href:'/commerce',mode:'sync'},
 {id:'3.2',name:'YouTube Earnings',href:'/commerce',mode:'sync'},
 {id:'3.3',name:'YouTube Payouts',href:'/commerce',mode:'sync'},
 {id:'3.4',name:'Subscription Costs',href:'/commerce',mode:'manual'}
];
