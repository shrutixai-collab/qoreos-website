require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(cors());
app.use(express.json());

// Serve main site
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve demo pages
app.use('/demo', express.static(path.join(__dirname, 'demo')));

// Helper: strip markdown code fences and parse JSON
function parseJSON(text) {
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  return JSON.parse(cleaned);
}

// POST /api/qsales/generate
app.post('/api/qsales/generate', async (req, res) => {
  console.log('\n[/api/qsales/generate] Request received');
  console.log('Body:', JSON.stringify(req.body, null, 2));

  const { businessName, product, leadSource, leadsPerWeek } = req.body;

  if (!businessName || !product || !leadSource || !leadsPerWeek) {
    console.log('[/api/qsales/generate] Missing fields — rejecting');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const systemPrompt = `You are Q:Sales, an AI sales employee built by QoreOS. You are generating a realistic simulation dashboard for a potential client to show them what Q:Sales would do for their business.
You must respond with ONLY valid JSON, no markdown, no backticks, no explanation. Just the raw JSON object.
Generate data that feels specific to the business type provided. Use Indian names for leads. Mix Hindi, Hinglish, and English in lead messages realistically. Make the data feel like a real day in this business's sales operation.`;

  const userPrompt = `Generate a complete Q:Sales dashboard simulation for this business:

Business: ${businessName}
Product: ${product}
Primary lead source: ${leadSource}
Weekly leads: ${leadsPerWeek}

Return this exact JSON structure:
{
  "discovery": {
    "category": "business category like D2C Skincare, Food & Beverages, etc.",
    "platforms": ["Instagram", "WhatsApp"],
    "segment": "Premium / Mid-range / Budget",
    "competition": "High / Medium / Low",
    "recommendation": "one line about what Q:Sales should focus on for this business"
  },
  "briefing": "Write a 4-5 line morning sales briefing from Q:Sales to the founder. Address them as the business owner. Mention specific lead names, pipeline value in INR, what happened overnight, one actionable insight. Keep it warm, professional, like a trusted sales manager talking to the boss.",
  "pipeline": {
    "new": [
      {
        "id": "1",
        "name": "Indian name",
        "city": "Indian city",
        "message": "realistic enquiry message in Hinglish or English, matching the product type",
        "source": "WhatsApp/Instagram/Website",
        "time": "realistic time like 2 hours ago, yesterday 9pm, etc.",
        "score": "hot/warm/cold",
        "intent": "one line about what they want"
      }
    ],
    "contacted": [{"id":"3","name":"","city":"","message":"","source":"","time":"","score":"","intent":""}],
    "interested": [{"id":"5","name":"","city":"","message":"","source":"","time":"","score":"","intent":""}],
    "negotiation": [{"id":"7","name":"","city":"","message":"","source":"","time":"","score":"","intent":""}],
    "won": [{"id":"8","name":"","city":"","message":"","source":"","time":"","score":"","intent":""}]
  },
  "insights": [
    "insight 1 — specific to this business type, with a percentage or number",
    "insight 2",
    "insight 3",
    "insight 4"
  ],
  "pipelineValue": "total pipeline value as a string like ₹3.8L"
}

Make sure:
- Lead messages feel real and match the product (skincare leads ask different things than food leads)
- Mix of Hinglish and English in messages
- Lead names are realistic Indian names
- Cities are real Indian cities
- Time stamps feel like a real day
- Generate exactly 2 leads for "new", 2 for "contacted", 2 for "interested", 1 for "negotiation", 1 for "won"`;

  try {
    console.log('[/api/qsales/generate] Calling Claude API...');
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    });

    const raw = message.content[0].text;
    console.log('[/api/qsales/generate] Raw response length:', raw.length);
    console.log('[/api/qsales/generate] First 200 chars:', raw.slice(0, 200));

    const data = parseJSON(raw);
    console.log('[/api/qsales/generate] Parsed OK — pipeline keys:', Object.keys(data.pipeline || {}));
    res.json(data);
  } catch (err) {
    console.error('[/api/qsales/generate] ERROR:', err.status || '', err.message);
    if (err.error) console.error('API error detail:', JSON.stringify(err.error));
    res.status(500).json({ error: 'Failed to generate dashboard', details: err.message });
  }
});

// POST /api/qsales/lead-detail
app.post('/api/qsales/lead-detail', async (req, res) => {
  console.log('\n[/api/qsales/lead-detail] Request for lead:', req.body?.lead?.name);

  const { businessName, product, lead } = req.body;

  if (!businessName || !product || !lead) {
    console.log('[/api/qsales/lead-detail] Missing fields — rejecting');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const systemPrompt = `You are Q:Sales, an AI sales employee built by QoreOS. You generate precise, actionable sales intelligence for Indian businesses.
Respond with ONLY valid JSON. No markdown, no backticks, no explanation.`;

  const userPrompt = `Analyse this lead for ${businessName} (sells: ${product}) and generate reply + action plan.

Lead details:
Name: ${lead.name}
City: ${lead.city}
Source: ${lead.source}
Score: ${lead.score}
Message: "${lead.message}"
Intent: ${lead.intent}

Return this exact JSON:
{
  "suggestedReply": "the perfect reply to send to this lead, matching their language and tone — if their message is in Hinglish, reply in Hinglish. Keep it friendly, warm, and business-appropriate. 2-4 sentences max.",
  "followUpPlan": "when and how to follow up — e.g. 'Follow up in 18 hours with a product comparison image on WhatsApp'",
  "objectionFlag": "if any objection detected (price concern, delivery concern, trust issue, etc.) describe it and how to handle it. Return null if no objection.",
  "salesTip": "one specific, actionable tip for the founder about this exact lead"
}`;

  try {
    console.log('[/api/qsales/lead-detail] Calling Claude API...');
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    });

    const raw = message.content[0].text;
    console.log('[/api/qsales/lead-detail] Raw response length:', raw.length);

    const data = parseJSON(raw);
    console.log('[/api/qsales/lead-detail] Parsed OK');
    res.json(data);
  } catch (err) {
    console.error('[/api/qsales/lead-detail] ERROR:', err.status || '', err.message);
    if (err.error) console.error('API error detail:', JSON.stringify(err.error));
    res.status(500).json({ error: 'Failed to generate lead detail', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`QoreOS server running at http://localhost:${PORT}`);
});
