
import OpenAIService from './openai';

export interface AnalyzedTerm {
  term: string;
  explanation: string;
}

export async function analyzeContract(contract: string, apiKey: string): Promise<AnalyzedTerm[]> {
  try {
    if (!apiKey) {
      throw new Error("API key is required for contract analysis");
    }

    const openAI = new OpenAIService({
      apiKey,
      model: "gpt-4o",
    });

    // Create a thread
    const threadResponse = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1"
      },
      body: JSON.stringify({})
    });

    if (!threadResponse.ok) {
      const error = await threadResponse.json();
      throw new Error(`Failed to create thread: ${error.error?.message || 'Unknown error'}`);
    }

    const thread = await threadResponse.json();
    const threadId = thread.id;

    // Add a message to the thread
    const messageResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1"
      },
      body: JSON.stringify({
        role: "user",
        content: `Please analyze this music contract and identify key terms. Break down each term in simple language that a non-lawyer can understand. Format your response as a structured list of terms and explanations. Here's the contract: ${contract}`
      })
    });

    if (!messageResponse.ok) {
      const error = await messageResponse.json();
      throw new Error(`Failed to add message: ${error.error?.message || 'Unknown error'}`);
    }

    // Create a run
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1"
      },
      body: JSON.stringify({
        assistant_id: "asst_", // Default assistant ID
        model: "gpt-4o",
        instructions: `You are an expert in music industry contracts. Your job is to analyze contracts and break down complex legal terms into simple explanations that musicians and artists can understand. Focus on identifying potentially problematic clauses, rights assignments, payment terms, and exclusivity requirements. Format your response as a structured JSON-parseable list of terms and explanations.`
      })
    });

    if (!runResponse.ok) {
      const error = await runResponse.json();
      throw new Error(`Failed to create run: ${error.error?.message || 'Unknown error'}`);
    }

    const run = await runResponse.json();
    const runId = run.id;

    // Poll for completion
    let status = await pollRunStatus(threadId, runId, apiKey);

    if (status !== "completed") {
      throw new Error(`Run failed with status: ${status}`);
    }

    // Get messages
    const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1"
      }
    });

    if (!messagesResponse.ok) {
      const error = await messagesResponse.json();
      throw new Error(`Failed to fetch messages: ${error.error?.message || 'Unknown error'}`);
    }

    const messages = await messagesResponse.json();
    const assistantResponses = messages.data
      .filter((msg: any) => msg.role === "assistant")
      .map((msg: any) => msg.content)
      .flat()
      .map((content: any) => content.text?.value || "")
      .join("\n\n");

    // Parse the response to extract terms and explanations
    try {
      // First try to extract JSON directly if the AI formatted it as JSON
      if (assistantResponses.includes('{') && assistantResponses.includes('}')) {
        const jsonMatch = assistantResponses.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonStr = jsonMatch[0];
          const parsed = JSON.parse(jsonStr);
          if (Array.isArray(parsed.terms)) {
            return parsed.terms;
          }
        }
      }

      // Fallback to parsing formatted lists
      const terms: AnalyzedTerm[] = [];
      const lines = assistantResponses.split('\n');
      let currentTerm: string | null = null;
      let currentExplanation = '';

      for (const line of lines) {
        if (line.match(/^[0-9]+\.|^-|^\*|^•/) && line.includes(':')) {
          // If we have a previous term, save it
          if (currentTerm) {
            terms.push({ term: currentTerm, explanation: currentExplanation.trim() });
          }
          
          // Start a new term
          const [term, ...explanationParts] = line.split(':');
          currentTerm = term.replace(/^[0-9]+\.|^-|^\*|^•/, '').trim();
          currentExplanation = explanationParts.join(':').trim();
        } else if (currentTerm && line.trim()) {
          // Add to current explanation
          currentExplanation += ' ' + line.trim();
        }
      }

      // Add the last term
      if (currentTerm) {
        terms.push({ term: currentTerm, explanation: currentExplanation.trim() });
      }

      return terms;
    } catch (e) {
      console.error("Failed to parse AI response:", e);
      
      // Return a simplified fallback
      return [
        { 
          term: "Contract Analysis", 
          explanation: "The AI analyzed your contract but encountered an issue formatting the results. Here's the raw analysis:\n\n" + assistantResponses 
        }
      ];
    }
  } catch (error: any) {
    console.error("Contract analysis error:", error);
    throw new Error(`Contract analysis error: ${error.message}`);
  }
}

async function pollRunStatus(threadId: string, runId: string, apiKey: string): Promise<string> {
  let status = "in_progress";
  let attempts = 0;
  const maxAttempts = 60; // 5 minutes max (with 5-second intervals)

  while ((status === "in_progress" || status === "queued") && attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds between polls
    
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1"
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to check run status: ${error.error?.message || 'Unknown error'}`);
    }

    const runData = await response.json();
    status = runData.status;
    attempts++;
  }

  return status;
}
