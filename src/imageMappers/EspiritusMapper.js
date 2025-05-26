import banette from '../assets/ESPIRITUS/banette.png';
import bezos from '../assets/ESPIRITUS/bezos.png';
import boo from '../assets/ESPIRITUS/boo.png';
import casper from '../assets/ESPIRITUS/casper.png';
import chupacabras from '../assets/ESPIRITUS/chupacabras.png';
import corsola from '../assets/ESPIRITUS/corsola.png';
import crowleygo from '../assets/ESPIRITUS/crowley-go.png';
import crowleysp from '../assets/ESPIRITUS/crowley-sp.png';
import decidueye from '../assets/ESPIRITUS/decidueye.png';
import deogen from '../assets/ESPIRITUS/deogen.png';
import dreepy from '../assets/ESPIRITUS/dreepy.png';
import duskull from '../assets/ESPIRITUS/duskull.png';
import elon from '../assets/ESPIRITUS/elon.jpg';
import ghastly from '../assets/ESPIRITUS/ghastly.png';
import gengar from '../assets/ESPIRITUS/gengar.png';
import git from '../assets/ESPIRITUS/git.png';
import jellicent from '../assets/ESPIRITUS/jellicent.png';
import mawile from '../assets/ESPIRITUS/mawile.png';
import mimikyu from '../assets/ESPIRITUS/mimikyu.png';
import myrtle from '../assets/ESPIRITUS/myrtle.png';
import postman from '../assets/ESPIRITUS/postman.png';
import skeledirge from '../assets/ESPIRITUS/skeledirge.png';
import yokai from '../assets/ESPIRITUS/yokai.png';
import angelical from '../assets/demoniaco.jpg';
import demoniaco from '../assets/demoniaco.jpg';


const espirituImgs ={
    banette,
    bezos,
    boo,
    casper,
    chupacabras,
    corsola,
    crowleygo,
    crowleysp,
    decidueye,
    deogen,
    dreepy,
    duskull,
    elon,
    ghastly,
    gengar,
    git,
    jellicent,
    mawile,
    mimikyu,
    myrtle,
    postman,
    skeledirge,
    yokai
};

export function getEspirituImg(nombre, id, tipo) {
    if (nombre.toLowerCase() === "crowley" ){
        return (id % 2 == 0) ? crowleygo : crowleysp;
    }
    const key = nombre.trim().toLowerCase();
    const defaultImg = tipo === "angelical" ? angelical : demoniaco;
    return espirituImgs[key] || defaultImg;
}