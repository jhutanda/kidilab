export interface Poem {
    id: number;
    title: string;
    author: string;
    content: string[];
    color: string;
}

export const poemsData: Poem[] = [
    {
        id: 1,
        title: "Twinkle, Twinkle, Little Star",
        author: "Jane Taylor",
        content: [
            "Twinkle, twinkle, little star,",
            "How I wonder what you are!",
            "Up above the world so high,",
            "Like a diamond in the sky."
        ],
        color: "from-yellow-400 to-orange-500"
    },
    {
        id: 2,
        title: "Humpty Dumpty",
        author: "Traditional",
        content: [
            "Humpty Dumpty sat on a wall,",
            "Humpty Dumpty had a great fall.",
            "All the king's horses and all the king's men,",
            "Couldn't put Humpty together again."
        ],
        color: "from-blue-400 to-cyan-500"
    },
    {
        id: 3,
        title: "Little Miss Muffet",
        author: "Traditional",
        content: [
            "Little Miss Muffet sat on a tuffet,",
            "Eating her curds and whey.",
            "Along came a spider,",
            "Who sat down beside her,",
            "And frightened Miss Muffet away!"
        ],
        color: "from-pink-400 to-rose-500"
    },
    {
        id: 4,
        title: "Mary Had a Little Lamb",
        author: "Sarah Josepha Hale",
        content: [
            "Mary had a little lamb,",
            "Its fleece was white as snow.",
            "And everywhere that Mary went,",
            "The lamb was sure to go."
        ],
        color: "from-purple-400 to-indigo-500"
    },
    {
        id: 5,
        title: "Jack and Jill",
        author: "Traditional",
        content: [
            "Jack and Jill went up the hill,",
            "To fetch a pail of water.",
            "Jack fell down and broke his crown,",
            "And Jill came tumbling after."
        ],
        color: "from-green-400 to-emerald-500"
    },
    {
        id: 6,
        title: "Baa, Baa, Black Sheep",
        author: "Traditional",
        content: [
            "Baa, baa, black sheep,",
            "Have you any wool?",
            "Yes sir, yes sir,",
            "Three bags full!"
        ],
        color: "from-slate-500 to-gray-600"
    },
    {
        id: 7,
        title: "The Itsy Bitsy Spider",
        author: "Traditional",
        content: [
            "The itsy bitsy spider climbed up the water spout,",
            "Down came the rain and washed the spider out.",
            "Out came the sun and dried up all the rain,",
            "And the itsy bitsy spider climbed up the spout again."
        ],
        color: "from-teal-400 to-cyan-500"
    },
    {
        id: 8,
        title: "Row, Row, Row Your Boat",
        author: "Traditional",
        content: [
            "Row, row, row your boat,",
            "Gently down the stream.",
            "Merrily, merrily, merrily, merrily,",
            "Life is but a dream."
        ],
        color: "from-sky-400 to-blue-500"
    },
    {
        id: 9,
        title: "Hey Diddle Diddle",
        author: "Traditional",
        content: [
            "Hey diddle diddle, the cat and the fiddle,",
            "The cow jumped over the moon.",
            "The little dog laughed to see such sport,",
            "And the dish ran away with the spoon."
        ],
        color: "from-violet-400 to-purple-500"
    }
];
