export interface ArtTemplate {
    id: number;
    name: string;
    category: string;
    svg: string;
    color: string;
}

export const artTemplates: ArtTemplate[] = [
    {
        id: 1,
        name: "Happy Cat",
        category: "Animals",
        color: "from-orange-400 to-yellow-400",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="60" fill="none" stroke="black" stroke-width="3"/>
            <circle cx="80" cy="90" r="8" fill="black"/>
            <circle cx="120" cy="90" r="8" fill="black"/>
            <path d="M 80 120 Q 100 130 120 120" fill="none" stroke="black" stroke-width="3"/>
            <polygon points="50,60 60,40 70,60" fill="none" stroke="black" stroke-width="3"/>
            <polygon points="130,60 140,40 150,60" fill="none" stroke="black" stroke-width="3"/>
            <line x1="100" y1="110" x2="100" y2="120" stroke="black" stroke-width="2"/>
        </svg>`
    },
    {
        id: 2,
        name: "Cute Dog",
        category: "Animals",
        color: "from-brown-400 to-amber-400",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="110" rx="50" ry="60" fill="none" stroke="black" stroke-width="3"/>
            <circle cx="85" cy="100" r="8" fill="black"/>
            <circle cx="115" cy="100" r="8" fill="black"/>
            <ellipse cx="100" cy="120" rx="15" ry="10" fill="none" stroke="black" stroke-width="2"/>
            <path d="M 85 135 Q 100 145 115 135" fill="none" stroke="black" stroke-width="3"/>
            <ellipse cx="60" cy="80" rx="20" ry="35" fill="none" stroke="black" stroke-width="3"/>
            <ellipse cx="140" cy="80" rx="20" ry="35" fill="none" stroke="black" stroke-width="3"/>
        </svg>`
    },
    {
        id: 3,
        name: "Flower",
        category: "Nature",
        color: "from-pink-400 to-rose-400",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="80" r="15" fill="none" stroke="black" stroke-width="3"/>
            <ellipse cx="100" cy="50" rx="15" ry="25" fill="none" stroke="black" stroke-width="3"/>
            <ellipse cx="130" cy="80" rx="15" ry="25" fill="none" stroke="black" stroke-width="3" transform="rotate(90 130 80)"/>
            <ellipse cx="100" cy="110" rx="15" ry="25" fill="none" stroke="black" stroke-width="3"/>
            <ellipse cx="70" cy="80" rx="15" ry="25" fill="none" stroke="black" stroke-width="3" transform="rotate(90 70 80)"/>
            <line x1="100" y1="110" x2="100" y2="170" stroke="black" stroke-width="4"/>
            <path d="M 100 140 Q 80 150 85 160" fill="none" stroke="black" stroke-width="3"/>
            <path d="M 100 150 Q 120 160 115 170" fill="none" stroke="black" stroke-width="3"/>
        </svg>`
    },
    {
        id: 4,
        name: "Sunny Day",
        category: "Nature",
        color: "from-yellow-400 to-orange-400",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="40" fill="none" stroke="black" stroke-width="3"/>
            <line x1="100" y1="30" x2="100" y2="50" stroke="black" stroke-width="4"/>
            <line x1="100" y1="150" x2="100" y2="170" stroke="black" stroke-width="4"/>
            <line x1="30" y1="100" x2="50" y2="100" stroke="black" stroke-width="4"/>
            <line x1="150" y1="100" x2="170" y2="100" stroke="black" stroke-width="4"/>
            <line x1="50" y1="50" x2="65" y2="65" stroke="black" stroke-width="4"/>
            <line x1="135" y1="135" x2="150" y2="150" stroke="black" stroke-width="4"/>
            <line x1="150" y1="50" x2="135" y2="65" stroke="black" stroke-width="4"/>
            <line x1="65" y1="135" x2="50" y2="150" stroke="black" stroke-width="4"/>
        </svg>`
    },
    {
        id: 5,
        name: "Little House",
        category: "Objects",
        color: "from-red-400 to-pink-400",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <polygon points="100,40 40,90 160,90" fill="none" stroke="black" stroke-width="3"/>
            <rect x="50" y="90" width="100" height="80" fill="none" stroke="black" stroke-width="3"/>
            <rect x="80" y="120" width="40" height="50" fill="none" stroke="black" stroke-width="3"/>
            <rect x="110" y="105" width="25" height="25" fill="none" stroke="black" stroke-width="2"/>
            <line x1="122.5" y1="105" x2="122.5" y2="130" stroke="black" stroke-width="2"/>
            <line x1="110" y1="117.5" x2="135" y2="117.5" stroke="black" stroke-width="2"/>
            <circle cx="115" cy="145" r="3" fill="black"/>
        </svg>`
    },
    {
        id: 6,
        name: "Tree",
        category: "Nature",
        color: "from-green-400 to-emerald-400",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="85" y="120" width="30" height="60" fill="none" stroke="black" stroke-width="3"/>
            <circle cx="100" cy="80" r="45" fill="none" stroke="black" stroke-width="3"/>
            <circle cx="70" cy="90" r="35" fill="none" stroke="black" stroke-width="3"/>
            <circle cx="130" cy="90" r="35" fill="none" stroke="black" stroke-width="3"/>
        </svg>`
    },
    {
        id: 7,
        name: "Car",
        category: "Objects",
        color: "from-blue-400 to-cyan-400",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="100" width="120" height="50" rx="10" fill="none" stroke="black" stroke-width="3"/>
            <path d="M 60 100 L 70 70 L 130 70 L 140 100" fill="none" stroke="black" stroke-width="3"/>
            <circle cx="70" cy="150" r="15" fill="none" stroke="black" stroke-width="3"/>
            <circle cx="130" cy="150" r="15" fill="none" stroke="black" stroke-width="3"/>
            <rect x="80" y="80" width="40" height="20" fill="none" stroke="black" stroke-width="2"/>
        </svg>`
    },
    {
        id: 8,
        name: "Star",
        category: "Shapes",
        color: "from-yellow-400 to-amber-400",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <polygon points="100,30 115,75 165,75 125,105 140,150 100,120 60,150 75,105 35,75 85,75" fill="none" stroke="black" stroke-width="3"/>
        </svg>`
    },
    {
        id: 9,
        name: "Heart",
        category: "Shapes",
        color: "from-red-400 to-pink-400",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M 100 150 C 60 120 40 100 40 75 C 40 55 55 40 75 40 C 85 40 95 45 100 55 C 105 45 115 40 125 40 C 145 40 160 55 160 75 C 160 100 140 120 100 150 Z" fill="none" stroke="black" stroke-width="3"/>
        </svg>`
    },
    {
        id: 10,
        name: "Butterfly",
        category: "Animals",
        color: "from-purple-400 to-pink-400",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="100" rx="8" ry="40" fill="none" stroke="black" stroke-width="3"/>
            <circle cx="100" cy="70" r="10" fill="none" stroke="black" stroke-width="3"/>
            <ellipse cx="70" cy="80" rx="25" ry="35" fill="none" stroke="black" stroke-width="3"/>
            <ellipse cx="130" cy="80" rx="25" ry="35" fill="none" stroke="black" stroke-width="3"/>
            <ellipse cx="65" cy="120" rx="20" ry="30" fill="none" stroke="black" stroke-width="3"/>
            <ellipse cx="135" cy="120" rx="20" ry="30" fill="none" stroke="black" stroke-width="3"/>
            <line x1="100" y1="60" x2="90" y2="45" stroke="black" stroke-width="2"/>
            <line x1="100" y1="60" x2="110" y2="45" stroke="black" stroke-width="2"/>
        </svg>`
    }
];
