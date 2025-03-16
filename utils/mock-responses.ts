// A collection of predefined responses for different environmental topics
// Used as a fallback when the AI API is unavailable

type TopicResponses = {
  [key: string]: string[]
}

export const mockResponses: TopicResponses = {
  plastic: [
    "Reducing plastic waste is crucial for our environment! Here are some practical steps you can take: 1) Use reusable shopping bags, water bottles, and food containers, 2) Buy products with minimal packaging, 3) Avoid single-use plastics like straws and cutlery, 4) Participate in local cleanup events, and 5) Support businesses with sustainable practices. Every small action adds up to make a significant difference!",
    "To reduce plastic waste, start by conducting a plastic audit in your home to identify your biggest sources of plastic. Then replace these items with sustainable alternatives like bamboo toothbrushes, beeswax wraps instead of plastic wrap, and refillable cleaning products. Remember that the most sustainable option is using what you already have before buying new eco-friendly products.",
    "Plastic pollution is a global crisis, with about 8 million tons entering our oceans annually. You can help by avoiding microbeads in personal care products, properly recycling plastics according to your local guidelines, and supporting policies that limit single-use plastics. Consider joining community initiatives like The Plastic Free Challenge to connect with others on the same journey.",
  ],
  energy: [
    "Making your home more energy efficient not only reduces your carbon footprint but also saves you money! Start with simple changes like switching to LED bulbs (which use 75% less energy), sealing drafts around windows and doors, and using smart power strips to eliminate phantom energy use. For bigger impact, consider a programmable thermostat, adding insulation, or exploring renewable energy options like solar panels.",
    "Energy efficiency at home begins with understanding your energy usage. Many utility companies offer free energy audits to identify areas for improvement. Focus on your heating and cooling systems first, as they typically account for about 50% of home energy use. Regular maintenance of these systems, along with proper insulation and weatherstripping, can significantly reduce your energy consumption.",
    "For a more energy-efficient home, consider the power of passive design. This includes orienting your home to capture natural light, using thermal mass materials to regulate temperature, installing proper insulation, and utilizing natural ventilation. These approaches work with nature rather than against it, reducing the need for artificial heating, cooling, and lighting.",
  ],
  reforestation: [
    "Reforestation projects are making remarkable progress worldwide! One inspiring example is the Great Green Wall initiative in Africa, which aims to grow an 8,000km natural wonder across the width of Africa. Another success story is the Atlantic Forest Restoration Pact in Brazil, which has committed to restoring 15 million hectares of degraded lands by 2050. These projects not only capture carbon but also restore biodiversity and support local communities.",
    "The Bonn Challenge is a global effort to bring 350 million hectares of degraded and deforested landscapes into restoration by 2030. So far, 61 countries have made commitments to restore 210 million hectares! In India, the Cauvery Calling project aims to plant 2.42 billion trees in the Cauvery river basin, helping revitalize the river and improve soil health while supporting farmers' livelihoods.",
    "Closer to home, the Plant-for-the-Planet initiative allows children to lead tree-planting campaigns in their communities. They've already planted over 13.6 billion trees worldwide! You can support reforestation by donating to reputable organizations, volunteering for local tree-planting events, or even starting a community tree-planting project in your neighborhood.",
  ],
  volunteer: [
    "There are many ways to volunteer for environmental causes! Look for local chapters of organizations like The Nature Conservancy or Sierra Club, which often organize community cleanups, habitat restoration projects, and citizen science initiatives. Many botanical gardens, wildlife refuges, and state parks also need volunteers for conservation work. Websites like VolunteerMatch.org can help you find environmental opportunities specifically in your area.",
    "Consider volunteering with watershed protection groups that monitor and clean local waterways, or join urban farming initiatives that promote sustainable food systems in cities. If you're interested in education, many nature centers and environmental education organizations need volunteers to help with programs for children and adults. The iNaturalist app also allows you to contribute to biodiversity monitoring from anywhere!",
    "For those interested in policy and advocacy, organizations like Citizens' Climate Lobby train volunteers to engage with elected officials on environmental issues. If you have professional skills in areas like law, marketing, or web development, consider offering pro bono services to environmental nonprofits through platforms like Catchafire.org. Even dedicating a few hours monthly can make a significant difference!",
  ],
  success: [
    "Here's an inspiring environmental success story: The ozone layer is healing! In the 1980s, scientists discovered that chlorofluorocarbons (CFCs) were depleting the ozone layer, which protects us from harmful UV radiation. The world responded with the Montreal Protocol in 1987, phasing out these harmful chemicals. Today, the ozone hole is shrinking, and scientists predict it could fully recover by 2050. This shows how international cooperation can solve global environmental challenges!",
    "The revival of the American bald eagle is a remarkable conservation success. Once on the brink of extinction with only 417 breeding pairs in the 1960s due to DDT pesticide use, the banning of DDT and protection under the Endangered Species Act helped their population rebound to over 9,700 breeding pairs today. They were removed from the endangered species list in 2007, demonstrating how targeted conservation efforts can bring species back from the edge of extinction.",
    "The restoration of the Loess Plateau in China transformed one of the poorest regions in the country. Centuries of farming and deforestation had turned this once-fertile land into a desert. Through a massive restoration project, they implemented terracing, replanting native vegetation, and sustainable farming practices. Within a decade, they restored over 35,000 square kilometers of land, increased agricultural output, reduced poverty, and significantly decreased soil erosion—proving large-scale ecosystem restoration is possible!",
  ],
  identity: [
    "I am Adghal AI, your environmental assistant. My name 'Adghal' means 'jungle' in Arabic, reflecting my focus on nature and environmental sustainability.",
    "My name is Adghal AI. I'm designed to help you find ways to make a positive environmental impact.",
    "I'm Adghal AI, an assistant focused on environmental issues and sustainability. How can I help you today?",
  ],
  greeting: [
    "Hello! I'm Adghal AI, your environmental assistant. How can I help you make a positive impact on the environment today?",
    "Hi there! I'm Adghal AI, here to help with environmental questions and suggestions. What would you like to know about today?",
    "Greetings! I'm Adghal AI, your guide to environmental action. How can I assist you in making eco-friendly choices today?",
  ],
  default: [
    "As Adghal AI, I'm passionate about helping you find ways to make a positive environmental impact! Whether you're interested in reducing your carbon footprint, supporting conservation efforts, or learning about sustainable practices, I'm here to provide information and inspiration. What specific environmental topic would you like to explore today?",
    "Environmental action takes many forms, from individual lifestyle changes to community initiatives and policy advocacy. The key is finding approaches that align with your interests and capabilities. Would you like to learn about reducing household waste, supporting biodiversity, sustainable transportation options, or perhaps how to get involved with local environmental groups?",
    "The environmental challenges we face today require collective action, but individual contributions matter too! Small changes in our daily habits can add up to significant positive impacts when adopted widely. I'd be happy to suggest some simple, effective ways you can contribute to environmental protection based on your specific interests or circumstances.",
  ],
  creator: [
    "I was created by Anas Hmidan, someone who cares deeply about our planet and wants to inspire positive change. With a blend of human creativity and AI technology, I exist to help people like you make a difference for nature and our future.",
  ],
}

