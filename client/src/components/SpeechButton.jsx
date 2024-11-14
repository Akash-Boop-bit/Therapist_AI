import React from 'react';
import { franc } from 'franc';

const SpeechButton = ({ text }) => {
  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;

      const speak = () => {
        // Cancel any ongoing speech
        synth.cancel();

        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(text);

        // Detect language
        const langTag = detectLanguage(text);

        if (langTag) {
          utterance.lang = langTag;

          // Get the list of voices
          let voices = synth.getVoices();

          // Find a voice that matches the language
          const voice = voices.find((voice) =>
            voice.lang.toLowerCase().startsWith(langTag.toLowerCase())
          );

          if (voice) {
            utterance.voice = voice;
            // Start speaking
            synth.speak(utterance);
          } else {
            console.warn(`No voice found for language: ${langTag}`);
            alert(`No voice available for the language: ${langTag}`);
          }
        } else {
          alert('Could not detect the language of the text.');
        }
      };

      // Check if voices are loaded
      if (synth.getVoices().length === 0) {
        // Wait for the 'voiceschanged' event
        synth.addEventListener('voiceschanged', speak);
      } else {
        speak();
      }
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
    }
  };

  // Language detection function
  const detectLanguage = (text) => {
    // Unicode range checks for specific scripts
    const scripts = [
      { lang: 'ta', regex: /[\u0B80-\u0BFF]/ }, // Tamil
      { lang: 'hi', regex: /[\u0900-\u097F]/ }, // Hindi
      { lang: 'bn', regex: /[\u0980-\u09FF]/ }, // Bengali
      { lang: 'te', regex: /[\u0C00-\u0C7F]/ }, // Telugu
      { lang: 'kn', regex: /[\u0C80-\u0CFF]/ }, // Kannada
      { lang: 'ml', regex: /[\u0D00-\u0D7F]/ }, // Malayalam
      { lang: 'gu', regex: /[\u0A80-\u0AFF]/ }, // Gujarati
      { lang: 'pa', regex: /[\u0A00-\u0A7F]/ }, // Punjabi
      { lang: 'zh', regex: /[\u4E00-\u9FFF]/ }, // Chinese
      { lang: 'ja', regex: /[\u3040-\u30FF\u31F0-\u31FF]/ }, // Japanese
      { lang: 'ko', regex: /[\uAC00-\uD7AF]/ }, // Korean
      { lang: 'ru', regex: /[\u0400-\u04FF]/ }, // Russian
      { lang: 'ar', regex: /[\u0600-\u06FF]/ }, // Arabic
      // Add more scripts and languages as needed
    ];

    for (let script of scripts) {
      if (script.regex.test(text)) {
        return script.lang;
      }
    }

    // Use franc for texts that use Latin script
    const langCode = franc(text);

    if (langCode !== 'und') {
      // Map ISO 639-3 codes to ISO 639-1 codes
      const iso6393to1 = {
        // ISO 639-3 to ISO 639-1 mapping
        'eng': 'en',
        'spa': 'es',
        'fra': 'fr',
        'deu': 'de',
        'ita': 'it',
        'por': 'pt',
        'rus': 'ru',
        'hin': 'hi',
        'ara': 'ar',
        'ben': 'bn',
        'tur': 'tr',
        'vie': 'vi',
        'pol': 'pl',
        'ukr': 'uk',
        'nld': 'nl',
        'swe': 'sv',
        'ron': 'ro',
        'hun': 'hu',
        'ces': 'cs',
        'bul': 'bg',
        'fin': 'fi',
        'dan': 'da',
        'heb': 'he',
        // Add more mappings as needed
      };

      const langTag = iso6393to1[langCode];
      if (langTag) {
        return langTag;
      }
    }

    // Default to English if language is undetermined
    return 'en';
  };

  return (
    <div className='speechdiv'>
      <button className='speechstart' onClick={handleSpeak}>Speak</button>
      <button className='speechstop' onClick={handleStop}>Stop Speaking</button>
    </div>
  );
};

export default SpeechButton;
