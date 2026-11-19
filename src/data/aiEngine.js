/**
 * OpenCircle Local Heuristic Empathy Engine
 * Operates 100% offline without external API keys.
 * Detects emotional themes and responds with validation, reframing, micro-grounding, and warm follow-ups.
 */

const CRISIS_KEYWORDS = ['die', 'suicide', 'kill myself', 'end my life', 'hurt myself', 'don\'t want to live'];

const INTENTS = [
  {
    name: 'exam_stress',
    keywords: ['exam', 'test', 'study', 'syllabus', 'grade', 'marks', 'cgpa', 'midterm', 'finals', 'assignment', 'submission', 'fail', 'failing', 'studying', 'viva'],
    replies: [
      {
        text: "I hear the weight in your words. Exam pressure can make you feel like your whole worth is tied to a single number or paper — but please remember: an exam only measures your memory on one specific morning, never your intelligence, potential, or heart.",
        groundingTip: "Take a 60-second nervous system reset: Unclench your jaw, drop your shoulders away from your ears, and take one deep belly breath.",
        followUp: "Which topic or chapter is giving you the biggest headache right now? Sometimes breaking it into just one 15-minute chunk makes the mountain feel like a hill."
      },
      {
        text: "It is completely valid to feel overwhelmed when deadlines and chapters pile up. Your brain is not a machine, and feeling tired is not a character flaw — it's simply a signal that you care and need a breather.",
        groundingTip: "Try the '2-Minute Rule': Step away from your desk, drink a glass of room-temperature water, and look out of a window for 120 seconds.",
        followUp: "Have you been able to eat something comforting today? Studying on an empty battery amplifies panic tenfold."
      }
    ]
  },
  {
    name: 'homesick',
    keywords: ['homesick', 'home', 'mom', 'dad', 'parents', 'hostel', 'mess food', 'miss home', 'missing home', 'crying in room', 'roommate', 'family', 'native', 'away from home'],
    replies: [
      {
        text: "Moving away from home and suddenly having to navigate everything alone is one of the hardest transitions a young adult ever makes. It’s not just the people you miss — it’s the smells, the familiar sounds, the feeling of safety without having to 'perform'.",
        groundingTip: "Sensory grounding: Wrap yourself in a cozy blanket or hoodie, hold a warm cup of chai/milk, and remind yourself: 'I am safe in this room right now.'",
        followUp: "Do you have a small token or a familiar playlist from back home that feels comforting? And would you like to call home for just 5 minutes without having to explain everything?"
      },
      {
        text: "Please know: feeling homesick doesn't mean you aren't strong enough or that you made a mistake coming here. It simply proves how deeply you love your home. Every single senior you see walking around campus felt this exact ache in their first semester.",
        groundingTip: "Try visiting our 'Social Circles' tab — our 'Evening Small Talk & Tea' circle was literally created by hostellers who needed friendly company.",
        followUp: "What is one dish or habit from home that you miss the most today? Tell me about it."
      }
    ]
  },
  {
    name: 'loneliness',
    keywords: ['lonely', 'alone', 'no friends', 'nobody', 'left out', 'isolated', 'invisible', 'unwanted', 'fit in', 'outsider', 'no one understands', 'empty'],
    replies: [
      {
        text: "Being surrounded by thousands of students on campus while feeling completely alone is a very sharp, quiet kind of pain. I see you, and I promise you are not invisible here. You belong in this world, exactly as you are.",
        groundingTip: "Look around your space and name: 3 things you can see, 2 textures you can touch, and 1 sound you can hear. You are grounded in this moment.",
        followUp: "Loneliness can make us believe we're defective, but usually it just means you haven't bumped into *your* tribe yet. Have you checked the 'Find a Peer Buddy' section here? Our buddies are students who volunteered specifically to give company with zero awkwardness."
      },
      {
        text: "You don't have to be loud or extroverted to be valued. Some of the most thoughtful, kind people feel lonely because they crave genuine depth, not shallow campus banter. There is nothing wrong with you.",
        groundingTip: "Put your hand over your heart for 5 seconds. Feel that steady, quiet heartbeat. You are carrying yourself through this day, and that is brave.",
        followUp: "Would it feel easier to talk to a peer buddy for a casual walk, or would you prefer talking anonymously with one of our verified counsellors?"
      }
    ]
  },
  {
    name: 'anxiety_overwhelm',
    keywords: ['anxious', 'anxiety', 'panic', 'racing', 'palpitations', 'overwhelmed', 'shaking', 'can\'t breathe', 'spiral', 'suffocating', 'chest tight', 'drowning', 'freaking out'],
    replies: [
      {
        text: "Right now, your nervous system is in fight-or-flight mode. It thinks there is a storm, but you are safe right here. We don't have to solve your whole future in this minute — all we have to do is survive this one breath.",
        groundingTip: "Let's do the 4-7-8 calming breath together:\n• Inhale slowly through your nose: 1.. 2.. 3.. 4\n• Gently hold the breath: 1.. 2.. 3.. 4.. 5.. 6.. 7\n• Exhale smoothly through your mouth: 1.. 2.. 3.. 4.. 5.. 6.. 7.. 8",
        followUp: "Can you feel your feet resting firmly on the floor right now? Press your heels down slightly into the ground. What does the floor feel like?"
      },
      {
        text: "Thoughts are like clouds passing through the sky — they can look dark and stormy, but they are not the sky itself. You are the sky. Just because your mind is telling you worst-case scenarios does not make them real.",
        groundingTip: "Physical grounding: Run cold water over your wrists for 15 seconds, or hold an ice cube. It gently resets the vagus nerve and interrupts anxiety spikes.",
        followUp: "Would you like to try our visual breathing circle tool together, or just talk through the thoughts that sparked this rush?"
      }
    ]
  },
  {
    name: 'sleep_exhaustion',
    keywords: ['sleep', 'insomnia', 'can\'t sleep', 'awake', 'tired', 'exhausted', 'fatigue', 'racing mind at night', 'bed', 'nightmare', 'drain', 'drained'],
    replies: [
      {
        text: "Late night is when the volume of our worries gets turned up to maximum because the rest of the world goes quiet. If sleep isn't coming right now, that is okay — don't battle with the bed. Resting your body still restores 70% of your energy even if your mind is awake.",
        groundingTip: "Cognitive Shuffle: Think of a random word like 'PEACE'. Now list 3 words starting with P (Pillow, Puppy, Peach), then E (Eagle, Echo, Earth)... It stops your brain's alarm circuits.",
        followUp: "Dim your screen brightness or put your phone across the room. Would you like me to speak a soft calming bedtime affirmation aloud for you?"
      }
    ]
  },
  {
    name: 'career_rejection_failure',
    keywords: ['career', 'placement', 'job', 'internship', 'interview', 'rejected', 'rejection', 'resume', 'unplaced', 'failure', 'loser', 'behind', 'imposter', 'not good enough'],
    replies: [
      {
        text: "A rejection or an interview that didn't go well stings like fire — let yourself feel that disappointment for a moment without shaming yourself for feeling hurt. But remember: a company's arbitrary hiring filter does not know your depth, your resilience, or the career you will build over the next 30 years.",
        groundingTip: "Perspective reminder: Almost every leader, researcher, and mentor you look up to was rejected from their first 5 top choices. Detours are where character is built.",
        followUp: "What's one thing you know you're genuinely curious about or good at, regardless of what that resume screening says?"
      }
    ]
  },
  {
    name: 'breakup_relationships',
    keywords: ['breakup', 'broke up', 'ex', 'relationship', 'cheated', 'dumped', 'fight', 'argued', 'heartbreak', 'ghosted', 'blocked'],
    replies: [
      {
        text: "Heartbreak and friendship conflicts hurt physically because our brains process social loss in the same neural pathways as physical injury. What you are feeling is real grief, and it takes time for your heart to untangle itself.",
        groundingTip: "Self-compassion practice: Place both hands over your chest and say: 'This hurts, and it's okay that I hurt right now. I am worthy of love and kindness.'",
        followUp: "Are you trying to replay old conversations in your head right now? Be gentle with yourself — you cannot fix the past at 2 AM."
      }
    ]
  },
  {
    name: 'general_sadness',
    keywords: ['sad', 'crying', 'cry', 'depressed', 'down', 'low', 'unhappy', 'numb', 'bad day', 'terrible', 'awful', 'hurts'],
    replies: [
      {
        text: "I am sitting right here beside you. You don't have to put on a brave face, you don't have to apologize for crying, and you don't have to find the silver lining right now. It is okay to simply have a heavy day.",
        groundingTip: "Permission slip: Give yourself permission to not be productive for the rest of today. Your only job right now is to be gentle with yourself.",
        followUp: "If your feelings were weather right now, what would they look like? Rain, mist, heavy storm, or quiet gray clouds?"
      }
    ]
  }
];

