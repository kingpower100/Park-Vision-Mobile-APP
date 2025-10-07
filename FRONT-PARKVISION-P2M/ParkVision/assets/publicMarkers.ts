const markers = [
  {
    name: "Parking Place Pasteur - Tunis",
    coordinates: {
      latitude: 36.8016,
      longitude: 10.1771,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "A free public parking space near Avenue Pasteur, close to downtown Tunis and accessible to the Medina.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Tunis_medina_gate.jpg",
  },
  {
    name: "Parking La Marsa Corniche",
    coordinates: {
      latitude: 36.8868,
      longitude: 10.3253,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "A beachfront parking area in La Marsa, free and ideal for visiting nearby cafes and the Corniche promenade.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/La_Marsa_Beach_Tunisia.jpg",
  },
  {
    name: "Public Parking – Sidi Bou Said",
    coordinates: {
      latitude: 36.8702,
      longitude: 10.3412,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Free open-air parking at the entrance of the Sidi Bou Said village, within walking distance to major attractions.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Sidi_Bou_Said.jpg",
  },
  {
    name: "Free Parking – Amphitheatre of El Djem",
    coordinates: {
      latitude: 35.2962,
      longitude: 10.7069,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Spacious, free parking available just outside the famous Roman amphitheatre of El Djem.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/El_Djem_Amphitheatre.jpg",
  },
  {
    name: "Avenue Habib Bourguiba – Parking Strip",
    coordinates: {
      latitude: 36.8008,
      longitude: 10.1801,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Some sections of the iconic avenue allow short-term free parking, especially on weekends.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Avenue_Habib_Bourguiba.jpg",
  },
  {
    name: "Parking Lac 1 – Tunis",
    coordinates: {
      latitude: 36.8331,
      longitude: 10.2365,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Free street-side parking near cafés and lakeside views in the Lac 1 area of Tunis.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Tunis_Lake.jpg",
  },
  
 
  {
    name: "Parking Place de la Kasbah – Tunis",
    coordinates: {
      latitude: 36.8011,
      longitude: 10.1672,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Free public parking near the historic Kasbah square, within walking distance to government buildings and the old Medina.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Tunis_Kasbah_Square.jpg",
  },
  {
    name: "Parking Parc du Belvédère – Tunis",
    coordinates: {
      latitude: 36.8198,
      longitude: 10.1665,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Free parking space next to the largest park in Tunis, great for relaxing or visiting the city zoo.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Belvedere_Park_Tunis.jpg",
  },
  {
    name: "Parking Bab Saadoun – Tunis",
    coordinates: {
      latitude: 36.8056,
      longitude: 10.1584,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Free public parking area at the busy Bab Saadoun interchange, ideal for visiting nearby hospitals and markets.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Bab_Saadoun.jpg",
  },
  {
    name: "Parking Place de Barcelone – Tunis",
    coordinates: {
      latitude: 36.7946,
      longitude: 10.1835,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "A convenient and free parking area near the Place de Barcelone metro and train hub.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Place_de_Barcelone_Tunis.jpg",
  },
  {
    name: "Rue de Marseille Free Parking – Tunis",
    coordinates: {
      latitude: 36.7960,
      longitude: 10.1849,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Free on-street parking near Rue de Marseille, a central location with access to local shops and eateries.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Tunis_central_street.jpg",
  },
  {
    name: "Parking Near Medina of Sousse",
    coordinates: {
      latitude: 35.8256,
      longitude: 10.6393,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Free municipal parking area with walking access to the UNESCO-listed Medina of Sousse.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Sousse_Medina.jpg",
  },
  {
    name: "Free Parking – Tunis Marine Station",
    coordinates: {
      latitude: 36.8001,
      longitude: 10.1919,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Free parking near the Tunis Marine light rail station, great for commuters and access to the waterfront.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/42/Tunis_Marine_station.jpg",
  },
  {
    name: "Parking Boulevard Bab Bnet – Tunis",
    coordinates: {
      latitude: 36.8039,
      longitude: 10.1602,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Free public parking along Bab Bnet Boulevard, close to the city’s western entrance and markets.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Bab_Bnet_Tunis.jpg",
  },
  {
    name: "Parking Around Tunis Cathedral",
    coordinates: {
      latitude: 36.8005,
      longitude: 10.1809,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Free parking spots can be found near the Cathedral of St. Vincent de Paul, right on Avenue Habib Bourguiba.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/42/Cathedrale_de_Tunis.jpg",
  },
  {
    name: "Free Parking – Passage Street (Rue du Passage)",
    coordinates: {
      latitude: 36.7992,
      longitude: 10.1756,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Popular among locals, this street offers multiple free parking zones with access to nearby shops and cafés.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Rue_du_Passage_Tunis.jpg",
  },
  {
    name: "Parking – Avenue de la Liberté",
    coordinates: {
      latitude: 36.8047,
      longitude: 10.1741,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    description: "Street-side free parking available along this main avenue, with tree-lined sidewalks and access to central districts.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Avenue_de_la_Liberte_Tunis.jpg",
  }

];

export default markers;
