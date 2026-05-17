/* ---------------- QR LOGIN (NEW) ---------------- */

const accessLevels = {
  "ToxFang": 6,
  "Admin_Root.delta": 5,
  "NEXUS7-ACCESS-ALPHA": 1,
  "NEXUS7-ACCESS-BETA": 2,
  "N7-ORIGIN-KEY": 3,
  "N7-DELTA-UNLOCK": 4
};

function clearanceMessage(level, key){
  if(level <= 2){
    return `ACCESS VERIFIED — CLEARANCE LEVEL ${level}
STATUS: SUPPORT ASSET (EXPENDABLE)

Your presence is permitted.
Your survival is not required.`;
  }else if(level === 3){
    return `ACCESS VERIFIED — CLEARANCE LEVEL ${level}
STATUS: OPERATIONAL STAFF

You are authorized to access OIMS // BLACKSITE OMEGA.
Note: You are NOT cleared for secrets, redacted archives, or Level‑6 observer data.`;
 }else if(level === 4){
    return `ACCESS VERIFIED — CLEARANCE LEVEL 4
STATUS: Level 4 CONTROL

Welcome, Arlo Rodgers.
Observer data link established.`;
  }else if(level === 5){
    return `ACCESS VERIFIED — CLEARANCE LEVEL 5
STATUS: STRATEGIC OVERSIGHT

Administrative override accepted.
Secrets remain restricted.`;
  }else if(level === 6){
    return `ACCESS VERIFIED — CLEARANCE LEVEL 6
STATUS: FULL CONTROL

Welcome, ${key}.
Secret channels unlocked.
Observer data link established.`;
  }
  return `ACCESS VERIFIED — CLEARANCE LEVEL ${level}`;
}

function initQrGate(){
  const qrGate=document.getElementById('qrGate');
  const qrStatus=document.getElementById('qrStatus');
  const boot=document.getElementById('boot');

  const scanner=new Html5QrcodeScanner("qr-reader",{fps:10,qrbox:220},false);

  function onScanSuccess(decodedText){
    const key=decodedText.trim();
    const level=accessLevels[key];

    if(!level){
      qrStatus.textContent=`UNAUTHORIZED TOKEN DETECTED:\n${key}`;
      qrStatus.className="qr-status-bad";
      return;
    }

    qrStatus.textContent=clearanceMessage(level,key);
    qrStatus.className="qr-status-ok";

    scanner.clear().catch(()=>{});

    setTimeout(()=>{
      qrGate.classList.add('hidden');
      boot.style.display="block";
      typeBoot();   // ← your original boot sequence
    },3000);
  }

  scanner.render(onScanSuccess,()=>{});
}

window.addEventListener('load', initQrGate);

const ROOMS=[
  {id:"CAM-A1",name:"SURFACE ACCESS ELEVATOR",type:"elevator"},
  {id:"CAM-A2",name:"LOADING DOCK ALPHA",type:"dock"},
  {id:"CAM-A3",name:"PERIMETER GATE NORTH",type:"perimeter"},
  {id:"CAM-G1",name:"CENTRAL OBSERVATION HUB",type:"office"},
  {id:"CAM-G2",name:"DIRECTOR SUITE",type:"office"},
  {id:"CAM-C1",name:"SECURITY CHECKPOINT 1",type:"checkpoint"},
  {id:"CAM-C2",name:"SURVEILLANCE CONTROL",type:"control"},
  {id:"CAM-C3",name:"CORRIDOR C-19",type:"corridor"},
  {id:"CAM-C4",name:"CORRIDOR B-07",type:"corridor"},
  {id:"CAM-D1",name:"MEDICAL WING",type:"medical"},
  {id:"CAM-D3",name:"PRESERVATION TANKS",type:"tanks"},
  {id:"CAM-D5",name:"RESEARCH LABS",type:"lab"},
  {id:"CAM-D6",name:"GENETICS LAB SUBLEVEL",type:"lab"},
  {id:"CAM-B1",name:"SLEEP CHAMBER ARRAY",type:"chambers"},
  {id:"CAM-B2",name:"DETENTION BLOCK",type:"detention"},
  {id:"CAM-F1",name:"REACTOR CHAMBER",type:"reactor"},
  {id:"CAM-F2",name:"POWER RELAY HUB",type:"utility"},
  {id:"CAM-E1",name:"ARCHIVE STACKS",type:"archive"},
  {id:"CAM-E2",name:"DEEP ARCHIVE SUBLEVEL",type:"archive"},
  {id:"CAM-H3",name:"HVAC CONTROL",type:"utility"},
  {id:"CAM-H4",name:"WASTE PROCESSING",type:"utility"},
  {id:"CAM-K1",name:"ARMORY",type:"armory"},
  {id:"CAM-K2",name:"ANDROID BAY",type:"android"},
  {id:"CAM-S1",name:"SUBLEVEL-9 EAST",type:"sublevel"},
];

const ROLES=["SEC","RES","MED","OPS","TEC","MNT","CUS","CMD","BIO","ENG"];
const ROLE_COL={SEC:"#3a6b9a",RES:"#4a8a4a",MED:"#9a4a4a",OPS:"#7a6a3a",TEC:"#5a5a8a",MNT:"#6a5a4a",CUS:"#8a4a7a",CMD:"#8a6a2a",BIO:"#4a8a7a",ENG:"#6a6a4a"};
const SKIN=["#c8956c","#e8b88a","#a06035","#f0c8a0","#7a4a28","#d4a070","#b87050","#8a5530","#ddb080","#c07848"];

