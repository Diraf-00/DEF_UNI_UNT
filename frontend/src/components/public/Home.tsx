import { Shield, Scale, HeartHandshake, FileText, UserCheck } from "lucide-react";

export function Home() {
  const colors = {
    darkBlue: "#132746",
    blue: "#193D73",
    orange: "#FF904E",
    paper: "#F3F3F1",
    gold: "#e6ad09",
    warmYellow: "#FFBC59",
  };

  const quienessomos = `La Defensoría Universitaria es un órgano autónomo e independiente de los órganos de gobierno, encargado de tutelar los derechos de los miembros de la comunidad universitaria, garantizando el principio de autoridad responsable. Su labor se orienta a la conciliación y mediación, promoviendo la armonía y el respeto dentro de la Universidad Nacional de Trujillo.`;

  const autoridades = {
    nombre: "Dra. Vilma Méndez Gil",
    cargo: "Defensora Universitaria",
    descripcion:
      "Doctora en Derecho, con amplia trayectoria en gestión de conflictos y promoción de los derechos humanos dentro del ámbito universitario.",
  };

  // Fixed maximum page width to match banner/content

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ maxWidth: "1050px", margin: "0 auto", width: "100%" }}>
  {/* Banner superior */}
      <section>
        <div style={{ maxWidth: "1050px", margin: "0 auto", width: "100%" }}>
          <img
            src="/images/banner-defensoria.webp"
            alt="Banner Defensoría Universitaria"
            className="w-full h-44 md:h-64 lg:h-80 object-cover"
            style={{ display: "block", width: "100%", maxWidth: "1050px", margin: "0 auto" }}
          />
        </div>
      </section>

      {/* CAMBIO 1: Añadido 'max-w-6xl' para limitar el ancho máximo
        del contenido y evitar que se "estire" en pantallas grandes.
      */}
  <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 mt-10 space-y-16 pb-24">
        <style>{`
          :root{--panel-radius:16px;--panel-padding:1.75rem}
          .colored-card{border-radius:var(--panel-radius);padding:var(--panel-padding);box-shadow:0 8px 25px rgba(15,23,42,0.08);transition:transform .2s ease, box-shadow .2s ease}
          .colored-card:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(15,23,42,0.12)}
          .section-title{font-size:1.75rem;font-weight:800;margin-bottom:1rem}
          .icon-circle{width:3.5rem;height:3.5rem;border-radius:9999px;display:flex;align-items:center;justify-content:center;color:white;flex-shrink:0}
          .values-grid{display:grid;grid-template-columns:1fr;gap:1rem}
          @media(min-width:768px){.values-grid{grid-template-columns:repeat(3,1fr)}}
          .value-item{padding:1.25rem;border-radius:12px;color:#0f172a;display:flex;flex-direction:column;gap:.5rem;transition:background .3s ease}
        `}</style>

        {/* BLOQUE 1: ¿Quiénes somos? */}
        <section
          className="p-6 md:p-8 rounded-2xl shadow-lg"
          style={{
            backgroundColor: colors.paper,
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div>
              <h2
                className="section-title"
                style={{ color: colors.darkBlue, fontSize: "1.5rem" }}
              >
                ¿Quiénes somos?
              </h2>
              <p className="text-gray-700 leading-relaxed">{quienessomos}</p>
            </div>
          </div>
        </section>

        {/* BLOQUE 2: Autoridades */}
        <section
          className="p-6 md:p-8 rounded-2xl shadow-lg"
          style={{
            backgroundColor: colors.paper,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-orange-500 w-6 h-6" />
            <h3 className="text-xl font-bold text-gray-800">Autoridad</h3>
          </div>

          {/* CAMBIO 2: Cambiado a 'sm:flex-row' y 'sm:items-start'
            para forzar el layout horizontal en pantallas más pequeñas
            y alinear el texto al inicio (arriba).
          */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-8">
            <img
              src="/images/defensor-universitario.webp"
              alt="Defensora Universitaria"
              className="w-44 h-44 md:w-56 md:h-56 object-cover rounded-xl shadow-lg flex-shrink-0"
            />

            <div
              className="value-item" // Quitado 'w-full'
              style={{
                borderLeft: `4px solid #193D73`,
                backgroundColor: `#193D7315`,
              }}
            >
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{autoridades.nombre}</h4>
              </div>
              <p className="font-medium" style={{ color: colors.orange }}>
                {autoridades.cargo}
              </p>

              <p className="text-sm text-gray-700">
                {autoridades.descripcion}
              </p>
            </div>
          </div>
        </section>

        {/* BLOQUE 3: Misión y Visión */}
        <section
          className="p-6 md:p-8 rounded-2xl shadow-lg"
          style={{
            backgroundColor: colors.paper,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-orange-500 w-6 h-6" />
            <h3 className="text-xl font-bold text-gray-800">Misión y Visión</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="value-item"
              style={{
                borderLeft: `4px solid #193D73`,
                backgroundColor: `#193D7315`,
              }}
            >
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">Misión</h4>
              </div>
              <p className="text-sm text-gray-700">
                Regular y desarrollar el funcionamiento de la Defensoría
                Universitaria, salvaguardando los derechos individuales y
                promoviendo la equidad y la justicia.
              </p>
            </div>

            <div
              className="value-item"
              style={{
                borderLeft: `4px solid #FF904E`,
                backgroundColor: `#FF904E15`,
              }}
            >
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">Visión</h4>
              </div>
              <p className="text-sm text-gray-700">
                Ser un referente nacional en la defensa de los derechos
                universitarios.
              </p>
            </div>
          </div>
        </section>

        {/* BLOQUE 4: Valores y Principios */}
        <section
          className="p-6 md:p-8 rounded-2xl shadow-lg"
          style={{
            backgroundColor: colors.paper,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Scale className="text-blue-600 w-6 h-6" />
            <h3 className="text-xl font-bold text-gray-800">
              Valores y Principios
            </h3>
          </div>

          <div className="values-grid">
            {[
              {
                title: "Independencia y autonomía",
                text: "No recibe instrucciones de ninguna autoridad.",
                color: colors.gold,
                icon: <Shield className="text-yellow-600 w-5 h-5" />,
              },
              {
                title: "Imparcialidad",
                text: "Actúa sin sesgos ni intereses personales.",
                color: colors.blue,
                icon: <Scale className="text-blue-600 w-5 h-5" />,
              },
              {
                title: "Confidencialidad",
                text: "Garantiza reserva de información y protección de datos personales.",
                color: colors.warmYellow,
                icon: <HeartHandshake className="text-orange-500 w-5 h-5" />,
              },
              {
                title: "Supletoriedad",
                text: "Aplica los principios del procedimiento administrativo general.",
                color: colors.orange,
                icon: <FileText className="text-orange-600 w-5 h-5" />,
              },
              {
                title: "Autoridad responsable",
                text: "Promueve la idoneidad y responsabilidad de las autoridades universitarias.",
                color: colors.gold,
                icon: <UserCheck className="text-yellow-600 w-5 h-5" />,
              },
              {
                title: "Equidad y enfoque de género",
                text: "Atención justa, inclusiva y sin discriminación.",
                color: colors.blue,
                icon: <HeartHandshake className="text-blue-600 w-5 h-5" />,
              },
            ].map((v, i) => (
              <div
                key={i}
                className="value-item"
                style={{
                  borderLeft: `4px solid ${v.color}`,
                  backgroundColor: `${v.color}15`,
                }}
              >
                <div className="flex items-center gap-2">
                  {v.icon}
                  <h4 className="font-semibold">{v.title}</h4>
                </div>
                <p className="text-sm text-gray-700">{v.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}