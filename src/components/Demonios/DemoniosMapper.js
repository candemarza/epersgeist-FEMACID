import banette from '../../assets/DEMONS/banette.png';
import bezos from '../../assets/DEMONS/bezos.png';
import boo from '../../assets/DEMONS/boo.png';
import casper from '../../assets/DEMONS/casper.png';
import chupacabras from '../../assets/DEMONS/chupacabras.png';
import corsola from '../../assets/DEMONS/corsola.png';
import crowleygo from '../../assets/DEMONS/crowley-go.png';
import crowleysp from '../../assets/DEMONS/crowley-sp.png';
import decidueye from '../../assets/DEMONS/decidueye.png';
import deogen from '../../assets/DEMONS/deogen.png';
import dreepy from '../../assets/DEMONS/dreepy.png';
import duskull from '../../assets/DEMONS/duskull.png';
import elon from '../../assets/DEMONS/elon.jpg';
import ghastly from '../../assets/DEMONS/ghastly.png';
import gengar from '../../assets/DEMONS/gengar.png';
import git from '../../assets/DEMONS/git.png';
import jellicent from '../../assets/DEMONS/jellicent.png';
import mawile from '../../assets/DEMONS/mawile.png';
import mimikyu from '../../assets/DEMONS/mimikyu.png';
import myrtle from '../../assets/DEMONS/myrtle.png';
import postman from '../../assets/DEMONS/postman.png';
import skeledirge from '../../assets/DEMONS/skeledirge.png';
import yokai from '../../assets/DEMONS/yokai.png';
import defaultImg from '../../assets/demoniaco.jpg';


const demonioImgs ={
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

export function getDemonioImg(nombre, id) {
    if (!nombre) return defaultImg;
    if (nombre.toLowerCase() === "crowley" ){
        return (id % 2 == 0) ? crowleygo : crowleysp;
    }
    const key = nombre.trim().toLowerCase();
    return demonioImgs[key] || defaultImg;
}