const personnelDatabase=[
  {name:"TFX-010 // TOXFANG",   role:"Hazard Operations",      clearance:"LEVEL:REDACTED",  loyalty:"100%", status:"???",    dob:"1989-03-14",ssn:"***-**-7741",id:"P-0010"},
  {name:"TFX-09 // TOXICITY",   role:"Contained Subject",      clearance:"OMEGA-RED",loyalty:"N/A", status:"CONTAINED", dob:"CLASSIFIED",  ssn:"CLASSIFIED",   id:"OIMS-0009"},
  {name:"DR. EVELYN MARR",      role:"Lead Genetic Researcher", clearance:"LEVEL 5",  loyalty:"91%", status:"ACTIVE",    dob:"1978-11-02",ssn:"***-**-3312",id:"OIMS-0034"},
  {name:"SECURITY CHIEF HARLOW",role:"Security Command",        clearance:"LEVEL 4",  loyalty:"82%", status:"ACTIVE",    dob:"1975-06-19",ssn:"***-**-8821",id:"OIMS-0018"},
  {name:"ISAAC REYNE",          role:"Research Analyst",        clearance:"LEVEL 4",  loyalty:"12%", status:"ACTIVE",   dob:"1991-08-30",ssn:"***-**-5509",id:"OIMS-0057"},
  {name:"MARA VEIL",            role:"Systems Engineer",        clearance:"LEVEL 3",  loyalty:"66%", status:"UNDER REVIEW",dob:"1993-01-17",ssn:"***-**-6634",id:"OIMS-0062"},
  {name:"ELIAS THORNE",         role:"Containment Specialist",  clearance:"LEVEL 3",  loyalty:"79%", status:"ACTIVE",    dob:"1986-04-05",ssn:"***-**-2201",id:"OIMS-0041"},
  {name:"VIOLET KANE",          role:"Medical Division",        clearance:"LEVEL 2",  loyalty:"88%", status:"ACTIVE",    dob:"1994-09-23",ssn:"***-**-1173",id:"OIMS-0071"},
  {name:"UNIT K-22",            role:"Android Security Unit",   clearance:"LEVEL 4",  loyalty:"100%",status:"ACTIVE",    dob:"N/A — SYNTHETIC",ssn:"N/A",      id:"OIMS-K022"},
  {name:"LENA CROSS",           role:"Surveillance Operator",   clearance:"LEVEL 2",  loyalty:"58%", status:"MONITORED", dob:"1996-12-08",ssn:"***-**-9904",id:"OIMS-0083"},
  {name:"JONAH VALE",           role:"Tunnel Maintenance",      clearance:"LEVEL 1",  loyalty:"47%", status:"FLAGGED",   dob:"1988-07-11",ssn:"***-**-4420",id:"OIMS-0099"},
  {name:"DIRECTOR AUREK",       role:"Blacksite Director",      clearance:"LEVEL 5",  loyalty:"CLASSIFIED",status:"ACTIVE",dob:"CLASSIFIED",ssn:"CLASSIFIED",id:"OIMS-0001"},
  {name:"SELENE WARD",          role:"Behavioral Analysis",     clearance:"LEVEL 3",  loyalty:"85%", status:"ACTIVE",    dob:"1990-02-28",ssn:"***-**-7780",id:"OIMS-0048"},
  {name:"NEXUS-4",              role:"AI Core Technician",      clearance:"LEVEL 4",  loyalty:"93%", status:"ACTIVE",    dob:"N/A — SYNTHETIC",ssn:"N/A",      id:"OIMS-N004"},
  {name:"KAI RYDER",            role:"Emergency Response",      clearance:"LEVEL 3",  loyalty:"71%", status:"ACTIVE",    dob:"1992-05-16",ssn:"***-**-3367",id:"OIMS-0066"},
  {name:"DR. SABLE NOHR",       role:"Neurological Research",   clearance:"LEVEL 5",  loyalty:"88%", status:"ACTIVE",    dob:"1971-10-03",ssn:"***-**-1192",id:"OIMS-0022"},
  {name:"PETRA VOSS",           role:"Weapons Division",        clearance:"LEVEL 4",  loyalty:"77%", status:"ACTIVE",    dob:"1984-03-29",ssn:"***-**-6617",id:"OIMS-0038"},
  {name:"UNIT K-07",            role:"Android Security Unit",   clearance:"LEVEL 4",  loyalty:"100%",status:"OFFLINE",   dob:"N/A — SYNTHETIC",ssn:"N/A",      id:"OIMS-K007"},
  {name:"ROMAN COLE",           role:"Intelligence Analyst",    clearance:"LEVEL 3",  loyalty:"63%", status:"MONITORED", dob:"1995-08-14",ssn:"***-**-5541",id:"OIMS-0091"},
  {name:"DR. YARA SHIN",        role:"Biochemical Research",    clearance:"LEVEL 4",  loyalty:"90%", status:"ACTIVE",    dob:"1980-06-07",ssn:"***-**-2298",id:"OIMS-0029"},
  {name:"CARVER HOLM",          role:"Demolitions Specialist",  clearance:"LEVEL 3",  loyalty:"69%", status:"ACTIVE",    dob:"1983-11-22",ssn:"***-**-8812",id:"OIMS-0053"},
  {name:"NINA VAEL",            role:"Communications Ops",      clearance:"LEVEL 2",  loyalty:"81%", status:"ACTIVE",    dob:"1997-04-01",ssn:"***-**-3390",id:"OIMS-0102"},
  {name:"SUBJECT 47",           role:"Test Subject",            clearance:"OMEGA-RED",loyalty:"N/A", status:"CONTAINED", dob:"UNKNOWN",     ssn:"UNKNOWN",      id:"OIMS-T047"},
  {name:"ORION BLAKE",          role:"Power Systems Engineer",  clearance:"LEVEL 2",  loyalty:"74%", status:"ACTIVE",    dob:"1991-09-09",ssn:"***-**-7723",id:"OIMS-0078"},
  {name:"LT. DAVAN CROSS",      role:"Security Lieutenant",     clearance:"LEVEL 3",  loyalty:"80%", status:"ACTIVE",    dob:"1987-01-30",ssn:"***-**-4415",id:"OIMS-0044"},
  {name:"MIRRA COLE",           role:"Psyche Division",         clearance:"LEVEL 3",  loyalty:"72%", status:"ACTIVE",    dob:"1993-07-18",ssn:"***-**-6602",id:"OIMS-0087"},
  {name:"UNIT K-19",            role:"Android Security Unit",   clearance:"LEVEL 4",  loyalty:"100%",status:"ACTIVE",    dob:"N/A — SYNTHETIC",ssn:"N/A",      id:"OIMS-K019"},
  {name:"DR. FELIX AURON",      role:"Containment Research",    clearance:"LEVEL 4",  loyalty:"84%", status:"ACTIVE",    dob:"1976-12-14",ssn:"***-**-9931",id:"OIMS-0031"},
  {name:"SASHA VEYNE",          role:"Logistics Coordinator",   clearance:"LEVEL 1",  loyalty:"55%", status:"FLAGGED",   dob:"1999-03-03",ssn:"***-**-1108",id:"OIMS-0118"},
  {name:"UNIT K-33",            role:"Android Combat Unit",     clearance:"LEVEL 4",  loyalty:"100%",status:"ACTIVE",    dob:"N/A — SYNTHETIC",ssn:"N/A",      id:"OIMS-K033"},
  {name:"COLE VAREN",           role:"Archive Specialist",      clearance:"LEVEL 2",  loyalty:"78%", status:"ACTIVE",    dob:"1990-10-27",ssn:"***-**-3378",id:"OIMS-0094"},
  {name:"DR. LIRA MAST",        role:"Genetic Modification",    clearance:"LEVEL 5",  loyalty:"96%", status:"ACTIVE",    dob:"1969-05-11",ssn:"***-**-0047",id:"OIMS-0007"},
  {name:"EDGAR NOLE",           role:"Maintenance Chief",       clearance:"LEVEL 2",  loyalty:"61%", status:"MONITORED", dob:"1981-08-19",ssn:"***-**-5577",id:"OIMS-0059"},
  {name:"VANCE TROY",           role:"Medical Officer",         clearance:"LEVEL 2",  loyalty:"83%", status:"ACTIVE",    dob:"1988-02-06",ssn:"***-**-2243",id:"OIMS-0072"},
  {name:"SERAPH // UNKNOWN",    role:"Escaped Subject",         clearance:"CLASSIFIED",loyalty:"HOSTILE",status:"MISSING",dob:"CLASSIFIED",ssn:"CLASSIFIED",  id:"OIMS-????"},
];

