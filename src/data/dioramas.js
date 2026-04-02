// src/data/dioramas.js
// Configuration for the 2.5D Interactive Dioramas

export const dioramaData = {
  sumatra: {
    title: "SUMATERA",
    bgColor: "#2E5A88",
    layers: [
      {
        id: "bg-jawa", type: "image", url: "/assets/jawa/jawa-background.jpeg", depth: 0.1, colorPlaceholder: "#224A6D", width: "100%", height: "100%", top: "0", left: "0", bgSize: "contain", bgPosition: "bottom center"
      },
      {
        id: "mid-rumah-gadang",
        type: "image",
        url: "/assets/sumatra/sumatra-house.png",
        depth: 0.6, // Landmark
        colorPlaceholder: "#6B1D1D",
        width: "70%", height: "70%", top: "20%", left: "5%",
        hotspots: [
          {
            title: "Rumah Gadang",
            desc: "The traditional house of the Minangkabau people, known for its dramatic curved roof structure that resembles buffalo horns.",
            top: "50%", left: "50%"
          }
        ]
      },
      {
        id: "fore-characters",
        type: "image",
        url: "/assets/sumatra/sumatra-people.png",
        depth: 0.8, // People
        colorPlaceholder: "#2A8A3D",
        width: "40%", height: "60%", top: "30%", left: "45%",
        hotspots: [
          {
            title: "Traditional Attire",
            desc: "The colorful and intricate traditional clothing worn during ceremonies and weddings in Sumatera.",
            top: "50%", left: "50%"
          }
        ]
      },
      {
        id: "fore-tiger",
        type: "image",
        url: "/assets/sumatra/tiger.png",
        depth: 1.0, // Animals
        colorPlaceholder: "#D4771C",
        width: "35%", height: "35%", top: "60%", left: "65%",
        hotspots: [
          {
            title: "Sumatran Tiger",
            desc: "The critically endangered Sumatran Tiger is the smallest surviving tiger subspecies, distinguished by heavy black stripes.",
            top: "50%", left: "50%"
          }
        ]
      },
      {
        id: "mid-rafflesia",
        type: "image",
        url: "/assets/sumatra/rafflesia.png",
        depth: 0.4, // Nature
        colorPlaceholder: "#A81111",
        width: "25%", height: "30%", top: "65%", left: "2%",
        hotspots: [
          {
            title: "Rafflesia Arnoldii",
            desc: "The largest individual flower on Earth, emitting a foul odor to attract pollinating insects.",
            top: "50%", left: "50%"
          }
        ]
      }
    ]
  },
  kalimantan: {
    title: "KALIMANTAN",
    bgColor: "#3E6B89",
    layers: [
      {
        id: "bg-forest", type: "image", url: "/assets/jawa/jawa-background.jpeg", depth: 0.1, colorPlaceholder: "#2C4F66", width: "100%", height: "100%", top: "0", left: "0", bgSize: "contain", bgPosition: "bottom center"
      },
      {
        id: "volcano", type: "image", url: "/assets/kalimantan/volcano.webp", depth: 0.4, colorPlaceholder: "#2C4F66", width: "30%", height: "40%", top: "35%", left: "70%"
      },
      {
        id: "no-volcano", type: "image", url: "/assets/kalimantan/non.webp", depth: 0.41, colorPlaceholder: "transparent", width: "10%", height: "15%", top: "45%", left: "80%", className: "volcano-hover"
      },
      {
        id: "river", type: "image", url: "/assets/kalimantan/river.webp", depth: 0.45, colorPlaceholder: "#2C4F66", width: "100%", height: "60%", top: "40%", left: "0"
      },
      {
        id: "mid-longhouse", type: "image", url: "/assets/kalimantan/kalimantan-house.png", depth: 0.12, colorPlaceholder: "#8A3F33", width: "50%", height: "40%", top: "30%", left: "5%",
        hotspots: [
          { title: "Dayak Longhouse", desc: "A traditional communal dwelling serving as the center of village life for the Dayak people.", top: "50%", left: "50%" }
        ]
      },
      {
        id: "fore-dayak", type: "image", url: "/assets/kalimantan/kalimantan-people.webp", depth: 0.8, colorPlaceholder: "#E59E5C", width: "30%", height: "60%", top: "35%", left: "55%",
        hotspots: [
          { title: "Dayak Culture", desc: "The indigenous people of Borneo, known for their rich oral history, ancient traditions, and vibrant clothing.", top: "50%", left: "50%" }
        ]
      },
      {
        id: "fore-snake", type: "image", url: "/assets/kalimantan/snake.webp", depth: 0.9, colorPlaceholder: "#3C6E47", width: "20%", height: "30%", top: "65%", left: "10%"
      },
      {
        id: "fore-crocodile", type: "image", url: "/assets/kalimantan/alligator.png", depth: 1.0, colorPlaceholder: "#3C6E47", width: "40%", height: "20%", top: "75%", left: "40%",
        hotspots: [
          { title: "River Crocodile", desc: "Kalimantan's vast river systems are home to many species, including the formidable saltwater crocodile.", top: "50%", left: "50%" }
        ]
      }
    ]
  },
  sulawesi: {
    title: "SULAWESI",
    bgColor: "#2C6099",
    layers: [
      { id: "bg-coast", type: "image", url: "/assets/sulawesi/sulawesi-background.webp", depth: 0.1, colorPlaceholder: "#1F4A7A", width: "100%", height: "100%", top: "0", left: "0" },
      {
        id: "mid-tongkonan", type: "image", url: "/assets/sulawesi/sulawesi-house.png", depth: 0.12, colorPlaceholder: "#4A3B32", width: "50%", height: "60%", top: "25%", left: "5%",
        hotspots: [{ title: "Tongkonan", desc: "The ancestral house of the Torajan people, featuring a distinctive boat-shaped roof.", top: "50%", left: "50%" }]
      },
      {
        id: "fore-dancer", type: "image", url: "/assets/sulawesi/sulawesi-people.webp", depth: 0.8, colorPlaceholder: "#B02727", width: "40%", height: "70%", top: "20%", left: "55%",
        hotspots: [{ title: "Traditional Dance", desc: "Sulawesi is home to numerous ethnic groups, each with profound dance and artistic traditions.", top: "50%", left: "50%" }]
      },
      { id: "fore-fan", type: "image", url: "/assets/sulawesi/fan.webp", depth: 1.0, colorPlaceholder: "#1F4A7A", width: "20%", height: "20%", top: "70%", left: "60%" }
    ]
  },
  jawa: {
    title: "JAWA",
    bgColor: "#4D7896",
    layers: [
      { id: "bg-city-temple", type: "image", url: "/assets/jawa/jawa-background.jpeg", depth: 0.1, colorPlaceholder: "#355973", width: "100%", height: "100%", top: "0", left: "0", bgSize: "contain", bgPosition: "bottom center" },
      {
        id: "mid-monas", type: "image", url: "/assets/jawa/jawa-house.png", depth: 0.12, colorPlaceholder: "#E0E0E0", width: "35%", height: "50%", top: "35%", left: "30%",
        hotspots: [{ title: "Joglo", desc: "Traditional Javanese vernacular house.", top: "50%", left: "50%" }]
      },
      { id: "mid-tugu", type: "image", url: "/assets/jawa/tugu-jogja.png", depth: 0.12, colorPlaceholder: "#E0E0E0", width: "15%", height: "40%", top: "45%", left: "5%" },
      {
        id: "fore-wayang", type: "image", url: "/assets/jawa/jawa-wayang.png", depth: 0.8, colorPlaceholder: "#8A5C33", width: "25%", height: "50%", top: "40%", left: "10%",
        hotspots: [{ title: "Wayang Kulit", desc: "A traditional form of puppet-shadow play originally found in the cultures of Java.", top: "50%", left: "50%" }]
      },
      { id: "fore-batik", type: "image", url: "/assets/jawa/jawa-batik.webp", depth: 0.85, colorPlaceholder: "#492F24", width: "35%", height: "40%", top: "50%", left: "60%" },
      {
        id: "fore-people", type: "image", url: "/assets/jawa/jawa-people.png", depth: 0.9, colorPlaceholder: "#492F24", width: "40%", height: "60%", top: "35%", left: "55%",
        hotspots: [{ title: "Kebaya", desc: "Traditional upper garment traditionally worn by women.", top: "50%", left: "50%" }]
      }
    ]
  },
  papua: {
    title: "PAPUA",
    bgColor: "#477FB8",
    layers: [
      { id: "bg-valley", type: "image", url: "/assets/papua/papua-background.jpg", depth: 0.1, colorPlaceholder: "#2B5682", width: "100%", height: "100%", top: "0", left: "0" },
      {
        id: "mid-honai", type: "image", url: "/assets/papua/papua-house.png", depth: 0.12, colorPlaceholder: "#5A4429", width: "50%", height: "50%", top: "35%", left: "5%",
        hotspots: [{ title: "Honai", desc: "The traditional circular house of the Dani people of Papua, built without windows to keep out the cold.", top: "50%", left: "50%" }]
      },
      {
        id: "fore-dance", type: "image", url: "/assets/papua/papua-people.png", depth: 0.8, colorPlaceholder: "#963B2A", width: "45%", height: "80%", top: "20%", left: "50%",
        hotspots: [{ title: "Papuan Dance", desc: "Traditional ceremonial dances that often mimic nature and celebrate communal ties.", top: "50%", left: "50%" }]
      },
      {
        id: "fore-bird", type: "image", url: "/assets/papua/papua-cendrawasih.webp", depth: 1.0, colorPlaceholder: "#E5C142", width: "35%", height: "45%", top: "10%", left: "45%",
        hotspots: [{ title: "Bird of Paradise", desc: "Famous for the spectacular plumage of its males, native to the forests of Papua.", top: "50%", left: "50%" }]
      }
    ]
  },
  taiwan: {
    title: "TAIWAN",
    bgColor: "#2F6B56",
    layers: [
      {
        id: "bg-taipei", type: "image", url: "/assets/taiwan/taipei_school.png", depth: 0.2, colorPlaceholder: "#1F4C3B", width: "100%", height: "100%", top: "0", left: "0",
        hotspots: [{ title: "Jhu-Wei Elementary", desc: "Our starting point and home base for the expedition.", top: "50%", left: "50%" }]
      }
    ]
  }
};
