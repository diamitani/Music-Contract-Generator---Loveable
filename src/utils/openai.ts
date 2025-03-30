
import { toast } from "sonner";

interface OpenAIAssistantConfig {
  apiKey: string;
  assistantId?: string;
  model?: string;
}

class OpenAIService {
  private apiKey: string;
  private assistantId: string;
  private model: string;

  constructor(config: OpenAIAssistantConfig) {
    this.apiKey = config.apiKey;
    this.assistantId = config.assistantId || "asst_"; // Default assistant ID
    this.model = config.model || "gpt-4o";
  }

  async generateContract(prompt: string, contractType: string): Promise<string> {
    try {
      if (!this.apiKey) {
        throw new Error("API key is required");
      }

      console.log("Generating contract with OpenAI...");
      
      // Create a thread
      const threadResponse = await fetch("https://api.openai.com/v1/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
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
          "Authorization": `Bearer ${this.apiKey}`,
          "OpenAI-Beta": "assistants=v1"
        },
        body: JSON.stringify({
          role: "user",
          content: `Generate a ${contractType} contract with the following details: ${prompt}`
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
          "Authorization": `Bearer ${this.apiKey}`,
          "OpenAI-Beta": "assistants=v1"
        },
        body: JSON.stringify({
          assistant_id: this.assistantId,
          model: this.model,
          instructions: `You are a legal expert specializing in music industry contracts. Generate a comprehensive ${contractType} contract based on the provided details. The contract should be well-structured, legally sound, and formatted for professional use.`
        })
      });

      if (!runResponse.ok) {
        const error = await runResponse.json();
        throw new Error(`Failed to create run: ${error.error?.message || 'Unknown error'}`);
      }

      const run = await runResponse.json();
      const runId = run.id;

      // Poll for completion
      let runStatus = await this.pollRunStatus(threadId, runId);

      if (runStatus !== "completed") {
        throw new Error(`Run failed with status: ${runStatus}`);
      }

      // Get messages
      const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "OpenAI-Beta": "assistants=v1"
        }
      });

      if (!messagesResponse.ok) {
        const error = await messagesResponse.json();
        throw new Error(`Failed to fetch messages: ${error.error?.message || 'Unknown error'}`);
      }

      const messages = await messagesResponse.json();
      const assistantMessages = messages.data
        .filter((msg: any) => msg.role === "assistant")
        .map((msg: any) => msg.content)
        .flat()
        .map((content: any) => content.text?.value || "")
        .join("\n\n");

      return assistantMessages || "No contract was generated. Please try again with more detailed requirements.";
    } catch (error: any) {
      console.error("OpenAI API Error:", error);
      throw new Error(`OpenAI API Error: ${error.message}`);
    }
  }

  private async pollRunStatus(threadId: string, runId: string): Promise<string> {
    let status = "in_progress";
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max (with 5-second intervals)

    while (status === "in_progress" || status === "queued" && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds between polls
      
      const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
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
}

export default OpenAIService;
