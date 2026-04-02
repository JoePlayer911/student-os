// src/data/dioramas.js
// Configuration for the 2.5D Interactive Dioramas

export const dioramaData = {
  sumatra: {
    title: "SUMATERA",
    bgColor: "#2E5A88", // A sky blue placeholder
    layers: [
      {
        id: "bg-mountains",
        type: "image",
        url: "", // User will add PNG url here, e.g. "/assets/sumatra/bg.png"
        depth: 0.1, // Moves slowest (background)
        colorPlaceholder: "#224A6D", // fallback
        width: "100%", height: "100%", top: "0", left: "0",
        hotspots: []
      },
      {
        id: "mid-rumah-gadang",
        type: "image",
        url: "", 
        depth: 0.4, // Midground
        colorPlaceholder: "#6B1D1D",
        width: "60%", height: "60%", top: "20%", left: "5%",
        hotspots: [
          {
            title: "Rumah Gadang",
            desc: "The traditional house of the Minangkabau people, known for its dramatic curved roof structure that resembles buffalo horns.",
            top: "40%", left: "40%"
          }
        ]
      },
      {
        id: "fore-characters",
        type: "image",
        url: "", 
        depth: 0.8, // Foreground - moves fast
        colorPlaceholder: "#2A8A3D",
        width: "30%", height: "60%", top: "30%", left: "40%",
        hotspots: [
          {
            title: "Traditional Attire",
            desc: "The colorful and intricate traditional clothing worn during ceremonies and weddings in Sumatera.",
            top: "30%", left: "50%"
          }
        ]
      },
      {
        id: "fore-tiger",
        type: "image",
        url: "", 
        depth: 0.9,
        colorPlaceholder: "#D4771C",
        width: "40%", height: "30%", top: "60%", left: "60%",
        hotspots: [
          {
            title: "Sumatran Tiger",
            desc: "The critically endangered Sumatran Tiger is the smallest surviving tiger subspecies, distinguished by heavy black stripes.",
            top: "50%", left: "50%"
          }
        ]
      },
      {
        id: "fore-rafflesia",
        type: "image",
        url: "", 
        depth: 1.0, // Foremost
        colorPlaceholder: "#A81111",
        width: "25%", height: "35%", top: "60%", left: "2%",
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
        id: "bg-forest", type: "image", url: "", depth: 0.1, colorPlaceholder: "#2C4F66", width: "100%", height: "100%", top: "0", left: "0", hotspots: []
      },
      {
        id: "mid-longhouse", type: "image", url: "", depth: 0.4, colorPlaceholder: "#8A3F33", width: "50%", height: "40%", top: "30%", left: "5%",
        hotspots: [
          { title: "Dayak Longhouse", desc: "A traditional communal dwelling serving as the center of village life for the Dayak people.", top: "50%", left: "50%" }
        ]
      },
      {
        id: "fore-dayak", type: "image", url: "", depth: 0.8, colorPlaceholder: "#E59E5C", width: "30%", height: "50%", top: "40%", left: "55%",
        hotspots: [
          { title: "Dayak Culture", desc: "The indigenous people of Borneo, known for their rich oral history, ancient traditions, and vibrant clothing.", top: "30%", left: "50%" }
        ]
      },
      {
        id: "fore-crocodile", type: "image", url: "", depth: 0.9, colorPlaceholder: "#3C6E47", width: "50%", height: "20%", top: "70%", left: "40%",
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
      { id: "bg-coast", type: "image", url: "", depth: 0.1, colorPlaceholder: "#1F4A7A", width: "100%", height: "100%", top: "0", left: "0", hotspots: [] },
      { id: "mid-tongkonan", type: "image", url: "", depth: 0.5, colorPlaceholder: "#4A3B32", width: "40%", height: "60%", top: "25%", left: "10%",
        hotspots: [ { title: "Tongkonan", desc: "The ancestral house of the Torajan people, featuring a distinctive boat-shaped roof.", top: "50%", left: "50%" } ]
      },
      { id: "fore-dancer", type: "image", url: "", depth: 0.8, colorPlaceholder: "#B02727", width: "35%", height: "70%", top: "25%", left: "55%",
        hotspots: [ { title: "Traditional Dance", desc: "Sulawesi is home to numerous ethnic groups, each with profound dance and artistic traditions.", top: "40%", left: "50%" } ]
      }
    ]
  },
  java: {
    title: "JAWA",
    bgColor: "#4D7896",
    layers: [
      { id: "bg-city-temple", type: "image", url: "", depth: 0.1, colorPlaceholder: "#355973", width: "100%", height: "100%", top: "0", left: "0", hotspots: [] },
      { id: "mid-monas", type: "image", url: "", depth: 0.3, colorPlaceholder: "#E0E0E0", width: "20%", height: "60%", top: "20%", left: "30%",
        hotspots: [ { title: "Monas", desc: "The National Monument in Jakarta, symbolizing the fight for Indonesia's independence.", top: "50%", left: "50%" } ]
      },
      { id: "fore-wayang", type: "image", url: "", depth: 0.7, colorPlaceholder: "#8A5C33", width: "25%", height: "50%", top: "35%", left: "5%",
        hotspots: [ { title: "Wayang Kulit", desc: "A traditional form of puppet-shadow play originally found in the cultures of Java.", top: "50%", left: "50%" } ]
      },
      { id: "fore-batik", type: "image", url: "", depth: 0.9, colorPlaceholder: "#492F24", width: "40%", height: "50%", top: "40%", left: "55%",
        hotspots: [ { title: "Batik Making", desc: "The ancient Indonesian art of wax-resist dyeing applied to whole cloth.", top: "50%", left: "50%" } ]
      }
    ]
  },
  papua: {
    title: "PAPUA",
    bgColor: "#477FB8",
    layers: [
      { id: "bg-valley", type: "image", url: "", depth: 0.1, colorPlaceholder: "#2B5682", width: "100%", height: "100%", top: "0", left: "0", hotspots: [] },
      { id: "mid-honai", type: "image", url: "", depth: 0.4, colorPlaceholder: "#5A4429", width: "45%", height: "45%", top: "40%", left: "5%",
        hotspots: [ { title: "Honai", desc: "The traditional circular house of the Dani people of Papua, built without windows to keep out the cold.", top: "50%", left: "50%" } ]
      },
      { id: "fore-bird", type: "image", url: "", depth: 0.6, colorPlaceholder: "#E5C142", width: "30%", height: "40%", top: "10%", left: "15%",
        hotspots: [ { title: "Bird of Paradise", desc: "Famous for the spectacular plumage of its males, native to the forests of Papua.", top: "50%", left: "50%" } ]
      },
      { id: "fore-dance", type: "image", url: "", depth: 0.8, colorPlaceholder: "#963B2A", width: "50%", height: "60%", top: "30%", left: "45%",
        hotspots: [ { title: "Papuan Dance", desc: "Traditional ceremonial dances that often mimic nature and celebrate communal ties.", top: "50%", left: "50%" } ]
      }
    ]
  },
  taiwan: {
    // Taiwan doesn't have a detailed spec yet, just a placeholder
    title: "TAIWAN",
    bgColor: "#2F6B56",
    layers: [
      { id: "bg-taipei", type: "image", url: "", depth: 0.2, colorPlaceholder: "#1F4C3B", width: "100%", height: "100%", top: "0", left: "0", hotspots: [] },
      { id: "mid-101", type: "image", url: "", depth: 0.5, colorPlaceholder: "#9BDBD1", width: "20%", height: "70%", top: "10%", left: "40%",
        hotspots: [ { title: "Taipei 101", desc: "The iconic skyscraper that was once the tallest building in the world.", top: "50%", left: "50%" } ]
      }
    ]
  }
};
