// Random topics for poem generation to ensure variety
const poemTopics = [
    "a happy puppy playing in the park",
    "butterflies dancing in the garden",
    "a friendly dinosaur",
    "the moon and stars at night",
    "a colorful rainbow after rain",
    "a little bird learning to fly",
    "ocean waves and seashells",
    "a magical treehouse",
    "ice cream on a sunny day",
    "a brave little mouse",
    "flowers blooming in spring",
    "a playful kitten with yarn",
    "clouds floating in the sky",
    "a shiny red balloon",
    "frogs jumping by the pond",
    "snowflakes falling gently",
    "a busy little bee",
    "the wind blowing through trees",
    "a smiling sun",
    "teddy bears having a picnic",
    "fish swimming in the sea",
    "a train chugging along",
    "autumn leaves falling down",
    "a friendly robot helper",
    "bunnies hopping in the meadow"
];

// Get a random topic
function getRandomTopic(): string {
    return poemTopics[Math.floor(Math.random() * poemTopics.length)];
}

export const geminiService = {
    generatePoem: async (theme?: string): Promise<{ title: string; author: string; content: string[] }> => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            console.warn("Gemini API Key not found. Using fallback poem.");
            // Fallback poem
            return {
                title: "Rainbow Colors",
                author: "KIDILAB AI",
                content: [
                    "Red and orange, yellow too,",
                    "Green and blue, and purple hue.",
                    "All the colors in the sky,",
                    "Make a rainbow way up high!"
                ]
            };
        }

        try {
            // Use provided theme or select a random topic
            const selectedTopic = theme || getRandomTopic();

            // Add timestamp to ensure uniqueness
            const uniqueId = Date.now();

            const prompt = `Create a unique, original child-friendly poem about ${selectedTopic}. 

IMPORTANT: Make this poem DIFFERENT from any previous poems. Be creative and unique!

Requirements:
- 4-6 lines long
- Simple words for children aged 3-7
- Fun rhyming pattern (AABB or ABAB)
- Joyful and positive tone
- Each poem must be completely different and original

Format: Return ONLY a valid JSON object (no markdown, no code blocks):
{
  "title": "Creative Title Here",
  "content": ["Line 1", "Line 2", "Line 3", "Line 4"]
}

Request ID: ${uniqueId}`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 1.0,  // Increased for more creativity
                        topK: 50,          // Increased for more variety
                        topP: 0.98,        // Increased for more diversity
                        maxOutputTokens: 1024,
                    }
                }),
            });

            if (!response.ok) {
                throw new Error(`Gemini API error: ${response.statusText}`);
            }

            const data = await response.json();
            const generatedText = data.candidates[0].content.parts[0].text;

            // Try to parse JSON from the response
            let poemData;
            try {
                // Remove markdown code blocks if present
                const cleanText = generatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                poemData = JSON.parse(cleanText);
            } catch (parseError) {
                console.error("Failed to parse Gemini response as JSON:", generatedText);
                // Fallback: try to extract title and content manually
                const lines = generatedText.split('\n').filter((line: string) => line.trim());
                poemData = {
                    title: lines[0] || "A New Poem",
                    content: lines.slice(1).filter((line: string) => line.trim() && !line.includes('{') && !line.includes('}'))
                };
            }

            return {
                title: poemData.title || "A New Poem",
                author: "KIDILAB AI",
                content: Array.isArray(poemData.content) ? poemData.content : [poemData.content]
            };
        } catch (error) {
            console.error("Error generating poem with Gemini:", error);
            // Return fallback poem with random topic
            const randomTopic = getRandomTopic();
            return {
                title: `Poem About ${randomTopic.split(' ').slice(1, 3).join(' ')}`,
                author: "KIDILAB AI",
                content: [
                    "The sun is shining bright today,",
                    "Come outside and let's go play!",
                    "Jump and run and laugh with glee,",
                    "Happy as can be!"
                ]
            };
        }
    }
};