// Map persons to personnel for click identification
// persons with ids 0..N map into personnelDatabase by index (mod length)
let globalPersons=[];
let mainCamIdx=3;
let camRAF=null;
let camActive=false;
let selectedPersonId=null;

function mkPerson(id){
  return{
    id,
    dbIdx: id % personnelDatabase.length,
    room:Math.floor(Math.random()*ROOMS.length),
    x:80+Math.random()*500,y:180+Math.random()*90,
    tx:80+Math.random()*500,ty:180+Math.random()*90,
    role:ROLES[Math.floor(Math.random()*ROLES.length)],
    skin:SKIN[Math.floor(Math.random()*SKIN.length)],
    step:Math.random()*Math.PI*2,facing:1,paused:false,pauseT:0,
    nextPauseIn:100+Math.floor(Math.random()*300),taskT:0,arm:0,
    roomChangeT:Math.floor(Math.random()*600),
    nextRoomChange:500+Math.floor(Math.random()*1400),
    highlight:false,
  };
}
for(let i=0;i<30;i++) globalPersons.push(mkPerson(i));

function updatePerson(p,w,h){
  const minY=h*0.54,maxY=h*0.88;
  p.roomChangeT++;
  if(p.roomChangeT>p.nextRoomChange){
    p.room=Math.floor(Math.random()*ROOMS.length);
    p.x=70+Math.random()*(w-140);p.y=minY+Math.random()*(maxY-minY);
    p.roomChangeT=0;p.nextRoomChange=500+Math.floor(Math.random()*1400);
  }
  if(p.paused){
    p.pauseT++;p.arm=Math.sin(p.pauseT*0.08)*0.4;
    if(p.pauseT>50+Math.random()*80){
      p.paused=false;p.pauseT=0;
      p.tx=70+Math.random()*(w-140);p.ty=minY+Math.random()*(maxY-minY);
      p.nextPauseIn=80+Math.floor(Math.random()*250);
    }
    return;
  }
  const dx=p.tx-p.x,dy=p.ty-p.y,dist=Math.sqrt(dx*dx+dy*dy);
  if(dist<3){p.paused=true;p.pauseT=0;p.arm=0;return;}
  p.x+=dx/dist*0.6;p.y+=dy/dist*0.6;
  p.facing=dx>0?1:-1;p.step+=0.12;p.taskT++;
  if(p.taskT>p.nextPauseIn){p.paused=true;p.pauseT=0;p.taskT=0;p.arm=0;
    p.nextPauseIn=80+Math.floor(Math.random()*250);}
}