const DEFAULT_WARM_REPLIES = [
  {
    text: "Thank you for sharing that with me. It takes real courage to open up, even in an anonymous space. I am listening with an open heart and zero judgement.",
    groundingTip: "Take one slow, deep breath in... and let it all out with a gentle sigh.",
    followUp: "What feels like the heaviest part of what you're going through right now?"
  },
  {
    text: "I hear you, and whatever you are feeling right now is completely understandable. Sometimes life piles up so quietly that we don't realize how heavy the backpack has gotten until our shoulders ache.",
    groundingTip: "Notice where you are holding tension right now. Release your shoulders, unclench your teeth, and let your hands rest open.",
    followUp: "If you could ask for one small comfort right now — peace of mind, a friend to sit with, or answers — what would you want most?"
  },
  {
    text: "You are doing the best you can with the energy you have today, and that is more than enough. You don't have to figure out the whole staircase today, just the next step.",
    groundingTip: "Look around you and notice one color that feels calm. Rest your eyes on it for three slow breaths.",
    followUp: "Would it help to talk more about this, or would you like to connect with a peer buddy or book a free anonymous counsellor session?"
  }
];

export function generateLocalAIResponse(userMessage, conversationHistory = []) {
  const normalized = userMessage.toLowerCase().trim();

  // 1. Safety check for crisis keywords
  const isCrisis = CRISIS_KEYWORDS.some(kw => normalized.includes(kw));
  if (isCrisis) {
    return {
      text: "I hear how intensely exhausted and overwhelmed you are, and I want you to know: **Your life matters deeply, and you do not have to carry this immense pain alone.** Please reach out to someone who can hold you safe right now. There are kind, trained people ready to listen 24/7 at ₹0 cost.",
      isCrisis: true,
      groundingTip: "🚨 Instant Free Support Lines (24x7 India):\n• Tele-MANAS: 14416 or 1800-891-4416 (Govt of India Free 24/7)\n• KIRAN Mental Health Helpline: 1800-599-0019\n• Vandrevala Foundation: +91 9999 666 555 (Call/WhatsApp)\n• OpenCircle: Book an urgent verified session with our counsellors",
      followUp: "Can you please promise me you will talk to a trusted friend or call one of these free numbers right now? We care about you.",
      suggestCounsellor: true
    };
  }

  // 2. Intent matching based on keyword hits
  let bestIntent = null;
  let maxScore = 0;

  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (normalized.includes(kw)) {
        score += kw.length > 5 ? 2 : 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent;
    }
  }

  if (bestIntent && maxScore > 0) {
    const replies = bestIntent.replies;
    const selected = replies[Math.floor(Math.random() * replies.length)];
    return {
      ...selected,
      intentName: bestIntent.name,
      suggestCounsellor: true
    };
  }

  // 3. Fallback empathetic response
  const fallback = DEFAULT_WARM_REPLIES[Math.floor(Math.random() * DEFAULT_WARM_REPLIES.length)];
  return {
    ...fallback,
    intentName: 'general',
    suggestCounsellor: true
  };
}
