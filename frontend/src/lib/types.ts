export interface GraphPointData {
	isOnline: boolean;
	onlineCount: number;
	date: string;
}

export interface GraphServer {
	id: number;
	data: GraphPointData[];
}

export interface OfflineStatus {
	date: string;
	isOnline: false;
	onlineCount: 0;
}

export interface OnlineStatus {
	date: string;
	isOnline: true;
	onlineCount: number;
	maxOnline: number;
	version: string;
}

export type Status = OfflineStatus | OnlineStatus;

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
