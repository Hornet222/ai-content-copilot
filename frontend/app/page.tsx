"use client";
import React, { useState } from 'react';
import { generateOutline, generateDraft } from '../lib/api';

const steps = [
  { label: "Idea" },
  { label: "Outline" },
  { label: "Draft" },
];

export default function Home() {
  const [topic, setTopic] = useState('');
  const [outline, setOutline] = useState('');
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [error, setError] = useState('');
  const [draftError, setDraftError] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOutline('');
    setDraft('');
    setDraftError('');
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

  const handleBack = () => {
    if (activeStep === 2) {
      setDraft('');
      setActiveStep(1);
    } else if (activeStep === 1) {
      setOutline('');
      setDraft('');
      setActiveStep(0);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-grayLight">
      <h1 className="text-4xl font-bold mb-8 text-brand-charcoal tracking-tight">AI Content Co-Pilot</h1>
      {/* Stepper */}
      <div className="flex items-center mb-8 w-full max-w-2xl">
        {steps.map((step, idx) => (
          <>
            <div className="flex flex-col items-center flex-1">
              <div className={`rounded-full w-9 h-9 flex items-center justify-center font-bold text-white shadow transition-all duration-200
                ${activeStep === idx
                  ? 'bg-brand-pink scale-110 shadow-lg'
                  : activeStep > idx
                  ? 'bg-brand-charcoal'
                  : 'bg-brand-grayMedium'}
              `}>
                {idx + 1}
              </div>
              <span className={`mt-2 text-xs font-semibold tracking-wide ${activeStep === idx ? 'text-brand-pink' : 'text-brand-grayMedium'}`}>{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-1 ${activeStep > idx ? 'bg-brand-charcoal' : 'bg-brand-grayMedium'} mx-1 rounded-full`}></div>
            )}
          </>
        ))}
      </div>
      {/* Step Content */}
      <div className="w-full max-w-2xl bg-white rounded-md shadow-lg p-8">
        {activeStep === 0 && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="font-semibold text-brand-charcoal">Enter your idea or topic:</label>
            <input
              type="text"
              placeholder="e.g. The Future of AI in Content Creation"
              className="border border-brand-grayBorder rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink text-base placeholder-brand-grayMedium transition"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              disabled={loading || draftLoading}
            />
            <button
              type="submit"
              className="button-primary mt-2 disabled:opacity-60"
              disabled={loading || !topic.trim() || draftLoading}
            >
              {loading ? 'Generating...' : 'Generate Outline'}
            </button>
            {error && <div className="border border-red-200 rounded-md p-2 text-red-600 text-center bg-red-50">{error}</div>}
          </form>
        )}
        {activeStep === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-3 text-brand-charcoal">Outline</h2>
            <pre className="border border-brand-grayBorder rounded-md p-4 text-left whitespace-pre-wrap bg-brand-grayLight mb-4 text-base font-mono">
              {outline}
            </pre>
            <div className="flex gap-2">
              <button
                onClick={handleBack}
                className="button-secondary"
                disabled={loading || draftLoading}
              >
                Back
              </button>
              <button
                onClick={handleDraft}
                className="button-primary"
                disabled={draftLoading}
              >
                {draftLoading ? 'Generating Draft...' : 'Generate Draft'}
              </button>
            </div>
            {draftError && <div className="border border-red-200 rounded-md p-2 text-red-600 text-center bg-red-50 mt-4">{draftError}</div>}
          </>
        )}
        {activeStep === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-3 text-brand-charcoal">Draft</h2>
            <pre className="border border-brand-grayBorder rounded-md p-4 text-left whitespace-pre-wrap bg-brand-grayLight mb-4 text-base font-mono">
              {draft}
            </pre>
            <div className="flex gap-2">
              <button
                onClick={handleBack}
                className="button-secondary"
                disabled={loading || draftLoading}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
} 