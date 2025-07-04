
export interface Amenity {
    id: string;
    name: string;
    icon: string;
  }
  
  export interface Room {
    id: string;
    name: string;
    type: string;
    capacity: number;
    price: number;
    available: number;
    description: string;
    images: string[];
  }
  
  export interface Hostel {
    id: string;
    name: string;
    location: string;
    address: string;
    distance: string;
    rating: number;
    reviewCount: number;
    description: string;
    images: string[];
    amenities: string[];
    rooms: Room[];
    ownerId: string;
  }
  
  export const amenities: Amenity[] = [
    { id: "wifi", name: "Free Wi-Fi", icon: "wifi" },
    { id: "ac", name: "Air Conditioning", icon: "wind" },
    { id: "kitchen", name: "Kitchen", icon: "utensils" },
    { id: "laundry", name: "Laundry", icon: "shirt" },
    { id: "tv", name: "TV Room", icon: "tv" },
    { id: "study", name: "Study Room", icon: "book" },
    { id: "parking", name: "Parking", icon: "car" },
    { id: "security", name: "24/7 Security", icon: "shield" },
    { id: "gym", name: "Fitness Center", icon: "dumbbell" },
    { id: "clean", name: "Cleaning Service", icon: "spray-can" },
  ];
  
  export const hostels: Hostel[] = [
    {
      id: "1",
      name: "Essalba Hostel",
      location: "Market Circle",
      address: "UMaT - Tarkwa, Adehye Fie",
      distance: "0.5 miles from campus",
      rating: 4.7,
      reviewCount: 128,
      description: "Modern student housing with stunning campus views and premium amenities. Perfect for students who want a blend of comfort and convenience.",
      images: [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      ],
      amenities: ["wifi", "ac", "study", "laundry", "security"],
      rooms: [
        {
          id: "1-1",
          name: "Standard Single",
          type: "Single",
          capacity: 1,
          price: 3800,
          available: 5,
          description: "Comfortable single room with private bathroom.",
          images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"]
        },
        {
          id: "1-2",
          name: "Deluxe Double",
          type: "Double",
          capacity: 2,
          price: 3500,
          available: 3,
          description: "Spacious double room with shared bathroom and study area.",
          images: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"]
        }
      ],
      ownerId: "owner-1"
    },
    {
      id: "2",
      name: "Scholar's Haven",
      location: "East Campus",
      address: "Umat - Tarkwa Campus",
      distance: "0.8 miles from campus",
      rating: 4.5,
      reviewCount: 96,
      description: "A peaceful retreat designed for serious students. Quiet study spaces, modern facilities, and a supportive community for academic success.",
      images: [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      ],
      amenities: ["wifi", "study", "security", "kitchen", "clean"],
      rooms: [
        {
          id: "2-1",
          name: "Scholar's Suite",
          type: "Single",
          capacity: 1,
          price: 5000,
          available: 2,
          description: "Premium single room with private bathroom and desk.",
          images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"]
        },
        {
          id: "2-2",
          name: "Study Double",
          type: "Double",
          capacity: 2,
          price: 3750,
          available: 4,
          description: "Double room with built-in desks and bookshelves.",
          images: ["https://images.unsplash.com/photo-1592229505726-ca121723b8ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"]
        }
      ],
      ownerId: "owner-2"
    },
    {
      id: "3",
      name: "Crystal Hostel",
      location: "Downtown",
      address: "Tamso",
      distance: "1.2 miles from campus",
      rating: 4.8,
      reviewCount: 150,
      description: "Trendy urban living with a focus on community and lifestyle. Modern amenities, social spaces, and prime location near entertainment districts.",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      ],
      amenities: ["wifi", "ac", "gym", "tv", "laundry", "parking"],
      rooms: [
        {
          id: "3-1",
          name: "Studio Loft",
          type: "Studio",
          capacity: 1,
          price: 5500,
          available: 1,
          description: "Modern studio with kitchenette and city views.",
          images: ["https://images.unsplash.com/photo-1630699144867-37acec97df5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"]
        },
        {
          id: "3-2",
          name: "Urban Double",
          type: "Double",
          capacity: 2,
          price: 4250,
          available: 6,
          description: "Stylish double room with modern furnishings.",
          images: ["https://images.unsplash.com/photo-1629079447777-1e605162dc8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"]
        }
      ],
      ownerId: "owner-1"
    }
  ];
  
  export const maintenanceTypes = [
    { value: "plumbing", label: "Plumbing Issues" },
    { value: "electrical", label: "Electrical Problems" },
    { value: "appliance", label: "Appliance Repair" },
    { value: "furniture", label: "Furniture Issues" },
    { value: "lock", label: "Lock/Key Issues" },
    { value: "other", label: "Other" },
  ];
  