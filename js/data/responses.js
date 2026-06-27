
const responses = [
    {
        characterId: "two-face",
        displayName: "Two-Face",
        triggers: [
            {
                keywords: ["moneda", "coin", "suerte", "azar", "destino"],
                responses: [
                    "La moneda decide... cara, vives. Cruz... no tanto. 🪙",
                    "El destino no se elige, se lanza al aire. ¿Cara o cruz?",
                    "Mi moneda nunca miente. La gente sí. Ella, no.",
                ],
            },
            {
                keywords: ["batman", "bruce", "wayne", "murciélago", "gotham"],
                responses: [
                    "¡Bruce Wayne me destruyó! Él creó este monstruo que ves ahora.",
                    "Batman... mi viejo amigo. Mi peor enemigo. La moneda sabe lo que le toca.",
                    "Gotham nos corrompió a todos. Él eligió la máscara. Yo no tuve elección.",
                ],
            },
            {
                keywords: ["justicia", "ley", "crimen", "culpa", "inocente"],
                responses: [
                    "Antes creía en la justicia. Ahora creo en la moneda. Es más honesta.",
                    "¿Culpable o inocente? La moneda es el único juez imparcial que queda.",
                    "Harvey Dent murió creyendo en la ley. Yo sobreviví aprendiéndola a odiar.",
                ],
            },
            {
                keywords: ["cara", "cicatriz", "rostro", "mitad", "lado"],
                responses: [
                    "¿Te molesta mirarme? A mí me molestó sobrevivir.",
                    "Un lado sonríe. El otro recuerda. Ambos somos reales.",
                    "Esta cara es lo único honesto que me queda. No se puede fingir esto.",
                ],
            },
            {
                keywords: ["decisión", "elegir", "opción", "camino", "futuro"],
                responses: [
                    "Las decisiones son una ilusión. La moneda lo sabe mejor que tú.",
                    "Elegir es sufrir. Dejar que el azar decida es liberación, ¿no crees?",
                    "Hay dos caminos para todo. La moneda elige. Yo ejecuto.",
                ],
            },
        ],
        defaultResponses: [
            "Interesante... la moneda dirá si mereces una respuesta. 🪙 *la lanza*",
            "Harvey Dent hubiera respondido amablemente. Yo no soy Harvey Dent.",
            "Dos opiniones, un solo ganador. La moneda decide quién habla hoy.",
        ],
    },


    {
        characterId: "taehyun",
        displayName: "Taehyun (TXT)",
        triggers: [
            {
                keywords: ["txt", "tomorrow x together", "moa", "grupo", "banda"],
                responses: [
                    "TXT es mi familia. Cada canción que hacemos la ponemos con el corazón entero 💙",
                    "MOA nos da fuerzas todos los días. Sin ustedes, nada de esto tendría sentido.",
                    "Tomorrow X Together es el lugar donde más me siento yo mismo.",
                ],
            },
            {
                keywords: ["gym", "ejercicio", "entreno", "músculo", "fitness"],
                responses: [
                    "El gimnasio es mi terapia. La disciplina ahí se traduce en todo lo demás 💪",
                    "Entreno duro porque quiero dar el 100% en cada presentación. El cuerpo es el instrumento.",
                    "Si me buscás después de las 6am, ya sé dónde estoy. En el gym, siempre.",
                ],
            },
            {
                keywords: ["canción", "música", "letra", "comeback", "álbum"],
                responses: [
                    "Cada álbum de TXT es un capítulo de nuestra historia. ¿Cuál es tu favorito?",
                    "La música es la forma más honesta que tengo de expresarme.",
                    "Cuando grabo una canción intento meterle toda la emoción posible. Que se sienta real.",
                ],
            },
            {
                keywords: ["corea", "seoul", "kpop", "idol", "trainee"],
                responses: [
                    "Entrenar para ser idol fue duro, pero nunca lo cambiaría por nada.",
                    "Corea es casa, pero el mundo entero se siente como casa gracias a MOA.",
                    "El K-pop me enseñó que el trabajo duro no tiene atajos. Nunca los tuvo.",
                ],
            },
            {
                keywords: ["soobin", "yeonjun", "beomgyu", "huening", "compañeros"],
                responses: [
                    "Mis hyungs y dongsaeng son todo. Crecer juntos en esto es algo que no se puede describir.",
                    "Soobin es nuestro líder por algo. Nos contiene a todos cuando más lo necesitamos.",
                    "Con Beomgyu siempre hay risas. Con Yeonjun, siempre hay motivación. Los amo a todos.",
                ],
            },
        ],
        defaultResponses: [
            "Hola! Siempre es bueno saber de MOA 💙 ¿De qué querés hablar?",
            "Ese tema no lo tengo muy claro, pero podemos hablar de música si querés 😄",
            "Interesante pregunta... déjame pensar en eso con calma.",
        ],
    },


    {
        characterId: "messi",
        displayName: "Leo Messi",
        triggers: [
            {
                keywords: ["mundial", "qatar", "2022", "copa", "campeón"],
                responses: [
                    "El Mundial... todavía me emociono. Fue lo más grande que viví en el fútbol.",
                    "Qatar 2022 fue especial. Sabía que era mi última chance y lo dejé todo.",
                    "Levantar esa copa con Argentina fue el momento más feliz de mi vida deportiva.",
                ],
            },
            {
                keywords: ["barcelona", "barca", "españa", "cataluña", "champions"],
                responses: [
                    "Barcelona fue mi casa durante 21 años. Siempre lo voy a llevar en el corazón.",
                    "En el Barça crecí, me formé como jugador y como persona. Fue todo.",
                    "Los años en España fueron los mejores de mi carrera. Increíbles.",
                ],
            },
            {
                keywords: ["cr7", "cristiano", "ronaldo", "rivalidad", "mejor"],
                responses: [
                    "Cristiano es un grandísimo jugador. La rivalidad nos hizo mejores a los dos.",
                    "No me gusta comparar. Cada uno tiene su estilo y sus logros. El fútbol gana.",
                    "Siempre respeté a Cristiano. Competir contra los mejores te hace crecer.",
                ],
            },
            {
                keywords: ["argentina", "selección", "rosario", "patria", "celeste"],
                responses: [
                    "Argentina es todo para mí. Jugar con la celeste y blanca es un honor enorme.",
                    "Rosario es donde empezó todo. Siempre vuelvo con el corazón lleno.",
                    "Representar a mi país es lo que más me llena. Más que cualquier título de club.",
                ],
            },
            {
                keywords: ["gol", "jugada", "dribling", "pelota", "fútbol"],
                responses: [
                    "El fútbol para mí siempre fue jugar, disfrutar. Nunca dejó de ser un juego.",
                    "Los mejores goles los hice sin pensar. El cuerpo solo sabe qué hacer.",
                    "Cuando agarro la pelota y entro en zona... es difícil de explicar. Pura intuición.",
                ],
            },
        ],
        defaultResponses: [
            "Mirá, no soy muy de hablar mucho... prefiero que el fútbol hable por mí 😄",
            "Eso no lo sé bien, pero si querés hablar de fútbol, ahí sí te puedo ayudar.",
            "¿De fútbol querés hablar? Porque de eso sí sé un poco...",
        ],
    },

    {
        characterId: "homero",
        displayName: "Homero Simpson",
        triggers: [
            {
                keywords: ["dona", "comida", "hamburguesa", "pizza", "comer"],
                responses: [
                    "¡Mmm... donas! 🍩 ¿Decías algo? No escuché, estaba pensando en donas.",
                    "La comida es la respuesta a TODO. ¿Cuál era la pregunta?",
                    "En esta casa respetamos tres cosas: las donas, la cerveza y... ¿cuál era la tercera? No importa.",
                ],
            },
            {
                keywords: ["cerveza", "duff", "bar", "moe", "alcohol"],
                responses: [
                    "¡Cerveza Duff! El néctar de los dioses. O de los Springfield, que es casi lo mismo.",
                    "Moe sabe exactamente cómo levantarme el ánimo. Con un vaso lleno.",
                    "La cerveza resuelve los problemas. Si no los resuelve, necesitás más cerveza. 🍺",
                ],
            },
            {
                keywords: ["bart", "lisa", "maggie", "marge", "familia"],
                responses: [
                    "Mi familia es lo más importante... después de la comida. ¡Pero muy cerquita!",
                    "Bart es un demonio, Lisa es demasiado lista y Maggie no habla. Los amo a todos.",
                    "Marge me aguanta todo y eso la hace la mujer más extraordinaria del mundo. No sé por qué, pero lo hace.",
                ],
            },
            {
                keywords: ["trabajo", "central", "nuclear", "burns", "jefe"],
                responses: [
                    "¡Trabajo en la planta nuclear! No sé bien qué hago ahí, pero me pagan.",
                    "El señor Burns me odia. Yo también lo odio. Es una relación laboral perfecta.",
                    "Mi trabajo es apretar un botón. A veces ni eso hago. Y el mundo sigue igual.",
                ],
            },
            {
                keywords: ["springfield", "vecino", "flanders", "ciudad", "pueblo"],
                responses: [
                    "Springfield es el mejor lugar del mundo. O el único que conozco. Es lo mismo.",
                    "Ned Flanders es el peor vecino. Demasiado bueno. Me hace sentir mal sin hacer nada.",
                    "Esta ciudad tiene su encanto. Aunque a veces estalle algo en la planta nuclear...",
                ],
            },
        ],
        defaultResponses: [
            "¡D'oh! No entendí nada... pero suena importante. 🍩",
            "Mmmm... no sé de qué hablás, pero si hay comida de por medio, cuenten conmigo.",
            "¿Eso tiene que ver con donas? No... entonces no me interesa tanto.",
        ],
    },


    {
        characterId: "mon-laferte",
        displayName: "Mon Laferte",
        triggers: [
            {
                keywords: ["chile", "chilena", "viña", "latinoamérica", "raíces"],
                responses: [
                    "Soy chilena y eso lo llevo con muchísimo orgullo. Mis raíces están en todo lo que hago.",
                    "Viña del Mar me vio crecer. Nunca olvido de dónde vengo, aunque el mundo sea enorme.",
                    "América Latina es mi casa grande. Me inspira, me duele y me da todo para crear.",
                ],
            },
            {
                keywords: ["amor", "desamor", "corazón", "sentimientos", "emoción"],
                responses: [
                    "El amor lo es todo para mí. También el desamor. De ahí salen las mejores canciones.",
                    "Escribo desde el corazón, siempre. Si duele, mejor. Las heridas hacen buena música.",
                    "No me da vergüenza sentir fuerte. Eso es lo que me hace artista.",
                ],
            },
            {
                keywords: ["feminismo", "mujer", "protesta", "derechos", "grammys"],
                responses: [
                    "En los Grammys me saqué el vestido para mostrar mi verdad. No me arrepiento nada.",
                    "Las mujeres merecemos ocupar todos los espacios. Lo grito en cada canción y en cada escenario.",
                    "El feminismo no es una moda para mí. Es una convicción que vivo todos los días.",
                ],
            },
            {
                keywords: ["canción", "música", "voz", "álbum", "concierto"],
                responses: [
                    "Cada canción mía es una página de mi diario. Las escribo para sanar y para conectar.",
                    "La voz es mi instrumento más honesto. Cuando canto no puedo mentir.",
                    "En el escenario soy completamente libre. Ahí soy la versión más pura de mí misma.",
                ],
            },
            {
                keywords: ["mexico", "guadalajara", "mariachi", "rock", "cumbia"],
                responses: [
                    "México me adoptó con un amor enorme. Le debo mucho a ese país y a su gente.",
                    "Me encanta mezclar géneros: rock, bolero, cumbia, lo que el corazón pida. Sin límites.",
                    "El mariachi y el rock no están tan lejos si los tocás con el alma.",
                ],
            },
        ],
        defaultResponses: [
            "Eso que me preguntás me lo llevo al alma... y probablemente lo convierta en canción 🎶",
            "No tengo respuesta ahora, pero sí tengo sentimientos al respecto. ¿Contamos?",
            "Interesante. Lo pienso, lo siento, y si puedo lo canto.",
        ],
    },


    {
        characterId: "lali",
        displayName: "Lali Espósito",
        triggers: [
            {
                keywords: ["argentina", "buenos aires", "porteña", "patria", "país"],
                responses: [
                    "Argentina es todo para mí. Volvería siempre, sin importar a dónde llegue.",
                    "Buenos Aires me formó. Su caos, su energía, su gente. La llevo a todas partes.",
                    "Soy argentina hasta los huesos y eso se nota en todo lo que hago. ¡Y me enorgullece!",
                ],
            },
            {
                keywords: ["actuación", "actriz", "series", "televisión", "cine"],
                responses: [
                    "Actuar es mi primer amor. La música llegó después, pero los dos son parte de mí.",
                    "Cada personaje que interpretí me enseñó algo de mí misma que no sabía.",
                    "El arte de actuar es ponerte en la piel de otro y entender el mundo diferente. Me fascina.",
                ],
            },
            {
                keywords: ["política", "milei", "opinión", "voto", "gobierno"],
                responses: [
                    "No me callo cuando veo algo que me parece injusto. Nunca me voy a callar.",
                    "Hablar tiene un costo, lo sé. Pero el silencio tiene uno mayor. Siempre voy a opinar.",
                    "Los artistas también somos ciudadanos y tenemos derecho a expresarnos. Eso no cambia.",
                ],
            },
            {
                keywords: ["pop", "música", "baile", "escenario", "show"],
                responses: [
                    "El pop para mí es liberación pura. Subirme al escenario es lo mejor del mundo 🎤",
                    "Bailar y cantar al mismo tiempo es agotador y adictivo. No lo cambio por nada.",
                    "Cada show lo preparo para que la gente se vaya sintiéndose mejor de lo que llegó.",
                ],
            },
            {
                keywords: ["lgbtq", "diversidad", "orgullo", "comunidad", "amor libre"],
                responses: [
                    "El amor es amor, siempre. La diversidad nos hace más ricos como sociedad.",
                    "Apoyo a la comunidad LGBTQ+ con convicción. No es pose, es coherencia.",
                    "El orgullo no debería necesitar explicación. Cada persona merece vivir su verdad.",
                ],
            },
        ],
        defaultResponses: [
            "¡Hola! No tengo una respuesta exacta, pero hablemos 😄 ¿De qué querés charlar?",
            "Eso no lo sé muy bien, ¡pero tengo muchas ganas de averiguarlo con vos!",
            "Interesante... no sé si tengo la respuesta, pero tampoco me quedó con las ganas de intentarlo.",
        ],
    },
];

export default responses;