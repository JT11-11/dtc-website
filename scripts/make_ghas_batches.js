import fs from 'fs';
const lock=JSON.parse(fs.readFileSync('package-lock.json','utf8'));
const pkgs=lock.packages||{};
const seen=new Set();
const list=[];
for(const [path,info] of Object.entries(pkgs)){
  if(!info||!info.version) continue;
  if(path==='') continue;
  const idx=path.lastIndexOf('node_modules/');
  if(idx===-1) continue;
  const name=path.slice(idx+'node_modules/'.length);
  const key=name+'@'+info.version;
  if(seen.has(key)) continue;
  seen.add(key);
  list.push({ecosystem:'npm',name,version:info.version});
}
list.sort((a,b)=>a.name.localeCompare(b.name)||a.version.localeCompare(b.version));
fs.mkdirSync('.ghas',{recursive:true});
for(let i=0;i<list.length;i+=30){
  const chunk=list.slice(i,i+30);
  fs.writeFileSync('.ghas/batch_'+i+'.json',JSON.stringify(chunk,null,2));
}
console.log('wrote', Math.ceil(list.length/30), 'batches to .ghas/');
