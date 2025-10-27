export const geminiApi = {
  async sendMessage(message, apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: message }]
          }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 800,
            topP: 0.95,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API Error:', errorData);
        
        if (response.status === 400) {
          throw new Error('Invalid API key or request format');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else if (response.status === 403) {
          throw new Error('API key not authorized or quota exceeded');
        } else {
          throw new Error(errorData.error?.message || `Gemini API Error: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log('Gemini API Response:', data); // For debugging
      
      // Handle Gemini API response structure
      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          return candidate.content.parts[0].text;
        }
      }
      
      // Fallback for empty or unexpected response
      throw new Error('No valid response from Gemini API');
      
    } catch (error) {
      console.error('Error in geminiApi.sendMessage:', error);
      throw error;
    }
  }
};