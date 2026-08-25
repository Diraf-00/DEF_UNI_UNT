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

  const autoridades = {
    nombre: "Dra. Vilma Méndez Gil",
    cargo: "Defensora Universitaria",
    descripcion:
      "Licenciada en Física. Maestra en docencia universitaria. Doctora en Ciencias e Ingeniería, past. Vicerrectora Académica UNT. Con amplia experiencia académica, trayectoria en gestión de conflictos y promoción de los derechos humanos dentro del ámbito universitario.",
  };

  // Fixed maximum page width to match banner/content

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ maxWidth: "1050px", margin: "0 auto", width: "100%" }}>


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
            backgroundColor: "#ffffffff",
          }}
        >
          {/* Modificado: Se añade un grid responsivo (1 columna en móvil, 2 en pantallas medianas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Columna Izquierda: Texto */}
            <div className="space-y-4">
              <h2
                className="section-title"
                style={{ color: colors.darkBlue, fontSize: "3rem", marginBottom: "0" }}
              >
                ¿Quiénes somos?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                La Defensoría Universitaria es un órgano <strong>autónomo e independiente</strong> de los órganos de gobierno,
                encargado de tutelar los derechos y velar por los intereses de los <strong>estudiantes, docentes y administrativos</strong>,
                garantizando el principio de autoridad responsable
                <br />
                <br />
                Su labor se orienta a la <strong>conciliación y mediación</strong>, promoviendo la armonía y
                el respeto dentro de la Universidad Nacional de Trujillo.
              </p>
            </div>

            {/* Columna Derecha: Nueva Imagen */}
            <div className="flex justify-center w-full">
              <img
                src="/images/quienes_somos.png"
                alt="¿Quiénes somos? - Defensoria Universitaria"
                className="w-full h-full object-cover min-h-[250px] md:min-h-[250px] mix-blend-multiply"
              />
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

            <h3 className="text-xl font-bold text-gray-800">Autoridad</h3>
          </div>

          {/* CAMBIO 2: Cambiado a 'sm:flex-row' y 'sm:items-start'
            para forzar el layout horizontal en pantallas más pequeñas
            y alinear el texto al inicio (arriba).
          */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-8">
            <img
              src="/images/dra_vilma.png"
              alt="Defensora Universitaria"
              className="object-cover rounded-xl shadow-lg flex-shrink-0"
              style={{ width: "275px", height: "275px" }}
            />

            <div
              className="value-item"
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

              <p className="text-sm text-gray-700">{autoridades.descripcion}</p>
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
                Ser un referente nacional en la defensa de los derechos de la comunidad universitaria.
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

            <h3 className="text-xl font-bold text-gray-800">
              Valores y Principios
            </h3>
          </div>

          <div className="values-grid">
            {[
              {
                title: "Independencia y autonomía",
                text: "Cuenta con autonomía funcional.",
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
                text: "Actúa ante la omisión funcional de otras instancias.",
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