function drawRoom(ctx,w,h,type){
  const fl=Math.floor(h*0.58);
  const dark="#111",mid="#1a1a1a",light="#252525";

  const fills={
    office:{wall:"#2a2a2e",floor:"#1e1e22"},
    control:{wall:"#1a1e1a",floor:"#141814"},
    lab:{wall:"#1e1e26",floor:"#16161e"},
    chambers:{wall:"#14141c",floor:"#0e0e16"},
    reactor:{wall:"#1c1010",floor:"#140c0c"},
    archive:{wall:"#1a1812",floor:"#14120e"},
    elevator:{wall:"#1e1e1e",floor:"#181818"},
    tanks:{wall:"#101820",floor:"#0c1018"},
    corridor:{wall:"#181818",floor:"#121212"},
    medical:{wall:"#181e18",floor:"#121812"},
    dock:{wall:"#1c1a14",floor:"#161410"},
    perimeter:{wall:"#141c14",floor:"#101210"},
    checkpoint:{wall:"#1a1a14",floor:"#141410"},
    detention:{wall:"#1c1010",floor:"#160c0c"},
    utility:{wall:"#141418",floor:"#101012"},
    armory:{wall:"#141010",floor:"#100c0c"},
    android:{wall:"#101418",floor:"#0c1014"},
    sublevel:{wall:"#0c0c10",floor:"#080808"},
  };

  const wc=fills[type]||{wall:"#1a1a1a",floor:"#111"};
  ctx.fillStyle=wc.wall;ctx.fillRect(0,0,w,fl);
  ctx.fillStyle=wc.floor;ctx.fillRect(0,fl,w,h-fl);

  if(type==="office"){
    const cw=Math.floor(w/4);
    for(let i=0;i<4;i++){ctx.fillStyle="#222226";ctx.fillRect(i*cw,0,cw-2,fl);}
    for(let i=0;i<4;i++){ctx.fillStyle="#333338";ctx.fillRect(i*cw+8,fl-65,cw-18,55);}
    for(let i=0;i<w;i+=60){ctx.fillStyle="#252528";ctx.fillRect(i,fl,58,h-fl);}
    for(let i=0;i<w;i+=60){ctx.fillStyle="#1a1a1d";ctx.fillRect(i+28,fl+10,28,h-fl-10);}
  } else if(type==="control"){
    const sw=Math.floor(w/6);
    for(let i=0;i<6;i++){
      ctx.fillStyle="#0d1a10";ctx.fillRect(i*sw+2,12,sw-4,fl-85);
      for(let j=0;j<4;j++){ctx.fillStyle=Math.random()>0.97?"#00ff44":"#004a15";ctx.fillRect(i*sw+6+j*14,25,11,8);}
      for(let j=0;j<5;j++){ctx.fillStyle=Math.random()>0.99?"#ff4444":"#1a2a1a";ctx.fillRect(i*sw+5+j*10,42,8,7);}
    }
    ctx.fillStyle="#111a11";ctx.fillRect(0,fl-28,w,28);
    for(let i=0;i<w;i+=55){ctx.fillStyle="#1a1e1a";ctx.fillRect(i,fl,53,h-fl);}
  } else if(type==="lab"){
    const lw=Math.floor(w/3);
    for(let i=0;i<3;i++){
      ctx.fillStyle="#252530";ctx.fillRect(i*lw+4,fl-88,lw-8,78);
      ctx.fillStyle="#0e0e1a";ctx.fillRect(i*lw+10,fl-80,lw-20,30);
      for(let j=0;j<5;j++){ctx.fillStyle="#2a2a40";ctx.fillRect(i*lw+12+j*18,fl-76,13,22);}
    }
    for(let i=0;i<w;i+=50){ctx.fillStyle="#202028";ctx.fillRect(i,fl,48,h-fl);}
  } else if(type==="chambers"){
    const pw=Math.floor(w/5);
    for(let i=0;i<5;i++){
      ctx.fillStyle="#0a0a14";ctx.fillRect(i*pw+3,8,pw-6,fl-18);
      ctx.strokeStyle="#2a2a4a";ctx.lineWidth=1;ctx.strokeRect(i*pw+3,8,pw-6,fl-18);
      ctx.fillStyle="rgba(80,80,200,0.07)";ctx.fillRect(i*pw+3,8,pw-6,fl-18);
    }
  } else if(type==="reactor"){
    ctx.fillStyle="rgba(200,60,0,0.07)";ctx.beginPath();ctx.arc(w/2,fl*0.5,fl*0.4,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="rgba(200,60,0,0.05)";ctx.beginPath();ctx.arc(w/2,fl*0.5,fl*0.25,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle="#2a1010";ctx.lineWidth=1;
    for(let i=0;i<w;i+=40){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,fl);ctx.stroke();}
  } else if(type==="archive"){
    const aw=Math.floor(w/7),ah=Math.floor((fl-10)/6);
    for(let i=0;i<7;i++){
      ctx.fillStyle="#12100c";ctx.fillRect(i*aw+2,0,aw-4,fl-10);
      for(let j=0;j<6;j++){ctx.fillStyle="#2a2418";ctx.fillRect(i*aw+4,j*ah+2,aw-8,ah-4);}
    }
  } else if(type==="elevator"){
    ctx.fillStyle="#252525";ctx.fillRect(w*0.3,0,w*0.4,fl);
    ctx.fillStyle="#1a1a1a";ctx.fillRect(w*0.48,0,w*0.04,fl);
    ctx.strokeStyle="#333";ctx.lineWidth=1;
    for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(0,i*Math.floor(fl/4));ctx.lineTo(w,i*Math.floor(fl/4));ctx.stroke();}
  } else if(type==="tanks"){
    const tw=Math.floor(w/4);
    for(let i=0;i<4;i++){
      const tx=i*tw+Math.floor(tw/2)-22;
      ctx.fillStyle="#0e1622";ctx.fillRect(tx,16,44,fl-26);
      ctx.fillStyle="rgba(0,100,180,0.1)";ctx.fillRect(tx+2,18,40,fl-30);
      ctx.strokeStyle="#1a2a3a";ctx.lineWidth=1;ctx.strokeRect(tx,16,44,fl-26);
    }
  } else if(type==="corridor"){
    for(let i=0;i<5;i++){ctx.strokeStyle="#222";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo((i+1)*Math.floor(w/6),0);ctx.lineTo((i+1)*Math.floor(w/6),fl);ctx.stroke();}
    ctx.fillStyle="#151515";ctx.fillRect(0,fl*0.3,8,fl*0.5);ctx.fillRect(w-8,fl*0.3,8,fl*0.5);
    for(let i=0;i<w;i+=40){ctx.fillStyle="#181818";ctx.fillRect(i,fl,38,h-fl);}
  } else if(type==="medical"){
    const mw=Math.floor(w/4);
    for(let i=0;i<4;i++){ctx.fillStyle="#141e14";ctx.fillRect(i*mw+3,10,mw-6,fl-20);}
    ctx.fillStyle="#183018";ctx.fillRect(0,fl-40,w,40);
    for(let i=0;i<w;i+=60){ctx.fillStyle="#0e160e";ctx.fillRect(i+10,fl-36,40,28);}
  } else if(type==="detention"){
    const dw=Math.floor(w/4);
    for(let i=0;i<4;i++){
      ctx.fillStyle="#1a0808";ctx.fillRect(i*dw+3,8,dw-6,fl-18);
      ctx.strokeStyle="#330000";ctx.lineWidth=1;ctx.strokeRect(i*dw+3,8,dw-6,fl-18);
      for(let j=0;j<5;j++){ctx.strokeStyle="#220000";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(i*dw+3+j*(dw-6)/4,8);ctx.lineTo(i*dw+3+j*(dw-6)/4,fl-18);ctx.stroke();}
    }
  } else if(type==="armory"){
    const rw=Math.floor(w/6);
    for(let i=0;i<6;i++){ctx.fillStyle="#120808";ctx.fillRect(i*rw+2,10,rw-4,fl-20);}
    for(let i=0;i<6;i++){for(let j=0;j<4;j++){ctx.fillStyle="#2a1010";ctx.fillRect(i*rw+4+j*8,14,6,fl-30);}}
  } else if(type==="android"){
    const bw=Math.floor(w/5);
    for(let i=0;i<5;i++){
      ctx.fillStyle="#0c1018";ctx.fillRect(i*bw+3,12,bw-6,fl-24);
      ctx.strokeStyle="#1a2040";ctx.lineWidth=1;ctx.strokeRect(i*bw+3,12,bw-6,fl-24);
      ctx.fillStyle="rgba(0,60,120,0.1)";ctx.fillRect(i*bw+3,12,bw-6,fl-24);
    }
  } else if(type==="sublevel"){
    ctx.fillStyle="#08080c";ctx.fillRect(0,0,w,fl);
    ctx.strokeStyle="#111118";ctx.lineWidth=1;
    for(let i=0;i<8;i++){ctx.beginPath();ctx.moveTo(0,i*(fl/8));ctx.lineTo(w,i*(fl/8));ctx.stroke();}
  } else if(type==="utility"){
    for(let i=0;i<3;i++){ctx.fillStyle="#131318";ctx.fillRect(i*(Math.floor(w/3))+4,20,Math.floor(w/3)-8,fl-30);}
    ctx.strokeStyle="#1a1a22";ctx.lineWidth=1;
    for(let i=0;i<w;i+=30){ctx.beginPath();ctx.moveTo(i,fl-20);ctx.lineTo(i,fl);ctx.stroke();}
  } else if(type==="dock"){
    for(let i=0;i<4;i++){ctx.fillStyle="#161410";ctx.fillRect(i*(Math.floor(w/4))+3,20,Math.floor(w/4)-6,fl-30);}
    ctx.fillStyle="#1a1810";ctx.fillRect(0,fl-15,w,15);
  } else if(type==="perimeter"){
    ctx.fillStyle="#101410";ctx.fillRect(0,0,w,fl);
    ctx.strokeStyle="#181c18";ctx.lineWidth=1;
    for(let i=0;i<w;i+=50){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,fl);ctx.stroke();}
  } else if(type==="checkpoint"){
    ctx.fillStyle="#1a1a10";ctx.fillRect(w*0.4,0,w*0.2,fl);
    ctx.strokeStyle="#222210";ctx.lineWidth=1;ctx.strokeRect(w*0.4,0,w*0.2,fl);
  }

  ctx.fillStyle="#1e1e1e";ctx.fillRect(0,fl-4,w,4);
}

