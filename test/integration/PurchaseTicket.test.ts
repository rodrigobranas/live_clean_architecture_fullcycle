import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import GetTicket from "../../src/application/usecase/GetTicket";
import PurchaseTicket from "../../src/application/usecase/PurchaseTicket";
import { TicketRepositoryDatabase } from "../../src/infra/repository/TicketRepository";
import { EventRepositoryDatabase } from "../../src/infra/repository/EventRepository";

test("Deve comprar um ingresso para o evento", async function () {
	// given
	const connection = new PgPromiseAdapter();
	const ticketRepository = new TicketRepositoryDatabase(connection);
	const eventRepository = new EventRepositoryDatabase(connection);
	const purchaseTicket = new PurchaseTicket(ticketRepository, eventRepository);
	const getTicket = new GetTicket(connection);
	const inputPurchaseTicket = {
		eventId: "185ff433-a7df-4dd6-ac86-44d219645cb1",
		email: "john.doe@gmail.com"
	};
	// when
	const outputPurchaseTicket = await purchaseTicket.execute(inputPurchaseTicket);
	const outputGetTicket = await getTicket.execute(outputPurchaseTicket.ticketId);
	// then
	expect(outputPurchaseTicket.ticketId).toBeDefined();
	expect(outputGetTicket.eventId).toBe("185ff433-a7df-4dd6-ac86-44d219645cb1");
	expect(outputGetTicket.email).toBe("john.doe@gmail.com");
	expect(outputGetTicket.price).toBe(100);
	await connection.close();
});
