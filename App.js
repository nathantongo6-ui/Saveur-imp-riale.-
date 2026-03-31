import { useEffect, useState, useRef } from "react";
import "@/App.css";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Send, Menu, X, Leaf, Award, Heart, ChevronDown, MapPin, Phone, Mail } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo Component
const Logo = ({ size = "normal", showText = true }) => {
  const dimensions = size === "small" ? "w-12 h-12" : "w-14 h-14";
  
  return (
    <div className="flex items-center gap-3">
      <svg 
        className={dimensions}
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bowl */}
        <ellipse cx="50" cy="70" rx="35" ry="12" fill="#1A3626"/>
        <path d="M15 58 C15 75, 85 75, 85 58 L85 65 C85 82, 15 82, 15 65 Z" fill="#1A3626"/>
        
        {/* Bowl rim highlight */}
        <ellipse cx="50" cy="58" rx="35" ry="10" fill="#254D36"/>
        <ellipse cx="50" cy="58" rx="30" ry="7" fill="#D4AF37" opacity="0.3"/>
        
        {/* Fork */}
        <rect x="35" y="20" width="3" height="30" fill="#D4AF37"/>
        <rect x="31" y="15" width="2" height="12" rx="1" fill="#D4AF37"/>
        <rect x="35" y="15" width="2" height="12" rx="1" fill="#D4AF37"/>
        <rect x="39" y="15" width="2" height="12" rx="1" fill="#D4AF37"/>
        
        {/* Spoon */}
        <rect x="62" y="25" width="3" height="25" fill="#D4AF37"/>
        <ellipse cx="63.5" cy="18" rx="6" ry="8" fill="#D4AF37"/>
        <ellipse cx="63.5" cy="18" rx="3" ry="5" fill="#1A3626" opacity="0.2"/>
        
        {/* Left plant */}
        <path d="M20 45 Q10 35, 18 25 Q22 35, 20 45" fill="#1A3626"/>
        <path d="M20 45 Q8 40, 12 30 Q18 38, 20 45" fill="#254D36"/>
        <path d="M20 50 L20 58" stroke="#1A3626" strokeWidth="2"/>
        
        {/* Right plant */}
        <path d="M80 45 Q90 35, 82 25 Q78 35, 80 45" fill="#1A3626"/>
        <path d="M80 45 Q92 40, 88 30 Q82 38, 80 45" fill="#254D36"/>
        <path d="M80 50 L80 58" stroke="#1A3626" strokeWidth="2"/>
        
        {/* Small leaves decoration */}
        <circle cx="25" cy="55" r="3" fill="#D4AF37" opacity="0.6"/>
        <circle cx="75" cy="55" r="3" fill="#D4AF37" opacity="0.6"/>
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <span className="font-serif text-xl md:text-2xl font-semibold text-[#1A3626] tracking-tight leading-tight">
            Saveur Impériale
          </span>
          <span className="text-[10px] md:text-xs tracking-[0.15em] text-[#D4AF37] font-medium">
            GOÛTEZ L'ULTIME !
          </span>
        </div>
      )}
    </div>
  );
};