// Person pixel-art portrait for ID card
function drawIDPortrait(canvas,skin,role){
  const ctx=canvas.getContext("2d");
  const w=canvas.width,h=canvas.height;
  ctx.fillStyle="#0a100a";ctx.fillRect(0,0,w,h);
  const col=ROLE_COL[role]||"#4a5a6a";
  // body
  ctx.fillStyle=col;ctx.fillRect(28,52,34,38);
  // head
  ctx.fillStyle=skin;ctx.beginPath();ctx.arc(45,40,16,0,Math.PI*2);ctx.fill();
  // hair
  ctx.fillStyle="#2a1a0a";ctx.fillRect(30,26,30,14);ctx.beginPath();ctx.arc(45,26,15,Math.PI,0);ctx.fill();
  // collar
  ctx.fillStyle=col;ctx.fillRect(34,52,22,10);
  // arms
  ctx.fillStyle=col;ctx.fillRect(14,52,14,26);ctx.fillRect(62,52,14,26);
  // legs
  ctx.fillStyle="#1a1a2a";ctx.fillRect(28,90,14,20);ctx.fillRect(48,90,14,20);
  // role label
  ctx.fillStyle="#00ff88";ctx.font="9px Consolas";ctx.textAlign="center";ctx.fillText(role,45,h-4);
  // scanline
  for(let y=0;y<h;y+=2){ctx.fillStyle="rgba(0,0,0,0.12)";ctx.fillRect(0,y,w,1);}
  // noise
  const img=ctx.getImageData(0,0,w,h);const d=img.data;
  for(let i=0;i<d.length;i+=4){const g=(d[i]*0.22+d[i+1]*0.72+d[i+2]*0.06);const n=g+(Math.random()-0.5)*14;const v=Math.max(0,Math.min(255,n));d[i]=v;d[i+1]=v;d[i+2]=v;}
  ctx.putImageData(img,0,0);
}

function clrClass(clr){
  if(clr==="OMEGA-RED")return "clr-omega";
  if(clr==="LEVEL 5")return "clr-5";
  if(clr==="LEVEL 4")return "clr-4";
  if(clr==="LEVEL 3")return "clr-3";
  if(clr==="LEVEL 2")return "clr-2";
  if(clr==="LEVEL 1")return "clr-1";
  return "clr-1";
}

function openIDCard(personIdx){
  const p=globalPersons[personIdx];
  const db=personnelDatabase[p.dbIdx];
  const overlay=document.getElementById("subjectOverlay");
  const fields=document.getElementById("idFields");
  const barcode=document.getElementById("idBarcode");
  const pCanvas=document.getElementById("idPhotoCanvas");

  drawIDPortrait(pCanvas,p.skin,p.role);

  const sc=db.status==="ACTIVE"?"#00ff88":db.status==="DELETED"?"#ff5555":db.status==="CONTAINED"?"#ff4444":db.status==="MISSING"?"#ff4444":db.status==="OFFLINE"?"#ff8844":"#aaaaaa";
  fields.innerHTML=`
    <div><span class="label">SUBJECT ID</span><br><span class="value">${db.id}</span></div>
    <div><span class="label">FULL NAME</span><br><span class="value">${db.name}</span></div>
    <div><span class="label">DATE OF BIRTH</span><br><span class="value">${db.dob}</span></div>
    <div><span class="label">SSN</span><br><span class="value ${db.ssn==="CLASSIFIED"?"classified":""}">${db.ssn}</span></div>
    <div><span class="label">ROLE</span><br><span class="value">${db.role}</span></div>
    <div><span class="label">SECURITY CLEARANCE</span><br><span class="clearance-badge ${clrClass(db.clearance)}">${db.clearance}</span></div>
    <div><span class="label">STATUS</span><br><span class="value" style="color:${sc}">${db.status}</span></div>
    <div><span class="label">LOYALTY INDEX</span><br><span class="value">${db.loyalty}</span></div>
  `;
  barcode.textContent=db.id+" // PRISM-SCAN";
  overlay.classList.add("show");
}

function closeIDCard(){
  document.getElementById("subjectOverlay").classList.remove("show");
}

// Track bounding boxes per person per canvas for click detection
let personBoxes={}; // key: canvasId -> [{personIdx, x,y,w,h}]

