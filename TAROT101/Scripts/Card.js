// CARD CLASS
class Card {
    constructor(name, uprightMeaning, reversedMeaning, about, imagery, suit, img, reversedImg) {
        this.name = name;
        this.uprightMeaning = uprightMeaning;
        this.reversedMeaning = reversedMeaning;
        this.about = about;
        this.imagery = imagery;
        this.suit = suit; 
        this.img = img;
        this.reversedImg = reversedImg;
    }

    getMeaning(isReversed) {
        return isReversed ? this.reversedMeaning : this.uprightMeaning;
    }
}



// HELPERS
function formatName(name) {
    return name.toLowerCase().replace(/\s+/g, "-");
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// CARD OF THE DAY
function getCardOfTheDay() {
    const d = new Date();
    const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    return cards[seed % cards.length];
}

// QUIZ LOGIC
function getRandomMeanings(correctMeaning, type) {
    const meanings = cards.map(card =>
        type === "upright" ? card.uprightMeaning : card.reversedMeaning
    );

    const filtered = meanings.filter(m => m !== correctMeaning);
    const wrong = shuffle(filtered).slice(0, 3);

    return shuffle([correctMeaning, ...wrong]);
}

function renderQuiz(id, correct, type) {
    const options = getRandomMeanings(correct, type);
    const container = document.getElementById(id);

    container.innerHTML = "";

    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt;

        if (opt === correct) {
            btn.dataset.correct = "true";
        }

        btn.onclick = () => {
            const buttons = container.querySelectorAll("button");

            buttons.forEach(b => {
                if (b.dataset.correct === "true") {
                    b.style.background = "rgb(217, 249, 210)";
                } else if (b === btn) {
                    b.style.background = "rgb(243, 182, 182)";
                }

                b.disabled = true;
            });
        };

        container.appendChild(btn);
    });
}

// DISPLAY CARD
function displayCard() {
    const c = getCardOfTheDay();

    document.getElementById("card-title").innerText = c.name;

    document.getElementById("about-card").innerText = c.about;
    const suitText = document.getElementById("suit");
    const suitTitle = document.getElementById("suit-title");

    if (c.suit && c.suit !== "") {
    suitText.innerText = c.suit;
    suitTitle.style.display = "block";
        } else {
    suitText.innerText = "";
    suitTitle.style.display = "none";
    }
    document.getElementById("card-imagery").innerText = c.imagery;

    document.getElementById("upright-meaning").innerText = c.uprightMeaning;
    document.getElementById("reversed-meaning").innerText = c.reversedMeaning;

    document.getElementById("card-img").src = c.img;
    document.getElementById("card-img-reversed").src = c.reversedImg;

    renderQuiz("upright-quiz", c.uprightMeaning, "upright");
    renderQuiz("reversed-quiz", c.reversedMeaning, "reversed");
}

// CARD FACTORY
function makeCard(name, upright, reversed, about, imagery, suit = "") {
    return new Card(
        name,
        upright,
        reversed,
        about,
        imagery,
        suit,
        `Tarot Cards/${name}.jpg`,
        `Tarot Cards Reversed/${name} Reversed.jpg`
    );
}

// SUIT DESCRIPTIONS
const SUITS = {
    wands: "Wands represent fire. Often these cards are associated with determination, strength, ambition, and action, to name a few. It symbolizes masculine energy, brought forth through fire, and often appears when a thought is forming or when you are seeking solution. It is the first stage of development. The negatives could reveal impulsiveness, lack of direction, and egotistical behaviour.",
    cups: "Cups represent water, the element of emotion and intuition. This suit centres around relationships, vulnerability, creativity, and inner awareness. It reflects the emotional undercurrent of a situation. Cups often appear when connection, love, or personal reflection is needed. They invite empathy and imagination, but can reveal escapism, illusion, or emotional overwhelm.",
    swords: "Swords represent air and deal with thought, communication, and truth. It highlights logic, conflict, clarity, and difficult decisions. It often surfaces during moments that demand honesty, boundaries, or critical thinking and emphasize the power of communication and perception. When negatively expressed, they reveal anxiety, judgment, and miscommunication.",
    pentacles: "Pentacles represent earth and the tangible aspects of life. In terms of work, money, health, and long term stability, this suit focuses on building, investing, and maintaining what is real and practical. Pentacles reflect patience and progress, emphasizing growth over time. In imbalance, they signal material obsession, stagnation, or fear around resources and control."
};

