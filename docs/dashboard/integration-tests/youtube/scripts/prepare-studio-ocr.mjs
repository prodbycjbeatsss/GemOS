import {mkdirSync,copyFileSync} from 'node:fs';
const dest=new URL('../public/ocr/',import.meta.url);mkdirSync(dest,{recursive:true});
for(const name of ['tesseract.min.js','worker.min.js','tesseract.min.js.LICENSE.txt','worker.min.js.LICENSE.txt'])copyFileSync(new URL('../node_modules/tesseract.js/dist/'+name,import.meta.url),new URL(name,dest));
for(const name of ['tesseract-core-lstm.wasm.js','tesseract-core-simd-lstm.wasm.js','tesseract-core-relaxedsimd-lstm.wasm.js'])copyFileSync(new URL('../node_modules/tesseract.js-core/'+name,import.meta.url),new URL(name,dest));
copyFileSync(new URL('../node_modules/tesseract.js-core/LICENSE',import.meta.url),new URL('core-LICENSE',dest));
copyFileSync(new URL('../node_modules/@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz',import.meta.url),new URL('eng.traineddata.gz',dest));