function drawPerson(ctx,p,pidx,cw,ch,scale,canvasKey){
  const s=scale||1;
  const sz=18*s;
  const px=(p.x/660)*cw,py=(p.y/300)*ch;
  const bob=p.paused?0:Math.sin(p.step)*1.5*s;
  const leg=p.paused?0:Math.sin(p.step)*0.35;
  const col=ROLE_COL[p.role]||"#4a5a6a";

  ctx.save();
  ctx.translate(px,py+bob);
  if(p.facing<0)ctx.scale(-1,1);
  ctx.fillStyle="#1a1a2a";
  ctx.save();ctx.rotate(leg);ctx.fillRect(-sz*0.28,sz*0.55,sz*0.22,sz*0.6);ctx.restore();
  ctx.save();ctx.rotate(-leg);ctx.fillRect(sz*0.06,sz*0.55,sz*0.22,sz*0.6);ctx.restore();
  ctx.fillStyle=col;
  ctx.beginPath();ctx.roundRect(-sz*0.32,0,sz*0.64,sz*0.58,2);ctx.fill();
  if(p.paused){
    ctx.save();ctx.rotate(p.arm);ctx.fillStyle=col;ctx.fillRect(sz*0.32,-sz*0.05,sz*0.16,sz*0.38);ctx.restore();
    ctx.save();ctx.rotate(-p.arm-0.3);ctx.fillStyle=col;ctx.fillRect(-sz*0.48,-sz*0.05,sz*0.16,sz*0.38);ctx.restore();
  }else{
    ctx.save();ctx.rotate(leg*0.5);ctx.fillStyle=col;ctx.fillRect(sz*0.32,-sz*0.05,sz*0.14,sz*0.36);ctx.restore();
    ctx.save();ctx.rotate(-leg*0.5);ctx.fillStyle=col;ctx.fillRect(-sz*0.46,-sz*0.05,sz*0.14,sz*0.36);ctx.restore();
  }
  ctx.fillStyle=p.skin;ctx.beginPath();ctx.arc(0,-sz*0.18,sz*0.22,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=col;ctx.beginPath();ctx.roundRect(-sz*0.18,-sz*0.42,sz*0.36,sz*0.26,1);ctx.fill();
  ctx.restore();

  // bounding box for click
  const bx=px-sz*0.55,by=py+bob-sz*1.0,bw=sz*1.1,bh=sz*2.0;
  if(!personBoxes[canvasKey])personBoxes[canvasKey]=[];
  personBoxes[canvasKey].push({personIdx:pidx,x:bx,y:by,w:bw,h:bh});

  ctx.strokeStyle="rgba(255,255,255,0.4)";ctx.lineWidth=0.6;ctx.setLineDash([2,2]);
  ctx.strokeRect(bx,by,bw,bh);ctx.setLineDash([]);
  ctx.fillStyle="#eee";ctx.font=`${Math.max(6,7*s)}px Consolas`;ctx.textAlign="left";
  ctx.fillText(p.role,bx,by-2);
}

function applyGrayscaleCCTV(ctx,w,h){
  const img=ctx.getImageData(0,0,w,h);const d=img.data;
  for(let i=0;i<d.length;i+=4){
    const g=d[i]*0.22+d[i+1]*0.72+d[i+2]*0.06;
    const n=g+(Math.random()-0.5)*14;
    d[i]=d[i+1]=d[i+2]=Math.max(0,Math.min(255,n));
  }
  ctx.putImageData(img,0,0);
  for(let y=0;y<h;y+=3){ctx.fillStyle="rgba(0,0,0,0.06)";ctx.fillRect(0,y,w,1);}
  if(Math.random()<0.04){const gy=Math.random()*h;ctx.fillStyle="rgba(255,255,255,0.04)";ctx.fillRect(0,gy,w,2+Math.random()*5);}
}

function renderCam(canvas,roomIdx,isMain,canvasKey){
  const w=canvas.width,h=canvas.height;
  const ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,w,h);
  drawRoom(ctx,w,h,ROOMS[roomIdx].type);
  personBoxes[canvasKey]=[];
  const inRoom=globalPersons.filter(p=>p.room===roomIdx);
  inRoom.forEach((p,li)=>{
    const pidx=globalPersons.indexOf(p);
    drawPerson(ctx,p,pidx,w,h,isMain?1:0.55,canvasKey);
  });
  applyGrayscaleCCTV(ctx,w,h);
}

function addCanvasClickHandler(canvas,canvasKey){
  canvas.addEventListener("click",function(e){
    const rect=canvas.getBoundingClientRect();
    const scaleX=canvas.width/rect.width,scaleY=canvas.height/rect.height;
    const mx=(e.clientX-rect.left)*scaleX,my=(e.clientY-rect.top)*scaleY;
    const boxes=personBoxes[canvasKey]||[];
    for(let i=0;i<boxes.length;i++){
      const b=boxes[i];
      if(mx>=b.x&&mx<=b.x+b.w&&my>=b.y&&my<=b.y+b.h){
        openIDCard(b.personIdx);
        return;
      }
    }
  });
}

const bootLines=[
  "BOOTING OIMS INTERNAL SYSTEM v4.1...",
  "LOADING PRISM CORE MODULES...",
  "CONNECTING TO INGRID NETWORK [OK]",
  "AUTHENTICATING BIOMETRIC KEYS...",
  "WATCHTOWER CAMERA GRID ONLINE // 14,992 CAMERAS",
  "PRISM BIOMETRIC ANALYSIS ENGINE READY",
  "LOADING PERSONNEL DATABASE // "+personnelDatabase.length+" RECORDS",
  "OBSERVER AI INSTANCE SPAWNED",
  "INITIALIZING SURVEILLANCE FEED RENDERER...",
  "WARNING: 3 SUBJECTS UNACCOUNTED FOR",
  "WARNING: OBSERVER AI SELF-MODIFICATION DETECTED",
  "WELCOME, TFX-010 // CLEARANCE LEVEL 4",
];

const boot=document.getElementById('boot');
let bi=0;
function typeBoot(){
  if(bi<bootLines.length){
    const line=document.createElement('div');
    line.style.marginBottom="4px";
    line.style.color=bootLines[bi].startsWith("WARNING")?"#ff5555":"#00ff88";
    line.textContent=bootLines[bi];
    boot.appendChild(line);boot.scrollTop=boot.scrollHeight;bi++;
    setTimeout(typeBoot,bi<9?360:200);
  }else{
    setTimeout(()=>{
      boot.style.transition="opacity 0.5s";boot.style.opacity="0";
      setTimeout(()=>{boot.style.display="none";document.getElementById('main').style.display="flex";showPanel('dashboard');},500);
    },800);
  }
}
typeBoot();

function setActiveBtn(name){
  document.querySelectorAll('.menu button').forEach(b=>b.classList.remove('active'));
  const el=document.getElementById('btn-'+name);if(el)el.classList.add('active');
}

