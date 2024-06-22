import DatabaseConnection from "../../infra/database/DatabaseConnection";

export default class GetTicket {

	constructor (readonly connection: DatabaseConnection) {
	}

	async execute (ticketId: string): Promise<Output> {
		const [output] = await this.connection.query("select * from branas.ticket join branas.event using (event_id) where ticket_id = $1", [ticketId]);
		return {
			ticketId: output.ticket_id,
			eventId: output.event_id,
			email: output.email,
			price: parseFloat(output.price),
			eventDescription: output.description
		}
	}
}

type Output = {
	ticketId: string,
	eventId: string,
	email: string,
	price: number,
	eventDescription: string,
}
