export interface GraphPointData {
	isOnline: boolean;
	onlineCount: number;
	date: string;
}

export interface GraphServer {
	id: number;
	data: GraphPointData[];
}

export interface Status {
	date: string;
	isOnline: boolean;
	onlineCount: number | null;
	maxOnline: number | null;
	version: string | null;
}

export interface Server {
	id: number;
	name: string;
	ip: string;
	port: string;
	icon: string;
	link: string;
	telegram: string;
	discord: string;
	statuses: Status[];
	graph: GraphServer;
}