// CARD DATA
const cards = [

// MAJOR ARCANA

makeCard(
    "THE FOOL",
    "Spontaneity, limitless potential, adventure, and optimism.",
    "Recklessness, folly, stagnancy, fear and eagerness.",
    "The Fool represents new beginnings, optimism, and faith. It symbolizes limitless possibility and willingness to move forward without certainty, letting yourself explore freely.",
    "Standing on the edge of a cliff with a dog barking beside, holding a flower, and a bag slung over his shoulder, this card represents the embrace of uncertainty. The cliff represents risk and the unknown while The Fool's posture showcases trust and optimism for the journey ahead. The bag carries past lessons while the dog offers protection.",
    "As the 0 card of the Major Arcana, The Fool marks the start of a new journey."
),
makeCard(
    "THE MAGICIAN",
    "Action, focus, initiative, skill.",
    "Distraction, manipulation, untapped potential.",
    "The Magician is about using what you've got to make things happen. It's the spark of creativity and initiative, showing that you have the skills and focus needed to turn ideas into reality.",
    "He stands with one hand pointing toward the sky and the other toward the earth, connecting the spiritual and the physical. The table in front of him displays all four suits of the Tarot, reminding us that every tool needed to succeed is already within reach.",
    "Card 1 of the Major Arcana, representing action, resourcefulness, and manifestation."
),
makeCard(
    "THE HIGH PRIESTESS",
    "Intuition, secrets, reflection, inner knowledge.",
    "Ignoring intuition, hidden truths emerging, feeling disconnected.",
    "The High Priestess invites you to trust your intuition and observe quietly. She embodies the mysteries we can't always see, reminding us that some answers come from stillness and reflection.",
    "She sits between two dark pillars, holding a scroll partly hidden behind her robes. A veil drapes behind her, suggesting knowledge that isn't immediately accessible. The moon at her feet hints at intuition and the subconscious.",
    "Card 2 of the Major Arcana, guiding us toward inner wisdom and hidden truths."
),
makeCard(
    "THE EMPRESS",
    "Growth, nurturing, creativity, abundance.",
    "Neglect, creative blocks, dependency, overprotection.",
    "The Empress represents growth, abundance, and nurturing energy. She encourages creativity and enjoying life's pleasures while staying grounded and connected to nature.",
    "Seated on a throne surrounded by lush vegetation, she wears a crown of stars. A river flows nearby, symbolizing the nourishment that life provides. Her posture is calm and welcoming, suggesting comfort and care.",
    "Card 3 of the Major Arcana, symbolizing fertility, creativity, and abundance."
),
makeCard(
    "THE EMPEROR",
    "Structure, leadership, control, stability.",
    "Rigidity, domination, misuse of power, chaos.",
    "The Emperor embodies structure, stability, and authority. He reminds us that rules, boundaries, and discipline can provide the foundation needed to achieve goals.",
    "He sits solidly on a stone throne, holding a scepter in one hand and an orb in the other. Mountains rise behind him, emphasizing strength and permanence. His gaze is firm, reflecting clarity and authority.",
    "Card 4 of the Major Arcana, standing for leadership, order, and control."
),
makeCard(
    "THE HIEROPHANT",
    "Tradition, mentorship, guidance, learning.",
    "Breaking rules, unconventional thinking, challenging authority.",
    "The Hierophant represents tradition, learning, and guidance. He appears when it's time to seek advice, follow a proven path, or consider established wisdom.",
    "Sitting between pillars, he blesses two followers kneeling before him. Religious symbols surround him, reminding us of structure and guidance, while the red and white colors suggest passion balanced by purity.",
    "Card 5 of the Major Arcana, connecting us to structured knowledge and spiritual guidance."
),
makeCard(
    "THE LOVERS",
    "Love, partnership, harmony, conscious choice.",
    "Conflict, imbalance, poor decisions, misaligned values.",
    "The Lovers is about meaningful connections and choices of the heart. It can signal romance, partnership, or the need to make a choice that aligns with your values.",
    "A couple stands under an angel, bathed in warm light. Mountains and trees surround them, symbolizing stability and growth. The angel above suggests divine guidance and the importance of moral or heartfelt choices.",
    "Card 6 of the Major Arcana, emphasizing love, connection, and conscious decisions."
),
makeCard(
    "THE CHARIOT",
    "Determination, focus, victory, drive.",
    "Lack of control, scattered focus, obstacles, aggression.",
    "The Chariot shows victory through determination. It appears when you need focus and discipline to move past obstacles, steering through challenges with confidence.",
    "A figure rides a chariot pulled by two sphinxes, each a different color, representing opposing forces. The city behind hints at achievements, while the winding road ahead signals new challenges. The charioteer's armor and upright posture convey confidence and preparedness.",
    "Card 7 of the Major Arcana, representing control, drive, and ambition."
),
makeCard(
    "STRENGTH",
    "Courage, patience, compassion, self-discipline.",
    "Self-doubt, impatience, weakness, losing control.",
    "Strength is about courage guided by patience and compassion. It teaches that gentle influence often achieves more than force or aggression.",
    "A calm woman holds open the jaws of a lion with soft hands, showing control through empathy rather than power. The infinity symbol above her head suggests limitless inner strength, and the lush greenery conveys growth nurtured by care.",
    "Card 8 of the Major Arcana, symbolizing inner resilience and personal courage."
),
makeCard(
    "THE HERMIT",
    "Introspection, wisdom, guidance, reflection.",
    "Loneliness, avoidance, feeling lost, disconnect.",
    "The Hermit signals a need to pause and seek guidance within. Stepping back from distractions allows clarity and deeper understanding to emerge.",
    "Holding a lantern, the Hermit stands alone atop a mountain. His light cuts through the darkness, symbolizing insight discovered through solitude. The surrounding landscape suggests the quiet clarity gained by removing oneself from noise.",
    "Card 9 of the Major Arcana, emphasizing introspection and inner guidance."
),
makeCard(
    "WHEEL OF FORTUNE",
    "Change, cycles, destiny, opportunity.",
    "Setbacks, resistance to change, unpredictability, delays.",
    "The Wheel of Fortune reminds us that life moves in cycles. Ups and downs are natural, and while you can't control everything, how you respond shapes your path. Change can come suddenly, but it also opens doors.",
    "A large wheel spins at the center, surrounded by symbols of the four elements and winged creatures in the corners. Figures rise and fall around the wheel, capturing the constant motion of fortune. Clouds and bright light hint at both uncertainty and the possibility of clarity ahead.",
    "Card 10 of the Major Arcana, symbolizing fate, cycles, and inevitable change."
),
makeCard(
    "JUSTICE",
    "Fairness, truth, accountability, balance.",
    "Bias, dishonesty, imbalance, avoiding responsibility.",
    "Justice calls for honesty and fairness. It's about seeing situations clearly, weighing evidence, and understanding that choices have consequences. Balance and accountability are key themes here.",
    "A figure sits upright, holding scales in one hand and a sword in the other. The scales measure truth and fairness, while the sword cuts through confusion. The red and blue robes suggest a balance between passion and logic.",
    "Card 11 of the Major Arcana, focusing on fairness, responsibility, and truth."
),
makeCard(
    "THE HANGED MAN",
    "Patience, insight, new perspective, letting go.",
    "Resistance, indecision, stagnation, missed opportunities.",
    "The Hanged Man is about pausing and seeing things from a new angle. Sometimes you need to surrender control to gain perspective, letting go of what no longer serves you before moving forward.",
    "A figure hangs upside down from one foot, serene and calm. His hands are relaxed, and his expression suggests acceptance. The subtle light around him hints at insight that comes from a shift in perspective.",
    "Card 12 of the Major Arcana, highlighting reflection, surrender, and patience."
),
makeCard(
    "DEATH",
    "Transformation, endings, renewal, letting go.",
    "Resistance, stagnation, fear of change, holding on.",
    "Death symbolizes endings that make way for new beginnings. It's a reminder that transformation often comes through release, letting go of what no longer fits so life can move forward.",
    "A skeleton rides a pale horse across a landscape of change. Figures kneel or fall before it, representing the inevitability of endings. The sun rises behind, suggesting hope and the promise of fresh starts.",
    "Card 13 of the Major Arcana, representing transformation, endings, and renewal."
),
makeCard(
    "TEMPERANCE",
    "Balance, harmony, patience, integration.",
    "Imbalance, excess, conflict, lack of direction.",
    "Temperance encourages balance and moderation. It's about blending opposites, finding harmony, and approaching life with patience rather than haste.",
    "An angel pours water between two cups, one foot on land and the other in a pond, bridging the spiritual and material worlds. A winding path leads into mountains, showing that balance is a journey. Soft sunlight illuminates the scene, hinting at hope and clarity.",
    "Card 14 of the Major Arcana, representing equilibrium, calm, and thoughtful action."
),
makeCard(
    "THE DEVIL",
    "Bondage, temptation, restriction, materialism.",
    "Breaking free, awareness, release, reclaiming control.",
    "The Devil exposes what's holding you back—attachments, temptations, or unhealthy patterns. It's a wake-up call to notice what's limiting freedom and to face it honestly.",
    "A horned figure towers over two chained humans. Flames flicker behind, illustrating intensity and danger. Despite the chains, they are loose enough to show liberation is possible if they choose awareness. The dark setting contrasts with the potential for freedom, highlighting tension between restriction and choice.",
    "Card 15 of the Major Arcana, exploring bondage, desire, and self-awareness."
),
makeCard(
    "THE TOWER",
    "Sudden change, disruption, revelation, liberation.",
    "Fear of change, delayed disaster, clinging to old structures.",
    "The Tower signals sudden change, upheaval, or disruption. While it may feel shocking, these moments clear away false stability, making room for growth and honesty.",
    "Lightning strikes a crumbling tower, and people fall from it into a stormy landscape. The flames consume the building, symbolizing destruction but also purification. Dark clouds dominate the sky, yet the distant horizon suggests eventual clarity after upheaval.",
    "Card 16 of the Major Arcana, representing chaos, revelation, and liberation through crisis."
),
makeCard(
    "THE STAR",
    "Hope, inspiration, renewal, clarity.",
    "Disappointment, discouragement, lost faith, disconnection.",
    "The Star brings hope, inspiration, and calm after turmoil. It's a reminder that renewal is possible, and guidance is available if you stay open to it.",
    "A woman kneels by a quiet pool, pouring water onto the earth and into the pond. Stars glitter above her, reflecting limitless possibilities. Surrounding greenery hints at growth and abundance, and her calm posture radiates serenity and faith in the future.",
    "Card 17 of the Major Arcana, symbolizing healing, hope, and clarity."
),
makeCard(
    "THE MOON",
    "Illusion, intuition, subconscious guidance, uncertainty.",
    "Clarity breaking through, deception revealed, facing fears, misinterpretation.",
    "The Moon highlights illusion, uncertainty, and the subconscious. It suggests paying attention to intuition and emotions when logic alone doesn't provide answers.",
    "A luminous moon casts its glow over a winding path, with a dog and wolf on either side, representing instincts both familiar and wild. A crayfish crawls from a pond, hinting at deep, unseen emotions. Shadows stretch across the landscape, creating a mysterious, dreamlike quality.",
    "Card 18 of the Major Arcana, exploring hidden truths, intuition, and emotional insight."
),
makeCard(
    "THE SUN",
    "Joy, clarity, success, vitality.",
    "Temporary setbacks, delays, diminished clarity or confidence.",
    "The Sun radiates success, vitality, and joy. It encourages optimism, openness, and enjoying life's pleasures with clarity and confidence.",
    "A child rides a white horse beneath a radiant sun. Sunflowers stretch upward, reflecting growth and abundance. The open space conveys freedom, warmth, and the lightness of being.",
    "Card 19 of the Major Arcana, symbolizing accomplishment, clarity, and happiness."
),
makeCard(
    "JUDGEMENT",
    "Awakening, self-evaluation, rebirth, transformation.",
    "Self-doubt, refusal to learn, delay, ignoring lessons.",
    "Judgement is a call to reflection and awakening. It asks you to review past choices, learn from them, and move forward with a sense of renewal and purpose.",
    "Figures rise from graves as an angel blows a trumpet, signaling awakening and renewal. Mountains and clouds suggest clarity emerging from contemplation, and the open sky conveys hope and higher understanding.",
    "Card 20 of the Major Arcana, representing rebirth, accountability, and transformation."
),
makeCard(
    "THE WORLD",
    "Completion, fulfillment, harmony, achievement.",
    "Delays, lack of closure, feeling stuck, unfinished business.",
    "The World signals completion, harmony, and fulfillment. It reflects the successful conclusion of a journey, where lessons are integrated and balance is achieved.",
    "A figure dances within a laurel wreath, symbolizing triumph and harmony. Four creatures representing the elements appear in the corners, grounding the card in cosmic balance. The sense of movement and openness reflects the joy and satisfaction of a journey well-traveled.",
    "Card 21 of the Major Arcana, representing achievement, unity, and wholeness."
),


// WANDS


makeCard(
    "ACE OF WANDS",
    "Inspiration, new beginnings, creative energy, motivation.",
    "Creative block, lack of direction, delayed start, low energy.",
    "The Ace of Wands feels like a spark being lit. It points to new ideas, creative energy, or the beginning of something that excites you and pushes you forward.",
    "A hand emerges from the clouds holding a budding wand. Small leaves sprout from it, suggesting growth just beginning. The distant landscape feels open and full of possibility, like something is about to take shape.",
    SUITS.wands
),
makeCard(
    "TWO OF WANDS",
    "Planning, decisions, looking ahead, expansion.",
    "Fear of change, lack of planning, hesitation, limited vision.",
    "The Two of Wands is about looking ahead and making plans. You've started something, and now you're thinking about where it could go next.",
    "A figure stands on a balcony holding a globe, looking out over a wide landscape. One wand is fixed to the wall, while the other is held in his hand, showing the choice between staying safe or stepping into something new.",
    SUITS.wands
),
makeCard(
    "THREE OF WANDS",
    "Expansion, progress, foresight, waiting for results.",
    "Delays, setbacks, lack of progress, frustration.",
    "The Three of Wands reflects progress. Effort has already been put in, and now there's a sense of waiting to see results unfold.",
    "A figure stands at the edge of a cliff watching ships sail across the water. The landscape stretches outward, giving a sense of distance and anticipation, as if something set in motion is beginning to return.",
    SUITS.wands
),
makeCard(
    "FOUR OF WANDS",
    "Celebration, stability, homecoming, joy.",
    "Instability, lack of harmony, tension, disrupted celebrations.",
    "The Four of Wands carries a feeling of celebration and stability. It often shows up around milestones, moments of joy, or a sense of coming together.",
    "Four wands form a structure decorated with flowers, almost like a small archway. People celebrate in the background, creating a warm, communal atmosphere filled with joy and connection.",
    SUITS.wands
),
makeCard(
    "FIVE OF WANDS",
    "Competition, tension, disagreement, chaos.",
    "Resolution, avoiding conflict, inner tension, imbalance.",
    "The Five of Wands brings in tension and competition. It's less about serious conflict and more about clashing ideas, egos, or trying to find your place in a group.",
    "Five figures appear to be sparring with wands, but it feels chaotic rather than coordinated. No one is clearly winning, and the scene reflects confusion and scattered energy rather than direct conflict.",
    SUITS.wands
),
makeCard(
    "SIX OF WANDS",
    "Success, recognition, confidence, achievement.",
    "Self-doubt, lack of recognition, setbacks, insecurity.",
    "The Six of Wands carries the feeling of recognition after effort. Something you've worked toward is being seen, and there's a sense of pride that comes with it.",
    "A figure rides through a crowd on horseback, wearing a wreath of victory. People around him raise their wands in support, creating a moment that feels celebratory and acknowledged rather than quiet or private.",
    SUITS.wands
),
makeCard(
    "SEVEN OF WANDS",
    "Defense, perseverance, standing firm, resilience.",
    "Overwhelm, giving up, exhaustion, feeling attacked.",
    "The Seven of Wands shows a moment where you have to stand your ground. It's about defending your position, even if it feels like you're being challenged from multiple directions.",
    "A figure stands on higher ground, holding a wand while others reach up toward him. The uneven footing and raised position suggest both advantage and pressure, like holding your place takes effort.",
    SUITS.wands
),
makeCard(
    "EIGHT OF WANDS",
    "Momentum, speed, communication, progress.",
    "Delays, miscommunication, slowing down, frustration.",
    "The Eight of Wands moves quickly. It often points to sudden progress, fast communication, or situations picking up speed without much pause.",
    "Eight wands fly through the air across an open sky, angled as if in motion. There are no people in the scene, which makes the energy feel uninterrupted and direct, like nothing is standing in the way.",
    SUITS.wands
),
makeCard(
    "NINE OF WANDS",
    "Resilience, endurance, persistence, caution.",
    "Burnout, defensiveness, exhaustion, giving up.",
    "The Nine of Wands reflects resilience after a long stretch of effort. You're close to the end, but there's still a need to stay alert and protect what you've built.",
    "A figure stands guarded, holding a wand while others stand behind like a barrier. There's a visible sense of fatigue, but also determination to not let everything fall apart at the last moment.",
    SUITS.wands
),
makeCard(
    "TEN OF WANDS",
    "Burden, stress, responsibility, hard work.",
    "Release, delegation, burnout, letting go.",
    "The Ten of Wands shows the weight of responsibility. There's a sense of carrying too much, even if it's all for something important.",
    "A figure struggles forward while holding a heavy bundle of wands, blocking his view. The path ahead is still visible, but the effort it takes to move forward feels overwhelming.",
    SUITS.wands
),
makeCard(
    "PAGE OF WANDS",
    "Curiosity, exploration, inspiration, new ideas.",
    "Lack of direction, hesitation, creative blocks, uncertainty.",
    "The Page of Wands feels curious and full of potential. It's the start of exploration, where ideas are forming and excitement is building.",
    "A young figure holds a wand while looking at it with interest, as if discovering something new. The desert landscape around him feels open and full of possibilities yet to be explored.",
    SUITS.wands
),
makeCard(
    "KNIGHT OF WANDS",
    "Action, passion, confidence, adventure.",
    "Impulsiveness, recklessness, frustration, scattered energy.",
    "The Knight of Wands charges forward with confidence and energy. It's bold, impulsive, and driven by passion rather than careful planning.",
    "A knight rides a rearing horse, holding a wand as flames decorate his clothing. The scene feels fast and intense, like movement that doesn't pause to question itself.",
    SUITS.wands
),
makeCard(
    "QUEEN OF WANDS",
    "Confidence, independence, warmth, determination.",
    "Insecurity, jealousy, self-doubt, lack of confidence.",
    "The Queen of Wands holds confidence in a calm and grounded way. She doesn't need to prove anything—her presence alone carries warmth, strength, and self-assurance.",
    "She sits on a throne decorated with sunflowers, holding a wand upright. A black cat rests at her feet, adding a sense of independence and quiet power. The setting feels warm and steady, not rushed.",
    SUITS.wands
),
makeCard(
    "KING OF WANDS",
    "Leadership, vision, confidence, direction.",
    "Control issues, arrogance, impulsiveness, lack of direction.",
    "The King of Wands represents leadership built on vision and experience. He knows where he's going and isn't afraid to take bold steps to get there.",
    "Seated on a throne decorated with salamanders, he holds a wand as a symbol of authority and creative power. The imagery feels stable but still energized, like someone who leads through action and belief in their ideas.",
    SUITS.wands
),


// CUPS


makeCard(
    "ACE OF CUPS",
    "New feelings, connection, emotional openness, beginnings.",
    "Emotional block, holding back, disconnection, emptiness.",
    "The Ace of Cups feels like an emotional opening. It often shows up when something new begins on a deeper level, whether that's connection, creativity, or a shift in how you feel.",
    "A hand extends from the clouds holding a cup that overflows with water. The stream pours into a calm pool below, surrounded by soft ripples. The scene feels quiet and full, like emotion that's just beginning to spill over.",
    SUITS.cups
),
makeCard(
    "TWO OF CUPS",
    "Connection, partnership, harmony, mutual respect.",
    "Imbalance, disconnection, tension, miscommunication.",
    "The Two of Cups centers around connection and mutual understanding. It reflects relationships where both sides are equally invested and emotionally present.",
    "Two figures face each other, each holding a cup. A caduceus rises between them, topped with a winged lion, suggesting balance and shared energy. The moment feels intentional, like a quiet agreement between two people.",
    SUITS.cups
),
makeCard(
    "THREE OF CUPS",
    "Celebration, friendship, joy, connection.",
    "Overindulgence, isolation, tension in friendships, imbalance.",
    "The Three of Cups leans into celebration and shared joy. It's about moments spent with others where things feel light, connected, and easy.",
    "Three figures raise their cups in a circle, surrounded by fruit and flowers. Their movement feels relaxed and natural, like a moment of laughter caught mid-motion rather than something staged.",
    SUITS.cups
),
makeCard(
    "FOUR OF CUPS",
    "Discontent, withdrawal, introspection, missed opportunities.",
    "Renewed awareness, acceptance, re-engagement, clarity.",
    "The Four of Cups reflects a moment of disconnection or withdrawal. Something is being offered, but it's not fully landing, either from distraction or emotional distance.",
    "A figure sits beneath a tree, arms crossed, staring at three cups in front of them. A fourth cup is extended from a cloud nearby, almost unnoticed. The scene feels still, like being caught in your own thoughts.",
    SUITS.cups
),
makeCard(
    "FIVE OF CUPS",
    "Loss, grief, disappointment, focusing on the negative.",
    "Acceptance, healing, moving forward, finding perspective.",
    "The Five of Cups focuses on loss and disappointment. It captures the feeling of focusing on what's gone, even when something still remains.",
    "A cloaked figure stands before three spilled cups, head lowered. Behind them, two cups remain upright, slightly out of focus. A bridge and river in the distance suggest a path forward, though it isn't being looked at yet.",
    SUITS.cups
),
makeCard(
    "SIX OF CUPS",
    "Nostalgia, memories, comfort, innocence.",
    "Being stuck in the past, moving on, growing up, letting go.",
    "The Six of Cups carries a sense of nostalgia. It connects to memories, familiarity, and moments that feel soft and safe.",
    "A child offers a cup filled with flowers to another figure. The setting feels quiet and sheltered, almost frozen in time, like a memory that hasn't faded.",
    SUITS.cups
),
makeCard(
    "SEVEN OF CUPS",
    "Options, illusion, confusion, imagination.",
    "Clarity, focus, making decisions, seeing truth.",
    "The Seven of Cups reflects choice and illusion. There are many options, but not all of them are grounded in reality.",
    "Seven cups float in a cloud, each holding something different—some appealing, others unsettling. A figure looks toward them, unsure which is real or worth choosing.",
    SUITS.cups
),
makeCard(
    "EIGHT OF CUPS",
    "Leaving behind, seeking more, emotional distance, transition.",
    "Fear of change, avoidance, staying too long, hesitation.",
    "The Eight of Cups is about walking away. It doesn't always mean something failed, just that it no longer feels right to stay.",
    "A figure turns their back on a stack of cups and walks toward a distant mountain under a dim moon. The path is quiet and solitary, suggesting a choice made for personal reasons rather than outside pressure.",
    SUITS.cups
),
makeCard(
    "NINE OF CUPS",
    "Satisfaction, fulfillment, comfort, emotional success.",
    "Discontent, overindulgence, lack of fulfillment, imbalance.",
    "The Nine of Cups carries a sense of satisfaction. It reflects contentment and enjoying what you've created or achieved.",
    "A figure sits comfortably with nine cups displayed behind them like a backdrop. Their posture feels relaxed and confident, suggesting ease and fulfillment rather than effort.",
    SUITS.cups
),
makeCard(
    "TEN OF CUPS",
    "Harmony, connection, happiness, emotional fulfillment.",
    "Tension, misalignment, conflict, disrupted harmony.",
    "The Ten of Cups reflects emotional harmony and connection. It's about feeling aligned, supported, and at peace in your environment.",
    "A family stands together under a rainbow of cups, arms raised. The landscape is open and bright, giving a sense of stability and emotional ease that feels shared rather than individual.",
    SUITS.cups
),
makeCard(
    "PAGE OF CUPS",
    "Curiosity, creativity, emotional openness, new ideas.",
    "Emotional immaturity, insecurity, creative block, avoidance.",
    "The Page of Cups feels gentle and open. It often reflects curiosity about emotions or creative expression that hasn't fully taken shape yet.",
    "A figure looks into a cup where a fish appears, creating a slightly surreal moment. The ocean behind them stretches out calmly, reinforcing a sense of openness and imagination.",
    SUITS.cups
),
makeCard(
    "KNIGHT OF CUPS",
    "Romance, intention, emotional pursuit, creativity.",
    "Unrealistic expectations, moodiness, avoidance, inconsistency.",
    "The Knight of Cups moves with intention and emotion. It often represents following what feels right, even if it's not the most logical path.",
    "A knight rides slowly while holding a cup out in front of him. The pace feels calm and deliberate, with a landscape that reflects stillness rather than urgency.",
    SUITS.cups
),
makeCard(
    "QUEEN OF CUPS ",
    "Compassion, intuition, emotional balance, care.",
    "Overwhelm, emotional instability, insecurity, withdrawal.",
    "The Queen of Cups represents emotional awareness and care. She understands feelings deeply but doesn't let them overwhelm her.",
    "She sits by the water, holding a detailed cup and focusing on it closely. The ocean moves gently beside her, reflecting emotion that's present but steady rather than chaotic.",
    SUITS.cups
),
makeCard(
    "KING OF CUPS",
    "Emotional balance, maturity, stability, compassion.",
    "Emotional suppression, mood swings, imbalance, detachment.",
    "The King of Cups reflects emotional control and maturity. He feels deeply but stays grounded, offering stability in situations that might otherwise feel overwhelming.",
    "Seated on a throne surrounded by water, he remains steady even as waves move around him. The contrast between the shifting sea and his calm posture highlights balance and control.",
    SUITS.cups
),


// SWORDS


makeCard(
    "ACE OF SWORDS",
    "Clarity, truth, breakthrough, new ideas.",
    "Confusion, miscommunication, mental fog, dishonesty.",
    "The Ace of Swords feels like clarity cutting through confusion. It's the moment where something finally makes sense, even if it's sharp or uncomfortable.",
    "A hand emerges from the clouds holding a sword upright. A crown rests on the blade, surrounded by laurel branches that suggest truth and victory. The sky behind it feels open and bright, like a sudden mental clearing.",
    SUITS.swords
),
makeCard(
    "TWO OF SWORDS",
    "Indecision, stalemate, avoidance, uncertainty.",
    "Clarity, decision-making, truth revealed, release.",
    "The Two of Swords reflects being stuck in indecision. It often shows a moment where avoiding a choice feels easier than facing it directly.",
    "A blindfolded figure sits with two swords crossed over their chest. Behind them, a calm body of water stretches out, suggesting emotions are present but being ignored. The stillness feels tense rather than peaceful.",
    SUITS.swords
),
makeCard(
    "THREE OF SWORDS",
    "Heartbreak, sorrow, grief, emotional pain.",
    "Healing, recovery, forgiveness, emotional release.",
    "The Three of Swords is tied to emotional pain and heartbreak. It reflects moments where something hurts deeply, often through loss or truth coming to the surface.",
    "A heart is pierced by three swords under a stormy sky. Rain falls steadily, filling the scene with a sense of release and heaviness at the same time. There's no distraction in the image, only direct emotion.",
    SUITS.swords
),
makeCard(
    "FOUR OF SWORDS",
    "Rest, recovery, solitude, reflection.",
    "Burnout, restlessness, avoidance, exhaustion.",
    "The Four of Swords is about rest and mental recovery. It suggests stepping back before things become overwhelming.",
    "A figure lies on a stone tomb with three swords above and one below. The setting is quiet and still, almost like a pause between moments of stress. A stained-glass window in the background hints at reflection and healing.",
    SUITS.swords
),
makeCard(
    "FIVE OF SWORDS",
    "Conflict, tension, hollow victory, disagreement.",
    "Resolution, compromise, moving on, reconciliation.",
    "The Five of Swords reflects conflict that doesn't feel satisfying. Even if there is a winner, something feels lost in the process.",
    "A figure collects swords while others walk away in the distance. The sky is unsettled, and the scene feels empty despite the sense of victory, like something important was damaged in the process.",
    SUITS.swords
),
makeCard(
    "SIX OF SWORDS",
    "Transition, moving on, healing, change.",
    "Resistance, stagnation, emotional baggage, difficulty moving forward.",
    "The Six of Swords represents transition. It's about moving away from difficulty toward something calmer, even if the journey itself feels uncertain.",
    "A boat carries figures across still water, guided by a single figure. Swords stand upright in the boat, symbolizing carrying past experiences forward. The distant shore feels quieter and less turbulent.",
    SUITS.swords
),
makeCard(
    "SEVEN OF SWORDS",
    "Strategy, secrecy, independence, caution.",
    "Exposure, dishonesty, guilt, consequences.",
    "The Seven of Swords is connected to strategy, secrecy, or avoiding direct confrontation. It can reflect acting independently or not revealing everything.",
    "A figure walks away carrying swords while glancing back toward a camp. The movement feels careful and quiet, suggesting something done in secrecy or without full openness.",
    SUITS.swords
),
makeCard(
    "EIGHT OF SWORDS",
    "Restriction, fear, feeling stuck, mental blocks.",
    "Freedom, clarity, release, self-empowerment.",
    "The Eight of Swords reflects feeling trapped by your own thoughts. The restrictions often feel stronger than they actually are.",
    "A blindfolded figure stands surrounded by swords planted in the ground. The space around them is open, but the posture suggests fear and restriction rather than actual confinement.",
    SUITS.swords
),
makeCard(
    "NINE OF SWORDS",
    "Anxiety, fear, worry, mental stress.",
    "Recovery, relief, facing fears, healing.",
    "The Nine of Swords reflects anxiety and overthinking. It often shows mental distress that feels heavier at night or in moments of isolation.",
    "A figure sits up in bed, head in hands. Nine swords hang on the wall above, creating a heavy presence. The darkness around them feels closed in, amplifying worry and fear.",
    SUITS.swords
),
makeCard(
    "TEN OF SWORDS",
    "Endings, betrayal, collapse, finality.",
    "Recovery, rebuilding, acceptance, survival.",
    "The Ten of Swords represents endings that feel final. Even though it can be painful, it often marks the point where something cannot continue the way it was.",
    "A figure lies face down with ten swords in their back. The sky is dark but begins to lighten near the horizon, suggesting that even at the lowest point, something new is about to begin.",
    SUITS.swords
),
makeCard(
    "PAGE OF SWORDS",
    "Curiosity, ideas, learning, alertness.",
    "Gossip, confusion, impulsive thinking, lack of clarity.",
    "The Page of Swords feels curious and alert. It's about questioning things and gathering information, even if you don't fully understand everything yet.",
    "A young figure holds a sword while looking over their shoulder, as if constantly observing their surroundings. The wind in the scene adds a sense of movement and mental energy.",
    SUITS.swords
),
makeCard(
    "KNIGHT OF SWORDS",
    "Action, ambition, speed, determination.",
    "Recklessness, impulsiveness, burnout, aggression.",
    "The Knight of Swords moves fast and decisively. It reflects rushing toward goals or ideas without hesitation, sometimes without fully thinking them through.",
    "A knight charges forward on a galloping horse, sword raised. The wind and motion in the scene make everything feel urgent and intense, like momentum that's hard to stop.",
    SUITS.swords
),
makeCard(
    "QUEEN OF SWORDS",
    "Clarity, truth, independence, perception.",
    "Coldness, harsh judgment, bitterness, miscommunication.",
    "The Queen of Swords represents clarity and independence. She sees things as they are and values truth, even when it's uncomfortable.",
    "She sits upright with a sword held high, expression calm but direct. The sky behind her is open and clear, reflecting a mindset that prioritizes honesty and perception over emotion.",
    SUITS.swords
),
makeCard(
    "KING OF SWORDS",
    "Authority, logic, truth, structure.",
    "Manipulation, misuse of power, cold judgment, rigidity.",
    "The King of Swords represents authority through logic and fairness. Decisions are made with structure, reason, and clear judgment.",
    "Seated on a stone throne, he holds a sword upright while maintaining a steady, composed expression. The air around him feels still, reinforcing a sense of control and mental clarity.",
    SUITS.swords
),


// PENTACLES


makeCard(
    "ACE OF PENTACLES",
    "New opportunity, stability, growth, prosperity.",
    "Missed opportunity, instability, lack of planning, setbacks.",
    "The Ace of Pentacles points to something new that feels grounded and real. It's the start of a physical opportunity that could grow into something stable over time.",
    "A hand emerges from the clouds holding a golden pentacle above a garden-like landscape. A path leads through flowers and greenery, suggesting potential that needs time and care to develop.",
    SUITS.pentacles
),
makeCard(
    "TWO OF PENTACLES",
    "Balance, adaptability, multitasking, flexibility.",
    "Overwhelm, imbalance, disorganization, stress.",
    "The Two of Pentacles reflects balance in motion. It's about managing responsibilities while trying to stay flexible as things shift around you.",
    "A figure juggles two pentacles connected by an infinity loop. Waves move behind them, suggesting instability in the background while they try to maintain rhythm and control.",
    SUITS.pentacles
),
makeCard(
    "THREE OF PENTACLES",
    "Teamwork, collaboration, skill-building, effort.",
    "Lack of teamwork, miscommunication, imbalance, poor planning.",
    "The Three of Pentacles is about collaboration and shared effort. It shows progress being made through teamwork and different skills coming together.",
    "Three figures stand in a cathedral-like space, working together on a structure. One is being guided while the others observe and contribute, creating a sense of shared purpose.",
    SUITS.pentacles
),
makeCard(
    "FOUR OF PENTACLES",
    "Security, control, stability, holding on.",
    "Letting go, generosity, insecurity, fear of loss.",
    "The Four of Pentacles reflects holding on tightly to what you have. It can point to security, but also fear of letting go or change.",
    "A figure sits holding onto a pentacle at their chest, with two beneath their feet and one above their head. The posture feels guarded, as if protecting something carefully but rigidly.",
    SUITS.pentacles
),
makeCard(
    "FIVE OF PENTACLES",
    "Struggle, hardship, isolation, financial difficulty.",
    "Recovery, support, improvement, relief.",
    "The Five of Pentacles reflects hardship or feeling left out in the cold. It often shows moments of struggle, but also the possibility of support being nearby.",
    "Two figures walk through snow outside a stained-glass window. The warmth inside contrasts sharply with the cold outside, suggesting isolation even when help may be close.",
    SUITS.pentacles
),
makeCard(
    "SIX OF PENTACLES",
    "Generosity, support, balance, sharing.",
    "Imbalance, debt, dependence, unfair exchange.",
    "The Six of Pentacles is about giving and receiving. It highlights balance in support, whether through generosity or accepting help when needed.",
    "A figure distributes coins to two people kneeling below. The scale in their hand suggests fairness and balance, emphasizing exchange rather than one-sided giving.",
    SUITS.pentacles
),
makeCard(
    "SEVEN OF PENTACLES",
    "Patience, assessment, long-term growth, reflection.",
    "Impatience, frustration, lack of reward, wasted effort.",
    "The Seven of Pentacles reflects waiting for results after effort. It's a moment of reflection on whether progress is growing in the right direction.",
    "A figure leans on a tool while looking at a plant growing pentacles. The pause feels intentional, like evaluating progress before continuing further.",
    SUITS.pentacles
),
makeCard(
    "EIGHT OF PENTACLES",
    "Skill, dedication, craftsmanship, effort.",
    "Lack of focus, boredom, shortcuts, stagnation.",
    "The Eight of Pentacles is about focused work and skill-building. It reflects dedication to improving something step by step.",
    "A figure carefully carves pentacles at a workbench. Each one looks slightly different, showing gradual improvement through repetition and focus.",
    SUITS.pentacles
),
makeCard(
    "NINE OF PENTACLES",
    "Independence, luxury, self-sufficiency, comfort.",
    "Dependency, instability, overwork, financial strain.",
    "The Nine of Pentacles reflects independence and comfort. It's about enjoying the results of your effort in a calm and self-sufficient way.",
    "A figure stands in a garden surrounded by pentacles and vines. A bird rests nearby, and everything feels still and abundant, like a space that has been carefully built and maintained.",
    SUITS.pentacles
),
makeCard(
    "TEN OF PENTACLES",
    "Legacy, stability, family, long-term success.",
    "Instability, conflict, financial issues, breakdown of structure.",
    "The Ten of Pentacles reflects long-term stability and legacy. It's about building something that lasts beyond just the present moment.",
    "An older figure sits surrounded by family, dogs, and structures filled with pentacles. The scene feels grounded and generational, like something passed down and sustained over time.",
    SUITS.pentacles
),
makeCard(
    "PAGE OF PENTACLES",
    "Learning, opportunity, planning, growth.",
    "Lack of focus, procrastination, missed opportunity, immaturity.",
    "The Page of Pentacles feels like starting something practical with curiosity. It's about learning, planning, and building a foundation.",
    "A young figure holds a pentacle while standing in a field. The background feels open and grounded, suggesting potential that hasn't yet been fully shaped.",
    SUITS.pentacles
),
makeCard(
    "KNIGHT OF PENTACLES",
    "Hard work, patience, reliability, routine.",
    "Stagnation, laziness, rigidity, lack of progress.",
    "The Knight of Pentacles represents steady progress. It's slow, but reliable, focusing on doing things properly rather than quickly.",
    "A knight sits calmly on a horse holding a pentacle, with a plowed field behind him. The stillness of the scene suggests patience and routine rather than urgency.",
    SUITS.pentacles
),
makeCard(
    "QUEEN OF PENTACLES",
    "Nurturing, practicality, security, comfort.",
    "Neglect, imbalance, overwork, insecurity.",
    "The Queen of Pentacles represents care and grounded nurturing. She balances practical life with warmth and attention to what matters.",
    "She sits comfortably on a throne surrounded by greenery, holding a pentacle close. The environment feels safe and abundant, like a space built through care and attention.",
    SUITS.pentacles
),
makeCard(
    "KING OF PENTACLES",
    "Success, stability, leadership, security.",
    "Greed, stubbornness, instability, misuse of resources.",
    "The King of Pentacles represents long-term success built through consistency and responsibility. He is stable, grounded, and focused on maintaining what he has built.",
    "A king sits firmly on a throne decorated with vines and pentacles. Everything around him feels solid and established, reflecting stability earned over time.",
    SUITS.pentacles
),
];


displayCard();