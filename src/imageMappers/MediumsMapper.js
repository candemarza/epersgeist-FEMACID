import lolo from "../assets/lolo.png";
import olol from "../assets/olol.png";
import pancho from "../assets/pancho.jpg";
import fabi from "../assets/fabi.jpg";
import ivar from "../assets/ivar.jpg";
import tobi from "../assets/tobi.png";
import ale from "../assets/ale.jpg";
import iancho from "../assets/iancho.jpg";
import defaultImg from "../assets/medium.png";

const mediumImgs = {
  lolo,
  olol,
  ale,
  pancho,
  fabi,
  tobi,
  ivar,
  iancho,
};

export function getMediumImg(nombre) {
  const key = nombre.trim().toLowerCase();
  return mediumImgs[key] || defaultImg;
}
