const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function generateOutline(topic: string): Promise<string> {
  const res = await fetch(`${API_URL}/outline`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });
  if (!res.ok) throw new Error("Failed to generate outline");
  const data = await res.json();
  return data.outline;
}

export async function generateDraft(outline: string): Promise<string> {
  const res = await fetch(`${API_URL}/draft`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ outline }),
  });
  if (!res.ok) throw new Error("Failed to generate draft");
  const data = await res.json();
  return data.draft;
}

export async function generateImage(prompt: string): Promise<string> {
  const res = await fetch(`${API_URL}/image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error("Failed to generate image");
  const data = await res.json();
  return data.image_url;
} 