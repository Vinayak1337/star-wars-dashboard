interface AppState {
	currentRoute: string;
	resourcePopup: PopupItem | null;
	popularPeople: Character[];
	allPeople: Character[];
	allPeople2: Character[];
	films: Film[];
	planets: Planet[];
	starships: Starship[];
	loading: boolean;
	error: string | null;
}

type PopupItem =
	| { type: 'character'; item: Character }
	| { type: 'film'; item: Film }
	| { type: 'planet'; item: Planet }
	| { type: 'starship'; item: Starship };

type ResourceType = 'character' | 'film' | 'planet' | 'starship';

interface Character {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
	films: string[];
	species: string[];
	vehicles: any[];
	starships: any[];
	created: string;
	edited: string;
	url: string;
}

interface Film {
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	characters: string[];
	planets: string[];
	starships: string[];
	vehicles: string[];
	species: string[];
	created: string;
	edited: string;
	url: string;
}

interface Planet {
	name: string;
	rotation_period: string;
	orbital_period: string;
	diameter: string;
	climate: string;
	gravity: string;
	terrain: string;
	surface_water: string;
	population: string;
	residents: string[];
	films: string[];
	created: string;
	edited: string;
	url: string;
}

interface Starship {
	name: string;
	model: string;
	manufacturer: string;
	cost_in_credits: string;
	length: string;
	max_atmosphering_speed: string;
	crew: string;
	passengers: string;
	cargo_capacity: string;
	consumables: string;
	hyperdrive_rating: string;
	MGLT: string;
	starship_class: string;
	pilots: any[];
	films: string[];
	created: string;
	edited: string;
	url: string;
}

interface PopupCardProps<T extends ResourceType> {
	handleClose: () => void;
	item: T extends 'character'
		? Character
		: T extends 'film'
		? Film
		: T extends 'planet'
		? Planet
		: T extends 'starship'
		? Starship
		: never;
}
