import crypto from "crypto";
import Email from "./Email";

export default class Ticket {
	email: Email;

	constructor (readonly ticketId: string, readonly eventId: string, email: string, readonly price: number, private status: string, readonly date: Date) {
		this.email = new Email(email);
	}

	static create (eventId: string, email: string, price: number) {
		const ticketId = crypto.randomUUID();
		const status = "active";
		const date = new Date();
		return new Ticket(ticketId, eventId, email, price, status, date);
	}

	cancel () {
		const today = new Date();
		const diff = (today.getTime() - this.date.getTime())/(1000*60*60);
		if (diff > 24) throw new Error("O cancelamento só pode ser feito em até 24 horas");
		this.status = "cancelled";
	}

	getStatus () {
		return this.status;
	}
}
