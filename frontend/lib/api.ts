export async function generateOutline(topic: string): Promise<string> {
  const res = await fetch("http://localhost:8000/outline", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });
  if (!res.ok) throw new Error("Failed to generate outline");
  const data = await res.json();
  return data.outline;
}

export async function generateDraft(outline: string): Promise<string> {
  const res = await fetch("http://localhost:8000/draft", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ outline }),
  });
  if (!res.ok) throw new Error("Failed to generate draft");
  const data = await res.json();
  return data.draft;
} 