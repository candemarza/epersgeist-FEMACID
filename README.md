## Requisito
Tener instalado [Node.js](https://nodejs.org/en) en la maquina local.

## Instalacion
### 🌸 Clonar el reposiotirio usando el comando:
```bash
git clone https://github.com/candemarza/epersgeist-FEMACID.git
```
### 🌸  Navega al directorio del proyecto usando el comando:
```bash
cd unq-ui-candela-marzaroli-trabajo-final
```
### 🌸  Instalar dependencias usando el comando:
```bash
npm install
```

## Comenzar
### 🌼  Correr usando el comando:
```bash
npm run dev
```
### 🌼 [Listo!](http://localhost:5173/)
El juego estara disponible en el puerto 5173, si ese pueto esta en uso se levantara en otro puerto disponible


Para que funcione tienen que agregar en los controllers @CrossOrigin(origins = "http://localhost:5173")
(o el puerto que se levante react, x default es esa pero puede fallar)
