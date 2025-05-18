import lolo from '../assets/lolo.png';
import olol from '../assets/olol.png';
import defaultImg from '../assets/medium.png';


const mediumImgs ={
   lolo,
   olol,
};

export function getMediumImg(nombre) {
    const key = nombre.trim().toLowerCase();
    return mediumImgs[key] || defaultImg;
}