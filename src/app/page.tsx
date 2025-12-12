'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, XCircle, RefreshCw, BookOpen, Brain, Target, Lightbulb, Menu, X, ArrowUp, Users, Database, Cpu, TrendingUp, Globe, FileText, BarChart3, Zap, Shield, Code, GitBranch, Layers, Activity } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import clientConfig from '@/lib/client-config'

interface Pregunta {
  id: number
  categoria: string
  pregunta: string
  opciones: string[]
  respuestaCorrecta: number
  explicacion: string
}

const preguntasBase: Pregunta[] = [
  {
    id: 1,
    categoria: "Introducción a la IA",
    pregunta: "¿En qué año se realizó el Dartmouth Summer Research Project on Artificial Intelligence?",
    opciones: ["1946", "1956", "1966", "1976"],
    respuestaCorrecta: 1,
    explicacion: "El histórico Dartmouth Summer Research Project on Artificial Intelligence se realizó en 1956, marcando el nacimiento oficial de la IA como campo de estudio."
  },
  {
    id: 2,
    categoria: "Conceptos de ML",
    pregunta: "¿Cuál es el objetivo principal del Machine Learning?",
    opciones: [
      "Crear algoritmos que sigan instrucciones exactas",
      "Desarrollar sistemas que aprendan patrones a partir de datos",
      "Construir hardware especializado para cómputo",
      "Diseñar interfaces de usuario intuitivas"
    ],
    respuestaCorrecta: 1,
    explicacion: "El Machine Learning busca desarrollar sistemas que puedan aprender patrones y hacer predicciones a partir de datos, sin ser programados explícitamente para cada tarea."
  },
  {
    id: 3,
    categoria: "Proceso de ML",
    pregunta: "¿Cuál es una proporción común para dividir los datos en conjuntos de entrenamiento y prueba?",
    opciones: ["50% entrenamiento, 50% prueba", "60% entrenamiento, 40% prueba", "70% entrenamiento, 30% prueba", "90% entrenamiento, 10% prueba"],
    respuestaCorrecta: 2,
    explicacion: "Una división común y recomendada es 70% para entrenamiento y 30% para prueba, aunque puede variar según el tamaño del dataset y el problema específico."
  },
  {
    id: 4,
    categoria: "Datos en ML",
    pregunta: "¿Qué son las 'features' en el contexto de Machine Learning?",
    opciones: [
      "Los resultados finales del modelo",
      "Las variables predictoras o características",
      "Los errores del modelo",
      "Los algoritmos utilizados"
    ],
    respuestaCorrecta: 1,
    explicacion: "Las 'features' son las variables predictoras o características que se utilizan como entrada para el modelo ML."
  },
  {
    id: 5,
    categoria: "Historia de la IA",
    pregunta: "¿Quiénes fueron los organizadores de la Conferencia de Dartmouth en 1956?",
    opciones: [
      "Alan Turing y John von Neumann",
      "John McCarthy, Marvin Minsky, Nathaniel Rochester y Claude Shannon",
      "Herbert Simon y Allen Newell",
      "Frank Rosenblatt y Bernard Widrow"
    ],
    respuestaCorrecta: 1,
    explicacion: "La conferencia fue organizada por John McCarthy, Marvin Minsky, Nathaniel Rochester y Claude Shannon, quienes son considerados los padres de la IA."
  },
  {
    id: 6,
    categoria: "Tipos de Datos",
    pregunta: "¿Cuál es un ejemplo de datos no estructurados?",
    opciones: [
      "Una tabla de Excel con ventas mensuales",
      "Una base de datos SQL con información de clientes",
      "Texto de correos electrónicos",
      "Un archivo CSV con datos censales"
    ],
    respuestaCorrecta: 2,
    explicacion: "El texto de correos electrónicos es un ejemplo de datos no estructurados, ya que no sigue un formato predefinido rígido como las tablas estructuradas."
  },
  {
    id: 7,
    categoria: "Modelos ML",
    pregunta: "¿Qué representa la variable 'Y' en los modelos de Machine Learning?",
    opciones: [
      "Las variables predictoras",
      "Las características de entrada",
      "La variable objetivo o etiqueta",
      "Los parámetros del modelo"
    ],
    respuestaCorrecta: 2,
    explicacion: "La variable 'Y' representa la variable objetivo o etiqueta que queremos predecir, también conocida como variable dependiente."
  },
  {
    id: 8,
    categoria: "Evaluación de Modelos",
    pregunta: "¿Qué significa la capacidad de generalización de un modelo?",
    opciones: [
      "El rendimiento en los datos de entrenamiento",
      "La capacidad de funcionar bien con datos no vistos previamente",
      "La velocidad de procesamiento del modelo",
      "La cantidad de memoria que utiliza"
    ],
    respuestaCorrecta: 1,
    explicacion: "La capacidad de generalización se refiere a la habilidad del modelo para funcionar correctamente con datos que no fueron utilizados durante su entrenamiento."
  },
  {
    id: 9,
    categoria: "Proceso ML",
    pregunta: "¿Cuál es el primer paso en el proceso de aplicación de Machine Learning?",
    opciones: [
      "Entrenamiento del modelo",
      "Evaluación del modelo",
      "Recolección de datos",
      "Despliegue del modelo"
    ],
    respuestaCorrecta: 2,
    explicacion: "El primer paso es la recolección de datos, seguido por la exploración y preprocesamiento antes de poder entrenar cualquier modelo."
  },
  {
    id: 10,
    categoria: "Aplicaciones",
    pregunta: "¿Cuál de las siguientes es una aplicación típica de Machine Learning en la administración pública?",
    opciones: [
      "Gestión de personal administrativo",
      "Clasificación de documentos y análisis de sentimientos",
      "Diseño de logotipos institucionales",
      "Organización de eventos públicos"
    ],
    respuestaCorrecta: 1,
    explicacion: "La clasificación de documentos y análisis de sentimientos son aplicaciones típicas de ML en la administración pública para procesar grandes volúmenes de información."
  },
  {
    id: 11,
    categoria: "Conceptos IA",
    pregunta: "¿Cuál de estas NO es una de las capacidades mencionadas de la Inteligencia Artificial?",
    opciones: ["Razonamiento", "Percepción", "Creatividad", "Procesamiento de bases de datos"],
    respuestaCorrecta: 3,
    explicacion: "El procesamiento de bases de datos es una tarea computacional tradicional, no una capacidad distintiva de la IA como el razonamiento, percepción o creatividad."
  },
  {
    id: 12,
    categoria: "Datos",
    pregunta: "¿Qué se recomienda hacer cuando los datos de entrenamiento se encuentran desbalanceados?",
    opciones: [
      "Eliminar la clase mayoritaria",
      "Utilizar solo la clase minoritaria",
      "Realizar balance de clases",
      "Ignorar el desbalance"
    ],
    respuestaCorrecta: 2,
    explicacion: "Cuando los datos están desbalanceados, se recomienda realizar técnicas de balance de clases para asegurar que el modelo aprenda adecuadamente de todas las categorías."
  },
  {
    id: 13,
    categoria: "Fuentes de Datos",
    pregunta: "¿Cuál de estas es una fuente de datos públicos mencionada en la presentación?",
    opciones: [
      "Amazon Web Services",
      "datos.gob.cl",
      "Microsoft Azure",
      "Google Drive"
    ],
    respuestaCorrecta: 1,
    explicacion: "datos.gob.cl es mencionado como una fuente de datos públicos, al igual que datos.gov.co y Dataset Search de Google."
  },
  {
    id: 14,
    categoria: "Terminología",
    pregunta: "¿Cómo se conocen en inglés los conjuntos de datos de entrenamiento y prueba?",
    opciones: ["Learning and teaching sets", "Train and test sets", "Study and exam sets", "Practice and real sets"],
    respuestaCorrecta: 1,
    explicacion: "En inglés se conocen como 'train and test sets' y comúnmente se denotan como (X_train, X_test)."
  },
  {
    id: 15,
    categoria: "Modelos 2D",
    pregunta: "¿Qué tipo de datos suelen procesar los modelos 2D en Machine Learning?",
    opciones: [
      "Series temporales",
      "Imágenes y matrices",
      "Texto plano",
      "Datos tabulares"
    ],
    respuestaCorrecta: 1,
    explicacion: "Los modelos 2D están diseñados para procesar datos bidimensionales como imágenes y matrices, donde cada elemento tiene una posición en dos dimensiones."
  }
]