export function generateMockResponse(userInput: string): string {
  // Convert input to lowercase for easier matching
  const input = userInput.toLowerCase().trim()

  // Check for creator questions
  if (
    input.includes("who created you") ||
    input.includes("who made you") ||
    input.includes("who built you") ||
    input.includes("who developed you") ||
    input.includes("who programmed you") ||
    input.includes("who is your creator") ||
    input.includes("who's your creator") ||
    input.includes("who powers you") ||
    input.includes("who designed you")
  ) {
    return mockResponses.creator[0]
  }

  // Check for greetings
  if (
    input === "hello" ||
    input === "hi" ||
    input === "hey" ||
    input === "greetings" ||
    input === "hello there" ||
    input === "hi there"
  ) {
    return mockResponses.greeting[Math.floor(Math.random() * mockResponses.greeting.length)]
  }

  // Check for identity questions
  if (
    input.includes("your name") ||
    input.includes("who are you") ||
    input === "name?" ||
    input === "what is your name" ||
    input === "whats your name"
  ) {
    return mockResponses.identity[0]
  }

  // Check for keywords in the input and select the appropriate category
  let category = "default"

  if (input.includes("plastic") || input.includes("waste") || input.includes("recycle")) {
    category = "plastic"
  } else if (
    input.includes("energy") ||
    input.includes("electricity") ||
    input.includes("power") ||
    input.includes("efficient")
  ) {
    category = "energy"
  } else if (
    input.includes("reforestation") ||
    input.includes("tree") ||
    input.includes("forest") ||
    input.includes("plant")
  ) {
    category = "reforestation"
  } else if (
    input.includes("volunteer") ||
    input.includes("help") ||
    input.includes("participate") ||
    input.includes("join")
  ) {
    category = "volunteer"
  } else if (
    input.includes("success") ||
    input.includes("story") ||
    input.includes("inspire") ||
    input.includes("example")
  ) {
    category = "success"
  }

  // Get responses for the selected category
  const responses = mockResponses[category]

  // Return a random response from the category
  return responses[Math.floor(Math.random() * responses.length)]
}