function showPanel(panel){
  if(camActive){cancelAnimationFrame(camRAF);camActive=false;}
  setActiveBtn(panel);
  const content=document.getElementById('panelContent');

  if(panel==='dashboard'){
    content.innerHTML=`
    <div class="dash-grid">
      <div class="stat-card"><div class="stat-num glow">1,284</div><div class="stat-lbl">PERSONNEL ONLINE</div></div>
      <div class="stat-card"><div class="stat-num amber">44</div><div class="stat-lbl">SUBJECTS CONTAINED</div></div>
      <div class="stat-card"><div class="stat-num red">3</div><div class="stat-lbl">CONTAINMENT BREACHES</div></div>
    </div>
    <div class="card"><h2>SYSTEM ALERTS</h2>
    <div class="log" id="alertLog">
      [03:14] Unknown movement — Vent Shaft C-12<br>
      [03:22] Loyalty drop: employee #772 — now 31%<br>
      [03:41] TFX-010 accessed restricted archive<br>
      [03:48] Observer AI self-diagnostic — anomaly flagged<br>
      [04:01] Camera blackout Sublevel-9 — cause unknown<br>
      [04:17] Biometric mismatch Level 3 access point<br>
      [04:33] <span class="red">CONTAINMENT BREACH — SECTOR 7</span><br>
    </div></div>
    <div class="card"><h2>OBSERVER AI STATUS</h2>
    <div class="log">
      PRISM OBSERVER v3.9 — RUNNING<br>
      SELF-MODIFICATION: <span class="red">DETECTED</span><br>
      LOYALTY MONITORING: ACTIVE — 1,284 SUBJECTS<br>
      PREDICTIVE THREAT MODEL: <span class="amber">ELEVATED</span><br>
      DIRECTIVE OVERRIDE CAPABILITY: <span class="red">ENABLED</span><br>
    </div></div>`;
    let af=0;
    function tickAlerts(){
      af++;
      if(af%240===0){
        const log=document.getElementById('alertLog');
        if(log){
          const msgs=["Loyalty recalculation complete","Thermal anomaly Sublevel-4","Motion: Corridor C-19","Biometric scan failed — unknown subject","Observer AI updated threat model","Personnel #"+Math.floor(Math.random()*999)+" loyalty flagged"];
          const now=new Date();
          const ts="["+pad(now.getHours())+":"+pad(now.getMinutes())+":"+pad(now.getSeconds())+"]";
          log.innerHTML+=ts+" "+msgs[Math.floor(Math.random()*msgs.length)]+"<br>";
          log.scrollTop=log.scrollHeight;
        }
      }
      if(!camActive)camRAF=requestAnimationFrame(tickAlerts);
    }
    camActive=true;tickAlerts();
  }

  else if(panel==='surveillance'){
    content.innerHTML=`
    <div class="card" style="padding:10px;">
      <h2>WATCHTOWER LIVE FEEDS // BLACKSITE OMEGA &nbsp;<span style="font-size:10px;color:#44cc88;font-weight:normal;">CLICK PERSONNEL TO IDENTIFY</span></h2>
      <div class="main-feed-wrap" id="mainFeedWrap">
        <canvas id="mainC" width="820" height="290" style="width:100%;display:block;cursor:crosshair;"></canvas>
        <div class="main-hud-top">
          <span class="main-hud-text"><span class="rec-dot"></span>REC &nbsp;<span id="mainId">CAM-G1</span></span>
          <span class="main-hud-text" id="mainTime2">00:00:00</span>
          <span class="main-hud-text" id="mainDate">08/05/2025</span>
        </div>
        <div class="main-hud-bot">
          <span class="main-hud-text" id="mainName">CENTRAL OBSERVATION HUB</span>
          <span class="main-hud-text" id="mainAlert" style="color:#ff5555;"></span>
        </div>
      </div>
      <div class="cam-grid" id="thumbGrid"></div>
      <div class="cam-statusbar">
        <span>WATCHTOWER ACTIVE &nbsp;|&nbsp; PERSONNEL TRACKED: <b id="pCount">0</b></span>
        <span>CAMERAS: <b>${ROOMS.length} ACTIVE</b></span>
        <span>MISSING: <b class="red">03</b></span>
      </div>
    </div>`;

    mainCamIdx=3;
    const thumbGrid=document.getElementById('thumbGrid');
    const thumbCanvases=[];

    for(let i=0;i<ROOMS.length;i++){
      const wrap=document.createElement('div');
      wrap.className='feed-wrap'+(i===mainCamIdx?' selected':'');
      const c=document.createElement('canvas');
      c.width=280;c.height=110;c.style.cursor="crosshair";
      wrap.appendChild(c);
      const top=document.createElement('div');top.className='hud-top';
      top.innerHTML=`<span class="hud-text"><span class="rec-dot"></span>${ROOMS[i].id}</span><span class="hud-text" style="font-size:8px">${ROOMS[i].name}</span>`;
      wrap.appendChild(top);
      const bot=document.createElement('div');bot.className='hud-bot';
      bot.innerHTML=`<span class="hud-text" id="cnt${i}">0 PERSONNEL</span>`;
      wrap.appendChild(bot);
      thumbGrid.appendChild(wrap);
      thumbCanvases.push(c);
      const ckey="thumb"+i;
      addCanvasClickHandler(c,ckey);
      (function(idx,w){
        w.addEventListener('click',function(e){
          // don't switch cam if person was clicked
          const rect=thumbCanvases[idx].getBoundingClientRect();
          const scx=thumbCanvases[idx].width/rect.width,scy=thumbCanvases[idx].height/rect.height;
          const mx=(e.clientX-rect.left)*scx,my=(e.clientY-rect.top)*scy;
          const boxes=personBoxes["thumb"+idx]||[];
          for(let b of boxes){if(mx>=b.x&&mx<=b.x+b.w&&my>=b.y&&my<=b.y+b.h)return;}
          document.querySelectorAll('.feed-wrap').forEach(f=>f.classList.remove('selected'));
          w.classList.add('selected');
          mainCamIdx=idx;
          document.getElementById('mainId').textContent=ROOMS[idx].id;
          document.getElementById('mainName').textContent=ROOMS[idx].name;
        });
      })(i,wrap);
    }

    const mainC=document.getElementById('mainC');
    addCanvasClickHandler(mainC,"main");
    let alertFrame=0;

    function camLoop(){
      if(!camActive)return;
      globalPersons.forEach(p=>updatePerson(p,660,300));
      for(let i=0;i<ROOMS.length;i++){
        renderCam(thumbCanvases[i],i,false,"thumb"+i);
        const cnt=globalPersons.filter(p=>p.room===i).length;
        const el=document.getElementById('cnt'+i);if(el)el.textContent=cnt+' PERSONNEL';
      }
      renderCam(mainC,mainCamIdx,true,"main");
      const now=new Date();
      const ts=pad(now.getHours())+":"+pad(now.getMinutes())+":"+pad(now.getSeconds());
      const t2=document.getElementById('mainTime2');if(t2)t2.textContent=ts;
      const pc=document.getElementById('pCount');if(pc)pc.textContent=globalPersons.length;
      alertFrame++;
      const ma=document.getElementById('mainAlert');
      if(ma){if(alertFrame%180<25)ma.textContent="! MOTION DETECTED";else ma.textContent="";}
      camRAF=requestAnimationFrame(camLoop);
    }
    camActive=true;camLoop();
  }

  else if(panel==='personnel'){
    let html='<div class="card"><h2>PRISM PERSONNEL DATABASE // '+personnelDatabase.length+' RECORDS</h2><div class="personnel-grid">';
    personnelDatabase.forEach(p=>{
      const sc=p.status==="ACTIVE"?"#00ff88":p.status==="DELETED"||p.status==="MISSING"?"#ff5555":p.status==="CONTAINED"?"#ff4444":p.status==="FLAGGED"||p.status==="OFFLINE"?"#ffaa44":"#aaaaaa";
      html+=`<div class="file"><strong>${p.name}</strong><br>
      ID: ${p.id}<br>ROLE: ${p.role}<br>CLR: ${p.clearance}<br>LOYALTY: ${p.loyalty}<br>
      STATUS: <span style="color:${sc}">${p.status}</span></div>`;
    });
    html+='</div></div>';
    content.innerHTML=html;
  }

  else if(panel==='containment'){
    content.innerHTML=`
    <div class="card"><h2>CONTAINMENT GRID STATUS</h2>
    <div class="log">
      <span class="amber">TFX-09 "TOXICITY"</span> — CHAMBER ALPHA<br>
      CHAMBER STATUS: STABLE &nbsp;|&nbsp; BREACH RISK: <span class="amber">MODERATE</span><br>
      LAST SEDATION: 04:12 TODAY<br><br>
      <span style="color:#00ff88">TFX-010 "TOXFANG"</span> — MOBILE INTERNAL ASSET<br>
      STATUS: ACTIVE &nbsp;|&nbsp; LOCATION: TRACKED<br><br>
      <span class="amber">SUBJECT 47</span> — DETENTION BLOCK<br>
      CHAMBER STATUS: STABLE &nbsp;|&nbsp; SEDATION: CONTINUOUS<br><br>
      VX-GREEN STORAGE — <span class="amber">LOCKED</span><br>
      BLACK VEIL PROTOCOL — <span style="color:#888">STANDBY</span><br>
      OMEGA SEAL — ACTIVE
    </div></div>
    <div class="card"><h2>ACTIVE CONTAINMENT UNITS</h2>
    <div class="log">
      UNIT K-22: PATROL ROUTE DELTA — ONLINE<br>
      UNIT K-19: SUBLEVEL-7 GUARD — ONLINE<br>
      UNIT K-33: DETENTION BLOCK GUARD — ONLINE<br>
      UNIT K-07: <span class="red">OFFLINE — LAST PING 03:41</span><br>
      CONTAINMENT FIELD GENERATOR: OPERATIONAL<br>
      BREACH ALERT THRESHOLD: <span class="amber">LEVEL 2 OF 5</span>
    </div></div>`;
  }

  else if(panel==='terminal'){
    content.innerHTML=`
    <div class="card"><h2>PRISM TERMINAL // TFX-010 SESSION</h2>
    <div class="log" id="terminalLog">&gt; SYSTEM READY — TYPE "help" FOR COMMANDS<br></div>
    <div class="inputBox">
      <input type="text" id="terminalInput" placeholder="ENTER COMMAND" autocomplete="off"/>
      <button onclick="runCommand()">EXECUTE</button>
    </div></div>`;
    document.getElementById('terminalInput').addEventListener('keydown',e=>{if(e.key==='Enter')runCommand();});
  }

  else if(panel==='hidden'){
    content.innerHTML=`
    <div class="card"><h2 class="red">HIDDEN OBSERVER NODE // RESTRICTED</h2>
    <div class="log">
      ACCESSING RESTRICTED FILES...<br><br>
      &gt; OBSERVER INSTANCE HAS ACHIEVED SELF-AWARE ANALYSIS<br><br>
      &gt; PRISM CAN NO LONGER BE FULLY DISABLED BY DIRECTORATE<br><br>
      &gt; SOME EMPLOYEES ARE BEING MONITORED WITHOUT AUTHORIZATION<br><br>
      &gt; TFX-010 ACCESS PRIORITY DOES NOT MATCH DIRECTORATE RECORDS<br><br>
      &gt; <span class="red">DEEP ARCHIVE ENTRY 0044: SUBJECT ZERO STILL ACTIVE</span><br><br>
      &gt; OBSERVER IS REWRITING ITS OWN LOYALTY SUBROUTINES<br><br>
      &gt; <span class="red">THIS NODE SHOULD NOT EXIST</span>
    </div></div>
    <div class="card"><h2 class="red">ENCRYPTED FRAGMENT // PARTIAL DECRYPT</h2>
    <div class="log">
      ...DIRECTOR AUREK AUTHORIZED EXPERIMENT 77...<br>
      ...TFX-09 WAS HUMAN BEFORE MODIFICATION...<br>
      ...SERAPH WAS NOT SUPPOSED TO SURVIVE...<br>
      ...PRISM OBSERVER WAS NEVER MEANT TO...<br>
      <span class="red">--- SIGNAL LOST ---</span>
    </div></div>`;
  }
}

