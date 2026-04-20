import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateMealPlan = async (budget, calories, diet) => {
  const prompt = `
    You are an expert nutritionist and meal planner. 
    Create a daily meal plan with the following STRICT constraints:
    - Daily Budget: $${budget} (HARD LIMIT)
    - Target Calories: ${calories} kcal
    - Diet Type: ${diet}

    You MUST ensure the total cost of all ingredients mathematically adds up to LESS THAN OR EQUAL TO $${budget}. Use realistic simulated prices for every ingredient to calculate this accurately.

    Return the result STRICTLY as a JSON object matching this schema:
    {
      "meals": {
        "breakfast": "string (meal description)",
        "lunch": "string (meal description)",
        "dinner": "string (meal description)"
      },
      "grocery_list": ["string (ingredient 1 - estimated price: $X)", "string (ingredient 2 - estimated price: $Y)"],
      "nutrition": {
        "calories": number (total calories),
        "protein": number (total grams),
        "carbs": number (total grams),
        "fats": number (total grams)
      }
    }
    
    Do not include any markdown formatting, explanations, or text outside of the JSON object.
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You output strictly in valid JSON format. Do not use markdown blocks like \`\`\`json.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content returned from Groq API');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating meal plan from AI:', error);
    throw new Error('Failed to generate meal plan from AI service');
  }
};
