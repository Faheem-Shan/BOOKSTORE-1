// import english from "../assets/images/english.png";
// import malayalam from "../assets/images/malayalam.png";
// import malayalam from "../assets/images/comics.png";

// import horror from "./images/horror.png"; 
// import fiction from "./images/fiction.png"; // Placeholder: You will need a fiction.png image
// import epic from "./images/epic.png"; 
// import novel from ".images/novel.png"; 
// import autobiography from "./images/autobiography.png"; 
// import adventure from "./images/adventure.png"; 
// import kids from "./images/kids.png";

import book_1 from "./images/book_1.png"; 
import book_2 from "./images/book_2.jpg"; 
import book_3 from "./images/book_3.jpeg"; 
import book_4 from "./images/book_4.jpeg"; 
import book_5 from "./images/book_5.png"; 
import book_6 from "./images/book_6.jpeg"; 
import book_7 from "./images/book_7.jpg"; 
import book_8 from "./images/book_8.jpg"; 
import book_9 from "./images/book_9.png"; 
import book_10 from "./images/book_10.jpg"; 


export const dummyBooks = [
    // 🩸 English - Horror
    {
        id: 1,
        title: "Dracula",
        author: "Bram Stoker",
        category: "English",
        type: "Horror",
        offerPrice: 210,
        price:350,
        image: book_1,
        description: "A gothic horror classic that tells the tale of Count Dracula and his attempt to move from Transylvania to England.",
        date: "2023-10-01", // Example date
        popular: true, // Example popular
        instock: true  // Example instock
    },
    {
        id: 2,
        title: "Frankenstein",
        author: "Mary Shelley",
        category: "English",
        type: "Horror",
        offerPrice: 230,
        price:380,
        image: book_2,
        description: "A haunting story of a scientist who creates life, only to be horrified by his own creation.",
        date: "2024-05-15",
        popular: true,
        instock: true
    },

    // 📚 English - Fiction / Simple
    {
        id: 3,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "English",
        type: "Fiction",
        offerPrice: 240,
        book:400,
        image: book_3,
        description: "A young shepherd's journey to pursue his dream and discover his destiny.",
        date: "2024-06-20",
        popular: false,
        instock: true
    },
    {
        id: 4,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "English",
        type: "Fiction",
        offerPrice: 260,
        price:430,
        image: book_4,
        description: "A timeless story about justice, empathy, and moral growth in the racially charged American South.",
        date: "2023-11-28",
        popular: true,
        instock: true
    },

    // 📗 Malayalam Books
    {
        id: 5,
        title: "Randamoozham",
        author: "M.T. Vasudevan Nair",
        category: "Malayalam",
        type: "Epic",
        offerPrice: 120,
        price:200,
        image: book_5,
        description: "Mahabharata retold from Bhima's perspective, one of the most celebrated works in Malayalam literature.",
        date: "2024-01-05",
        popular: false,
        instock: true
    },
    {
        id: 6,
        title: "Balyakalasakhi",
        author: "Vaikom Muhammad Basheer",
        category: "Malayalam",
        type: "Novel",
        offerPrice: 180,
        price:300,
        image: book_6,
        description: "A tragic love story of Majeed and Suhra, filled with simplicity and emotional depth.",
        date: "2024-03-10",
        popular: true,
        instock: true
    },
    {
        id: 7,
        title: "Oru Sankeerthanam Pole",
        author: "Perumbadavam Sreedharan",
        category: "Malayalam",
        type: "Novel",
        offerPrice: 200,
        price:330,
        image: book_7,
        description: "A touching portrayal of Fyodor Dostoevsky’s emotional struggles and his love life.",
        date: "2023-12-19",
        popular: false,
        instock: true
    },
    {
        id: 8,
        title: "Ente Katha",
        author: "Kamala Das",
        category: "Malayalam",
        type: "Autobiography",
        offerPrice: 220,
        price:360,
        image: book_8,
        description: "A bold and emotional autobiography that explores the author’s inner thoughts and struggles.",
        date: "2024-04-01",
        popular: false,
        instock: false // Example: out of stock
    },

    // 🎨 Comics
    {
        id: 9,
        title: "Tintin in Tibet",
        author: "Hergé",
        category: "Comic",
        type: "Adventure",
        offerPrice: 200,
        price:330,
        image: book_9,
        description: "Tintin embarks on a daring adventure to find his lost friend Chang in the snowy mountains of Tibet.",
        date: "2024-07-25",
        popular: true,
        instock: true
    },
    {
        id: 10,
        title: "Chhota Bheem and the Curse of Damyaan",
        author: "Rajiv Chilaka",
        category: "Comic",
        type: "Kids",
        offerPrice: 180,
        price:300,
        image: book_10,
        description: "An adventurous comic where Bheem and his friends fight to save Dholakpur from the evil Damyaan.",
        date: "2024-08-01",
        popular: false,
        instock: true
    }
]

export const categories = [
  { title: "English", image: book_1 },
  { title: "Malayalam", image: book_5 },
  { title: "Comic", image: book_9 },
];