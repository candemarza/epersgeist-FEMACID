import axios from 'axios';

const server = 'http://localhost:8080/';

// ubicacion
const getUbicacionById = (id) => axios.get(`${server}ubicacion/${id}`)
const createUbicacion = (body) => axios.post(`${server}ubicacion`, body)
const updateUbicacion = (id, body) => axios.put(`${server}ubicacion/${id}`, body)
const deleteUbicacion = (id) => axios.delete(`${server}ubicacion/${id}`)
const getUbicaciones = () => axios.get(`${server}ubicacion`)
const espiritusEn = (idUbicacion) => axios.get(`${server}ubicacion/${idUbicacion}/espiritus`)
const mediumsSinEspiritusEn = (idUbicacion) => axios.get(`${server}ubicacion/${idUbicacion}/mediumsSinEspiritus`)

// espiritu
const getEspirituById = (id) => axios.get(`${server}espiritu/${id}`)
const createEspiritu = (body) => axios.post(`${server}espiritu`, body)
const updateEspiritu = (id, body) => axios.put(`${server}espiritu/${id}`, body)
const deleteEspiritu = (id) => axios.delete(`${server}espiritu/${id}`)
const getEspiritus = () => axios.get(`${server}espiritu`)
const conectarEspiritu = (idEspiritu, idMedium) => axios.put(`${server}espiritu/${idEspiritu}/conectar/${idMedium}`)
const espiritusDemoniacos = (page) => axios.get(`${server}espiritu/espiritusDemoniacos?dir=asc&page=${page}&pageSize=6`)

// medium
const getMediumById = (id) => axios.get(`${server}medium/${id}`)
const createMedium = (body) => axios.post(`${server}medium`, body)
const updateMedium = (id, body) => axios.put(`${server}medium/${id}`, body)
const deleteMedium = (id) => axios.delete(`${server}medium/${id}`)
const getMediums = () => axios.get(`${server}medium`)
const descansarMedium = (idMedium) => axios.put(`${server}medium/${idMedium}/descansar`)
const exorcizar = (idMediumExorcista, idMediumPoseido) => axios.put(`${server}medium/${idMediumExorcista}/exorcizar/${idMediumPoseido}`)
const espiritusDeMedium = (idMedium) => axios.get(`${server}medium/${idMedium}/espiritus`)
const invocarEspiritu = (idMedium, idEspiritu) => axios.put(`${server}medium/${idMedium}/invocar/${idEspiritu}`)
const moverMedium = (idMedium, idUbicacion) => axios.put(`${server}medium/${idMedium}/mover/${idUbicacion}`)

// estadistica
const getSantuarioMasCorrupto = () => axios.get(`${server}estadistica/santuarioCorrupto`)

//realidades
const getRealidades = () => axios.get(`${server}realidadParalela`)
const getRealidadById = (id) => axios.get(`${server}realidadParalela/${id}`)
const getLineaTemporal = (id) => axios.get(`${server}realidadParalela/${id}/lineaTemporal`)
const getCorrupcion = (id) => axios.get(`${server}realidadParalela/${id}/corrupcion`)
const simularDominacion = (idRealidad, dominanteId, dominadoId) => axios.put(`${server}realidadParalela/${idRealidad}/simularDominar/${dominanteId}/${dominadoId}`)


export default {
    // ubicacion
    getUbicacionById,
    createUbicacion,
    updateUbicacion,
    deleteUbicacion,
    getUbicaciones,
    espiritusEn,
    mediumsSinEspiritusEn,

    // espiritu
    getEspirituById,
    createEspiritu,
    updateEspiritu,
    deleteEspiritu,
    getEspiritus,
    conectarEspiritu,
    espiritusDemoniacos,

    // medium
    getMediumById,
    createMedium,
    updateMedium,
    deleteMedium,
    getMediums,
    descansarMedium,
    exorcizar,
    espiritusDeMedium,
    invocarEspiritu,
    moverMedium,

    // estadistica
    getSantuarioMasCorrupto,

    //realidades
    getRealidades,
    getRealidadById,
    getLineaTemporal,
    getCorrupcion,
    simularDominacion
}