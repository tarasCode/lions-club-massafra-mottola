'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contatti() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {
      alert('Per favore, compila tutti i campi obbligatori');
      return;
    }

    try {
      // In a real application, this would send to a backend service
      // For now, we'll just show a success message
      console.log('Form data:', formData);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Errore durante l\'invio del messaggio. Per favore, riprova.');
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-lions-navy to-lions-navy/80 text-white py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <MessageSquare size={32} className="text-lions-gold" />
            <h1 className="text-5xl font-bold font-serif">Contatti</h1>
          </div>
          <p className="text-xl text-lions-light-gold">
            Raggiungi il Lions Club Massafra-Mottola Le Cripte
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="section-padding bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Card 1 */}
            <div className="card text-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-lions-gold/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-lions-gold" />
              </div>
              <h3 className="text-xl font-bold text-lions-navy mb-2">
                Ubicazione
              </h3>
              <p className="text-gray-600 text-sm">
                Massafra - Mottola<br />
                Provincia di Taranto<br />
                Puglia, Italia
              </p>
            </div>

            {/* Contact Info Card 2 */}
            <div className="card text-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-lions-gold/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-lions-gold" />
              </div>
              <h3 className="text-xl font-bold text-lions-navy mb-2">Email</h3>
              <a
                href="mailto:info@lionsclubmassafra.it"
                className="text-lions-gold hover:text-lions-navy transition-colors font-semibold"
              >
                info@lionsclubmassafra.it
              </a>
            </div>

            {/* Contact Info Card 3 */}
            <div className="card text-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-lions-gold/20 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-lions-gold" />
              </div>
              <h3 className="text-xl font-bold text-lions-navy mb-2">Telefono</h3>
              <a
                href="tel:+39099123456"
                className="text-lions-gold hover:text-lions-navy transition-colors font-semibold"
              >
                +39 (0)99 123 456
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold text-lions-navy mb-6 font-serif">
                Scrivici un Messaggio
              </h2>
              <p className="text-gray-600 mb-8">
                Completa il form qui sotto e riceverai una risposta al più presto.
                Risponderemo entro 48 ore lavorative.
              </p>

              {submitted ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                  <h3 className="text-lg font-bold text-green-800 mb-2">
                    Messaggio Inviato!
                  </h3>
                  <p className="text-green-700">
                    Grazie per il tuo messaggio. Ti contatteremo presto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-lions-navy mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-lions-gold focus:ring-2 focus:ring-lions-gold/20 transition-colors"
                      placeholder="Il tuo nome"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-lions-navy mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-lions-gold focus:ring-2 focus:ring-lions-gold/20 transition-colors"
                        placeholder="tua@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-lions-navy mb-2">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-lions-gold focus:ring-2 focus:ring-lions-gold/20 transition-colors"
                        placeholder="+39 000 000 000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-lions-navy mb-2">
                      Oggetto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-lions-gold focus:ring-2 focus:ring-lions-gold/20 transition-colors"
                      placeholder="Motivo del contatto"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-lions-navy mb-2">
                      Messaggio *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-lions-gold focus:ring-2 focus:ring-lions-gold/20 transition-colors resize-none"
                      placeholder="Scrivi il tuo messaggio..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-lions-navy text-white font-bold rounded-lg hover:bg-lions-gold hover:text-lions-navy transition-all flex items-center justify-center gap-2 group"
                  >
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    Invia Messaggio
                  </button>
                </form>
              )}
            </div>

            {/* Map and Additional Info */}
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-bold text-lions-navy mb-6 font-serif">
                Visita il Nostro Territorio
              </h2>

              {/* Google Maps Embed */}
              <div className="w-full h-96 rounded-lg mb-6 overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48392.33636195037!2d17.08!3d40.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347e36ae60c79e5%3A0x410e3c3b4f7b6e0!2s74016%20Massafra%20TA%2C%20Italy!5e0!3m2!1sen!2sit!4v1711700000000!5m2!1sen!2sit"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mappa Lions Club Massafra-Mottola"
                ></iframe>
              </div>

              {/* Hours & Info */}
              <div className="card mb-6">
                <h3 className="text-lg font-bold text-lions-navy mb-4">
                  Orari di Contatto
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-lions-navy">Lunedì - Venerdì</p>
                    <p className="text-gray-600">18:00 - 20:00</p>
                  </div>
                  <div>
                    <p className="font-semibold text-lions-navy">Sabato</p>
                    <p className="text-gray-600">10:00 - 13:00</p>
                  </div>
                  <div>
                    <p className="font-semibold text-lions-navy">Domenica</p>
                    <p className="text-gray-600">Chiuso</p>
                  </div>
                </div>
              </div>

              {/* Riunioni */}
              <div className="card bg-lions-light-gray">
                <h3 className="text-lg font-bold text-lions-navy mb-4">
                  Riunioni Ordinarie
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Secondo lunedì del mese alle 19:30
                </p>
                <p className="text-xs text-gray-500">
                  Se interessato, contattaci per essere invitato alla prossima riunione.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="section-padding bg-lions-light-gray">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-lions-navy mb-6 font-serif">
            Seguici Online
          </h2>
          <p className="text-gray-600 mb-8">
            Rimani connesso con il nostro club sui social media per gli ultimi aggiornamenti
            e le notizie sulle nostre attività.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-lions-navy text-white font-semibold rounded-lg hover:bg-lions-gold hover:text-lions-navy transition-all"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-lions-navy text-white font-semibold rounded-lg hover:bg-lions-gold hover:text-lions-navy transition-all"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-lions-navy text-white font-semibold rounded-lg hover:bg-lions-gold hover:text-lions-navy transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-lions-navy mb-12 font-serif text-center">
            Domande Frequenti
          </h2>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-bold text-lions-navy mb-3">
                Come mi iscrivo come socio?
              </h3>
              <p className="text-gray-600">
                Contattaci per una riunione conoscitiva. Ti spiegheremo i requisiti e il processo di
                ammissione. Puoi compilare il form nella sezione{' '}
                <Link href="/chi-siamo/diventa-socio" className="text-lions-gold hover:text-lions-navy">
                  Diventa Socio
                </Link>
                .
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-lions-navy mb-3">
                Quali sono le quote associative?
              </h3>
              <p className="text-gray-600">
                Le quote sono stabilite annualmente dal club e sono utilizzate interamente per i service
                comunitari. Per informazioni specifiche, contattaci direttamente.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-lions-navy mb-3">
                Quali sono i vostri service principali?
              </h3>
              <p className="text-gray-600">
                Operiamo nelle 8 aree di focus di Lions International: Visione, Gioventù, Sanità,
                Ambiente, Istruzione, Comunità, Fame e Povertà, Diritti Umani. Visita la pagina{' '}
                <Link href="/chi-siamo" className="text-lions-gold hover:text-lions-navy">
                  Chi Siamo
                </Link>
                {' '}per dettagli.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-lions-navy mb-3">
                Come posso contattare il presidente?
              </h3>
              <p className="text-gray-600">
                Puoi inviare un messaggio tramite il form di contatto su questa pagina
                specificando che desideri parlare con il presidente. Saremo felici di
                organizzare una riunione.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
