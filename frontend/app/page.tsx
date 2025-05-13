"use client";
import React, { useState } from 'react';
import { generateOutline } from '../lib/api';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [outline, setOutline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOutline('');
    try {
      const result = await generateOutline(topic);
      setOutline(result);
    } catch (err: any) {
      setError(err.message || 'Error generating outline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">AI Content Co-Pilot</h1>
      <form className="w-full max-w-md flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your idea or topic..."
          className="border rounded px-3 py-2"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          disabled={loading || !topic.trim()}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      <div className="mt-8 w-full max-w-2xl">
        {error && (
          <div className="border rounded p-4 text-red-600 text-center mb-4">{error}</div>
        )}
        {outline ? (
          <pre className="border rounded p-4 text-left whitespace-pre-wrap bg-gray-50">
            {outline}
          </pre>
        ) : !loading && !error && (
          <div className="border rounded p-4 text-gray-500 text-center">
            Results will appear here.
          </div>
        )}
      </div>
    </main>
  );
} 