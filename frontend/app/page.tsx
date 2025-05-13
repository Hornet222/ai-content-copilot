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

  const handleSubmit = async (e: React.FormEvent) => {
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
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">AI Content Co-Pilot</h1>
      {/* Stepper */}
      <div className="flex items-center mb-8 w-full max-w-2xl">
        {steps.map((step, idx) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center flex-1">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-white ${
                activeStep === idx
                  ? 'bg-blue-600 scale-110 shadow-lg'
                  : activeStep > idx
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}>
                {idx + 1}
              </div>
              <span className={`mt-2 text-xs font-medium ${activeStep === idx ? 'text-blue-700' : 'text-gray-500'}`}>{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-1 ${activeStep > idx ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Step Content */}
      <div className="w-full max-w-2xl bg-white rounded shadow p-6">
        {activeStep === 0 && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="font-medium">Enter your idea or topic:</label>
            <input
              type="text"
              placeholder="e.g. The Future of AI in Content Creation"
              className="border rounded px-3 py-2"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              disabled={loading || draftLoading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
              disabled={loading || !topic.trim() || draftLoading}
            >
              {loading ? 'Generating...' : 'Generate Outline'}
            </button>
            {error && <div className="border rounded p-2 text-red-600 text-center">{error}</div>}
          </form>
        )}
        {activeStep === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Outline</h2>
            <pre className="border rounded p-4 text-left whitespace-pre-wrap bg-gray-50 mb-4">
              {outline}
            </pre>
            <div className="flex gap-2">
              <button
                onClick={handleBack}
                className="bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400"
                disabled={loading || draftLoading}
              >
                Back
              </button>
              <button
                onClick={handleDraft}
                className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
                disabled={draftLoading}
              >
                {draftLoading ? 'Generating Draft...' : 'Generate Draft'}
              </button>
            </div>
            {draftError && <div className="border rounded p-2 text-red-600 text-center mt-4">{draftError}</div>}
          </>
        )}
        {activeStep === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Draft</h2>
            <pre className="border rounded p-4 text-left whitespace-pre-wrap bg-gray-100 mb-4">
              {draft}
            </pre>
            <div className="flex gap-2">
              <button
                onClick={handleBack}
                className="bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400"
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