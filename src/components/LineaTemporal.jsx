import { GiDevilMask, GiAngelOutfit } from "react-icons/gi";

const LineaTemporal = ({ eventos }) => {
   return (
      <div className="timeline-vertical-container">
         <div className="timeline-vertical-line" />
         {eventos.map((evento, index) => (
            <EventoCard key={index} evento={evento} index={index} />
         ))}
      </div>
   );
};

const EventoCard = ({ evento, index }) => {
   const esTrigger = (tipo) => tipo.startsWith("T");
   const esDemoniaco = (tipo) => tipo.endsWith("M");

   const side = index % 2 === 0 ? "left" : "right";

   return (
      <div className={`timeline-event-row ${side}`}>
         <div className={`timeline-event-dot ${esTrigger(evento.tipo) ? "trigger" : "whatif"}`} />
         <div
            className={`timeline-event-card ${esTrigger(evento.tipo) ? "trigger" : "whatif"}`}
         >
            {esDemoniaco(evento.tipo) ? (
               <GiDevilMask className="items-list-icon" />
            ) : (
               <GiAngelOutfit className="items-list-icon" />
            )}
            <div>
               <span className={`evento-espiritu ${esTrigger(evento.tipo) ? "trigger" : "whatif"}`}>{evento.nombreDominante}</span>
               <span className="evento-accion"> domina a </span>
               <span className={`evento-espiritu ${esTrigger(evento.tipo) ? "trigger" : "whatif"}`}>{evento.nombreDominado}</span>
            </div>
         </div>
      </div>
   );
};

export default LineaTemporal;