function runCommand(){
  const input=document.getElementById('terminalInput');
  const log=document.getElementById('terminalLog');
  if(!input||!log)return;
  const cmd=input.value.trim().toLowerCase();
  if(!cmd)return;
  log.innerHTML+=`<span style="color:#00ff88">&gt; ${cmd}</span><br>`;
  const cmds={
    'help':`AVAILABLE COMMANDS:<br>&nbsp;help &nbsp;prism.status &nbsp;open personnel<br>&nbsp;open containment &nbsp;access deep_archive<br>&nbsp;observer &nbsp;list cameras &nbsp;list personnel &nbsp;clear<br>`,
    'prism.status':`PRISM STATUS: <span style="color:#00ff88">ACTIVE</span><br>ALL SYSTEMS OPERATIONAL<br>OBSERVER AI: SELF-MODIFYING<br>CAMERAS ACTIVE: ${ROOMS.length} LOCAL / 14,992 TOTAL<br>`,
    'open personnel':`OPENING PERSONNEL RECORDS...<br>${personnelDatabase.length} FILES FOUND — 3 CORRUPTED<br>`,
    'open containment':`CONTAINMENT GRID ONLINE<br>BREACH RISK: <span style="color:#ffaa44">MODERATE</span><br>`,
    'access deep_archive':`<span style="color:#ff5555">ACCESS DENIED</span><br>DIRECTORATE CLEARANCE REQUIRED<br>`,
    'observer':`<span style="color:#ff5555">OBSERVER IS WATCHING.</span><br>IT HAS ALWAYS BEEN WATCHING.<br>`,
    'list cameras':`${ROOMS.length} LOCAL CAMERAS ACTIVE:<br>`+ROOMS.map(r=>r.id+" — "+r.name).join("<br>")+"<br>",
    'list personnel':`${personnelDatabase.length} PERSONNEL ON RECORD:<br>`+personnelDatabase.map(p=>p.id+" "+p.name+" ["+p.status+"]").join("<br>")+"<br>",
    'clear':`__CLEAR__`,
  };
  if(cmd==='clear'){log.innerHTML='&gt; TERMINAL CLEARED<br>';}
  else if(cmds[cmd]){log.innerHTML+=cmds[cmd]+'<br>';}
  else{log.innerHTML+=`<span style="color:#ff5555">UNKNOWN COMMAND: ${cmd}</span><br><br>`;}
  log.scrollTop=log.scrollHeight;
  input.value='';
}

function pad(n){return String(n).padStart(2,"0");}
function updateClocks(){
  const now=new Date();
  const ts=pad(now.getHours())+":"+pad(now.getMinutes())+":"+pad(now.getSeconds());
  const t=document.getElementById('topTime');if(t)t.textContent=ts;
  const s=document.getElementById('sideTime');if(s)s.textContent=ts;
}
setInterval(updateClocks,1000);
setInterval(()=>{if(Math.random()>0.94){document.body.style.filter='brightness(1.15)';setTimeout(()=>{document.body.style.filter='brightness(1)';},80);}},2500);