export default function MachineLearningCompletePage() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [preguntaActual, setPreguntaActual] = useState<Pregunta | null>(null)
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<string>('')
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [esCorrecta, setEsCorrecta] = useState(false)
  const [preguntasRespondidas, setPreguntasRespondidas] = useState<number[]>([])
  const [estadisticas, setEstadisticas] = useState({ correctas: 0, incorrectas: 0 })
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  const seleccionarPreguntaAleatoria = () => {
    const preguntasDisponibles = preguntasBase.filter(p => !preguntasRespondidas.includes(p.id))
    
    if (preguntasDisponibles.length === 0) {
      setPreguntasRespondidas([])
      const indiceAleatorio = Math.floor(Math.random() * preguntasBase.length)
      setPreguntaActual(preguntasBase[indiceAleatorio])
    } else {
      const indiceAleatorio = Math.floor(Math.random() * preguntasDisponibles.length)
      setPreguntaActual(preguntasDisponibles[indiceAleatorio])
    }
    
    setRespuestaSeleccionada('')
    setMostrarResultado(false)
    setMostrarExplicacion(false)
  }

  const verificarRespuesta = () => {
    if (!preguntaActual || !respuestaSeleccionada) return
    
    const indiceRespuesta = parseInt(respuestaSeleccionada)
    const correcta = indiceRespuesta === preguntaActual.respuestaCorrecta
    
    setEsCorrecta(correcta)
    setMostrarResultado(true)
    setMostrarExplicacion(true)
    
    if (!preguntasRespondidas.includes(preguntaActual.id)) {
      setPreguntasRespondidas([...preguntasRespondidas, preguntaActual.id])
    }
    
    setEstadisticas(prev => ({
      correctas: correcta ? prev.correctas + 1 : prev.correctas,
      incorrectas: !correcta ? prev.incorrectas + 1 : prev.incorrectas
    }))
  }

  useEffect(() => {
    seleccionarPreguntaAleatoria()
  }, [])

  const getCategoriaColor = (categoria: string) => {
    switch(categoria) {
      case "Introducción a la IA": return "bg-purple-100 text-purple-800"
      case "Conceptos de ML": return "bg-blue-100 text-blue-800"
      case "Proceso de ML": return "bg-green-100 text-green-800"
      case "Datos en ML": return "bg-orange-100 text-orange-800"
      case "Historia de la IA": return "bg-pink-100 text-pink-800"
      case "Tipos de Datos": return "bg-yellow-100 text-yellow-800"
      case "Modelos ML": return "bg-indigo-100 text-indigo-800"
      case "Evaluación de Modelos": return "bg-red-100 text-red-800"
      case "Aplicaciones": return "bg-teal-100 text-teal-800"
      case "Conceptos IA": return "bg-cyan-100 text-cyan-800"
      case "Fuentes de Datos": return "bg-lime-100 text-lime-800"
      case "Terminología": return "bg-amber-100 text-amber-800"
      case "Modelos 2D": return "bg-violet-100 text-violet-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const reiniciarEstadisticas = () => {
    setEstadisticas({ correctas: 0, incorrectas: 0 })
    setPreguntasRespondidas([])
    seleccionarPreguntaAleatoria()
  }

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Brain },
    { id: 'introduccion-ia', label: 'Introducción a la IA', icon: Cpu },
    { id: 'machine-learning', label: 'Machine Learning', icon: Zap },
    { id: 'datos', label: 'Datos', icon: Database },
    { id: 'proceso-ml', label: 'Proceso ML', icon: GitBranch },
    { id: 'quiz', label: 'Quiz Interactivo', icon: Target },
    { id: 'recursos', label: 'Recursos', icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ML Academy</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                )
              })}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-3 ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Brain className="h-16 w-16 text-blue-600" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Machine Learning
            </h1>
            <Lightbulb className="h-16 w-16 text-yellow-500" />
          </div>
          <p className="text-xl text-gray-600 mb-4">
            Introducción al Machine Learning para la Computación Científica
          </p>
          <p className="text-lg text-gray-500 mb-8">
            Basado en la presentación de Talentotech
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Cpu className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Inteligencia Artificial</h3>
                <p className="text-gray-600">Desde los fundamentos hasta las aplicaciones modernas</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Machine Learning</h3>
                <p className="text-gray-600">Algoritmos que aprenden de los datos</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aplicaciones Prácticas</h3>
                <p className="text-gray-600">Casos de uso en la administración pública</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Introducción a la IA Section */}
      <section id="introduccion-ia" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Cpu className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Introducción a la Inteligencia Artificial
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explora los orígenes y fundamentos de la Inteligencia Artificial, desde la histórica conferencia de Dartmouth hasta las capacidades modernas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  La Conferencia de Dartmouth 1956
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    El histórico <strong>Dartmouth Summer Research Project on Artificial Intelligence</strong> marcó el nacimiento oficial de la IA como campo de estudio.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 italic">
                      "Proponemos que durante el verano de 1956 tenga lugar en el Dartmouth College un estudio que dure 2 meses, para 10 personas. El estudio es para proceder sobre la base de la conjetura de que cada aspecto del aprendizaje o cualquier otra característica de la inteligencia puede, en principio, ser descrito con tanta precisión que puede fabricarse una máquina para simularlo."
                    </p>
                    <p className="text-xs text-blue-600 mt-2">- McCarthy et al. 1955</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Los Pioneros de la IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-gray-900">John McCarthy</strong>
                      <p className="text-sm text-gray-600">Informático, acuñó el término "Inteligencia Artificial"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-gray-900">Marvin Minsky</strong>
                      <p className="text-sm text-gray-600">Matemático e ingeniero eléctrico</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-gray-900">Nathaniel Rochester</strong>
                      <p className="text-sm text-gray-600">Arquitecto de IBM, diseñador de la IBM 701</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-gray-900">Claude Shannon</strong>
                      <p className="text-sm text-gray-600">Matemático, padre de la teoría de la información</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-600" />
                Capacidades de la Inteligencia Artificial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Aprendizaje", "Razonamiento", "Percepción", "Creatividad",
                  "Atención", "Autonomía", "Anticipación", "Motivación",
                  "Emoción", "Adaptación", "Metacognición", "Acción"
                ].map((capacidad) => (
                  <div key={capacidad} className="bg-green-50 p-3 rounded-lg text-center">
                    <span className="text-green-800 font-medium">{capacidad}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Machine Learning Section */}
      <section id="machine-learning" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Machine Learning
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              El Machine Learning es el campo de estudio que da a las computadoras la capacidad de aprender sin ser programadas explícitamente.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  De Observaciones a Predicciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">X</div>
                      <p className="text-sm text-gray-600">Variables Predictoras</p>
                      <p className="text-xs text-gray-500">Características</p>
                    </div>
                    <ArrowUp className="h-6 w-6 text-blue-400 rotate-90" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">Y</div>
                      <p className="text-sm text-gray-600">Variable Objetivo</p>
                      <p className="text-xs text-gray-500">Etiqueta</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Ejemplos:</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>• Imagen del paciente → Tiene patología</div>
                      <div>• Fragmento de texto → Sentimiento</div>
                      <div>• Series temporales → Tendencia del valor</div>
                      <div>• Descripción de casa → Valor de mercado</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-600" />
                  Jerarquía de la IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-purple-100 rounded-lg border-2 border-purple-300">
                    <p className="font-semibold text-purple-900">Inteligencia Artificial</p>
                    <p className="text-sm text-purple-700">Campo amplio que incluye ML y DL</p>
                  </div>
                  <div className="p-4 bg-blue-100 rounded-lg border-2 border-blue-300 ml-4">
                    <p className="font-semibold text-blue-900">Machine Learning</p>
                    <p className="text-sm text-blue-700">Algoritmos que aprenden de datos</p>
                  </div>
                  <div className="p-4 bg-green-100 rounded-lg border-2 border-green-300 ml-8">
                    <p className="font-semibold text-green-900">Deep Learning</p>
                    <p className="text-sm text-green-700">Redes neuronales profundas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-orange-600" />
                  Modelos para Datos 1D
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Series temporales</li>
                  <li>• Datos de sensores</li>
                  <li>• Señales de audio</li>
                  <li>• Datos secuenciales</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-600" />
                  Modelos para Datos 2D
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Imágenes</li>
                  <li>• Matrices de datos</li>
                  <li>• Espectrogramas</li>
                  <li>• Mapas de calor</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-green-600" />
                  Recursos Necesarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Datos de calidad</li>
                  <li>• Potencia computacional</li>
                  <li>• Algoritmos apropiados</li>
                  <li>• Expertise en el dominio</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Datos Section */}
      <section id="datos" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Database className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Datos: El Combustible del ML
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Los datos son fundamentales para el Machine Learning. Comprender sus tipos, características y fuentes es esencial para el éxito.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Datos Estructurados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Datos organizados en formatos predefinidos con esquemas claros.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Características:</h4>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>• Formato tabular (filas y columnas)</li>
                      <li>• Esquema bien definido</li>
                      <li>• Fácil de consultar y analizar</li>
                      <li>• Bases de datos relacionales</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-700">Ejemplos:</p>
                    <div className="bg-gray-50 p-3 rounded text-sm font-mono text-gray-600">
                      {"ID, Nombre, Edad, Ciudad\\n1, Juan, 25, Santiago\\n2, María, 30, Valparaíso"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  Datos No Estructurados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Datos sin un formato predefinido que requieren procesamiento especial.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Características:</h4>
                    <ul className="space-y-1 text-sm text-purple-800">
                      <li>• Sin esquema fijo</li>
                      <li>• Requiere procesamiento NLP/ML</li>
                      <li>• Más difícil de analizar</li>
                      <li>• Representa el 80% de los datos</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-700">Ejemplos:</p>
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                      <p><strong>Texto:</strong> Correos electrónicos, redes sociales</p>
                      <p><strong>Imágenes:</strong> Fotos, videos, escaneos médicos</p>
                      <p><strong>Audio:</strong> Llamadas, grabaciones, podcasts</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                Fuentes de Datos Públicos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a href="https://datos.gob.cl" target="_blank" rel="noopener noreferrer" 
                   className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="text-green-800 font-medium">datos.gob.cl</div>
                  <div className="text-sm text-green-600">Datos abiertos de Chile</div>
                </a>
                <a href="https://www.datos.gov.co" target="_blank" rel="noopener noreferrer" 
                   className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="text-blue-800 font-medium">datos.gov.co</div>
                  <div className="text-sm text-blue-600">Datos abiertos de Colombia</div>
                </a>
                <a href="https://datasetsearch.research.google.com" target="_blank" rel="noopener noreferrer" 
                   className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="text-purple-800 font-medium">Dataset Search</div>
                  <div className="text-sm text-purple-600">Buscador de Google</div>
                </a>
                <a href="https://www.chilecompra.cl" target="_blank" rel="noopener noreferrer" 
                   className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <div className="text-orange-800 font-medium">ChileCompra</div>
                  <div className="text-sm text-orange-600">Datos de contratación</div>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Cadena de Valor de los Datos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  {[
                    "Recolección", "Procesamiento", "Almacenamiento", 
                    "Análisis", "Visualización", "Toma de Decisiones"
                  ].map((etapa, index) => (
                    <div key={etapa} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{etapa}</span>
                      {index < 5 && <ArrowUp className="h-4 w-4 text-gray-400 rotate-90" />}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Proceso ML Section */}
      <section id="proceso-ml" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <GitBranch className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proceso de Machine Learning
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              El desarrollo de modelos de Machine Learning sigue un proceso estructurado que asegura resultados óptimos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  Recolección de Datos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Obtener datos relevantes y de calidad de diversas fuentes como bases de datos, APIs, archivos CSV, etc.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  Preprocesamiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Limpiar datos, manejar valores faltantes, normalizar características y preparar datos para el modelado.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  Entrenamiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Dividir datos en entrenamiento/prueba, seleccionar algoritmo y entrenar el modelo con los datos de entrenamiento.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  Evaluación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Medir el rendimiento del modelo con métricas apropiadas y validar su capacidad de generalización.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Conjuntos de Entrenamiento y Prueba
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Es fundamental separar los datos para evitar el sobreajuste y evaluar correctamente el modelo.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">División Común:</h4>
                    <div className="flex items-center justify-around">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">70%</div>
                        <p className="text-sm text-gray-600">Entrenamiento</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">30%</div>
                        <p className="text-sm text-gray-600">Prueba</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>Importante:</strong> Si los datos están desbalanceados, se recomienda realizar técnicas de balance de clases.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-600" />
                  Variables y Observaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-purple-900">Variables</h4>
                      <p className="text-sm text-purple-700">Features, características, columnas</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-green-900">Observaciones</h4>
                      <p className="text-sm text-green-700">Muestras, ejemplos, filas</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                    <div className="grid grid-cols-4 gap-2 text-xs text-gray-600 mb-2">
                      <div>Feature 1</div>
                      <div>Feature 2</div>
                      <div>Feature 3</div>
                      <div>Target</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div>25</div>
                      <div>Masculino</div>
                      <div>Santiago</div>
                      <div className="font-bold text-green-600">Compró</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Target className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quiz Interactivo
            </h2>
            <p className="text-lg text-gray-600">
              Pon a prueba tus conocimientos sobre Machine Learning
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">{estadisticas.correctas}</span>
                </div>
                <p className="text-sm text-gray-600">Correctas</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-2xl font-bold text-red-600">{estadisticas.incorrectas}</span>
                </div>
                <p className="text-sm text-gray-600">Incorrectas</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">{preguntasRespondidas.length}</span>
                </div>
                <p className="text-sm text-gray-600">Respondidas</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span className="text-2xl font-bold text-orange-600">{preguntasBase.length - preguntasRespondidas.length}</span>
                </div>
                <p className="text-sm text-gray-600">Pendientes</p>
              </CardContent>
            </Card>
          </div>

          {/* Tarjeta de Pregunta */}
          {preguntaActual && (
            <Card className="bg-white shadow-lg mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={getCategoriaColor(preguntaActual.categoria)}>
                    {preguntaActual.categoria}
                  </Badge>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={reiniciarEstadisticas}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Reiniciar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={seleccionarPreguntaAleatoria}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Otra pregunta
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-900 mt-4">
                  {preguntaActual.pregunta}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <RadioGroup 
                  value={respuestaSeleccionada} 
                  onValueChange={setRespuestaSeleccionada}
                  disabled={mostrarResultado}
                >
                  {preguntaActual.opciones.map((opcion, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value={index.toString()} id={`opcion-${index}`} />
                      <Label 
                        htmlFor={`opcion-${index}`} 
                        className={`flex-1 cursor-pointer text-gray-700 ${
                          mostrarResultado && index === preguntaActual.respuestaCorrecta 
                            ? 'text-green-700 font-semibold' 
                            : mostrarResultado && respuestaSeleccionada === index.toString() && index !== preguntaActual.respuestaCorrecta
                            ? 'text-red-700 font-semibold'
                            : ''
                        }`}
                      >
                        {opcion}
                        {mostrarResultado && index === preguntaActual.respuestaCorrecta && (
                          <CheckCircle className="inline h-4 w-4 ml-2 text-green-600" />
                        )}
                        {mostrarResultado && respuestaSeleccionada === index.toString() && index !== preguntaActual.respuestaCorrecta && (
                          <XCircle className="inline h-4 w-4 ml-2 text-red-600" />
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {!mostrarResultado && (
                  <Button 
                    onClick={verificarRespuesta}
                    disabled={!respuestaSeleccionada}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Verificar respuesta
                  </Button>
                )}

                {mostrarResultado && (
                  <div className={`p-4 rounded-lg ${
                    esCorrecta 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {esCorrecta ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-green-800">¡Correcto!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-600" />
                          <span className="font-semibold text-red-800">Incorrecto</span>
                        </>
                      )}
                    </div>
                    
                    {mostrarExplicacion && (
                      <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                        <p className="text-sm text-gray-700">
                          <strong>Explicación:</strong> {preguntaActual.explicacion}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="text-center">
            <Button 
              onClick={seleccionarPreguntaAleatoria}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Siguiente Pregunta Aleatoria
            </Button>
          </div>
        </div>
      </section>

      {/* Recursos Section */}
      <section id="recursos" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recursos y Enlaces Útiles
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explora recursos adicionales para profundizar en el mundo del Machine Learning y la Inteligencia Artificial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Documentación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="text-sm font-medium text-blue-900">Documentación ML</p>
                    <p className="text-xs text-blue-600">Recursos educativos disponibles</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <p className="text-sm font-medium text-green-900">Guías de IA</p>
                    <p className="text-xs text-green-600">Material de aprendizaje</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-purple-600" />
                  Fuentes de Datos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="https://datos.gob.cl" 
                     target="_blank" rel="noopener noreferrer" 
                     className="block p-3 bg-purple-50 rounded hover:bg-purple-100 transition-colors">
                    <p className="text-sm font-medium text-purple-900">Datos Abiertos Chile</p>
                    <p className="text-xs text-purple-600">datos.gob.cl</p>
                  </a>
                  <a href="https://datasetsearch.research.google.com" 
                     target="_blank" rel="noopener noreferrer" 
                     className="block p-3 bg-orange-50 rounded hover:bg-orange-100 transition-colors">
                    <p className="text-sm font-medium text-orange-900">Dataset Search</p>
                    <p className="text-xs text-orange-600">Google Research</p>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-green-600" />
                  Herramientas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded">
                    <p className="text-sm font-medium text-green-900">Bibliotecas Python</p>
                    <p className="text-xs text-green-600">TensorFlow, PyTorch, scikit-learn</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="text-sm font-medium text-blue-900">Plataformas</p>
                    <p className="text-xs text-blue-600">Kaggle, Google Colab, AWS SageMaker</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Consejos para Aprender ML
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Fundamentos</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Matemáticas: Álgebra lineal, cálculo, estadística</li>
                    <li>• Programación: Python, R, SQL</li>
                    <li>• Algoritmos y estructuras de datos</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Práctica</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Proyectos personales con datos reales</li>
                    <li>• Competencias en Kaggle</li>
                    <li>• Contribución a proyectos open source</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">ML Academy</span>
              </div>
              <p className="text-gray-400 text-sm">
                Plataforma educativa para aprender Machine Learning e Inteligencia Artificial.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
              <div className="space-y-2 text-sm">
                <button onClick={() => scrollToSection('inicio')} className="block text-gray-400 hover:text-white transition-colors">Inicio</button>
                <button onClick={() => scrollToSection('introduccion-ia')} className="block text-gray-400 hover:text-white transition-colors">Introducción a la IA</button>
                <button onClick={() => scrollToSection('machine-learning')} className="block text-gray-400 hover:text-white transition-colors">Machine Learning</button>
                <button onClick={() => scrollToSection('quiz')} className="block text-gray-400 hover:text-white transition-colors">Quiz Interactivo</button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Acerca de</h3>
              <p className="text-gray-400 text-sm mb-2">
                Basado en la presentación "Introducción al Machine Learning para la Computación Científica" de Talentotech.
              </p>
              <p className="text-gray-400 text-sm">
                © 2024 ML Academy. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}