// Navigation Component
const Navigation = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "#hero" },
    { name: "À Propos", href: "#about" },
    { name: "Produits", href: "#products" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-[#E5E0D5]/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-3 flex items-center justify-between">
        <a href="#hero" data-testid="nav-logo" className="flex items-center">
          <Logo size="normal" showText={true} />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              data-testid={`nav-${link.name.toLowerCase().replace(" ", "-")}`}
              className="text-[#4A5D53] hover:text-[#1A3626] transition-colors duration-300 text-sm tracking-wide font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            data-testid="nav-cta"
            className="btn-lift bg-[#1A3626] text-[#FDFBF7] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#254D36]"
          >
            Nous Contacter
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#1A3626] p-2"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[#E5E0D5]/50"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[#1A3626] text-lg font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Hero Section
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/5737246/pexels-photo-5737246.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Huile dorée"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/90 to-[#FDFBF7]/40" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-32 md:py-40"
      >
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs tracking-[0.2em] uppercase font-semibold text-[#D4AF37] mb-6"
          >
            Transformation Agro-Alimentaire
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium text-[#1A3626] tracking-tight leading-none mb-6"
          >
            Saveur
            <br />
            <span className="text-gradient">Impériale</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-3xl sm:text-4xl italic text-[#1A3626]/80 mb-8"
          >
            "Goûtez l'ultime !"
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-[#4A5D53] leading-relaxed mb-10 max-w-lg"
          >
            Découvrez l'excellence de nos produits agro-alimentaires, transformés avec passion et savoir-faire pour sublimer vos créations culinaires.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#products"
              data-testid="hero-cta-primary"
              className="btn-lift bg-[#1A3626] text-[#FDFBF7] px-8 py-4 rounded-full text-base font-medium hover:bg-[#254D36] flex items-center gap-2"
            >
              Découvrir nos produits
              <ChevronDown size={18} />
            </a>
            <a
              href="#about"
              data-testid="hero-cta-secondary"
              className="btn-lift border-2 border-[#1A3626] text-[#1A3626] px-8 py-4 rounded-full text-base font-medium hover:bg-[#1A3626] hover:text-[#FDFBF7]"
            >
              Notre histoire
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#1A3626]/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "100% Naturel",
      description: "Des ingrédients sélectionnés avec soin, sans additifs artificiels.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Qualité Premium",
      description: "Un processus de transformation rigoureux pour une qualité exceptionnelle.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Fait avec Passion",
      description: "Chaque produit est le fruit d'un savoir-faire artisanal transmis.",
    },
  ];

  return (
    <section
      ref={ref}
      id="about"
      data-testid="about-section"
      className="py-24 md:py-32 bg-[#F4F1E9]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            style={{ y }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem]">
              <img
                src="https://images.pexels.com/photos/4282736/pexels-photo-4282736.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Arachides naturelles"
                className="w-full h-[500px] object-cover img-hover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-3xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#D4AF37] mb-4">
              Notre Histoire
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#1A3626] tracking-tight leading-tight mb-6">
              L'Excellence de la
              <br />
              Transformation
            </h2>
            <p className="text-lg text-[#4A5D53] leading-relaxed mb-8">
              Saveur Impériale est née d'une passion pour les produits locaux et la volonté de sublimer les richesses de notre terroir. Notre mission : transformer les meilleurs ingrédients en produits d'exception qui révèlent toute leur saveur dans votre cuisine.
            </p>
            <p className="text-lg text-[#4A5D53] leading-relaxed mb-10">
              Chaque produit que nous créons est le résultat d'un processus minutieux, alliant techniques traditionnelles et innovations modernes pour garantir une qualité irréprochable.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#1A3626] text-[#D4AF37] rounded-2xl flex items-center justify-center">
                    {value.icon}
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#1A3626] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#4A5D53]">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Products Section
const ProductsSection = () => {
  return (
    <section
      id="products"
      data-testid="products-section"
      className="py-24 md:py-32 bg-[#FDFBF7]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#D4AF37] mb-4">
            Nos Produits
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#1A3626] tracking-tight">
            L'Excellence en Bouteille
          </h2>
        </motion.div>

        {/* Featured Product */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch"
        >
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-t-2xl lg:rounded-l-[2rem] lg:rounded-tr-none">
            <img
              src="https://images.unsplash.com/photo-1768689033119-c3ac1e437d20?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBvaWwlMjBwb3VyaW5nJTIwZm9vZHxlbnwwfHx8fDE3NzQ2NzA5ODN8MA&ixlib=rb-4.1.0&q=85"
              alt="Huile d'arachide premium"
              className="w-full h-full min-h-[400px] object-cover img-hover"
            />
            <div className="absolute top-6 left-6 bg-[#D4AF37] text-[#1A3626] px-4 py-2 rounded-full text-sm font-semibold">
              Produit Vedette
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-[#1A3626] p-10 lg:p-16 flex flex-col justify-center rounded-b-2xl lg:rounded-r-[2rem] lg:rounded-bl-none">
            <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#D4AF37] mb-4">
              Premier Choix
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#FDFBF7] tracking-tight mb-6">
              Huile d'Arachide
              <br />
              Pure & Naturelle
            </h3>
            <p className="text-lg text-[#FDFBF7]/80 leading-relaxed mb-8">
              Notre huile d'arachide est extraite à froid à partir des meilleures cacahuètes sélectionnées avec soin. Son goût subtil et sa couleur dorée en font l'ingrédient parfait pour sublimer vos plats traditionnels et vos créations culinaires.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Extraction à froid pour préserver les nutriments",
                "100% naturel, sans conservateurs",
                "Riche en vitamines E et acides gras essentiels",
                "Parfait pour la friture et l'assaisonnement",
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-[#FDFBF7]/90"
                >
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>

<a
  href="https://wa.me/243896822071?text=Bonjour,%20je%20veux%20commander%20votre%20huile%20d'arachide."
  className="btn-lift bg-[#D4AF37] text-[#1A3626] px-8 py-4 rounded-full text-base font-semibold hover:bg-[#B3932F] w-fit"
            >
              Commander maintenant
              <Send size={18} />
            </a>
          </div>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-[#4A5D53] text-lg">
            <span className="text-[#D4AF37] font-semibold">Bientôt disponible :</span> Huile de palme rouge, Beurre de karité, et bien plus...
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.post(`${API}/contact`, formData);
      setStatus({
        type: "success",
        message: "Message envoyé avec succès ! Nous vous répondrons bientôt.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erreur lors de l'envoi. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-24 md:py-32 bg-[#F4F1E9]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#D4AF37] mb-4">
              Contact
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#1A3626] tracking-tight leading-tight mb-6">
              Parlons de
              <br />
              Votre Projet
            </h2>
            <p className="text-lg text-[#4A5D53] leading-relaxed mb-10">
              Vous êtes restaurateur, distributeur ou simplement passionné de cuisine ? Contactez-nous pour découvrir comment nos produits peuvent sublimer vos créations.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1A3626] text-[#D4AF37] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-[#1A3626] mb-1">
                    Adresse
                  </h4>
                  <p className="text-[#4A5D53]">Quartier Industrial, Ville</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1A3626] text-[#D4AF37] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-[#1A3626] mb-1">
                    Téléphone
                  </h4>
                  <p className="text-[#4A5D53]">+XXX XX XX XX XX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1A3626] text-[#D4AF37] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-[#1A3626] mb-1">
                    Email
                  </h4>
                  <p className="text-[#4A5D53]">contact@saveurimperiale.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#1A3626] mb-2"
                >
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="contact-name"
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-[#E5E0D5] focus:border-[#D4AF37] text-[#1A3626] placeholder-[#4A5D53]/50 transition-colors duration-300"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1A3626] mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="contact-email"
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-[#E5E0D5] focus:border-[#D4AF37] text-[#1A3626] placeholder-[#4A5D53]/50 transition-colors duration-300"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#1A3626] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  data-testid="contact-message"
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-[#E5E0D5] focus:border-[#D4AF37] text-[#1A3626] placeholder-[#4A5D53]/50 transition-colors duration-300 resize-none"
                  placeholder="Décrivez votre projet ou votre demande..."
                />
              </div>

              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl ${
                    status.type === "success"
                      ? "bg-[#1A3626]/10 text-[#1A3626]"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {status.message}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="contact-submit"
                className="btn-lift w-full bg-[#1A3626] text-[#FDFBF7] py-4 rounded-full text-base font-medium hover:bg-[#254D36] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    Envoyer le message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-[#1A3626] py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <span className="text-[#1A3626] font-serif text-xl font-bold">S</span>
            </div>
            <span className="font-serif text-2xl font-medium text-[#FDFBF7] tracking-tight">
              Saveur Impériale
            </span>
          </div>

          <p className="text-[#FDFBF7]/60 text-sm">
            © {new Date().getFullYear()} Saveur Impériale. Tous droits réservés.
          </p>

          <p className="text-[#D4AF37] font-serif italic text-lg">
            "Goûtez l'ultime !"
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  return (
    <div className="App bg-[#FDFBF7]">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
