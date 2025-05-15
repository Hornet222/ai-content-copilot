"use client";
import React, { useState } from 'react';
import { generateOutline, generateDraft, generateImage } from '../lib/api';
import ReactMarkdown from 'react-markdown';

const steps = [
  { label: "Idea" },
  { label: "Outline" },
  { label: "Draft" },
  { label: "Image" },
];

export default function Home() {
  const [topic, setTopic] = useState('');
  const [outline, setOutline] = useState('');
  const [draft, setDraft] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState('');
  const [draftError, setDraftError] = useState('');
  const [imageError, setImageError] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOutline('');
    setDraft('');
    setImageUrl('');
    setDraftError('');
    setImageError('');
    try {
      const result = await generateOutline(topic);
      setOutline(result);
      setActiveStep(1);
    } catch (err: any) {
      setError(err.message || 'Error generating outline');
    } finally {
      setLoading(false);
    }
  };

  const handleDraft = async () => {
    setDraftLoading(true);
    setDraftError('');
    setDraft('');
    setImageUrl('');
    setImageError('');
    try {
      const result = await generateDraft(outline);
      setDraft(result);
      setActiveStep(2);
    } catch (err: any) {
      setDraftError(err.message || 'Error generating draft');
    } finally {
      setDraftLoading(false);
    }
  };

  const handleImage = async () => {
    setImageLoading(true);
    setImageError('');
    setImageUrl('');
    
    try {
      // Create a prompt from the topic and a summary of the draft
      // We're using the topic to provide context and asking for an image that represents the content
      const prompt = `Create a professional, high-quality image that represents this topic: "${topic}". 
      The content discusses: ${draft.substring(0, 300)}...
      The image should be suitable for a blog post or article about this topic.`;
      
      const result = await generateImage(prompt);
      setImageUrl(result);
      setActiveStep(3);
    } catch (err: any) {
      setImageError(err.message || 'Error generating image');
    } finally {
      setImageLoading(false);
    }
  };

  const handleBack = () => {
    if (activeStep === 3) {
      setImageUrl('');
      setActiveStep(2);
    } else if (activeStep === 2) {
      setDraft('');
      setImageUrl('');
      setActiveStep(1);
    } else if (activeStep === 1) {
      setOutline('');
      setDraft('');
      setImageUrl('');
      setActiveStep(0);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-black">
      <h1 className="text-4xl font-bold mb-8 text-brand-gold tracking-tight">AI Content Co-Pilot</h1>
      {/* Stepper */}
      <div className="flex items-center mb-8 w-full max-w-2xl">
        {steps.map((step, idx) => (
          <>
            <div className="flex flex-col items-center flex-1">
              <div className={`rounded-full w-9 h-9 flex items-center justify-center font-bold shadow transition-all duration-200
                ${activeStep === idx
                  ? 'bg-brand-gold text-brand-black scale-110 shadow-lg'
                  : activeStep > idx
                  ? 'bg-brand-charcoal text-brand-white'
                  : 'bg-transparent border-2 border-brand-grayDark text-brand-grayMedium'}
              `}>
                {idx + 1}
              </div>
              <span className={`mt-2 text-xs font-semibold tracking-wide ${activeStep === idx ? 'text-brand-gold' : 'text-brand-grayMedium'}`}>{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-1 ${activeStep > idx ? 'bg-brand-gold' : 'bg-brand-grayDark'} mx-1 rounded-full`}></div>
            )}
          </>
        ))}
      </div>
      {/* Step Content */}
      <div className="w-full max-w-2xl bg-brand-black border border-brand-charcoal rounded-md shadow-lg p-8">
        {activeStep === 0 && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="font-semibold text-brand-gold">Enter your idea or topic:</label>
            <input
              type="text"
              placeholder="e.g. The Future of AI in Content Creation"
              className="border border-brand-charcoal bg-transparent rounded-md px-4 py-3 text-brand-white focus:outline-none focus:ring-2 focus:ring-brand-gold text-base placeholder-brand-grayMedium transition"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              disabled={loading || draftLoading || imageLoading}
            />
            <button
              type="submit"
              className="button-primary mt-2 disabled:opacity-60"
              disabled={loading || !topic.trim() || draftLoading || imageLoading}
            >
              {loading ? 'Generating...' : 'Generate Outline'}
            </button>
            {error && <div className="border border-red-500 rounded-md p-2 text-red-400 text-center bg-red-900 bg-opacity-20">{error}</div>}
          </form>
        )}
        {activeStep === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-3 text-brand-gold">Outline</h2>
            <div className="border border-brand-charcoal rounded-md p-4 bg-black bg-opacity-50 mb-4 prose prose-brand max-w-none">
              <ReactMarkdown>
                {outline}
              </ReactMarkdown>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleBack}
                className="button-secondary"
                disabled={loading || draftLoading || imageLoading}
              >
                Back
              </button>
              <button
                onClick={handleDraft}
                className="button-primary"
                disabled={draftLoading || imageLoading}
              >
                {draftLoading ? 'Generating Draft...' : 'Generate Draft'}
              </button>
            </div>
            {draftError && <div className="border border-red-500 rounded-md p-2 text-red-400 text-center bg-red-900 bg-opacity-20 mt-4">{draftError}</div>}
          </>
        )}
        {activeStep === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-3 text-brand-gold">Draft</h2>
            <div className="border border-brand-charcoal rounded-md p-4 bg-black bg-opacity-50 mb-4 prose prose-brand max-w-none overflow-y-auto max-h-[500px]">
              <ReactMarkdown>
                {draft}
              </ReactMarkdown>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleBack}
                className="button-secondary"
                disabled={loading || draftLoading || imageLoading}
              >
                Back
              </button>
              <button
                onClick={handleImage}
                className="button-primary"
                disabled={imageLoading}
              >
                {imageLoading ? 'Generating Image...' : 'Generate Image'}
              </button>
            </div>
            {imageError && <div className="border border-red-500 rounded-md p-2 text-red-400 text-center bg-red-900 bg-opacity-20 mt-4">{imageError}</div>}
          </>
        )}
        {activeStep === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-3 text-brand-gold">Featured Image</h2>
            <div className="border border-brand-charcoal rounded-md overflow-hidden mb-4">
              <img 
                src={imageUrl} 
                alt="Generated content image" 
                className="w-full h-auto"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleBack}
                className="button-secondary"
              >
                Back
              </button>
              <a 
                href={imageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="button-primary"
              >
                Download Image
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
} 