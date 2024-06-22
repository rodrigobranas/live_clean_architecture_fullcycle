import DatabaseConnection from "../database/DatabaseConnection";
import Ticket from "../../domain/Ticket";

export default interface TicketRepository {
	saveTicket (ticket: Ticket): Promise<void>;
	getTicket (ticketId: string): Promise<Ticket>;
}

export class TicketRepositoryDatabase implements TicketRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async saveTicket (ticket: Ticket) {
		await this.connection.query("insert into branas.ticket (ticket_id, event_id, email, price, status, date) values ($1, $2, $3, $4, $5, $6)", [ticket.ticketId, ticket.eventId, ticket.email.value, ticket.price, ticket.getStatus(), ticket.date]);
	}

	async getTicket (ticketId: string) {
		const [ticket] = await this.connection.query("select * from branas.ticket where ticket_id = $1", [ticketId]);
		return new Ticket(ticket.ticket_id, ticket.event_id, ticket.email, parseFloat(ticket.price), ticket.status, ticket.date);
	}
}
